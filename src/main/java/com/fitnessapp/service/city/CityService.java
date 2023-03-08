package com.fitnessapp.service.city;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.enums.ECity;
import org.springframework.stereotype.Service;

public interface CityService {
    void save(CityDto cityDto);
    City findByName(ECity name);


}
