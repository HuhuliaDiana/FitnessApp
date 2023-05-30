package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PTSessionDto;
import com.fitnessapp.dto.PTSessionRecord;
import com.fitnessapp.entity.PTSession;
import com.fitnessapp.entity.PersonalTrainer;
import com.fitnessapp.entity.UserPersonalTraining;
import com.fitnessapp.exception.PTException;
import com.fitnessapp.mapper.PTSessionMapper;
import com.fitnessapp.repository.PTSessionRepository;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PTSessionService {

    private final PTSessionRepository ptSessionRepository;
    private final PTSessionMapper ptSessionMapper;
    private final PersonalTrainerService personalTrainerService;
    private final UserService userService;
    private final UserPersonalTrainingService userPersonalTrainingService;

    public PTSessionDto save(PTSession ptSession) {
        return ptSessionMapper.map(ptSessionRepository.save(ptSession));
    }

    public PTSessionDto bookPTSession(PTSessionRecord ptSessionRecord) {
        List<PTSession> currentUserPTSessions = ptSessionRepository.findByUserPersonalTrainingId(userPersonalTrainingService
                .getCurrentUserPersonalTraining().getId());
        Stream<PTSession> sessionsInSameDay = currentUserPTSessions
                .stream()
                .filter(ptSession -> ptSession.getSessionDate().equals(LocalDate.parse(ptSessionRecord.localDate())));

        if (sessionsInSameDay.findAny().isPresent()) {
            throw new PTException("You cannot book two sessions in the same day.");
        }
        UserPersonalTraining training = userPersonalTrainingService.getCurrentUserPersonalTraining();
        if (training.getNoSessionsLeft() == 0) {
            throw new PTException("No PT sessions left to book.");
        }
        PTSession ptSession = new PTSession();
        ptSession.setUserPersonalTraining(userPersonalTrainingService.getCurrentUserPersonalTraining());
        ptSession.setSessionDate(LocalDate.parse(ptSessionRecord.localDate()));
        ptSession.setStartSessionTime(ptSessionRecord.localTime());
        ptSession.setEndSessionTime(LocalTime.parse(ptSessionRecord.localTime()).plusHours(1).toString());
        training.setNoSessionsLeft(training.getNoSessionsLeft() - 1);
        return save(ptSession);
    }

    public List<PTSessionDto> getPTSessionsByTrainerId(Long id) {
        List<Long> trainingsIds = userPersonalTrainingService.getUserPTByTrainerId(id).stream().map(UserPersonalTraining::getId).toList();
        return ((List<PTSession>) ptSessionRepository.findAllByUserPersonalTrainingIdIn(trainingsIds)).stream().map(ptSessionMapper::map).toList();
    }

    public List<PTSessionDto> getBookingsPTHistoryOfCurrentUser() {
        UserPersonalTraining currentUserPT = userPersonalTrainingService.getCurrentUserPersonalTraining();
        var ptSessionDtoList = ptSessionRepository.findByUserPersonalTrainingId(currentUserPT.getId());
        var oldPTSessions = ptSessionDtoList.stream().filter(ptSession -> ptSession.getSessionDate().isBefore(LocalDate.now()) || (ptSession.getSessionDate().equals(LocalDate.now()) &&
                LocalTime.parse(ptSession.getEndSessionTime()).isBefore(LocalTime.now()))).toList();
        return oldPTSessions.stream().map(ptSessionMapper::map).toList();

    }

    public List<PTSessionDto> getBookingsPTOfCurrentUser() {
        UserPersonalTraining currentUserPT = userPersonalTrainingService.getCurrentUserPersonalTraining();
        var ptSessionDtoList = ptSessionRepository.findByUserPersonalTrainingId(currentUserPT.getId());
        var oldPTSessions = ptSessionDtoList.stream().filter(ptSession -> ptSession.getSessionDate().isAfter(LocalDate.now()) || (ptSession.getSessionDate().equals(LocalDate.now()) &&
                LocalTime.parse(ptSession.getEndSessionTime()).isAfter(LocalTime.now()))).toList();
        return oldPTSessions.stream().map(ptSessionMapper::map).toList();

    }
}
