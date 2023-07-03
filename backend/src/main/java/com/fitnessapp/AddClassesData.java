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

        //07-03
        //swimming
        saveClass("2023-07-03 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-03 18:00:00", "Claudia Apostol", clubId, 12L, 20);

        // aerobic
//        saveClass("2023-07-03 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-03 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-07-03 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-07-03 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-03 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-03 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //07-04
        //swimming
        saveClass("2023-07-04 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-04 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-04 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-04 18:30:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-04 20:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-04 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-04 18:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-04 19:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //07-05
        //swimming
        saveClass("2023-07-05 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-05 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-05 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-07-05 18:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-05 19:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-05 08:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-05 10:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-05 18:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //
        //07-06
        //swimming
//        saveClass("2023-07-06 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-07-06 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-06 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-06 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-07-06 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-07-06 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-06 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-06 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //07-07
        //swimming
//        saveClass("2023-07-07 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-07-07 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-07 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-07-07 18:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-07 19:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-07 08:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-07 10:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-07 18:00:00", "Dragos Burea", clubId, 11L, 30);
        //
        //07-08
        //swimming
//        saveClass("2023-07-08 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-07-08 10:20:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-08 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-07-08 13:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-08 12:30:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-08 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-08 11:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-08 11:30:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //07-09
        //swimming
//        saveClass("2023-07-09 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-07-09 10:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-09 07:30:00", "Costel Rotaru", clubId, 6L, 30);
        saveClass("2023-07-09 10:00:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-09 12:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-09 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-09 11:20:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-09 12:20:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //07-10
        //swimming
//        saveClass("2023-07-10 09:50:00", "Roxana Nucu", clubId, 12L, 20);
        saveClass("2023-07-10 18:00:00", "Claudia Apostol", clubId, 12L, 20);
        // aerobic
//        saveClass("2023-07-10 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-10 18:30:00", "Dragos Toncean", clubId, 4L, 30);
        saveClass("2023-07-10 20:00:00", "Cristina Stark", clubId, 5L, 30);

        // cycling
//        saveClass("2023-07-10 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-10 18:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-10 19:00:00", "Dragos Burea", clubId, 11L, 30);

        //07-11
        //swimming
        saveClass("2023-07-11 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-11 18:00:00", "Claudia Apostol", clubId, 12L, 20);

        // aerobic
//        saveClass("2023-07-11 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-11 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-07-11 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-07-11 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-11 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-11 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //

        //07-12
        //swimming
        saveClass("2023-07-12 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-12 18:00:00", "Claudia Apostol", clubId, 12L, 20);

        // aerobic
//        saveClass("2023-07-12 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-12 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-07-12 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-07-12 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-12 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-12 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
        //07-13
        //swimming
        saveClass("2023-07-13 09:50:00", "Roxana Nucu", clubId, 12L, 20);
//        saveClass("2023-07-13 18:00:00", "Claudia Apostol", clubId, 12L, 20);

        // aerobic
//        saveClass("2023-07-13 10:30:00", "Ioana Chitu", clubId, 1L, 30);
        saveClass("2023-07-13 18:30:00", "Ioana Coarna", clubId, 2L, 30);
        saveClass("2023-07-13 20:00:00", "Ana Maria Calin", clubId, 3L, 30);

        // cycling
//        saveClass("2023-07-13 10:00:00", "Florin Gocia", clubId, 8L, 30);
        saveClass("2023-07-13 19:00:00", "Raluca Danila", clubId, 9L, 30);
        saveClass("2023-07-13 20:00:00", "Adrian Borozan", clubId, 10L, 30);
        //
    }

}
