package com.lina.clinic.appointment.controller;

import com.lina.clinic.appointment.dto.AppointmentCreateRequest;
import com.lina.clinic.appointment.dto.AppointmentCreatedDto;
import com.lina.clinic.appointment.dto.AvailableSlotDto;
import com.lina.clinic.appointment.service.PublicAppointmentService;
import com.lina.clinic.common.response.ApiResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicAppointmentController {

    private final PublicAppointmentService publicAppointmentService;

    @GetMapping("/available-slots")
    public ResponseEntity<ApiResponse<List<AvailableSlotDto>>> getAvailableSlots(
            @RequestParam @NotNull @Positive Long serviceId,
            @RequestParam @NotNull @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<AvailableSlotDto> availableSlots = publicAppointmentService.getAvailableSlots(serviceId, date);
        return ResponseEntity.ok(ApiResponse.success("Available slots fetched successfully", availableSlots));
    }

    @PostMapping("/appointments")
    public ResponseEntity<ApiResponse<AppointmentCreatedDto>> createAppointment(
            @Valid @RequestBody AppointmentCreateRequest request
    ) {
        AppointmentCreatedDto createdAppointment = publicAppointmentService.createAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Appointment request created successfully", createdAppointment));
    }
}
