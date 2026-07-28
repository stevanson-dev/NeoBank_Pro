import {
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt size={35} />,
    title: "Secure Banking",
    desc: "Bank-grade encryption keeps your money and data protected."
  },
  {
    icon: <FaBolt size={35} />,
    title: "Instant Transfer",
    desc: "Transfer money anytime with lightning-fast processing."
  },
  {
    icon: <FaChartLine size={35} />,
    title: "Smart Analytics",
    desc: "Track your income and expenses with beautiful insights."
  },
  {
    icon: <FaHeadset size={35} />,
    title: "24/7 Support",
    desc: "Our support team is always available whenever you need us."
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose NeoBank Pro?
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Everything you need to manage your finances securely,
            quickly and intelligently.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((item, index) => (

            <div
              key={index}
              className="group rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-3 border border-gray-100"
            >

              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                {item.icon}
              </div>

              <h3 className="text-2xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}