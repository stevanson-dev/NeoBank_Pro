import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Loginbg from "../assets/Login bg.png";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Login successful
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${Loginbg})`,
      }}
    >
      {/* Login Form */}

      <div className="relative overflow-hidden w-full max-w-md ml-160 rounded-3xl border border-white/10 bg-linear-to-br from-[#020f40] via-[#041e79] to-[#07163f] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        {/* Satin Glow Effect */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"></div>

        {/* Logo */}
        <h1 className="text-center text-3xl font-bold text-white">
          NeoBank <span className="text-blue-600">Pro</span>
        </h1>

        <p className="mt-2 text-center text-gray-400">
          Welcome Back 👋
        </p>

        <p className="text-center text-sm text-gray-500">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Steve@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
              />

              {/* Eye Icon */}
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
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Remember + Forgot Password */}
          <div className="flex items-center justify-between text-sm">

            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              to="/ForgotPassword"
              className="text-blue-500 hover:text-blue-400"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-slate-700"></div>

          <span className="mx-4 text-sm text-gray-500">
            or continue with
          </span>

          <div className="h-px flex-1 bg-slate-700"></div>

        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">

          <button
            type="button"
            className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 py-3 text-white transition hover:bg-slate-800"
          >
            <FaGoogle />
            Google
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 py-3 text-white transition hover:bg-slate-800"
          >
            <FaApple />
            Apple
          </button>

        </div>

        {/* Register */}
        <p className="mt-8 text-center text-gray-400">
          Don't have an account?

          <Link
            to="/Register"
            className="ml-2 text-blue-500 hover:text-blue-400"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;