package com.fitnessapp.entity;

import com.fitnessapp.dto.ClubDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

public record CityRecord(Long id, String name, Set<ClubDto> clubs ) {
}
