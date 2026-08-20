import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  FaArrowLeft,
  FaCheck,
  FaKey,
  FaLock,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function SetPin() {
  const navigate = useNavigate();

  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePinChange = (value, setter) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 6);

    setter(numericValue);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (newPin.length !== 6) {
      setError("PIN must contain exactly 6 digits.");
      return;
    }

    if (confirmPin.length !== 6) {
      setError("Please confirm your 6-digit PIN.");
      return;
    }

    if (newPin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    if (
      newPin === "123456" ||
      newPin === "654321" ||
      /^(\d)\1{5}$/.test(newPin)
    ) {
      setError("Please choose a stronger PIN.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/pin/set", {
        pin: newPin,
        confirmPin: confirmPin,
      });

      /*
       * Backend success response
       */
      if (response.data?.success === true) {
        setShowSuccess(true);

        setNewPin("");
        setConfirmPin("");
      } else {
        setError(
          response.data?.message ||
            "Unable to set PIN. Please try again."
        );
      }

    } catch (error) {
      console.error("Set PIN Error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to set PIN. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
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
              Set New PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Create your 6-digit transaction PIN
            </p>
          </div>

        </div>

      </div>


      {/* Form */}
      <div className="max-w-md mx-auto px-6 mt-10 pb-12">

        <GlassCard className="p-7">

          {/* Icon */}
          <div className="flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/10 flex items-center justify-center text-cyan-400">
              <FaKey className="text-2xl" />
            </div>

          </div>


          {/* Title */}
          <div className="text-center mb-8">

            <h2 className="text-2xl font-semibold">
              Create Transaction PIN
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              This PIN will be required to authorize your transactions.
            </p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-6">

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
                      setNewPin
                    )
                  }
                  placeholder="Enter 6-digit PIN"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-11 pr-4 text-white tracking-[0.5em] outline-none focus:border-cyan-400/50 focus:bg-white/10 transition disabled:opacity-50"
                />

              </div>

            </div>


            {/* Confirm PIN */}
            <div>

              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm PIN
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
                      setConfirmPin
                    )
                  }
                  placeholder="Re-enter your PIN"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-11 pr-4 text-white tracking-[0.5em] outline-none focus:border-cyan-400/50 focus:bg-white/10 transition disabled:opacity-50"
                />

              </div>

            </div>


            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-400/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed py-4 rounded-xl font-semibold transition shadow-lg shadow-blue-900/30"
            >
              {loading ? "Setting PIN..." : "Set PIN"}
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
              PIN Set Successfully!
            </h2>


            <p className="text-gray-400 mt-3 leading-relaxed">
              Your transaction PIN has been successfully created.
              You can now use it to authorize your transactions.
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