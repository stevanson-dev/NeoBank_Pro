package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "card_payments")
public class CardPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // CARD
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", nullable = false)
    private Card card;

    // ==========================================
    // BANK ACCOUNT
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_account_id", nullable = false)
    private BankAccount bankAccount;

    // ==========================================
    // PAYMENT DETAILS
    // ==========================================

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String merchantName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType paymentType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CardPaymentStatus status;

    // ==========================================
    // TRANSACTION ID
    // ==========================================

    @Column(nullable = false, unique = true)
    private String transactionId;

    // ==========================================
    // TIMESTAMP
    // ==========================================

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public CardPayment() {
    }

    // ==========================================
    // PRE PERSIST
    // ==========================================

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // ==========================================
    // GETTERS / SETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public void setMerchantName(String merchantName) {
        this.merchantName = merchantName;
    }

    public PaymentType getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(PaymentType paymentType) {
        this.paymentType = paymentType;
    }

    public CardPaymentStatus getStatus() {
        return status;
    }

    public void setStatus(CardPaymentStatus status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}