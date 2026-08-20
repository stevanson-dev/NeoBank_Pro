import logo from "../../assets/logo.png";
import {
  FaHome,
  FaUsers,
  FaExchangeAlt,
  FaArrowDown,
  FaArrowUp,
  FaCreditCard,
  FaChartBar,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: FaHome,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: FaUsers,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: FaExchangeAlt,
    },
    {
      name: "Deposits",
      path: "/admin/deposits",
      icon: FaArrowDown,
    },
    {
      name: "Withdrawals",
      path: "/admin/withdrawals",
      icon: FaArrowUp,
    },
    {
      name: "Cards",
      path: "/admin/cards",
      icon: FaCreditCard,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: FaChartBar,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: FaBell,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: FaCog,
    },
  ];

  const handleLogout = () => {
  localStorage.removeItem("adminAuthenticated");
  navigate("/admin/login");
};
  return (
    <aside className="w-65 min-h-screen text-2xl bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
             

        <img
          src={logo}
          alt="NeoBank Pro Logo"
          className="w-12 h-12 object-contain"
        />

          

          <div>
            <h1 className="text-white font-bold ">
              NeoBank <span className="text-blue-600">Pro</span>
            </h1>
           

            <p className="text-xs text-blue-400 font-bold">
              Admin Panel
            </p>
          </div>

        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-5 overflow-y-auto">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon className="text-lg" />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}