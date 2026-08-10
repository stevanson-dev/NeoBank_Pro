
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaDesktop,
  FaMobileAlt,
  FaCheckCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

const initialDevices = [
  {
    id: 1,
    device: "Windows PC",
    location: "Tamil Nadu, India",
    browser: "Chrome",
    lastActive: "Active now",
    current: true,
    icon: <FaDesktop />,
  },
  {
    id: 2,
    device: "Android Phone",
    location: "Tamil Nadu, India",
    browser: "Chrome Mobile",
    lastActive: "2 hours ago",
    current: false,
    icon: <FaMobileAlt />,
  },
];

export default function LoginActivity() {
  const navigate = useNavigate();

  const [devices, setDevices] = useState(initialDevices);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Open logout confirmation
  const handleLogoutClick = (device) => {
    setSelectedDevice(device);
    setShowLogoutModal(true);
  };

  // Cancel logout
  const handleCancelLogout = () => {
    setShowLogoutModal(false);
    setSelectedDevice(null);
  };

  // Confirm logout
  const handleConfirmLogout = () => {
    if (!selectedDevice) return;

    setDevices((currentDevices) =>
      currentDevices.filter(
        (device) => device.id !== selectedDevice.id
      )
    );

    setShowLogoutModal(false);
    setSelectedDevice(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Login Activity
            </h1>

            <p className="text-gray-400 mt-1">
              Manage devices connected to your account
            </p>
          </div>

        </div>

      </div>


      {/* Devices */}
      <div className="max-w-5xl mx-auto px-6 mt-8 pb-12">

        <GlassCard className="p-8">

          <h2 className="text-2xl font-bold">
            Your Devices
          </h2>

          <p className="text-gray-400 mt-1">
            Review recent devices that accessed your account.
          </p>


          <div className="mt-6 space-y-4">

            {devices.length > 0 ? (

              devices.map((device) => (

                <div
                  key={device.id}
                  className="flex items-center gap-4 bg-white/10 border border-white/10 rounded-2xl p-5"
                >

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400 text-xl shrink-0">
                    {device.icon}
                  </div>


                  {/* Information */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-3 flex-wrap">

                      <h3 className="font-semibold text-lg">
                        {device.device}
                      </h3>

                      {device.current && (
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <FaCheckCircle />
                          Current device
                        </span>
                      )}

                    </div>


                    <p className="text-gray-400 text-sm mt-1">
                      {device.browser} • {device.location}
                    </p>


                    <p
                      className={`text-sm mt-1 ${
                        device.current
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    >
                      {device.lastActive}
                    </p>

                  </div>


                  {/* Logout */}
                  {!device.current && (

                    <button
                      onClick={() => handleLogoutClick(device)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-400/10 text-red-400 hover:bg-red-500/30 transition shrink-0"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>

                  )}

                </div>

              ))

            ) : (

              <div className="text-center py-10">

                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  <FaCheckCircle size={28} />
                </div>

                <h3 className="text-lg font-semibold mt-4">
                  No other devices
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Your account is only active on this device.
                </p>

              </div>

            )}

          </div>

        </GlassCard>


        {/* Security Info */}
        <GlassCard className="p-6 mt-6">

          <h2 className="text-xl font-semibold">
            Security Tip
          </h2>

          <p className="text-gray-400 mt-2">
            If you don't recognize a device, log it out and change your password immediately.
          </p>

        </GlassCard>

      </div>


      {/* Logout Confirmation Modal */}
      {showLogoutModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleCancelLogout}
          />


          {/* Modal */}
          <div className="relative w-full max-w-md bg-[#102E5B]/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

            {/* Icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <FaSignOutAlt size={28} />
            </div>


            {/* Heading */}
            <div className="text-center mt-5">

              <h2 className="text-2xl font-bold">
                Logout Device?
              </h2>

              <p className="text-gray-400 mt-3 leading-6">
                Are you sure you want to log out this device?
              </p>

            </div>


            {/* Selected Device */}
            {selectedDevice && (

              <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">
                  {selectedDevice.icon}
                </div>

                <div>

                  <p className="font-semibold">
                    {selectedDevice.device}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    {selectedDevice.browser}
                  </p>

                </div>

              </div>

            )}


            {/* Buttons */}
            <div className="flex gap-3 mt-7">

              <button
                onClick={handleCancelLogout}
                className="flex-1 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition font-medium"
              >
                No
              </button>


              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 transition font-semibold"
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

