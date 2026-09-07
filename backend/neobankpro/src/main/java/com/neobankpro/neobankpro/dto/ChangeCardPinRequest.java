package com.neobankpro.neobankpro.dto;

public class ChangeCardPinRequest {

    private String currentPin;
    private String newPin;
    private String confirmNewPin;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public ChangeCardPinRequest() {
    }

    // ==========================================
    // CURRENT PIN
    // ==========================================

    public String getCurrentPin() {
        return currentPin;
    }

    public void setCurrentPin(String currentPin) {
        this.currentPin = currentPin;
    }

    // ==========================================
    // NEW PIN
    // ==========================================

    public String getNewPin() {
        return newPin;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }

    // ==========================================
    // CONFIRM NEW PIN
    // ==========================================

    public String getConfirmNewPin() {
        return confirmNewPin;
    }

    public void setConfirmNewPin(String confirmNewPin) {
        this.confirmNewPin = confirmNewPin;
    }
}