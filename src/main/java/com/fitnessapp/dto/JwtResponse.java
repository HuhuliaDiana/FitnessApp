package com.fitnessapp.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class JwtResponse {

    private final Long id;
    private final String email;
    private final List<String> roles;
    @ToString.Exclude
    private final String accessToken;
    private static final String TOKEN_TYPE = "Bearer";

}
