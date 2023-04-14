package com.fitnessapp.mapper;

import com.fitnessapp.dto.TrainingClassDto;
import com.fitnessapp.entity.TrainingClass;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrainingClassMapper {
    TrainingClassDto map(TrainingClass trainingClass);
    TrainingClass map(TrainingClassDto trainingClass);
}
