package com.fitnessapp.mapper;

import com.fitnessapp.dto.UserDto;
import com.fitnessapp.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User map(UserDto userDto);
    UserDto map(User user);
}
