import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040f3b] px-4">

      <div className="relative overflow-hidden w-full max-w-md rounded-3xl border border-white/10 bg-linear-to-br from-[#010a34] via-[#031451] to-[#0a132c] backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
         {/* Satin Glow Effect */}
         <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <h1 className="text-center text-3xl font-bold text-white">
          NeoBank <span className="text-blue-600">Pro</span>
        </h1>

        <p className="mt-2 text-center text-gray-300 text-xl font-semibold">
          Forgot Password?
        </p>

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
            placeholder="Steve@gmail.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:bg-white/10 transition"
          />
        </div>

        {/* Send OTP */}
        <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          Send OTP
        </button>

        {/* OTP */}
        <div className="mt-8">

          <label className="block text-sm text-gray-300 mb-3">
            Enter OTP
          </label>

          <div className="flex justify-between gap-2">

            <input
              maxLength="1"
              className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none"
            />

            <input
              maxLength="1"
              className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none"
            />

            <input
              maxLength="1"
              className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none"
            />

            <input
              maxLength="1"
              className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none"
            />

            <input
              maxLength="1"
              className="h-14 w-14 rounded-xl border border-slate-700 bg-[#05183a] text-center text-xl text-white outline-none"
            />

          </div>

        </div>

        <button className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition">
          Verify OTP
        </button>

        <p className="mt-6 text-center text-gray-400">
          <Link
            to="/Login"
            className="text-blue-500 hover:text-blue-400"
          >
            ← Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;