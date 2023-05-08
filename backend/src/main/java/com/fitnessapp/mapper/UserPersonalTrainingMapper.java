package com.fitnessapp.mapper;

import com.fitnessapp.dto.UserPersonalTrainingDto;
import com.fitnessapp.entity.UserPersonalTraining;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserPersonalTrainingMapper {
    UserPersonalTrainingDto map(UserPersonalTraining userPersonalTraining);
    UserPersonalTraining map(UserPersonalTrainingDto userPersonalTraining);
}
