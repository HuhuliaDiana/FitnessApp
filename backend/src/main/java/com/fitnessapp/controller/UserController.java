package com.fitnessapp.controller;

import com.fitnessapp.dto.UserDto;
import com.fitnessapp.endpoints.UserEndpoints;
import com.fitnessapp.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping(UserEndpoints.USER_BASE_URL)
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Create new user.")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@Valid @RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }

    @Operation(summary = "Get current user.")
    @GetMapping
    public UserDto getCurrentUser() {
        return userService.findCurrentUser();
    }

    @Operation(summary = "Update contact info.")
    @PutMapping
    public UserDto updateCurrentUser(@Valid @RequestBody UserDto userDto){
        return userService.updateCurrentUser(userDto);
    }


}
