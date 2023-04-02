package com.fitnessapp.repository;

import com.fitnessapp.entity.TrainingClassType;
import com.fitnessapp.enums.ClassType;
import com.fitnessapp.enums.ECity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TrainingClassTypeRepository extends JpaRepository<TrainingClassType,Long> {
    Optional<TrainingClassType> findByName(ClassType name);
}
