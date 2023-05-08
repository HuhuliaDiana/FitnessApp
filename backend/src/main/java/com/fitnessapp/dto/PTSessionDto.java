package com.fitnessapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitnessapp.entity.PersonalTrainer;
import com.fitnessapp.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PTSessionDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    private UserDto user;
    private PersonalTrainerDto personalTrainer;
    private LocalDate sessionDate;
    private String startSessionTime;
    private String endSessionTime;


}
