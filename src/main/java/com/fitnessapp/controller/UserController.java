package com.fitnessapp.controller;

import com.fitnessapp.dto.UserDto;
import com.fitnessapp.endpoints.UserEndPoints;
import com.fitnessapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(UserEndPoints.USER_BASE_URL)
public class UserController {
    private final UserService userService;

    @Operation(summary = "Create new user.")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@RequestBody UserDto userDto){
        return userService.createUser(userDto);
    }


}
