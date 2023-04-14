package com.fitnessapp.repository;

import com.fitnessapp.entity.PersonalTrainer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalTrainerRepository extends JpaRepository<PersonalTrainer, Long> {
}
