import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import api from "../services/api";

export default function ReviewTransfer() {
  const navigate = useNavigate();
  const location = useLocation();

  const transferData = location.state;

  const [availableBalance, setAvailableBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  // ==========================================
  // LOAD REAL BALANCE
  // ==========================================
  useEffect(() => {
    const loadBalance = async () => {
      try {
        setBalanceLoading(true);

        const response = await api.get("/auth/me");

        const balance = Number(response.data?.balance ?? 0);

        setAvailableBalance(
          Number.isFinite(balance) ? balance : 0
        );
      } catch (error) {
        console.error("Failed to load balance:", error);
        setAvailableBalance(0);
      } finally {
        setBalanceLoading(false);
      }
    };

    loadBalance();
  }, []);

  // ==========================================
  // DIRECT ACCESS PROTECTION
  // ==========================================
  if (!transferData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white flex items-center justify-center px-6">
        <div className="text-center">

          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-2xl">
            !
          </div>

          <h1 className="text-2xl font-bold mt-5">
            Transfer details not found
          </h1>

          <p className="text-gray-400 mt-3">
            Please start the transfer again.
          </p>

          <button
            onClick={() => navigate("/transfer")}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Back to Transfer
          </button>

        </div>
      </div>
    );
  }

  const {
    amount,
    method,
    recipientName,
    recipientAccount,
    recipientBank,
    ifsc,
    purpose,
    notes,
    saveBeneficiary,
  } = transferData;

  const transferAmount = Number(amount || 0);

  const remainingBalance =
    availableBalance - transferAmount;

  // ==========================================
  // CONFIRM TRANSFER
  // ==========================================
  const handleConfirm = () => {
    if (balanceLoading) {
      alert("Please wait while your balance is being verified.");
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      alert("Invalid transfer amount.");
      return;
    }

    if (!recipientName) {
      alert("Recipient details are missing.");
      return;
    }

    // REAL BALANCE VALIDATION
    if (transferAmount > availableBalance) {
      alert(
        `Insufficient balance.\n\nAvailable Balance: ₹${availableBalance.toLocaleString(
          "en-IN"
        )}\nTransfer Amount: ₹${transferAmount.toLocaleString(
          "en-IN"
        )}`
      );
      return;
    }

    navigate("/transaction-pin?type=transfer", {
      state: {
        amount: transferAmount,
        method: method || "bank",

        recipientName,
        recipientAccount,
        recipientBank,
        ifsc,

        purpose,
        notes,
        saveBeneficiary,

        // Pass verified balance forward
        availableBalance,
      },
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white overflow-x-hidden">

      {/* ==========================================
          HEADER
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Review Transfer
          </h1>

          <p className="text-gray-400 mt-1">
            Check your transfer details before continuing
          </p>
        </div>

      </div>

      {/* ==========================================
          FROM ACCOUNT
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <div className="flex items-start justify-between gap-5">

            <div>
              <p className="text-gray-300 text-sm">
                From Account
              </p>

              <h2 className="text-2xl font-bold mt-2">
                NeoBank Pro Savings
              </h2>

              <p className="text-gray-400 mt-2">
                Account •••• 4589
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <FaLock />
            </div>

          </div>

          <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* AVAILABLE BALANCE */}
            <div>

              <p className="text-gray-300 text-sm">
                Available Balance
              </p>

              <h3 className="text-3xl font-bold mt-2">

                {balanceLoading
                  ? "Loading..."
                  : `₹${availableBalance.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}`}

              </h3>

            </div>

            {/* AFTER TRANSFER */}
            <div>

              <p className="text-gray-300 text-sm">
                Balance After Transfer
              </p>

              <h3
                className={`text-3xl font-bold mt-2 ${
                  remainingBalance < 0
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {balanceLoading
                  ? "Loading..."
                  : `₹${Math.max(
                      remainingBalance,
                      0
                    ).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </h3>

            </div>

          </div>

          {!balanceLoading &&
            transferAmount > availableBalance && (
              <div className="mt-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                    !
                  </div>

                  <div>

                    <p className="font-semibold text-red-400">
                      Insufficient Balance
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      You need ₹
                      {(
                        transferAmount -
                        availableBalance
                      ).toLocaleString("en-IN")}{" "}
                      more to complete this transfer.
                    </p>

                  </div>

                </div>

              </div>
            )}

          {!balanceLoading &&
            transferAmount <= availableBalance && (
              <div className="mt-6 bg-green-500/10 border border-green-400/30 rounded-2xl p-4">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-green-400 text-xl" />

                  <div>

                    <p className="font-semibold text-green-400">
                      Balance Available
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      You have enough balance to complete this transfer.
                    </p>

                  </div>

                </div>

              </div>
            )}

        </div>

      </div>

      {/* ==========================================
          RECIPIENT
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
                {recipientName?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>

                <p className="text-gray-300 text-sm">
                  Recipient
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {recipientName}
                </h2>

                {recipientBank && (
                  <p className="text-gray-400 mt-2">
                    {recipientBank}
                  </p>
                )}

              </div>

            </div>

            <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
              {method === "upi"
                ? "UPI Transfer"
                : method === "card"
                ? "Card Transfer"
                : "Bank Transfer"}
            </div>

          </div>

          {/* ACCOUNT DETAILS */}
          <div className="mt-7 pt-6 border-t border-white/10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <p className="text-gray-400 text-sm">
                  {method === "upi"
                    ? "UPI ID"
                    : "Account Number"}
                </p>

                <p className="font-semibold mt-1 break-all">
                  {recipientAccount || "-"}
                </p>

              </div>

              {method === "bank" && (
                <div>

                  <p className="text-gray-400 text-sm">
                    IFSC Code
                  </p>

                  <p className="font-semibold mt-1">
                    {ifsc || "-"}
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          TRANSFER DETAILS
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Transfer Details
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center gap-4">
              <span className="text-gray-300">
                Transfer Amount
              </span>

              <span className="font-semibold text-xl">
                ₹{transferAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Transfer Fee
              </span>

              <span>₹0</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                GST
              </span>

              <span>₹0</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Purpose
              </span>

              <span>
                {purpose || "Personal"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Transfer Date
              </span>

              <span>Today</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Estimated Time
              </span>

              <span className="text-green-400">
                Instant
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          NOTES
      ========================================== */}
      {notes && (
        <div className="max-w-6xl mx-auto px-6 mt-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Notes
            </h2>

            <p className="text-gray-300 leading-7 `wrap break-words` ">
              {notes}
            </p>

          </div>

        </div>
      )}

      {/* ==========================================
          PAYMENT SUMMARY
      ========================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-8 mb-12">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Payment Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-300">
                Amount
              </span>

              <span>
                ₹{transferAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Transfer Fee
              </span>

              <span>₹0</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                GST
              </span>

              <span>₹0</span>
            </div>

            <hr className="border-white/20" />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>
                ₹{transferAmount.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              onClick={() => navigate(-1)}
              className="py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition"
            >
              Back
            </button>

            <button
              onClick={handleConfirm}
              disabled={
                balanceLoading ||
                transferAmount <= 0 ||
                transferAmount > availableBalance
              }
              className={`py-4 rounded-2xl font-semibold transition ${
                balanceLoading ||
                transferAmount <= 0 ||
                transferAmount > availableBalance
                  ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              }`}
            >
              {balanceLoading
                ? "Checking Balance..."
                : transferAmount > availableBalance
                ? "Insufficient Balance"
                : "Confirm Transfer →"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}