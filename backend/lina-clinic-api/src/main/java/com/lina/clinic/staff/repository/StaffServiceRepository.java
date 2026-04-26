package com.lina.clinic.staff.repository;

import com.lina.clinic.staff.entity.StaffService;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StaffServiceRepository extends JpaRepository<StaffService, Long> {

    boolean existsByStaffMemberIdAndTreatmentServiceId(Long staffMemberId, Long treatmentServiceId);

    List<StaffService> findAllByStaffMemberId(Long staffMemberId);

    List<StaffService> findAllByTreatmentServiceId(Long treatmentServiceId);

    @Query("""
            select ss
            from StaffService ss
            join fetch ss.staffMember sm
            where ss.treatmentService.id = :treatmentServiceId
              and sm.active = true
            order by sm.id asc
            """)
    List<StaffService> findActiveStaffServicesByTreatmentServiceId(@Param("treatmentServiceId") Long treatmentServiceId);
}
