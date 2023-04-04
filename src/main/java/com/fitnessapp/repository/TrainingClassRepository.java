package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.TrainingClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public interface TrainingClassRepository extends JpaRepository<TrainingClass, Long> {
    Iterable<TrainingClass> findAllByClubInAndClassDateGreaterThanEqual(Iterable<Club> clubs, LocalDateTime dateTime);
    List<TrainingClass> findAllByClubIdAndClassDateBetween(Long clubId, LocalDateTime today, LocalDateTime lastDay);

    List<TrainingClass> findAllByClubIdAndClassDateGreaterThanEqual(Long clubId, LocalDate localDate);
}
