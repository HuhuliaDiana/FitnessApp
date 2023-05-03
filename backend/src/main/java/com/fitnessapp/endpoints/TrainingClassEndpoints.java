package com.fitnessapp.endpoints;

public class TrainingClassEndpoints {
    public static final String TRAINING_CLASS_BASE_URL = "/class";
    public static final String TRAINING_CLASS_BOOK_BY_ID = "/book/{id}";
    public static final String TRAINING_CLASSES_BOOKED_NOT_ATTENDED_YET = "/booked/future";
    public static final String TRAINING_CLASSES_BOOKED_HISTORY = "/booked/history";
    public static final String TRAINING_CLASS_BY_ID_STATUS = "/status/{id}";
    public static final String TRAINING_CLASSES_AVAILABLE = "/available";
    public static final String TRAINING_CLASS_BY_ID_CANCEL_BOOKING = "/booked/cancel/{id}";
    public static final String TRAINING_CLASS_BY_ID_CANCELABLE = "/booked/cancelable/{id}";
    public static final String TRAINING_CLASSES_BY_CLUB_ID_IN_NEXT_7_DAYS= "/next-7-days/{id}";
    public static final String TRAINING_CLASSES_IN_NEXT_7_DAYS= "/next-7-days";
    public static final String TRAINING_CLASSES_TYPES= "/types";


}
