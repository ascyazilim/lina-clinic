package com.lina.clinic.treatment.entity;

import com.lina.clinic.common.entity.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "treatment_services",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_treatment_services_slug", columnNames = "slug")
        }
)
public class TreatmentService extends AuditableEntity {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private TreatmentCategory category;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String name;

    @NotBlank
    @Size(max = 160)
    @Column(nullable = false, length = 160)
    private String slug;

    @NotBlank
    @Size(max = 500)
    @Column(name = "short_description", nullable = false, length = 500)
    private String shortDescription;

    @NotBlank
    @Column(name = "detail_description", nullable = false, columnDefinition = "TEXT")
    private String detailDescription;

    @NotNull
    @Positive
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @NotNull
    @Column(nullable = false)
    private Boolean active = Boolean.TRUE;

    @NotNull
    @Column(name = "requires_doctor", nullable = false)
    private Boolean requiresDoctor = Boolean.FALSE;
}
