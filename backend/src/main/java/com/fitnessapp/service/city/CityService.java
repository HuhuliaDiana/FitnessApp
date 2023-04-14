package com.fitnessapp.service.city;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.CityMapper;
import com.fitnessapp.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CityService  {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    public void save(CityDto cityDto) {
        City city = cityMapper.map(cityDto);
        cityRepository.save(city);

    }

    public City findByName(ECity name) {
        return cityRepository.findByName(name).orElseThrow(() -> new EntityNotFoundException("City", "name", name));
    }
}
