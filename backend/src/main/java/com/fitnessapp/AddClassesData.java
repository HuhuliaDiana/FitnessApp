package com.fitnessapp;

import com.fitnessapp.dto.TrainingClassDto;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.training_class.TrainingClassHourService;
import com.fitnessapp.service.training_class.TrainingClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Component
public class AddClassesData {
    private final TrainingClassService trainingClassService;
    private final ClubService clubService;
    private final TrainingClassHourService trainingClassHourService;

    private void saveClass(String class_date, String trainer_name, Long club_id, Long training_class_hour_id, Integer spots_available) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        TrainingClassDto trainingClass = new TrainingClassDto(null, LocalDateTime.parse(class_date, formatter), trainer_name, clubService.getClubById(club_id), trainingClassHourService.getById(training_class_hour_id), spots_available);
        trainingClassService.save(trainingClass);
    }

    public void saveClassesForAllClubs() {
        List<Long> clubsId = clubService.getAllClubsId();
        for (Long id : clubsId) {
            saveTrainingClasses(id);
        }
    }

    public void saveTrainingClasses(Long clubId) {
        //06-22
        //swimming
        saveClass("2023-06-22 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-06-22 18:00:00", "Claudia Apostol", clubId, 12L, 20);

        // aerobic
//        saveClass("2023-06-22 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-06-22 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-06-22 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-06-22 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-22 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-22 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //06-23
        //swimming
        saveClass("2023-06-23 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-06-23 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-23 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-06-23 18:30:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-06-23 20:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-06-23 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-23 18:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-23 19:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //06-24
        //swimming
        saveClass("2023-06-24 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-06-24 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-24 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-06-24 18:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-06-24 19:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-06-24 08:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-24 10:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-24 18:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //
        //06-25
        //swimming
//        saveClass("2023-06-25 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-06-25 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-25 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-06-25 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-06-25 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-06-25 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-25 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-25 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //06-26
        //swimming
//        saveClass("2023-06-26 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-06-26 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-26 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-06-26 18:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-06-26 19:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-06-26 08:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-26 10:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-26 18:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //06-27
        //swimming
//        saveClass("2023-06-27 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-06-27 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-27 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-06-27 18:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-06-27 19:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-06-27 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-27 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-27 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //06-28
        //swimming
//        saveClass("2023-06-28 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-06-28 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-06-28 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-06-28 18:30:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-06-28 20:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-06-28 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-06-28 18:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-06-28 19:00:00", "Dragos Burea", clubId, 11L, 30);


    }

}
