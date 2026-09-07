
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoutModal from "../components/LogoutModal";
import Sidebar from "../components/Dashboard page/Sidebar Dashboard";
import Navbar from "../components/Dashboard page/Navbar Dashboard";
import BalanceCard from "../components/Dashboard page/BalanceCard Dashboard";
import QuickActions from "../components/Dashboard page/QuickActions Dashboard";
import SpendingOverview from "../components/Dashboard page/SpendingOverview Dashboard";
import RecentTransactions from "../components/Dashboard page/RecentTransactions Dashboard";

import api from "../services/api";

import {
  MdAccountBalanceWallet,
  MdTrendingUp,
  MdTrendingDown,
  MdSavings,
} from "react-icons/md";

function Dashboard() {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);

  const [user, setUser] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          userResponse,
          accountResponse,
          transactionsResponse,
        ] = await Promise.all([
          api.get("/auth/me"),
          api.get("/accounts/primary"),
          api.get("/transactions"),
        ]);

        setUser(userResponse.data);

        setBankAccount(accountResponse.data);

        setTransactions(
          Array.isArray(transactionsResponse.data)
            ? transactionsResponse.data
            : []
        );

      } catch (error) {
        console.error(
          "Failed to load dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --------------------------------
  // Current month transactions
  // --------------------------------

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(
    (transaction) => {
      if (!transaction.createdAt) return false;

      const date = new Date(transaction.createdAt);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }
  );

  // --------------------------------
  // Monthly Income
  // --------------------------------

  const monthlyIncome = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type === "DEPOSIT" ||
        transaction.type === "TRANSFER_IN"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // --------------------------------
  // Monthly Expense
  // --------------------------------

  const monthlyExpense = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type === "WITHDRAW" ||
        transaction.type === "TRANSFER" ||
        transaction.type === "BILL_PAYMENT" ||
        transaction.type === "QR_PAYMENT" ||
        transaction.type === "CARD_PAYMENT"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // --------------------------------
  // BANK ACCOUNT BALANCE
  // --------------------------------

  const balance = Number(
    bankAccount?.balance || 0
  );

  // --------------------------------
  // Total Savings
  // --------------------------------

  const totalSavings = balance;

  // --------------------------------
  // Currency formatter
  // --------------------------------

  const formatCurrency = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#040f39]">

      {/* Sidebar */}

      <Sidebar
        onLogout={() => setShowLogout(true)}
      />

      <div className="flex-1 p-8">

        {/* Navbar */}

        <Navbar user={user} />

        {/* Balance Cards */}

        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 xl:grid-cols-4">

          <BalanceCard
            title="Total Balance"
            amount={
              loading
                ? "0.00"
                : formatCurrency(balance)
            }
            icon={<MdAccountBalanceWallet />}
            color="bg-gradient-to-r from-blue-600 to-cyan-500"
          />

          <BalanceCard
            title="Monthly Income"
            amount={
              loading
                ? "0.00"
                : formatCurrency(monthlyIncome)
            }
            icon={<MdTrendingUp />}
            color="bg-gradient-to-r from-green-600 to-emerald-500"
          />

          <BalanceCard
            title="Monthly Expense"
            amount={
              loading
                ? "0.00"
                : formatCurrency(monthlyExpense)
            }
            icon={<MdTrendingDown />}
            color="bg-gradient-to-r from-red-600 to-orange-500"
          />

          <BalanceCard
            title="Total Savings"
            amount={
              loading
                ? "0.00"
                : formatCurrency(totalSavings)
            }
            icon={<MdSavings />}
            color="bg-gradient-to-r from-purple-600 to-pink-500"
          />

        </div>

        {/* Main Dashboard */}

        <div className="grid grid-cols-12 gap-6">

          {/* Left Side */}

          <div className="col-span-8 space-y-6">

            <QuickActions />

            <RecentTransactions
              transactions={transactions}
            />

          </div>

          {/* Right Side */}

          <div className="col-span-4">

            <SpendingOverview
              transactions={transactions}
            />

          </div>

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

export default Dashboard;
