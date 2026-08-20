package com.neobankpro.neobankpro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ChangePinRequest {

    @NotBlank(message = "Current PIN is required")
    @Pattern(
        regexp = "\\d{6}",
        message = "Current PIN must contain exactly 6 digits"
    )
    private String currentPin;

    @NotBlank(message = "New PIN is required")
    @Pattern(
        regexp = "\\d{6}",
        message = "New PIN must contain exactly 6 digits"
    )
    private String newPin;

    @NotBlank(message = "Confirm PIN is required")
    @Pattern(
        regexp = "\\d{6}",
        message = "Confirm PIN must contain exactly 6 digits"
    )
    private String confirmPin;

    public ChangePinRequest() {
    }

    public String getCurrentPin() {
        return currentPin;
    }

    public void setCurrentPin(String currentPin) {
        this.currentPin = currentPin;
    }

    public String getNewPin() {
        return newPin;
    }

    public void setNewPin(String newPin) {
        this.newPin = newPin;
    }

    public String getConfirmPin() {
        return confirmPin;
    }

    public void setConfirmPin(String confirmPin) {
        this.confirmPin = confirmPin;
    }
}