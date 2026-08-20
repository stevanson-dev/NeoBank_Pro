package com.neobankpro.neobankpro.dto;

import java.math.BigDecimal;

public class QRPaymentRequest {

    private BigDecimal amount;

    private String upiId;

    private String pin;

    public QRPaymentRequest() {
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}