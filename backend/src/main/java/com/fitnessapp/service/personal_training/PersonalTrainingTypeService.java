package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainingTypeDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.PersonalTrainingType;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.enums.TrainingType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.PersonalTrainingTypeMapper;
import com.fitnessapp.repository.PersonalTrainingTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalTrainingTypeService {

    private final PersonalTrainingTypeRepository personalTrainingTypeRepository;
    private final PersonalTrainingTypeMapper personalTrainingTypeMapper;

    public PersonalTrainingType save(PersonalTrainingTypeDto personalTrainingTypeDto) {
        return personalTrainingTypeRepository.save(personalTrainingTypeMapper.map(personalTrainingTypeDto));
    }

    public PersonalTrainingType findByName(TrainingType name) {
        return personalTrainingTypeRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("Personal Training Type", "name", name));
    }
}
