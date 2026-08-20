package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.QRPaymentRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QRPaymentService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public QRPaymentService(
            UserRepository userRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Transaction pay(
            String email,
            QRPaymentRequest request) {

        // ========================================
        // 1. FIND LOGGED-IN USER
        // ========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ========================================
        // 2. VALIDATE AMOUNT
        // ========================================

        if (request.getAmount() == null ||
                request.getAmount().signum() <= 0) {

            throw new IllegalArgumentException(
                    "Invalid payment amount"
            );
        }


        // ========================================
        // 3. VALIDATE UPI ID
        // ========================================

        if (request.getUpiId() == null ||
                request.getUpiId().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "UPI ID is required"
            );
        }


        String upiId =
                request.getUpiId().trim();


        // ========================================
        // 4. BASIC UPI FORMAT VALIDATION
        // ========================================

        if (!upiId.matches(
                "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$")) {

            throw new IllegalArgumentException(
                    "Invalid UPI ID"
            );
        }


        // ========================================
        // 5. CHECK TRANSACTION PIN EXISTS
        // ========================================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ========================================
        // 6. VALIDATE TRANSACTION PIN
        // ========================================

        if (request.getPin() == null ||
                request.getPin().length() != 6) {

            throw new IllegalArgumentException(
                    "Please enter your 6-digit PIN"
            );
        }


        boolean pinCorrect =
                passwordEncoder.matches(
                        request.getPin(),
                        user.getTransactionPin()
                );


        if (!pinCorrect) {

            throw new IllegalArgumentException(
                    "Incorrect transaction PIN"
            );
        }


        // ========================================
        // 7. CHECK BALANCE
        // ========================================

        if (user.getBalance()
                .compareTo(request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ========================================
        // 8. DEDUCT BALANCE
        // ========================================

        user.setBalance(
                user.getBalance()
                        .subtract(request.getAmount())
        );


        // ========================================
        // 9. SAVE USER
        // ========================================

        userRepository.save(user);


        // ========================================
        // 10. CREATE TRANSACTION
        // ========================================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "QR_PAYMENT",
                        "UPI",
                        "SUCCESS"
                );


        // ========================================
        // 11. SAVE TRANSACTION
        // ========================================

        return transactionRepository.save(transaction);
    }
}