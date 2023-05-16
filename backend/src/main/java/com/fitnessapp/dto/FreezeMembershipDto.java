package com.fitnessapp.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class FreezeMembershipDto {
    @NotNull
    @NotEmpty
    private LocalDate firstDayOfFreeze;
    private Integer numberOfDays;
}
