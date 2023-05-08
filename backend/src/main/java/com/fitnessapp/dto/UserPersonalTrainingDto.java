package com.fitnessapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitnessapp.entity.PersonalTrainer;
import com.fitnessapp.entity.PersonalTraining;
import com.fitnessapp.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserPersonalTrainingDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    private UserDto user;
    private PersonalTrainingDto personalTraining;
    private LocalDate startDate;
    private PersonalTrainerDto personalTrainer;
    private Integer noSessionsLeft;

}
