package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.BillRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class BillService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public BillService(
            UserRepository userRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Transaction payBill(
            String email,
            BillRequest request) {

        // ========================================
        // 1. FIND LOGGED-IN USER
        // ========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ========================================
        // 2. CHECK TRANSACTION PIN EXISTS
        // ========================================

        if (user.getTransactionPin() == null) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ========================================
        // 3. VALIDATE TRANSACTION PIN
        // ========================================

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
                    "Incorrect transaction PIN"
            );
        }


        // ========================================
        // 4. VALIDATE BILL AMOUNT
        // ========================================

        if (request.getAmount() == null ||
                request.getAmount().signum() <= 0) {

            throw new IllegalArgumentException(
                    "Invalid bill amount"
            );
        }


        // ========================================
        // 5. VALIDATE CATEGORY
        // ========================================

        if (request.getCategory() == null ||
                request.getCategory().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill category is required"
            );
        }


        // ========================================
        // 6. VALIDATE PROVIDER
        // ========================================

        if (request.getProvider() == null ||
                request.getProvider().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill provider is required"
            );
        }


        // ========================================
        // 7. VALIDATE ACCOUNT NUMBER
        // ========================================

        if (request.getAccountNumber() == null ||
                request.getAccountNumber().isBlank()) {

            throw new IllegalArgumentException(
                    "Bill account number is required"
            );
        }


        // ========================================
        // 8. CHECK BALANCE
        // ========================================

        BigDecimal balance = user.getBalance();

        if (balance == null) {
            balance = BigDecimal.ZERO;
        }


        if (balance.compareTo(
                request.getAmount()
        ) < 0) {

            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }


        // ========================================
        // 9. DEDUCT BILL AMOUNT
        // ========================================

        user.setBalance(
                balance.subtract(
                        request.getAmount()
                )
        );


        // ========================================
        // 10. SAVE UPDATED BALANCE
        // ========================================

        userRepository.save(user);


        // ========================================
        // 11. CREATE BILL TRANSACTION
        // ========================================

       Transaction transaction =
        new Transaction(
                user,
                request.getAmount(),
                "BILL_PAYMENT",
                request.getProvider(),
                "SUCCESS",
                request.getCategory(),
                request.getProvider(),
                request.getAccountNumber()
        );

        // ========================================
        // 12. SAVE TRANSACTION
        // ========================================

        return transactionRepository.save(
                transaction
        );
    }
}