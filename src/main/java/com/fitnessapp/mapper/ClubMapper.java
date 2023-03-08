package com.fitnessapp.mapper;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.Club;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClubMapper {
    ClubDto map(Club club);
    Club map(ClubDto club);
}
