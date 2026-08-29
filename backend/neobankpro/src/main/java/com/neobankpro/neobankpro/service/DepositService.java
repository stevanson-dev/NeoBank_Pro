package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.dto.DepositRequest;
import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.BankAccountRepository;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;

@Service
public class DepositService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;

    public DepositService(
            UserRepository userRepository,
            BankAccountRepository bankAccountRepository,
            TransactionRepository transactionRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Transaction deposit(
            String email,
            DepositRequest request) {

        // ==========================================
        // 1. FIND USER
        // ==========================================

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // ==========================================
        // 2. CHECK TRANSACTION PIN
        // ==========================================

        if (user.getTransactionPin() == null ||
                user.getTransactionPin().isBlank()) {

            throw new IllegalStateException(
                    "Transaction PIN is not set. Please set your PIN first."
            );
        }


        // ==========================================
        // 3. VERIFY PIN
        // ==========================================

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


        // ==========================================
        // 4. VALIDATE AMOUNT
        // ==========================================

        if (request.getAmount() == null ||
                request.getAmount()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            throw new IllegalArgumentException(
                    "Invalid deposit amount"
            );
        }


        // ==========================================
        // 5. GET PRIMARY BANK ACCOUNT
        // ==========================================

       BankAccount account =
        bankAccountRepository
                .findByUserAndPrimaryAccount(user, true)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Primary bank account not found"
                        ));


        // ==========================================
        // 6. GET BANK ACCOUNT BALANCE
        // ==========================================

        BigDecimal currentBalance =
                account.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }


        // ==========================================
        // 7. ADD DEPOSIT
        // ==========================================

        BigDecimal newBalance =
                currentBalance.add(
                        request.getAmount()
                );

        account.setBalance(newBalance);


        // ==========================================
        // 8. SAVE BANK ACCOUNT
        // ==========================================

        bankAccountRepository.save(account);


        // ==========================================
        // 9. CREATE TRANSACTION
        // ==========================================

        Transaction transaction =
                new Transaction(
                        user,
                        request.getAmount(),
                        "DEPOSIT",
                        request.getMethod(),
                        "SUCCESS"
                );


        // ==========================================
        // 10. SAVE TRANSACTION
        // ==========================================

        return transactionRepository.save(transaction);
    }
}