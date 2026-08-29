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

        String email = authentication.getName();

        Transaction transaction =
                withdrawService.withdraw(email, request);

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "message", "Withdrawal successful",
                        "transactionId", transaction.getId(),
                        "amount", transaction.getAmount()
                )
        );
    }
}