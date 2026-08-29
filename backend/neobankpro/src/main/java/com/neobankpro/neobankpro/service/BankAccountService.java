package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.BankAccountRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BankAccountService {

    private static final String NEOBANK_IFSC = "NEOB0001001";

    private final BankAccountRepository bankAccountRepository;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public BankAccountService(
            BankAccountRepository bankAccountRepository) {

        this.bankAccountRepository = bankAccountRepository;
    }

    // ==========================================
    // CREATE ACCOUNT FOR NEW USER
    // ==========================================

    @Transactional
    public BankAccount createAccountForUser(User user) {

        // ------------------------------------------
        // Prevent duplicate account creation
        // ------------------------------------------

        if (bankAccountRepository.existsByUser(user)) {

            return bankAccountRepository
                    .findByUserAndPrimaryAccount(user, true)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Bank account already exists for this user"
                            )
                    );
        }

        // ------------------------------------------
        // Create new bank account
        // ------------------------------------------

        BankAccount account = new BankAccount();

        // Account Number
        account.setAccountNumber(
                generateUniqueAccountNumber()
        );

        // IFSC
        account.setIfscCode(
                NEOBANK_IFSC
        );

        // Account Type
        account.setAccountType(
                "SAVINGS"
        );

        // Account Status
        account.setStatus(
                "ACTIVE"
        );

        // Primary Account
        account.setPrimaryAccount(
                true
        );

        // New account starts with ₹0
        account.setBalance(
                BigDecimal.ZERO
        );

        // Connect account with user
        account.setUser(
                user
        );

        // createdAt automatically handled
        // by @PrePersist in BankAccount entity

        return bankAccountRepository.save(account);
    }

    // ==========================================
    // GET PRIMARY ACCOUNT
    // ==========================================

    public BankAccount getPrimaryAccount(User user) {

        return bankAccountRepository
                .findByUserAndPrimaryAccount(user, true)
                .orElse(null);
    }

    // ==========================================
    // GENERATE UNIQUE ACCOUNT NUMBER
    // ==========================================

    private String generateUniqueAccountNumber() {

        String accountNumber;

        do {

            long number =
                    ThreadLocalRandom.current()
                            .nextLong(
                                    1000000000L,
                                    10000000000L
                            );

            accountNumber =
                    String.valueOf(number);

        } while (
                bankAccountRepository
                        .existsByAccountNumber(accountNumber)
        );

        return accountNumber;
    }
}