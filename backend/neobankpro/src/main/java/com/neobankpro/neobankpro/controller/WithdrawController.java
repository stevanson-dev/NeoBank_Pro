package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.dto.WithdrawRequest;
import com.neobankpro.neobankpro.entity.Transaction;
import com.neobankpro.neobankpro.service.WithdrawService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/withdrawals")
@CrossOrigin(origins = "http://localhost:5173")
public class WithdrawController {

    private final WithdrawService withdrawService;

    public WithdrawController(
            WithdrawService withdrawService) {

        this.withdrawService = withdrawService;
    }

    @PostMapping
    public ResponseEntity<?> withdraw(
            Authentication authentication,
            @Valid @RequestBody WithdrawRequest request) {

        try {

            // Get logged-in user's email
            String email = authentication.getName();

            // Withdraw money from User.balance
            Transaction transaction =
                    withdrawService.withdraw(
                            email,
                            request
                    );

            // Return successful response
            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "message", "Withdrawal successful",
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