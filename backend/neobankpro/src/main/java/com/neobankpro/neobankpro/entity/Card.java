package com.neobankpro.neobankpro.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "cards")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // CARD NUMBER
    // ==========================================

    @Column(name = "card_number", nullable = false, unique = true)
    private String cardNumber;

    // ==========================================
    // CARD HOLDER
    // ==========================================

    @Column(name = "card_holder", nullable = false)
    private String cardHolder;

    // ==========================================
    // EXPIRY DATE
    // ==========================================

    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    // ==========================================
    // CVV
    // ==========================================

    @Column(name = "cvv", nullable = false)
    private String cvv;

    // ==========================================
    // CARD TYPE
    // DEBIT / CREDIT
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "card_type", nullable = false)
    private CardType cardType;

    // ==========================================
    // CARD VARIANT
    // PHYSICAL / VIRTUAL
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "card_variant", nullable = false)
    private CardVariant cardVariant;

    // ==========================================
    // CARD STATUS
    // PENDING / ACTIVE / FROZEN / EXPIRED / BLOCKED
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private CardStatus status;

    // ==========================================
    // DEBIT CARD LIMITS
    // ==========================================

    @Column(
        name = "daily_limit",
        nullable = false,
        precision = 15,
        scale = 2
    )
    private BigDecimal dailyLimit = new BigDecimal("20000");

    @Column(
        name = "monthly_limit",
        nullable = false,
        precision = 15,
        scale = 2
    )
    private BigDecimal monthlyLimit = new BigDecimal("100000");

    // ==========================================
    // CREDIT CARD
    // ==========================================

    @Column(
        name = "credit_limit",
        precision = 15,
        scale = 2
    )
    private BigDecimal creditLimit;

    @Column(
        name = "used_credit",
        precision = 15,
        scale = 2
    )
    private BigDecimal usedCredit;

    @Column(
        name = "available_credit",
        precision = 15,
        scale = 2
    )
    private BigDecimal availableCredit;

    // ==========================================
    // CARD FEATURES
    // ==========================================

    @Column(name = "online_enabled", nullable = false)
    private boolean onlineEnabled = true;

    @Column(name = "contactless_enabled", nullable = false)
    private boolean contactlessEnabled = true;

    @Column(name = "international_enabled", nullable = false)
    private boolean internationalEnabled = false;

    @Column(name = "atm_enabled", nullable = false)
    private boolean atmEnabled = true;

    @Column(name = "pos_enabled", nullable = false)
    private boolean posEnabled = true;

    // ==========================================
    // CARD PIN SECURITY
    // ==========================================

    /*
     * Never store the real 4-digit PIN.
     * Only the BCrypt/PasswordEncoder hash will be stored here.
     */
    @Column(name = "pin_hash")
    private String pinHash;

    /*
     * false = PIN has never been set
     * true  = PIN has been successfully configured
     */
    @Column(name = "pin_set", nullable = false)
    private boolean pinSet = false;

    /*
     * Number of consecutive incorrect PIN attempts.
     */
    @Column(name = "pin_failed_attempts", nullable = false)
    private int pinFailedAttempts = 0;

    /*
     * Temporary PIN lock time.
     *
     * null = PIN is not temporarily locked.
     */
    @Column(name = "pin_locked_until")
    private LocalDateTime pinLockedUntil;

    // ==========================================
    // CREATED / UPDATED
    // ==========================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // ==========================================
    // BANK ACCOUNT
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_account_id", nullable = false)
    private BankAccount bankAccount;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Card() {
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
    // CARD NUMBER
    // ==========================================

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    // ==========================================
    // CARD HOLDER
    // ==========================================

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }

    // ==========================================
    // EXPIRY DATE
    // ==========================================

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    // ==========================================
    // CVV
    // ==========================================

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    // ==========================================
    // CARD TYPE
    // ==========================================

    public CardType getCardType() {
        return cardType;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }

    // ==========================================
    // CARD VARIANT
    // ==========================================

    public CardVariant getCardVariant() {
        return cardVariant;
    }

    public void setCardVariant(CardVariant cardVariant) {
        this.cardVariant = cardVariant;
    }

    // ==========================================
    // STATUS
    // ==========================================

    public CardStatus getStatus() {
        return status;
    }

    public void setStatus(CardStatus status) {
        this.status = status;
    }

    // ==========================================
    // DAILY LIMIT
    // ==========================================

    public BigDecimal getDailyLimit() {
        return dailyLimit;
    }

    public void setDailyLimit(BigDecimal dailyLimit) {
        this.dailyLimit = dailyLimit;
    }

    // ==========================================
    // MONTHLY LIMIT
    // ==========================================

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    // ==========================================
    // CREDIT LIMIT
    // ==========================================

    public BigDecimal getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(BigDecimal creditLimit) {
        this.creditLimit = creditLimit;
    }

    // ==========================================
    // USED CREDIT
    // ==========================================

    public BigDecimal getUsedCredit() {
        return usedCredit;
    }

    public void setUsedCredit(BigDecimal usedCredit) {
        this.usedCredit = usedCredit;
    }

    // ==========================================
    // AVAILABLE CREDIT
    // ==========================================

    public BigDecimal getAvailableCredit() {
        return availableCredit;
    }

    public void setAvailableCredit(BigDecimal availableCredit) {
        this.availableCredit = availableCredit;
    }

    // ==========================================
    // ONLINE
    // ==========================================

    public boolean isOnlineEnabled() {
        return onlineEnabled;
    }

    public void setOnlineEnabled(boolean onlineEnabled) {
        this.onlineEnabled = onlineEnabled;
    }

    // ==========================================
    // CONTACTLESS
    // ==========================================

    public boolean isContactlessEnabled() {
        return contactlessEnabled;
    }

    public void setContactlessEnabled(boolean contactlessEnabled) {
        this.contactlessEnabled = contactlessEnabled;
    }

    // ==========================================
    // INTERNATIONAL
    // ==========================================

    public boolean isInternationalEnabled() {
        return internationalEnabled;
    }

    public void setInternationalEnabled(boolean internationalEnabled) {
        this.internationalEnabled = internationalEnabled;
    }

    // ==========================================
    // ATM
    // ==========================================

    public boolean isAtmEnabled() {
        return atmEnabled;
    }

    public void setAtmEnabled(boolean atmEnabled) {
        this.atmEnabled = atmEnabled;
    }

    // ==========================================
    // POS
    // ==========================================

    public boolean isPosEnabled() {
        return posEnabled;
    }

    public void setPosEnabled(boolean posEnabled) {
        this.posEnabled = posEnabled;
    }

    // ==========================================
    // PIN HASH
    // ==========================================

    public String getPinHash() {
        return pinHash;
    }

    public void setPinHash(String pinHash) {
        this.pinHash = pinHash;
    }

    // ==========================================
    // PIN SET
    // ==========================================

    public boolean isPinSet() {
        return pinSet;
    }

    public void setPinSet(boolean pinSet) {
        this.pinSet = pinSet;
    }

    // ==========================================
    // PIN FAILED ATTEMPTS
    // ==========================================

    public int getPinFailedAttempts() {
        return pinFailedAttempts;
    }

    public void setPinFailedAttempts(int pinFailedAttempts) {
        this.pinFailedAttempts = pinFailedAttempts;
    }

    // ==========================================
    // PIN LOCKED UNTIL
    // ==========================================

    public LocalDateTime getPinLockedUntil() {
        return pinLockedUntil;
    }

    public void setPinLockedUntil(LocalDateTime pinLockedUntil) {
        this.pinLockedUntil = pinLockedUntil;
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
    // UPDATED AT
    // ==========================================

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // ==========================================
    // BANK ACCOUNT
    // ==========================================

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    // ==========================================
    // AUTO CREATED DATE
    // ==========================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        if (createdAt == null) {
            createdAt = now;
        }

        if (updatedAt == null) {
            updatedAt = now;
        }

        if (dailyLimit == null) {
            dailyLimit = new BigDecimal("20000");
        }

        if (monthlyLimit == null) {
            monthlyLimit = new BigDecimal("100000");
        }

        if (status == null) {
            status = CardStatus.PENDING;
        }

        if (pinFailedAttempts < 0) {
            pinFailedAttempts = 0;
        }

        // ======================================
        // CREDIT CARD DEFAULTS
        // ======================================

        if (cardType == CardType.CREDIT) {

            if (creditLimit == null) {
                creditLimit = new BigDecimal("50000");
            }

            if (usedCredit == null) {
                usedCredit = BigDecimal.ZERO;
            }

            if (availableCredit == null) {
                availableCredit = creditLimit;
            }

        } else {

            /*
             * Debit cards do not use credit values.
             */
            creditLimit = null;
            usedCredit = null;
            availableCredit = null;
        }
    }

    // ==========================================
    // AUTO UPDATED DATE
    // ==========================================

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}