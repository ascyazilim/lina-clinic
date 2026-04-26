package com.lina.clinic.treatment.controller;

import com.lina.clinic.common.response.ApiResponse;
import com.lina.clinic.treatment.dto.TreatmentDetailDto;
import com.lina.clinic.treatment.dto.TreatmentSummaryDto;
import com.lina.clinic.treatment.service.PublicTreatmentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public/services")
public class PublicTreatmentController {

    private final PublicTreatmentService publicTreatmentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TreatmentSummaryDto>>> getServices() {
        List<TreatmentSummaryDto> services = publicTreatmentService.getActiveServices();
        return ResponseEntity.ok(ApiResponse.success("Treatment services fetched successfully", services));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<TreatmentDetailDto>> getServiceBySlug(@PathVariable String slug) {
        TreatmentDetailDto service = publicTreatmentService.getServiceBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Treatment service fetched successfully", service));
    }
}
