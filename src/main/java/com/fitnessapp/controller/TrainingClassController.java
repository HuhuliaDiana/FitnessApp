package com.fitnessapp.controller;

import com.fitnessapp.endpoints.TrainingClassEndpoints;
import com.fitnessapp.entity.TrainingClass;
import com.fitnessapp.service.training_class.TrainingClassService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(TrainingClassEndpoints.TRAINING_CLASS_BASE_URL)
public class TrainingClassController {
    private final TrainingClassService trainingClassService;

    @Operation(summary = "Get all training classes available for current user by club.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_FOR_CURRENT_USER_BY_CLUB_ID)
    public List<TrainingClass> getAllClassesAvailableForCurrentUserByClubId() {
        return trainingClassService.getAllClassesAvailableForCurrentUser();
    }

    @Operation(summary = "Book a class by id.")
    @PostMapping(TrainingClassEndpoints.TRAINING_CLASS_BOOK_BY_ID)
    public TrainingClass bookClass(@PathVariable Long id) {
        return trainingClassService.bookClass(id);
    }

    @Operation(summary = "Check if class is already booked. Return true if it is, false if it's not.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_ALREADY_BOOKED)
    public boolean checkIfClassIsAlreadyBookedByCurrentUser(@PathVariable Long id) {
        return trainingClassService.isClassBookedByCurrentUser(id);
    }

    @Operation(summary = "Get status of class by id for current user.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_STATUS)
    public String getStatusOfClassForCurrentUser(@PathVariable Long id) {
        return trainingClassService.getStatusOfClassForCurrentUser(id);
    }


}
