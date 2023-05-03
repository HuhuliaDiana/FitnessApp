package com.fitnessapp.repository;

import com.fitnessapp.entity.PersonalTraining;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PersonalTrainingRepository extends JpaRepository<PersonalTraining, Long> {
    List<PersonalTraining> findAllByPersonalTrainingTypeId(Long id);
}
