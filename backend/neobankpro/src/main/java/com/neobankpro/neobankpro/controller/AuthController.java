package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.ChangePasswordRequest;
import com.neobankpro.neobankpro.dto.LoginRequest;
import com.neobankpro.neobankpro.dto.LoginResponse;
import com.neobankpro.neobankpro.dto.RegisterRequest;
import com.neobankpro.neobankpro.dto.RegisterResponse;
import com.neobankpro.neobankpro.dto.UpdateProfileRequest;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.service.AuthService;

import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ========================================
    // REGISTER
    // ========================================

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = authService.register(request);

        RegisterResponse response =
                new RegisterResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getMobile(),
                        user.getTransactionPin() != null
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ========================================
    // LOGIN
    // ========================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    // ========================================
    // GET CURRENT LOGGED-IN USER
    // ========================================

    @GetMapping("/me")
    public ResponseEntity<RegisterResponse> getCurrentUser(
            Authentication authentication) {

        String email = authentication.getName();

        User user =
                authService.getCurrentUser(email);

        RegisterResponse response =
                new RegisterResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getMobile(),
                        user.getTransactionPin() != null
                );

        return ResponseEntity.ok(response);
    }

    // ========================================
    // UPDATE PROFILE
    // ========================================

    @PutMapping("/profile")
    public ResponseEntity<RegisterResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {

        String currentEmail =
                authentication.getName();

        User user =
                authService.updateProfile(
                        currentEmail,
                        request
                );

        RegisterResponse response =
                new RegisterResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getMobile(),
                        user.getTransactionPin() != null
                );

        return ResponseEntity.ok(response);
    }

    // ========================================
    // CHANGE PASSWORD
    // ========================================

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {

        String email =
                authentication.getName();

        authService.changePassword(
                email,
                request
        );

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message",
                        "Password changed successfully"
                )
        );
    }
}