package com.neobankpro.neobankpro.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.math.BigDecimal;

public class DepositRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(
            value = "1.00",
            message = "Deposit amount must be at least ₹1"
    )
    private BigDecimal amount;

    @NotBlank(message = "Deposit method is required")
    private String method;

    @NotBlank(message = "PIN is required")
    @Pattern(
            regexp = "\\d{6}",
            message = "PIN must contain exactly 6 digits"
    )
    private String pin;

    public DepositRequest() {
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}