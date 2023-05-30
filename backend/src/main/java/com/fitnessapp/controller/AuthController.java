package com.fitnessapp.controller;

import com.fitnessapp.dto.JwtResponse;
import com.fitnessapp.dto.LoginRequest;
import com.fitnessapp.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationFacade authenticationFacade;

    @PostMapping("/login")
    public JwtResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authenticationFacade.authenticateUser(loginRequest);

    }
}
