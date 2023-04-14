package com.fitnessapp.repository;

import com.fitnessapp.entity.PersonalTrainingType;
import com.fitnessapp.enums.TrainingType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalTrainingTypeRepository extends JpaRepository<PersonalTrainingType, Long> {
    Optional<PersonalTrainingType> findByName(TrainingType name);
}
