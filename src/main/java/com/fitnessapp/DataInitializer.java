package com.fitnessapp;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.dto.MembershipDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.enums.EMembership;
import com.fitnessapp.enums.ERole;
import com.fitnessapp.dto.RoleDto;
import com.fitnessapp.mapper.CityMapper;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.repository.CityRepository;
import com.fitnessapp.repository.ClubRepository;
import com.fitnessapp.repository.MembershipRepository;
import com.fitnessapp.repository.RoleRepository;
import com.fitnessapp.service.city.CityService;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.membership.MembershipService;
import com.fitnessapp.service.role.RoleService;
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

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) saveRoles();
        if (membershipRepository.count() == 0) saveMembershipTypes();
        if (cityRepository.count() == 0) saveCities();
        if (clubRepository.count() == 0) saveClubs();

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
}
