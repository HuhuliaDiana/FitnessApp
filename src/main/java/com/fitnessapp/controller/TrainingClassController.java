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

    @Operation(summary = "Get all training classes available for current user.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_AVAILABLE)
    public List<TrainingClass> getAllClassesAvailableForCurrentUserByClubId() {
        return trainingClassService.getAllClassesAvailableForCurrentUser();
    }

    @Operation(summary = "Book a class by id.")
    @PatchMapping(TrainingClassEndpoints.TRAINING_CLASS_BOOK_BY_ID)
    public TrainingClass bookClass(@PathVariable Long id) {
        return trainingClassService.bookClass(id);
    }

    @Operation(summary = "Get all booked classes but not attended yet.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BOOKED_NOT_ATTENDED_YET)
    public List<TrainingClass> getClassesBookedNotYetAttended() {
        return trainingClassService.getClassesBookedNotYetAttended();
    }

    @Operation(summary = "Get history of booked classes.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BOOKED_HISTORY)
    public List<TrainingClass> getHistoryOfBookedClasses() {
        return trainingClassService.getHistoryOfBookedClasses();
    }

    @Operation(summary = "Get status of class by id for current user.")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASS_BY_ID_STATUS)
    public String getStatusOfClassForCurrentUser(@PathVariable Long id) {
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

    @Operation(summary = "Get all training classes for next 7 days by club id (from the rest of today till the end of last day).")
    @GetMapping(TrainingClassEndpoints.TRAINING_CLASSES_BY_CLUB_ID_IN_NEXT_7_DAYS)
    public List<TrainingClass> getAllClassesForNext7DaysByClubId(@PathVariable Long id) {
        return trainingClassService.getAllClassesForNext7DaysByClubId(id);
    }
}
