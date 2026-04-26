package com.lina.clinic.appointment.service;

import com.lina.clinic.appointment.dto.AdminAppointmentDto;
import com.lina.clinic.appointment.dto.AdminAppointmentStaffDto;
import com.lina.clinic.appointment.dto.AdminAppointmentTreatmentDto;
import com.lina.clinic.appointment.entity.Appointment;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import com.lina.clinic.appointment.repository.AppointmentRepository;
import com.lina.clinic.common.exception.ConflictException;
import com.lina.clinic.common.exception.ResourceNotFoundException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminAppointmentService {

    private static final LocalDateTime DEFAULT_FILTER_START = LocalDateTime.of(1900, 1, 1, 0, 0);
    private static final LocalDateTime DEFAULT_FILTER_END = LocalDateTime.of(2999, 12, 31, 23, 59);

    private final AppointmentRepository appointmentRepository;

    @Transactional(readOnly = true)
    public List<AdminAppointmentDto> getAppointments(
            AppointmentStatus status,
            LocalDate date,
            Long serviceId,
            Long staffId
    ) {
        LocalDateTime dateStart = date != null ? date.atStartOfDay() : DEFAULT_FILTER_START;
        LocalDateTime dateEnd = date != null ? date.plusDays(1).atStartOfDay() : DEFAULT_FILTER_END;

        return appointmentRepository.findAdminAppointments(status, serviceId, staffId, dateStart, dateEnd)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminAppointmentDto getAppointmentById(Long id) {
        return toDto(getManagedAppointment(id));
    }

    @Transactional
    public AdminAppointmentDto confirmAppointment(Long id) {
        Appointment appointment = getManagedAppointment(id);
        validateTransition(appointment.getStatus(), AppointmentStatus.CONFIRMED);
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        return toDto(appointment);
    }

    @Transactional
    public AdminAppointmentDto cancelAppointment(Long id) {
        Appointment appointment = getManagedAppointment(id);
        validateTransition(appointment.getStatus(), AppointmentStatus.CANCELLED);
        appointment.setStatus(AppointmentStatus.CANCELLED);
        return toDto(appointment);
    }

    @Transactional
    public AdminAppointmentDto completeAppointment(Long id) {
        Appointment appointment = getManagedAppointment(id);
        validateTransition(appointment.getStatus(), AppointmentStatus.COMPLETED);
        appointment.setStatus(AppointmentStatus.COMPLETED);
        return toDto(appointment);
    }

    private Appointment getManagedAppointment(Long id) {
        return appointmentRepository.findAdminAppointmentById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
    }

    private void validateTransition(AppointmentStatus currentStatus, AppointmentStatus targetStatus) {
        boolean validTransition = switch (currentStatus) {
            case REQUESTED -> targetStatus == AppointmentStatus.CONFIRMED || targetStatus == AppointmentStatus.CANCELLED;
            case CONFIRMED -> targetStatus == AppointmentStatus.CANCELLED || targetStatus == AppointmentStatus.COMPLETED;
            case CANCELLED, COMPLETED, NO_SHOW -> false;
        };

        if (!validTransition) {
            throw new ConflictException(
                    "Invalid appointment status transition from " + currentStatus + " to " + targetStatus
            );
        }
    }

    private AdminAppointmentDto toDto(Appointment appointment) {
        return new AdminAppointmentDto(
                appointment.getId(),
                appointment.getCustomerFirstName(),
                appointment.getCustomerLastName(),
                appointment.getCustomerPhone(),
                new AdminAppointmentTreatmentDto(
                        appointment.getTreatmentService().getId(),
                        appointment.getTreatmentService().getName(),
                        appointment.getTreatmentService().getSlug()
                ),
                new AdminAppointmentStaffDto(
                        appointment.getStaffMember().getId(),
                        appointment.getStaffMember().getFirstName(),
                        appointment.getStaffMember().getLastName(),
                        appointment.getStaffMember().getFirstName() + " " + appointment.getStaffMember().getLastName(),
                        appointment.getStaffMember().getTitle()
                ),
                appointment.getAppointmentStart(),
                appointment.getAppointmentEnd(),
                appointment.getStatus(),
                appointment.getKvkkApproved(),
                appointment.getNote(),
                appointment.getCreatedAt(),
                appointment.getUpdatedAt()
        );
    }
}
