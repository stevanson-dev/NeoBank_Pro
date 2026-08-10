import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

import {
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaUnlock,
  FaPlus,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

export default function Cards() {
  const navigate = useNavigate();

  const [showCVV, setShowCVV] = useState(false);

  // Card state
  const [isFrozen, setIsFrozen] = useState(false);

  // Monthly limit
  const [monthlyLimit, setMonthlyLimit] = useState(100000);
  const [newLimit, setNewLimit] = useState("");

  // Modal state
  const [activeModal, setActiveModal] = useState(null);

  const usedAmount = 25000;

  const usagePercentage =
    monthlyLimit > 0
      ? Math.min((usedAmount / monthlyLimit) * 100, 100)
      : 0;


  /* =========================
     Freeze Card
  ========================= */

  const handleFreeze = () => {
    setIsFrozen(true);
    setActiveModal(null);
  };


  /* =========================
     Unfreeze Card
  ========================= */

  const handleUnfreeze = () => {
    setIsFrozen(false);
    setActiveModal(null);
  };


  /* =========================
     Update Limit
  ========================= */

  const handleUpdateLimit = () => {
    const value = Number(newLimit);

    if (!value || value <= 0) {
      alert("Please enter a valid monthly limit.");
      return;
    }

    if (value < usedAmount) {
      alert(
        `Monthly limit cannot be less than the used amount ₹${usedAmount.toLocaleString(
          "en-IN"
        )}.`
      );
      return;
    }

    setMonthlyLimit(value);
    setNewLimit("");
    setActiveModal(null);
  };


  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* =========================
          Header
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>


          <div>

            <h1 className="text-3xl font-bold">
              Cards
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your NeoBank Pro cards
            </p>

          </div>

        </div>

      </div>



      {/* =========================
          Card Section
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 mt-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


          {/* =========================
              Debit Card
          ========================= */}

          <div className="relative bg-linear-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 shadow-xl overflow-hidden">


            {/* Frozen Overlay */}

            {isFrozen && (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-10">

                <div className="bg-black/40 px-6 py-3 rounded-2xl border border-white/20">

                  <div className="flex items-center gap-2 text-white font-semibold">

                    <FaLock />

                    Card Frozen

                  </div>

                </div>

              </div>
            )}


            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                NeoBank Pro
              </h2>


              <FaCreditCard size={35} />

            </div>


            <div className="mt-12">

              <p className="text-white/70">
                Card Number
              </p>


              <h1 className="text-3xl tracking-widest mt-2">
                **** **** **** 4589
              </h1>

            </div>


            <div className="flex justify-between mt-10">

              <div>

                <p className="text-white/70">
                  Card Holder
                </p>

                <h3 className="font-semibold">
                  STEVANSON
                </h3>

              </div>


              <div>

                <p className="text-white/70">
                  Expiry
                </p>

                <h3 className="font-semibold">
                  08/29
                </h3>

              </div>

            </div>


            {/* CVV */}

            <div className="mt-8 flex justify-between items-center">

              <div>

                <p className="text-white/70">
                  CVV
                </p>

                <h3 className="font-semibold text-xl">
                  {showCVV ? "456" : "***"}
                </h3>

              </div>


              <button
                onClick={() => setShowCVV(!showCVV)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
              >

                {showCVV ? <FaEyeSlash /> : <FaEye />}

                {showCVV ? "Hide" : "Show"}

              </button>

            </div>

          </div>



          {/* =========================
              Card Settings
          ========================= */}

          <GlassCard className="p-8 text-white">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Card Settings
              </h2>


              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  isFrozen
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {isFrozen ? "Frozen" : "Active"}
              </span>

            </div>



            <div className="mt-8 space-y-4">


              {/* Freeze / Unfreeze */}

              {!isFrozen ? (

                <button
                  onClick={() => setActiveModal("freeze")}
                  className="w-full flex items-center justify-between bg-white/10 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 p-4 rounded-xl transition"
                >

                  <span className="flex items-center gap-3">

                    <FaLock className="text-red-400" />

                    Freeze Card

                  </span>


                  <span>
                    →
                  </span>

                </button>

              ) : (

                <button
                  onClick={() => setActiveModal("unfreeze")}
                  className="w-full flex items-center justify-between bg-white/10 hover:bg-green-500/20 border border-transparent hover:border-green-500/30 p-4 rounded-xl transition"
                >

                  <span className="flex items-center gap-3">

                    <FaUnlock className="text-green-400" />

                    Unfreeze Card

                  </span>


                  <span>
                    →
                  </span>

                </button>

              )}


            </div>



            {/* =========================
                Monthly Card Limit
            ========================= */}

            <div className="mt-8">

              <div className="flex justify-between items-center">

                <h3 className="text-lg font-semibold">
                  Monthly Card Limit
                </h3>


                <button
                  onClick={() => {
                    setNewLimit(monthlyLimit);
                    setActiveModal("limit");
                  }}
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                >
                  Update Limit
                </button>

              </div>


              <div className="mt-3 bg-white/10 rounded-xl p-4">


                <div className="flex justify-between">

                  <span className="text-gray-300">
                    Used
                  </span>


                  <span>
                    ₹{usedAmount.toLocaleString("en-IN")} / ₹
                    {monthlyLimit.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="w-full bg-white/20 rounded-full h-3 mt-4">

                  <div
                    className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${usagePercentage}%`,
                    }}
                  />

                </div>


                <p className="text-gray-400 text-sm mt-3">
                  {usagePercentage.toFixed(0)}% of your monthly limit used
                </p>

              </div>

            </div>


          </GlassCard>

        </div>

      </div>



      {/* =========================
          Request New Card
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 mt-10">

        <GlassCard className="p-8 text-white">

          <div className="flex justify-between items-center gap-6">

            <div>

              <h2 className="text-2xl font-bold">
                Request New Card
              </h2>


              <p className="text-gray-300 mt-2">
                Apply for a new virtual or physical card.
              </p>

            </div>


            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition">

              <FaPlus />

              Request Card

            </button>

          </div>

        </GlassCard>

      </div>



      {/* =========================
          Recent Transactions
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 mt-10 mb-10">

        <GlassCard className="p-8 text-white">

          <h2 className="text-2xl font-bold">
            Recent Card Transactions
          </h2>


          <div className="mt-6 space-y-4">


            <div className="flex justify-between bg-white/10 p-4 rounded-xl">

              <span>
                Amazon Shopping
              </span>

              <span className="text-red-400">
                -₹2,499
              </span>

            </div>


            <div className="flex justify-between bg-white/10 p-4 rounded-xl">

              <span>
                Netflix Subscription
              </span>

              <span className="text-red-400">
                -₹649
              </span>

            </div>


            <div className="flex justify-between bg-white/10 p-4 rounded-xl">

              <span>
                Swiggy
              </span>

              <span className="text-red-400">
                -₹350
              </span>

            </div>


          </div>

        </GlassCard>

      </div>



      {/* =====================================================
          FREEZE MODAL
      ===================================================== */}

      {activeModal === "freeze" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* Blurred Background */}

          <div
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />


          {/* Modal */}

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">


            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>


            <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">

              <FaLock size={24} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Freeze Card?
            </h2>


            <p className="text-gray-400 mt-3 leading-relaxed">
              Are you sure you want to freeze this card?
              Card transactions will be temporarily disabled.
            </p>


            <div className="flex gap-3 mt-7">


              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>


              <button
                onClick={handleFreeze}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
              >
                Freeze Card
              </button>


            </div>

          </div>

        </div>

      )}



      {/* =====================================================
          UNFREEZE MODAL
      ===================================================== */}

      {activeModal === "unfreeze" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">


            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>


            <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaUnlock size={24} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Unfreeze Card?
            </h2>


            <p className="text-gray-400 mt-3 leading-relaxed">
              Do you want to unfreeze this card?
              Card transactions will be enabled again.
            </p>


            <div className="flex gap-3 mt-7">


              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>


              <button
                onClick={handleUnfreeze}
                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
              >
                Unfreeze Card
              </button>


            </div>

          </div>

        </div>

      )}



      {/* =====================================================
          UPDATE LIMIT MODAL
      ===================================================== */}

      {activeModal === "limit" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />


          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">


            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>


            <h2 className="text-2xl font-bold">
              Update Monthly Limit
            </h2>


            <p className="text-gray-400 mt-2">
              Set a new spending limit for this card.
            </p>


            <div className="mt-6">

              <label className="text-gray-300 text-sm">
                Current Limit
              </label>


              <div className="mt-2 bg-white/10 rounded-xl px-4 py-3 text-gray-300">
                ₹{monthlyLimit.toLocaleString("en-IN")}
              </div>

            </div>


            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                New Monthly Limit
              </label>


              <div className="relative mt-2">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ₹
                </span>


                <input
                  type="number"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="Enter new limit"
                  className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

            </div>


            <div className="flex gap-3 mt-7">


              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>


              <button
                onClick={handleUpdateLimit}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                Update Limit
              </button>


            </div>

          </div>

        </div>

      )}

    </div>
  );
} 