package com.fitnessapp.mapper;

import com.fitnessapp.dto.TrainingClassTypeDto;
import com.fitnessapp.entity.TrainingClassType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface TrainingClassTypeMapper {
    TrainingClassType map(TrainingClassTypeDto trainingClassTypeDto);
    TrainingClassTypeDto map(TrainingClassType trainingClassTypeDto);
}
