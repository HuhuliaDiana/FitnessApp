package com.fitnessapp.service.training_class;

import com.fitnessapp.dto.TrainingClassTypeDto;
import com.fitnessapp.entity.TrainingClassType;
import com.fitnessapp.enums.ClassType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.TrainingClassTypeMapper;
import com.fitnessapp.repository.TrainingClassTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingClassTypeService {
    private final TrainingClassTypeRepository trainingClassTypeRepository;
    private final TrainingClassTypeMapper trainingClassTypeMapper;

    public TrainingClassType save(TrainingClassTypeDto trainingClassTypeDto) {
        return trainingClassTypeRepository.save(trainingClassTypeMapper.map(trainingClassTypeDto));
    }

    public TrainingClassType findByName(ClassType name) {
        return trainingClassTypeRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Training class type", "name", name));
    }
    public List<TrainingClassTypeDto> getTrainingClassTypes() {
        return trainingClassTypeRepository.findAll().stream().map(trainingClassTypeMapper::map).toList();
    }
}
