import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaArrowDown,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function Deposits() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const deposits = [
    {
      id: "DEP10001",
      user: "Stevanson",
      email: "stevanson@example.com",
      amount: "₹10,000",
      method: "Bank Transfer",
      date: "10 Aug 2026, 10:15 AM",
      status: "Completed",
    },
    {
      id: "DEP10002",
      user: "Karthi",
      email: "karthi@example.com",
      amount: "₹5,000",
      method: "UPI",
      date: "10 Aug 2026, 09:30 AM",
      status: "Completed",
    },
    {
      id: "DEP10003",
      user: "Arun",
      email: "arun@example.com",
      amount: "₹2,500",
      method: "Bank Transfer",
      date: "10 Aug 2026, 08:45 AM",
      status: "Pending",
    },
    {
      id: "DEP10004",
      user: "Rahul",
      email: "rahul@example.com",
      amount: "₹15,000",
      method: "UPI",
      date: "09 Aug 2026, 06:20 PM",
      status: "Completed",
    },
    {
      id: "DEP10005",
      user: "Vijay",
      email: "vijay@example.com",
      amount: "₹3,000",
      method: "Debit Card",
      date: "09 Aug 2026, 04:10 PM",
      status: "Failed",
    },
    {
      id: "DEP10006",
      user: "Suresh",
      email: "suresh@example.com",
      amount: "₹8,000",
      method: "Bank Transfer",
      date: "09 Aug 2026, 02:35 PM",
      status: "Completed",
    },
  ];

  const filteredDeposits = deposits.filter((deposit) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      deposit.id.toLowerCase().includes(searchText) ||
      deposit.user.toLowerCase().includes(searchText) ||
      deposit.email.toLowerCase().includes(searchText) ||
      deposit.method.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || deposit.status === filter;

    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return {
        className: "bg-green-500/10 text-green-400",
        icon: <FaCheckCircle />,
      };
    }

    if (status === "Pending") {
      return {
        className: "bg-yellow-500/10 text-yellow-400",
        icon: <FaClock />,
      };
    }

    return {
      className: "bg-red-500/10 text-red-400",
      icon: <FaTimesCircle />,
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Deposits
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage all user deposits.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total Deposits */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Deposits
              </p>

              <h2 className="text-2xl font-bold mt-2">
                ₹12.5L
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
              <FaArrowDown className="text-blue-400 text-xl" />
            </div>

          </div>
        </div>

        {/* Completed */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Completed
              </p>

              <h2 className="text-2xl font-bold mt-2 text-green-400">
                ₹11.8L
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>

          </div>
        </div>

        {/* Pending */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Pending
              </p>

              <h2 className="text-2xl font-bold mt-2 text-yellow-400">
                ₹45,000
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <FaClock className="text-yellow-400 text-xl" />
            </div>

          </div>
        </div>

        {/* Failed */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Failed
              </p>

              <h2 className="text-2xl font-bold mt-2 text-red-400">
                ₹25,000
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaTimesCircle className="text-red-400 text-xl" />
            </div>

          </div>
        </div>

      </div>

      {/* Deposits Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold">
                Deposit History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and monitor user deposit activity
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}
              <div className="relative w-full sm:w-72">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search deposits..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

              {/* Status Filter */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>

            </div>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full `min-w-275`">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">

                <th className="text-left px-6 py-4">
                  Deposit
                </th>

                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Method
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-right px-6 py-4">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredDeposits.map((deposit) => {

                const statusStyle = getStatusStyle(
                  deposit.status
                );

                return (
                  <tr
                    key={deposit.id}
                    className="border-b border-slate-800/60 hover:bg-slate-800/30 transition"
                  >

                    {/* Deposit ID */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <FaArrowDown className="text-green-400" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {deposit.id}
                          </p>

                          <p className="text-xs text-slate-500">
                            Money Deposit
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* User */}
                    <td className="px-6 py-5">

                      <div>
                        <p className="font-medium">
                          {deposit.user}
                        </p>

                        <p className="text-sm text-slate-500">
                          {deposit.email}
                        </p>
                      </div>

                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5 font-semibold text-green-400">
                      {deposit.amount}
                    </td>

                    {/* Method */}
                    <td className="px-6 py-5 text-slate-300">
                      {deposit.method}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {deposit.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.icon}

                        {deposit.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">

                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition"
                      >
                        <FaEye />
                        View
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* Empty State */}
        {filteredDeposits.length === 0 && (
          <div className="p-10 text-center">

            <FaArrowDown className="mx-auto text-3xl text-slate-700 mb-3" />

            <p className="text-slate-400">
              No deposits found.
            </p>

            <p className="text-sm text-slate-600 mt-1">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}