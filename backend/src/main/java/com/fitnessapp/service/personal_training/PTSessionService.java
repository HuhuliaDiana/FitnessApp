package com.fitnessapp.service.personal_training;

import com.fitnessapp.dto.PTSessionDto;
import com.fitnessapp.dto.PTSessionRecord;
import com.fitnessapp.entity.PTSession;
import com.fitnessapp.mapper.PTSessionMapper;
import com.fitnessapp.repository.PTSessionRepository;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PTSessionService {

    private final PTSessionRepository ptSessionRepository;
    private final PTSessionMapper ptSessionMapper;
    private final PersonalTrainerService personalTrainerService;
    private final UserService userService;

    public PTSessionDto save(PTSession ptSession) {
        return ptSessionMapper.map(ptSessionRepository.save(ptSession));
    }

    public PTSessionDto bookPTSession(PTSessionRecord ptSessionRecord) {
        PTSession ptSession = new PTSession();
        ptSession.setUser(userService.getCurrentUser());
        ptSession.setPersonalTrainer(personalTrainerService.findById(ptSessionRecord.trainerId()));
        ptSession.setSessionDate(LocalDate.parse(ptSessionRecord.localDate()));
        ptSession.setStartSessionTime(ptSessionRecord.localTime());
        ptSession.setEndSessionTime(LocalTime.parse(ptSessionRecord.localTime()).plusHours(1).toString());
        return save(ptSession);
    }

    public List<PTSessionDto> getPTSessionsByTrainerId(Long id) {
        return ptSessionRepository.findByPersonalTrainerId(id).stream().map(ptSessionMapper::map).toList();
    }
}
