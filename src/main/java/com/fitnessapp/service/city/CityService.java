package com.fitnessapp.service.city;

import com.fitnessapp.dto.CityDto;
import com.fitnessapp.entity.City;
import com.fitnessapp.entity.Role;
import com.fitnessapp.enums.ECity;
import com.fitnessapp.enums.ERole;

public interface CityService {
    void save(CityDto cityDto);
    City findByName(ECity name);


}
