import {
  FaUsers,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaServer,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers />,
    number: "100K+",
    title: "Active Users",
  },
  {
    icon: <FaMoneyCheckAlt />,
    number: "₹500Cr+",
    title: "Transactions",
  },
  {
    icon: <FaCreditCard />,
    number: "250K+",
    title: "Cards Issued",
  },
  {
    icon: <FaServer />,
    number: "99.9%",
    title: "System Uptime",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-[#020617]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Trusted Worldwide
          </h2>

          <p className="text-slate-400 mt-4">
            Banking statistics that build trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-8 text-center hover:border-blue-500 transition"
            >

              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-2xl">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-white mt-6">
                {item.number}
              </h3>

              <p className="text-slate-400 mt-3">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}