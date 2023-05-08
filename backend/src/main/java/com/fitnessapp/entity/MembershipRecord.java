package com.fitnessapp.entity;

import com.fitnessapp.dto.ClubDto;

import java.util.Set;

public record MembershipRecord(Long id, String name, Set<ClubDto> clubs) {
}
