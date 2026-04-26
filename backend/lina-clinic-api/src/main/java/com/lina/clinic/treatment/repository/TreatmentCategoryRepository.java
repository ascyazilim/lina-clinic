package com.lina.clinic.treatment.repository;

import com.lina.clinic.treatment.entity.TreatmentCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreatmentCategoryRepository extends JpaRepository<TreatmentCategory, Long> {

    List<TreatmentCategory> findAllByActiveTrueOrderByDisplayOrderAscIdAsc();

    Optional<TreatmentCategory> findBySlugAndActiveTrue(String slug);
}
