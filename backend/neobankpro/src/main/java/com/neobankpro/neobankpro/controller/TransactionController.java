package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.TransactionService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService) {

        this.transactionService = transactionService;
    }

    // ==========================================
    // GET USER TRANSACTIONS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(
            Authentication authentication) {

        String email = authentication.getName();

        List<Transaction> transactions =
                transactionService.getTransactions(email);

        return ResponseEntity.ok(transactions);
    }
}