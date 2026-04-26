package com.lina.clinic.appointment.repository;

import com.lina.clinic.appointment.entity.Appointment;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
            select a
            from Appointment a
            join fetch a.treatmentService ts
            join fetch a.staffMember sm
            where (:status is null or a.status = :status)
              and (:serviceId is null or ts.id = :serviceId)
              and (:staffId is null or sm.id = :staffId)
              and a.appointmentStart >= :dateStart
              and a.appointmentStart < :dateEnd
            order by a.appointmentStart asc
            """)
    List<Appointment> findAdminAppointments(
            @Param("status") AppointmentStatus status,
            @Param("serviceId") Long serviceId,
            @Param("staffId") Long staffId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );

    @Query("""
            select a
            from Appointment a
            join fetch a.treatmentService ts
            join fetch a.staffMember sm
            where a.id = :id
            """)
    Optional<Appointment> findAdminAppointmentById(@Param("id") Long id);
}
