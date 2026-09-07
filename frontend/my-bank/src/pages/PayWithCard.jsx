
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaGlobe,
  FaStore,
  FaMoneyBillWave,
  FaSpinner,
} from "react-icons/fa";

import api from "../services/api";

const PayWithCard = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("ONLINE");
  const [pin, setPin] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const fetchCards = async (showLoading = false) => {
    try {
      if (showLoading) setLoadingCards(true);

      const response = await api.get("/cards");
      const cardData = Array.isArray(response.data)
        ? response.data
        : [];

      const activeCards = cardData.filter(
        (card) => card.status === "ACTIVE"
      );

      setCards(activeCards);

      setSelectedCardId((currentSelectedId) => {
        const selectedStillExists = activeCards.some(
          (card) =>
            String(card.id) === String(currentSelectedId)
        );

        if (selectedStillExists) return currentSelectedId;

        if (activeCards.length > 0) {
          return String(activeCards[0].id);
        }

        return "";
      });

      return activeCards;
    } catch (err) {
      console.error("Failed to load cards:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to load your cards"
      );

      return [];
    } finally {
      if (showLoading) setLoadingCards(false);
    }
  };

  useEffect(() => {
    fetchCards(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!processing && !success) {
        fetchCards(false);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [processing, success]);

  const selectedCard =
    cards.find(
      (card) =>
        String(card.id) === String(selectedCardId)
    ) || null;

  useEffect(() => {
    if (!selectedCard) return;

    if (
      paymentType === "ONLINE" &&
      selectedCard.onlineEnabled === false
    ) {
      if (selectedCard.posEnabled) {
        setPaymentType("POS");
      }
    }

    if (
      paymentType === "POS" &&
      selectedCard.posEnabled === false
    ) {
      if (selectedCard.onlineEnabled) {
        setPaymentType("ONLINE");
      }
    }
  }, [selectedCard, paymentType]);

  const getMaskedCardNumber = (card) => {
    if (!card?.cardNumber) {
      return "**** **** **** ****";
    }

    const number = String(card.cardNumber).replace(/\s/g, "");

    if (number.length >= 4) {
      return `**** **** **** ${number.slice(-4)}`;
    }

    return "**** **** **** ****";
  };

  const formatAmount = (value) => {
    const number = Number(value || 0);

    if (Number.isNaN(number)) return "0.00";

    return number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^\d.]/g, "");

    const parts = value.split(".");

    if (parts.length > 2) {
      value =
        parts[0] +
        "." +
        parts.slice(1).join("");
    }

    if (value.includes(".")) {
      const [whole, decimal] = value.split(".");

      value =
        whole +
        "." +
        decimal.slice(0, 2);
    }

    setAmount(value);
    setError("");
  };

  const handlePinChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 4);

    setPin(value);
    setError("");
  };

  const validatePayment = () => {
    if (!selectedCard) {
      setError("Please select an active card");
      return false;
    }

    if (selectedCard.status !== "ACTIVE") {
      setError("This card is no longer active");
      return false;
    }

    if (!selectedCard.pinSet) {
      setError(
        "Please set your card PIN before making a payment"
      );
      return false;
    }

    if (!merchantName.trim()) {
      setError("Please enter merchant name");
      return false;
    }

    const numericAmount = Number(amount);

    if (
      !amount ||
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      setError(
        "Please enter an amount greater than ₹0"
      );
      return false;
    }

    if (
      paymentType === "ONLINE" &&
      selectedCard.onlineEnabled === false
    ) {
      setError(
        "Online payments are disabled for this card"
      );
      return false;
    }

    if (
      paymentType === "POS" &&
      selectedCard.posEnabled === false
    ) {
      setError(
        "POS payments are disabled for this card"
      );
      return false;
    }

    if (!/^\d{4}$/.test(pin)) {
      setError(
        "Card PIN must contain exactly 4 digits"
      );
      return false;
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(null);

    if (!validatePayment()) return;

    try {
      setProcessing(true);

      const response = await api.post(
        "/card-payments",
        {
          cardId: Number(selectedCard.id),
          amount: Number(amount),
          merchantName: merchantName.trim(),
          paymentType,
          pin,
        }
      );

      if (response.data?.success === false) {
        setError(
          response.data?.message ||
            "Payment failed"
        );
        return;
      }

      // Refresh latest card state after successful payment
      await fetchCards(false);

      // Keep only the original payment response.
      // Monthly Limit / Used / Remaining are not added here.
      setSuccess(response.data);

      setMerchantName("");
      setAmount("");
      setPin("");
    } catch (err) {
      console.error("Payment failed:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response?.data ||
        "Payment failed. Please try again.";

      setError(
        typeof message === "string"
          ? message
          : "Payment failed. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (success?.success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white px-4 py-8">
        <div className="max-w-xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/cards")}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-8"
          >
            <FaArrowLeft />
            Back to Cards
          </button>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <FaCheckCircle className="text-green-400 text-5xl" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">
              Payment Successful
            </h1>

            <p className="text-slate-400 mb-8">
              Your card payment has been completed successfully.
            </p>

            <div className="bg-slate-800/70 rounded-2xl p-5 text-left space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">
                  Merchant
                </span>

                <span className="font-semibold text-right">
                  {success.merchantName}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">
                  Amount
                </span>

                <span className="font-bold text-xl text-green-400">
                  ₹{formatAmount(success.amount)}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">
                  Card
                </span>

                <span>
                  {success.cardNumber}
                </span>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <span className="text-slate-400 block mb-2">
                  Transaction ID
                </span>

                <span className="text-xs font-mono break-all text-cyan-400">
                  {success.transactionId}
                </span>
              </div>

              {success.remainingBalance !== null &&
                success.remainingBalance !== undefined && (
                  <div className="flex justify-between border-t border-slate-700 pt-4 gap-4">
                    <span className="text-slate-400">
                      Remaining Balance
                    </span>

                    <span className="font-bold text-green-400">
                      ₹{formatAmount(
                        success.remainingBalance
                      )}
                    </span>
                  </div>
                )}

              {success.availableCredit !== null &&
                success.availableCredit !== undefined && (
                  <div className="flex justify-between border-t border-slate-700 pt-4 gap-4">
                    <span className="text-slate-400">
                      Available Credit
                    </span>

                    <span className="font-bold text-green-400">
                      ₹{formatAmount(
                        success.availableCredit
                      )}
                    </span>
                  </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                type="button"
                onClick={async () => {
                  setSuccess(null);
                  setError("");
                  await fetchCards(true);
                }}
                className="py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold"
              >
                Make Another Payment
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/Transactions-History")
                }
                className="py-3 rounded-xl bg-slate-700 hover:bg-slate-600 font-semibold"
              >
                Transaction History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              type="button"
              onClick={() => navigate("/cards")}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-4"
            >
              <FaArrowLeft />
              Back to Cards
            </button>

            <h1 className="text-3xl font-bold">
              Pay With Card
            </h1>

            <p className="text-slate-400 mt-1">
              Make a secure payment using your NeoBank card.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-green-400">
            <FaShieldAlt />

            <span className="text-sm">
              Secure Payment
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            <FaTimesCircle />
            <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-slate-800 border border-slate-600 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <FaCreditCard className="text-blue-400 text-xl" />

                <div>
                  <h2 className="text-xl font-semibold">
                    Select Card
                  </h2>

                  <p className="text-sm text-slate-400">
                    Choose the card you want to use
                  </p>
                </div>
              </div>

              {loadingCards ? (
                <div className="py-10 text-center text-slate-400">
                  Loading your cards...
                </div>
              ) : cards.length === 0 ? (
                <div className="py-10 text-center">
                  <FaCreditCard className="mx-auto text-4xl text-slate-600 mb-4" />

                  <p className="text-slate-400 mb-5">
                    You don't have any active cards.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/cards")}
                    className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold"
                  >
                    Manage Cards
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cards.map((card) => {
                    const selected =
                      String(card.id) ===
                      String(selectedCardId);

                    return (
                      <button
                        key={card.id}
                        type="button"
                        disabled={processing}
                        onClick={() => {
                          setSelectedCardId(
                            String(card.id)
                          );

                          setError("");
                        }}
                        className={`w-full text-left rounded-2xl p-5 border transition disabled:opacity-60 ${
                          selected
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                              <FaCreditCard className="text-xl" />
                            </div>

                            <div>
                              <p className="font-semibold">
                                {card.cardType}{" "}
                                {card.cardVariant}
                              </p>

                              <p className="text-slate-400 font-mono text-sm mt-1">
                                {getMaskedCardNumber(card)}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              selected
                                ? "border-blue-500"
                                : "border-slate-600"
                            }`}
                          >
                            {selected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedCard && (
              <div className="mt-6 bg-slate-800 border border-slate-600 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <FaShieldAlt className="text-green-400" />

                  <h3 className="font-semibold">
                    Latest Card Status
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/40 rounded-xl p-4">
                    <p className="text-xs text-slate-500">
                      ONLINE
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        selectedCard.onlineEnabled
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedCard.onlineEnabled
                        ? "Enabled"
                        : "Disabled"}
                    </p>
                  </div>

                  <div className="bg-slate-900/40 rounded-xl p-4">
                    <p className="text-xs text-slate-500">
                      POS
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        selectedCard.posEnabled
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {selectedCard.posEnabled
                        ? "Enabled"
                        : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <form
              onSubmit={handlePayment}
              className="bg-slate-800 border border-slate-600 rounded-3xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaMoneyBillWave className="text-green-400 text-xl" />

                <div>
                  <h2 className="text-xl font-semibold">
                    Payment Details
                  </h2>

                  <p className="text-sm text-slate-400">
                    Enter payment information
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-slate-400 mb-2">
                  Merchant Name
                </label>

                <div className="relative">
                  <FaStore className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="text"
                    value={merchantName}
                    disabled={processing}
                    onChange={(e) => {
                      setMerchantName(e.target.value);
                      setError("");
                    }}
                    maxLength={100}
                    placeholder="Amazon, Flipkart, Restaurant..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-slate-400 mb-2">
                  Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                    ₹
                  </span>

                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    disabled={processing}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-slate-400 mb-2">
                  Payment Type
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={
                      processing ||
                      selectedCard?.onlineEnabled === false
                    }
                    onClick={() => {
                      setPaymentType("ONLINE");
                      setError("");
                    }}
                    className={`p-4 rounded-xl border disabled:opacity-40 disabled:cursor-not-allowed ${
                      paymentType === "ONLINE"
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-800"
                    }`}
                  >
                    <FaGlobe className="mx-auto mb-2 text-xl" />

                    <p className="font-semibold">
                      Online
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Online purchase
                    </p>
                  </button>

                  <button
                    type="button"
                    disabled={
                      processing ||
                      selectedCard?.posEnabled === false
                    }
                    onClick={() => {
                      setPaymentType("POS");
                      setError("");
                    }}
                    className={`p-4 rounded-xl border disabled:opacity-40 disabled:cursor-not-allowed ${
                      paymentType === "POS"
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 bg-slate-800"
                    }`}
                  >
                    <FaStore className="mx-auto mb-2 text-xl" />

                    <p className="font-semibold">
                      POS
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Store payment
                    </p>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">
                  Card PIN
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={pin}
                    disabled={processing}
                    onChange={handlePinChange}
                    placeholder="••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 tracking-[0.5em] outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Enter your 4-digit card PIN.
                </p>
              </div>

              {selectedCard &&
                amount &&
                Number(amount) > 0 && (
                  <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between mb-2 gap-4">
                      <span className="text-slate-400">
                        Card
                      </span>

                      <span className="font-mono text-sm text-right">
                        {getMaskedCardNumber(
                          selectedCard
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">
                        Payment Type
                      </span>

                      <span>{paymentType}</span>
                    </div>

                    <div className="flex justify-between border-t border-slate-700 pt-3 mt-3">
                      <span className="font-semibold">
                        Total
                      </span>

                      <span className="text-xl font-bold">
                        ₹{formatAmount(amount)}
                      </span>
                    </div>
                  </div>
                )}

              <button
                type="submit"
                disabled={
                  processing ||
                  loadingCards ||
                  !selectedCard ||
                  cards.length === 0
                }
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed font-bold text-lg transition flex items-center justify-center gap-3"
              >
                {processing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FaLock />
                    Pay Securely
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-5 text-xs text-slate-500">
                <FaShieldAlt />
                Your payment is protected by NeoBank security.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayWithCard;

