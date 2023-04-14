package com.fitnessapp.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(String message) {
        super(message);
    }

    public EntityNotFoundException(String entity, String field, Object value) {
        super(String.format("%s was not found with %s : %s", entity, field, value));
    }
}
