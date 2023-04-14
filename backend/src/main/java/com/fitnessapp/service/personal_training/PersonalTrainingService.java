package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainingDto;
import com.fitnessapp.entity.PersonalTraining;
import com.fitnessapp.mapper.PersonalTrainingMapper;
import com.fitnessapp.repository.PersonalTrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalTrainingService {
    private final PersonalTrainingRepository personalTrainingRepository;
    private final PersonalTrainingMapper personalTrainingMapper;

    public PersonalTraining save(PersonalTrainingDto personalTrainingDto) {
        return personalTrainingRepository.save(personalTrainingMapper.map(personalTrainingDto));
    }

}
