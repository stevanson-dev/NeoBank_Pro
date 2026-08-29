package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_accounts")
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // BANK ACCOUNT NUMBER
    // ==========================================

    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNumber;

   

    // ==========================================
    // IFSC CODE
    // ==========================================

    @Column(name = "ifsc_code", nullable = false)
    private String ifscCode;

    // ==========================================
    // ACCOUNT TYPE
    // ==========================================

    @Column(name = "account_type", nullable = false)
    private String accountType;

    // ==========================================
    // ACCOUNT STATUS
    // ==========================================

    @Column(nullable = false)
    private String status;

    // ==========================================
    // PRIMARY ACCOUNT
    // ==========================================

    @Column(name = "is_primary", nullable = false)
    private boolean primaryAccount;

    // ==========================================
    // BANK ACCOUNT BALANCE
    // ==========================================

    @Column(
        nullable = false,
        precision = 15,
        scale = 2
    )
    private BigDecimal balance = BigDecimal.ZERO;

    // ==========================================
    // CREATED AT
    // ==========================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // ==========================================
    // USER
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public BankAccount() {
    }

    // ==========================================
    // ID
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // ==========================================
    // ACCOUNT NUMBER
    // ==========================================

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

   

    // ==========================================
    // IFSC CODE
    // ==========================================

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    // ==========================================
    // ACCOUNT TYPE
    // ==========================================

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    // ==========================================
    // STATUS
    // ==========================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // ==========================================
    // PRIMARY ACCOUNT
    // ==========================================

    public boolean isPrimaryAccount() {
        return primaryAccount;
    }

    public void setPrimaryAccount(boolean primaryAccount) {
        this.primaryAccount = primaryAccount;
    }

    // ==========================================
    // BALANCE
    // ==========================================

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    // ==========================================
    // CREATED AT
    // ==========================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // ==========================================
    // USER
    // ==========================================

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // ==========================================
    // AUTO CREATED DATE
    // ==========================================

    @PrePersist
    protected void onCreate() {

        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }

        if (balance == null) {
            balance = BigDecimal.ZERO;
        }
    }
}