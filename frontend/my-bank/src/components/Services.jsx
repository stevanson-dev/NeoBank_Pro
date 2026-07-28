import {
  FaWallet,
  FaExchangeAlt,
  FaCreditCard,
  FaReceipt,
  FaPiggyBank,
  FaChartPie,
  FaBell,
  FaHistory,
} from "react-icons/fa";

const services = [
  {
    icon: <FaWallet />,
    title: "Account Overview",
    desc: "Monitor balances and accounts in real time.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Money Transfer",
    desc: "Send money instantly anywhere.",
  },
  {
    icon: <FaReceipt />,
    title: "Bill Payments",
    desc: "Pay electricity, mobile and broadband bills.",
  },
  {
    icon: <FaCreditCard />,
    title: "Card Management",
    desc: "Freeze, unblock and manage cards.",
  },
  {
    icon: <FaHistory />,
    title: "Transactions",
    desc: "View complete transaction history.",
  },
  {
    icon: <FaChartPie />,
    title: "Expense Analytics",
    desc: "Visual spending insights with charts.",
  },
  {
    icon: <FaPiggyBank />,
    title: "Savings Goals",
    desc: "Create financial goals and track them.",
  },
  {
    icon: <FaBell />,
    title: "Smart Alerts",
    desc: "Real-time notifications for every activity.",
  },
];

export default function Services() {
  return (
    <section className="bg-[#020617] py-24">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <p className="uppercase tracking-widest text-blue-500 font-semibold">
            OUR SERVICES
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            Digital Banking Solutions
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Everything you need to manage your finances from one secure platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 hover:-translate-y-2 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl">
                {service.icon}
              </div>

              <h3 className="text-2xl text-white font-bold mt-6">
                {service.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {service.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}