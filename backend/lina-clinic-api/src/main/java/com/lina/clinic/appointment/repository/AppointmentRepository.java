package com.lina.clinic.appointment.repository;

import com.lina.clinic.appointment.entity.Appointment;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByStaffMemberIdAndAppointmentStartLessThanAndAppointmentEndGreaterThanAndStatusIn(
            Long staffMemberId,
            LocalDateTime appointmentEnd,
            LocalDateTime appointmentStart,
            Collection<AppointmentStatus> statuses
    );

    List<Appointment> findAllByStatusOrderByAppointmentStartAsc(AppointmentStatus status);

    List<Appointment> findAllByStaffMemberIdAndAppointmentStartBetween(
            Long staffMemberId,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Appointment> findAllByStaffMemberIdAndAppointmentStartLessThanAndAppointmentEndGreaterThanAndStatusInOrderByAppointmentStartAsc(
            Long staffMemberId,
            LocalDateTime appointmentEnd,
            LocalDateTime appointmentStart,
            Collection<AppointmentStatus> statuses
    );
}
