import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const transactions = [
    {
      id: "TXN10001",
      user: "Stevanson",
      email: "stevanson@example.com",
      type: "Transfer",
      amount: "₹2,000",
      date: "10 Aug 2026, 10:30 AM",
      status: "Completed",
    },
    {
      id: "TXN10002",
      user: "Karthi",
      email: "karthi@example.com",
      type: "Deposit",
      amount: "₹5,000",
      date: "10 Aug 2026, 09:45 AM",
      status: "Completed",
    },
    {
      id: "TXN10003",
      user: "Arun",
      email: "arun@example.com",
      type: "Withdrawal",
      amount: "₹1,000",
      date: "10 Aug 2026, 08:20 AM",
      status: "Pending",
    },
    {
      id: "TXN10004",
      user: "Rahul",
      email: "rahul@example.com",
      type: "Transfer",
      amount: "₹7,500",
      date: "09 Aug 2026, 06:15 PM",
      status: "Completed",
    },
    {
      id: "TXN10005",
      user: "Vijay",
      email: "vijay@example.com",
      type: "Withdrawal",
      amount: "₹3,000",
      date: "09 Aug 2026, 04:40 PM",
      status: "Failed",
    },
    {
      id: "TXN10006",
      user: "Suresh",
      email: "suresh@example.com",
      type: "Deposit",
      amount: "₹10,000",
      date: "09 Aug 2026, 02:10 PM",
      status: "Completed",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      transaction.id.toLowerCase().includes(searchText) ||
      transaction.user.toLowerCase().includes(searchText) ||
      transaction.email.toLowerCase().includes(searchText) ||
      transaction.type.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || transaction.status === filter;

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

  const getTypeStyle = (type) => {
    if (type === "Deposit") {
      return "text-green-400";
    }

    if (type === "Withdrawal") {
      return "text-red-400";
    }

    return "text-blue-400";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Transactions
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage all banking transactions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Transactions
              </p>

              <h2 className="text-2xl font-bold mt-2">
                45,230
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
              <FaExchangeAlt className="text-blue-400 text-xl" />
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
                43,850
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
                920
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
                460
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaTimesCircle className="text-red-400 text-xl" />
            </div>

          </div>
        </div>

      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold">
                All Transactions
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View recent transaction activity
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}
              <div className="relative w-full sm:w-72">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search transactions..."
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
                  Transaction
                </th>

                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Type
                </th>

                <th className="text-left px-6 py-4">
                  Amount
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

              {filteredTransactions.map((transaction) => {

                const statusStyle = getStatusStyle(
                  transaction.status
                );

                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-800/60 hover:bg-slate-800/30 transition"
                  >

                    {/* Transaction ID */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                          <FaExchangeAlt className="text-blue-400" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {transaction.id}
                          </p>

                          <p className="text-xs text-slate-500">
                            Banking Transaction
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* User */}
                    <td className="px-6 py-5">

                      <div>
                        <p className="font-medium">
                          {transaction.user}
                        </p>

                        <p className="text-sm text-slate-500">
                          {transaction.email}
                        </p>
                      </div>

                    </td>

                    {/* Type */}
                    <td className="px-6 py-5">

                      <span
                        className={`font-medium ${getTypeStyle(
                          transaction.type
                        )}`}
                      >
                        {transaction.type}
                      </span>

                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5 font-semibold">
                      {transaction.amount}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {transaction.date}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.icon}

                        {transaction.status}
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
        {filteredTransactions.length === 0 && (
          <div className="p-10 text-center">

            <FaExchangeAlt className="mx-auto text-3xl text-slate-700 mb-3" />

            <p className="text-slate-400">
              No transactions found.
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