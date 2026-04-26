package com.lina.clinic.appointment.dto;

import com.lina.clinic.appointment.enums.AppointmentStatus;
import java.time.LocalDateTime;

public record AdminAppointmentDto(
        Long id,
        String customerFirstName,
        String customerLastName,
        String customerPhone,
        AdminAppointmentTreatmentDto treatmentService,
        AdminAppointmentStaffDto staffMember,
        LocalDateTime appointmentStart,
        LocalDateTime appointmentEnd,
        AppointmentStatus status,
        Boolean kvkkApproved,
        String note,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
