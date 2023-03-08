package com.fitnessapp.service.club;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubServiceImpl implements ClubService {
    private final ClubMapper clubMapper;
    private final ClubRepository clubRepository;

    @Override
    public void save(ClubDto clubDto) {
        Club club = clubMapper.map(clubDto);
        clubRepository.save(club);
    }

}
