package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankAccountRepository
        extends JpaRepository<BankAccount, Long> {

    // Find user's primary bank account
    Optional<BankAccount> findByUserAndPrimaryAccount(
            User user,
            boolean primaryAccount
    );

    // Check whether user already has a bank account
    boolean existsByUser(User user);

    // Check whether account number already exists
    boolean existsByAccountNumber(String accountNumber);

    // Find bank account using account number
    Optional<BankAccount> findByAccountNumber(
            String accountNumber
    );

    // Check whether UPI ID already exists
   
}