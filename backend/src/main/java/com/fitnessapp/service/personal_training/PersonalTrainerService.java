package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.entity.PersonalTrainer;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.PersonalTrainerMapper;
import com.fitnessapp.repository.PersonalTrainerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonalTrainerService {
    private final PersonalTrainerRepository personalTrainerRepository;
    private final PersonalTrainerMapper personalTrainerMapper;

    public PersonalTrainer save(PersonalTrainerDto personalTrainerDto) {
        return personalTrainerRepository.save(personalTrainerMapper.map(personalTrainerDto));
    }

    public List<PersonalTrainerDto> getAllTrainers() {
        return personalTrainerRepository.findAll().stream().map(personalTrainerMapper::map).toList();
    }

    public PersonalTrainerDto getTrainerById(Long id) {
        return personalTrainerMapper.map(findById(id));
    }

    private PersonalTrainer findById(Long id) {
        return personalTrainerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Trainer", "id", id));
    }
}
