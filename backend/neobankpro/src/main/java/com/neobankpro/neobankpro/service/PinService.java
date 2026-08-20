package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.ChangePinRequest;
import com.neobankpro.neobankpro.dto.SetPinRequest;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PinService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PinService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // SET NEW PIN
    public void setPin(
            String email,
            SetPinRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // User already has a PIN
        if (user.getTransactionPin() != null) {
            throw new IllegalStateException(
                    "PIN is already set. Please use Change PIN."
            );
        }

        // Check PIN confirmation
        if (!request.getPin().equals(request.getConfirmPin())) {
            throw new IllegalArgumentException(
                    "PINs do not match"
            );
        }

        validateWeakPin(request.getPin());

        // Hash PIN before saving
        String hashedPin =
                passwordEncoder.encode(request.getPin());

        user.setTransactionPin(hashedPin);

        userRepository.save(user);
    }


    // CHANGE PIN
    public void changePin(
            String email,
            ChangePinRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // User doesn't have a PIN yet
        if (user.getTransactionPin() == null) {
            throw new IllegalStateException(
                    "PIN is not set. Please use Set New PIN."
            );
        }

        // Verify current PIN
        boolean currentPinCorrect =
                passwordEncoder.matches(
                        request.getCurrentPin(),
                        user.getTransactionPin()
                );

        if (!currentPinCorrect) {
            throw new IllegalArgumentException(
                    "Current PIN is incorrect"
            );
        }

        // New PIN confirmation
        if (!request.getNewPin()
                .equals(request.getConfirmPin())) {

            throw new IllegalArgumentException(
                    "New PINs do not match"
            );
        }

        // New PIN cannot be same as current PIN
        if (request.getCurrentPin()
                .equals(request.getNewPin())) {

            throw new IllegalArgumentException(
                    "New PIN must be different from current PIN"
            );
        }

        validateWeakPin(request.getNewPin());

        // Hash new PIN
        String hashedNewPin =
                passwordEncoder.encode(
                        request.getNewPin()
                );

        user.setTransactionPin(hashedNewPin);

        userRepository.save(user);
    }


    // WEAK PIN VALIDATION
    private void validateWeakPin(String pin) {

        if (pin.equals("123456")
                || pin.equals("654321")
                || pin.matches("(\\d)\\1{5}")) {

            throw new IllegalArgumentException(
                    "Please choose a stronger PIN"
            );
        }
    }
}