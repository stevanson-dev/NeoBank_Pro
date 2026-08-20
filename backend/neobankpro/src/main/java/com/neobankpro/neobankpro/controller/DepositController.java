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

    public DepositController(DepositService depositService) {
        this.depositService = depositService;
    }

    @PostMapping
    public ResponseEntity<?> deposit(
            Authentication authentication,
            @Valid @RequestBody DepositRequest request) {

        try {

            // Get logged-in user's email
            String email = authentication.getName();

            // Deposit money into User.balance
            Transaction transaction =
                    depositService.deposit(
                            email,
                            request
                    );

            // Return successful response
            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Deposit successful",
                            "transactionId", transaction.getId(),
                            "amount", transaction.getAmount(),
                            "type", transaction.getType(),
                            "method", transaction.getMethod(),
                            "status", transaction.getStatus(),
                            "balance", transaction.getUser().getBalance()
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message", e.getMessage()
                            )
                    );

        } catch (IllegalStateException e) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message", e.getMessage()
                            )
                    );

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(
                            Map.of(
                                    "success", false,
                                    "message", e.getMessage()
                            )
                    );
        }
    }
}