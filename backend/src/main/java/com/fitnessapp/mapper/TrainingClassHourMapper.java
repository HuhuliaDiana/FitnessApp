package com.fitnessapp.mapper;

import com.fitnessapp.dto.TrainingClassHourDto;
import com.fitnessapp.entity.TrainingClassHour;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface TrainingClassHourMapper {
    TrainingClassHourDto map(TrainingClassHour trainingClassHour);
    TrainingClassHour map(TrainingClassHourDto trainingClassHour);
}
