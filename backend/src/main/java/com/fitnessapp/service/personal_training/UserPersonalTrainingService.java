package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PersonalTrainerDto;
import com.fitnessapp.dto.PersonalTrainingDto;
import com.fitnessapp.dto.TrainingDto;
import com.fitnessapp.dto.UserPersonalTrainingDto;
import com.fitnessapp.entity.UserPersonalTraining;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.UserPersonalTrainingMapper;
import com.fitnessapp.repository.UserPersonalTrainingRepository;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPersonalTrainingService {
    private final UserPersonalTrainingRepository userPersonalTrainingRepository;
    private final UserPersonalTrainingMapper userPersonalTrainingMapper;
    private final PersonalTrainingService personalTrainingService;
    private final PersonalTrainerService personalTrainerService;
    private final UserService userService;

    public UserPersonalTraining save(UserPersonalTrainingDto personalTrainingDto) {
        return userPersonalTrainingRepository.save(userPersonalTrainingMapper.map(personalTrainingDto));
    }

    public UserPersonalTraining getById(Long id) {
        return userPersonalTrainingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User personal training", "id", id));
    }


    public UserPersonalTrainingDto buyPersonalTraining(TrainingDto trainingDto) {

        PersonalTrainingDto training = personalTrainingService.getById(trainingDto.getTrainingId());
        PersonalTrainerDto trainer = personalTrainerService.getTrainerById(trainingDto.getTrainerId());
        UserPersonalTrainingDto userPersonalTrainingDto = new UserPersonalTrainingDto();
        userPersonalTrainingDto.setPersonalTrainer(trainer);
        userPersonalTrainingDto.setPersonalTraining(training);
        userPersonalTrainingDto.setUser(userService.mapCurrentUser());
        LocalDate date = LocalDate.parse(trainingDto.getStartDate());
        userPersonalTrainingDto.setStartDate(date);
        userPersonalTrainingDto.setNoSessionsLeft(training.getSessionsNumber());
        return userPersonalTrainingMapper.map(save(userPersonalTrainingDto));

    }

    public UserPersonalTrainingDto getPTOfCurrentUser() {
        UserPersonalTraining training = getCurrentUserPersonalTraining();
        return userPersonalTrainingMapper.map(training);

    }

    public UserPersonalTraining getCurrentUserPersonalTraining() {
        Long userId = userService.getCurrentUserId();
        return userPersonalTrainingRepository.findByUserId(userId).orElseThrow(() -> new EntityNotFoundException("User personal training", "user_id", userId));
    }

    public List<UserPersonalTraining> getUserPTByTrainerId(Long id) {
        return userPersonalTrainingRepository.findByPersonalTrainerId(id);
    }

}
