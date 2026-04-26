package com.lina.clinic.appointment.entity;

import com.lina.clinic.appointment.enums.AppointmentStatus;
import com.lina.clinic.common.entity.AuditableEntity;
import com.lina.clinic.staff.entity.StaffMember;
import com.lina.clinic.treatment.entity.TreatmentService;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment extends AuditableEntity {

    @NotBlank
    @Size(max = 100)
    @Column(name = "customer_first_name", nullable = false, length = 100)
    private String customerFirstName;

    @NotBlank
    @Size(max = 100)
    @Column(name = "customer_last_name", nullable = false, length = 100)
    private String customerLastName;

    @NotBlank
    @Size(max = 20)
    @Column(name = "customer_phone", nullable = false, length = 20)
    private String customerPhone;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "treatment_service_id", nullable = false)
    private TreatmentService treatmentService;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staff_member_id", nullable = false)
    private StaffMember staffMember;

    @NotNull
    @Column(name = "appointment_start", nullable = false)
    private LocalDateTime appointmentStart;

    @NotNull
    @Column(name = "appointment_end", nullable = false)
    private LocalDateTime appointmentEnd;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AppointmentStatus status = AppointmentStatus.REQUESTED;

    @NotNull
    @Column(name = "kvkk_approved", nullable = false)
    private Boolean kvkkApproved = Boolean.FALSE;

    @Size(max = 1000)
    @Column(columnDefinition = "TEXT")
    private String note;
}
