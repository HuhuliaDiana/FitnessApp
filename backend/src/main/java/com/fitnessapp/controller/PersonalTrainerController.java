package com.fitnessapp.controller;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.endpoints.PersonalTrainerEndpoints;
import com.fitnessapp.service.personal_training.PersonalTrainerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(PersonalTrainerEndpoints.PERSONAL_TRAINER_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalTrainerController {

    private final PersonalTrainerService personalTrainerService;

    @Operation(summary = "Get all trainers.")
    @GetMapping
    public List<PersonalTrainerDto> getAllTrainers() {
        return personalTrainerService.getAllTrainers();

    }

    @Operation(summary = "Get trainer by id.")
    @GetMapping(PersonalTrainerEndpoints.PERSONAL_TRAINER_BY_ID)
    public PersonalTrainerDto getTrainerById(@PathVariable Long id) {
        return personalTrainerService.getTrainerById(id);

    }
}
