package com.fitnessapp;

import com.fitnessapp.dto.*;
import com.fitnessapp.entity.TrainingClassType;
import com.fitnessapp.enums.*;
import com.fitnessapp.mapper.*;
import com.fitnessapp.repository.*;
import com.fitnessapp.service.city.CityService;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.personal_training.PersonalTrainerService;
import com.fitnessapp.service.personal_training.PersonalTrainingService;
import com.fitnessapp.service.personal_training.PersonalTrainingTypeService;
import com.fitnessapp.service.role.RoleService;
import com.fitnessapp.service.subscription.SubscriptionPeriodService;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.training_class.TrainingClassHourService;
import com.fitnessapp.service.training_class.TrainingClassService;
import com.fitnessapp.service.training_class.TrainingClassTypeService;
import com.fitnessapp.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleService roleService;
    private final RoleRepository roleRepository;
    private final MembershipRepository membershipRepository;
    private final MembershipService membershipService;
    private final ClubRepository clubRepository;
    private final CityService cityService;
    private final CityRepository cityRepository;
    private final MembershipMapper membershipMapper;
    private final SubscriptionService subscriptionService;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionPeriodService subscriptionPeriodService;
    private final SubscriptionPeriodMapper periodMapper;
    private final SubscriptionPeriodRepository periodRepository;
    private final TrainingClassTypeRepository trainingClassTypeRepository;
    private final TrainingClassHourService trainingClassHourService;
    private final TrainingClassHourRepository trainingClassHourRepository;
    private final TrainingClassTypeService trainingClassTypeService;
    private final UserService userService;
    private final UserRepository userRepository;
    public final ClubMapper clubMapper;
    private final PersonalTrainingRepository personalTrainingRepository;
    private final PersonalTrainingService personalTrainingService;
    private final PersonalTrainingTypeRepository personalTrainingTypeRepository;
    private final PersonalTrainerRepository personalTrainerRepository;
    private final PersonalTrainingTypeService personalTrainingTypeService;
    private final PersonalTrainingTypeMapper personalTrainingTypeMapper;
    private final TrainingClassRepository trainingClassRepository;
    private final AddClubsData addClubsData;
    private final AddClassesData addClassesData;
    private final AddTrainersData addTrainersData;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) saveRoles();
        if (userRepository.count() == 0) {
            UserDto userDto = new UserDto();
            userDto.setEmail("dianahuhulia@gmail.com");
            userDto.setPassword("password1234");
            userDto.setFirstname("Diana");
            userDto.setLastname("Huhulia");
            userDto.setPhone("0720878738");
            userService.createUser(userDto);
        }
        if (membershipRepository.count() == 0) saveMembershipTypes();
        if (cityRepository.count() == 0) saveCities();
        if (clubRepository.count() == 0) addClubsData.saveClubs();
        if (periodRepository.count() == 0) saveAllTypesOfSubscriptionPeriod();
        if (subscriptionRepository.count() == 0) saveAllTypesOfSubscription();
        if (trainingClassTypeRepository.count() == 0) saveTrainingClassTypes();
        if (trainingClassHourRepository.count() == 0) saveTrainingClassHours();
        if (personalTrainingTypeRepository.count() == 0) saveTrainingTypes();
        if (personalTrainingRepository.count() == 0) savePersonalTrainingsInfo();
        if (personalTrainingRepository.count() == 0) savePersonalTrainingsInfo();
        if (personalTrainerRepository.count() == 0) addTrainersData.saveTrainers();
        if (trainingClassRepository.count() == 0) addClassesData.saveClassesForAllClubs();

    }

    private void saveTrainingTypes() {
        Arrays.stream(TrainingType.values()).forEach(trainingType -> {
            var role = new PersonalTrainingTypeDto();
            role.setName(trainingType);
            personalTrainingTypeService.save(role);
        });
    }

    private void savePersonalTrainingsInfo() {
        savePersonalTrainingDetails(TrainingType.ELITE, 5, 208.00, 30);
        savePersonalTrainingDetails(TrainingType.ELITE, 10, 333.00, 30);
        savePersonalTrainingDetails(TrainingType.ELITE, 20, 532.00, 60);

        savePersonalTrainingDetails(TrainingType.FIT_PRO, 5, 158.00, 30);
        savePersonalTrainingDetails(TrainingType.FIT_PRO, 10, 252.00, 30);
        savePersonalTrainingDetails(TrainingType.FIT_PRO, 20, 404.00, 60);

        savePersonalTrainingDetails(TrainingType.MASTER, 5, 181.00, 30);
        savePersonalTrainingDetails(TrainingType.MASTER, 10, 290.00, 30);
        savePersonalTrainingDetails(TrainingType.MASTER, 20, 464.00, 60);
    }

    private void savePersonalTrainingDetails(TrainingType trainingType, Integer sessionsNumber, Double price, Integer noDaysValidity) {
        PersonalTrainingDto personalTrainingDto = new PersonalTrainingDto();
        personalTrainingDto.setPersonalTrainingType(personalTrainingTypeMapper.map(personalTrainingTypeService.findByName(trainingType)));
        personalTrainingDto.setSessionsNumber(sessionsNumber);
        personalTrainingDto.setPrice(price);
        personalTrainingDto.setNoDaysValidity(noDaysValidity);
        personalTrainingService.save(personalTrainingDto);
    }

    private void saveRoles() {
        Arrays.stream(ERole.values()).forEach(eRole -> {
            var role = new RoleDto();
            role.setName(eRole);
            roleService.save(role);
        });

    }

    private void saveMembershipTypes() {
        Arrays.stream(MembershipType.values()).forEach(eMembership -> {
            var membership = new MembershipDto();
            membership.setName(eMembership);
            membershipService.save(membership);
        });

    }

    private void saveCities() {
        Arrays.stream(ECity.values()).forEach(eCity -> {
            CityDto city = new CityDto();
            city.setName(eCity);
            cityService.save(city);
        });

    }


    private void saveSubscription(SubscriptionPeriodType subscriptName, Double price, MembershipType membershipType) {
        SubscriptionDto dto = new SubscriptionDto();
        dto.setSubscriptionPeriod(periodMapper.map(subscriptionPeriodService.findByName(subscriptName)));
        dto.setMembership(membershipMapper.map(membershipService.findByName(membershipType)));
        dto.setPrice(price);
        subscriptionService.save(dto);

    }


    private void saveAllTypesOfSubscriptionPeriod() {
        Arrays.stream(SubscriptionPeriodType.values()).forEach(eSub -> {
            SubscriptionPeriodDto dto = new SubscriptionPeriodDto();
            dto.setName(eSub);
            subscriptionPeriodService.save(dto);
        });

    }

    private void saveAllTypesOfSubscription() {
        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 41.85, MembershipType.SILVER);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MONTHS, 51.00, MembershipType.SILVER);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 75.00, MembershipType.SILVER);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 52.75, MembershipType.GOLD);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MONTHS, 65.00, MembershipType.GOLD);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 95.00, MembershipType.GOLD);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 35.33, MembershipType.BRONZE);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MONTHS, 43.75, MembershipType.BRONZE);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 64.00, MembershipType.BRONZE);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 61.42, MembershipType.PLATINUM);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MONTHS, 75.75, MembershipType.PLATINUM);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 111.00, MembershipType.PLATINUM);

    }


    private void saveTrainingClassTypes() {
        Arrays.stream(ClassType.values()).forEach(classType -> {
            TrainingClassTypeDto typeDto = new TrainingClassTypeDto();
            typeDto.setName(classType);
            trainingClassTypeService.save(typeDto);
        });
    }

    private final TrainingClassTypeMapper trainingClassTypeMapper;

    private void saveTrainingClassHours() {
        saveClassHoursByClassType(ClassType.AEROBIC);
        saveClassHoursByClassType(ClassType.CYCLING);
        saveClassHoursByClassType(ClassType.SWIMMING);

    }

    private void saveClassHoursByClassType(ClassType classType) {
        TrainingClassType trainingClassType = trainingClassTypeService.findByName(classType);
        List<Object> classTypeValues = new ArrayList<>();
        switch (classType) {
            case AEROBIC -> classTypeValues = List.of(AerobicClassType.values());
            case CYCLING -> classTypeValues = List.of(CyclingClassType.values());
            case SWIMMING -> classTypeValues = List.of(SwimmingClassType.values());
        }
        classTypeValues.forEach(type -> {
            TrainingClassHourDto trainingClassHourDto = new TrainingClassHourDto();
            trainingClassHourDto.setTrainingClassType(trainingClassTypeMapper.map(trainingClassType));
            trainingClassHourDto.setClassName(type.toString());
            trainingClassHourDto.setTimerDuration(60);
            trainingClassHourService.save(trainingClassHourDto);
        });
    }


}
