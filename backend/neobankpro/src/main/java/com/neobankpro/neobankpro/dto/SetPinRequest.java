package com.neobankpro.neobankpro.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class SetPinRequest {

    @NotBlank(message = "PIN is required")
    @Pattern(
        regexp = "\\d{6}",
        message = "PIN must contain exactly 6 digits"
    )
    private String pin;

    @NotBlank(message = "Confirm PIN is required")
    @Pattern(
        regexp = "\\d{6}",
        message = "Confirm PIN must contain exactly 6 digits"
    )
    private String confirmPin;

    public SetPinRequest() {
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }

    public String getConfirmPin() {
        return confirmPin;
    }

    public void setConfirmPin(String confirmPin) {
        this.confirmPin = confirmPin;
    }
}