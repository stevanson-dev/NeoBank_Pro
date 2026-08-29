package com.neobankpro.neobankpro.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BankAccountResponse {

    private String accountNumber;
    private String ifscCode;
    private String accountType;
    private String status;
    private boolean primary;
    private String accountHolderName;
    private BigDecimal balance;
    private LocalDateTime createdAt;

    public BankAccountResponse(
            String accountNumber,
            String ifscCode,
            String accountType,
            String status,
            boolean primary,
            String accountHolderName,
            BigDecimal balance,
            LocalDateTime createdAt
    ) {
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.accountType = accountType;
        this.status = status;
        this.primary = primary;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
        this.createdAt = createdAt;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public String getAccountType() {
        return accountType;
    }

    public String getStatus() {
        return status;
    }

    public boolean isPrimary() {
        return primary;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}