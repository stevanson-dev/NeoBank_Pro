import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaBell,
  FaEye,
  FaEyeSlash,
  FaUniversity,
  FaMobileAlt,
  FaUser,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Transfer() {

  const navigate = useNavigate();

  // --------------------------------------------------
  // BASIC STATES
  // --------------------------------------------------

  const [money, setMoney] = useState(false);

  const [transferMethod, setTransferMethod] =
    useState("bank");

  const [amount, setAmount] = useState("");

  // --------------------------------------------------
  // RECIPIENT
  // --------------------------------------------------

  const [recipientName, setRecipientName] =
    useState("");

  const [recipientAccount, setRecipientAccount] =
    useState("");

  const [confirmAccount, setConfirmAccount] =
    useState("");

  const [recipientBank, setRecipientBank] =
    useState("");

  const [ifsc, setIfsc] = useState("");

  const [accountType, setAccountType] =
    useState("Savings");

  const [upiId, setUpiId] = useState("");

  const [confirmUpiId, setConfirmUpiId] =
    useState("");

  const [purpose, setPurpose] =
    useState("Personal");

  const [notes, setNotes] = useState("");

  const [saveBeneficiary, setSaveBeneficiary] =
    useState(false);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState(null);

  // --------------------------------------------------
  // BENEFICIARIES
  // --------------------------------------------------

  const [beneficiaries, setBeneficiaries] =
    useState([]);

  const [loadingBeneficiaries, setLoadingBeneficiaries] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  // --------------------------------------------------
  // MODALS
  // --------------------------------------------------

  const [showAllBeneficiaries, setShowAllBeneficiaries] =
    useState(false);

  const [showAddBeneficiary, setShowAddBeneficiary] =
    useState(false);

  const [savingBeneficiary, setSavingBeneficiary] =
    useState(false);

  // EDIT

  const [editingBeneficiary, setEditingBeneficiary] =
    useState(null);

  const [updatingBeneficiary, setUpdatingBeneficiary] =
    useState(false);

  const [editSuccess, setEditSuccess] =
    useState(false);

  // DELETE

  const [deleteBeneficiary, setDeleteBeneficiary] =
    useState(null);

  const [deletingBeneficiary, setDeletingBeneficiary] =
    useState(false);

  const [deleteSuccess, setDeleteSuccess] =
    useState(false);

  // --------------------------------------------------
  // BALANCE
  // --------------------------------------------------

  const [availableBalance, setAvailableBalance] =
    useState(0);

  const [loadingBalance, setLoadingBalance] =
    useState(true);

  // --------------------------------------------------
  // LOAD BENEFICIARIES
  // --------------------------------------------------

  const loadBeneficiaries = async () => {

    try {

      setLoadingBeneficiaries(true);

      const response =
        await api.get("/beneficiaries");

      setBeneficiaries(
        response.data || []
      );

    } catch (error) {

      console.error(
        "Failed to load beneficiaries:",
        error
      );

      if (error.response?.status === 401) {

        alert(
          "Session expired. Please login again."
        );

      } else {

        alert(
          "Unable to load beneficiaries."
        );
      }

    } finally {

      setLoadingBeneficiaries(false);
    }
  };

  // --------------------------------------------------
  // LOAD REAL BALANCE
  // --------------------------------------------------
  // IMPORTANT:
  // BankAccount.balance is the single source of truth.
  // Do NOT use /auth/me balance here.
  // --------------------------------------------------

  const loadBalance = async () => {

    try {

      setLoadingBalance(true);

      const response =
        await api.get("/accounts/primary");

      setAvailableBalance(
        Number(
          response.data?.balance || 0
        )
      );

    } catch (error) {

      console.error(
        "Failed to load balance:",
        error
      );

      if (error.response?.status === 401) {

        alert(
          "Session expired. Please login again."
        );

      } else {

        alert(
          "Unable to load current balance."
        );
      }

    } finally {

      setLoadingBalance(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {

    loadBeneficiaries();
    loadBalance();

  }, []);

  // --------------------------------------------------
  // RESET RECIPIENT
  // --------------------------------------------------

  const resetRecipientFields = () => {

    setRecipientName("");
    setRecipientAccount("");
    setConfirmAccount("");
    setRecipientBank("");
    setIfsc("");
    setAccountType("Savings");

    setUpiId("");
    setConfirmUpiId("");

    setSelectedBeneficiary(null);
  };

  // --------------------------------------------------
  // METHOD CHANGE
  // --------------------------------------------------

  const handleMethodChange = (method) => {

    setTransferMethod(method);

    resetRecipientFields();
  };

  // --------------------------------------------------
  // MASK ACCOUNT
  // --------------------------------------------------

  const maskAccount = (account) => {

    if (!account) return "••••";

    const value = String(account);

    return `•••• ${value.slice(-4)}`;
  };

  // --------------------------------------------------
  // SELECT BENEFICIARY
  // --------------------------------------------------

  const handleBeneficiarySelect = (user) => {

    setSelectedBeneficiary(user.id);

    setRecipientName(
      user.name || ""
    );

    setRecipientBank(
      user.bankName || ""
    );

    setRecipientAccount(
      user.accountNumber || ""
    );

    setConfirmAccount(
      user.accountNumber || ""
    );

    setIfsc(
      user.ifsc || ""
    );

    setAccountType(
      user.accountType || "Savings"
    );

    setUpiId(
      user.upiId || ""
    );

    setConfirmUpiId(
      user.upiId || ""
    );
  };

  // --------------------------------------------------
  // BANK VALIDATION
  // --------------------------------------------------

  const validateBankDetails = () => {

    if (!recipientName.trim()) {

      alert(
        "Please enter recipient name."
      );

      return false;
    }

    if (!recipientAccount.trim()) {

      alert(
        "Please enter account number."
      );

      return false;
    }

    if (!/^\d{9,18}$/.test(
      recipientAccount
    )) {

      alert(
        "Please enter a valid account number."
      );

      return false;
    }

    if (
      recipientAccount !==
      confirmAccount
    ) {

      alert(
        "Account numbers do not match."
      );

      return false;
    }

    if (!recipientBank.trim()) {

      alert(
        "Please enter bank name."
      );

      return false;
    }

    if (!ifsc.trim()) {

      alert(
        "Please enter IFSC code."
      );

      return false;
    }

    if (
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
        ifsc.toUpperCase()
      )
    ) {

      alert(
        "Please enter a valid IFSC code."
      );

      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // UPI VALIDATION
  // --------------------------------------------------

  const validateUpiDetails = () => {

    if (!recipientName.trim()) {

      alert(
        "Please enter recipient name."
      );

      return false;
    }

    if (!upiId.trim()) {

      alert(
        "Please enter UPI ID."
      );

      return false;
    }

    if (
      !/^[\w.-]+@[\w.-]+$/.test(
        upiId
      )
    ) {

      alert(
        "Please enter a valid UPI ID."
      );

      return false;
    }

    if (
      upiId !== confirmUpiId
    ) {

      alert(
        "UPI IDs do not match."
      );

      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // CONTACT VALIDATION
  // --------------------------------------------------

  const validateContactDetails = () => {

    if (!recipientName.trim()) {

      alert(
        "Please select a contact."
      );

      return false;
    }

    if (!recipientAccount.trim()) {

      alert(
        "Selected contact does not have account details."
      );

      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // REVIEW
  // --------------------------------------------------

  const handleReview = () => {

    if (
      transferMethod === "bank" &&
      !validateBankDetails()
    ) {

      return;
    }

    if (
      transferMethod === "upi" &&
      !validateUpiDetails()
    ) {

      return;
    }

    if (
      transferMethod === "contact" &&
      !validateContactDetails()
    ) {

      return;
    }

    if (
      !amount ||
      Number(amount) <= 0
    ) {

      alert(
        "Please enter a valid transfer amount."
      );

      return;
    }

    if (
      Number(amount) >
      availableBalance
    ) {

      alert(
        "Insufficient balance."
      );

      return;
    }

    if (
      Number(amount) > 100000
    ) {

      alert(
        "Maximum transfer limit is ₹1,00,000."
      );

      return;
    }

    navigate(
      "/review-transfer",
      {
        state: {

          amount:
            Number(amount),

          method:
            transferMethod,

          recipientName,

          recipientAccount:
            transferMethod === "upi"
              ? upiId
              : recipientAccount,

          recipientBank,

          ifsc,

          accountType,

          upiId,

          purpose,

          notes,

          saveBeneficiary,

          beneficiaryId:
            selectedBeneficiary,
        },
      }
    );
  };

  // --------------------------------------------------
  // ADD BENEFICIARY
  // --------------------------------------------------

  const handleAddBeneficiary =
    async (e) => {

      e.preventDefault();

      const form = e.target;

      const name =
        form.name.value.trim();

      const bank =
        form.bank.value.trim();

      const account =
        form.account.value.trim();

      const confirm =
        form.confirmAccount.value.trim();

      const beneficiaryIfsc =
        form.ifsc.value
          .trim()
          .toUpperCase();

      const type =
        form.accountType.value;

      const upi =
        form.upi.value.trim();

      if (
        !name ||
        !bank ||
        !account ||
        !confirm ||
        !beneficiaryIfsc
      ) {

        alert(
          "Please fill all required beneficiary details."
        );

        return;
      }

      if (
        account !== confirm
      ) {

        alert(
          "Account numbers do not match."
        );

        return;
      }

      if (
        !/^\d{9,18}$/.test(
          account
        )
      ) {

        alert(
          "Invalid account number."
        );

        return;
      }

      if (
        !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
          beneficiaryIfsc
        )
      ) {

        alert(
          "Invalid IFSC code."
        );

        return;
      }

      if (
        upi &&
        !/^[\w.-]+@[\w.-]+$/.test(
          upi
        )
      ) {

        alert(
          "Invalid UPI ID."
        );

        return;
      }

      const beneficiaryData = {

        name,

        bankName:
          bank,

        accountNumber:
          account,

        ifsc:
          beneficiaryIfsc,

        accountType:
          type,

        upiId:
          upi || null,
      };

      try {

        setSavingBeneficiary(
          true
        );

        const response =
          await api.post(
            "/beneficiaries",
            beneficiaryData
          );

        const saved =
          response.data;

        setBeneficiaries(
          (prev) => [
            saved,
            ...prev,
          ]
        );

        setShowAddBeneficiary(
          false
        );

        alert(
          "Beneficiary added successfully."
        );

      } catch (error) {

        console.error(
          "Failed to add beneficiary:",
          error
        );

        const message =
          error.response?.data ||
          "Unable to add beneficiary.";

        alert(
          typeof message === "string"
            ? message
            : "Unable to add beneficiary."
        );

      } finally {

        setSavingBeneficiary(
          false
        );
      }
    };

  // --------------------------------------------------
  // OPEN EDIT MODAL
  // --------------------------------------------------

  const openEditBeneficiary = (
    beneficiary
  ) => {

    setEditingBeneficiary({
      ...beneficiary,
    });
  };

  // --------------------------------------------------
  // EDIT FIELD CHANGE
  // --------------------------------------------------

  const handleEditChange = (
    field,
    value
  ) => {

    setEditingBeneficiary(
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );
  };

  // --------------------------------------------------
  // UPDATE BENEFICIARY
  // --------------------------------------------------

  const handleUpdateBeneficiary =
    async (e) => {

      e.preventDefault();

      if (!editingBeneficiary) {
        return;
      }

      const name =
        editingBeneficiary.name?.trim();

      const bankName =
        editingBeneficiary.bankName?.trim();

      const accountNumber =
        editingBeneficiary.accountNumber?.trim();

      const beneficiaryIfsc =
        editingBeneficiary.ifsc
          ?.trim()
          .toUpperCase();

      const accountType =
        editingBeneficiary.accountType?.trim();

      const upiId =
        editingBeneficiary.upiId?.trim();

      // -----------------------------
      // VALIDATION
      // -----------------------------

      if (!name) {

        alert(
          "Recipient name is required."
        );

        return;
      }

      if (!accountNumber) {

        alert(
          "Account number is required."
        );

        return;
      }

      if (
        !/^\d{9,18}$/.test(
          accountNumber
        )
      ) {

        alert(
          "Invalid account number."
        );

        return;
      }

      if (!bankName) {

        alert(
          "Bank name is required."
        );

        return;
      }

      if (!beneficiaryIfsc) {

        alert(
          "IFSC code is required."
        );

        return;
      }

      if (
        !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
          beneficiaryIfsc
        )
      ) {

        alert(
          "Invalid IFSC code."
        );

        return;
      }

      if (
        upiId &&
        !/^[\w.-]+@[\w.-]+$/.test(
          upiId
        )
      ) {

        alert(
          "Invalid UPI ID."
        );

        return;
      }

      // -----------------------------
      // DATA TO BACKEND
      // -----------------------------

      const updatedData = {

        name,

        bankName,

        accountNumber,

        ifsc:
          beneficiaryIfsc,

        accountType:
          accountType || "Savings",

        upiId:
          upiId || null,
      };

      try {

        setUpdatingBeneficiary(
          true
        );

        const response =
          await api.put(
            `/beneficiaries/${editingBeneficiary.id}`,
            updatedData
          );

        const updated =
          response.data;

        // -----------------------------
        // UPDATE FRONTEND LIST
        // -----------------------------

        setBeneficiaries(
          (prev) =>
            prev.map(
              (beneficiary) =>
                beneficiary.id ===
                updated.id
                  ? updated
                  : beneficiary
            )
        );

        // -----------------------------
        // UPDATE SELECTED BENEFICIARY
        // -----------------------------

        if (
          selectedBeneficiary ===
          updated.id
        ) {

          handleBeneficiarySelect(
            updated
          );
        }

        // -----------------------------
        // CLOSE EDIT MODAL
        // -----------------------------

        setEditingBeneficiary(
          null
        );

        // -----------------------------
        // SHOW SUCCESS
        // -----------------------------

        setEditSuccess(true);

      } catch (error) {

        console.error(
          "Failed to update beneficiary:",
          error
        );

        const message =
          error.response?.data ||
          "Unable to update beneficiary.";

        alert(
          typeof message === "string"
            ? message
            : "Unable to update beneficiary."
        );

      } finally {

        setUpdatingBeneficiary(
          false
        );
      }
    };

  // --------------------------------------------------
  // OPEN DELETE CONFIRMATION
  // --------------------------------------------------

  const handleDeleteBeneficiary = (
    beneficiary
  ) => {

    setDeleteBeneficiary(
      beneficiary
    );
  };

  // --------------------------------------------------
  // CONFIRM DELETE
  // --------------------------------------------------

  const confirmDeleteBeneficiary =
    async () => {

      if (!deleteBeneficiary) {
        return;
      }

      try {

        setDeletingBeneficiary(
          true
        );

        await api.delete(
          `/beneficiaries/${deleteBeneficiary.id}`
        );

        setBeneficiaries(
          (prev) =>
            prev.filter(
              (beneficiary) =>
                beneficiary.id !==
                deleteBeneficiary.id
            )
        );

        if (
          selectedBeneficiary ===
          deleteBeneficiary.id
        ) {

          resetRecipientFields();
        }

        setDeleteBeneficiary(
          null
        );

        setDeleteSuccess(
          true
        );

      } catch (error) {

        console.error(
          "Failed to delete beneficiary:",
          error
        );

        const message =
          error.response?.data ||
          "Unable to delete beneficiary.";

        alert(
          typeof message === "string"
            ? message
            : "Unable to delete beneficiary."
        );

      } finally {

        setDeletingBeneficiary(
          false
        );
      }
    };

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const filteredBeneficiaries =
    beneficiaries.filter(
      (user) =>
        `${user.name || ""} ${
          user.bankName || ""
        }`
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  // --------------------------------------------------
  // RECENT BENEFICIARY
  // --------------------------------------------------

  const selectRecentBeneficiary = (
    user
  ) => {

    handleBeneficiarySelect(
      user
    );

    if (
      transferMethod === "upi"
    ) {

      setUpiId(
        user.upiId || ""
      );

      setConfirmUpiId(
        user.upiId || ""
      );
    }
  };

  // ==================================================
  // RETURN
  // ==================================================

  return (

   <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* ==============================================
          HEADER
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">
            Transfer Money
          </h1>

        </div>

        <button
          onClick={() =>
            navigate("/notifications")
          }
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <FaBell />
        </button>

      </div>

      {/* ==============================================
          BALANCE
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-6">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-300 text-sm">
                Available Balance
              </p>

              <h2 className="text-4xl font-bold mt-2">

                {money
                  ? loadingBalance
                    
                    : `₹${availableBalance.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}`
                 }

              </h2>

              <p className="text-green-400 mt-2 text-sm">
                Current account balance
              </p>

            </div>

            
          </div>

        </div>

      </div>

      {/* ==============================================
          TRANSFER METHOD
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-8">

        <h2 className="text-xl font-semibold mb-5">
          Choose Transfer Method
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {/* BANK */}

          <button
            onClick={() =>
              handleMethodChange("bank")
            }
            className={`rounded-3xl p-6 border transition-all duration-300 ${
              transferMethod === "bank"
                ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                : "bg-white/10 border-white/20 hover:bg-white/15"
            }`}
          >

            <FaUniversity className="text-3xl mb-4 mx-auto" />

            <h3 className="font-semibold text-lg">
              Bank Transfer
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              Send money to any bank account.
            </p>

          </button>

          {/* UPI */}

          <button
            onClick={() =>
              handleMethodChange("upi")
            }
            className={`rounded-3xl p-6 border transition-all duration-300 ${
              transferMethod === "upi"
                ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                : "bg-white/10 border-white/20 hover:bg-white/15"
            }`}
          >

            <FaMobileAlt className="text-3xl mb-4 mx-auto" />

            <h3 className="font-semibold text-lg">
              UPI Transfer
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              Transfer instantly using UPI ID.
            </p>

          </button>

          {/* CONTACT */}

          <button
            onClick={() =>
              handleMethodChange("contact")
            }
            className={`rounded-3xl p-6 border transition-all duration-300 ${
              transferMethod === "contact"
                ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                : "bg-white/10 border-white/20 hover:bg-white/15"
            }`}
          >

            <FaUser className="text-3xl mb-4 mx-auto" />

            <h3 className="font-semibold text-lg">
              Contacts
            </h3>

            <p className="text-sm text-gray-300 mt-2">
              Send money to saved contacts.
            </p>

          </button>

        </div>

      </div>

      {/* ==============================================
          RECIPIENT DETAILS
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-semibold">
              Recipient Details
            </h2>

            <p className="text-gray-400 text-sm mt-1">

              {transferMethod === "bank" &&
                "Enter the recipient's bank account details."}

              {transferMethod === "upi" &&
                "Enter the recipient's UPI details."}

              {transferMethod === "contact" &&
                "Select a saved contact to continue."}

            </p>

          </div>

          {/* BANK */}

          {transferMethod === "bank" && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Recipient Name
                </label>

                <input
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) =>
                    setRecipientName(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Account Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={18}
                  placeholder="Enter account number"
                  value={recipientAccount}
                  onChange={(e) =>
                    setRecipientAccount(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Account Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={18}
                  placeholder="Re-enter account number"
                  value={confirmAccount}
                  onChange={(e) =>
                    setConfirmAccount(
                      e.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 outline-none ${
                    confirmAccount &&
                    confirmAccount !==
                      recipientAccount
                      ? "border-red-400"
                      : "border-white/20 focus:border-blue-400"
                  }`}
                />

                {confirmAccount &&
                  confirmAccount ===
                    recipientAccount && (

                  <p className="text-green-400 text-xs mt-2 flex items-center gap-2">

                    <FaCheckCircle />

                    Account numbers match

                  </p>

                )}

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Bank Name
                </label>

                <input
                  type="text"
                  placeholder="HDFC Bank"
                  value={recipientBank}
                  onChange={(e) =>
                    setRecipientBank(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  IFSC Code
                </label>

                <input
                  type="text"
                  maxLength={11}
                  placeholder="HDFC0001234"
                  value={ifsc}
                  onChange={(e) =>
                    setIfsc(
                      e.target.value.toUpperCase()
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 uppercase outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Account Type
                </label>

                <select
                  value={accountType}
                  onChange={(e) =>
                    setAccountType(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                >

                  <option className="text-black">
                    Savings
                  </option>

                  <option className="text-black">
                    Current
                  </option>

                </select>

              </div>

            </div>
          )}

          {/* UPI */}

          {transferMethod === "upi" && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Recipient Name
                </label>

                <input
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipientName}
                  onChange={(e) =>
                    setRecipientName(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  UPI ID
                </label>

                <input
                  type="text"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) =>
                    setUpiId(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Confirm UPI ID
                </label>

                <input
                  type="text"
                  placeholder="Re-enter UPI ID"
                  value={confirmUpiId}
                  onChange={(e) =>
                    setConfirmUpiId(
                      e.target.value
                    )
                  }
                  className={`w-full bg-white/10 border rounded-xl px-4 py-3 outline-none ${
                    confirmUpiId &&
                    confirmUpiId !==
                      upiId
                      ? "border-red-400"
                      : "border-white/20 focus:border-blue-400"
                  }`}
                />

                {confirmUpiId &&
                  confirmUpiId ===
                    upiId && (

                  <p className="text-green-400 text-xs mt-2 flex items-center gap-2">

                    <FaCheckCircle />

                    UPI IDs match

                  </p>
                )}

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Bank / UPI Provider
                </label>

                <input
                  type="text"
                  placeholder="Optional"
                  value={recipientBank}
                  onChange={(e) =>
                    setRecipientBank(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

            </div>
          )}

          {/* CONTACT */}

          {transferMethod === "contact" && (

            <div>

              <div className="relative mb-6">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search beneficiaries..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              {loadingBeneficiaries ? (

                <div className="text-center py-8 text-gray-400">
                  Loading beneficiaries...
                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {filteredBeneficiaries.map(
                    (user) => (

                      <button
                        key={user.id}
                        onClick={() =>
                          handleBeneficiarySelect(
                            user
                          )
                        }
                        className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition ${
                          selectedBeneficiary ===
                          user.id
                            ? "bg-blue-600/30 border-blue-400"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >

                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg shrink-0">

                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <div className="flex-1">

                          <p className="font-semibold">
                            {user.name}
                          </p>

                          <p className="text-sm text-gray-400">
                            {user.bankName}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {maskAccount(
                              user.accountNumber
                            )}
                          </p>

                        </div>

                        {selectedBeneficiary ===
                          user.id && (

                          <FaCheckCircle className="text-green-400 text-xl" />

                        )}

                      </button>

                    )
                  )}

                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ==============================================
          AMOUNT
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Transfer Amount
          </h2>

          <label className="block text-sm text-gray-300 mb-2">
            Amount
          </label>

          <input
            type="number"
            min="1"
            max="100000"
            placeholder="₹ Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-2xl font-semibold outline-none focus:border-blue-400"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            {[500, 1000, 5000, 10000].map(
              (value) => (

                <button
                  key={value}
                  onClick={() =>
                    setAmount(
                      String(value)
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
                >
                  ₹
                  {value.toLocaleString(
                    "en-IN"
                  )}
                </button>

              )
            )}

          </div>

          <p className="text-gray-400 text-xs mt-3">
            Maximum single transfer: ₹1,00,000
          </p>

          <div className="mt-8 border-t border-white/20 pt-6">

            <div className="flex justify-between mb-3">

              <span className="text-gray-300">
                Transfer Fee
              </span>

              <span>
                ₹0
              </span>

            </div>

            <div className="flex justify-between text-xl font-bold">

              <span>
                Total
              </span>

              <span>
                ₹
                {amount
                  ? Number(amount).toLocaleString(
                      "en-IN"
                    )
                  : "0"}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ==============================================
          RECENT BENEFICIARIES
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-semibold">
                Recent Beneficiaries
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Quickly select a saved recipient.
              </p>

            </div>

            <button
              onClick={() =>
                setShowAllBeneficiaries(
                  true
                )
              }
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              View All →
            </button>

          </div>

          {loadingBeneficiaries ? (

            <div className="text-center py-8 text-gray-400">
              Loading beneficiaries...
            </div>

          ) : beneficiaries.length === 0 ? (

            <div className="text-center py-8">

              <p className="text-gray-400">
                No beneficiaries saved yet.
              </p>

              <button
                onClick={() =>
                  setShowAddBeneficiary(
                    true
                  )
                }
                className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
              >

                <FaPlus />

                Add Beneficiary

              </button>

            </div>

          ) : (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {beneficiaries
                .slice(0, 4)
                .map((user) => (

                  <button
                    key={user.id}
                    onClick={() =>
                      selectRecentBeneficiary(
                        user
                      )
                    }
                    className={`border rounded-2xl p-5 transition-all duration-300 ${
                      selectedBeneficiary ===
                      user.id
                        ? "bg-blue-600/30 border-blue-400"
                        : "bg-white/5 border-white/10 hover:bg-blue-600/20"
                    }`}
                  >

                    <div className="relative w-16 h-16 mx-auto">

                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">

                        {user.name
                          ?.charAt(0)
                          .toUpperCase()}

                      </div>

                      {selectedBeneficiary ===
                        user.id && (

                        <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center">

                          <FaCheckCircle className="text-white text-sm" />

                        </div>
                      )}

                    </div>

                    <h3 className="mt-4 font-semibold">
                      {user.name}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {user.bankName}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {maskAccount(
                        user.accountNumber
                      )}
                    </p>

                  </button>

                ))}

            </div>
          )}

        </div>

      </div>

      {/* ==============================================
          TRANSFER DETAILS
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Transfer Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm text-gray-300 mb-2">
                Purpose
              </label>

              <select
                value={purpose}
                onChange={(e) =>
                  setPurpose(
                    e.target.value
                  )
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
              >

                <option className="text-black">
                  Personal
                </option>

                <option className="text-black">
                  Family
                </option>

                <option className="text-black">
                  Rent
                </option>

                <option className="text-black">
                  Shopping
                </option>

                <option className="text-black">
                  Business
                </option>

                <option className="text-black">
                  Bills
                </option>

                <option className="text-black">
                  Others
                </option>

              </select>

            </div>

            <div className="flex items-end">

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={
                    saveBeneficiary
                  }
                  onChange={(e) =>
                    setSaveBeneficiary(
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 accent-blue-600"
                />

                <span className="text-gray-200">
                  Save this beneficiary
                </span>

              </label>

            </div>

          </div>

          <div className="mt-6">

            <label className="block text-sm text-gray-300 mb-2">
              Notes (Optional)
            </label>

            <textarea
              rows={4}
              maxLength={250}
              placeholder="Add a message..."
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 resize-none outline-none focus:border-blue-400"
            />

            <p className="text-right text-xs text-gray-500 mt-1">
              {notes.length}/250
            </p>

          </div>

        </div>

      </div>

      {/* ==============================================
          SECURITY + SUMMARY
      ============================================== */}

      <div className="max-w-6xl mx-auto px-6 mt-10 mb-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl mb-4">
              🔒
            </div>

            <h2 className="text-xl font-semibold">
              Secure Transfer
            </h2>

            <p className="text-gray-300 mt-3 leading-7">
              Your transfer is protected with transaction PIN verification.
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between">

                <span>
                  PIN Verification
                </span>

                <span className="text-green-400">
                  Enabled
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span>
                  Fraud Detection
                </span>

                <span className="text-green-400">
                  Active
                </span>

              </div>

            </div>

          </div>

          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Transfer Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between gap-4">

                <span className="text-gray-300">
                  Recipient
                </span>

                <span>
                  {recipientName || "-"}
                </span>

              </div>

              <div className="flex justify-between gap-4">

                <span className="text-gray-300">
                  Transfer Method
                </span>

                <span className="capitalize">
                  {transferMethod}
                </span>

              </div>

              {transferMethod === "bank" && (
                <>
                  <div className="flex justify-between gap-4">

                    <span className="text-gray-300">
                      Bank
                    </span>

                    <span>
                      {recipientBank || "-"}
                    </span>

                  </div>

                  <div className="flex justify-between gap-4">

                    <span className="text-gray-300">
                      Account
                    </span>

                    <span>
                      {recipientAccount
                        ? maskAccount(
                            recipientAccount
                          )
                        : "-"}
                    </span>

                  </div>

                  <div className="flex justify-between gap-4">

                    <span className="text-gray-300">
                      IFSC
                    </span>

                    <span>
                      {ifsc || "-"}
                    </span>

                  </div>
                </>
              )}

              {transferMethod === "upi" && (

                <div className="flex justify-between gap-4">

                  <span className="text-gray-300">
                    UPI ID
                  </span>

                  <span>
                    {upiId || "-"}
                  </span>

                </div>
              )}

              <div className="flex justify-between gap-4">

                <span className="text-gray-300">
                  Purpose
                </span>

                <span>
                  {purpose}
                </span>

              </div>

              <div className="flex justify-between gap-4">

                <span className="text-gray-300">
                  Transfer Amount
                </span>

                <span>
                  ₹
                  {amount
                    ? Number(
                        amount
                      ).toLocaleString(
                        "en-IN"
                      )
                    : "0"}
                </span>

              </div>

              <div className="flex justify-between gap-4">

                <span className="text-gray-300">
                  Transfer Fee
                </span>

                <span>
                  ₹0
                </span>

              </div>

              <hr className="border-white/20" />

              <div className="flex justify-between text-2xl font-bold">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {amount
                    ? Number(
                        amount
                      ).toLocaleString(
                        "en-IN"
                      )
                    : "0"}
                </span>

              </div>

            </div>

            <button
              onClick={handleReview}
              className="w-full mt-8 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-2xl py-4 text-lg font-semibold transition duration-300 shadow-lg"
            >
              Proceed to Review →
            </button>

          </div>

        </div>

      </div>

      {/* ==============================================
          VIEW ALL BENEFICIARIES MODAL
      ============================================== */}

      {showAllBeneficiaries && (

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-3xl max-h-[90vh] overflow-hidden bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl">

            <div className="bg-[#0A2245] border-b border-white/10 p-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  My Beneficiaries
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Manage your saved recipients.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAllBeneficiaries(
                    false
                  )
                }
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <FaTimes />
              </button>

            </div>

            <div className="p-6 max-h-[calc(90vh-110px)] overflow-y-auto">

              <div className="flex flex-col sm:flex-row gap-3 mb-6">

                <div className="relative flex-1">

                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search beneficiary..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                <button
                  onClick={() =>
                    setShowAddBeneficiary(
                      true
                    )
                  }
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
                >

                  <FaPlus />

                  Add Beneficiary

                </button>

              </div>

              <div className="space-y-4">

                {filteredBeneficiaries.map(
                  (user) => (

                    <div
                      key={user.id}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5"
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold shrink-0">

                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <div className="flex-1">

                          <h3 className="font-semibold text-lg">
                            {user.name}
                          </h3>

                          <p className="text-gray-400 text-sm">
                            {user.bankName} •{" "}
                            {user.accountType}
                          </p>

                          <p className="text-gray-500 text-sm mt-1">
                            Account{" "}
                            {maskAccount(
                              user.accountNumber
                            )}
                          </p>

                          <p className="text-gray-500 text-xs mt-1">
                            IFSC:{" "}
                            {user.ifsc}
                          </p>

                          {user.upiId && (
                            <p className="text-gray-500 text-xs mt-1">
                              UPI:{" "}
                              {user.upiId}
                            </p>
                          )}

                        </div>

                        <div className="flex gap-2">

                          {/* TRANSFER */}

                          <button
                            onClick={() => {

                              handleBeneficiarySelect(
                                user
                              );

                              setShowAllBeneficiaries(
                                false
                              );

                            }}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-semibold"
                          >
                            Transfer
                          </button>

                          {/* EDIT */}

                          <button
                            onClick={() =>
                              openEditBeneficiary(
                                user
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center"
                            title="Edit beneficiary"
                          >
                            <FaEdit />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDeleteBeneficiary(
                                user
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center"
                            title="Delete beneficiary"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

                {filteredBeneficiaries.length ===
                  0 && (

                  <div className="text-center py-12 text-gray-400">
                    No beneficiaries found.
                  </div>

                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==============================================
          ADD BENEFICIARY MODAL
      ============================================== */}

      {showAddBeneficiary && (

        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl">

            <div className="bg-[#0A2245] border-b border-white/10 p-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Add Beneficiary
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Save a recipient for faster transfers.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAddBeneficiary(
                    false
                  )
                }
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={
                handleAddBeneficiary
              }
              className="p-6 space-y-5 max-h-[calc(90vh-110px)] overflow-y-auto"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Recipient Name *
                  </label>

                  <input
                    name="name"
                    type="text"
                    placeholder="Karthi"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Bank Name *
                  </label>

                  <input
                    name="bank"
                    type="text"
                    placeholder="HDFC Bank"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Account Number *
                  </label>

                  <input
                    name="account"
                    type="text"
                    inputMode="numeric"
                    maxLength={18}
                    placeholder="Enter account number"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Confirm Account Number *
                  </label>

                  <input
                    name="confirmAccount"
                    type="text"
                    inputMode="numeric"
                    maxLength={18}
                    placeholder="Re-enter account number"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    IFSC Code *
                  </label>

                  <input
                    name="ifsc"
                    type="text"
                    maxLength={11}
                    placeholder="HDFC0001234"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 uppercase outline-none focus:border-blue-400"
                  />

                </div>

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Account Type
                  </label>

                  <select
                    name="accountType"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  >

                    <option className="text-black">
                      Savings
                    </option>

                    <option className="text-black">
                      Current
                    </option>

                  </select>

                </div>

              </div>

              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  UPI ID (Optional)
                </label>

                <input
                  name="upi"
                  type="text"
                  placeholder="example@upi"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                />

              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddBeneficiary(
                      false
                    )
                  }
                  className="flex-1 bg-white/10 hover:bg-white/20 rounded-xl py-3 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    savingBeneficiary
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3 font-semibold"
                >

                  {savingBeneficiary
                    ? "Saving..."
                    : "Save Beneficiary"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==============================================
          EDIT BENEFICIARY MODAL
      ============================================== */}

      {editingBeneficiary && (

        <div className="fixed inset-0 z-80 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

          <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl">

            <div className="bg-[#0A2245] border-b border-white/10 p-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Edit Beneficiary
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Update saved beneficiary details.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingBeneficiary(
                    null
                  )
                }
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <FaTimes />
              </button>

            </div>

            <form
              onSubmit={
                handleUpdateBeneficiary
              }
              className="p-6 space-y-5 max-h-[calc(90vh-110px)] overflow-y-auto"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Recipient Name *
                  </label>

                  <input
                    type="text"
                    value={
                      editingBeneficiary.name ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                {/* BANK */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Bank Name *
                  </label>

                  <input
                    type="text"
                    value={
                      editingBeneficiary.bankName ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "bankName",
                        e.target.value
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                {/* ACCOUNT */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Account Number *
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={18}
                    value={
                      editingBeneficiary.accountNumber ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "accountNumber",
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

                {/* IFSC */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    IFSC Code *
                  </label>

                  <input
                    type="text"
                    maxLength={11}
                    value={
                      editingBeneficiary.ifsc ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "ifsc",
                        e.target.value.toUpperCase()
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 uppercase outline-none focus:border-blue-400"
                  />

                </div>

                {/* ACCOUNT TYPE */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    Account Type
                  </label>

                  <select
                    value={
                      editingBeneficiary.accountType ||
                      "Savings"
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "accountType",
                        e.target.value
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  >

                    <option className="text-black">
                      Savings
                    </option>

                    <option className="text-black">
                      Current
                    </option>

                  </select>

                </div>

                {/* UPI */}

                <div>

                  <label className="block text-sm text-gray-300 mb-2">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={
                      editingBeneficiary.upiId ||
                      ""
                    }
                    onChange={(e) =>
                      handleEditChange(
                        "upiId",
                        e.target.value
                      )
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
                  />

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  disabled={
                    updatingBeneficiary
                  }
                  onClick={() =>
                    setEditingBeneficiary(
                      null
                    )
                  }
                  className="flex-1 bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-xl py-3 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    updatingBeneficiary
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3 font-semibold"
                >

                  {updatingBeneficiary
                    ? "Updating..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ==============================================
          DELETE CONFIRMATION MODAL
      ============================================== */}

      {deleteBeneficiary && (

        <div className="fixed inset-0 z-100 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">

              <FaTrash className="text-red-400 text-2xl" />

            </div>

            <h2 className="text-2xl font-bold text-center mt-5">
              Delete Beneficiary?
            </h2>

            <p className="text-gray-400 text-center mt-3 leading-6">

              Are you sure you want to delete{" "}

              <span className="text-white font-semibold">
                {deleteBeneficiary.name}
              </span>

              ?

            </p>

            <p className="text-gray-500 text-sm text-center mt-2">
              This beneficiary will be permanently removed.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-7">

              <button
                type="button"
                disabled={
                  deletingBeneficiary
                }
                onClick={() =>
                  setDeleteBeneficiary(
                    null
                  )
                }
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded-xl py-3 font-semibold transition"
              >
                No
              </button>

              <button
                type="button"
                disabled={
                  deletingBeneficiary
                }
                onClick={
                  confirmDeleteBeneficiary
                }
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl py-3 font-semibold transition"
              >

                {deletingBeneficiary
                  ? "Deleting..."
                  : "Yes, Delete"}

              </button>

            </div>

          </div>

        </div>
      )}

      {/* ==============================================
          EDIT SUCCESS MODAL
      ============================================== */}

      {editSuccess && (

        <div className="fixed inset-0 z-110 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">

              <FaCheckCircle className="text-green-400 text-3xl" />

            </div>

            <h2 className="text-2xl font-bold text-center mt-5">
              Updated Successfully
            </h2>

            <p className="text-gray-400 text-center mt-3">
              Beneficiary details have been updated successfully.
            </p>

            <button
              type="button"
              onClick={() =>
                setEditSuccess(false)
              }
              className="w-full mt-7 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
            >
              OK
            </button>

          </div>

        </div>
      )}

      {/* ==============================================
          DELETE SUCCESS MODAL
      ============================================== */}

      {deleteSuccess && (

        <div className="fixed inset-0 z-110 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-[#0A2245] border border-white/20 rounded-3xl shadow-2xl p-8">

            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">

              <FaCheckCircle className="text-green-400 text-3xl" />

            </div>

            <h2 className="text-2xl font-bold text-center mt-5">
              Deleted Successfully
            </h2>

            <p className="text-gray-400 text-center mt-3">
              The beneficiary has been deleted successfully.
            </p>

            <button
              type="button"
              onClick={() =>
                setDeleteSuccess(
                  false
                )
              }
              className="w-full mt-7 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  );
}