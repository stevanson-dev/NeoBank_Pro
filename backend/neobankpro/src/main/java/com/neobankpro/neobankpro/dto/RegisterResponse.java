package com.neobankpro.neobankpro.dto;

import java.math.BigDecimal;

public class RegisterResponse {

    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private BigDecimal balance;
    private boolean hasPin;

    public RegisterResponse() {
    }

    public RegisterResponse(
            Long id,
            String fullName,
            String email,
            String mobile) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.balance = BigDecimal.ZERO;
        this.hasPin = false;
    }

    public RegisterResponse(
            Long id,
            String fullName,
            String email,
            String mobile,
            BigDecimal balance,
            boolean hasPin) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.balance = balance;
        this.hasPin = hasPin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public boolean isHasPin() {
        return hasPin;
    }

    public void setHasPin(boolean hasPin) {
        this.hasPin = hasPin;
    }
}