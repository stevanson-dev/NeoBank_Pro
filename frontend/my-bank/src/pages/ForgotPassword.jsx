import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Forgotpassword from "../assets/Forgotpassword bg.png";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const otpRefs = useRef([]);

  // Send OTP
  const handleSendOTP = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setOtpSent(true);

    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  // OTP Change
  const handleOTPChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to next box
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // OTP Backspace
  const handleOTPKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpVerified(true);
  };

  // Reset Password
  const handleResetPassword = () => {
    setPasswordError("");

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please enter both passwords");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Go to Login page
    navigate("/Login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${Forgotpassword})`,
      }}
    >
      {/* Forgot Password Card */}
      <div className="relative overflow-hidden w-full max-w-md ml-160 rounded-3xl border border-white/10 bg-linear-to-br from-[#020f40] via-[#041e79] to-[#07163f] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Satin Glow Effect */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10">

          {/* Logo */}
          <h1 className="text-center text-3xl font-bold text-white">
            NeoBank <span className="text-blue-600">Pro</span>
          </h1>

          {/* Title */}
          <p className="mt-2 text-center text-gray-300 text-xl font-semibold">
            Forgot Password?
          </p>

          {/* Description */}
          <p className="mt-2 text-center text-sm text-gray-500">
            Don't worry! Enter your email and we'll send you a verification code.
          </p>

          {/* Email */}
          <div className="mt-8">
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Steve@gmail.com"
              disabled={otpVerified}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition disabled:opacity-50"
            />
          </div>

          {/* Send OTP */}
          {!otpVerified && (
            <button
              onClick={handleSendOTP}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Send OTP
            </button>
          )}

          {/* OTP Section */}
          {otpSent && !otpVerified && (
            <>
              <div className="mt-8">

                <label className="block text-sm text-gray-300 mb-3">
                  Enter OTP
                </label>

                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(element) => {
                        otpRefs.current[index] = element;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleOTPChange(e.target.value, index)
                      }
                      onKeyDown={(e) =>
                        handleOTPKeyDown(e, index)
                      }
                      className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                    />
                  ))}
                </div>

                <p className="mt-3 text-center text-xs text-gray-400">
                  OTP sent to {email}
                </p>

              </div>

              {/* Verify OTP */}
              <button
                onClick={handleVerifyOTP}
                className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          {/* Verification Successful + New Password */}
          {otpVerified && (
            <>
              {/* Success Message */}
              <div className="mt-8 rounded-2xl border border-green-400/30 bg-green-500/10 px-5 py-4 text-center">

                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                  <span className="text-2xl text-green-400">
                    ✓
                  </span>
                </div>

                <h2 className="text-xl font-bold text-green-400">
                  Verification Successful!
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  You can now create a new password.
                </p>

              </div>

              {/* New Password */}
              <div className="mt-6">
                <label className="block text-sm text-gray-300 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
                />
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
                />
              </div>

              {/* Password Error */}
              {passwordError && (
                <p className="mt-3 text-center text-sm text-red-400">
                  {passwordError}
                </p>
              )}

              {/* Reset Password */}
              <button
                onClick={handleResetPassword}
                className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition"
              >
                Reset Password
              </button>
            </>
          )}

          {/* Back To Login */}
          {!otpVerified && (
            <p className="mt-6 text-center text-gray-400">
              <Link
                to="/Login"
                className="text-blue-500 hover:text-blue-400"
              >
                ← Back to Login
              </Link>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;