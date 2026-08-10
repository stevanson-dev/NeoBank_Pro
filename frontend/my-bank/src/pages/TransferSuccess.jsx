import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaDownload, FaShareAlt } from "react-icons/fa";

export default function TransferSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] flex items-center justify-center px-6">

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 text-center text-white">

        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
          <FaCheckCircle className="text-green-400 text-6xl" />
        </div>

        <h1 className="text-4xl font-bold mt-6">
          Transfer Successful
        </h1>

        <p className="text-gray-300 mt-3">
          Your money has been transferred successfully.
        </p>

        {/* Transaction Details */}
        <div className="mt-10 bg-white/5 rounded-2xl p-6 text-left space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-400">Recipient</span>
            <span>Karthi</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Bank</span>
            <span>HDFC Bank</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Amount</span>
            <span className="font-bold text-green-400">
              ₹15,000
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Transaction ID</span>
            <span>TXN847392615</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span className="text-green-400">
              Success
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

          <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2">
            <FaDownload />
            Receipt
          </button>

          <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center gap-2">
            <FaShareAlt />
            Share
          </button>

          <button
            onClick={() => navigate("/dashboard")}
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