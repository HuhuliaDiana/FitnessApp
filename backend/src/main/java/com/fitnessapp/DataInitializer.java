package com.fitnessapp;

import com.fitnessapp.dto.*;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.entity.PersonalTrainer;
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
    private final ClubService clubService;
    private final ClubRepository clubRepository;
    private final CityService cityService;
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;
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
    private final PersonalTrainerService personalTrainerService;
    private final PersonalTrainingTypeMapper personalTrainingTypeMapper;
    private final PersonalTrainerMapper personalTrainerMapper;

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
        if (clubRepository.count() == 0) saveClubs();
        if (periodRepository.count() == 0) saveAllTypesOfSubscriptionPeriod();
        if (subscriptionRepository.count() == 0) saveAllTypesOfSubscription();
        if (trainingClassTypeRepository.count() == 0) saveTrainingClassTypes();
        if (trainingClassHourRepository.count() == 0) saveTrainingClassHours();
        if (personalTrainingTypeRepository.count() == 0) saveTrainingTypes();
        if (personalTrainingRepository.count() == 0) savePersonalTrainingsInfo();
        if (personalTrainingRepository.count() == 0) savePersonalTrainingsInfo();
        if (personalTrainerRepository.count() == 0) saveTrainers();

    }

    private void saveTrainer(String name, Long trainingTypeId, Long clubId) {
        PersonalTrainerDto trainerDto = new PersonalTrainerDto();
        trainerDto.setName(name);
        trainerDto.getPersonalTrainings().addAll(personalTrainingService.getAllByTrainingTypeId(trainingTypeId));
        trainerDto.getClubs().add(clubService.getClubById(clubId));
        personalTrainerService.save(trainerDto);
    }

    private void saveTrainers() {
        saveTrainer("LAURENTIU SANDU", 3L, 4L);
        saveTrainer("RAMONA GANEA", 3L, 4L);
        saveTrainer("DAN SZENTKOVICS", 1L, 4L);
        saveTrainer("ALEXANDRU MITU", 1L, 8L);
        saveTrainer("LILIANA NEAGU", 1L, 8L);
        saveTrainer("DICU ROBERT ADRIAN", 3L, 8L);
        saveTrainer("VALENTIN VACARIU", 3L, 1L);
        saveTrainer("PAUL STOICESCU", 2L, 10L);
        saveTrainer("CRISTINA EPURE", 1L, 10L);

    }

    private void saveTrainingTypes() {
        Arrays.stream(TrainingType.values()).forEach(trainingType -> {
            var role = new PersonalTrainingTypeDto();
            role.setName(trainingType);
            personalTrainingTypeService.save(role);
        });
    }

    private void savePersonalTrainingsInfo() {
        savePersonalTrainingDetails(TrainingType.ELITE, 5, 208.00);
        savePersonalTrainingDetails(TrainingType.ELITE, 10, 333.00);
        savePersonalTrainingDetails(TrainingType.ELITE, 20, 532.00);

        savePersonalTrainingDetails(TrainingType.FIT_PRO, 5, 158.00);
        savePersonalTrainingDetails(TrainingType.FIT_PRO, 10, 252.00);
        savePersonalTrainingDetails(TrainingType.FIT_PRO, 20, 404.00);

        savePersonalTrainingDetails(TrainingType.MASTER, 5, 181.00);
        savePersonalTrainingDetails(TrainingType.MASTER, 10, 290.00);
        savePersonalTrainingDetails(TrainingType.MASTER, 20, 464.00);
    }

    private void savePersonalTrainingDetails(TrainingType trainingType, Integer sessionsNumber, Double price) {
        PersonalTrainingDto personalTrainingDto = new PersonalTrainingDto();
        personalTrainingDto.setPersonalTrainingType(personalTrainingTypeMapper.map(personalTrainingTypeService.findByName(trainingType)));
        personalTrainingDto.setSessionsNumber(sessionsNumber);
        personalTrainingDto.setPrice(price);
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

    private void saveClubs() {
        saveClub("Bulevardul 15 Noiembrie Nr. 78, et.2, în incinta AFI Brasov", ECity.BRASOV, "0751230693", "World Class AFI Brasov", MembershipType.BRONZE);
        saveClub("Str. Comandor Aviator Popisteanu, Nr. 54A, Sector 1, Bucuresti", ECity.BUCURESTI, "0751230693", "World Class Expo Business Park", MembershipType.BRONZE);
        saveClub("Șoseaua Olteniței, Nr. 208, Sector 4, Bucureşti", ECity.BUCURESTI, "0751230693", "World Class Sudului", MembershipType.BRONZE);

        saveClub("Strada Liviu Rebreanu, Nr. 4, etaj 3, sector 3, în incinta Park Lake Mall", ECity.BUCURESTI, "0749213557", "World Class Park Lake", MembershipType.SILVER);
        saveClub("Strada Călărașilor, Nr. 1", ECity.CLUJ, "0725353870", "World Class Belvedere Cluj", MembershipType.SILVER);
        saveClub("Strada Anastasie Panu, Nr. 31", ECity.IASI, "0232210765", "World Class Iasi", MembershipType.SILVER);
        saveClub("Bvd. Alexandru Lăpușneanu, Nr. 116C, Constanta, în incinta ECity Park Mall", ECity.CONSTANTA, "0723689211", "World Class ECity Park Constanta", MembershipType.SILVER);

        saveClub("Bvd. Barbu Văcărescu, Nr. 164A, Sector 2, Bucureşti, în incinta Hotel Caro", ECity.BUCURESTI, "0751230693", "World Class Caro", MembershipType.GOLD);
        saveClub("Str. Scortariilor Nr 10, în spatele centrului de birouri The Office", ECity.CLUJ, "0751230693", "World Class The Record Cluj", MembershipType.GOLD);

        saveClub("Calea Victoriei, Nr. 63-81, Sector 1, Bucuresti, în incinta Hotel Radisson Blu", ECity.BUCURESTI, "0751230693", "World Class Downtown", MembershipType.PLATINUM);
        saveClub("Strada Erou Iancu Nicolae, Nr. 12-26, Voluntari, Ilfov", ECity.BUCURESTI, "0751230693", "World Class Atlantis", MembershipType.PLATINUM);

        saveClub("Bulevardul 15 Noiembrie Nr. 78, et.2, în incinta AFI Brasov", ECity.PLOIESTI, "0751230693", "World Class AFI Brasov", MembershipType.BRONZE);
        saveClub("Bulevardul 15 Noiembrie Nr. 78, et.2, în incinta AFI Brasov", ECity.TIMISOARA, "0751230693", "World Class AFI Brasov", MembershipType.BRONZE);


    }

    private void saveClub(String address, ECity eCity, String phone, String name, MembershipType membershipType) {
        ClubDto clubDto = new ClubDto();
        clubDto.setAddress(address);
        clubDto.setPhone(phone);
        clubDto.setName(name);

        City city = cityService.findByName(eCity);
        clubDto.setCity(cityMapper.map(city));

        Membership membership = membershipService.findByName(membershipType);
        clubDto.setMembership(membershipMapper.map(membership));

        clubService.save(clubDto);

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
        saveSubscription(SubscriptionPeriodType.BINDING_12_MOTHS, 51.00, MembershipType.SILVER);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 75.00, MembershipType.SILVER);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 52.75, MembershipType.GOLD);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MOTHS, 65.00, MembershipType.GOLD);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 95.00, MembershipType.GOLD);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 35.33, MembershipType.BRONZE);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MOTHS, 43.75, MembershipType.BRONZE);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 64.00, MembershipType.BRONZE);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 61.42, MembershipType.PLATINUM);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MOTHS, 75.75, MembershipType.PLATINUM);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 111.00, MembershipType.PLATINUM);

        saveSubscription(SubscriptionPeriodType.FULL_TIME_12_MONTHS, 83.67, MembershipType.W);
        saveSubscription(SubscriptionPeriodType.BINDING_12_MOTHS, 152.00, MembershipType.W);
        saveSubscription(SubscriptionPeriodType.FULL_TIME_1_MONTH_ROLLING, 102.50, MembershipType.W);

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
