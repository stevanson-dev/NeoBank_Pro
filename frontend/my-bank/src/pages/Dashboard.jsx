import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "../components/LogoutModal";
import Sidebar  from "../components/Dashboard page/Sidebar Dashboard";
import Navbar from "../components/Dashboard page/Navbar Dashboard";
import BalanceCard from "../components/Dashboard page/BalanceCard Dashboard";
import QuickActions from "../components/Dashboard page/QuickActions Dashboard";
import SpendingOverview from "../components/Dashboard page/SpendingOverview Dashboard";
import RecentTransactions from "../components/Dashboard page/RecentTransactions Dashboard";


import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
  MdSavings,
} from "react-icons/md";

function Dashboard() {

  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);

  
  return (
    <div className="flex min-h-screen bg-[#040f39]">

      <Sidebar
  onLogout={() => setShowLogout(true)}
/>

      <div className="flex-1 p-8">

        <Navbar />
        {/* Balance Cards */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 xl:grid-cols-4">

          <BalanceCard
            title="Total Balance"
            amount="1,25,450"
            icon={<MdAccountBalanceWallet />}
            color="bg-gradient-to-r from-blue-600 to-cyan-500"
          />

          <BalanceCard
            title="Monthly Income"
            amount="52,000"
            icon={<MdTrendingUp />}
            color="bg-gradient-to-r from-green-600 to-emerald-500"
          />

          <BalanceCard
            title="Monthly Expense"
            amount="18,500"
            icon={<MdTrendingDown />}
            color="bg-gradient-to-r from-red-600 to-orange-500"
          />

          <BalanceCard
            title="Total Savings"
            amount="3,40,000"
            icon={<MdSavings />}
            color="bg-gradient-to-r from-purple-600 to-pink-500"
          />
           
        </div>


        <div className="grid grid-cols-12 gap-6">

  {/* Left Side */}
  <div className="col-span-8 space-y-6">
    <QuickActions />
    <RecentTransactions />
  </div>

  {/* Right Side */}
  <div className="col-span-4">
    <SpendingOverview />
  </div>

</div>
      </div>

{showLogout && (
  <LogoutModal
    close={() => setShowLogout(false)}
    logout={() => navigate("/login")}
  />
)}

    </div>
  );
}

export default Dashboard;