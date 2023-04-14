package com.fitnessapp.repository;

import com.fitnessapp.entity.PersonalTraining;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalTrainingRepository extends JpaRepository<PersonalTraining, Long> {
}
