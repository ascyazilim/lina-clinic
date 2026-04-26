package com.lina.clinic.workinghour.repository;

import com.lina.clinic.workinghour.entity.WorkingHour;
import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkingHourRepository extends JpaRepository<WorkingHour, Long> {

    List<WorkingHour> findAllByActiveTrue();

    Optional<WorkingHour> findByDayOfWeekAndActiveTrue(DayOfWeek dayOfWeek);
}
