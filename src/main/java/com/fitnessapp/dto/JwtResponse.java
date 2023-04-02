package com.fitnessapp.dto;

import lombok.ToString;

import java.util.List;

public record JwtResponse(Long id, String email, List<String> roles, @ToString.Exclude String accessToken) {

    private static final String TOKEN_TYPE = "Bearer";

}
