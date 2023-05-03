package com.fitnessapp.controller;

import com.fitnessapp.endpoints.CityEndpoints;
import com.fitnessapp.entity.CityRecord;
import com.fitnessapp.service.city.CityService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(CityEndpoints.CITY_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class CityController {
    private final CityService cityService;

    @Operation(summary = "Get all cities.")
    @GetMapping
    public List<CityRecord> getAllCities() {
        return cityService.getAllCities();
    }
}
