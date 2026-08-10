import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaLock,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function ForgotPin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const handleSendOTP = () => {
    if (!mobile) {
      alert("Please enter your mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Later connect this to backend OTP API
    console.log("OTP sent to:", mobile);

    navigate("/verify-pin-otp", {
      state: { mobile },
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

          {/* Title */}

          <div>

            <h1 className="text-3xl font-bold">
              Forgot PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Recover your secure transaction PIN
            </p>

          </div>

        </div>

      </div>


      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Forgot PIN Card */}

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8">

          {/* Icon */}

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">

              <FaLock className="text-blue-400 text-3xl" />

            </div>

          </div>


          {/* Heading */}

          <div className="text-center mt-6">

            <h2 className="text-2xl font-bold">
              Reset Your PIN
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              Enter your registered mobile number.
              We'll send you an OTP to verify your identity.
            </p>

          </div>


          {/* Mobile Number */}

          <div className="mt-8">

            <label className="text-gray-300 text-sm">
              Registered Mobile Number
            </label>

            <div className="relative mt-2">

              <FaMobileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>

          </div>


          {/* Security Message */}

          <div className="flex items-start gap-3 mt-6 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-blue-400 mt-1 `shrink-0`" />

            <p className="text-xs text-gray-400 leading-5">
              For your security, we'll verify your identity
              using a one-time password (OTP).
            </p>

          </div>


          {/* Send OTP Button */}    

          <button
            onClick={() => navigate("/verify-pin-otp")}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Send OTP
          </button>


          {/* Back to PIN */}

          <button
            onClick={() => navigate("/Transferpin")}
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Back to PIN
          </button>

        </div>

      </div>

    </div>
  );
}