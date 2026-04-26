package com.lina.clinic.treatment.dto;

public record TreatmentDetailDto(
        Long id,
        String name,
        String slug,
        TreatmentCategoryDto category,
        String shortDescription,
        String detailDescription,
        Integer durationMinutes,
        Boolean requiresDoctor
) {
}
