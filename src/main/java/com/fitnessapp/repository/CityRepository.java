package com.fitnessapp.repository;

import com.fitnessapp.entity.City;
import com.fitnessapp.enums.ECity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City,Long> {
    Optional<City> findByName(ECity name);

}
