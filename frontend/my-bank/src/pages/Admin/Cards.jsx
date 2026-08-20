import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCreditCard,
  FaCheckCircle,
  FaBan,
  FaClock,
} from "react-icons/fa";

export default function Cards() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const cards = [
    {
      id: "CARD10001",
      user: "Stevanson",
      email: "stevanson@example.com",
      type: "Virtual Debit",
      last4: "4521",
      expiry: "08/29",
      issued: "10 Aug 2026",
      status: "Active",
    },
    {
      id: "CARD10002",
      user: "Karthi",
      email: "karthi@example.com",
      type: "Physical Debit",
      last4: "7812",
      expiry: "05/30",
      issued: "08 Aug 2026",
      status: "Active",
    },
    {
      id: "CARD10003",
      user: "Arun",
      email: "arun@example.com",
      type: "Virtual Debit",
      last4: "2398",
      expiry: "11/29",
      issued: "07 Aug 2026",
      status: "Blocked",
    },
    {
      id: "CARD10004",
      user: "Rahul",
      email: "rahul@example.com",
      type: "Physical Debit",
      last4: "6543",
      expiry: "02/30",
      issued: "05 Aug 2026",
      status: "Active",
    },
    {
      id: "CARD10005",
      user: "Vijay",
      email: "vijay@example.com",
      type: "Virtual Debit",
      last4: "9012",
      expiry: "12/29",
      issued: "03 Aug 2026",
      status: "Pending",
    },
    {
      id: "CARD10006",
      user: "Suresh",
      email: "suresh@example.com",
      type: "Physical Debit",
      last4: "3478",
      expiry: "09/30",
      issued: "01 Aug 2026",
      status: "Active",
    },
  ];

  const filteredCards = cards.filter((card) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      card.id.toLowerCase().includes(searchText) ||
      card.user.toLowerCase().includes(searchText) ||
      card.email.toLowerCase().includes(searchText) ||
      card.last4.includes(searchText) ||
      card.type.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || card.status === filter;

    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return {
        className: "bg-green-500/10 text-green-400",
        icon: <FaCheckCircle />,
      };
    }

    if (status === "Blocked") {
      return {
        className: "bg-red-500/10 text-red-400",
        icon: <FaBan />,
      };
    }

    return {
      className: "bg-yellow-500/10 text-yellow-400",
      icon: <FaClock />,
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
          Cards
        </h1>

        <p className="text-slate-400 mt-2">
          Manage and monitor all user cards.
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total Cards */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Cards
              </p>

              <h2 className="text-2xl font-bold mt-2">
                8,540
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
              <FaCreditCard className="text-blue-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Active */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Active Cards
              </p>

              <h2 className="text-2xl font-bold mt-2 text-green-400">
                7,920
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>

          </div>

        </div>

        {/* Blocked */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Blocked Cards
              </p>

              <h2 className="text-2xl font-bold mt-2 text-red-400">
                420
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <FaBan className="text-red-400 text-xl" />
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
                200
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <FaClock className="text-yellow-400 text-xl" />
            </div>

          </div>

        </div>

      </div>

      {/* Card Management */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Top Section */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold">
                Card Management
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                View and manage user card information
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              {/* Search */}
              <div className="relative w-full sm:w-72">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  placeholder="Search cards..."
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
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
                <option value="Pending">Pending</option>
              </select>

            </div>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full `min-w-300`">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">

                <th className="text-left px-6 py-4">
                  Card
                </th>

                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Card Type
                </th>

                <th className="text-left px-6 py-4">
                  Card Number
                </th>

                <th className="text-left px-6 py-4">
                  Expiry
                </th>

                <th className="text-left px-6 py-4">
                  Issued
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

              {filteredCards.map((card) => {

                const statusStyle = getStatusStyle(
                  card.status
                );

                return (
                  <tr
                    key={card.id}
                    className="border-b border-slate-800/60 hover:bg-slate-800/30 transition"
                  >

                    {/* Card */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                          <FaCreditCard className="text-blue-400" />
                        </div>

                        <div>
                          <p className="font-medium">
                            {card.id}
                          </p>

                          <p className="text-xs text-slate-500">
                            NeoBank Card
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* User */}
                    <td className="px-6 py-5">

                      <div>
                        <p className="font-medium">
                          {card.user}
                        </p>

                        <p className="text-sm text-slate-500">
                          {card.email}
                        </p>
                      </div>

                    </td>

                    {/* Card Type */}
                    <td className="px-6 py-5 text-slate-300">
                      {card.type}
                    </td>

                    {/* Masked Card Number */}
                    <td className="px-6 py-5">

                      <span className="font-mono text-slate-300 tracking-wider">
                        •••• •••• •••• {card.last4}
                      </span>

                    </td>

                    {/* Expiry */}
                    <td className="px-6 py-5 text-slate-400">
                      {card.expiry}
                    </td>

                    {/* Issued */}
                    <td className="px-6 py-5 text-sm text-slate-400">
                      {card.issued}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.icon}

                        {card.status}
                      </span>

                    </td>

                    {/* Action */}
                    <td className="px-6 py-5 text-right">

                      <button
                        type="button"
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
        {filteredCards.length === 0 && (
          <div className="p-10 text-center">

            <FaCreditCard className="mx-auto text-3xl text-slate-700 mb-3" />

            <p className="text-slate-400">
              No cards found.
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