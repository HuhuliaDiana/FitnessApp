package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.entity.PersonalTrainer;
import com.fitnessapp.mapper.PersonalTrainerMapper;
import com.fitnessapp.repository.PersonalTrainerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalTrainerService {
    private final PersonalTrainerRepository personalTrainerRepository;
    private final PersonalTrainerMapper personalTrainerMapper;

    public PersonalTrainer save(PersonalTrainerDto personalTrainerDto) {
        return personalTrainerRepository.save(personalTrainerMapper.map(personalTrainerDto));
    }

}
