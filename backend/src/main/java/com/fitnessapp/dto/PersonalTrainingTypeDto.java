package com.fitnessapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitnessapp.enums.TrainingType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PersonalTrainingTypeDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    @NotNull
    private TrainingType name;
}
