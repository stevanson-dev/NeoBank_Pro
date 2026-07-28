function BalanceCard({ title, amount, icon, color }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-200">{title}</p>

          <h2 className="mt-3 text-3xl font-bold">
            ₹{amount}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;