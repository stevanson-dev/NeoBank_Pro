import { useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdSwapHoriz,
  MdHistory,
  MdCreditCard,
  MdAnalytics,
  MdNotifications,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

function Sidebar({ onLogout }) {
  
  const navigate = useNavigate();

const location = useLocation();
  return (
    <div className="w-64 min-h-screen bg-[#101827] border-r border-slate-700 p-6">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-10">
        NeoBank <span className="text-blue-600">Pro</span>
      </h1>

      {/* Menu */}
      <nav className="space-y-2">

        <button onClick={() => navigate("/dashboard")}
       className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/dashboard"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}>
          <MdDashboard size={22} />
          Dashboard
        </button>

        <button onClick={() => navigate("/Accounts")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Accounts"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}>
          <MdAccountBalanceWallet size={22} />
          Accounts
        </button>

        <button onClick={() => navigate("/transfer")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/transfer"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}>
          <MdSwapHoriz size={22} />
          Transfer
        </button>

        <button onClick={() => navigate("/Transactions-History")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Transactions-History"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdHistory size={22} />
          Transactions
        </button>

        <button onClick={() => navigate("/Cards")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Cards"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdCreditCard size={22} />
          Cards
        </button>
          
           <button onClick={() => navigate("/analytics")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/analytics"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdAnalytics size={22} />
          Analytics
        </button>
          
           <button onClick={() => navigate("/Notifications")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Notifications"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdNotifications size={22} />
           Notifications
        </button>
        

        <button onClick={() => navigate("/Profile")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Profile"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdPerson size={22} />
          Profile
        </button>

        <button onClick={() => navigate("/Settings")}
  className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl transition ${
    location.pathname === "/Settings"
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-white/10"
  }`}
>
          <MdSettings size={22} />
          Settings
        </button>

      </nav>

      {/* Logout */}
      <div className="mt-12">
        <button    type="button"
    onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-900/20">
          <MdLogout size={22} />
          Logout
        </button>
      </div>

    

    </div>
  );
}

export default Sidebar;