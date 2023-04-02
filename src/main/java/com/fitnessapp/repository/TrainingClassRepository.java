package com.fitnessapp.repository;

import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.TrainingClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;


public interface TrainingClassRepository extends JpaRepository<TrainingClass, Long> {
    Iterable<TrainingClass> findAllByClubInAndClassDateGreaterThanEqual(Iterable<Club> clubs, LocalDateTime dateTime);
}
