import Sidebar  from "../components/Sidebar Dashboard";
import Navbar from "../components/Navbar Dashboard";
import BalanceCard from "../components/BalanceCard Dashboard";



import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
  MdSavings,
} from "react-icons/md";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#070B1A]">

      <Sidebar />

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

      </div>

    </div>
  );
}

export default Dashboard;