package com.fitnessapp.controller;

import com.fitnessapp.dto.PersonalTrainingDto;
import com.fitnessapp.endpoints.PersonalTrainingEndpoints;
import com.fitnessapp.service.personal_training.PersonalTrainingService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(PersonalTrainingEndpoints.PERSONAL_TRAINING_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalTrainingController {
    private final PersonalTrainingService personalTrainingService;

    @Operation(summary = "Get PT by id")
    @GetMapping(PersonalTrainingEndpoints.PERSONAL_TRAINING_BY_ID)
    public PersonalTrainingDto getPTById(@PathVariable Long id) {
        return personalTrainingService.getById(id);

    }
}
