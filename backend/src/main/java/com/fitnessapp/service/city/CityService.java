package com.fitnessapp.service.city;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.CityRecord;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.CityMapper;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;
    private final ClubMapper clubMapper;

    public void save(CityDto cityDto) {
        City city = cityMapper.map(cityDto);
        cityRepository.save(city);

    }

    public City findByName(ECity name) {
        return cityRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("City", "name", name));
    }

    public List<CityRecord> getAllCities() {
        List<CityRecord> list = new ArrayList<>();
        cityRepository.findAll().forEach(city -> {
            Set<ClubDto> clubs = city.getClubs().stream().map(clubMapper::map).collect(Collectors.toSet());
            CityRecord cityRecord = new CityRecord(city.getId(), city.getName().name(), clubs);
            list.add(cityRecord);

        });
        return list;

    }

}
