import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import {
  FaArrowLeft,
  FaUniversity,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimes,
  FaCopy,
  FaExchangeAlt,
  FaHistory,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

export default function Accounts() {

  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showNumber, setShowNumber] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);


  // ==========================================
  // LOAD USER BANK ACCOUNT
  // ==========================================

  useEffect(() => {
    loadAccount();
  }, []);


  const loadAccount = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/accounts/primary");

      setAccount(response.data);

    } catch (err) {

      console.error("Account loading error:", err);

      if (err.response?.status === 401) {

        setError(
          "Your session has expired. Please login again."
        );

      } else if (err.response?.status === 404) {

        setError(
          "Bank account not found for this user."
        );

      } else {

        setError(
          err.response?.data?.message ||
          "Unable to load your bank account."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  // ==========================================
  // MASK ACCOUNT NUMBER
  // ==========================================

  const maskAccountNumber = (number) => {

    if (!number) return "**** **** ****";

    return `**** **** ${number.slice(-4)}`;
  };


  // ==========================================
  // FORMAT BALANCE
  // ==========================================

  const formatBalance = (balance) => {

    return Number(balance || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };


  // ==========================================
  // COPY ACCOUNT NUMBER
  // ==========================================

  const copyAccountNumber = async () => {

    if (!account?.accountNumber) return;

    try {

      await navigator.clipboard.writeText(
        account.accountNumber
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {

      console.error(
        "Failed to copy account number:",
        error
      );
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mx-auto" />

          <p className="text-gray-400 mt-5">
            Loading your bank account...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

        <div className="max-w-7xl mx-auto px-6 pt-8">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div className="max-w-lg mx-auto mt-24 text-center">

            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">

              <FaTimes size={26} />

            </div>

            <h2 className="text-2xl font-bold mt-6">
              Unable to Load Account
            </h2>

            <p className="text-gray-400 mt-3">
              {error}
            </p>

            <button
              onClick={loadAccount}
              className="mt-7 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // NO ACCOUNT
  // ==========================================

  if (!account) {

    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white flex items-center justify-center">

        <div className="text-center">

          <FaUniversity
            size={50}
            className="mx-auto text-blue-400"
          />

          <h2 className="text-2xl font-bold mt-5">
            No Bank Account Found
          </h2>

          <p className="text-gray-400 mt-2">
            Please contact NeoBank Pro support.
          </p>

        </div>

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* ==========================================
          HEADER
      ========================================== */}

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
              My Bank Account
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your NeoBank Pro account
            </p>

          </div>

        </div>

      </div>


      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* ==========================================
            PRIMARY BANK CARD
        ========================================== */}

        <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 shadow-xl">


          <div className="flex justify-between items-start">

            <div>

              <p className="text-white/70 text-sm">
                NeoBank Pro
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Savings Account
              </h2>

            </div>


            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

              <FaUniversity size={24} />

            </div>

          </div>


          {/* BALANCE */}

          <div className="mt-10">

            <p className="text-white/70 text-sm">
              Available Balance
            </p>

            <h1 className="text-4xl font-bold mt-2">

              ₹{formatBalance(account.balance)}

            </h1>

          </div>


          {/* ACCOUNT DETAILS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">


            {/* ACCOUNT NUMBER */}

            <div>

              <p className="text-white/60 text-sm">
                Account Number
              </p>

              <div className="flex items-center gap-3 mt-2">

                <p className="font-semibold tracking-wider">

                  {showNumber
                    ? account.accountNumber
                    : maskAccountNumber(
                        account.accountNumber
                      )}

                </p>


                <button
                  onClick={() =>
                    setShowNumber(!showNumber)
                  }
                  className="text-white/80 hover:text-white transition"
                  title={
                    showNumber
                      ? "Hide account number"
                      : "Show account number"
                  }
                >

                  {showNumber
                    ? <FaEyeSlash />
                    : <FaEye />}

                </button>


                <button
                  onClick={copyAccountNumber}
                  className="text-white/80 hover:text-white transition"
                  title="Copy account number"
                >

                  <FaCopy />

                </button>

              </div>


              {copied && (

                <p className="text-xs text-white/70 mt-2">
                  Account number copied
                </p>

              )}

            </div>


            {/* IFSC */}

            <div>

              <p className="text-white/60 text-sm">
                IFSC Code
              </p>

              <p className="font-semibold mt-2">
                {account.ifscCode}
              </p>

            </div>


            {/* STATUS */}

            <div>

              <p className="text-white/60 text-sm">
                Account Status
              </p>

              <div className="flex items-center gap-2 mt-2">

                <FaCheckCircle className="text-green-300" />

                <span className="font-semibold">
                  {account.status}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ==========================================
            ACCOUNT INFORMATION
        ========================================== */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            Account Information
          </h2>

          <p className="text-gray-400 mt-1">
            Your registered NeoBank Pro account details
          </p>


          <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              {/* ACCOUNT HOLDER */}

              <div>

                <p className="text-gray-400 text-sm">
                  Account Holder
                </p>

                <p className="font-semibold mt-2">
                  {account.accountHolderName}
                </p>

              </div>


              {/* ACCOUNT TYPE */}

              <div>

                <p className="text-gray-400 text-sm">
                  Account Type
                </p>

                <p className="font-semibold mt-2">
                  {account.accountType}
                </p>

              </div>


              {/* ACCOUNT NUMBER */}

              <div>

                <p className="text-gray-400 text-sm">
                  Account Number
                </p>

                <p className="font-semibold mt-2 tracking-wider">
                  {account.accountNumber}
                </p>

              </div>


              {/* IFSC */}

              <div>

                <p className="text-gray-400 text-sm">
                  IFSC Code
                </p>

                <p className="font-semibold mt-2">
                  {account.ifscCode}
                </p>

              </div>


              {/* STATUS */}

              <div>

                <p className="text-gray-400 text-sm">
                  Status
                </p>

                <p className="text-green-400 font-semibold mt-2">
                  {account.status}
                </p>

              </div>


              {/* PRIMARY */}

              <div>

                <p className="text-gray-400 text-sm">
                  Account Role
                </p>

                <p className="font-semibold mt-2">
                  {account.primary
                    ? "Primary Account"
                    : "Linked Account"}
                </p>

              </div>


              {/* CREATED DATE */}

              <div>

                <p className="text-gray-400 text-sm">
                  Account Opened
                </p>

                <p className="font-semibold mt-2">

                  {account.createdAt
                    ? new Date(
                        account.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "—"}

                </p>

              </div>


              {/* BALANCE */}

              <div>

                <p className="text-gray-400 text-sm">
                  Current Balance
                </p>

                <p className="font-semibold mt-2">
                  ₹{formatBalance(account.balance)}
                </p>

              </div>

            </div>


            <button
              onClick={() => setShowDetails(true)}
              className="mt-7 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              View Full Account Details
            </button>

          </div>

        </div>


        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="text-gray-400 mt-1">
            Manage your money
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">


            <button
              onClick={() => navigate("/transfer")}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/15 transition"
            >

              <FaExchangeAlt
                className="text-blue-400"
                size={22}
              />

              <h3 className="font-semibold mt-4">
                Transfer Money
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Send money to another account
              </p>

            </button>


            <button
              onClick={() => navigate("/deposit")}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/15 transition"
            >

              <FaMoneyBillWave
                className="text-green-400"
                size={22}
              />

              <h3 className="font-semibold mt-4">
                Deposit
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Add money to your account
              </p>

            </button>


            <button
              onClick={() => navigate("/withdraw")}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/15 transition"
            >

              <FaWallet
                className="text-yellow-400"
                size={22}
              />

              <h3 className="font-semibold mt-4">
                Withdraw
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Withdraw money from your account
              </p>

            </button>


            <button
              onClick={() => navigate("/Transactions-History")}
              className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left hover:bg-white/15 transition"
            >

              <FaHistory
                className="text-purple-400"
                size={22}
              />

              <h3 className="font-semibold mt-4">
                Transactions
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                View your transaction history
              </p>

            </button>

          </div>

        </div>


        {/* ==========================================
            SECURITY NOTICE
        ========================================== */}

        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex gap-3">

          <FaCheckCircle className="text-green-400 mt-1" />

          <div>

            <h3 className="font-semibold">
              Your account is secure
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Your account information is protected
              by NeoBank Pro authentication and
              authorization.
            </p>

          </div>

        </div>

      </div>


      {/* ==========================================
          FULL DETAILS MODAL
      ========================================== */}

      {showDetails && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


          <div
            onClick={() => setShowDetails(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />


          <div className="relative w-full max-w-lg bg-[#102E5B] border border-white/20 rounded-3xl p-8">


            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >

              <FaTimes />

            </button>


            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">

              <FaUniversity size={26} />

            </div>


            <h2 className="text-2xl font-bold mt-5">
              Full Account Details
            </h2>


            <div className="mt-7 space-y-5">


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Account Holder
                </span>

                <span className="font-semibold text-right">
                  {account.accountHolderName}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Account Number
                </span>

                <span className="font-semibold">
                  {account.accountNumber}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  IFSC Code
                </span>

                <span className="font-semibold">
                  {account.ifscCode}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Account Type
                </span>

                <span className="font-semibold">
                  {account.accountType}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Balance
                </span>

                <span className="font-semibold">
                  ₹{formatBalance(account.balance)}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Status
                </span>

                <span className="text-green-400 font-semibold">
                  {account.status}
                </span>

              </div>


              <div className="flex justify-between gap-5">

                <span className="text-gray-400">
                  Account Role
                </span>

                <span className="font-semibold">
                  {account.primary
                    ? "Primary"
                    : "Linked"}
                </span>

              </div>

            </div>


            <button
              onClick={() => setShowDetails(false)}
              className="w-full mt-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}