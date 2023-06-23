package com.fitnessapp.controller;

import com.fitnessapp.dto.TrainingClassDto;
import com.fitnessapp.endpoints.TrainingClassEndpoints;
import com.fitnessapp.entity.StatusMessage;
import com.fitnessapp.entity.TrainingClass;
import com.fitnessapp.service.training_class.TrainingClassService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(TrainingClassEndpoints.TRAINING_CLASS_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class TrainingClassController {
    private final TrainingClassService trainingClassService;

    @Operation(summary = "Get class by id.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BY_ID)
    public TrainingClassDto getClassById(@PathVariable Long id) {
        return trainingClassService.findById(id);
    }

    @Operation(summary = "Book a class by id.")
    @PatchMapping(TrainingClassEndpoints.TRAINING_CLASS_BOOK_BY_ID)
    public TrainingClassDto bookClass(@PathVariable Long id) {
        return trainingClassService.bookClass(id);
    }

    @Operation(summary = "Get all booked classes but not attended yet.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BOOKED_NOT_ATTENDED_YET)
    public List<TrainingClassDto> getClassesBookedNotYetAttended() {
        return trainingClassService.getClassesBookedNotYetAttended();
    }

    @Operation(summary = "Get history of booked classes.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BOOKED_HISTORY)
    public List<TrainingClassDto> getHistoryOfBookedClasses() {
        return trainingClassService.getHistoryOfBookedClasses();
    }

    @Operation(summary = "Get status of class by id for current user.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_STATUS)
    public StatusMessage getStatusOfClassForCurrentUser(@PathVariable Long id) {
        return trainingClassService.getStatusOfClassForCurrentUser(id);
    }

    @Operation(summary = "Cancel booking for class by id")
    @PatchMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_CANCEL_BOOKING)
    public void cancelBookingOfClassById(@PathVariable Long id) {
        trainingClassService.cancelBookingOfClass(id);
    }

    @Operation(summary = "Check if class is cancelable by user. Return true if it is.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_CANCELABLE)
    public boolean isClassCancelableByUser(@PathVariable Long id) {
        return trainingClassService.isClassCancelableByUser(id);
    }

    @Operation(summary = "Get all training classes for next 7 days by subscription club.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BY_SUBSCRIPTION_CLUB_IN_NEXT_7_DAYS)
    public List<TrainingClassDto> getAllClassesForNext7DaysByClubId() {
        return trainingClassService.getAllClassesForNext7DaysByClubId();
    }

    @Operation(summary = "Get all training classes for next 7 days (from the rest of today till the end of last day).")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_IN_NEXT_7_DAYS)
    public List<TrainingClassDto> getAllClassesForNext7Days() {
        return trainingClassService.getAllClassesForNext7Days();
    }




}
