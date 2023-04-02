package com.fitnessapp.service.club;

import com.fitnessapp.dto.ClubDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.ClubMapper;
import com.fitnessapp.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubMapper clubMapper;
    private final ClubRepository clubRepository;

    public void save(ClubDto clubDto) {
        clubRepository.save(clubMapper.map(clubDto));
    }

    public Club findById(Long id) {
        return clubRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Club", "id", id));
    }

    public List<Club> findAllByMembershipId(Long id) {
        return clubRepository.findAllByMembership_Id(id);
    }

}
