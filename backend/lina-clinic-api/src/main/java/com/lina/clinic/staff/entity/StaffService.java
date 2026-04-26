package com.lina.clinic.staff.entity;

import com.lina.clinic.common.entity.BaseEntity;
import com.lina.clinic.treatment.entity.TreatmentService;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
        name = "staff_services",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_staff_services_staff_member_treatment_service",
                        columnNames = {"staff_member_id", "treatment_service_id"}
                )
        }
)
public class StaffService extends BaseEntity {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staff_member_id", nullable = false)
    private StaffMember staffMember;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "treatment_service_id", nullable = false)
    private TreatmentService treatmentService;
}
