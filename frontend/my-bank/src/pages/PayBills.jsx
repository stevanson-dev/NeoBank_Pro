import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import {
  FaArrowLeft,
  FaBolt,
  FaTint,
  FaWifi,
  FaMobileAlt,
  FaCheckCircle,
  FaReceipt,
  FaHistory,
  FaShieldAlt,
  FaUser,
} from "react-icons/fa";

export default function PayBills() {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState("Electricity");
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState("");
  const [successCategory, setSuccessCategory] = useState("");
  const [successProvider, setSuccessProvider] = useState("");
  const [successAccountNumber, setSuccessAccountNumber] =
    useState("");
  const [paymentId, setPaymentId] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  // ========================================
  // RECENT BILL PAYMENTS
  // ========================================

  const [recentBills, setRecentBills] = useState([]);

  // ========================================
  // BILL CATEGORIES
  // ========================================

  const categories = [
    {
      name: "Electricity",
      icon: <FaBolt />,
      accountLabel: "Consumer Number",
      placeholder: "Enter consumer number",
      maxLength: 20,
    },
    {
      name: "Water",
      icon: <FaTint />,
      accountLabel: "Consumer ID",
      placeholder: "Enter consumer ID",
      maxLength: 20,
    },
    {
      name: "Internet",
      icon: <FaWifi />,
      accountLabel: "Customer ID",
      placeholder: "Enter customer ID",
      maxLength: 20,
    },
    {
      name: "Mobile",
      icon: <FaMobileAlt />,
      accountLabel: "Mobile Number",
      placeholder: "Enter 10-digit mobile number",
      maxLength: 10,
    },
  ];

  // ========================================
  // PROVIDERS
  // ========================================

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

  // ========================================
  // QUICK AMOUNTS
  // ========================================

  const quickAmounts = [
    299,
    499,
    999,
    1499,
  ];

  // ========================================
  // CURRENT CATEGORY
  // ========================================

  const currentCategory =
    categories.find(
      (item) => item.name === category
    );

  // ========================================
  // ACCOUNT LABEL
  // ========================================

  const getAccountLabel = () => {
    return (
      currentCategory?.accountLabel ||
      "Account Number"
    );
  };

  // ========================================
  // ACCOUNT PLACEHOLDER
  // ========================================

  const getAccountPlaceholder = () => {
    return (
      currentCategory?.placeholder ||
      "Enter account number"
    );
  };

  // ========================================
  // CATEGORY CHANGE
  // ========================================

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setProvider("");
    setAccountNumber("");
    setAmount("");
  };

  // ========================================
  // ACCOUNT NUMBER CHANGE
  // ========================================

  const handleAccountNumberChange = (e) => {
    let value = e.target.value;

    if (category === "Mobile") {
      value = value
        .replace(/\D/g, "")
        .slice(0, 10);
    } else {
      value = value.slice(
        0,
        currentCategory?.maxLength || 20
      );
    }

    setAccountNumber(value);
  };

  // ========================================
  // AMOUNT CHANGE
  // ========================================

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (
      value === "" ||
      /^\d+(\.\d{0,2})?$/.test(value)
    ) {
      setAmount(value);
    }
  };

  // ========================================
  // FORM VALIDATION
  // ========================================

  const validateForm = () => {
    if (!provider) {
      alert("Please select a provider.");
      return false;
    }

    if (!accountNumber.trim()) {
      alert(
        `Please enter your ${getAccountLabel().toLowerCase()}.`
      );
      return false;
    }

    if (
      category === "Mobile" &&
      accountNumber.length !== 10
    ) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );
      return false;
    }

    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert("Please enter a valid amount.");
      return false;
    }

    if (Number(amount) > 100000) {
      alert(
        "Maximum bill payment allowed is ₹1,00,000."
      );
      return false;
    }

    return true;
  };

  // ========================================
  // PAY BILL
  // ========================================

  const handlePayBill = () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      navigate(
        "/transaction-pin?type=bill",
        {
          state: {
            amount: amount,
            category: category,
            provider: provider,
            accountNumber: accountNumber,
          },
        }
      );
    }, 500);
  };

  // ========================================
  // FETCH RECENT BILL PAYMENTS
  // ========================================

  useEffect(() => {
    const fetchRecentBills = async () => {
      try {
        const response =
          await api.get("/transactions");

        const bills =
          response.data
            .filter(
              (transaction) =>
                transaction.type ===
                "BILL_PAYMENT"
            )
            .slice(0, 3);

        setRecentBills(bills);

      } catch (error) {
        console.error(
          "Failed to fetch recent bill payments:",
          error
        );
      }
    };

    fetchRecentBills();

    // ========================================
    // BILL SUCCESS
    // ========================================

    if (location.state?.billSuccess) {
      setSuccessAmount(
        location.state.amount || ""
      );

      setSuccessCategory(
        location.state.category || ""
      );

      setSuccessProvider(
        location.state.provider || ""
      );

      setSuccessAccountNumber(
        location.state.accountNumber || ""
      );

      setPaymentId(
        location.state.paymentId ||
        `BILL${Date.now()
          .toString()
          .slice(-8)}`
      );

      setShowSuccess(true);

      navigate(
        "/pay-bills",
        {
          replace: true,
          state: {},
        }
      );
    }
  }, [location.state, navigate]);

  // ========================================
  // FORMAT ACCOUNT NUMBER
  // ========================================

  const formatAccountNumber = (value) => {
    if (!value) {
      return "Not provided";
    }

    if (category === "Mobile") {
      return value;
    }

    if (value.length <= 8) {
      return value;
    }

    return `${value.slice(
      0,
      4
    )} **** ${value.slice(-4)}`;
  };

  // ========================================
  // GET BILL ICON
  // ========================================

  const getBillIcon = (billCategory) => {
    if (billCategory === "Electricity") {
      return <FaBolt />;
    }

    if (billCategory === "Water") {
      return <FaTint />;
    }

    if (billCategory === "Internet") {
      return <FaWifi />;
    }

    if (billCategory === "Mobile") {
      return <FaMobileAlt />;
    }

    return <FaReceipt />;
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="max-w-6xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
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

      {/* ========================================
          MAIN
      ======================================== */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ========================================
              LEFT SECTION
          ======================================== */}

          <div className="lg:col-span-2 space-y-6">

            {/* ========================================
                BILL FORM
            ======================================== */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Select Bill Category
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    Choose the type of bill you want to pay
                  </p>

                </div>

                <div className="hidden sm:flex items-center gap-2 text-green-400 text-sm">
                  <FaShieldAlt />
                  Secure Payment
                </div>

              </div>

              {/* ========================================
                  CATEGORIES
              ======================================== */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                {categories.map((item) => (

                  <button
                    key={item.name}
                    onClick={() =>
                      handleCategoryChange(
                        item.name
                      )
                    }
                    className={`p-5 rounded-2xl border transition ${
                      category === item.name
                        ? "border-blue-500 bg-blue-600/20 shadow-lg shadow-blue-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >

                    <div
                      className={`text-2xl flex justify-center ${
                        category === item.name
                          ? "text-blue-400"
                          : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <p className="text-sm mt-3">
                      {item.name}
                    </p>

                  </button>

                ))}

              </div>

              {/* ========================================
                  PROVIDER
              ======================================== */}

              <div className="mt-8">

                <label className="text-gray-300 text-sm">
                  Select Provider
                </label>

                <select
                  value={provider}
                  onChange={(e) =>
                    setProvider(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 bg-[#102E5B] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
                >

                  <option value="">
                    Select {category} provider
                  </option>

                  {providers[category].map(
                    (item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* ========================================
                  ACCOUNT NUMBER
              ======================================== */}

              <div className="mt-6">

                <label className="text-gray-300 text-sm">
                  {getAccountLabel()}
                </label>

                <div className="relative mt-2">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </span>

                  <input
                    type={
                      category === "Mobile"
                        ? "tel"
                        : "text"
                    }
                    value={accountNumber}
                    onChange={
                      handleAccountNumberChange
                    }
                    placeholder={
                      getAccountPlaceholder()
                    }
                    className="w-full bg-white/10 border border-white/10 rounded-xl pl-11 pr-4 py-4 outline-none focus:border-blue-500 transition"
                  />

                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Your details are protected with secure encryption.
                </p>

              </div>

              {/* ========================================
                  AMOUNT
              ======================================== */}

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
                    min="1"
                    max="100000"
                    value={amount}
                    onChange={
                      handleAmountChange
                    }
                    placeholder="Enter bill amount"
                    className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-xl outline-none focus:border-blue-500 transition"
                  />

                </div>

                {/* QUICK AMOUNTS */}

                <div className="flex flex-wrap gap-2 mt-4">

                  {quickAmounts.map(
                    (quickAmount) => (

                      <button
                        key={quickAmount}
                        onClick={() =>
                          setAmount(
                            String(
                              quickAmount
                            )
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-sm border transition ${
                          Number(amount) ===
                          quickAmount
                            ? "bg-blue-600 border-blue-500"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        ₹{quickAmount}
                      </button>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* ========================================
                SECURITY INFO
            ======================================== */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
                  <FaShieldAlt />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Safe & Secure Payments
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Your bill payment is protected by transaction PIN
                    verification. Never share your PIN with anyone.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ========================================
              RIGHT SECTION
          ======================================== */}

          <div className="space-y-6">

            {/* ========================================
                PAYMENT SUMMARY
            ======================================== */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FaReceipt />
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Payment Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    Review before payment
                  </p>

                </div>

              </div>

              <div className="mt-7 space-y-5">

                {/* CATEGORY */}

                <div className="flex justify-between items-start gap-4">

                  <span className="text-gray-400">
                    Category
                  </span>

                  <span className="font-semibold text-right">
                    {category}
                  </span>

                </div>

                {/* PROVIDER */}

                <div className="flex justify-between items-start gap-4">

                  <span className="text-gray-400">
                    Provider
                  </span>

                  <span className="font-semibold text-right max-w-40 wrap-break-words">
                    {provider ||
                      "Not selected"}
                  </span>

                </div>

                {/* ACCOUNT */}

                <div className="flex justify-between items-start gap-4">

                  <span className="text-gray-400">
                    {getAccountLabel()}
                  </span>

                  <span className="font-semibold text-right max-w-40 wrap-break-words">
                    {formatAccountNumber(
                      accountNumber
                    )}
                  </span>

                </div>

                {/* AMOUNT */}

                <div className="flex justify-between items-center">

                  <span className="text-gray-400">
                    Amount
                  </span>

                  <span className="font-semibold">
                    ₹{amount || "0"}
                  </span>

                </div>

                {/* TOTAL */}

                <div className="border-t border-white/10 pt-5 flex justify-between items-center">

                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-blue-400">
                    ₹{amount || "0"}
                  </span>

                </div>

              </div>

              {/* PAY BUTTON */}

              <button
                onClick={handlePayBill}
                disabled={isProcessing}
                className={`w-full mt-7 py-4 rounded-xl transition font-semibold text-lg ${
                  isProcessing
                    ? "bg-blue-800 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isProcessing
                  ? "Opening Secure Verification..."
                  : "Pay Bill"}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                You will be asked to enter your transaction PIN.
              </p>

            </div>

            {/* ========================================
                RECENT BILL PAYMENTS
            ======================================== */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <FaHistory />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Recent Bill Payments
                  </h3>

                  <p className="text-xs text-gray-500">
                    Your recent activity
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-3">

                {recentBills.length === 0 ? (

                  <div className="text-center py-6">

                    <FaReceipt className="mx-auto text-gray-500 text-2xl mb-3" />

                    <p className="text-gray-400 text-sm">
                      No recent bill payments
                    </p>

                  </div>

                ) : (

                  recentBills.map((bill) => (

                    <div
                      key={bill.transactionId}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">

                          {getBillIcon(
                            bill.billCategory
                          )}

                        </div>

                        <div>

                          <p className="text-sm font-medium">
                            {bill.billCategory ||
                              "Bill Payment"}
                          </p>

                          <p className="text-xs text-gray-500">
                            {bill.billProvider ||
                              bill.method ||
                              "Provider"}
                          </p>

                        </div>

                      </div>

                      <span className="text-sm font-semibold">
                        ₹
                        {Number(
                          bill.amount || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================
          SUCCESS MODAL
      ======================================== */}

      {showSuccess && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* BACKGROUND */}

          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

          {/* MODAL */}

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8">

            {/* SUCCESS ICON */}

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">

              <FaCheckCircle size={34} />

            </div>

            <h2 className="text-2xl font-bold mt-5 text-center">
              Payment Successful
            </h2>

            <p className="text-gray-400 mt-3 text-center">
              Your bill payment has been completed successfully.
            </p>

            {/* PAYMENT DETAILS */}

            <div className="mt-7 bg-white/5 rounded-2xl p-5 space-y-4">

              {/* AMOUNT */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Amount
                </span>

                <span className="font-bold text-green-400">
                  ₹{successAmount}
                </span>

              </div>

              {/* CATEGORY */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Category
                </span>

                <span className="font-semibold text-right">
                  {successCategory}
                </span>

              </div>

              {/* PROVIDER */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Provider
                </span>

                <span className="font-semibold text-right max-w-40 wrap-break-words">
                  {successProvider}
                </span>

              </div>

              {/* ACCOUNT */}

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Account
                </span>

                <span className="font-semibold text-right max-w-40 wrap-break-words">
                  {successAccountNumber ||
                    "N/A"}
                </span>

              </div>

              {/* PAYMENT ID */}

              <div className="border-t border-white/10 pt-4 flex justify-between gap-4">

                <span className="text-gray-400">
                  Payment ID
                </span>

                <span className="font-mono text-xs text-gray-300 text-right">
                  {paymentId}
                </span>

              </div>

            </div>

            {/* BACK TO DASHBOARD */}

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="w-full mt-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Back to Dashboard
            </button>

            {/* PAY ANOTHER BILL */}

            <button
              onClick={() => {

                setShowSuccess(false);

                setCategory("Electricity");
                setProvider("");
                setAccountNumber("");
                setAmount("");

              }}
              className="w-full mt-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm"
            >
              Pay Another Bill
            </button>

          </div>

        </div>

      )}

    </div>
  );
}