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
    // TRANSACTION IDENTIFICATION
    // ========================================

    @Column(name = "transaction_id", unique = true, length = 50)
    private String transactionId;

    @Column(name = "transaction_number")
    private Long transactionNumber;

    // ========================================
    // TRANSFER DETAILS
    // ========================================

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "recipient_account")
    private String recipientAccount;

    @Column(name = "recipient_bank")
    private String recipientBank;

    @Column(name = "recipient_ifsc")
    private String recipientIfsc;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "sender_account")
    private String senderAccount;

    @Column(name = "sender_bank")
    private String senderBank;

    @Column(name = "sender_ifsc")
    private String senderIfsc;

    // ========================================
    // OTHER DETAILS
    // ========================================

    @Column
    private String category;

    @Column
    private String notes;

    @Column
    private String purpose;

   

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
    // COMMON CONSTRUCTOR
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
    // BILL CONSTRUCTOR
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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Long getTransactionNumber() {
        return transactionNumber;
    }

    public void setTransactionNumber(Long transactionNumber) {
        this.transactionNumber = transactionNumber;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientAccount() {
        return recipientAccount;
    }

    public void setRecipientAccount(String recipientAccount) {
        this.recipientAccount = recipientAccount;
    }

    public String getRecipientBank() {
        return recipientBank;
    }

    public void setRecipientBank(String recipientBank) {
        this.recipientBank = recipientBank;
    }

    public String getRecipientIfsc() {
        return recipientIfsc;
    }

    public void setRecipientIfsc(String recipientIfsc) {
        this.recipientIfsc = recipientIfsc;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderAccount() {
        return senderAccount;
    }

    public void setSenderAccount(String senderAccount) {
        this.senderAccount = senderAccount;
    }

    public String getSenderBank() {
        return senderBank;
    }

    public void setSenderBank(String senderBank) {
        this.senderBank = senderBank;
    }

    public String getSenderIfsc() {
        return senderIfsc;
    }

    public void setSenderIfsc(String senderIfsc) {
        this.senderIfsc = senderIfsc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }


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

    public void setBillAccountNumber(String billAccountNumber) {
        this.billAccountNumber = billAccountNumber;
    }
}