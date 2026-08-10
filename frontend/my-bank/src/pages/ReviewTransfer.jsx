import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ReviewTransfer() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">

        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-3xl font-bold">
          Review Transfer
        </h1>

      </div>

         <div className="max-w-6xl mx-auto px-6 mt-6">

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <p className="text-gray-300 text-sm">
      From Account
    </p>

    <h2 className="text-2xl font-bold mt-2">
      NeoBank Pro Savings
    </h2>

    <p className="text-gray-400 mt-2">
      Account •••• 4589
    </p>

    <div className="mt-6 flex items-center justify-between">

      <div>
        <p className="text-gray-300 text-sm">
          Available Balance
        </p>

        <h3 className="text-3xl font-bold mt-1">
          ₹2,45,780.00
        </h3>
      </div>

      <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
        Active
      </div>

    </div>

  </div>

</div>

        {/* Recipient Card */}
<div className="max-w-6xl mx-auto px-6 mt-8">

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-5">

        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
          K
        </div>

        <div>
          <p className="text-gray-300 text-sm">
            Recipient
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Karthi
          </h2>

          <p className="text-gray-400 mt-2">
            HDFC Bank •••• 7821
          </p>
        </div>

      </div>

      <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium">
        Instant Transfer
      </div>

    </div>

  </div>

</div>

       {/* Transfer Details */}
<div className="max-w-6xl mx-auto px-6 mt-8">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-6">
      Transfer Details
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Transfer Amount</span>
        <span className="font-semibold text-xl">₹15,000</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Transfer Fee</span>
        <span>₹0</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">GST</span>
        <span>₹0</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Purpose</span>
        <span>Personal</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Transfer Date</span>
        <span>Today</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-300">Estimated Time</span>
        <span className="text-green-400">Instant</span>
      </div>

    </div>

  </div>
</div>

        
        {/* Notes */}
<div className="max-w-6xl mx-auto px-6 mt-8">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-4">
      Notes
    </h2>

    <p className="text-gray-300 leading-7">
      Monthly rent payment for August.
    </p>

  </div>
</div>


       {/* Payment Summary */}
<div className="max-w-6xl mx-auto px-6 mt-8 mb-12">

  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-6">
      Payment Summary
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span className="text-gray-300">Amount</span>
        <span>₹15,000</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-300">Transfer Fee</span>
        <span>₹0</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-300">GST</span>
        <span>₹0</span>
      </div>

      <hr className="border-white/20" />

      <div className="flex justify-between text-2xl font-bold">
        <span>Total</span>
        <span>₹15,000</span>
      </div>

    </div>

    <div className="grid grid-cols-2 gap-4 mt-8">

      <button
        onClick={() => navigate(-1)}
        className="py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition"
      >
        Cancel
      </button>

      <button
        onClick={() => navigate("/transaction-pin?type=transfer")}
        className="py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition font-semibold"
      >
        Confirm Transfer
      </button>

    </div>

  </div>

</div>

    </div>
  );
}