package com.fitnessapp.mapper;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.entity.PersonalTrainer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonalTrainerMapper {
    PersonalTrainer map(PersonalTrainerDto personalTrainerDto);

    PersonalTrainerDto map(PersonalTrainer personalTrainerDto);
}
