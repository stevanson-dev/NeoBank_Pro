package com.neobankpro.neobankpro.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==========================================
    // DUPLICATE RESOURCE
    // ==========================================

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateResource(
            DuplicateResourceException ex) {

        Map<String, String> response = new HashMap<>();

        response.put(
                "error",
                ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }

    // ==========================================
    // VALIDATION ERROR
    // ==========================================

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errors);
    }

    // ==========================================
    // GENERAL RUNTIME EXCEPTION
    // ==========================================

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(
            RuntimeException ex) {

        Map<String, String> response = new HashMap<>();

        response.put(
                "error",
                ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    // ==========================================
    // GENERAL EXCEPTION
    // ==========================================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(
            Exception ex) {

        Map<String, String> response = new HashMap<>();

        response.put(
                "error",
                "Something went wrong"
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}