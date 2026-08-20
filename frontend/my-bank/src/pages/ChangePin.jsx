import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaArrowLeft,
  FaCheck,
  FaLock,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function ChangePin() {
  const navigate = useNavigate();

  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [currentPinError, setCurrentPinError] = useState("");
  const [newPinError, setNewPinError] = useState("");
  const [confirmPinError, setConfirmPinError] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const handlePinChange = (value, setter, errorSetter) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);

    setter(numericValue);
    errorSetter("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setCurrentPinError("");
    setNewPinError("");
    setConfirmPinError("");

    let hasError = false;

    // Current PIN validation
    if (currentPin.length !== 6) {
      setCurrentPinError(
        "Please enter your current 6-digit PIN."
      );
      hasError = true;
    }

    // New PIN validation
    if (newPin.length !== 6) {
      setNewPinError(
        "New PIN must contain exactly 6 digits."
      );
      hasError = true;
    }

    // Confirm PIN validation
    if (confirmPin.length !== 6) {
      setConfirmPinError(
        "Please enter your 6-digit confirmation PIN."
      );
      hasError = true;
    }

    // Stop if basic validation failed
    if (hasError) {
      return;
    }

    // New PIN and Confirm PIN
    if (newPin !== confirmPin) {
      setConfirmPinError(
        "PINs do not match. Please try again."
      );
      return;
    }

    // Same PIN validation
    if (currentPin === newPin) {
      setNewPinError(
        "New PIN must be different from your current PIN."
      );
      return;
    }

    // Weak PIN validation
    if (
      newPin === "123456" ||
      newPin === "654321" ||
      /^(\d)\1{5}$/.test(newPin)
    ) {
      setNewPinError(
        "Please choose a stronger PIN."
      );
      return;
    }

    try {
      const response = await api.post("/pin/change", {
        currentPin: currentPin,
        newPin: newPin,
        confirmPin: confirmPin,
      });

      if (response.data.success) {
        setShowSuccess(true);

        setCurrentPin("");
        setNewPin("");
        setConfirmPin("");
      }

    } catch (error) {
      console.error("Change PIN Error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to change PIN. Please try again.";

      // Backend current PIN error
      if (
        message.toLowerCase().includes("current pin")
      ) {
        setCurrentPinError("Incorrect current PIN.");
      }

      // Backend new PIN mismatch
      else if (
        message.toLowerCase().includes("do not match")
      ) {
        setConfirmPinError(
          "PINs do not match. Please try again."
        );
      }

      // Backend same PIN
      else if (
        message.toLowerCase().includes("different")
      ) {
        setNewPinError(
          "New PIN must be different from your current PIN."
        );
      }

      // Other errors
      else {
        setCurrentPinError(message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/pin-security")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Change PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Update your transaction PIN securely
            </p>
          </div>

        </div>

      </div>


      {/* Form */}
      <div className="max-w-md mx-auto px-6 mt-10 pb-12">

        <GlassCard className="p-7">

          {/* Icon */}
          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-400/10 flex items-center justify-center text-purple-400">
              <FaLock className="text-2xl" />
            </div>

          </div>


          {/* Title */}
          <div className="text-center mb-8">

            <h2 className="text-2xl font-semibold">
              Change Transaction PIN
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Enter your current PIN and create a new 6-digit PIN.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Current PIN */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Current PIN
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={currentPin}
                  onChange={(e) =>
                    handlePinChange(
                      e.target.value,
                      setCurrentPin,
                      setCurrentPinError
                    )
                  }
                  placeholder="Enter current PIN"
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-11 pr-4 text-white tracking-[0.5em] outline-none transition ${
                    currentPinError
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/10 focus:border-purple-400/50 focus:bg-white/10"
                  }`}
                />

              </div>


              {/* Current PIN Error */}
              {currentPinError && (
                <p className="text-red-400 text-sm mt-2">
                  {currentPinError}
                </p>
              )}

            </div>


            {/* New PIN */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                New PIN
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) =>
                    handlePinChange(
                      e.target.value,
                      setNewPin,
                      setNewPinError
                    )
                  }
                  placeholder="Enter new PIN"
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-11 pr-4 text-white tracking-[0.5em] outline-none transition ${
                    newPinError
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/10 focus:border-purple-400/50 focus:bg-white/10"
                  }`}
                />

              </div>


              {/* New PIN Error */}
              {newPinError && (
                <p className="text-red-400 text-sm mt-2">
                  {newPinError}
                </p>
              )}

            </div>


            {/* Confirm PIN */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New PIN
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) =>
                    handlePinChange(
                      e.target.value,
                      setConfirmPin,
                      setConfirmPinError
                    )
                  }
                  placeholder="Re-enter new PIN"
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-11 pr-4 text-white tracking-[0.5em] outline-none transition ${
                    confirmPinError
                      ? "border-red-400/60 focus:border-red-400"
                      : "border-white/10 focus:border-purple-400/50 focus:bg-white/10"
                  }`}
                />

              </div>


              {/* Confirm PIN Error */}
              {confirmPinError && (
                <p className="text-red-400 text-sm mt-2">
                  {confirmPinError}
                </p>
              )}

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-semibold transition shadow-lg shadow-blue-900/30"
            >
              Change PIN
            </button>

          </form>

        </GlassCard>

      </div>


      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />


          {/* Success Card */}
          <div className="relative w-full max-w-md bg-[#0A2245]/95 border border-white/10 rounded-3xl p-8 text-center shadow-2xl">

            {/* Success Icon */}
            <div className="flex justify-center mb-6">

              <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-400/30 flex items-center justify-center">

                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white">

                  <FaCheck className="text-2xl" />

                </div>

              </div>

            </div>


            <h2 className="text-2xl font-bold">
              PIN Changed Successfully!
            </h2>


            <p className="text-gray-400 mt-3 leading-relaxed">
              Your transaction PIN has been successfully updated.
              You can now use your new PIN for transactions.
            </p>


            <button
              onClick={() => navigate("/settings")}
              className="w-full mt-7 bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-semibold transition"
            >
              Back to Settings
            </button>

          </div>

        </div>
      )}

    </div>
  );
}