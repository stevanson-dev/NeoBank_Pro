package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.TransactionService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(
            TransactionService transactionService) {

        this.transactionService = transactionService;
    }

    @GetMapping
    public ResponseEntity<?> getTransactions(
            Authentication authentication) {

        String email = authentication.getName();

        List<Transaction> transactions =
                transactionService.getUserTransactions(email);

        return ResponseEntity.ok(
                transactions.stream()
                        .map(transaction -> {

                            Map<String, Object> data =
                                    new HashMap<>();

                            // ========================================
                            // COMMON TRANSACTION DETAILS
                            // ========================================

                            data.put(
                                    "transactionId",
                                    transaction.getId()
                            );

                            data.put(
                                    "amount",
                                    transaction.getAmount()
                            );

                            data.put(
                                    "type",
                                    transaction.getType()
                            );

                            data.put(
                                    "method",
                                    transaction.getMethod()
                            );

                            data.put(
                                    "status",
                                    transaction.getStatus()
                            );

                            data.put(
                                    "createdAt",
                                    transaction.getCreatedAt()
                            );


                            // ========================================
                            // BILL PAYMENT DETAILS
                            // ========================================

                            data.put(
                                    "billCategory",
                                    transaction.getBillCategory()
                            );

                            data.put(
                                    "billProvider",
                                    transaction.getBillProvider()
                            );

                            data.put(
                                    "billAccountNumber",
                                    maskAccountNumber(
                                            transaction.getBillAccountNumber()
                                    )
                            );


                            return data;

                        })
                        .toList()
        );
    }


    // ========================================
    // MASK BILL ACCOUNT NUMBER
    // ========================================

    private String maskAccountNumber(
            String accountNumber) {

        if (accountNumber == null ||
                accountNumber.isBlank()) {

            return null;
        }

        if (accountNumber.length() <= 4) {

            return accountNumber;
        }

        int visibleDigits = 4;

        String lastFour =
                accountNumber.substring(
                        accountNumber.length() - visibleDigits
                );

        return "****" + lastFour;
    }
}