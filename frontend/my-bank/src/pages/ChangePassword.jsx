import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";
import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "oldPassword") {
      setOldPasswordError("");
    }

    if (name === "newPassword") {
      setNewPasswordError("");
    }

    if (name === "confirmPassword") {
      setConfirmPasswordError("");
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    const {
      oldPassword,
      newPassword,
      confirmPassword,
    } = passwords;

    // Current password validation
    if (!oldPassword.trim()) {
      setOldPasswordError(
        "Please enter your current password."
      );
      return;
    }

    // New password validation
    if (!newPassword.trim()) {
      setNewPasswordError(
        "Please enter a new password."
      );
      return;
    }

    // New password length
    if (newPassword.length < 8) {
      setNewPasswordError(
        "New password must be at least 8 characters."
      );
      return;
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(
        "Please confirm your new password."
      );
      return;
    }

    // Password mismatch
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    // Same password
    if (oldPassword === newPassword) {
      setNewPasswordError(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/auth/change-password",
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );

      console.log("Status:", response.status);
      console.log("Response:", response.data);

      // Success
      setSuccess(true);

    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);

  const status = error.response?.status;
  const message = error.response?.data?.message;

  // Wrong current password
  if (
    message === "Current password is incorrect" ||
    status === 403 ||
    status === 401
  ) {
    setOldPasswordError("Current password is incorrect.");
    return;
  }

  // New password same as current password
  if (
    message ===
    "New password must be different from current password"
  ) {
    setNewPasswordError(
      "New password must be different from your current password."
    );
    return;
  }

  // Validation error
  if (status === 400) {
    const errorMessage =
      message || "Invalid password details.";

    if (errorMessage.toLowerCase().includes("current")) {
      setOldPasswordError(errorMessage);
    } else if (errorMessage.toLowerCase().includes("new")) {
      setNewPasswordError(errorMessage);
    } else {
      setConfirmPasswordError(errorMessage);
    }

    return;
  }

  // Other errors
  setOldPasswordError(
    "Unable to change password. Please try again."
  );
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
            type="button"
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              Change Password
            </h1>

            <p className="text-gray-400 mt-1">
              Update your account password securely
            </p>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="max-w-xl mx-auto px-6 mt-8 pb-10">

        {!success ? (

          <GlassCard className="p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Current Password */}

              <div>

                <label className="text-gray-300">
                  Current Password
                </label>

                <div className="relative mt-2">

                  <FaLock className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type={showOld ? "text" : "password"}
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border ${
                      oldPasswordError
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowOld(!showOld)
                    }
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showOld ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {oldPasswordError && (
                  <p className="mt-2 text-sm text-red-400">
                    {oldPasswordError}
                  </p>
                )}

              </div>

              {/* New Password */}

              <div>

                <label className="text-gray-300">
                  New Password
                </label>

                <div className="relative mt-2">

                  <FaLock className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border ${
                      newPasswordError
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNew(!showNew)
                    }
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showNew ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                <p className="text-gray-500 text-xs mt-2">
                  Password must contain at least 8 characters.
                </p>

                {newPasswordError && (
                  <p className="mt-2 text-sm text-red-400">
                    {newPasswordError}
                  </p>
                )}

              </div>

              {/* Confirm Password */}

              <div>

                <label className="text-gray-300">
                  Confirm Password
                </label>

                <div className="relative mt-2">

                  <FaLock className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border ${
                      confirmPasswordError
                        ? "border-red-500"
                        : "border-white/10 focus:border-blue-500"
                    }`}
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirm(!showConfirm)
                    }
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showConfirm ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {confirmPasswordError && (
                  <p className="mt-2 text-sm text-red-400">
                    {confirmPasswordError}
                  </p>
                )}

              </div>

              {/* Update Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {loading
                  ? "Updating Password..."
                  : "Update Password"}
              </button>

            </form>

          </GlassCard>

        ) : (

          /* Success */

          <GlassCard className="p-10 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={45} />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Password Updated Successfully
            </h2>

            <p className="text-gray-400 mt-3">
              Your account password has been updated successfully.
            </p>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="w-full mt-7 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
            >
              Back to Settings
            </button>

          </GlassCard>

        )}

      </div>

    </div>
  );
}