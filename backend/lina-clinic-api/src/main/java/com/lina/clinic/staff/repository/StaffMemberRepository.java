package com.lina.clinic.staff.repository;

import com.lina.clinic.staff.entity.StaffMember;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffMemberRepository extends JpaRepository<StaffMember, Long> {

    List<StaffMember> findAllByActiveTrueOrderByFirstNameAscLastNameAsc();
}
