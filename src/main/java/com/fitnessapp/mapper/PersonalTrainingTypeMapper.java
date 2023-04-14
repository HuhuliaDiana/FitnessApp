package com.fitnessapp.mapper;

import com.fitnessapp.dto.PersonalTrainingTypeDto;
import com.fitnessapp.entity.PersonalTrainingType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonalTrainingTypeMapper {
    PersonalTrainingTypeDto map(PersonalTrainingType personalTrainingType);
    PersonalTrainingType map(PersonalTrainingTypeDto personalTrainingType);
}
