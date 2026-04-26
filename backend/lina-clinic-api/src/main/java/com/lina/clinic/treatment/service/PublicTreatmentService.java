package com.lina.clinic.treatment.service;

import com.lina.clinic.common.exception.ResourceNotFoundException;
import com.lina.clinic.treatment.dto.TreatmentCategoryDto;
import com.lina.clinic.treatment.dto.TreatmentDetailDto;
import com.lina.clinic.treatment.dto.TreatmentSummaryDto;
import com.lina.clinic.treatment.entity.TreatmentCategory;
import com.lina.clinic.treatment.entity.TreatmentService;
import com.lina.clinic.treatment.repository.TreatmentServiceRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PublicTreatmentService {

    private final TreatmentServiceRepository treatmentServiceRepository;

    @Transactional(readOnly = true)
    public List<TreatmentSummaryDto> getActiveServices() {
        return treatmentServiceRepository.findAllByActiveTrueAndCategoryActiveTrueOrderByCategoryDisplayOrderAscNameAsc()
                .stream()
                .map(this::toSummaryDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public TreatmentDetailDto getServiceBySlug(String slug) {
        TreatmentService treatmentService = treatmentServiceRepository.findBySlugAndActiveTrueAndCategoryActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Treatment service not found"));

        return toDetailDto(treatmentService);
    }

    private TreatmentSummaryDto toSummaryDto(TreatmentService treatmentService) {
        return new TreatmentSummaryDto(
                treatmentService.getId(),
                treatmentService.getName(),
                treatmentService.getSlug(),
                toCategoryDto(treatmentService.getCategory()),
                treatmentService.getShortDescription(),
                treatmentService.getDurationMinutes(),
                treatmentService.getRequiresDoctor()
        );
    }

    private TreatmentDetailDto toDetailDto(TreatmentService treatmentService) {
        return new TreatmentDetailDto(
                treatmentService.getId(),
                treatmentService.getName(),
                treatmentService.getSlug(),
                toCategoryDto(treatmentService.getCategory()),
                treatmentService.getShortDescription(),
                treatmentService.getDetailDescription(),
                treatmentService.getDurationMinutes(),
                treatmentService.getRequiresDoctor()
        );
    }

    private TreatmentCategoryDto toCategoryDto(TreatmentCategory category) {
        return new TreatmentCategoryDto(
                category.getId(),
                category.getName(),
                category.getSlug()
        );
    }
}
