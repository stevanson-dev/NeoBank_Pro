import {
  FaArrowRight,
  FaPlayCircle,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Hero() {
  return (
   <section id="home">
  {/* Home content */}

   <div className="relative">

      {/* Blue Glow */}

      <div className="absolute w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -top-32 -left-32" />

      {/* Cyan Glow */}

      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl top-40 `right-37.5`" />

      {/* Small Purple Accent */}

      <div className="absolute w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl bottom-0 left-1/3" />


      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 items-center gap-16">

        {/* LEFT */}

        <div>

          <span className="inline-flex items-center gap-2
            bg-blue-100 text-blue-700
            px-4 py-2 rounded-full
            text-sm font-semibold">

            <FaShieldAlt />

            Smart Banking For Everyone

          </span>


          <h1 className="text-5xl md:text-6xl lg:text-7xl
            font-extrabold mt-6 leading-tight text-slate-200">

            Banking Made

            <span className="text-blue-600"> Simple,</span>

            <br />

            Secure &

            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}Smart.
            </span>

          </h1>


          <p className="text-slate-600 text-lg mt-6 leading-8 max-w-xl">

            Manage your money, transfer instantly,
            monitor expenses and track your savings
            with a modern digital banking experience.

          </p>


          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/register"
              className="bg-linear-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              text-white px-8 py-4 rounded-xl
              flex items-center justify-center gap-3
              transition shadow-xl shadow-blue-500/25"
            >
              Open Account
              <FaArrowRight />
            </Link>


            <button
              className="border border-slate-300
              bg-white/20 backdrop-blur
              px-8 py-4 rounded-xl
              flex items-center justify-center gap-3
              hover:bg-black hover:border-blue-300
              transition"
            >
              <FaPlayCircle className="text-blue-600" />
              Watch Demo
            </button>

          </div>


          <div className="flex flex-wrap gap-5 mt-8 text-sm text-slate-600">

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Secure Platform
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Fast Transfers
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Easy Management
            </span>

          </div>

        </div>


        {/* RIGHT */}

        <div className="relative flex justify-center">

          {/* Glow behind card */}

          <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full scale-75" />


          <div className="relative w-full max-w-md ">

            <div className="rounded-3xl bg-slate-300 backdrop-blur
              `rounded-4xl`
              shadow-2xl shadow-blue-900/15
              border border-blue-100
              p-5">

              {/* Balance */}

              <div className="bg-linear-to-br from-blue-600 via-blue-600 to-cyan-500
                rounded-3xl p-6 text-white">

                <div className="flex justify-between">

                  <p className="text-blue-100 text-sm">
                    Sample Balance
                  </p>

                  <FaShieldAlt />
                </div>

                <h2 className="text-4xl font-bold mt-3">
                  ₹1,28,540
                </h2>

                <p className="text-blue-100 mt-2 text-sm">
                  Available Balance
                </p>

              </div>


              {/* Transactions */}

              <div className="mt-6 space-y-3">

                <div className="bg-blue-50 rounded-2xl p-4 flex justify-between">

                  <div>
                    <p className="font-semibold text-slate-800">
                      Salary
                    </p>

                    <p className="text-xs text-slate-500">
                      Today
                    </p>
                  </div>

                  <p className="text-emerald-600 font-bold">
                    +₹45,000
                  </p>

                </div>


                <div className="bg-rose-50 rounded-2xl p-4 flex justify-between">

                  <div>
                    <p className="font-semibold text-slate-800">
                      Netflix
                    </p>

                    <p className="text-xs text-slate-500">
                      Yesterday
                    </p>
                  </div>

                  <p className="text-rose-500 font-bold">
                    -₹499
                  </p>

                </div>


                <div className="bg-cyan-50 rounded-2xl p-4 flex justify-between">

                  <div>
                    <p className="font-semibold text-slate-800">
                      Electricity
                    </p>

                    <p className="text-xs text-slate-500">
                      2 days ago
                    </p>
                  </div>

                  <p className="text-rose-500 font-bold">
                    -₹2,100
                  </p>

                </div>

              </div>

            </div>


            {/* Floating Card */}

            <div className="absolute -left-5 lg:-left-16 top-20
              bg-white rounded-2xl
              shadow-xl shadow-blue-900/10
              border border-blue-100
              px-5 py-4">

              <p className="text-xs text-slate-500">
                Card Status
              </p>

              <p className="font-bold text-emerald-600 mt-1">
                ● Active
              </p>

            </div>


            {/* Floating Secure */}

            <div className="absolute -right-3 lg:-right-10 bottom-12
              bg-linear-to-r from-blue-600 to-cyan-500
              text-white rounded-2xl
              px-5 py-4 shadow-xl">

              <div className="flex items-center gap-2">

                <FaShieldAlt />

                <span className="font-semibold">
                  Secure
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
    </section>
  );
}





