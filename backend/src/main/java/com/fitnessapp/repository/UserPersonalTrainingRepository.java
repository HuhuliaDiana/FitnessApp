package com.fitnessapp.repository;

import com.fitnessapp.entity.UserPersonalTraining;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserPersonalTrainingRepository extends JpaRepository<UserPersonalTraining, Long> {
    Optional<UserPersonalTraining> findByUserId(Long id);
    List<UserPersonalTraining> findByPersonalTrainerId(Long id);
}
