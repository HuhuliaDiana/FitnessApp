package com.fitnessapp.mapper;

import com.fitnessapp.dto.PersonalTrainingDto;
import com.fitnessapp.entity.PersonalTraining;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonalTrainingMapper {
    PersonalTraining map(PersonalTrainingDto personalTrainingDto);
    PersonalTrainingDto map(PersonalTraining personalTraining);
}
