package com.fitnessapp.controller;

import com.fitnessapp.dto.PTSessionDto;
import com.fitnessapp.dto.PTSessionRecord;
import com.fitnessapp.service.personal_training.PTSessionService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pt-session")
@CrossOrigin(origins = "http://localhost:3000")
public class PTSessionController {
    private final PTSessionService ptSessionService;

    @Operation(summary = "Book PT session.")
    @PostMapping
    public PTSessionDto bookPTSession(@RequestBody PTSessionRecord ptSessionRecord) {
        return ptSessionService.bookPTSession(ptSessionRecord);
    }

    @Operation(summary = "Get all PT session by trainer id.")
    @GetMapping("/{id}")
    public List<PTSessionDto> getPTSessionsByTrainerId(@PathVariable Long id) {
        return ptSessionService.getPTSessionsByTrainerId(id);
    }

    @Operation(summary = "Get bookings PT history of current user.")
    @GetMapping("/bookings-history")
    public List<PTSessionDto> getBookingsPTHistoryOfCurrentUser() {
        return ptSessionService.getBookingsPTHistoryOfCurrentUser();
    }

    @Operation(summary = "Get bookings PT of current user.")
    @GetMapping("/bookings")
    public List<PTSessionDto> getBookingsPTOfCurrentUser() {
        return ptSessionService.getBookingsPTOfCurrentUser();
    }
}
