package com.lina.clinic.appointment.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AvailableSlotDto(
        LocalDate date,
        LocalTime time
) {
}
