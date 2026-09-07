package com.neobankpro.neobankpro.dto;

public class SetCardPinRequest {

    private String pin;
    private String confirmPin;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public SetCardPinRequest() {
    }

    // ==========================================
    // PIN
    // ==========================================

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    // ==========================================
    // CONFIRM PIN
    // ==========================================

    public String getConfirmPin() {
        return confirmPin;
    }

    public void setConfirmPin(String confirmPin) {
        this.confirmPin = confirmPin;
    }
}