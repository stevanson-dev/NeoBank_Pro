import { useState } from "react";
import {
  FaChartLine,
  FaArrowDown,
  FaArrowUp,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function Reports() {
  const [period, setPeriod] = useState("7 Days");

  const transactionData = [
    {
      name: "Mon",
      transactions: 320,
      deposits: 180,
      withdrawals: 120,
    },
    {
      name: "Tue",
      transactions: 450,
      deposits: 250,
      withdrawals: 160,
    },
    {
      name: "Wed",
      transactions: 380,
      deposits: 210,
      withdrawals: 140,
    },
    {
      name: "Thu",
      transactions: 520,
      deposits: 310,
      withdrawals: 190,
    },
    {
      name: "Fri",
      transactions: 610,
      deposits: 350,
      withdrawals: 230,
    },
    {
      name: "Sat",
      transactions: 480,
      deposits: 270,
      withdrawals: 180,
    },
    {
      name: "Sun",
      transactions: 550,
      deposits: 320,
      withdrawals: 210,
    },
  ];

  const monthlyData = [
    {
      name: "Jan",
      deposits: 420000,
      withdrawals: 280000,
    },
    {
      name: "Feb",
      deposits: 510000,
      withdrawals: 320000,
    },
    {
      name: "Mar",
      deposits: 620000,
      withdrawals: 390000,
    },
    {
      name: "Apr",
      deposits: 580000,
      withdrawals: 410000,
    },
    {
      name: "May",
      deposits: 710000,
      withdrawals: 460000,
    },
    {
      name: "Jun",
      deposits: 820000,
      withdrawals: 520000,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              Reports
            </h1>

            <p className="text-slate-400 mt-2">
              Analyze banking activity and system performance.
            </p>

          </div>

          {/* Period Filter */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
          >
            <option value="7 Days">Last 7 Days</option>
            <option value="30 Days">Last 30 Days</option>
            <option value="90 Days">Last 90 Days</option>
            <option value="1 Year">Last 1 Year</option>
          </select>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Transactions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Total Transactions
              </p>

              <h2 className="text-2xl font-bold mt-2">
                45,230
              </h2>

              <p className="text-green-400 text-xs mt-2">
                +12.5% from last period
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
              <FaExchangeAlt className="text-blue-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Deposits */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Total Deposits
              </p>

              <h2 className="text-2xl font-bold mt-2">
                ₹12.5L
              </h2>

              <p className="text-green-400 text-xs mt-2">
                +8.4% from last period
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FaArrowDown className="text-green-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Withdrawals */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Total Withdrawals
              </p>

              <h2 className="text-2xl font-bold mt-2">
                ₹8.2L
              </h2>

              <p className="text-yellow-400 text-xs mt-2">
                +4.2% from last period
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaArrowUp className="text-red-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Users */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Active Users
              </p>

              <h2 className="text-2xl font-bold mt-2">
                12,450
              </h2>

              <p className="text-green-400 text-xs mt-2">
                +6.8% from last period
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <FaUsers className="text-purple-400 text-xl" />
            </div>

          </div>

        </div>

      </div>

      {/* Transaction Activity Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

          <div>

            <h2 className="text-xl font-semibold">
              Transaction Activity
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Daily transaction activity
            </p>

          </div>

          <div className="flex items-center gap-4 text-xs">

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-400">
                Transactions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-slate-400">
                Deposits
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-slate-400">
                Withdrawals
              </span>
            </div>

          </div>

        </div>

        <div className="w-full `h-87.5`">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={transactionData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1e293b"
              />

              <XAxis
                dataKey="name"
                stroke="#64748b"
              />

              <YAxis
                stroke="#64748b"
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="transactions"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.12}
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="deposits"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.08}
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="withdrawals"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.08}
                strokeWidth={2}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Deposit vs Withdrawal */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Deposit vs Withdrawal
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Monthly money movement
            </p>

          </div>

          <div className="w-full `h-80`">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                />

                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                />

                <YAxis
                  stroke="#64748b"
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="deposits"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="withdrawals"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Report Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Report Summary
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current banking system overview
            </p>

          </div>

          <div className="space-y-5">

            {/* Transaction Success */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-slate-400 text-sm">
                  Transaction Success Rate
                </span>

                <span className="text-green-400 font-semibold">
                  96.8%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "96.8%" }}
                />

              </div>

            </div>

            {/* Deposit Growth */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-slate-400 text-sm">
                  Deposit Growth
                </span>

                <span className="text-blue-400 font-semibold">
                  82%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "82%" }}
                />

              </div>

            </div>

            {/* User Activity */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-slate-400 text-sm">
                  User Activity
                </span>

                <span className="text-purple-400 font-semibold">
                  74%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "74%" }}
                />

              </div>

            </div>

            {/* Withdrawal Completion */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <span className="text-slate-400 text-sm">
                  Withdrawal Completion
                </span>

                <span className="text-yellow-400 font-semibold">
                  91%
                </span>

              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: "91%" }}
                />

              </div>

            </div>

          </div>

          {/* Insight */}
          <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">

            <div className="flex items-start gap-3">

              <FaChartLine className="text-blue-400 mt-1" />

              <div>

                <h3 className="font-medium text-blue-400">
                  System Insight
                </h3>

                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Transaction activity is showing steady growth.
                  Deposits are currently higher than withdrawals,
                  indicating positive account activity.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}