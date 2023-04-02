package com.fitnessapp.endpoints;

public class TrainingClassEndpoints {
    public static final String TRAINING_CLASS_BASE_URL = "/class";
    public static final String TRAINING_CLASS_BOOK_BY_ID = "/book/{id}";
    public static final String TRAINING_CLASS_BY_ID_ALREADY_BOOKED = "/booked/{id}";
    public static final String TRAINING_CLASS_BY_ID_STATUS= "/status/{id}";
    public static final String TRAINING_CLASSES_FOR_CURRENT_USER_BY_CLUB_ID = "/available";
}
