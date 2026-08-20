import {
  FaUsers,
  FaExchangeAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      icon: FaUsers,
    },
    {
      title: "Transactions",
      value: "45,230",
      icon: FaExchangeAlt,
    },
    {
      title: "Total Deposits",
      value: "₹12.5L",
      icon: FaArrowDown,
    },
    {
      title: "Total Withdrawals",
      value: "₹8.2L",
      icon: FaArrowUp,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-blue-400 text-sm font-medium">
          NeoBank Pro
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Admin Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor and manage your banking system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-blue-500/40 transition"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-600/15 flex items-center justify-center">
                  <Icon className="text-blue-400 text-xl" />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Recent Transactions */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm">
                <th className="py-3">User</th>
                <th className="py-3">Type</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-slate-800/60">
                <td className="py-4">User A</td>
                <td className="py-4 text-slate-400">Transfer</td>
                <td className="py-4">₹2,000</td>
                <td className="py-4 text-green-400">
                  Completed
                </td>
              </tr>

              <tr className="border-b border-slate-800/60">
                <td className="py-4">User B</td>
                <td className="py-4 text-slate-400">Deposit</td>
                <td className="py-4">₹5,000</td>
                <td className="py-4 text-green-400">
                  Completed
                </td>
              </tr>

              <tr>
                <td className="py-4">User C</td>
                <td className="py-4 text-slate-400">Withdrawal</td>
                <td className="py-4">₹1,000</td>
                <td className="py-4 text-yellow-400">
                  Pending
                </td>
              </tr>

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}