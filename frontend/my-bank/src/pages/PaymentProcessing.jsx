import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentProcessing() {
  const navigate = useNavigate();
  const location = useLocation();

  const { type, amount, method  } = location.state || {};

  const [completed, setCompleted] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    // 3 seconds processing complete
    setCompleted(true);

    // Green tick show ஆன பிறகு
    setTimeout(() => {

      if (type === "deposit") {
        navigate("/deposit", {
          state: {
            depositSuccess: true,
            amount: amount,
            method: method,
          },
        });
        return;
      }

      if (type === "transfer") {
        navigate("/Transfer-Success");
        return;
      }

     if (type === "bill") {
  navigate("/pay-bills", {
    state: {
      billSuccess: true,
      amount: amount,
      category: location.state?.category,
      provider: location.state?.provider,
    },
  });
        return;
      }

    if (type === "qr") {
  navigate("/qr-pay", {
    state: {
      qrSuccess: true,
      amount: amount,
      upiId: location.state?.upiId,
    },
  });

  return;
}

      // type கிடைக்கவில்லை என்றால்
      navigate("/Dashboard");

    }, 700);
  }, 3000);

  return () => clearTimeout(timer);
}, [navigate, type, amount, method]);

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <div className="text-center">

        {/* Payment Animation */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">

          {/* Blue glow */}
          <div
            className={`absolute w-64 h-64 rounded-full blur-3xl transition-all duration-700 ${
              completed ? "bg-green-500/30" : "bg-blue-500/30"
            }`}
          />

          {/* Outer rotating ring */}
          <div
            className={`absolute w-56 h-56 rounded-full border-[5px] border-transparent transition-all duration-700 ${
              completed
                ? "border-green-400"
                : "border-t-blue-500 border-r-green-400 animate-spin"
            }`}
          />

          {/* Second ring */}
          {!completed && (
            <div className="absolute w-44 h-44 rounded-full border-2 border-blue-400/40 animate-pulse" />
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
              /* Tick */
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
              /* Small loading dot */
              <div className="w-5 h-5 rounded-full bg-linear-to-r from-blue-500 to-green-400 animate-pulse" />
            )}

          </div>
        </div>

        {/* Text */}
        <div className="mt-8">

          <h1
            className={`text-2xl font-semibold transition-all duration-500 ${
              completed
                ? "text-green-400"
                : "bg-linear-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            }`}
          >
            {completed ? "Payment Successful" : "Processing Payment"}
          </h1>

          <p className="text-gray-400 mt-3 text-sm">
            {completed
              ? "Your payment has been processed successfully."
              : "Please wait while we securely process your payment..."}
          </p>

        </div>

      </div>
    </div>
  );
}