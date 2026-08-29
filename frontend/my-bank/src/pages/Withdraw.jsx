import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaArrowLeft,
  FaWallet,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

export default function Withdraw() {
  const navigate = useNavigate();
  const location = useLocation();

  const [amount, setAmount] = useState("");

  // ==========================================
  // USER - NAME / EMAIL ONLY
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // BANK ACCOUNT
  // SINGLE SOURCE OF TRUTH FOR BALANCE
  // ==========================================

  const [bankAccount, setBankAccount] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // SUCCESS
  // ==========================================

  const [showSuccess, setShowSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState("");

  // ==========================================
  // GET USER + PRIMARY BANK ACCOUNT
  // ==========================================

  const fetchData = async () => {
    try {
      setLoading(true);

      const [userResponse, accountResponse] =
        await Promise.all([
          api.get("/auth/me"),
          api.get("/accounts/primary"),
        ]);

      // User is only used for name and email
      setUser(userResponse.data);

      // BankAccount is the balance source
      setBankAccount(accountResponse.data);

    } catch (error) {
      console.error(
        "Failed to fetch withdraw data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================
  // BANK ACCOUNT BALANCE
  // ==========================================

  const balance = Number(
    bankAccount?.balance || 0
  );

  // ==========================================
  // WITHDRAW
  // ==========================================

  const handleWithdraw = () => {
    const withdrawAmount = Number(amount);

    // Validate amount
    if (!amount || withdrawAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Check BankAccount balance
    if (withdrawAmount > balance) {
      alert(
        `Insufficient balance.\nAvailable Balance: ₹${balance.toLocaleString(
          "en-IN",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`
      );
      return;
    }

    // Go to Transaction PIN
    navigate("/transaction-pin?type=withdraw", {
      state: {
        amount: amount,
        method: "bank",
      },
    });
  };

  // ==========================================
  // SUCCESS
  // ==========================================

  useEffect(() => {
    if (location.state?.withdrawSuccess) {
      setSuccessAmount(
        location.state.amount || ""
      );

      setShowSuccess(true);

      // Refresh BankAccount balance
      fetchData();

      // Clear navigation state
      navigate("/withdraw", {
        replace: true,
        state: {},
      });
    }
  }, [location.state]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* ==========================================
          HEADER
      ========================================== */}

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
              Withdraw Money
            </h1>

            <p className="text-gray-400 mt-1">
              Withdraw money from your NeoBank Pro balance
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          MAIN
      ========================================== */}

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

          {/* ==========================================
              ACCOUNT HOLDER
          ========================================== */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 text-center">

            <p className="text-gray-400 text-sm">
              Account Holder
            </p>

            {loading ? (

              <div className="flex flex-col items-center mt-3">

                <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />

                <div className="h-4 w-52 bg-white/10 rounded animate-pulse mt-2" />

              </div>

            ) : (

              <div className="mt-3">

                <p className="font-semibold text-xl">
                  {user?.fullName || "User"}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {user?.email || ""}
                </p>

              </div>

            )}

          </div>

          {/* ==========================================
              WALLET ICON
          ========================================== */}

          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shadow-lg">

              <FaWallet className="text-blue-400 text-3xl" />

            </div>

          </div>

          {/* ==========================================
              BANK ACCOUNT BALANCE
          ========================================== */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">

            <p className="text-gray-400 text-sm">
              Available Balance
            </p>

            {loading ? (

              <div className="flex justify-center mt-3">

                <div className="h-9 w-40 bg-white/10 rounded animate-pulse" />

              </div>

            ) : (

              <h2 className="text-3xl font-bold mt-2">

                ₹
                {balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}

              </h2>

            )}

          </div>

          {/* ==========================================
              AMOUNT
          ========================================== */}

          <div className="mt-8">

            <label className="text-gray-300 text-sm">
              Withdraw Amount
            </label>

            <div className="relative mt-2">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                ₹
              </span>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                placeholder="Enter amount"
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-xl outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* ==========================================
              SECURITY
          ========================================== */}

          <div className="flex items-start gap-3 mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-green-400 mt-1 shrink-0" />

            <p className="text-xs text-gray-400 leading-5">
              Your withdrawal is securely protected.
              You will be asked to enter your 6-digit PIN
              before completing the transaction.
            </p>

          </div>

          {/* ==========================================
              SUMMARY
          ========================================== */}

          <div className="mt-6 bg-white/5 rounded-2xl p-5">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Withdrawal Amount
              </span>

              <span className="font-semibold">
                ₹{amount || "0"}
              </span>

            </div>

            <div className="flex justify-between mt-3">

              <span className="text-gray-400">
                Available Balance
              </span>

              <span className="font-semibold">
                ₹
                {balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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

          {/* ==========================================
              BUTTON
          ========================================== */}

          <button
            onClick={handleWithdraw}
            disabled={loading || !bankAccount}
            className="w-full mt-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {loading
              ? "Loading..."
              : "Withdraw Money"}

          </button>

        </div>

      </div>

      {/* ==========================================
          SUCCESS MODAL
      ========================================== */}

      {showSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-center shadow-2xl">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={34} />

            </div>

            <h2 className="text-2xl font-bold mt-5">
              Withdrawal Successful
            </h2>

            <p className="text-gray-400 mt-3">
              ₹{successAmount} has been withdrawn successfully.
            </p>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
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