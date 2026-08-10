import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function PinUpdated() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}

      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          {/* Back Button */}

          <button
            onClick={() => navigate("/transfer-pin")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              PIN Updated
            </h1>

            <p className="text-gray-400 mt-1">
              Your transaction PIN has been changed
            </p>

          </div>

        </div>

      </div>


      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Success Card */}

        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 text-center">

          {/* Success Icon */}

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/20 flex items-center justify-center">

              <FaCheckCircle className="text-green-400 text-4xl" />

            </div>

          </div>


          {/* Heading */}

          <h2 className="text-2xl font-bold mt-7">
            PIN Updated Successfully
          </h2>


          {/* Description */}

          <p className="text-gray-400 text-sm mt-4 leading-6">
            Your new 6-digit transaction PIN has been
            updated successfully.
          </p>


          {/* Security Message */}

          <div className="flex items-start gap-3 text-left mt-7 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-blue-400 mt-1 `shrink-0`" />

            <p className="text-xs text-gray-400 leading-5">
              Your new PIN can now be used for transfers
              and other secure payments.
            </p>

          </div>


          {/* Back to Transfer */}

          <button
            onClick={() => navigate("/transfer")}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Back to Transfer
          </button>


          {/* Dashboard */}

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Go to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}