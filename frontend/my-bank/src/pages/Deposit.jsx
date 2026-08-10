import { useState, useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom";

import {
  FaArrowLeft,
  FaUniversity,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

export default function Deposit() {

  const navigate = useNavigate();
  const location = useLocation();

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState("");


 const handleDeposit = () => {
  if (!amount || Number(amount) <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  navigate("/transaction-pin?type=deposit", {
    state: {
      amount: amount,
      method: method,
    },
  });
};


  useEffect(() => {
  if (location.state?.depositSuccess) {

    // Processing page-லிருந்து வந்த amount
    setSuccessAmount(location.state.amount);

    // Success modal open
    setShowSuccess(true);

    // URL state clear
    navigate("/deposit", {
      replace: true,
      state: {},
    });
  }
}, [location.state, navigate]);


  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* Header */}

      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>


          <div>

            <h1 className="text-3xl font-bold">
              Deposit Money
            </h1>

            <p className="text-gray-400 mt-1">
              Add money to your NeoBank Pro account
            </p>

          </div>

        </div>

      </div>



      {/* Main */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">


          {/* Amount */}

          <div>

            <label className="text-gray-300 text-sm">
              Deposit Amount
            </label>


            <div className="relative mt-2">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                ₹
              </span>


              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-xl outline-none focus:border-blue-500"
              />

            </div>

          </div>



          {/* Payment Method */}

          <div className="mt-8">

            <h2 className="font-semibold text-lg">
              Deposit From
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Choose where the money will come from
            </p>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">


              {/* Bank */}

              <button
                onClick={() => setMethod("bank")}
                className={`p-5 rounded-2xl border text-left transition ${
                  method === "bank"
                    ? "border-blue-500 bg-blue-600/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">

                    <FaUniversity size={22} />

                  </div>


                  <div>

                    <h3 className="font-semibold">
                      Bank Account
                    </h3>

                    <p className="text-gray-400 text-sm">
                      **** **** 6789
                    </p>

                  </div>

                </div>

              </button>



              {/* Debit Card */}

              <button
                onClick={() => setMethod("card")}
                className={`p-5 rounded-2xl border text-left transition ${
                  method === "card"
                    ? "border-blue-500 bg-blue-600/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">

                    <FaCreditCard size={22} />

                  </div>


                  <div>

                    <h3 className="font-semibold">
                      Debit Card
                    </h3>

                    <p className="text-gray-400 text-sm">
                      **** 4521
                    </p>

                  </div>

                </div>

              </button>

            </div>

          </div>



          {/* Summary */}

          <div className="mt-8 bg-white/5 rounded-2xl p-5">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Deposit Amount
              </span>

              <span className="font-semibold">
                ₹{amount || "0"}
              </span>

            </div>


            <div className="flex justify-between mt-3">

              <span className="text-gray-400">
                Deposit Method
              </span>

              <span className="font-semibold">
                {method === "bank"
                  ? "Bank Account"
                  : "Debit Card"}
              </span>

            </div>


            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">

              <span className="font-semibold">
                Total
              </span>

              <span className="text-xl font-bold text-blue-400">
                ₹{amount || "0"}
              </span>

            </div>

          </div>



          {/* Deposit Button */}

          <button
              onClick={handleDeposit}

            className="w-full mt-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Deposit Money
          </button>


        </div>

      </div>



      {/* Success Modal */}

      {showSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-center">


            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={32} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Deposit Successful
            </h2>


            <p className="text-gray-400 mt-3">
              ₹{successAmount} has been added successfully.
            </p>


            <button
              onClick={() => navigate("/dashboard")}
              className="w-full mt-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      )}

    </div>

  );
}