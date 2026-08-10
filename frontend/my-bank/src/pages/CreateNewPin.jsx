import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";

export default function CreateNewPin() {
  const navigate = useNavigate();

  const [newPin, setNewPin] = useState(["", "", "", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Handle PIN input
  const handlePinChange = (value, index, type) => {
    if (!/^\d?$/.test(value)) return;

    if (type === "new") {
      const updatedPin = [...newPin];
      updatedPin[index] = value;
      setNewPin(updatedPin);
    } else {
      const updatedPin = [...confirmPin];
      updatedPin[index] = value;
      setConfirmPin(updatedPin);
    }

    // Move to next box
    if (value && index < 5) {
      const prefix = type === "new" ? "new-pin" : "confirm-pin";

      document
        .getElementById(`${prefix}-${index + 1}`)
        ?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index, type) => {
    if (
      e.key === "Backspace" &&
      !(
        type === "new"
          ? newPin[index]
          : confirmPin[index]
      ) &&
      index > 0
    ) {
      const prefix = type === "new" ? "new-pin" : "confirm-pin";

      document
        .getElementById(`${prefix}-${index - 1}`)
        ?.focus();
    }
  };

  // Update PIN
  const handleUpdatePin = () => {
    const enteredNewPin = newPin.join("");
    const enteredConfirmPin = confirmPin.join("");

    if (enteredNewPin.length !== 6) {
      alert("Please enter your new 6-digit PIN.");
      return;
    }

    if (enteredConfirmPin.length !== 6) {
      alert("Please confirm your new 6-digit PIN.");
      return;
    }

    if (enteredNewPin !== enteredConfirmPin) {
      alert("PINs do not match. Please try again.");
      return;
    }

    // Later connect this to backend
    console.log("New PIN:", enteredNewPin);

    navigate("/pin-updated");
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
              Create New PIN
            </h1>

            <p className="text-gray-400 mt-1">
              Set a new secure transaction PIN
            </p>

          </div>

        </div>

      </div>


      {/* Main */}

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* PIN Card */}

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
              Set Your New PIN
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              Create a new 6-digit PIN for secure
              transfers and payments.
            </p>

          </div>


          {/* New PIN */}

          <div className="mt-8">

            <label className="text-gray-300 text-sm">
              New PIN
            </label>

            <div className="flex justify-center gap-2 sm:gap-3 mt-3">

              {newPin.map((digit, index) => (

                <input
                  key={index}
                  id={`new-pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handlePinChange(
                      e.target.value,
                      index,
                      "new"
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index,
                      "new"
                    )
                  }
                  className="w-11 h-14 sm:w-12 sm:h-14 bg-white/10 border border-white/10 rounded-xl text-center text-xl font-bold text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              ))}

            </div>

          </div>


          {/* Confirm PIN */}

          <div className="mt-7">

            <label className="text-gray-300 text-sm">
              Confirm New PIN
            </label>

            <div className="flex justify-center gap-2 sm:gap-3 mt-3">

              {confirmPin.map((digit, index) => (

                <input
                  key={index}
                  id={`confirm-pin-${index}`}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handlePinChange(
                      e.target.value,
                      index,
                      "confirm"
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index,
                      "confirm"
                    )
                  }
                  className="w-11 h-14 sm:w-12 sm:h-14 bg-white/10 border border-white/10 rounded-xl text-center text-xl font-bold text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />

              ))}

            </div>

          </div>


          {/* Security Message */}

          <div className="flex items-start gap-3 mt-7 p-4 rounded-xl bg-white/5 border border-white/10">

            <FaShieldAlt className="text-blue-400 mt-1 `shrink-0`" />

            <p className="text-xs text-gray-400 leading-5">
              Choose a PIN that is easy for you to
              remember but difficult for others to guess.
            </p>

          </div>


          {/* Update PIN */}    

          <button
            onClick={() => navigate("/pin-updated")}
            className="w-full mt-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-lg"
          >
            Update PIN
          </button>


          {/* Cancel */}

          <button
            onClick={() => navigate("/transfer-pin")}
            className="w-full mt-4 text-sm text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}