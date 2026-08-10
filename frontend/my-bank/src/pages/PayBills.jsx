import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaArrowLeft,
  FaBolt,
  FaTint,
  FaWifi,
  FaMobileAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function PayBills() {

const navigate = useNavigate();
const location = useLocation();

const [category, setCategory] = useState("Electricity");
const [provider, setProvider] = useState("");
const [amount, setAmount] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
const [successAmount, setSuccessAmount] = useState("");
const [successCategory, setSuccessCategory] = useState("");
const [successProvider, setSuccessProvider] = useState("");


  const categories = [
    {
      name: "Electricity",
      icon: <FaBolt />,
    },
    {
      name: "Water",
      icon: <FaTint />,
    },
    {
      name: "Internet",
      icon: <FaWifi />,
    },
    {
      name: "Mobile",
      icon: <FaMobileAlt />,
    },
  ];


  const providers = {

    Electricity: [
      "TANGEDCO",
      "BESCOM",
      "Adani Electricity",
    ],

    Water: [
      "Chennai Metro Water",
      "Bangalore Water Supply",
    ],

    Internet: [
      "Airtel Xstream",
      "JioFiber",
      "ACT Fibernet",
    ],

    Mobile: [
      "Airtel",
      "Jio",
      "Vi",
    ],

  };


const handlePayBill = () => {
  if (!provider) {
    alert("Please select a provider.");
    return;
  }

  if (!amount || Number(amount) <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  navigate("/transaction-pin?type=bill", {
    state: {
      amount: amount,
      category: category,
      provider: provider,
    },
  });
};

  useEffect(() => {
  if (location.state?.billSuccess) {
    setSuccessAmount(location.state.amount);
    setSuccessCategory(location.state.category);
    setSuccessProvider(location.state.provider);

    setShowSuccess(true);

    navigate("/pay-bills", {
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
              Pay Bills
            </h1>

            <p className="text-gray-400 mt-1">
              Pay your bills quickly and securely
            </p>

          </div>

        </div>

      </div>



      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">


        {/* Bill Form */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">


          {/* Category */}

          <h2 className="text-xl font-bold">
            Select Bill Category
          </h2>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">


            {categories.map((item) => (

              <button
                key={item.name}
                onClick={() => {
                  setCategory(item.name);
                  setProvider("");
                }}
                className={`p-5 rounded-2xl border transition ${
                  category === item.name
                    ? "border-blue-500 bg-blue-600/20"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >

                <div className="text-2xl text-blue-400 flex justify-center">

                  {item.icon}

                </div>


                <p className="text-sm mt-3">
                  {item.name}
                </p>

              </button>

            ))}

          </div>



          {/* Provider */}

          <div className="mt-8">

            <label className="text-gray-300 text-sm">
              Select Provider
            </label>


            <select
              value={provider}
              onChange={(e) =>
                setProvider(e.target.value)
              }
              className="w-full mt-2 bg-[#102E5B] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            >

              <option value="">
                Select {category} provider
              </option>


              {providers[category].map((item) => (

                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>

          </div>



          {/* Amount */}

          <div className="mt-6">

            <label className="text-gray-300 text-sm">
              Bill Amount
            </label>


            <div className="relative mt-2">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                ₹
              </span>


              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Enter bill amount"
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-xl outline-none focus:border-blue-500"
              />

            </div>

          </div>

        </div>



        {/* Payment Summary */}

        <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">


          <h2 className="text-xl font-bold">
            Payment Summary
          </h2>


          <div className="mt-6 space-y-5">


            {/* Category */}

            <div className="flex justify-between items-center">

              <span className="text-gray-400">
                Category
              </span>

              <span className="font-semibold">
                {category}
              </span>

            </div>



            {/* Provider */}

            <div className="flex justify-between items-center gap-4">

              <span className="text-gray-400">
                Provider
              </span>

              <span className="font-semibold text-right `max-w-60` `wrapbreak-words`">
                {provider || "Not selected"}
              </span>

            </div>



            {/* Amount */}

            <div className="flex justify-between items-center">

              <span className="text-gray-400">
                Amount
              </span>

              <span className="font-semibold">
                ₹{amount || "0"}
              </span>

            </div>



            {/* Total */}

            <div className="border-t border-white/10 pt-5 flex justify-between items-center">

              <span className="font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold text-blue-400">
                ₹{amount || "0"}
              </span>

            </div>


          </div>



          {/* Pay Bill Button */}

          <button
            onClick={handlePayBill}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Pay Bill
          </button>


        </div>

      </div>



      {/* Success Modal */}

      {showSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


          {/* Background */}

          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />


          {/* Modal */}

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-center">


            {/* Success Icon */}

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={32} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Payment Successful
            </h2>


            <p className="text-gray-400 mt-3">
            ₹{successAmount} bill payment completed successfully.
            </p>

            <p className="text-gray-500 text-sm mt-2">
             {successCategory} · {successProvider}
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