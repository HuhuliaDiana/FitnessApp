package com.fitnessapp.service.training_class;

import com.fitnessapp.dto.TrainingClassHourDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.TrainingClassHour;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.TrainingClassHourMapper;
import com.fitnessapp.repository.TrainingClassHourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrainingClassHourService {
    private final TrainingClassHourRepository trainingClassHourRepository;
    private final TrainingClassHourMapper trainingClassHourMapper;

    public TrainingClassHour save(TrainingClassHourDto trainingClassHourDto) {
        return trainingClassHourRepository.save(trainingClassHourMapper.map(trainingClassHourDto));
    }

    public TrainingClassHour findById(Long id) {
        return trainingClassHourRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Training class hour", "id", id));
    }

    public TrainingClassHourDto getById(Long id) {
        return trainingClassHourMapper.map(findById(id));
    }
}
