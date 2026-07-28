import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-24 bg-linear-to-br from-blue-50 via-white to-sky-100 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20 -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-20 bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 items-center gap-16">

        {/* Left Content */}
        <div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            Smart Banking For Everyone
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight text-slate-900">
            Banking Made
            <span className="text-blue-600"> Simple,</span><br />
            Secure &
            <span className="text-blue-600"> Smart.</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-8">
            Manage your money, transfer instantly,
            pay bills, monitor expenses and grow your
            savings with NeoBank Pro.
          </p>

          <div className="flex gap-5 mt-10">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition">
              Open Account
              <FaArrowRight />
            </button>

            <button className="border border-slate-300 px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-white transition">
              <FaPlayCircle />
              Watch Demo
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative flex justify-center">

          {/* Phone */}

          <div className="w-80 rounded-[40px] bg-white shadow-2xl p-6 border">

            <div className="bg-blue-600 rounded-3xl p-6 text-white">

              <p className="text-sm">Total Balance</p>

              <h2 className="text-4xl font-bold mt-2">
                ₹1,28,540
              </h2>

            </div>

            <div className="mt-6 space-y-4">

              <div className="bg-slate-100 rounded-xl p-4 flex justify-between">
                <span>Netflix</span>
                <span className="text-red-500">
                  -₹499
                </span>
              </div>

              <div className="bg-slate-100 rounded-xl p-4 flex justify-between">
                <span>Salary</span>
                <span className="text-green-600">
                  +₹45,000
                </span>
              </div>

              <div className="bg-slate-100 rounded-xl p-4 flex justify-between">
                <span>Electric Bill</span>
                <span className="text-red-500">
                  -₹2,100
                </span>
              </div>

            </div>

          </div>

          {/* Floating Card */}

          <div className="absolute -left-10 top-20 bg-white rounded-2xl shadow-xl p-4">
            💳 Visa Card
          </div>

          {/* Floating Badge */}

          <div className="absolute right-0 bottom-10 bg-blue-600 text-white rounded-full px-5 py-3 shadow-xl">
            🔒 Secure
          </div>

        </div>

      </div>

    </section>
  );
}