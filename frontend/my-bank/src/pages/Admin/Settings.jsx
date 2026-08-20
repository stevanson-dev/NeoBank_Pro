import { useState } from "react";
import {
  FaUserShield,
  FaLock,
  FaBell,
  FaServer,
  FaSave,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

export default function Settings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  const [adminName, setAdminName] = useState("NeoBank Administrator");
  const [adminEmail, setAdminEmail] = useState(
    "admin@neobankpro.com"
  );

  const handleSave = () => {
    alert("Settings saved successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Settings
        </h1>

        <p className="text-slate-400 mt-2">
          Manage admin account and system preferences.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

       

        {/* Main Settings */}
        <div className="xl:col-span-2 space-y-6">

          {/* Admin Profile */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-blue-600/10 flex items-center justify-center">
                <FaUserShield className="text-blue-400 text-xl" />
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Admin Profile
                </h2>

                <p className="text-sm text-slate-500">
                  Update administrator information.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Name */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Admin Name
                </label>

                <input
                  type="text"
                  value={adminName}
                  onChange={(e) =>
                    setAdminName(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Admin Email
                </label>

                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) =>
                    setAdminEmail(e.target.value)
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

            </div>

          </div>

          {/* Security */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                <FaLock className="text-red-400 text-xl" />
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Security
                </h2>

                <p className="text-sm text-slate-500">
                  Manage administrator security preferences.
                </p>

              </div>

            </div>

            {/* Two Factor */}
            <div className="flex items-center justify-between py-4 border-b border-slate-800">

              <div>

                <h3 className="font-medium">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Require additional verification for admin login.
                </p>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                Enabled
              </span>

            </div>

            {/* Session */}
            <div className="flex items-center justify-between py-4">

              <div>

                <h3 className="font-medium">
                  Session Protection
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Automatically protect inactive admin sessions.
                </p>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                Active
              </span>

            </div>

          </div>

          {/* Notifications */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <FaBell className="text-yellow-400 text-xl" />
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  Notifications
                </h2>

                <p className="text-sm text-slate-500">
                  Choose which alerts the admin receives.
                </p>

              </div>

            </div>

            {/* Email Alerts */}
            <div className="flex items-center justify-between py-4 border-b border-slate-800">

              <div>

                <h3 className="font-medium">
                  Email Alerts
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Receive important system alerts by email.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEmailAlerts(!emailAlerts)
                }
                className="text-2xl"
              >
                {emailAlerts ? (
                  <FaToggleOn className="text-blue-500" />
                ) : (
                  <FaToggleOff className="text-slate-600" />
                )}
              </button>

            </div>

            {/* Security Alerts */}
            <div className="flex items-center justify-between py-4 border-b border-slate-800">

              <div>

                <h3 className="font-medium">
                  Security Alerts
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Get notified about suspicious activities.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSecurityAlerts(!securityAlerts)
                }
                className="text-2xl"
              >
                {securityAlerts ? (
                  <FaToggleOn className="text-blue-500" />
                ) : (
                  <FaToggleOff className="text-slate-600" />
                )}
              </button>

            </div>

            {/* Transaction Alerts */}
            <div className="flex items-center justify-between py-4">

              <div>

                <h3 className="font-medium">
                  Transaction Alerts
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Receive alerts for important transactions.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setTransactionAlerts(!transactionAlerts)
                }
                className="text-2xl"
              >
                {transactionAlerts ? (
                  <FaToggleOn className="text-blue-500" />
                ) : (
                  <FaToggleOff className="text-slate-600" />
                )}
              </button>

            </div>

          </div>

          {/* System */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FaServer className="text-purple-400 text-xl" />
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  System
                </h2>

                <p className="text-sm text-slate-500">
                  Manage system availability.
                </p>

              </div>

            </div>

            {/* Maintenance */}
            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-medium">
                  Maintenance Mode
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Temporarily restrict user access during maintenance.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setMaintenanceMode(!maintenanceMode)
                }
                className="text-2xl"
              >
                {maintenanceMode ? (
                  <FaToggleOn className="text-yellow-500" />
                ) : (
                  <FaToggleOff className="text-slate-600" />
                )}
              </button>

            </div>

          </div>

          {/* Save Button */}
          <div className="flex justify-end">

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition shadow-lg shadow-blue-600/20"
            >
              <FaSave />
              Save Settings
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}