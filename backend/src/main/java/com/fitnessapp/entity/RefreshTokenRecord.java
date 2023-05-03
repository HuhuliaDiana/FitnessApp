package com.fitnessapp.entity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record RefreshTokenRecord (@NotNull @NotBlank String token){
}
