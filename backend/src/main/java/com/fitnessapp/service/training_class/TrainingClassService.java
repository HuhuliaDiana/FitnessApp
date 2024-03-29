package com.fitnessapp.service.training_class;

import com.fitnessapp.dto.TrainingClassDto;
import com.fitnessapp.entity.Club;
import com.fitnessapp.entity.StatusMessage;
import com.fitnessapp.entity.TrainingClass;
import com.fitnessapp.entity.UserSubscription;
import com.fitnessapp.enums.MembershipType;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.exception.TrainingClassCanNotBeAccessedException;
import com.fitnessapp.mapper.TrainingClassMapper;
import com.fitnessapp.repository.TrainingClassRepository;
import com.fitnessapp.service.user.UserService;
import com.fitnessapp.service.user_subscription.UserSubscriptionService;
import com.google.common.collect.Lists;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TrainingClassService {
    private final TrainingClassRepository trainingClassRepository;
    private final TrainingClassMapper trainingClassMapper;
    private final UserService userService;
    private final UserSubscriptionService userSubscriptionService;

    public TrainingClass save(TrainingClassDto trainingClassDto) {
        TrainingClass trainingClass = trainingClassMapper.map(trainingClassDto);
        return trainingClassRepository.save(trainingClass);
    }

    public TrainingClass getById(Long id) {
        return trainingClassRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Training class", "id", id));
    }

    public TrainingClassDto findById(Long id) {
        return trainingClassMapper.map(getById(id));
    }

    public List<TrainingClass> getAllFutureClassesByClubIds(Iterable<Club> clubs) {
        return Lists.newArrayList(trainingClassRepository.findAllByClubInAndClassDateGreaterThanEqual(clubs, LocalDateTime.now()));
    }

    @Transactional
    public TrainingClassDto bookClass(Long classId) {
        TrainingClass trainingClass = getById(classId);
        LocalDateTime bookingStartDate = trainingClass.getClassDate().minusHours(26);
        Set<TrainingClass> classesBookedByUser = userService.getCurrentUser().getTrainingClasses();

        if (userSubscriptionService.currentUserHasNoSubscription())
            throw new EntityNotFoundException("Subscription", "user_id", userService.getCurrentUserId());
        if (subscriptionDoNotPermitAccessToClass(classId))
            throw new TrainingClassCanNotBeAccessedException("Your subscription starts with: %s"
                    .formatted(userSubscriptionService.getCurrentUserSubscription().getStartDate()));
        if (isClassBetweenDaysOfFreeze(classId))
            throw new TrainingClassCanNotBeAccessedException("You froze this day.");
        if (userMembershipDoNotAllowAttendanceToClass(classId))
            throw new TrainingClassCanNotBeAccessedException("Upgrade your membership.");
        if (userAlreadyBookedClassForThisTimeSpan(classId).isPresent())
            throw new TrainingClassCanNotBeAccessedException("You already booked a class for this time span.");
        if (isClassBookedByCurrentUser(classId))
            throw new TrainingClassCanNotBeAccessedException("You booked this class.");
        if (isBookingClassNotAvailable(classId))
            throw new TrainingClassCanNotBeAccessedException("Booking starts on: ".concat(getDateFormatted(bookingStartDate)));

        classesBookedByUser.add(trainingClass);
        trainingClass.setSpotsAvailable(trainingClass.getSpotsAvailable() - 1);
        return trainingClassMapper.map(trainingClass);
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

    public boolean userMembershipDoNotAllowAttendanceToClass(Long classId) {
        MembershipType membershipTypeOfUser = userSubscriptionService.getMembershipOfCurrentUser();
        TrainingClass trainingClass = getById(classId);

        MembershipType clubMembershipType = trainingClass.getClub().getMembership().getName();
        return clubMembershipType.ordinal() > membershipTypeOfUser.ordinal();

    }

    public boolean subscriptionDoNotPermitAccessToClass(Long classId) {
        TrainingClass trainingClass = getById(classId);
        return userSubscriptionService.getCurrentUserSubscription().getStartDate().isAfter(trainingClass.getClassDate().toLocalDate());

    }

    public boolean isClassBetweenDaysOfFreeze(Long classId) {
        UserSubscription userSubscription = userSubscriptionService.getCurrentUserSubscription();
        TrainingClass trainingClass = getById(classId);
        LocalDate classDate = trainingClass.getClassDate().toLocalDate();
        return userSubscription.getStartFreeze() != null && userSubscription.getEndFreeze() != null
                && ((classDate.isAfter(userSubscription.getStartFreeze()) && classDate.isBefore(userSubscription.getEndFreeze()))
                || classDate.isEqual(userSubscription.getStartFreeze()));
    }

    public StatusMessage getStatusOfClassForCurrentUser(Long classId) {
        if (userSubscriptionService.currentUserHasNoSubscription())
            return new StatusMessage("Buy subscription");//red

        if (subscriptionDoNotPermitAccessToClass(classId))
            return new StatusMessage("Your subscription starts with: %s"
                    .formatted(userSubscriptionService.getCurrentUserSubscription().getStartDate()));//red

        if (isClassBetweenDaysOfFreeze(classId))
            return new StatusMessage("You froze this day");//red

        if (userMembershipDoNotAllowAttendanceToClass(classId))
            return new StatusMessage("Upgrade your membership");//red

        if (isClassBookedByCurrentUser(classId)) {
            return new StatusMessage("You booked this class");//orange
        }
        if (userAlreadyBookedClassForThisTimeSpan(classId).isPresent()) {
            TrainingClass classBooked = userAlreadyBookedClassForThisTimeSpan(classId).get();
            String className = classBooked.getTrainingClassHour().getClassName();
            LocalDateTime classDate = classBooked.getClassDate();
            String clubName = classBooked.getClub().getName();
            return new StatusMessage("You already booked a class for this time span: %s %s %s "
                    .formatted(className, getDateFormatted(classDate), clubName));//red
        }
        if (isBookingClassNotAvailable(classId)) {
            TrainingClass trainingClass = getById(classId);
            LocalDateTime bookingStartDate = trainingClass.getClassDate().minusHours(26);

            return new StatusMessage("Booking starts on: ".concat(getDateFormatted(bookingStartDate)));//red
        }
        return new StatusMessage("Booking available");//green

    }

    private static String getDateFormatted(LocalDateTime bookingStartDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm", Locale.US);
        LocalDateTime localDate = LocalDateTime.parse(bookingStartDate.toString(), formatter);
        return DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm").format(localDate);

    }

    public List<TrainingClassDto> getClassesBookedNotYetAttended() {
        Set<TrainingClass> allClassesBookedByUser = userService.getCurrentUser().getTrainingClasses();
        Set<TrainingClassDto> allClassesBooked = allClassesBookedByUser.stream().map(trainingClassMapper::map).collect(Collectors.toSet());
        return allClassesBooked.stream().filter(classBooked -> classBooked.getClassDate().isAfter(LocalDateTime.now())).toList();
    }

    public List<TrainingClassDto> getHistoryOfBookedClasses() {
        Set<TrainingClass> allClassesBookedByUser = userService.getCurrentUser().getTrainingClasses();
        Set<TrainingClassDto> allClassesBooked = allClassesBookedByUser.stream()
                .map(trainingClassMapper::map).collect(Collectors.toSet());
        return allClassesBooked.stream().filter(classBooked ->
                classBooked.getClassDate().isBefore(LocalDateTime.now())).toList();
    }

    @Transactional
    public void cancelBookingOfClass(Long id) {
        TrainingClass trainingClass = getById(id);
        if (trainingClass.getClassDate().minusHours(2).isAfter(LocalDateTime.now())) {
            userService.getCurrentUser().getTrainingClasses().remove(trainingClass);
            trainingClass.setSpotsAvailable(trainingClass.getSpotsAvailable() + 1);
        } else {
            throw new TrainingClassCanNotBeAccessedException("You can not cancel this class. Time limit has expired.");
        }

    }

    public boolean isClassCancelableByUser(Long id) {
        TrainingClass trainingClass = getById(id);
        return isClassBookedByCurrentUser(id) &&
                trainingClass.getClassDate().minusHours(2).isAfter(LocalDateTime.now());

    }

    public List<TrainingClassDto> getAllClassesForNext7DaysByClubId() {
        Long clubId = userSubscriptionService.getCurrentUserSubscription().getClub().getId();
        LocalDate lastDay = LocalDate.now().plusDays(7);
        var classes = trainingClassRepository.findAllByClubIdAndClassDateBetween(clubId, LocalDateTime.now(), LocalDateTime.of(lastDay, LocalTime.MIDNIGHT));
        return classes.stream().map(trainingClassMapper::map).toList();
    }

    public List<TrainingClassDto> getAllClassesForNext7Days() {

        LocalDate lastDay = LocalDate.now().plusDays(6);
        var classes = trainingClassRepository.findAllByClassDateBetween(LocalDateTime.now(), LocalDateTime.of(lastDay, LocalTime.of(23,59)));
        Stream<TrainingClassDto> trainingClasses = classes.stream().map(trainingClassMapper::map);
        return trainingClasses.sorted(Comparator.comparing(TrainingClassDto::getClassDate)).toList();
    }


}
