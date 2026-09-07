import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";

import {
  FaArrowLeft,
  FaQrcode,
  FaCheckCircle,
  FaUniversity,
} from "react-icons/fa";

export default function QRPay() {
  const navigate = useNavigate();
  const location = useLocation();

  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [successAmount, setSuccessAmount] = useState("");
  const [successUpiId, setSuccessUpiId] = useState("");

  // =================================================
  // BANK ACCOUNT
  // =================================================

  const [bankAccount, setBankAccount] = useState(null);
  const [accountLoading, setAccountLoading] = useState(true);

  // =================================================
  // FETCH PRIMARY BANK ACCOUNT
  // =================================================

  const fetchBankAccount = async () => {
    try {
      setAccountLoading(true);

      const response = await api.get("/accounts/primary");

      setBankAccount(response.data);
    } catch (error) {
      console.error("Failed to fetch bank account:", error);
      setBankAccount(null);
    } finally {
      setAccountLoading(false);
    }
  };

  // =================================================
  // LOAD BANK ACCOUNT
  // =================================================

  useEffect(() => {
    fetchBankAccount();
  }, []);

  // =================================================
  // CURRENT BALANCE
  // =================================================

  const currentBalance = Number(bankAccount?.balance || 0);

  // =================================================
  // FORMAT BANK ACCOUNT NUMBER
  // =================================================

  const formatBankAccountNumber = (value) => {
    if (!value) {
      return "Account unavailable";
    }

    const stringValue = String(value);

    if (stringValue.length <= 8) {
      return stringValue;
    }

    return `${stringValue.slice(0, 4)} **** ${stringValue.slice(-4)}`;
  };

  // =================================================
  // CONFIRM PAYMENT BUTTON
  // =================================================

  const handlePayment = () => {
    if (!upiId.trim()) {
      alert("Please enter UPI ID.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // First show confirmation modal
    setShowConfirm(true);
  };

  // =================================================
  // CONFIRM & PAY
  // =================================================

  const handleConfirmPayment = () => {
    setShowConfirm(false);

    navigate("/transaction-pin?type=qr", {
      state: {
        amount: amount,
        upiId: upiId,
      },
    });
  };

  // =================================================
  // QR PAYMENT SUCCESS
  // =================================================

  useEffect(() => {
    if (location.state?.qrSuccess) {
      setSuccessAmount(location.state.amount);
      setSuccessUpiId(location.state.upiId);

      setShowSuccess(true);

      // Refresh balance after successful payment
      fetchBankAccount();

      navigate("/qr-pay", {
        replace: true,
        state: {},
      });
    }
  }, [location.state, navigate]);

  // =================================================
  // UI
  // =================================================

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="max-w-4xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              QR Pay
            </h1>

            <p className="text-gray-400 mt-1">
              Make quick and secure payments
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

          {/* =================================================
              QR
          ================================================= */}

          <div className="text-center">

            <div className="w-52 h-52 mx-auto rounded-3xl bg-white flex items-center justify-center">

              <FaQrcode
                size={150}
                className="text-black"
              />

            </div>

            <h2 className="text-xl font-bold mt-6">
              Scan & Pay
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Scan the merchant QR code to make a payment
            </p>

          </div>

          {/* =================================================
              OR
          ================================================= */}

          <div className="flex items-center gap-4 my-8">

            <div className="h-px bg-white/10 flex-1" />

            <span className="text-gray-500 text-sm">
              OR
            </span>

            <div className="h-px bg-white/10 flex-1" />

          </div>

          {/* =================================================
              UPI ID
          ================================================= */}

          <div>

            <label className="text-gray-300 text-sm">
              UPI ID
            </label>

            <input
              type="text"
              value={upiId}
              onChange={(e) =>
                setUpiId(e.target.value)
              }
              placeholder="example@upi"
              className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

          {/* =================================================
              AMOUNT
          ================================================= */}

          <div className="mt-5">

            <label className="text-gray-300 text-sm">
              Amount
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
                placeholder="Enter amount"
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-xl outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* =================================================
              CURRENT BALANCE
              Small box
          ================================================= */}

          <div className="mt-6">

            {accountLoading ? (

              <div className="h-20 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />

            ) : (

              <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4">

                <div className="flex items-center justify-between">

                  {/* LEFT - SMALL BANK ACCOUNT */}

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">

                      <FaUniversity size={15} />

                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">
                        Bank Account
                      </p>

                      <p className="text-xs text-gray-300 mt-1 truncate">
                        {formatBankAccountNumber(
                          bankAccount?.accountNumber
                        )}
                      </p>

                    </div>

                  </div>

                  {/* RIGHT - CURRENT BALANCE */}

                  <div className="text-right ml-4">

                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">
                      Current Balance
                    </p>

                    <p className="text-xl font-bold text-green-400 mt-1 whitespace-nowrap">

                      ₹
                      {currentBalance.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}

                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <div className="mt-6 bg-white/5 rounded-2xl p-5">

            <div className="flex justify-between gap-4">

              <span className="text-gray-400">
                UPI ID
              </span>

              <span className="font-semibold text-right break-all">
                {upiId || "Not entered"}
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

          {/* =================================================
              CONFIRM PAYMENT
          ================================================= */}

          <button
            onClick={handlePayment}
            className="w-full mt-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Confirm Payment
          </button>

        </div>

      </div>

      {/* =================================================
          CONFIRMATION MODAL
      ================================================= */}

      {showConfirm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() => setShowConfirm(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8">

            <h2 className="text-2xl font-bold">
              Confirm Payment
            </h2>

            <p className="text-gray-400 mt-3">
              Are you sure you want to make this payment?
            </p>

            {/* Payment Details */}

            <div className="mt-6 bg-white/5 rounded-2xl p-5 space-y-4">

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Paying to
                </span>

                <span className="font-semibold text-right break-all">
                  {upiId}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Amount
                </span>

                <span className="text-xl font-bold text-blue-400">
                  ₹{amount}
                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-3 mt-7">

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmPayment}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                Confirm & Pay
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          SUCCESS MODAL
      ================================================= */}

      {showSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={32} />

            </div>

            <h2 className="text-2xl font-bold mt-5">
              Payment Successful
            </h2>

            <p className="text-gray-400 mt-3">
              ₹{successAmount} payment completed successfully.
            </p>

            <p className="text-gray-500 text-sm mt-2 break-all">
              {successUpiId}
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