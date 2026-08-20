package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ========================================
    // USER
    // ========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    // ========================================
    // COMMON TRANSACTION DETAILS
    // ========================================

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String method;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime createdAt;


    // ========================================
    // BILL PAYMENT DETAILS
    // ========================================

    @Column(name = "bill_category")
    private String billCategory;

    @Column(name = "bill_provider")
    private String billProvider;

    @Column(name = "bill_account_number")
    private String billAccountNumber;


    // ========================================
    // DEFAULT CONSTRUCTOR
    // ========================================

    public Transaction() {
    }


    // ========================================
    // COMMON TRANSACTION CONSTRUCTOR
    // Deposit / Withdraw / Transfer
    // ========================================

    public Transaction(
            User user,
            BigDecimal amount,
            String type,
            String method,
            String status) {

        this.user = user;
        this.amount = amount;
        this.type = type;
        this.method = method;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }


    // ========================================
    // BILL PAYMENT CONSTRUCTOR
    // ========================================

    public Transaction(
            User user,
            BigDecimal amount,
            String type,
            String method,
            String status,
            String billCategory,
            String billProvider,
            String billAccountNumber) {

        this.user = user;
        this.amount = amount;
        this.type = type;
        this.method = method;
        this.status = status;
        this.createdAt = LocalDateTime.now();

        this.billCategory = billCategory;
        this.billProvider = billProvider;
        this.billAccountNumber = billAccountNumber;
    }


    // ========================================
    // GETTERS / SETTERS
    // ========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    // ========================================
    // BILL GETTERS / SETTERS
    // ========================================

    public String getBillCategory() {
        return billCategory;
    }

    public void setBillCategory(String billCategory) {
        this.billCategory = billCategory;
    }


    public String getBillProvider() {
        return billProvider;
    }

    public void setBillProvider(String billProvider) {
        this.billProvider = billProvider;
    }


    public String getBillAccountNumber() {
        return billAccountNumber;
    }

    public void setBillAccountNumber(
            String billAccountNumber) {

        this.billAccountNumber = billAccountNumber;
    }
}