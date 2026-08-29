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
  const [balanceError, setBalanceError] = useState("");

  // ============================================================
  // LOAD PRIMARY BANK ACCOUNT BALANCE
  // BankAccount.balance is the SINGLE SOURCE OF TRUTH
  // ============================================================
  useEffect(() => {
    const loadBalance = async () => {
      try {
        setBalanceLoading(true);
        setBalanceError("");

        const response = await api.get("/accounts/primary");

        const account = response.data;

        const balance = Number(account?.balance ?? 0);

        if (!Number.isFinite(balance)) {
          throw new Error("Invalid account balance");
        }

        setAvailableBalance(balance);
      } catch (error) {
        console.error("Failed to load primary account:", error);

        setAvailableBalance(0);

        setBalanceError(
          error?.response?.data?.message ||
            "Unable to load your account balance."
        );
      } finally {
        setBalanceLoading(false);
      }
    };

    loadBalance();
  }, []);

  // ============================================================
  // DIRECT ACCESS PROTECTION
  // ============================================================
  if (!transferData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">

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

  // ============================================================
  // TRANSFER DATA
  // ============================================================
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

  const hasEnoughBalance =
    transferAmount > 0 &&
    transferAmount <= availableBalance;

  // ============================================================
  // CONFIRM TRANSFER
  // ============================================================
  const handleConfirm = () => {
    // Balance still loading
    if (balanceLoading) {
      alert(
        "Please wait while your balance is being verified."
      );
      return;
    }

    // Balance API failed
    if (balanceError) {
      alert(
        "Unable to verify your account balance. Please try again."
      );
      return;
    }

    // Invalid amount
    if (!transferAmount || transferAmount <= 0) {
      alert("Invalid transfer amount.");
      return;
    }

    // Recipient validation
    if (!recipientName) {
      alert("Recipient details are missing.");
      return;
    }

    // Account / UPI validation
    if (!recipientAccount) {
      alert(
        method === "upi"
          ? "Recipient UPI ID is missing."
          : "Recipient account number is missing."
      );
      return;
    }

    // Bank transfer IFSC validation
    if (method === "bank" && !ifsc) {
      alert("Recipient IFSC code is missing.");
      return;
    }

    // REAL BANK ACCOUNT BALANCE VALIDATION
    if (transferAmount > availableBalance) {
      alert(
        `Insufficient balance.\n\n` +
          `Available Balance: ₹${availableBalance.toLocaleString(
            "en-IN"
          )}\n` +
          `Transfer Amount: ₹${transferAmount.toLocaleString(
            "en-IN"
          )}`
      );
      return;
    }

    // ========================================================
    // GO TO TRANSACTION PIN
    // ========================================================
    navigate("/transaction-pin?type=transfer", {
      state: {
        // Transfer amount
        amount: transferAmount,

        // Transfer method
        method: method || "bank",

        // Recipient details
        recipientName,
        recipientAccount,
        recipientBank,
        ifsc,

        // Additional details
        purpose: purpose || "Personal",
        notes: notes || "",
        saveBeneficiary: Boolean(saveBeneficiary),

        // Current verified balance
        availableBalance,

        // Remaining balance for UI
        remainingBalance,

        // Keep complete transfer data
        transferData,
      },
    });
  };

  // ============================================================
  // FORMAT CURRENCY
  // ============================================================
  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ============================================================
  // UI
  // ============================================================
  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white overflow-x-hidden">

      {/* ========================================================
          HEADER
      ======================================================== */}
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

      {/* ========================================================
          FROM ACCOUNT
      ======================================================== */}
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
                Primary Bank Account
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <FaLock />
            </div>

          </div>

          {/* ====================================================
              BALANCE
          ==================================================== */}
          <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* AVAILABLE BALANCE */}
            <div>

              <p className="text-gray-300 text-sm">
                Available Balance
              </p>

              <h3 className="text-3xl font-bold mt-2">

                {balanceLoading
                  ? "Loading..."
                  : formatCurrency(availableBalance)}

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
                  : formatCurrency(
                      Math.max(remainingBalance, 0)
                    )}
              </h3>

            </div>

          </div>

          {/* ====================================================
              BALANCE ERROR
          ==================================================== */}
          {balanceError && (
            <div className="mt-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                  !
                </div>

                <div>
                  <p className="font-semibold text-red-400">
                    Unable to Verify Balance
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {balanceError}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ====================================================
              INSUFFICIENT BALANCE
          ==================================================== */}
          {!balanceLoading &&
            !balanceError &&
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
                      You need{" "}
                      {formatCurrency(
                        transferAmount -
                          availableBalance
                      )}{" "}
                      more to complete this transfer.
                    </p>

                  </div>

                </div>

              </div>
            )}

          {/* ====================================================
              ENOUGH BALANCE
          ==================================================== */}
          {!balanceLoading &&
            !balanceError &&
            hasEnoughBalance && (
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

      {/* ========================================================
          RECIPIENT
      ======================================================== */}
      <div className="max-w-6xl mx-auto px-6 mt-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold shrink-0">
                {recipientName?.charAt(0)?.toUpperCase() ||
                  "U"}
              </div>

              <div>

                <p className="text-gray-300 text-sm">
                  Recipient
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {recipientName || "-"}
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

      {/* ========================================================
          TRANSFER DETAILS
      ======================================================== */}
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
                {formatCurrency(transferAmount)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                Transfer Fee
              </span>

              <span>₹0.00</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">
                GST
              </span>

              <span>₹0.00</span>
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

      {/* ========================================================
          NOTES
      ======================================================== */}
      {notes && (
        <div className="max-w-6xl mx-auto px-6 mt-8">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-4">
              Notes
            </h2>

            <p className="text-gray-300 leading-7 break-words">
              {notes}
            </p>

          </div>

        </div>
      )}

      {/* ========================================================
          PAYMENT SUMMARY
      ======================================================== */}
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
                {formatCurrency(transferAmount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                Transfer Fee
              </span>

              <span>₹0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-300">
                GST
              </span>

              <span>₹0.00</span>
            </div>

            <hr className="border-white/20" />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span>
                {formatCurrency(transferAmount)}
              </span>

            </div>

          </div>

          {/* ====================================================
              BUTTONS
          ==================================================== */}
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
                Boolean(balanceError) ||
                transferAmount <= 0 ||
                transferAmount > availableBalance ||
                !recipientName ||
                !recipientAccount ||
                (method === "bank" && !ifsc)
              }
              className={`py-4 rounded-2xl font-semibold transition ${
                balanceLoading ||
                Boolean(balanceError) ||
                transferAmount <= 0 ||
                transferAmount > availableBalance ||
                !recipientName ||
                !recipientAccount ||
                (method === "bank" && !ifsc)
                  ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              }`}
            >
              {balanceLoading
                ? "Checking Balance..."
                : balanceError
                ? "Balance Unavailable"
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