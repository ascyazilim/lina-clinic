package com.lina.clinic.appointment.service;

import com.lina.clinic.appointment.dto.AppointmentCreateRequest;
import com.lina.clinic.appointment.dto.AppointmentCreatedDto;
import com.lina.clinic.appointment.dto.AvailableSlotDto;
import com.lina.clinic.appointment.entity.Appointment;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import com.lina.clinic.appointment.repository.AppointmentRepository;
import com.lina.clinic.common.exception.BadRequestException;
import com.lina.clinic.common.exception.ConflictException;
import com.lina.clinic.common.exception.ResourceNotFoundException;
import com.lina.clinic.staff.entity.StaffMember;
import com.lina.clinic.staff.entity.StaffService;
import com.lina.clinic.staff.repository.StaffServiceRepository;
import com.lina.clinic.treatment.entity.TreatmentService;
import com.lina.clinic.treatment.repository.TreatmentServiceRepository;
import com.lina.clinic.workinghour.entity.WorkingHour;
import com.lina.clinic.workinghour.repository.WorkingHourRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PublicAppointmentService {

    private static final Set<AppointmentStatus> OCCUPIED_STATUSES =
            EnumSet.of(AppointmentStatus.REQUESTED, AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.NO_SHOW);

    private final TreatmentServiceRepository treatmentServiceRepository;
    private final StaffServiceRepository staffServiceRepository;
    private final WorkingHourRepository workingHourRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional(Transactional.TxType.SUPPORTS)
    public List<AvailableSlotDto> getAvailableSlots(Long serviceId, LocalDate date) {
        validateDate(date);

        TreatmentService treatmentService = getActiveTreatmentService(serviceId);
        return calculateAvailableSlots(treatmentService, date);
    }

    @Transactional
    public AppointmentCreatedDto createAppointment(AppointmentCreateRequest request) {
        validateDate(request.date());

        TreatmentService treatmentService = getActiveTreatmentService(request.serviceId());
        List<AvailableSlotDto> availableSlots = calculateAvailableSlots(treatmentService, request.date());

        boolean requestedSlotAvailable = availableSlots.stream()
                .anyMatch(slot -> slot.date().equals(request.date()) && slot.time().equals(request.time()));

        if (!requestedSlotAvailable) {
            throw new ConflictException("Selected slot is not available");
        }

        LocalDateTime appointmentStart = LocalDateTime.of(request.date(), request.time());
        LocalDateTime appointmentEnd = appointmentStart.plusMinutes(treatmentService.getDurationMinutes());

        List<StaffService> eligibleStaffServices =
                staffServiceRepository.findActiveStaffServicesByTreatmentServiceId(
                        treatmentService.getId()
                );

        StaffMember selectedStaffMember = eligibleStaffServices.stream()
                .map(StaffService::getStaffMember)
                .filter(staffMember -> isStaffAvailable(staffMember.getId(), appointmentStart, appointmentEnd))
                .findFirst()
                .orElseThrow(() -> new ConflictException("Selected slot is no longer available"));

        Appointment appointment = new Appointment();
        appointment.setCustomerFirstName(request.firstName().trim());
        appointment.setCustomerLastName(request.lastName().trim());
        appointment.setCustomerPhone(request.phone().trim());
        appointment.setTreatmentService(treatmentService);
        appointment.setStaffMember(selectedStaffMember);
        appointment.setAppointmentStart(appointmentStart);
        appointment.setAppointmentEnd(appointmentEnd);
        appointment.setStatus(AppointmentStatus.REQUESTED);
        appointment.setKvkkApproved(request.kvkkApproved());
        appointment.setNote(request.note());

        Appointment savedAppointment = appointmentRepository.save(appointment);

        return new AppointmentCreatedDto(
                savedAppointment.getId(),
                savedAppointment.getStatus(),
                treatmentService.getId(),
                treatmentService.getName(),
                savedAppointment.getAppointmentStart(),
                savedAppointment.getAppointmentEnd()
        );
    }

    private List<AvailableSlotDto> calculateAvailableSlots(TreatmentService treatmentService, LocalDate date) {
        WorkingHour workingHour = workingHourRepository.findByDayOfWeekAndActiveTrue(date.getDayOfWeek()).orElse(null);
        if (workingHour == null) {
            return List.of();
        }

        List<StaffService> eligibleStaffServices =
                staffServiceRepository.findActiveStaffServicesByTreatmentServiceId(
                        treatmentService.getId()
                );

        if (eligibleStaffServices.isEmpty()) {
            return List.of();
        }

        LocalDateTime openingDateTime = LocalDateTime.of(date, workingHour.getOpeningTime());
        LocalDateTime closingDateTime = LocalDateTime.of(date, workingHour.getClosingTime());
        long durationMinutes = treatmentService.getDurationMinutes();
        LocalDateTime now = LocalDateTime.now();

        Set<LocalTime> availableTimes = new TreeSet<>();
        LocalDateTime candidateStart = openingDateTime;

        while (!candidateStart.plusMinutes(durationMinutes).isAfter(closingDateTime)) {
            LocalDateTime candidateEnd = candidateStart.plusMinutes(durationMinutes);

            if (!candidateStart.isBefore(now) && hasAvailableStaff(eligibleStaffServices, candidateStart, candidateEnd)) {
                availableTimes.add(candidateStart.toLocalTime());
            }

            candidateStart = candidateStart.plusMinutes(durationMinutes);
        }

        return availableTimes.stream()
                .map(time -> new AvailableSlotDto(date, time))
                .toList();
    }

    private boolean hasAvailableStaff(
            Collection<StaffService> eligibleStaffServices,
            LocalDateTime requestedStart,
            LocalDateTime requestedEnd
    ) {
        return eligibleStaffServices.stream()
                .map(StaffService::getStaffMember)
                .anyMatch(staffMember -> isStaffAvailable(staffMember.getId(), requestedStart, requestedEnd));
    }

    private boolean isStaffAvailable(Long staffMemberId, LocalDateTime requestedStart, LocalDateTime requestedEnd) {
        return !appointmentRepository.existsByStaffMemberIdAndAppointmentStartLessThanAndAppointmentEndGreaterThanAndStatusIn(
                staffMemberId,
                requestedEnd,
                requestedStart,
                OCCUPIED_STATUSES
        );
    }

    private TreatmentService getActiveTreatmentService(Long serviceId) {
        return treatmentServiceRepository.findByIdAndActiveTrueAndCategoryActiveTrue(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment service not found"));
    }

    private void validateDate(LocalDate date) {
        if (date.isBefore(LocalDate.now())) {
            throw new BadRequestException("Date cannot be in the past");
        }
    }
}
