package com.neobankpro.neobankpro.dto;

import com.neobankpro.neobankpro.entity.PaymentType;

import java.math.BigDecimal;

public class CardPaymentRequest {

    private Long cardId;

    private BigDecimal amount;

    private String merchantName;

    private PaymentType paymentType;

    private String pin;

    public CardPaymentRequest() {
    }

    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
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

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}