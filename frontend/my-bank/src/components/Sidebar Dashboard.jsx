import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdSwapHoriz,
  MdHistory,
  MdCreditCard,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-[#101827] border-r border-slate-700 p-6">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-10">
        NeoBank Pro
      </h1>

      {/* Menu */}
      <nav className="space-y-2">

        <button className="flex w-full items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-white">
          <MdDashboard size={22} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdAccountBalanceWallet size={22} />
          Accounts
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdSwapHoriz size={22} />
          Transfer
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdHistory size={22} />
          Transactions
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdCreditCard size={22} />
          Cards
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdPerson size={22} />
          Profile
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-800">
          <MdSettings size={22} />
          Settings
        </button>

      </nav>

      {/* Logout */}
      <div className="mt-12">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-900/20">
          <MdLogout size={22} />
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;