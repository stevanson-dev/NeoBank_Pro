
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    type,
    amount,
    method,
    category,
    provider,
    accountNumber,
    transactionId,
    paymentId,
    purpose,
    notes,
  } = location.state || {};

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const processingTimer = setTimeout(() => {

      // --------------------------------
      // PROCESSING COMPLETE
      // --------------------------------

      setCompleted(true);

      // --------------------------------
      // SHOW SUCCESS FOR 700ms
      // --------------------------------

      const successTimer = setTimeout(() => {

        // ========================================
        // DEPOSIT
        // ========================================

        if (type === "deposit") {

          navigate("/deposit", {
            state: {
              depositSuccess: true,
              amount: amount,
              method: method,
              transactionId: transactionId,
            },
          });

          return;
        }


        // ========================================
        // WITHDRAW
        // ========================================

        if (type === "withdraw") {

          navigate("/withdraw", {
            state: {
              withdrawSuccess: true,
              amount: amount,
              transactionId: transactionId,
            },
          });

          return;
        }


        // ========================================
        // TRANSFER
        // ========================================

        if (type === "transfer") {

          navigate("/Transfer-Success", {
            state: {
              amount: amount,
              method: method,
              recipientName:
                location.state?.recipientName,
              transactionId:
                transactionId,
              purpose:
                purpose,
              notes:
                notes,
              savedBeneficiary:
                location.state?.savedBeneficiary,
            },
          });

          return;
        }


        // ========================================
        // BILL PAYMENT
        // ========================================

        if (type === "bill") {

          navigate("/pay-bills", {
            state: {
              billSuccess: true,

              amount:
                amount,

              category:
                category,

              provider:
                provider,

              accountNumber:
                accountNumber,

              transactionId:
                transactionId,

              paymentId:
                paymentId || transactionId,
            },
          });

          return;
        }


        // ========================================
        // QR PAYMENT
        // ========================================

        if (type === "qr") {

          navigate("/qr-pay", {
            state: {
              qrSuccess: true,

              amount:
                amount,

              upiId:
                location.state?.upiId,

              transactionId:
                transactionId,
            },
          });

          return;
        }


        // ========================================
        // DEFAULT
        // ========================================

        navigate("/dashboard");

      }, 700);


      // --------------------------------
      // CLEAN SUCCESS TIMER
      // --------------------------------

      return () => clearTimeout(successTimer);

    }, 3000);


    // --------------------------------
    // CLEAN PROCESSING TIMER
    // --------------------------------

    return () => clearTimeout(processingTimer);

  }, [
    navigate,
    type,
    amount,
    method,
    category,
    provider,
    accountNumber,
    transactionId,
    paymentId,
    purpose,
    notes,
  ]);


  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">

      <div className="text-center">

        {/* ========================================
            PAYMENT ANIMATION
        ======================================== */}

        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">

          {/* Blue / Green Glow */}

          <div
            className={`absolute w-64 h-64 rounded-full blur-3xl transition-all duration-700 ${
              completed
                ? "bg-green-500/30"
                : "bg-blue-500/30"
            }`}
          />


          {/* Outer Ring */}

          <div
            className={`absolute w-56 h-56 rounded-full border-[5px] border-transparent transition-all duration-700 ${
              completed
                ? "border-green-400"
                : "border-t-blue-500 border-r-green-400 animate-spin"
            }`}
          />


          {/* Second Ring */}

          {!completed && (

            <div
              className="absolute w-44 h-44 rounded-full border-2 border-blue-400/40 animate-pulse"
            />

          )}


          {/* Center Circle */}

          <div
            className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 ${
              completed
                ? "bg-green-500 scale-110"
                : "bg-white scale-100"
            }`}
          >

            {completed ? (

              /* ========================================
                  SUCCESS TICK
              ======================================== */

              <svg
                className="w-16 h-16 text-white"
                viewBox="0 0 52 52"
              >

                <path
                  d="M14 27 L23 36 L40 17"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[drawTick_0.5s_ease-out_forwards]"
                />

              </svg>

            ) : (

              /* ========================================
                  LOADING DOT
              ======================================== */

              <div
                className="w-5 h-5 rounded-full bg-linear-to-r from-blue-500 to-green-400 animate-pulse"
              />

            )}

          </div>

        </div>


        {/* ========================================
            STATUS TEXT
        ======================================== */}

        <div className="mt-8">

          <h1
            className={`text-2xl font-semibold transition-all duration-500 ${
              completed
                ? "text-green-400"
                : "bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            }`}
          >

            {completed
              ? "Payment Successful"
              : "Processing Payment"}

          </h1>


          <p className="text-gray-400 mt-3 text-sm">

            {completed
              ? type === "bill"
                ? "Your bill payment has been completed successfully."
                : "Your payment has been processed successfully."
              : "Please wait while we securely process your payment..."}

          </p>


          {/* ========================================
              BILL INFORMATION
          ======================================== */}

          {type === "bill" && (

            <div className="mt-6">

              <p className="text-gray-500 text-xs">
                {provider || "Bill Payment"}
              </p>

              {amount && (

                <p className="text-gray-300 text-lg font-semibold mt-1">
                  ₹{amount}
                </p>

              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
