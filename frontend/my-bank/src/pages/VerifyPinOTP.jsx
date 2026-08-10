import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaShieldAlt,
  FaMobileAlt,
} from "react-icons/fa";

export default function VerifyPinOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // OTP timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // OTP input
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      alert("Please enter the 6-digit OTP.");
      return;
    }

    console.log("Entered OTP:", enteredOTP);

    // Later connect to backend OTP verification

    navigate("/create-new-pin");
  };

  // Resend OTP
  const handleResendOTP = () => {
    if (timer > 0) return;

    console.log("OTP resent to:", mobile);

    setOtp(["", "", "", "", "", ""]);
    setTimer(30);

    document.getElementById("otp-0")?.focus();
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
              Verify OTP
            </h1>

            <p className="text-gray-400 mt-1">
              Verify your identity to reset your PIN
            </p>

          </div>

        </div>

      </div>


      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* OTP Card */}

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-8">

          {/* Icon */}

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">

              <FaMobileAlt className="text-blue-400 text-3xl" />

            </div>

          </div>


          {/* Heading */}

          <div className="text-center mt-6">

            <h2 className="text-2xl font-bold">
              Enter OTP
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              We've sent a 6-digit OTP to your
              registered mobile number.
            </p>

            {/* Mobile Number */}

            {mobile && (
              <p className="text-blue-400 text-sm font-medium mt-2">
                +91 {mobile}
              </p>
            )}

          </div>


          {/* OTP Boxes */}

          <div className="flex justify-center gap-2 sm:gap-3 mt-8">

            {otp.map((digit, index) => (

              <input
                key={index}
                id={`otp-${index}`}
                type="text"
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


          {/* Resend OTP */}

          <div className="text-center mt-6">

            {timer > 0 ? (

              <p className="text-gray-400 text-sm">
                Resend OTP in{" "}
                <span className="text-blue-400 font-semibold">
                  {timer}s
                </span>
              </p>

            ) : (

              <button
                onClick={handleResendOTP}
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition"
              >
                Resend OTP
              </button>

            )}

          </div>


          {/* Security Message */}

          <div className="flex items-start gap-3 mt-7 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-blue-400 mt-1 `shrink-0`" />

            <p className="text-xs text-gray-400 leading-5">
              Never share your OTP with anyone.
              NeoBank Pro will never ask for your OTP.
            </p>

          </div>


          {/* Verify Button */} 

          <button
           onClick={() => navigate("/create-new-pin")}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Verify OTP
          </button>


          {/* Back */}

          <button
            onClick={() => navigate("/forgot-pin")}
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Change Mobile Number
          </button>

        </div>

      </div>

    </div>
  );
}