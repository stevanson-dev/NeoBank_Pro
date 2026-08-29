
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaHome,
  FaDownload,
  FaShareAlt,
} from "react-icons/fa";

export default function TransferSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data received from previous page
  const transferData = location.state || {};

  const {
    recipientName,
    recipientBank,
    recipientAccount,
    amount,
    transactionId,
    status,
    method,
    ifsc,
    purpose,
  } = transferData;

  // Mask account number
  const maskAccount = (account) => {
    if (!account) return "-";

    const value = String(account);

    if (value.length <= 4) {
      return value;
    }

    return `•••• ${value.slice(-4)}`;
  };

  // Download receipt
  const handleDownload = () => {
    const receipt = `
NEOBANK PRO
----------------------------

Transfer Successful

Recipient       : ${recipientName || "-"}
Bank            : ${recipientBank || "-"}
Account         : ${maskAccount(recipientAccount)}
Amount          : ₹${Number(amount || 0).toLocaleString("en-IN")}
Method          : ${method || "-"}
Transaction ID  : ${transactionId || "-"}
Status          : ${status || "SUCCESS"}
Purpose         : ${purpose || "-"}

----------------------------
Thank you for using NeoBank Pro.
`;

    const blob = new Blob([receipt], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `NeoBank-Transfer-${transactionId || "Receipt"}.txt`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  // Share receipt
  const handleShare = async () => {
    const shareText = `
Transfer Successful

Recipient: ${recipientName || "-"}
Bank: ${recipientBank || "-"}
Amount: ₹${Number(amount || 0).toLocaleString("en-IN")}
Transaction ID: ${transactionId || "-"}
Status: ${status || "SUCCESS"}
`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "NeoBank Pro Transfer",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);

        alert("Transfer details copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center text-white shadow-2xl">

        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">

          <FaCheckCircle className="text-green-400 text-6xl" />

        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mt-6">
          Transfer Successful
        </h1>

        <p className="text-gray-300 mt-3">
          Your money has been transferred successfully.
        </p>

        {/* Transaction Details */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-5">

          {/* Recipient */}
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">
              Recipient
            </span>

            <span className="font-semibold text-right">
              {recipientName || "-"}
            </span>
          </div>

          {/* Bank */}
          {recipientBank && (
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">
                Bank
              </span>

              <span className="font-semibold text-right">
                {recipientBank}
              </span>
            </div>
          )}

          {/* Account */}
          {recipientAccount && (
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">
                Account
              </span>

              <span className="font-semibold text-right">
                {maskAccount(recipientAccount)}
              </span>
            </div>
          )}

          {/* IFSC */}
          {ifsc && (
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">
                IFSC
              </span>

              <span className="font-semibold text-right">
                {ifsc}
              </span>
            </div>
          )}

          {/* Method */}
          {method && (
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">
                Transfer Method
              </span>

              <span className="font-semibold capitalize text-right">
                {method}
              </span>
            </div>
          )}

          {/* Amount */}
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">
              Amount
            </span>

            <span className="font-bold text-green-400 text-xl">
              ₹
              {Number(amount || 0).toLocaleString(
                "en-IN"
              )}
            </span>
          </div>

          {/* Transaction ID */}
          <div className="flex justify-between gap-6">
            <span className="text-gray-400">
              Transaction ID
            </span>

            <span className="font-mono text-sm text-right break-all">
              {transactionId || "-"}
            </span>
          </div>

          {/* Purpose */}
          {purpose && (
            <div className="flex justify-between gap-6">
              <span className="text-gray-400">
                Purpose
              </span>

              <span>
                {purpose}
              </span>
            </div>
          )}

          {/* Status */}
          <div className="flex justify-between gap-6 pt-3 border-t border-white/10">
            <span className="text-gray-400">
              Status
            </span>

            <span className="text-green-400 font-semibold">
              {status || "SUCCESS"}
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          {/* Receipt */}
          <button
            onClick={handleDownload}
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <FaDownload />

            Receipt
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="py-3 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2"
          >
            <FaShareAlt />

            Share
          </button>

          {/* Dashboard */}
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition flex items-center justify-center gap-2"
          >
            <FaHome />

            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}
