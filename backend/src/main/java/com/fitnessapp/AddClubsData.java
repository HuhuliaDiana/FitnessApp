package com.fitnessapp;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.Membership;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.mapper.CityMapper;
import com.fitnessapp.mapper.MembershipMapper;
import com.fitnessapp.service.city.CityService;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.membership.MembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Component
public class AddClubsData {

    private final CityService cityService;
    private final CityMapper cityMapper;
    private final MembershipService membershipService;
    private final MembershipMapper membershipMapper;
    private final ClubService clubService;

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

    public void saveClubs() {
        String PHONE = "0751230693";
//        saveClub("Bulevardul 15 Noiembrie Nr. 78, et.2, în incinta AFI Brasov", ECity.BRASOV, PHONE, "Fit & Repeat AFI Brasov", MembershipType.BRONZE);
        saveClub("Str. Anastasie Panu, Nr. 31", ECity.IASI, "0232210765", "Fit & Repeat Iasi", MembershipType.SILVER);
//        saveClub("Str. Calomfirescu, nr. 2, Ploiești, Jud. Prahova, în incinta Afi Palace", ECity.PLOIESTI, PHONE, "Fit & Repeat Ploiesti", MembershipType.BRONZE);
//        saveClub("Piata Consiliul Europei, Nr. 2, Timișoara, jud. Timis, în incinta Iulius Mall", ECity.TIMISOARA, PHONE, "Fit & Repeat Timisoara", MembershipType.BRONZE);

        saveClub("Bvd. Alexandru Lăpușneanu, Nr. 116C", ECity.CONSTANTA, PHONE, "Fit & Repeat City Park Constanta", MembershipType.SILVER);
        saveClub("Str. Ștefan cel Mare, Nr. 36-40", ECity.CONSTANTA, PHONE, "Fit & Repeat Tomis Constanta", MembershipType.BRONZE);

//        saveClub("Str. Călărașilor, Nr. 1", ECity.CLUJ, PHONE, "Fit & Repeat Belvedere Cluj", MembershipType.SILVER);
        saveClub("Str. Alex. Vaida Voievod, Nr. 53-55", ECity.CLUJ, PHONE, "Fit & Repeat Iulius Cluj", MembershipType.SILVER);
        saveClub("Str. Scortariilor Nr 10", ECity.CLUJ, PHONE, "Fit & Repeat The Record Cluj", MembershipType.GOLD);
        saveClub("Str. Avram Iancu, Nr. 492-500", ECity.CLUJ, PHONE, "Fit & Repeat Polus Cluj", MembershipType.BRONZE);

//        saveClub("Str. Comandor Aviator Popisteanu, Nr. 54A, Sector 1, Bucuresti", ECity.BUCURESTI, PHONE, "Fit & Repeat Expo Business Park", MembershipType.BRONZE);
        saveClub("Șoseaua Olteniței, Nr. 208, Sector 4", ECity.BUCURESTI, PHONE, "Fit & Repeat Sudului", MembershipType.BRONZE);

//        saveClub("Str. Liviu Rebreanu, Nr. 4, etaj 3, sector 3, în incinta Park Lake Mall", ECity.BUCURESTI, PHONE, "Fit & Repeat Park Lake", MembershipType.SILVER);
        saveClub("Str. Pierre De Coubertin, Nr. 3-5, Sector 2", ECity.BUCURESTI, PHONE, "Fit & Repeat Mega Mall", MembershipType.SILVER);

//        saveClub("Bvd. Barbu Văcărescu, Nr. 164A, Sector 2, Bucureşti, în incinta Hotel Caro", ECity.BUCURESTI, PHONE, "Fit & Repeat Caro", MembershipType.GOLD);
        saveClub("Str. Fabrica de Glucoză, Nr. 9-11, Sector 2", ECity.BUCURESTI, PHONE, "Fit & Repeat Upground", MembershipType.GOLD);

//        saveClub("Calea Victoriei, Nr. 63-81, Sector 1, Bucuresti, în incinta Hotel Radisson Blu", ECity.BUCURESTI, PHONE, "Fit & Repeat Downtown", MembershipType.PLATINUM);
//        saveClub("Str. Erou Iancu Nicolae, Nr. 12-26, Voluntari, Ilfov", ECity.BUCURESTI, PHONE, "Fit & Repeat Atlantis", MembershipType.PLATINUM);
        saveClub("Calea 13 Septembrie, Nr. 90", ECity.BUCURESTI, PHONE, "Fit & Repeat at the Grand", MembershipType.PLATINUM);



    }
}
