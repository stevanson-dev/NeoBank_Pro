import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaArrowLeft,
} from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();

  if (email && password) {
    localStorage.setItem("adminAuthenticated", "true");
    navigate("/admin/dashboard");
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2  text-slate-300 hover:text-white mb-6 transition"
        >
          <FaArrowLeft />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4">
              <FaShieldAlt className="text-white text-2xl" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Admin Login
            </h1>

            <p className="text-slate-400 mt-2">
              Sign in to NeoBank Pro Admin Panel
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Admin Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@neobankpro.com"
                  className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                />
              </div>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-blue-600/20"
            >
              Login to Admin Panel
            </button>

          </form>

          {/* Security Note */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <FaLock />
            Secure Admin Access
          </div>

        </div>
      </div>
    </div>
  );
}