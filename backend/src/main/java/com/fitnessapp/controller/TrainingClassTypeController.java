package com.fitnessapp.controller;

import com.fitnessapp.dto.TrainingClassTypeDto;
import com.fitnessapp.endpoints.TrainingClassEndpoints;
import com.fitnessapp.service.training_class.TrainingClassTypeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(TrainingClassEndpoints.TRAINING_CLASS_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingClassTypeController {
    private final TrainingClassTypeService trainingClassTypeService;
    @Operation(summary = "Get training class types.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_TYPES)
    public List<TrainingClassTypeDto> getTrainingClassTypes() {
        return trainingClassTypeService.getTrainingClassTypes();
    }

}
