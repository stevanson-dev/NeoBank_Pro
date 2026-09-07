
package com.neobankpro.neobankpro.dto;

import java.math.BigDecimal;

public class CardPaymentResponse {

    private boolean success;
    private String message;

    private Long paymentId;

    private String transactionId;

    private BigDecimal amount;

    private String merchantName;

    private String cardNumber;

    private BigDecimal remainingBalance;

    private BigDecimal availableCredit;

    // =========================================================
    // MONTHLY CARD PAYMENT DETAILS
    // =========================================================

    private BigDecimal monthlyLimit;

    private BigDecimal monthlyUsed;

    private BigDecimal monthlyRemaining;


    // =========================================================
    // DEFAULT CONSTRUCTOR
    // =========================================================

    public CardPaymentResponse() {
    }


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public CardPaymentResponse(
            boolean success,
            String message,
            Long paymentId,
            String transactionId,
            BigDecimal amount,
            String merchantName,
            String cardNumber,
            BigDecimal remainingBalance,
            BigDecimal availableCredit,
            BigDecimal monthlyLimit,
            BigDecimal monthlyUsed,
            BigDecimal monthlyRemaining
    ) {
        this.success = success;
        this.message = message;
        this.paymentId = paymentId;
        this.transactionId = transactionId;
        this.amount = amount;
        this.merchantName = merchantName;
        this.cardNumber = cardNumber;
        this.remainingBalance = remainingBalance;
        this.availableCredit = availableCredit;

        this.monthlyLimit = monthlyLimit;
        this.monthlyUsed = monthlyUsed;
        this.monthlyRemaining = monthlyRemaining;
    }


    // =========================================================
    // GETTERS
    // =========================================================

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getMerchantName() {
        return merchantName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public BigDecimal getRemainingBalance() {
        return remainingBalance;
    }

    public BigDecimal getAvailableCredit() {
        return availableCredit;
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
}
