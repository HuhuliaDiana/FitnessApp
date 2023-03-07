package com.fitnessapp.service.role;

import com.fitnessapp.entity.ClubRole;
import com.fitnessapp.repository.ClubRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubRoleServiceImpl implements ClubRoleService {
    private final ClubRoleRepository clubRoleRepository;
    @Override
    public List<ClubRole> findByClubAndUserEmail(String email, Long clubId) {
        return clubRoleRepository.findAllByClubIdAndParticipantEmail(clubId, email);
    }
}
