import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal";

import {
  FaArrowLeft,
  FaBell,
  FaLock,
  FaShieldAlt,
  FaGlobe,
  FaDesktop,
  FaSun,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function Settings() {
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Settings
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your account preferences
            </p>
          </div>

        </div>

      </div>


      {/* Main */}
      <div className="max-w-5xl mx-auto px-6 mt-8 pb-12">

        <div className="space-y-6">


          {/* Notifications */}
          <GlassCard className="p-6">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
                  <FaBell />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Notifications
                  </h2>

                  <p className="text-gray-400">
                    Receive transaction alerts
                  </p>
                </div>

              </div>


              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-14 h-7 rounded-full transition ${
                  notifications
                    ? "bg-blue-600"
                    : "bg-gray-500"
                }`}
              >

                <div
                  className={`w-6 h-6 bg-white rounded-full transition ${
                    notifications
                      ? "translate-x-7"
                      : "translate-x-1"
                  }`}
                />

              </button>

            </div>

          </GlassCard>


          {/* Two Factor Authentication */}
          <GlassCard className="p-6">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-green-400">
                  <FaShieldAlt />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Two Factor Authentication
                  </h2>

                  <p className="text-gray-400">
                    Add extra security to your account
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/two-factor")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
              >
                Manage
              </button>

            </div>

          </GlassCard>


          {/* Change Password */}
          <GlassCard className="p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                  <FaLock />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Change Password
                  </h2>

                  <p className="text-gray-400">
                    Update your account password
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/change-password")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
              >
                Change
              </button>

            </div>

          </GlassCard>


          {/* PIN Security */}
          <GlassCard className="p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
                  <FaKey />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    PIN Security
                  </h2>

                  <p className="text-gray-400">
                    Set or change your transaction PIN
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/pin-security")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
              >
                Manage
              </button>

            </div>

          </GlassCard>


          {/* Language */}
          <GlassCard className="p-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <FaGlobe />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Language
                </h2>

                <p className="text-gray-400">
                  English
                </p>
              </div>

            </div>

          </GlassCard>


          {/* Theme */}
          <GlassCard className="p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                  <FaSun />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Theme
                  </h2>

                  <p className="text-gray-400">
                    Choose your preferred appearance
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/theme")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
              >
                Manage
              </button>

            </div>

          </GlassCard>


          {/* Login Activity & Devices */}
          <GlassCard className="p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
                  <FaDesktop />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Login Activity & Devices
                  </h2>

                  <p className="text-gray-400">
                    Manage devices currently signed in
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/login-activity")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2 rounded-xl transition"
              >
                Manage
              </button>

            </div>

          </GlassCard>


          {/* Logout */}
          <button
            onClick={() => setShowLogout(true)}
            className="w-full flex items-center justify-center gap-3 bg-red-500/20 border border-red-400/10 text-red-400 py-4 rounded-xl hover:bg-red-500/30 transition"
          >

            <FaSignOutAlt />

            Logout

          </button>


        </div>

      </div>


      {/* Logout Modal */}
      {showLogout && (
        <LogoutModal
          close={() => setShowLogout(false)}
          logout={() => navigate("/login")}
        />
      )}

    </div>
  );
}