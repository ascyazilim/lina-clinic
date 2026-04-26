package com.lina.clinic.treatment.dto;

public record TreatmentSummaryDto(
        Long id,
        String name,
        String slug,
        TreatmentCategoryDto category,
        String shortDescription,
        Integer durationMinutes,
        Boolean requiresDoctor
) {
}
