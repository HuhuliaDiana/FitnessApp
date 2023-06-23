package com.fitnessapp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fitnessapp.enums.PTSex;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonalTrainerDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;
    @NotNull
    @NotEmpty
    private String name;
    private Set<ClubDto> clubs = new HashSet<>();
    private Set<PersonalTrainingDto> personalTrainings = new HashSet<>();
    @NotNull
    private PTSex sex;


}
