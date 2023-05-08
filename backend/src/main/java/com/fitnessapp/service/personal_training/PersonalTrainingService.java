package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainingDto;
import com.fitnessapp.entity.PersonalTraining;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.PersonalTrainingMapper;
import com.fitnessapp.repository.PersonalTrainingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonalTrainingService {
    private final PersonalTrainingRepository personalTrainingRepository;
    private final PersonalTrainingMapper personalTrainingMapper;

    public PersonalTraining save(PersonalTrainingDto personalTrainingDto) {
        return personalTrainingRepository.save(personalTrainingMapper.map(personalTrainingDto));
    }

    public List<PersonalTrainingDto> getAllByTrainingTypeId(Long id) {
        return personalTrainingRepository.findAllByPersonalTrainingTypeId(id).stream().map(personalTrainingMapper::map).toList();
    }

    public PersonalTrainingDto getById(Long id) {
        PersonalTraining personalTraining = personalTrainingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Training", "id", id));
        return personalTrainingMapper.map(personalTraining);
    }


}
