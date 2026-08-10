import {
  FaExchangeAlt,
  FaWallet,
  FaChartLine,
  FaShieldAlt,
  FaBell,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: FaExchangeAlt,
    title: "Instant Transfers",
    text: "Send money quickly and securely whenever you need it.",
  },
  {
    icon: FaWallet,
    title: "Smart Wallet",
    text: "Keep track of your balance and manage your money easily.",
  },
  {
    icon: FaChartLine,
    title: "Expense Tracking",
    text: "Understand where your money goes with clear insights.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Banking",
    text: "Multiple security layers help protect your account.",
  },
  {
    icon: FaBell,
    title: "Live Notifications",
    text: "Stay informed about transactions in real time.",
  },
  {
    icon: FaMobileAlt,
    title: "Digital First",
    text: "Access your banking experience from anywhere.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="border-b border-[#243452] bg-[#0B1220] px-6 py-24"
    >

      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-sm font-bold uppercase tracking-wider text-[#60A5FA]">
            Everything you need
          </span>

          <h2 className="mt-3 text-4xl font-bold">
            Banking without the complexity
          </h2>

          <p className="mt-4 text-[#94A3B8]">
            Powerful financial tools wrapped in a simple banking experience.
          </p>

        </div>


        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-[#243452] bg-[#111B2E] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#3B82F6] hover:shadow-xl hover:shadow-blue-500/10"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16233A] text-xl text-[#60A5FA] group-hover:bg-[#3B82F6] group-hover:text-white">
                  <Icon />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
                  {feature.text}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}