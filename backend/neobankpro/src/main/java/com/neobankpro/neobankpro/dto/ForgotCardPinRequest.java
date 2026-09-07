package com.neobankpro.neobankpro.dto;

public class ForgotCardPinRequest {

    private String accountPassword;
    private String newPin;
    private String confirmPin;

    // ==========================================
    // GETTERS
    // ==========================================

    public String getAccountPassword() {
        return accountPassword;
    }

    public String getNewPin() {
        return newPin;
    }

    public String getConfirmPin() {
        return confirmPin;
    }

    // ==========================================
    // SETTERS
    // ==========================================

    public void setAccountPassword(String accountPassword) {
        this.accountPassword = accountPassword;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }

    public void setConfirmPin(String confirmPin) {
        this.confirmPin = confirmPin;
    }
}