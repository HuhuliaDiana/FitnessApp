package com.fitnessapp.mapper;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.entity.City;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CityMapper {

    CityDto map(City city);
    City map(CityDto cityDto);
}
