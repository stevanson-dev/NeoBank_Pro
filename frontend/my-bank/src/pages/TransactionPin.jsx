import { useState } from "react";
import { useNavigate , useLocation,} from "react-router-dom";

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

  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to next box automatically
    if (value && index < 5) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`)?.focus();
    }
  };

  const handleConfirm = () => {
  const enteredPin = pin.join("");

  if (enteredPin.length !== 6) {
    alert("Please enter your 6-digit PIN");
    return;
  }

  let returnPath = "/dashboard";

  if (type === "transfer") {
    returnPath = "/Transfer-Success";
  }

  if (type === "deposit") {
    returnPath = "/deposit";
  }

  if (type === "bill") {
    returnPath = "/pay-bills";
  }

  if (type === "qr") {
    returnPath = "/qr-pay";
  }

 navigate("/payment-processing", {
  state: {
    type: type,
    amount: location.state?.amount,
    method: location.state?.method,
    category: location.state?.category,
    provider: location.state?.provider,
    upiId: location.state?.upiId,
    returnPath,
  },
});
};

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}

      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          {/* Back Button */}

          <button
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          {/* Page Title */}

          <div>

            <h1 className="text-3xl font-bold">
               PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Enter your PIN to complete the transfer
            </p>

          </div>

        </div>

      </div>


      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* PIN Card */}

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8">

          {/* Lock Icon */}

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">

              <FaLock className="text-blue-400 text-3xl" />

            </div>

          </div>


          {/* Heading */}

          <div className="text-center mt-6">

            <h2 className="text-2xl font-bold">
              Enter Your PIN
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              Enter your 6-digit PIN to confirm and
              complete this transfer.
            </p>

          </div>


          {/* PIN Boxes */}

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
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-11 h-14 sm:w-12 sm:h-14 bg-white/10 border border-white/10 rounded-xl text-center text-xl font-bold text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            ))}

          </div>


          {/* Security Message */}

          <div className="flex items-start gap-3 mt-7 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-green-400 mt-1 `shrink-0`" />

            <p className="text-xs text-gray-400 leading-5">
              Your PIN is securely protected.
              Never share your PIN with anyone.
            </p>

          </div>


          {/* Confirm Button */} 

          <button 
            onClick={handleConfirm}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Confirm Transfer
          </button>


          {/* Forgot PIN */}

          <button
            onClick={() => navigate("/forgot-pin")}
          className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
           >
         Forgot PIN?
          </button>

        </div>

      </div>

    </div>
  );
}