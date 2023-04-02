package com.fitnessapp.service.training_class;

import com.fitnessapp.dto.TrainingClassDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.Subscription;
import com.fitnessapp.entity.TrainingClass;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.exception.TrainingClassException;
import com.fitnessapp.mapper.TrainingClassMapper;
import com.fitnessapp.repository.TrainingClassRepository;
import com.fitnessapp.service.club.ClubService;
import com.fitnessapp.service.subscription.SubscriptionService;
import com.fitnessapp.service.user.UserService;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TrainingClassService {
    private final TrainingClassRepository trainingClassRepository;
    private final TrainingClassMapper trainingClassMapper;
    private final UserService userService;
    private final UserSubscriptionService userSubscriptionService;
    private final SubscriptionService subscriptionService;
    private final ClubService clubService;

    public TrainingClass save(TrainingClassDto trainingClassDto) {
        TrainingClass trainingClass = trainingClassMapper.map(trainingClassDto);
        return trainingClassRepository.save(trainingClass);
    }

    public TrainingClass getById(Long id) {
        return trainingClassRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Training class", "id", id));
    }

    public List<TrainingClass> getAllFutureClassesByClubIds(Iterable<Club> clubs) {
        return Lists.newArrayList(trainingClassRepository.findAllByClubInAndClassDateGreaterThanEqual(clubs, LocalDateTime.now()));
    }

    public List<TrainingClass> getAllClassesAvailableForCurrentUser() {
        Long currentUserId = userService.getCurrentUserId();

        //get subscription of user
        UserSubscription userSubscription = userSubscriptionService.getByUserId(currentUserId);
        Long subscriptionId = userSubscription.getSubscription().getId();
        Subscription subscription = subscriptionService.getById(subscriptionId);

        //get membership of user
        Long membershipId = subscription.getMembership().getId();

        //get clubs that can be frequented by current user
        List<Club> clubs = clubService.findAllByMembershipId(membershipId);
        return getAllFutureClassesByClubIds(clubs);
    }

    @Transactional
    public TrainingClass bookClass(Long classId) {
        TrainingClass trainingClass = getById(classId);
        LocalDateTime bookingStartDate = trainingClass.getClassDate().minusHours(26);
        Set<TrainingClass> classesBookedByUser = userService.getCurrentUser().getTrainingClasses();

        if (userAlreadyBookedClassForThisTimeSpan(classId).isPresent())
            throw new TrainingClassException("You already booked a class for this time span.");
        if (isClassBookedByCurrentUser(classId))
            throw new TrainingClassException("You booked this class.");
        if (isBookingClassNotAvailable(classId))
            throw new TrainingClassException("Booking starts on: ".concat(bookingStartDate.toString()));

        classesBookedByUser.add(trainingClass);
        trainingClass.setSpotsAvailable(trainingClass.getSpotsAvailable() - 1);
        return trainingClass;
    }

    public boolean isClassBookedByCurrentUser(Long classId) {
        TrainingClass trainingClass = getById(classId);
        Set<TrainingClass> classesBookedByUser = userService.getCurrentUser().getTrainingClasses();
        return classesBookedByUser.stream().map(TrainingClass::getId).toList().contains(trainingClass.getId());

    }

    public Optional<TrainingClass> userAlreadyBookedClassForThisTimeSpan(Long classId) {
        TrainingClass trainingClass = getById(classId);

        LocalDateTime startDateForClassWanted = trainingClass.getClassDate();
        LocalDateTime endDateForClassWanted = startDateForClassWanted
                .plusMinutes(trainingClass.getTrainingClassHour().getTimerDuration());

        Set<TrainingClass> classesBookedByUser = userService.getCurrentUser().getTrainingClasses();
        return classesBookedByUser.stream().parallel().filter(classBooked -> {

            LocalDateTime startDateForClassBooked = classBooked.getClassDate();
            LocalDateTime endDateForClassBooked = startDateForClassBooked
                    .plusMinutes(classBooked.getTrainingClassHour().getTimerDuration());

            return (startDateForClassWanted.isBefore(endDateForClassBooked) && endDateForClassWanted.isAfter(startDateForClassBooked));

        }).findFirst();
    }

    public boolean isBookingClassNotAvailable(Long classId) {
        TrainingClass trainingClass = getById(classId);
        LocalDateTime bookingStartDate = trainingClass.getClassDate().minusHours(26);
        return !LocalDateTime.now().isAfter(bookingStartDate) && !LocalDateTime.now().isEqual(bookingStartDate);

    }

    public String getStatusOfClassForCurrentUser(Long classId) {
        if (isClassBookedByCurrentUser(classId)) {
            return "You booked this class";
        }
        if (userAlreadyBookedClassForThisTimeSpan(classId).isPresent()) {
            return "You already booked a class for this time span";
        }
        if (isBookingClassNotAvailable(classId)) {
            TrainingClass trainingClass = getById(classId);
            LocalDateTime bookingStartDate = trainingClass.getClassDate().minusHours(26);
            return "Booking starts on: ".concat(bookingStartDate.toString());
        }
        return "Booking available";

    }

}
