package com.fitnessapp.service.user_subscription;

import com.fitnessapp.dto.UserSubscriptionDto;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.mapper.UserSubscriptionMapper;
import com.fitnessapp.repository.UserSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSubscriptionService {
    private final UserSubscriptionRepository userSubscriptionRepository;
    private final UserSubscriptionMapper userSubscriptionMapper;

    public UserSubscription save(UserSubscriptionDto userSubscriptionDto) {
        return userSubscriptionRepository.save(userSubscriptionMapper.map(userSubscriptionDto));
    }

    public UserSubscription getByUserId(Long userId) {
        return userSubscriptionRepository.findByUser_Id(userId).orElseThrow(() -> new EntityNotFoundException("User subscription", "user id", userId));
    }
}
