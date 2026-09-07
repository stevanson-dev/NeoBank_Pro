package com.neobankpro.neobankpro.dto;

import com.neobankpro.neobankpro.entity.Card;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class CardResponse {

    // ==========================================
    // CARD BASIC INFORMATION
    // ==========================================

    private Long id;

    private String cardNumber;
    private String cardHolder;
    private LocalDate expiryDate;

    private String cardType;
    private String cardVariant;
    private String status;

    // ==========================================
    // CARD LIMITS
    // ==========================================

    private BigDecimal dailyLimit;
    private BigDecimal monthlyLimit;

    private BigDecimal monthlyUsed;
    private BigDecimal monthlyRemaining;

    // ==========================================
    // CREDIT CARD
    // ==========================================

    private BigDecimal creditLimit;
    private BigDecimal usedCredit;
    private BigDecimal availableCredit;

    // ==========================================
    // CARD FEATURES
    // ==========================================

    private boolean onlineEnabled;
    private boolean contactlessEnabled;
    private boolean internationalEnabled;
    private boolean atmEnabled;
    private boolean posEnabled;

    // ==========================================
    // CARD PIN
    // ==========================================

    private boolean pinSet;

    // ==========================================
    // BANK ACCOUNT
    // ==========================================

    private Long bankAccountId;
    private String bankAccountNumber;

    // ==========================================
    // TIMESTAMPS
    // ==========================================

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public CardResponse(
            Card card,
            BigDecimal monthlyUsed) {

        // --------------------------------------
        // BASIC
        // --------------------------------------

        this.id = card.getId();

        this.cardNumber =
                maskCardNumber(
                        card.getCardNumber()
                );

        this.cardHolder =
                card.getCardHolder();

        this.expiryDate =
                card.getExpiryDate();

        this.cardType =
                card.getCardType() != null
                        ? card.getCardType().name()
                        : null;

        this.cardVariant =
                card.getCardVariant() != null
                        ? card.getCardVariant().name()
                        : null;

        this.status =
                card.getStatus() != null
                        ? card.getStatus().name()
                        : null;

        // --------------------------------------
        // LIMITS
        // --------------------------------------

        this.dailyLimit =
                card.getDailyLimit();

        this.monthlyLimit =
                card.getMonthlyLimit();

        this.monthlyUsed =
                monthlyUsed != null
                        ? monthlyUsed
                        : BigDecimal.ZERO;

        this.monthlyRemaining =
                calculateMonthlyRemaining(
                        card.getMonthlyLimit(),
                        this.monthlyUsed
                );

        // --------------------------------------
        // CREDIT CARD
        // --------------------------------------

        this.creditLimit =
                card.getCreditLimit();

        this.usedCredit =
                card.getUsedCredit();

        this.availableCredit =
                card.getAvailableCredit();

        // --------------------------------------
        // FEATURES
        // --------------------------------------

        this.onlineEnabled =
                card.isOnlineEnabled();

        this.contactlessEnabled =
                card.isContactlessEnabled();

        this.internationalEnabled =
                card.isInternationalEnabled();

        this.atmEnabled =
                card.isAtmEnabled();

        this.posEnabled =
                card.isPosEnabled();

        // --------------------------------------
        // PIN
        // --------------------------------------

        this.pinSet =
                card.isPinSet();

        // --------------------------------------
        // BANK ACCOUNT
        // --------------------------------------

        if (card.getBankAccount() != null) {

            this.bankAccountId =
                    card.getBankAccount().getId();

            this.bankAccountNumber =
                    maskAccountNumber(
                            card.getBankAccount()
                                    .getAccountNumber()
                    );
        }

        // --------------------------------------
        // TIMESTAMPS
        // --------------------------------------

        this.createdAt =
                card.getCreatedAt();

        this.updatedAt =
                card.getUpdatedAt();
    }

    // ==========================================
    // MONTHLY REMAINING
    // ==========================================

    private BigDecimal calculateMonthlyRemaining(
            BigDecimal monthlyLimit,
            BigDecimal monthlyUsed) {

        if (monthlyLimit == null) {
            return BigDecimal.ZERO;
        }

        if (monthlyUsed == null) {
            monthlyUsed = BigDecimal.ZERO;
        }

        BigDecimal remaining =
                monthlyLimit.subtract(
                        monthlyUsed
                );

        if (remaining.compareTo(
                BigDecimal.ZERO
        ) < 0) {

            return BigDecimal.ZERO;
        }

        return remaining;
    }

    // ==========================================
    // MASK CARD NUMBER
    // ==========================================

    private String maskCardNumber(
            String cardNumber) {

        if (cardNumber == null ||
                cardNumber.length() < 4) {

            return "****";
        }

        String lastFour =
                cardNumber.substring(
                        cardNumber.length() - 4
                );

        return "**** **** **** " + lastFour;
    }

    // ==========================================
    // MASK BANK ACCOUNT NUMBER
    // ==========================================

    private String maskAccountNumber(
            String accountNumber) {

        if (accountNumber == null ||
                accountNumber.length() < 4) {

            return "****";
        }

        String lastFour =
                accountNumber.substring(
                        accountNumber.length() - 4
                );

        return "****" + lastFour;
    }

    // ==========================================
    // GETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public String getCardType() {
        return cardType;
    }

    public String getCardVariant() {
        return cardVariant;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getDailyLimit() {
        return dailyLimit;
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public BigDecimal getMonthlyUsed() {
        return monthlyUsed;
    }

    public BigDecimal getMonthlyRemaining() {
        return monthlyRemaining;
    }

    public BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public BigDecimal getUsedCredit() {
        return usedCredit;
    }

    public BigDecimal getAvailableCredit() {
        return availableCredit;
    }

    public boolean isOnlineEnabled() {
        return onlineEnabled;
    }

    public boolean isContactlessEnabled() {
        return contactlessEnabled;
    }

    public boolean isInternationalEnabled() {
        return internationalEnabled;
    }

    public boolean isAtmEnabled() {
        return atmEnabled;
    }

    public boolean isPosEnabled() {
        return posEnabled;
    }

    public boolean isPinSet() {
        return pinSet;
    }

    public Long getBankAccountId() {
        return bankAccountId;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}