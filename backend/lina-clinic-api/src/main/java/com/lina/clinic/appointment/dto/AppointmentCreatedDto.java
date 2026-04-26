package com.lina.clinic.appointment.dto;

import com.lina.clinic.appointment.enums.AppointmentStatus;
import java.time.LocalDateTime;

public record AppointmentCreatedDto(
        Long id,
        AppointmentStatus status,
        Long treatmentServiceId,
        String treatmentServiceName,
        LocalDateTime appointmentStart,
        LocalDateTime appointmentEnd
) {
}
