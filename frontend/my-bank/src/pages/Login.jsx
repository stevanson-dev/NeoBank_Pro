
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Loginbg from "../assets/Login bg.png";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
        <form className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Steve@gmail.com"
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
          <button onClick={() => navigate("/dashboard")}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Login
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
            className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 py-3 text-white transition hover:bg-slate-800"
          >
            <FaGoogle />
            Google
          </button>

          <button
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
