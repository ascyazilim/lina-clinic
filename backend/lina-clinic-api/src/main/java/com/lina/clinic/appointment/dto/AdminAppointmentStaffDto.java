package com.lina.clinic.appointment.dto;

public record AdminAppointmentStaffDto(
        Long id,
        String firstName,
        String lastName,
        String fullName,
        String title
) {
}
