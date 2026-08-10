
import { useState } from "react";
import { Link ,  useNavigate } from "react-router-dom";
import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import Registerbg from "../assets/Create account bg.png";

function Register() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        <form className="mt-8 space-y-4">

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" />
            I agree to the Terms & Conditions
          </label>

          {/* Create Account */}
          <button onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Create Account
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
