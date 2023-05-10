package com.fitnessapp.controller;

import com.fitnessapp.exception.ApiError;
import com.fitnessapp.exception.EntityNotFoundException;
import com.fitnessapp.exception.PTException;
import com.fitnessapp.exception.TrainingClassCanNotBeAccessedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String LOG_FORMAT = "{} {}";

    @ExceptionHandler(TrainingClassCanNotBeAccessedException.class)
    protected ResponseEntity<Object> handleTrainingClassCanNotBeAccessed(TrainingClassCanNotBeAccessedException ex, WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.NOT_ACCEPTABLE);
        apiError.setMessage(ex.getMessage());
        log.error(LOG_FORMAT, ex, request);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex, WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        log.error(LOG_FORMAT, ex, request);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    @ExceptionHandler(PTException.class)
    protected ResponseEntity<Object> handlePTException(PTException ex, WebRequest request) {
        ApiError apiError = new ApiError(HttpStatus.NOT_ACCEPTABLE);
        apiError.setMessage(ex.getMessage());
        log.error(LOG_FORMAT, ex, request);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

}
