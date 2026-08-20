import {
  FaSearch,
  FaUserCheck,
  FaUserTimes,
  FaEye,
} from "react-icons/fa";

import { useState } from "react";

export default function Users() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "Stevanson",
      email: "stevanson@example.com",
      phone: "+91 98765 43210",
      balance: "₹25,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Karthi",
      email: "karthi@example.com",
      phone: "+91 98765 12345",
      balance: "₹18,500",
      status: "Active",
    },
    {
      id: 3,
      name: "Arun",
      email: "arun@example.com",
      phone: "+91 98765 67890",
      balance: "₹8,200",
      status: "Blocked",
    },
    {
      id: 4,
      name: "Rahul",
      email: "rahul@example.com",
      phone: "+91 98765 24680",
      balance: "₹42,000",
      status: "Active",
    },
  ];

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro Admin
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Users
        </h1>

        <p className="text-slate-400 mt-2">
          Manage and monitor registered users.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Total Users
          </p>

          <h2 className="text-2xl font-bold mt-2">
            12,450
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Active Users
          </p>

          <h2 className="text-2xl font-bold mt-2 text-green-400">
            11,980
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">
            Blocked Users
          </p>

          <h2 className="text-2xl font-bold mt-2 text-red-400">
            470
          </h2>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-slate-800">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Registered Users
            </h2>

            {/* Search */}
            <div className="relative w-full md:w-80">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full `min-w-200`">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">

                <th className="text-left px-6 py-4">
                  User
                </th>

                <th className="text-left px-6 py-4">
                  Phone
                </th>

                <th className="text-left px-6 py-4">
                  Balance
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

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-slate-800/60 hover:bg-slate-800/30 transition"
                >

                  {/* User */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-semibold">
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Phone */}
                  <td className="px-6 py-5 text-slate-300">
                    {user.phone}
                  </td>

                  {/* Balance */}
                  <td className="px-6 py-5 font-medium">
                    {user.balance}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.status === "Active" ? (
                        <FaUserCheck />
                      ) : (
                        <FaUserTimes />
                      )}

                      {user.status}
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

              ))}

            </tbody>

          </table>

        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No users found.
          </div>
        )}

      </div>

    </div>
  );
}