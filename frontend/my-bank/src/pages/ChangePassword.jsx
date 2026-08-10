
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });

    // User starts typing again → remove old error
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwords;

    // Current password validation
    if (!oldPassword.trim()) {
      setError("Please enter your current password.");
      return;
    }

    // New password validation
    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    // Minimum password length
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    // Same password validation
    if (oldPassword === newPassword) {
      setError(
        "New password must be different from your current password."
      );
      return;
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setError("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Everything is valid
    setError("");
    setSuccess(true);
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

          /* Change Password Form */

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
                    className={`w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border ${
                      error
                        ? "border-white/10"
                        : "border-white/10"
                    }`}
                    placeholder="Enter current password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showOld ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

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
                    className="w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border border-white/10"
                    placeholder="Enter new password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

                <p className="text-gray-500 text-xs mt-2">
                  Password must contain at least 8 characters.
                </p>

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
                    className="w-full bg-white/10 rounded-xl py-3 pl-11 pr-12 outline-none border border-white/10"
                    placeholder="Confirm new password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>

                </div>

              </div>


              {/* Error Message */}

              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}


              {/* Update Button */}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
              >
                Update Password
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

