package com.neobankpro.neobankpro.service;

import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.TransactionRepository;
import com.neobankpro.neobankpro.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(
            UserRepository userRepository,
            TransactionRepository transactionRepository) {

        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getUserTransactions(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return transactionRepository
                .findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional
    public Transaction transfer(
            String senderEmail,
            BigDecimal amount,
            String method) {

        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid transfer amount");
        }

        User sender = userRepository.findByEmail(senderEmail)
                .orElseThrow(() ->
                        new RuntimeException("Sender not found"));

        BigDecimal currentBalance = sender.getBalance();

        if (currentBalance == null) {
            currentBalance = BigDecimal.ZERO;
        }

        if (currentBalance.compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        // Deduct amount from sender
        sender.setBalance(currentBalance.subtract(amount));

        userRepository.save(sender);

        // Save transaction
        Transaction transaction = new Transaction(
                sender,
                amount,
                "TRANSFER",
                method != null ? method : "bank",
                "SUCCESS"
        );

        return transactionRepository.save(transaction);
    }
}