import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import Registerbg from "../assets/Create account bg.png";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        fullName,
        email,
        mobile,
        password,
      });

      navigate("/Login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${Registerbg})`,
      }}
    >
      {/* Register Form */}

      <div className="relative overflow-hidden w-full max-w-md ml-160 rounded-3xl border border-white/10 bg-linear-to-br from-[#020f40] via-[#041e79] to-[#07163f] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Satin Glow Effect */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"></div>

        {/* Logo */}
        <h1 className="text-center text-3xl font-bold text-white">
          NeoBank <span className="text-blue-600">Pro</span>
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Create Your Account
        </p>

        <p className="text-center text-sm text-gray-500">
          Start your banking journey
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />

            {showPassword ? (
              <IoEyeOffOutline
                onClick={() => setShowPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer hover:text-white transition"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShowPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer hover:text-white transition"
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />

            {showConfirmPassword ? (
              <IoEyeOffOutline
                onClick={() => setShowConfirmPassword(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer hover:text-white transition"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShowConfirmPassword(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer hover:text-white transition"
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            I agree to the Terms & Conditions
          </label>

          {/* Create Account */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-6 text-center text-gray-400">
          Already have an account?

          <Link
            to="/Login"
            className="ml-2 text-blue-500 hover:text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;