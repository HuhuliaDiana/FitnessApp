package com.fitnessapp;

import com.fitnessapp.dto.*;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.enums.EMembership;
import com.fitnessapp.enums.ERole;
import com.fitnessapp.enums.ESubscriptionPeriod;
import com.fitnessapp.mapper.CityMapper;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.mapper.SubscriptionPeriodMapper;
import com.fitnessapp.repository.*;
import com.fitnessapp.service.city.CityService;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.role.RoleService;
import com.fitnessapp.service.subscription.SubscriptionPeriodService;
import com.fitnessapp.service.subscription.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

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

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) saveRoles();
        if (membershipRepository.count() == 0) saveMembershipTypes();
        if (cityRepository.count() == 0) saveCities();
        if (clubRepository.count() == 0) saveClubs();
        if (periodRepository.count() == 0) saveAllTypesOfSubscriptionPeriod();
        if (subscriptionRepository.count() == 0) saveAllTypesOfSubscription();


    }

    private void saveRoles() {
        Arrays.stream(ERole.values()).forEach(eRole -> {
            var role = new RoleDto();
            role.setName(eRole);
            roleService.save(role);
        });

    }

    private void saveMembershipTypes() {
        Arrays.stream(EMembership.values()).forEach(eMembership -> {
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
        saveClub("Strada Liviu Rebreanu, Nr. 4, etaj 3, sector 3, în incinta Park Lake Mall", ECity.BUCURESTI, "0749213557", "World Class Park Lake", EMembership.SILVER);
        saveClub("Bulevardul 15 Noiembrie Nr. 78, et.2, în incinta AFI Brasov", ECity.BRASOV, "0751230693", "World Class AFI Brasov", EMembership.BRONZE);
        saveClub("Strada Călărașilor, Nr. 1", ECity.CLUJ, "0725353870", "World Class Belvedere Cluj", EMembership.SILVER);
        saveClub("Strada Anastasie Panu, Nr. 31", ECity.IASI, "0232210765", "World Class Iasi", EMembership.SILVER);
        saveClub("Bvd. Alexandru Lăpușneanu, Nr. 116C, Constanta, în incinta ECity Park Mall", ECity.CONSTANTA, "0723689211", "World Class ECity Park Constanta", EMembership.SILVER);

    }

    private void saveClub(String address, ECity eCity, String phone, String name, EMembership eMembership) {
        ClubDto clubDto = new ClubDto();
        clubDto.setAddress(address);
        clubDto.setPhone(phone);
        clubDto.setName(name);

        City city = cityService.findByName(eCity);
        clubDto.setCity(cityMapper.map(city));

        Membership membership = membershipService.findByName(eMembership);
        clubDto.setMembership(membershipMapper.map(membership));

        clubService.save(clubDto);

    }

    private void saveSubscription(ESubscriptionPeriod subscriptName, Double price, EMembership eMembership) {
        SubscriptionDto dto = new SubscriptionDto();
        dto.setSubscriptionPeriodDto(periodMapper.map(subscriptionPeriodService.findByName(subscriptName)));
        dto.setMembershipDto(membershipMapper.map(membershipService.findByName(eMembership)));
        dto.setPrice(price);
        subscriptionService.save(dto);

    }


    private void saveAllTypesOfSubscriptionPeriod() {
        Arrays.stream(ESubscriptionPeriod.values()).forEach(eSub -> {
            SubscriptionPeriodDto dto = new SubscriptionPeriodDto();
            dto.setName(eSub);
            subscriptionPeriodService.save(dto);
        });

    }

    private void saveAllTypesOfSubscription() {
        saveSubscription(ESubscriptionPeriod.FULL_TIME_12_MONTHS, 41.85, EMembership.SILVER);
        saveSubscription(ESubscriptionPeriod.BINDING_12_MOTHS, 51.00, EMembership.SILVER);
        saveSubscription(ESubscriptionPeriod.FULL_TIME_1_MONTH_ROLLING, 75.00, EMembership.SILVER);

        saveSubscription(ESubscriptionPeriod.FULL_TIME_12_MONTHS, 52.75, EMembership.GOLD);
        saveSubscription(ESubscriptionPeriod.BINDING_12_MOTHS, 65.00, EMembership.GOLD);
        saveSubscription(ESubscriptionPeriod.FULL_TIME_1_MONTH_ROLLING, 95.00, EMembership.GOLD);

        saveSubscription(ESubscriptionPeriod.FULL_TIME_12_MONTHS, 35.33, EMembership.BRONZE);
        saveSubscription(ESubscriptionPeriod.BINDING_12_MOTHS, 43.75, EMembership.BRONZE);
        saveSubscription(ESubscriptionPeriod.FULL_TIME_1_MONTH_ROLLING, 64.00, EMembership.BRONZE);

        saveSubscription(ESubscriptionPeriod.FULL_TIME_12_MONTHS, 61.42, EMembership.PLATINUM);
        saveSubscription(ESubscriptionPeriod.BINDING_12_MOTHS, 75.75, EMembership.PLATINUM);
        saveSubscription(ESubscriptionPeriod.FULL_TIME_1_MONTH_ROLLING, 111.00, EMembership.PLATINUM);

        saveSubscription(ESubscriptionPeriod.FULL_TIME_12_MONTHS, 83.67, EMembership.W);
        saveSubscription(ESubscriptionPeriod.BINDING_12_MOTHS, 152.00, EMembership.W);
        saveSubscription(ESubscriptionPeriod.FULL_TIME_1_MONTH_ROLLING, 102.50, EMembership.W);


    }
}
