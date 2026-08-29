package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.BankAccountRepository;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(
            UserRepository userRepository,
            BankAccountRepository bankAccountRepository,
            TransactionRepository transactionRepository) {

        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.transactionRepository = transactionRepository;
    }

    // ==========================================
    // GET USER TRANSACTIONS
    // ==========================================

    public List<Transaction> getTransactions(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return transactionRepository
                .findByUserOrderByCreatedAtDesc(user);
    }

    // ==========================================
    // GET CURRENT BALANCE
    // ==========================================

    public BankAccount getPrimaryAccount(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return bankAccountRepository
                .findByUserAndPrimaryAccount(user, true)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Primary bank account not found"
                        )
                );
    }
}