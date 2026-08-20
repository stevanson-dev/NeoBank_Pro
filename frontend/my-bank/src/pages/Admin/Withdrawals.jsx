import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function Withdrawals() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const withdrawals = [
    {
      id: "WTH10001",
      user: "Stevanson",
      email: "stevanson@example.com",
      amount: "₹2,000",
      method: "Bank Transfer",
      date: "10 Aug 2026, 11:20 AM",
      status: "Completed",
    },
    {
      id: "WTH10002",
      user: "Karthi",
      email: "karthi@example.com",
      amount: "₹5,000",
      method: "UPI",
      date: "10 Aug 2026, 10:05 AM",
      status: "Completed",
    },
    {
      id: "WTH10003",
      user: "Arun",
      email: "arun@example.com",
      amount: "₹1,500",
      method: "Bank Transfer",
      date: "10 Aug 2026, 09:15 AM",
      status: "Pending",
    },
    {
      id: "WTH10004",
      user: "Rahul",
      email: "rahul@example.com",
      amount: "₹7,000",
      method: "UPI",
      date: "09 Aug 2026, 06:30 PM",
      status: "Completed",
    },
    {
      id: "WTH10005",
      user: "Vijay",
      email: "vijay@example.com",
      amount: "₹3,500",
      method: "Debit Card",
      date: "09 Aug 2026, 04:45 PM",
      status: "Failed",
    },
    {
      id: "WTH10006",
      user: "Suresh",
      email: "suresh@example.com",
      amount: "₹4,000",
      method: "Bank Transfer",
      date: "09 Aug 2026, 02:25 PM",
      status: "Completed",
    },
  ];

  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      withdrawal.id.toLowerCase().includes(searchText) ||
      withdrawal.user.toLowerCase().includes(searchText) ||
      withdrawal.email.toLowerCase().includes(searchText) ||
      withdrawal.method.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || withdrawal.status === filter;

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
          Withdrawals
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage all user withdrawal requests.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Withdrawals
              </p>

              <h2 className="text-2xl font-bold mt-2">
                ₹8.2L
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
              <FaArrowUp className="text-blue-400 text-xl" />
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
                ₹7.6L
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
                ₹42,000
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
                ₹18,000
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaTimesCircle className="text-red-400 text-xl" />
            </div>

          </div>
        </div>

      </div>

      {/* Withdrawals Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold">
                Withdrawal History
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and monitor user withdrawal activity
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}
              <div className="relative w-full sm:w-72">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search withdrawals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              </div>

              {/* Filter */}
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
                  Withdrawal
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

              {filteredWithdrawals.map((withdrawal) => {

                const statusStyle = getStatusStyle(
                  withdrawal.status
                );

                return (
                  <tr
                    key={withdrawal.id}
                    className="border-b border-slate-800/60 hover:bg-slate-800/30 transition"
                  >

                    {/* Withdrawal ID */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                          <FaArrowUp className="text-red-400" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {withdrawal.id}
                          </p>

                          <p className="text-xs text-slate-500">
                            Money Withdrawal
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* User */}
                    <td className="px-6 py-5">

                      <div>
                        <p className="font-medium">
                          {withdrawal.user}
                        </p>

                        <p className="text-sm text-slate-500">
                          {withdrawal.email}
                        </p>
                      </div>

                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5 font-semibold text-red-400">
                      {withdrawal.amount}
                    </td>

                    {/* Method */}
                    <td className="px-6 py-5 text-slate-300">
                      {withdrawal.method}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {withdrawal.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.icon}

                        {withdrawal.status}
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
        {filteredWithdrawals.length === 0 && (
          <div className="p-10 text-center">

            <FaArrowUp className="mx-auto text-3xl text-slate-700 mb-3" />

            <p className="text-slate-400">
              No withdrawals found.
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