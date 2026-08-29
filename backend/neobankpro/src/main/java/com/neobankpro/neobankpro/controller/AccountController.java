package com.neobankpro.neobankpro.controller;

import com.neobankpro.neobankpro.entity.BankAccount;
import com.neobankpro.neobankpro.entity.User;
import com.neobankpro.neobankpro.repository.UserRepository;
import com.neobankpro.neobankpro.service.BankAccountService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final UserRepository userRepository;
    private final BankAccountService bankAccountService;

    public AccountController(
            UserRepository userRepository,
            BankAccountService bankAccountService
    ) {
        this.userRepository = userRepository;
        this.bankAccountService = bankAccountService;
    }

    // ==========================================
    // GET PRIMARY ACCOUNT
    // ==========================================

    @GetMapping("/primary")
    public ResponseEntity<?> getPrimaryAccount(
            Authentication authentication
    ) {

        // ==========================================
        // 1. GET LOGGED-IN USER EMAIL
        // ==========================================

        String email = authentication.getName();

        // ==========================================
        // 2. FIND USER
        // ==========================================

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        // ==========================================
        // 3. FIND PRIMARY BANK ACCOUNT
        // ==========================================

        BankAccount account =
                bankAccountService.getPrimaryAccount(user);

        // ==========================================
        // 4. ACCOUNT NOT FOUND
        // ==========================================

        if (account == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        // ==========================================
        // 5. RESPONSE
        // ==========================================

        Map<String, Object> response =
                new HashMap<>();

        // ==========================================
        // BANK ACCOUNT DETAILS
        // ==========================================

        response.put(
                "accountNumber",
                account.getAccountNumber()
        );

        response.put(
                "ifscCode",
                account.getIfscCode()
        );

        response.put(
                "accountType",
                account.getAccountType()
        );

        response.put(
                "status",
                account.getStatus()
        );

        response.put(
                "primary",
                account.isPrimaryAccount()
        );

        // ==========================================
        // ACCOUNT HOLDER
        // ==========================================

        response.put(
                "accountHolderName",
                user.getFullName()
        );

        // ==========================================
        // IMPORTANT
        // ==========================================
        // Balance comes from BankAccount table.
        // NOT from User table.

        response.put(
                "balance",
                account.getBalance()
        );

        // ==========================================
        // ACCOUNT CREATED DATE
        // ==========================================

        response.put(
                "createdAt",
                account.getCreatedAt()
        );

        // ==========================================
        // RETURN RESPONSE
        // ==========================================

        return ResponseEntity.ok(response);
    }
    
}