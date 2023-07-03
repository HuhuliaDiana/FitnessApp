package com.fitnessapp;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.enums.PTSex;
import com.fitnessapp.repository.ClubRepository;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.personal_training.PersonalTrainerService;
import com.fitnessapp.service.personal_training.PersonalTrainingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Component
public class AddTrainersData {
    private final PersonalTrainerService personalTrainerService;
    private final ClubService clubService;
    private final ClubRepository clubRepository;
    private final PersonalTrainingService personalTrainingService;

    private void saveTrainer(String name, Long trainingTypeId, Long clubId, PTSex sex) {
        PersonalTrainerDto trainerDto = new PersonalTrainerDto();
        trainerDto.setName(name);
        trainerDto.setSex(sex);
        trainerDto.getPersonalTrainings().addAll(personalTrainingService.getAllByTrainingTypeId(trainingTypeId));
        trainerDto.getClubs().add(clubService.getClubById(clubId));
        personalTrainerService.save(trainerDto);
    }

    private void saveTrainersByClubId(Long clubId) {
        Long cityId = clubService.getClubById(clubId).getCity().getId();
        if (cityId % 2 == 0) {
            saveTrainer("Ramona Ganea", 3L, clubId, PTSex.F);
            saveTrainer("Liliana Neagu", 2L, clubId, PTSex.F);
            saveTrainer("Alexandru Mitu", 1L, clubId, PTSex.M);
            saveTrainer("Valentin Vacariu", 3L, clubId, PTSex.M);
        } else {
            saveTrainer("Laurentiu Sandu", 3L, clubId, PTSex.M);
            saveTrainer("Daniel Ionescu", 1L, clubId, PTSex.M);
            saveTrainer("Paul Stoicescu", 2L, clubId, PTSex.M);
            saveTrainer("Cristina Popescu", 1L, clubId, PTSex.F);
        }
    }

    public void saveTrainers() {
        clubRepository.findAll().forEach(club -> {
            saveTrainersByClubId(club.getId());
        });
    }


}
