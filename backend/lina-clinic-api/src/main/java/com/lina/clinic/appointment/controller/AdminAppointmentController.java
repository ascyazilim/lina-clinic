package com.lina.clinic.appointment.controller;

import com.lina.clinic.appointment.dto.AdminAppointmentDto;
import com.lina.clinic.appointment.enums.AppointmentStatus;
import com.lina.clinic.appointment.service.AdminAppointmentService;
import com.lina.clinic.common.response.ApiResponse;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/appointments")
public class AdminAppointmentController {

    private final AdminAppointmentService adminAppointmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminAppointmentDto>>> getAppointments(
            @RequestParam(required = false) AppointmentStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) @Positive Long serviceId,
            @RequestParam(required = false) @Positive Long staffId
    ) {
        List<AdminAppointmentDto> appointments =
                adminAppointmentService.getAppointments(status, date, serviceId, staffId);
        return ResponseEntity.ok(ApiResponse.success("Appointments fetched successfully", appointments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminAppointmentDto>> getAppointmentById(@PathVariable @Positive Long id) {
        AdminAppointmentDto appointment = adminAppointmentService.getAppointmentById(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment fetched successfully", appointment));
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<ApiResponse<AdminAppointmentDto>> confirmAppointment(@PathVariable @Positive Long id) {
        AdminAppointmentDto appointment = adminAppointmentService.confirmAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment confirmed successfully", appointment));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<AdminAppointmentDto>> cancelAppointment(@PathVariable @Positive Long id) {
        AdminAppointmentDto appointment = adminAppointmentService.cancelAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment cancelled successfully", appointment));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<AdminAppointmentDto>> completeAppointment(@PathVariable @Positive Long id) {
        AdminAppointmentDto appointment = adminAppointmentService.completeAppointment(id);
        return ResponseEntity.ok(ApiResponse.success("Appointment completed successfully", appointment));
    }
}
