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
}
