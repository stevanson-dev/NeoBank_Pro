package com.neobankpro.neobankpro.repository;

import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserOrderByCreatedAtDesc(
            User user
    );

    boolean existsByTransactionId(String transactionId);
}