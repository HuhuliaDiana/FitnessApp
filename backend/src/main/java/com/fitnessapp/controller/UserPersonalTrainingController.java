package com.fitnessapp.controller;

import com.fitnessapp.dto.TrainingDto;
import com.fitnessapp.dto.UserPersonalTrainingDto;
import com.fitnessapp.service.personal_training.UserPersonalTrainingService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user-training")
@CrossOrigin(origins = "http://localhost:3000")
public class UserPersonalTrainingController {
    private final UserPersonalTrainingService userPersonalTrainingService;

    @Operation(summary = "Buy training by training id, trainer id and start date.")
    @PostMapping
    public UserPersonalTrainingDto buyTraining(@Valid @RequestBody TrainingDto trainingDto){
        return userPersonalTrainingService.buyPersonalTraining(trainingDto);
    }


    @Operation(summary = "Get PT bought by current user.")
    @GetMapping
    public UserPersonalTrainingDto getPTOfCurrentUser(){
        return userPersonalTrainingService.getPTOfCurrentUser();
    }

}
