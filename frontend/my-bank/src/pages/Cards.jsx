
import { useEffect, useState } from "react";
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
  FaGlobe,
  FaWifi,
  FaMobileAlt,
  FaUniversity,
  FaShieldAlt,
  FaBan,
  FaWallet,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../services/api";

export default function Cards() {
  const navigate = useNavigate();

  // =====================================================
  // CARD DATA
  // =====================================================

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // SELECTED CARD
  // =====================================================

  const [selectedCardId, setSelectedCardId] = useState(null);

  // =====================================================
  // CVV
  // =====================================================

  const [showCVV, setShowCVV] = useState(false);

  // =====================================================
  // MODAL
  // =====================================================

  const [activeModal, setActiveModal] = useState(null);

  // =====================================================
  // MONTHLY LIMIT
  // =====================================================

  const [newLimit, setNewLimit] = useState("");

  // =====================================================
  // PIN
  // =====================================================

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");

  // =====================================================
  // FORGOT PIN
  // =====================================================

  const [accountPassword, setAccountPassword] = useState("");
  const [forgotNewPin, setForgotNewPin] = useState("");
  const [forgotConfirmPin, setForgotConfirmPin] = useState("");

  // =====================================================
  // ACTION LOADING
  // =====================================================

  const [actionLoading, setActionLoading] = useState(false);

  // =====================================================
  // ACTION MESSAGE
  // =====================================================

  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // CARD SLOT ORDER
  // =====================================================

  const cardSlots = [
    {
      cardType: "DEBIT",
      variant: "VIRTUAL",
      title: "Virtual Debit Card",
      description: "Active immediately",
      order: 0,
    },
    {
      cardType: "DEBIT",
      variant: "PHYSICAL",
      title: "Physical Debit Card",
      description: "Physical delivery",
      order: 1,
    },
    {
      cardType: "CREDIT",
      variant: "VIRTUAL",
      title: "Virtual Credit Card",
      description: "Credit limit ₹50,000",
      order: 2,
    },
    {
      cardType: "CREDIT",
      variant: "PHYSICAL",
      title: "Physical Credit Card",
      description: "Credit limit ₹50,000",
      order: 3,
    },
  ];

  // =====================================================
  // SLOT KEY
  // =====================================================

  const getSlotKey = (cardType, variant) => {
    return `${cardType}_${variant}`;
  };

  // =====================================================
  // GET CURRENT USABLE CARD
  // =====================================================

  const getCurrentUsableCard = (
    cardList,
    cardType,
    variant
  ) => {
    const matchingCards = cardList.filter(
      (card) =>
        card.cardType === cardType &&
        card.cardVariant === variant
    );

    if (matchingCards.length === 0) {
      return null;
    }

    const usableCards = matchingCards.filter(
      (card) =>
        card.status === "ACTIVE" ||
        card.status === "FROZEN" ||
        card.status === "PENDING"
    );

    if (usableCards.length > 0) {
      return [...usableCards].sort(
        (a, b) =>
          Number(b.id || 0) -
          Number(a.id || 0)
      )[0];
    }

    return null;
  };

  // =====================================================
  // GET VISIBLE MAIN CARDS
  // =====================================================

  const getVisibleMainCards = (cardList) => {
    const visible = [];

    cardSlots.forEach((slot) => {
      const currentCard = getCurrentUsableCard(
        cardList,
        slot.cardType,
        slot.variant
      );

      if (currentCard) {
        visible.push(currentCard);
      }
    });

    return visible;
  };

  // =====================================================
  // FETCH CARDS
  // =====================================================

  const fetchCards = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const response = await api.get("/cards");

      const cardData = Array.isArray(response.data)
        ? response.data
        : [];
        

      // Keep ALL cards.
      // BLOCKED / EXPIRED cards remain in state.
      setCards(cardData);

      const visibleCards =
        getVisibleMainCards(cardData);

      if (visibleCards.length > 0) {
        setSelectedCardId((previousId) => {
          const previousStillVisible =
            visibleCards.some(
              (card) =>
                String(card.id) ===
                String(previousId)
            );

          if (previousStillVisible) {
            return previousId;
          }

          return visibleCards[0].id;
        });
      } else {
        setSelectedCardId(null);
      }
    } catch (err) {
      console.error(
        "Failed to fetch cards:",
        err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else if (err.response?.status === 403) {
        setError(
          "You are not authorized to access your cards."
        );
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            (typeof err.response?.data === "string"
              ? err.response.data
              : "Unable to load your cards.")
        );
      }
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  // =====================================================
  // INITIAL LOAD + REAL TIME REFRESH
  // =====================================================

  useEffect(() => {
    fetchCards(true);

    const interval = setInterval(() => {
      fetchCards(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  const showSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // =====================================================
  // VISIBLE MAIN CARDS
  // =====================================================

  const visibleMainCards =
    getVisibleMainCards(cards);

  // =====================================================
  // SELECTED CARD
  // =====================================================

  const selectedCard =
    visibleMainCards.find(
      (card) =>
        String(card.id) ===
        String(selectedCardId)
    ) ||
    visibleMainCards[0] ||
    null;

  // =====================================================
  // CARD TYPE
  // =====================================================

  const isDebit =
    selectedCard?.cardType === "DEBIT";

  const isCredit =
    selectedCard?.cardType === "CREDIT";

  // =====================================================
  // CARD STATUS
  // =====================================================

  const isFrozen =
    selectedCard?.status === "FROZEN";

  const isBlocked =
    selectedCard?.status === "BLOCKED";

  const isExpired =
    selectedCard?.status === "EXPIRED";

  const isPending =
    selectedCard?.status === "PENDING";

  const canModify =
    selectedCard &&
    selectedCard.status === "ACTIVE";

  // =====================================================
  // MONTHLY DETAILS
  // =====================================================

  const monthlyLimit = Number(
    selectedCard?.monthlyLimit || 0
  );

  const monthlyUsed = Number(
    selectedCard?.monthlyUsed || 0
  );

  const monthlyRemaining = Number(
    selectedCard?.monthlyRemaining ??
      Math.max(
        monthlyLimit - monthlyUsed,
        0
      )
  );

  const monthlyUsagePercentage =
    monthlyLimit > 0
      ? Math.min(
          (monthlyUsed / monthlyLimit) * 100,
          100
        )
      : 0;

  // =====================================================
  // CREDIT DETAILS
  // =====================================================

  const creditLimit = Number(
    selectedCard?.creditLimit || 0
  );

  const usedCredit = Number(
    selectedCard?.usedCredit || 0
  );

  const availableCredit = Number(
    selectedCard?.availableCredit || 0
  );

  const creditUsagePercentage =
    creditLimit > 0
      ? Math.min(
          (usedCredit / creditLimit) * 100,
          100
        )
      : 0;

  // =====================================================
  // FORMAT EXPIRY
  // =====================================================

  const formatExpiry = (expiryDate) => {
    if (!expiryDate) {
      return "--/--";
    }

    const date = new Date(expiryDate);

    if (Number.isNaN(date.getTime())) {
      return "--/--";
    }

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const year = String(
      date.getFullYear()
    ).slice(-2);

    return `${month}/${year}`;
  };

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (value) => {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // =====================================================
  // CARD LABEL
  // =====================================================

  const getCardLabel = (card) => {
    if (!card) {
      return "Card";
    }

    const type =
      card.cardType === "CREDIT"
        ? "Credit"
        : "Debit";

    const variant =
      card.cardVariant === "VIRTUAL"
        ? "Virtual"
        : "Physical";

    return `${type} ${variant} Card`;
  };

  // =====================================================
  // GET CARD FOR REQUEST SLOT
  // =====================================================

  const getCardForSlot = (
    cardType,
    variant
  ) => {
    const matchingCards = cards.filter(
      (card) =>
        card.cardType === cardType &&
        card.cardVariant === variant
    );

    if (matchingCards.length === 0) {
      return null;
    }

    const usableCards =
      matchingCards.filter(
        (card) =>
          card.status === "ACTIVE" ||
          card.status === "FROZEN" ||
          card.status === "PENDING"
      );

    if (usableCards.length > 0) {
      return [...usableCards].sort(
        (a, b) =>
          Number(b.id || 0) -
          Number(a.id || 0)
      )[0];
    }

    return [...matchingCards].sort(
      (a, b) =>
        Number(b.id || 0) -
        Number(a.id || 0)
    )[0];
  };

  // =====================================================
  // CARD SLOT STATUS
  // =====================================================

  const getSlotStatus = (
    cardType,
    variant
  ) => {
    const card = getCardForSlot(
      cardType,
      variant
    );

    if (!card) {
      return {
        type: "AVAILABLE",
        card: null,
      };
    }

    if (
      card.status === "ACTIVE" ||
      card.status === "FROZEN" ||
      card.status === "PENDING"
    ) {
      return {
        type: "CREATED",
        card,
      };
    }

    if (card.status === "EXPIRED") {
      return {
        type: "EXPIRED",
        card,
      };
    }

    if (card.status === "BLOCKED") {
      return {
        type: "BLOCKED",
        card,
      };
    }

    return {
      type: "AVAILABLE",
      card: null,
    };
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400";

      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";

      case "FROZEN":
        return "bg-orange-500/20 text-orange-400";

      case "BLOCKED":
        return "bg-red-500/20 text-red-400";

      case "EXPIRED":
        return "bg-gray-500/20 text-gray-400";

      default:
        return "bg-white/10 text-gray-300";
    }
  };

  // =====================================================
  // REQUEST CARD STATUS STYLE
  // =====================================================

  const getRequestCardStatusStyle = (
    status
  ) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400 border-green-500/30";

      case "FROZEN":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";

      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

      case "BLOCKED":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      case "EXPIRED":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";

      case "AVAILABLE":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";

      default:
        return "bg-white/10 text-gray-300 border-white/10";
    }
  };

  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  const getErrorMessage = (
    err,
    fallback
  ) => {
    return (
      err.response?.data?.message ||
      err.response?.data?.error ||
      (typeof err.response?.data === "string"
        ? err.response.data
        : fallback)
    );
  };

  // =====================================================
  // UPDATE CARD STATE
  // =====================================================

  const updateCardInState = (
    updatedCard
  ) => {
    if (!updatedCard?.id) {
      return;
    }

    setCards((previousCards) =>
      previousCards.map((card) =>
        String(card.id) ===
        String(updatedCard.id)
          ? updatedCard
          : card
      )
    );
  };

  // =====================================================
  // RESET MODAL
  // =====================================================

  const resetModalForm = () => {
    setNewLimit("");

    setPin("");
    setConfirmPin("");

    setCurrentPin("");
    setNewPin("");
    setConfirmNewPin("");

    setAccountPassword("");
    setForgotNewPin("");
    setForgotConfirmPin("");
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (actionLoading) {
      return;
    }

    setActiveModal(null);
    resetModalForm();
  };

  // =====================================================
  // FORCE CLOSE AFTER SUCCESS
  // =====================================================

  const closeModalAfterSuccess = () => {
    setActiveModal(null);
    resetModalForm();
  };

  // =====================================================
  // FREEZE
  // =====================================================

  const handleFreeze = async () => {
    if (!selectedCard || !canModify) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cards/${selectedCard.id}/freeze`
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Card frozen successfully."
      );
    } catch (err) {
      console.error(
        "Freeze card failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to freeze card."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // UNFREEZE
  // =====================================================

  const handleUnfreeze = async () => {
    if (!selectedCard) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cards/${selectedCard.id}/unfreeze`
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Card unfrozen successfully."
      );
    } catch (err) {
      console.error(
        "Unfreeze card failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to unfreeze card."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // BLOCK
  // =====================================================

  const handleBlock = async () => {
    if (!selectedCard || isBlocked) {
      return;
    }

    try {
      setActionLoading(true);

      await api.patch(
        `/cards/${selectedCard.id}/block`
      );

      await fetchCards(false);

      setShowCVV(false);

      closeModalAfterSuccess();

      showSuccess(
        "Card blocked permanently."
      );
    } catch (err) {
      console.error(
        "Block card failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to block card."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // UPDATE MONTHLY LIMIT
  // =====================================================

  const handleUpdateLimit = async () => {
    // Monthly limit is ONLY for Debit cards.
    if (
      !selectedCard ||
      selectedCard.cardType !== "DEBIT" ||
      !canModify
    ) {
      return;
    }

    const value = Number(newLimit);

    if (!value || value <= 0) {
      alert(
        "Please enter a valid monthly limit."
      );
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cards/${selectedCard.id}/monthly-limit`,
        {
          monthlyLimit: value,
        }
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Monthly limit updated successfully."
      );
    } catch (err) {
      console.error(
        "Update monthly limit failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to update monthly limit."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // FEATURE TOGGLE
  // =====================================================

  const handleFeatureToggle = async (
    feature,
    enabled
  ) => {
    if (!selectedCard || !canModify) {
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cards/${selectedCard.id}/${feature}`,
        {
          enabled,
        }
      );

      updateCardInState(response.data);

      showSuccess(
        `${feature} ${
          enabled ? "enabled" : "disabled"
        } successfully.`
      );
    } catch (err) {
      console.error(
        `Failed to update ${feature}:`,
        err
      );

      alert(
        getErrorMessage(
          err,
          `Unable to update ${feature}.`
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // SET PIN
  // =====================================================

  const handleSetPin = async () => {
    if (!selectedCard || !canModify) {
      return;
    }

    if (!/^\d{4}$/.test(pin)) {
      alert(
        "PIN must contain exactly 4 digits."
      );
      return;
    }

    if (pin !== confirmPin) {
      alert(
        "PIN and confirm PIN do not match."
      );
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.post(
        `/cards/${selectedCard.id}/pin`,
        {
          pin,
          confirmPin,
        }
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Card PIN set successfully."
      );
    } catch (err) {
      console.error(
        "Set PIN failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to set card PIN."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // CHANGE PIN
  // =====================================================

  const handleChangePin = async () => {
    if (!selectedCard || !canModify) {
      return;
    }

    if (!/^\d{4}$/.test(currentPin)) {
      alert(
        "Current PIN must contain exactly 4 digits."
      );
      return;
    }

    if (!/^\d{4}$/.test(newPin)) {
      alert(
        "New PIN must contain exactly 4 digits."
      );
      return;
    }

    if (!/^\d{4}$/.test(confirmNewPin)) {
      alert(
        "Confirm PIN must contain exactly 4 digits."
      );
      return;
    }

    if (newPin !== confirmNewPin) {
      alert(
        "New PIN and confirm PIN do not match."
      );
      return;
    }

    if (currentPin === newPin) {
      alert(
        "New PIN must be different from current PIN."
      );
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cards/${selectedCard.id}/pin`,
        {
          currentPin,
          newPin,
          confirmNewPin,
        }
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Card PIN changed successfully."
      );
    } catch (err) {
      console.error(
        "Change PIN failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to change card PIN."
        )
      );

      await fetchCards(false);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // FORGOT PIN
  // =====================================================

  const handleForgotPin = async () => {
    if (!selectedCard || !canModify) {
      return;
    }

    if (!accountPassword) {
      alert(
        "Please enter your account password."
      );
      return;
    }

    if (!/^\d{4}$/.test(forgotNewPin)) {
      alert(
        "New PIN must contain exactly 4 digits."
      );
      return;
    }

    if (
      !/^\d{4}$/.test(
        forgotConfirmPin
      )
    ) {
      alert(
        "Confirm PIN must contain exactly 4 digits."
      );
      return;
    }

    if (
      forgotNewPin !==
      forgotConfirmPin
    ) {
      alert(
        "New PIN and confirm PIN do not match."
      );
      return;
    }

    try {
      setActionLoading(true);

      const response = await api.post(
        `/cards/${selectedCard.id}/pin/forgot`,
        {
          accountPassword,
          newPin: forgotNewPin,
          confirmPin: forgotConfirmPin,
        }
      );

      updateCardInState(response.data);

      closeModalAfterSuccess();

      showSuccess(
        "Card PIN reset successfully."
      );
    } catch (err) {
      console.error(
        "Forgot PIN failed:",
        err
      );

      alert(
        getErrorMessage(
          err,
          "Unable to reset card PIN."
        )
      );
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // CREATE / REPLACE CARD
  // =====================================================

  const createCard = async (
    cardType,
    variant
  ) => {
    try {
      setActionLoading(true);

      let endpoint = "";

      if (cardType === "DEBIT") {
        endpoint =
          variant === "VIRTUAL"
            ? "/cards/debit/virtual"
            : "/cards/debit/physical";
      }

      if (cardType === "CREDIT") {
        endpoint =
          variant === "VIRTUAL"
            ? "/cards/credit/virtual"
            : "/cards/credit/physical";
      }

      const requestedSlotKey =
        getSlotKey(
          cardType,
          variant
        );

      const response = await api.post(
        endpoint
      );

      const newCard = response.data;

      const refreshedResponse =
        await api.get("/cards");

      const refreshedCards =
        Array.isArray(
          refreshedResponse.data
        )
          ? refreshedResponse.data
          : [];

      setCards(refreshedCards);

      let replacementCard = null;

      if (newCard?.id) {
        replacementCard =
          refreshedCards.find(
            (card) =>
              String(card.id) ===
              String(newCard.id)
          ) || null;
      }

      if (!replacementCard) {
        replacementCard =
          getCurrentUsableCard(
            refreshedCards,
            cardType,
            variant
          );
      }

      if (
        replacementCard &&
        getSlotKey(
          replacementCard.cardType,
          replacementCard.cardVariant
        ) === requestedSlotKey
      ) {
        setSelectedCardId(
          replacementCard.id
        );
      } else {
        const visible =
          getVisibleMainCards(
            refreshedCards
          );

        setSelectedCardId(
          visible.length > 0
            ? visible[0].id
            : null
        );
      }

      setShowCVV(false);

      closeModalAfterSuccess();

      const hadBlockedCard =
        cards.some(
          (card) =>
            card.cardType === cardType &&
            card.cardVariant === variant &&
            card.status === "BLOCKED"
        );

      const hadExpiredCard =
        cards.some(
          (card) =>
            card.cardType === cardType &&
            card.cardVariant === variant &&
            card.status === "EXPIRED"
        );

      let message =
        `${getCardLabel({
          cardType,
          cardVariant: variant,
        })} created successfully.`;

      if (hadBlockedCard || hadExpiredCard) {
        message =
          `${getCardLabel({
            cardType,
            cardVariant: variant,
          })} replacement requested successfully.`;
      }

      showSuccess(message);
    } catch (err) {
      console.error(
        "Card creation failed:",
        err
      );

      if (err.response?.status === 409) {
        alert(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "You already have this card."
        );

        await fetchCards(false);
      } else if (
        err.response?.status === 403
      ) {
        alert(
          "You are not authorized to create this card."
        );
      } else {
        alert(
          getErrorMessage(
            err,
            "Unable to create card."
          )
        );
      }
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // PAY WITH CARD
  // =====================================================

  const handlePayWithCard = () => {
    if (!selectedCard) {
      alert(
        "Please select a card first."
      );
      return;
    }

    if (selectedCard.status !== "ACTIVE") {
      alert(
        "Only an active card can be used for payment."
      );
      return;
    }

    navigate("/pay-with-card");
  };

  // =====================================================
  // FEATURE ROW
  // =====================================================

  const FeatureRow = ({
    title,
    enabled,
    feature,
    icon,
  }) => {
    const disabled =
      actionLoading || !canModify;

    return (
      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                enabled
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {icon}
            </div>

            <div>
              <p className="font-semibold">
                {title}
              </p>

              <p
                className={`text-sm ${
                  enabled
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {enabled
                  ? "Enabled"
                  : "Disabled"}
              </p>
            </div>

          </div>

          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              handleFeatureToggle(
                feature,
                !enabled
              )
            }
            className={`relative w-14 h-7 rounded-full transition ${
              enabled
                ? "bg-green-500"
                : "bg-gray-600"
            } ${
              disabled
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                enabled
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>
      </div>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-300">
            Loading your cards...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 pt-8">

        <div className="flex items-center justify-between gap-5">

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
                Cards
              </h1>

              <p className="text-gray-400 mt-1">
                Manage your NeoBank Pro cards
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {successMessage && (
        <div className="max-w-7xl mx-auto px-6 mt-6">

          <div className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-2xl px-5 py-4">

            <div className="flex items-center gap-3">

              <FaShieldAlt />

              <span className="font-semibold">
                {successMessage}
              </span>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="max-w-7xl mx-auto px-6 mt-8">

          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-5">

            <p className="font-semibold">
              {error}
            </p>

            <button
              onClick={() =>
                fetchCards(true)
              }
              className="mt-3 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
            >
              Try Again
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          NO ACTIVE CARDS
      ===================================================== */}

      {!error &&
        visibleMainCards.length === 0 && (
          <div className="max-w-7xl mx-auto px-6 mt-10">

            <GlassCard className="p-10 text-white text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center">

                <FaCreditCard
                  size={28}
                  className="text-blue-400"
                />

              </div>

              <h2 className="text-2xl font-bold mt-5">
                No Active Cards
              </h2>

              <p className="text-gray-400 mt-2">
                You don't have any active cards right now.
              </p>

              <button
                onClick={() =>
                  setActiveModal("request")
                }
                className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition font-semibold"
              >
                <FaPlus />
                Request Card
              </button>

            </GlassCard>

          </div>
        )}

      {/* =====================================================
          CARDS
      ===================================================== */}

      {!error &&
        visibleMainCards.length > 0 && (
          <>

            <div className="max-w-7xl mx-auto px-6 mt-8">

              {/* =================================================
                  CARD SELECTOR + PAY
              ================================================= */}

              <div className="flex flex-col lg:flex-row gap-4 mb-6">

                <div className="flex flex-wrap gap-3 flex-1">

                  {visibleMainCards.map(
                    (card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => {
                          setSelectedCardId(
                            card.id
                          );
                          setShowCVV(false);
                        }}
                        className={`px-5 py-3 rounded-xl border transition ${
                          String(
                            selectedCard?.id
                          ) ===
                          String(card.id)
                            ? "bg-blue-600 border-blue-400"
                            : "bg-white/10 border-white/10 hover:bg-white/20"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <FaCreditCard />

                          <div className="text-left">

                            <p className="font-semibold">
                              {getCardLabel(card)}
                            </p>

                            <p className="text-xs text-white/60">
                              {card.cardNumber}
                            </p>

                          </div>

                        </div>

                      </button>
                    )
                  )}

                </div>

                {/* PAY WITH CARD */}

                <div className="flex items-center">

                  <button
                    type="button"
                    disabled={
                      !selectedCard ||
                      selectedCard.status !==
                        "ACTIVE" ||
                      actionLoading
                    }
                    onClick={
                      handlePayWithCard
                    }
                    className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#07162F] px-5 py-3 rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap w-full lg:w-auto"
                  >
                    <FaWallet />
                    Pay with Card
                  </button>

                </div>

              </div>

              {/* =================================================
                  MAIN GRID
              ================================================= */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* =================================================
                    CARD
                ================================================= */}

                <div
                  className={`relative rounded-3xl p-8 shadow-xl overflow-hidden ${
                    isCredit
                      ? "bg-linear-to-br from-purple-700 via-indigo-600 to-blue-600"
                      : "bg-linear-to-br from-blue-600 to-cyan-500"
                  }`}
                >

                  {/* FROZEN */}

                  {isFrozen && (
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex items-center justify-center z-10">

                      <div className="bg-black/60 px-6 py-4 rounded-2xl border border-white/20">

                        <div className="flex items-center gap-2 text-white font-semibold">

                          <FaLock />

                          Card Frozen

                        </div>

                      </div>

                    </div>
                  )}

                  {/* CARD HEADER */}

                  <div className="flex justify-between items-start">

                    <div>

                      <p className="text-white/70 text-sm">
                        {selectedCard?.cardVariant ===
                        "VIRTUAL"
                          ? "Virtual"
                          : "Physical"}
                      </p>

                      <h2 className="text-2xl font-bold">
                        NeoBank Pro
                      </h2>

                      <p className="text-white/70 text-sm mt-1">
                        {selectedCard?.cardType ===
                        "CREDIT"
                          ? "Credit Card"
                          : "Debit Card"}
                      </p>

                    </div>

                    <FaCreditCard size={35} />

                  </div>

                  {/* STATUS */}

                  <div className="mt-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        selectedCard?.status
                      )}`}
                    >
                      {selectedCard?.status}
                    </span>

                  </div>

                  {/* CARD NUMBER */}

                  <div className="mt-10">

                    <p className="text-white/70">
                      Card Number
                    </p>

                    <h1 className="text-2xl sm:text-3xl tracking-widest mt-2">
                      {selectedCard?.cardNumber ||
                        "**** **** **** ****"}
                    </h1>

                  </div>

                  {/* HOLDER + EXPIRY */}

                  <div className="flex justify-between mt-10">

                    <div>

                      <p className="text-white/70">
                        Card Holder
                      </p>

                      <h3 className="font-semibold uppercase">
                        {selectedCard?.cardHolder ||
                          "--"}
                      </h3>

                    </div>

                    <div>

                      <p className="text-white/70">
                        Expiry
                      </p>

                      <h3 className="font-semibold">
                        {formatExpiry(
                          selectedCard?.expiryDate
                        )}
                      </h3>

                    </div>

                  </div>

                  {/* CVV */}

                  <div className="mt-8 flex justify-between items-center">

                    <div>

                      <p className="text-white/70">
                        CVV
                      </p>

                      <h3 className="font-semibold text-xl tracking-widest">
                        {showCVV
                          ? selectedCard?.cvv ||
                            "***"
                          : "***"}
                      </h3>

                    </div>

                    <button
                      disabled={
                        actionLoading
                      }
                      onClick={() =>
                        setShowCVV(
                          !showCVV
                        )
                      }
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >

                      {showCVV ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}

                      {showCVV
                        ? "Hide"
                        : "Show"}

                    </button>

                  </div>

                </div>

                {/* =================================================
                    CARD SETTINGS
                ================================================= */}

                <GlassCard className="p-8 text-white">

                  <div className="flex justify-between items-center">

                    <h2 className="text-2xl font-bold">
                      Card Settings
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        selectedCard?.status
                      )}`}
                    >
                      {selectedCard?.status}
                    </span>

                  </div>

                  <div className="mt-8 space-y-4">

                    {/* FREEZE */}

                    {selectedCard?.status ===
                      "ACTIVE" && (
                      <button
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          setActiveModal(
                            "freeze"
                          )
                        }
                        className="w-full flex items-center justify-between bg-white/10 hover:bg-red-500/20 border border-transparent hover:border-red-500/30 p-4 rounded-xl transition disabled:opacity-50"
                      >

                        <span className="flex items-center gap-3">

                          <FaLock className="text-orange-400" />

                          Freeze Card

                        </span>

                        <span>→</span>

                      </button>
                    )}

                    {/* UNFREEZE */}

                    {selectedCard?.status ===
                      "FROZEN" && (
                      <button
                        disabled={
                          actionLoading
                        }
                        onClick={() =>
                          setActiveModal(
                            "unfreeze"
                          )
                        }
                        className="w-full flex items-center justify-between bg-white/10 hover:bg-green-500/20 border border-transparent hover:border-green-500/30 p-4 rounded-xl transition disabled:opacity-50"
                      >

                        <span className="flex items-center gap-3">

                          <FaUnlock className="text-green-400" />

                          Unfreeze Card

                        </span>

                        <span>→</span>

                      </button>
                    )}

                    {/* BLOCK */}

                    {selectedCard?.status !==
                      "BLOCKED" &&
                      selectedCard?.status !==
                        "EXPIRED" && (
                        <button
                          disabled={
                            actionLoading
                          }
                          onClick={() =>
                            setActiveModal(
                              "block"
                            )
                          }
                          className="w-full flex items-center justify-between bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 p-4 rounded-xl transition disabled:opacity-50"
                        >

                          <span className="flex items-center gap-3">

                            <FaBan className="text-red-400" />

                            <span>

                              <span className="block font-semibold">
                                Block Card
                              </span>

                              <span className="block text-xs text-red-300/70 mt-1">
                                Permanently disable this card
                              </span>

                            </span>

                          </span>

                          <span>→</span>

                        </button>
                      )}

                    {/* PIN */}

                    {!isBlocked &&
                      !isExpired &&
                      !isPending && (
                        <>
                          {!selectedCard?.pinSet ? (
                            <button
                              disabled={
                                actionLoading ||
                                !canModify
                              }
                              onClick={() =>
                                setActiveModal(
                                  "setPin"
                                )
                              }
                              className="w-full flex items-center justify-between bg-white/10 hover:bg-blue-500/20 border border-transparent hover:border-blue-500/30 p-4 rounded-xl transition disabled:opacity-40"
                            >

                              <span className="flex items-center gap-3">

                                <FaShieldAlt className="text-cyan-400" />

                                Set Card PIN

                              </span>

                              <span>→</span>

                            </button>
                          ) : (
                            <button
                              disabled={
                                actionLoading ||
                                !canModify
                              }
                              onClick={() =>
                                setActiveModal(
                                  "changePin"
                                )
                              }
                              className="w-full flex items-center justify-between bg-white/10 hover:bg-blue-500/20 border border-transparent hover:border-blue-500/30 p-4 rounded-xl transition disabled:opacity-40"
                            >

                              <span className="flex items-center gap-3">

                                <FaShieldAlt className="text-cyan-400" />

                                Change Card PIN

                              </span>

                              <span>→</span>

                            </button>
                          )}
                        </>
                      )}

                    {/* CARD TYPE */}

                    <div className="bg-white/10 rounded-xl p-4 flex justify-between">

                      <span className="text-gray-300">
                        Card Type
                      </span>

                      <span className="font-semibold">
                        {selectedCard?.cardType}
                      </span>

                    </div>

                    {/* CARD VARIANT */}

                    <div className="bg-white/10 rounded-xl p-4 flex justify-between">

                      <span className="text-gray-300">
                        Variant
                      </span>

                      <span className="font-semibold">
                        {selectedCard?.cardVariant}
                      </span>

                    </div>

                  </div>

                  {/* =================================================
                      MONTHLY SPENDING
                      DEBIT CARDS ONLY
                  ================================================= */}

                  {isDebit && (
                    <div className="mt-8">

                      <div className="flex justify-between items-center">

                        <div>

                          <h3 className="text-lg font-semibold">
                            Monthly Spending
                          </h3>

                          <p className="text-gray-400 text-xs mt-1">
                            Calculated from real card transactions
                          </p>

                        </div>

                        <button
                          disabled={
                            actionLoading ||
                            !canModify
                          }
                          onClick={() => {
                            setNewLimit(
                              selectedCard?.monthlyLimit ??
                                ""
                            );

                            setActiveModal(
                              "limit"
                            );
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Update Limit
                        </button>

                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">

                        {/* LIMIT */}

                        <div className="bg-white/10 rounded-xl p-4">

                          <p className="text-gray-400 text-xs">
                            Monthly Limit
                          </p>

                          <p className="font-bold text-lg mt-1">
                            ₹{formatMoney(
                              monthlyLimit
                            )}
                          </p>

                        </div>

                        {/* USED */}

                        <div className="bg-white/10 rounded-xl p-4">

                          <p className="text-gray-400 text-xs">
                            Used This Month
                          </p>

                          <p className="font-bold text-lg mt-1 text-red-400">
                            ₹{formatMoney(
                              monthlyUsed
                            )}
                          </p>

                        </div>

                        {/* REMAINING */}

                        <div className="bg-white/10 rounded-xl p-4">

                          <p className="text-gray-400 text-xs">
                            Remaining
                          </p>

                          <p className="font-bold text-lg mt-1 text-green-400">
                            ₹{formatMoney(
                              monthlyRemaining
                            )}
                          </p>

                        </div>

                      </div>

                      {/* USAGE BAR */}

                      <div className="mt-5">

                        <div className="flex justify-between text-xs text-gray-400 mb-2">

                          <span>
                            Monthly usage
                          </span>

                          <span>
                            {monthlyUsagePercentage.toFixed(
                              0
                            )}
                            %
                          </span>

                        </div>

                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">

                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              monthlyUsagePercentage >=
                              90
                                ? "bg-red-500"
                                : monthlyUsagePercentage >=
                                  70
                                ? "bg-yellow-500"
                                : "bg-cyan-400"
                            }`}
                            style={{
                              width: `${monthlyUsagePercentage}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>
                  )}

                  {/* =================================================
                      CREDIT DETAILS
                  ================================================= */}

                  {isCredit && (
                    <div className="mt-8">

                      <h3 className="text-lg font-semibold">
                        Credit Details
                      </h3>

                      <div className="mt-4 space-y-3">

                        <div className="bg-white/10 rounded-xl p-4 flex justify-between">

                          <span className="text-gray-300">
                            Credit Limit
                          </span>

                          <span className="font-semibold">
                            ₹
                            {creditLimit.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                        <div className="bg-white/10 rounded-xl p-4 flex justify-between">

                          <span className="text-gray-300">
                            Used Credit
                          </span>

                          <span className="font-semibold text-red-400">
                            ₹
                            {usedCredit.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                        <div className="bg-white/10 rounded-xl p-4 flex justify-between">

                          <span className="text-gray-300">
                            Available Credit
                          </span>

                          <span className="font-semibold text-green-400">
                            ₹
                            {availableCredit.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </div>

                      </div>

                      <div className="w-full bg-white/20 rounded-full h-3 mt-5">

                        <div
                          className="bg-purple-400 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${creditUsagePercentage}%`,
                          }}
                        />

                      </div>

                      <p className="text-gray-400 text-sm mt-3">
                        {creditUsagePercentage.toFixed(
                          0
                        )}
                        % of your credit limit used
                      </p>

                    </div>
                  )}

                </GlassCard>

              </div>

            </div>

            {/* =====================================================
                CARD FEATURES
            ===================================================== */}

            <div className="max-w-7xl mx-auto mt-8">

              <GlassCard className="p-8 text-white">

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Card Features
                    </h2>

                    <p className="text-gray-400 mt-1">
                      Control where and how your card can be used.
                    </p>

                  </div>

                  {actionLoading && (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                  )}

                </div>

                {(isBlocked ||
                  isExpired ||
                  isPending ||
                  isFrozen) && (
                  <div className="mt-5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-yellow-300 text-sm">

                    {isBlocked &&
                      "Blocked cards cannot be modified."}

                    {isExpired &&
                      "Expired cards cannot be modified."}

                    {isPending &&
                      "Pending cards cannot be modified."}

                    {isFrozen &&
                      "Unfreeze the card before changing card features."}

                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                  <FeatureRow
                    title="Online Payments"
                    enabled={Boolean(
                      selectedCard?.onlineEnabled
                    )}
                    feature="online"
                    icon={<FaMobileAlt />}
                  />

                  <FeatureRow
                    title="Contactless Payments"
                    enabled={Boolean(
                      selectedCard?.contactlessEnabled
                    )}
                    feature="contactless"
                    icon={<FaWifi />}
                  />

                  <FeatureRow
                    title="International Payments"
                    enabled={Boolean(
                      selectedCard?.internationalEnabled
                    )}
                    feature="international"
                    icon={<FaGlobe />}
                  />

                  <FeatureRow
                    title="ATM Withdrawal"
                    enabled={Boolean(
                      selectedCard?.atmEnabled
                    )}
                    feature="atm"
                    icon={<FaUniversity />}
                  />

                  <FeatureRow
                    title="POS Payments"
                    enabled={Boolean(
                      selectedCard?.posEnabled
                    )}
                    feature="pos"
                    icon={<FaCreditCard />}
                  />

                </div>

              </GlassCard>

            </div>

            {/* =====================================================
                REQUEST NEW CARD
            ===================================================== */}

            <div className="max-w-7xl mx-auto mt-10">

              <GlassCard className="p-8 text-white">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Request New Card
                    </h2>

                    <p className="text-gray-300 mt-2">
                      Apply for another debit or credit card.
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      Available slots are controlled by the backend.
                    </p>

                  </div>

                  <button
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      setActiveModal(
                        "request"
                      )
                    }
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition disabled:opacity-50"
                  >

                    <FaPlus />

                    Request Card

                  </button>

                </div>

              </GlassCard>

            </div>

          </>
        )}

      {/* =====================================================
          FREEZE MODAL
      ===================================================== */}

      {activeModal === "freeze" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <FaLock size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Freeze Card?
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Are you sure you want to freeze this card?
              Card usage will be temporarily disabled.
              You can unfreeze it later.
            </p>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleFreeze}
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 transition font-semibold"
              >
                {actionLoading
                  ? "Freezing..."
                  : "Freeze Card"}
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
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
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
              This will activate the card again and allow card usage.
            </p>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleUnfreeze}
                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition font-semibold"
              >
                {actionLoading
                  ? "Unfreezing..."
                  : "Unfreeze Card"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          BLOCK MODAL
      ===================================================== */}

      {activeModal === "block" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-red-500/30 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <FaBan size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Block Card Permanently?
            </h2>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Are you sure you want to block this card?
              This action is permanent and the card
              cannot be used again.
            </p>

            <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-xl p-4">

              <p className="text-red-300 text-sm">
                Card:{" "}
                <span className="font-semibold">
                  {getCardLabel(
                    selectedCard
                  )}
                </span>
              </p>

              <p className="text-red-300 text-sm mt-1">
                {selectedCard?.cardNumber}
              </p>

            </div>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold"
              >
                No
              </button>

              <button
                disabled={actionLoading}
                onClick={handleBlock}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
              >
                {actionLoading
                  ? "Blocking..."
                  : "Yes, Block Card"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          LIMIT MODAL
      ===================================================== */}

      {activeModal === "limit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
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
                ₹
                {monthlyLimit.toLocaleString(
                  "en-IN"
                )}
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
                  min="1"
                  value={newLimit}
                  onChange={(e) =>
                    setNewLimit(
                      e.target.value
                    )
                  }
                  placeholder="Enter new limit"
                  disabled={actionLoading}
                  className="w-full bg-white/10 border border-white/10 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
                />

              </div>

            </div>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleUpdateLimit}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                {actionLoading
                  ? "Updating..."
                  : "Update Limit"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          SET PIN MODAL
      ===================================================== */}

      {activeModal === "setPin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FaShieldAlt size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Set Card PIN
            </h2>

            <p className="text-gray-400 mt-2">
              Create a secure 4-digit PIN for this card.
            </p>

            <div className="mt-6">

              <label className="text-gray-300 text-sm">
                New PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) =>
                  setPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-cyan-500"
              />

            </div>

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                Confirm PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={confirmPin}
                onChange={(e) =>
                  setConfirmPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-cyan-500"
              />

            </div>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleSetPin}
                className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
              >
                {actionLoading
                  ? "Setting..."
                  : "Set PIN"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          CHANGE PIN MODAL
      ===================================================== */}

      {activeModal === "changePin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-blue-500/30 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaShieldAlt size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Change Card PIN
            </h2>

            <p className="text-gray-400 mt-2">
              Enter your current PIN and create a new 4-digit PIN.
            </p>

            <div className="mt-6">

              <label className="text-gray-300 text-sm">
                Current PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={currentPin}
                onChange={(e) =>
                  setCurrentPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-blue-500"
              />

            </div>

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                New PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={newPin}
                onChange={(e) =>
                  setNewPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-blue-500"
              />

            </div>

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                Confirm New PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={confirmNewPin}
                onChange={(e) =>
                  setConfirmNewPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-blue-500"
              />

            </div>

            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">

              <p className="text-yellow-300 text-xs">
                5 incorrect current PIN attempts will temporarily lock the PIN for 15 minutes.
              </p>

            </div>

            <div className="mt-4 text-center">

              <button
                type="button"
                disabled={actionLoading}
                onClick={() =>
                  setActiveModal(
                    "forgotPin"
                  )
                }
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition disabled:opacity-50"
              >
                Forgot PIN?
              </button>

            </div>

            <div className="flex gap-3 mt-5">

              <button
                disabled={actionLoading}
                onClick={closeModal}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading}
                onClick={handleChangePin}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
              >
                {actionLoading
                  ? "Changing..."
                  : "Change PIN"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          FORGOT PIN MODAL
      ===================================================== */}

      {activeModal === "forgotPin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-md bg-[#102E5B] border border-cyan-500/30 rounded-3xl p-8 shadow-2xl">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FaShieldAlt size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Forgot Card PIN
            </h2>

            <p className="text-gray-400 mt-2">
              Verify your account password and create a new 4-digit PIN.
            </p>

            <div className="mt-6">

              <label className="text-gray-300 text-sm">
                Account Password
              </label>

              <input
                type="password"
                value={accountPassword}
                onChange={(e) =>
                  setAccountPassword(
                    e.target.value
                  )
                }
                placeholder="Enter account password"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              />

            </div>

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                New PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={forgotNewPin}
                onChange={(e) =>
                  setForgotNewPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-cyan-500"
              />

            </div>

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                Confirm PIN
              </label>

              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={forgotConfirmPin}
                onChange={(e) =>
                  setForgotConfirmPin(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                placeholder="••••"
                disabled={actionLoading}
                className="w-full mt-2 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl outline-none focus:border-cyan-500"
              />

            </div>

            <div className="flex gap-3 mt-7">

              <button
                disabled={actionLoading}
                onClick={() =>
                  setActiveModal(
                    "changePin"
                  )
                }
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Back to Change PIN
              </button>

              <button
                disabled={actionLoading}
                onClick={handleForgotPin}
                className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition font-semibold"
              >
                {actionLoading
                  ? "Resetting..."
                  : "Reset PIN"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          REQUEST CARD MODAL
      ===================================================== */}

      {activeModal === "request" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          <div
            onClick={() =>
              !actionLoading &&
              setActiveModal(null)
            }
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />

          <div className="relative w-full max-w-lg bg-[#102E5B] border border-white/20 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

            <button
              disabled={actionLoading}
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <FaCreditCard size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Request New Card
            </h2>

            <p className="text-gray-400 mt-2">
              Choose the card type and variant you want.
            </p>

            <div className="mt-6 space-y-3">

              {cardSlots.map(
                (slot) => {
                  const slotStatus =
                    getSlotStatus(
                      slot.cardType,
                      slot.variant
                    );

                  const card =
                    slotStatus.card;

                  const isCreated =
                    slotStatus.type ===
                    "CREATED";

                  const isExpiredSlot =
                    slotStatus.type ===
                    "EXPIRED";

                  const isBlockedSlot =
                    slotStatus.type ===
                    "BLOCKED";

                  const actualStatus =
                    card?.status ||
                    "AVAILABLE";

                  return (
                    <div
                      key={getSlotKey(
                        slot.cardType,
                        slot.variant
                      )}
                      className={`w-full bg-white/10 border rounded-xl p-5 transition ${
                        isCreated
                          ? "border-green-500/20"
                          : isExpiredSlot
                          ? "border-yellow-500/20"
                          : isBlockedSlot
                          ? "border-red-500/20"
                          : "border-white/10"
                      }`}
                    >

                      <div className="flex items-center justify-between gap-4">

                        <div className="flex items-center gap-4 min-w-0">

                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                              slot.cardType ===
                              "CREDIT"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            <FaCreditCard />
                          </div>

                          <div className="min-w-0">

                            <div className="flex items-center gap-3 flex-wrap">

                              <p className="font-semibold">
                                {slot.title}
                              </p>

                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRequestCardStatusStyle(
                                  actualStatus
                                )}`}
                              >
                                {actualStatus}
                              </span>

                            </div>

                            {!card && (
                              <p className="text-sm text-gray-400 mt-1">
                                {slot.description}
                              </p>
                            )}

                            {isCreated && (
                              <>
                                <p
                                  className={`text-sm mt-1 flex items-center gap-1 ${
                                    card?.status ===
                                    "ACTIVE"
                                      ? "text-green-400"
                                      : card?.status ===
                                        "FROZEN"
                                      ? "text-orange-400"
                                      : "text-yellow-400"
                                  }`}
                                >

                                  {card?.status ===
                                  "ACTIVE" ? (
                                    <FaCheckCircle size={12} />
                                  ) : card?.status ===
                                    "FROZEN" ? (
                                    <FaLock size={12} />
                                  ) : (
                                    <FaCreditCard size={12} />
                                  )}

                                  {card?.status ===
                                  "ACTIVE"
                                    ? "Already Created"
                                    : card?.status ===
                                      "FROZEN"
                                    ? "Card is Frozen"
                                    : "Card is Pending"}

                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                  **** **** ****{" "}
                                  {String(
                                    card?.cardNumber ||
                                      ""
                                  ).slice(-4) ||
                                    "****"}
                                </p>

                              </>
                            )}

                            {isExpiredSlot && (
                              <>
                                <p className="text-sm text-yellow-400 mt-1 flex items-center gap-1">
                                  <span>⚠</span>
                                  Card Expired
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                  **** **** ****{" "}
                                  {String(
                                    card?.cardNumber ||
                                      ""
                                  ).slice(-4) ||
                                    "****"}
                                </p>
                              </>
                            )}

                            {isBlockedSlot && (
                              <>
                                <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                                  <FaBan size={12} />
                                  Card Blocked
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                  **** **** ****{" "}
                                  {String(
                                    card?.cardNumber ||
                                      ""
                                  ).slice(-4) ||
                                    "****"}
                                </p>
                              </>
                            )}

                          </div>

                        </div>

                        <div className="flexshrink-0">

                          {isCreated && (
                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() => {
                                setSelectedCardId(
                                  card.id
                                );

                                setShowCVV(
                                  false
                                );

                                setActiveModal(
                                  null
                                );
                              }}
                              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                card?.status ===
                                "ACTIVE"
                                  ? "bg-green-500/20 hover:bg-green-500/30 text-green-300"
                                  : card?.status ===
                                    "FROZEN"
                                  ? "bg-orange-500/20 hover:bg-orange-500/30 text-orange-300"
                                  : "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300"
                              }`}
                            >
                              {card?.status ===
                              "PENDING"
                                ? "Waiting"
                                : "View Card"}
                            </button>
                          )}

                          {(isExpiredSlot ||
                            isBlockedSlot) && (
                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                createCard(
                                  slot.cardType,
                                  slot.variant
                                )
                              }
                              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                isExpiredSlot
                                  ? "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300"
                                  : "bg-red-500/20 hover:bg-red-500/30 text-red-300"
                              }`}
                            >
                              {actionLoading
                                ? "Requesting..."
                                : "Request Replacement"}
                            </button>
                          )}

                          {slotStatus.type ===
                            "AVAILABLE" && (
                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                createCard(
                                  slot.cardType,
                                  slot.variant
                                )
                              }
                              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-50"
                            >
                              {actionLoading
                                ? "Requesting..."
                                : "Request"}
                            </button>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
