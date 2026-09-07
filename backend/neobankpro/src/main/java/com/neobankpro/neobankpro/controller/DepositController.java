package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.DepositRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.DepositService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/deposits")
@CrossOrigin(origins = "http://localhost:5173")
public class DepositController {

    private final DepositService depositService;

    public DepositController(
            DepositService depositService) {

        this.depositService = depositService;
    }

    @PostMapping
    public ResponseEntity<?> deposit(
            Authentication authentication,
            @Valid @RequestBody DepositRequest request) {

        String email = authentication.getName();

        Transaction transaction =
                depositService.deposit(email, request);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Deposit successful",

                        // Generated DEP-XXXXXXX ID
                        "transactionId",
                        transaction.getTransactionId(),

                        "amount",
                        transaction.getAmount()
                )
        );
    }
}