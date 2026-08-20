package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.WithdrawRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class WithdrawService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public WithdrawService(
            UserRepository userRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Transaction withdraw(
            String email,
            WithdrawRequest request) {

        // Find logged-in user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // =========================
        // 1. CHECK TRANSACTION PIN
        // =========================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }

        // =========================
        // 2. VERIFY TRANSACTION PIN
        // =========================

        if (request.getPin() == null ||
                request.getPin().isBlank()) {

            throw new IllegalArgumentException(
                    "Transaction PIN is required"
            );
        }

        boolean pinCorrect =
                passwordEncoder.matches(
                        request.getPin(),
                        user.getTransactionPin()
                );

        if (!pinCorrect) {

            throw new IllegalArgumentException(
                    "Current PIN is incorrect"
            );
        }

        // =========================
        // 3. VALIDATE AMOUNT
        // =========================

        if (request.getAmount() == null ||
                request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Invalid withdrawal amount"
            );
        }

        // =========================
        // 4. GET CURRENT BALANCE
        // =========================

        BigDecimal currentBalance = user.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }

        // =========================
        // 5. CHECK SUFFICIENT BALANCE
        // =========================

        if (currentBalance.compareTo(request.getAmount()) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }

        // =========================
        // 6. SUBTRACT WITHDRAWAL
        // =========================

        BigDecimal newBalance =
                currentBalance.subtract(request.getAmount());

        user.setBalance(newBalance);

        // Save updated balance
        userRepository.save(user);

        // =========================
        // 7. CREATE TRANSACTION
        // =========================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "WITHDRAW",
                        request.getMethod(),
                        "SUCCESS"
                );

        // Save transaction
        return transactionRepository.save(transaction);
    }
}