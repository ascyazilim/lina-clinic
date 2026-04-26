package com.lina.clinic.treatment.repository;

import com.lina.clinic.treatment.entity.TreatmentService;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentServiceRepository extends JpaRepository<TreatmentService, Long> {

    List<TreatmentService> findAllByActiveTrueOrderByNameAsc();

    @EntityGraph(attributePaths = "category")
    List<TreatmentService> findAllByActiveTrueAndCategoryActiveTrueOrderByCategoryDisplayOrderAscNameAsc();

    List<TreatmentService> findAllByCategoryIdAndActiveTrueOrderByNameAsc(Long categoryId);

    @EntityGraph(attributePaths = "category")
    Optional<TreatmentService> findByIdAndActiveTrueAndCategoryActiveTrue(Long id);

    Optional<TreatmentService> findBySlugAndActiveTrue(String slug);

    @EntityGraph(attributePaths = "category")
    Optional<TreatmentService> findBySlugAndActiveTrueAndCategoryActiveTrue(String slug);
}
