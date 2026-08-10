export default function SummaryCard({
  title,
  value,
  icon,
  color = "text-cyan-400",
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-300 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div className={`text-4xl ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}