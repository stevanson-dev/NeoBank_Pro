import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

import {
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

export default function TransferPin() {

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const [pin, setPin] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------
  // PIN CHANGE
  // --------------------------------

  const handleChange = (value, index) => {

    if (!/^\d?$/.test(value)) {
      return;
    }

    const newPin = [...pin];

    newPin[index] = value;

    setPin(newPin);
    setError("");

    if (value && index < 5) {

      document
        .getElementById(`pin-${index + 1}`)
        ?.focus();

    }
  };


  // --------------------------------
  // BACKSPACE
  // --------------------------------

  const handleKeyDown = (e, index) => {

    if (
      e.key === "Backspace" &&
      !pin[index] &&
      index > 0
    ) {

      document
        .getElementById(`pin-${index - 1}`)
        ?.focus();

    }
  };


  // --------------------------------
  // CONFIRM TRANSACTION
  // --------------------------------

  const handleConfirm = async () => {

    const enteredPin = pin.join("");

    setError("");

    // --------------------------------
    // PIN VALIDATION
    // --------------------------------

    if (enteredPin.length !== 6) {

      setError(
        "Please enter your 6-digit PIN."
      );

      return;
    }


    // ========================================
    // TRANSFER
    // ========================================

    if (type === "transfer") {

      // --------------------------------
      // GET TRANSFER DATA
      // --------------------------------

      const amount =
        Number(location.state?.amount);

      const method =
        location.state?.method || "bank";

      const recipientName =
        location.state?.recipientName;

      const recipientAccount =
        location.state?.recipientAccount;

      const recipientBank =
        location.state?.recipientBank || "";

      const ifsc =
        location.state?.ifsc || "";

      const purpose =
        location.state?.purpose || "Personal";

      const notes =
        location.state?.notes || "";

      const saveBeneficiary =
        location.state?.saveBeneficiary || false;


      // --------------------------------
      // VALIDATE AMOUNT
      // --------------------------------

      if (!amount || amount <= 0) {

        setError(
          "Invalid transfer amount."
        );

        return;
      }


      // --------------------------------
      // VALIDATE RECIPIENT NAME
      // --------------------------------

      if (!recipientName) {

        setError(
          "Recipient details are missing."
        );

        return;
      }


      // --------------------------------
      // VALIDATE ACCOUNT / UPI
      // --------------------------------

      if (!recipientAccount) {

        setError(
          "Recipient account details are missing."
        );

        return;
      }


      // --------------------------------
      // BANK VALIDATION
      // --------------------------------

      if (method === "bank") {

        if (!recipientBank) {

          setError(
            "Recipient bank details are missing."
          );

          return;
        }

        if (!ifsc) {

          setError(
            "IFSC code is missing."
          );

          return;
        }

      }


      try {

        setLoading(true);


        // ========================================
        // 1. ACTUAL MONEY TRANSFER
        // ========================================

        const response = await api.post(
          "/transfers",
          {
            amount: amount,

            recipientName:
              recipientName,

            recipientAccount:
              recipientAccount,

            recipientBank:
              recipientBank,

            method:
              method,

            pin:
              enteredPin,
          }
        );


        console.log(
          "Transfer response:",
          response.data
        );


        // ========================================
        // 2. SAVE BENEFICIARY
        // ========================================
        //
        // IMPORTANT:
        // Transfer is already successful here.
        //
        // Beneficiary save is a separate operation.
        //
        // If beneficiary save fails,
        // transfer should still remain successful.
        //
        // ========================================

        if (
          saveBeneficiary &&
          method === "bank"
        ) {

          try {

            const beneficiaryResponse =
              await api.post(
                "/beneficiaries",
                {
                  name:
                    recipientName,

                  bankName:
                    recipientBank,

                  accountNumber:
                    recipientAccount,

                  ifsc:
                    ifsc,

                  accountType:
                    "Savings",

                  upiId:
                    null,

                  nickname:
                    recipientName,
                }
              );


            console.log(
              "Beneficiary saved successfully:",
              beneficiaryResponse.data
            );

          } catch (beneficiaryError) {

            // --------------------------------
            // BENEFICIARY SAVE FAILED
            // --------------------------------
            //
            // DO NOT fail the transfer.
            //
            // Money transfer has already
            // succeeded.
            //
            // --------------------------------

            console.error(
              "Beneficiary save failed:",
              beneficiaryError
            );

          }

        }


        // ========================================
        // 3. GO TO PAYMENT PROCESSING
        // ========================================

        navigate(
          "/payment-processing",
          {
            state: {

              type:
                "transfer",

              amount:
                amount,

              method:
                method,

              recipientName:
                recipientName,

              transactionId:
                response.data.transactionId,

              purpose:
                purpose,

              notes:
                notes,

              savedBeneficiary:
                saveBeneficiary &&
                method === "bank",

              returnPath:
                "/Transfer-Success",
            },
          }
        );

      } catch (error) {

        // --------------------------------
        // TRANSFER FAILED
        // --------------------------------

        console.error(
          "Transfer error:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Transfer failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

      return;
    }


    // ========================================
    // DEPOSIT
    // ========================================

    if (type === "deposit") {

      const amount =
        Number(location.state?.amount);

      const method =
        location.state?.method || "bank";


      if (!amount || amount <= 0) {

        setError(
          "Invalid deposit amount."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await api.post(
            "/deposits",
            {
              amount:
                amount,

              method:
                method,

              pin:
                enteredPin,
            }
          );


        console.log(
          "Deposit response:",
          response.data
        );


        navigate(
          "/payment-processing",
          {
            state: {

              type:
                "deposit",

              amount:
                amount,

              method:
                method,

              transactionId:
                response.data.transactionId,

              returnPath:
                "/deposit",
            },
          }
        );

      } catch (error) {

        console.error(
          "Deposit error:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Deposit failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

      return;
    }


    // ========================================
    // WITHDRAW
    // ========================================

    if (type === "withdraw") {

      const amount =
        Number(location.state?.amount);

      const method =
        location.state?.method || "bank";


      if (!amount || amount <= 0) {

        setError(
          "Invalid withdrawal amount."
        );

        return;
      }


      try {

        setLoading(true);


        const response =
          await api.post(
            "/withdrawals",
            {
              amount:
                amount,

              method:
                method,

              pin:
                enteredPin,
            }
          );


        console.log(
          "Withdrawal response:",
          response.data
        );


        navigate(
          "/payment-processing",
          {
            state: {

              type:
                "withdraw",

              amount:
                amount,

              method:
                method,

              transactionId:
                response.data.transactionId,

              returnPath:
                "/withdraw",
            },
          }
        );

      } catch (error) {

        console.error(
          "Withdrawal error:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Withdrawal failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

      return;
    }


    // ========================================
// BILL PAYMENT
// ========================================

if (type === "bill") {

  // --------------------------------
  // GET BILL DATA
  // --------------------------------

  const amount =
    Number(location.state?.amount);

  const category =
    location.state?.category;

  const provider =
    location.state?.provider;

  const accountNumber =
    location.state?.accountNumber;


  // --------------------------------
  // VALIDATE AMOUNT
  // --------------------------------

  if (!amount || amount <= 0) {

    setError(
      "Invalid bill payment amount."
    );

    return;
  }


  // --------------------------------
  // VALIDATE CATEGORY
  // --------------------------------

  if (!category) {

    setError(
      "Bill category is missing."
    );

    return;
  }


  // --------------------------------
  // VALIDATE PROVIDER
  // --------------------------------

  if (!provider) {

    setError(
      "Bill provider is missing."
    );

    return;
  }


  // --------------------------------
  // VALIDATE ACCOUNT NUMBER
  // --------------------------------

  if (!accountNumber) {

    setError(
      "Bill account details are missing."
    );

    return;
  }


  try {

    setLoading(true);


    // ========================================
    // REAL BILL PAYMENT
    // ========================================

    const response =
      await api.post(
        "/bills",
        {
          amount:
            amount,

          category:
            category,

          provider:
            provider,

          accountNumber:
            accountNumber,

          pin:
            enteredPin,
        }
      );


    console.log(
      "Bill payment response:",
      response.data
    );


    // ========================================
    // PAYMENT PROCESSING
    // ========================================

    navigate(
      "/payment-processing",
      {
        state: {

          type:
            "bill",

          amount:
            amount,

          category:
            category,

          provider:
            provider,

          accountNumber:
            accountNumber,

          transactionId:
            response.data.transactionId,

          paymentId:
            response.data.transactionId,

          returnPath:
            "/pay-bills",
        },
      }
    );


  } catch (error) {

    console.error(
      "Bill payment error:",
      error
    );


    setError(
      error.response?.data?.message ||
      "Bill payment failed. Please try again."
    );


  } finally {

    setLoading(false);

  }

  return;
}


    // ========================================
// QR PAYMENT
// ========================================

if (type === "qr") {

  const amount =
    Number(location.state?.amount);

  const upiId =
    location.state?.upiId;


  // --------------------------------
  // VALIDATE AMOUNT
  // --------------------------------

  if (!amount || amount <= 0) {

    setError(
      "Invalid payment amount."
    );

    return;
  }


  // --------------------------------
  // VALIDATE UPI ID
  // --------------------------------

  if (!upiId || !upiId.trim()) {

    setError(
      "UPI ID is missing."
    );

    return;
  }


  try {

    setLoading(true);


    // ========================================
    // REAL QR PAYMENT
    // ========================================

    const response =
      await api.post(
        "/qr-payments",
        {
          amount:
            amount,

          upiId:
            upiId,

          pin:
            enteredPin,
        }
      );


    console.log(
      "QR payment response:",
      response.data
    );


    // ========================================
    // PAYMENT PROCESSING
    // ========================================

    navigate(
      "/payment-processing",
      {
        state: {

          type:
            "qr",

          amount:
            amount,

          upiId:
            upiId,

          transactionId:
            response.data.transactionId,

          returnPath:
            "/qr-pay",
        },
      }
    );


  } catch (error) {

    console.error(
      "QR payment error:",
      error
    );


    setError(
      error.response?.data?.message ||
      "QR payment failed. Please try again."
    );


  } finally {

    setLoading(false);

  }

  return;
}

    // ========================================
    // DEFAULT
    // ========================================

    navigate("/dashboard");
  };


  // ========================================
  // UI
  // ========================================

  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">


      {/* ========================================
          HEADER
      ======================================== */}

      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >

            <FaArrowLeft />

          </button>


          <div>

            <h1 className="text-3xl font-bold">
              PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Enter your PIN to complete the transaction
            </p>

          </div>

        </div>

      </div>


      {/* ========================================
          MAIN
      ======================================== */}

      <div className="max-w-4xl mx-auto px-6 py-10">


        {/* ========================================
            PIN CARD
        ======================================== */}

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8">


          {/* ========================================
              LOCK ICON
          ======================================== */}

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">

              <FaLock className="text-blue-400 text-3xl" />

            </div>

          </div>


          {/* ========================================
              HEADING
          ======================================== */}

          <div className="text-center mt-6">

            <h2 className="text-2xl font-bold">
              Enter Your PIN
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              Enter your 6-digit PIN to confirm and
              complete this transaction.
            </p>

          </div>


          {/* ========================================
              PIN BOXES
          ======================================== */}

          <div className="flex justify-center gap-2 sm:gap-3 mt-8">

            {pin.map((digit, index) => (

              <input
                key={index}
                id={`pin-${index}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e,
                    index
                  )
                }
                className={`w-11 h-14 sm:w-12 sm:h-14 bg-white/10 rounded-xl text-center text-xl font-bold text-white outline-none transition ${
                  error
                    ? "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
              />

            ))}

          </div>


          {/* ========================================
              ERROR
          ======================================== */}

          {error && (

            <p className="text-center text-red-400 text-sm font-medium mt-4">
              {error}
            </p>

          )}


          {/* ========================================
              SECURITY
          ======================================== */}

          <div className="flex items-start gap-3 mt-7 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-green-400 mt-1 shrink-0" />

            <p className="text-xs text-gray-400 leading-5">
              Your PIN is securely protected.
              Never share your PIN with anyone.
            </p>

          </div>


          {/* ========================================
              CONFIRM BUTTON
          ======================================== */}

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full mt-7 py-4 rounded-xl transition font-semibold text-lg ${
              loading
                ? "bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading
              ? "Processing..."
              : "Confirm"}

          </button>


          {/* ========================================
              FORGOT PIN
          ======================================== */}

          <button
            onClick={() =>
              navigate("/forgot-pin")
            }
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Forgot PIN?
          </button>

        </div>

      </div>

    </div>

  );
}