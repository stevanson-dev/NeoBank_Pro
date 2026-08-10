import { useState } from "react";
import { FaArrowLeft, FaBell, FaEye, FaEyeSlash,  FaUniversity, FaMobileAlt, FaCreditCard, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Transfer() {
  const navigate = useNavigate();
  const [money, setmoney] = useState(false);
  const [transferMethod, setTransferMethod] = useState("bank");
  const [amount, setAmount] = useState("");
  const beneficiaries = [
  {
    id: 1,
    name: "Karthi",
    bank: "HDFC Bank",
    avatar: "K",
  },
  {
    id: 2,
    name: "Arun",
    bank: "SBI",
    avatar: "A",
  },
  {
    id: 3,
    name: "Priya",
    bank: "ICICI Bank",
    avatar: "P",
  },
  {
    id: 4,
    name: "Rahul",
    bank: "Axis Bank",
    avatar: "R",
  },
];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">
            Transfer Money
          </h1>
        </div>

        <button onClick={() => navigate("/notifications")}
        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
          <FaBell />
        </button>
        
      </div>
          
{/* Balance Card */}
<div className="max-w-6xl mx-auto px-6 mt-6">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-300 text-sm">
          Available Balance
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {money ? "₹2,45,780.00 " : "₹********"}
        </h2>

        <p className="text-green-400 mt-2 text-sm">
          +₹12,500 this month
        </p>
      </div>

      <button onClick={() => setmoney(!money)}
      className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition">
        {money ? <FaEyeSlash /> : <FaEye size={18}/>}
        
      </button>
    </div>

  </div>
</div>

         {/* Transfer Method */}
<div className="max-w-6xl mx-auto px-6 mt-8">
  <h2 className="text-xl font-semibold mb-5">
    Choose Transfer Method
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

    {/* Bank */}
    <button
      onClick={() => setTransferMethod("bank")}
      className={`rounded-3xl p-6 border transition-all duration-300 ${
        transferMethod === "bank"
          ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          : "bg-white/10 border-white/20 hover:bg-white/15"
      }`}
    >
      <FaUniversity className="text-3xl mb-4 mx-auto" />
      <h3 className="font-semibold text-lg">Bank Transfer</h3>
      <p className="text-sm text-gray-300 mt-2">
        Send money to any bank account.
      </p>
    </button>

    {/* UPI */}
    <button
      onClick={() => setTransferMethod("upi")}
      className={`rounded-3xl p-6 border transition-all duration-300 ${
        transferMethod === "upi"
          ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          : "bg-white/10 border-white/20 hover:bg-white/15"
      }`}
    >
      <FaMobileAlt className="text-3xl mb-4 mx-auto" />
      <h3 className="font-semibold text-lg">UPI Transfer</h3>
      <p className="text-sm text-gray-300 mt-2">
        Transfer instantly using UPI ID.
      </p>
    </button>

    {/* Card */}
    <button
      onClick={() => setTransferMethod("card")}
      className={`rounded-3xl p-6 border transition-all duration-300 ${
        transferMethod === "card"
          ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          : "bg-white/10 border-white/20 hover:bg-white/15"
      }`}
    >
      <FaCreditCard className="text-3xl mb-4 mx-auto" />
      <h3 className="font-semibold text-lg">Card Transfer</h3>
      <p className="text-sm text-gray-300 mt-2">
        Transfer using debit or credit card.
      </p>
    </button>

    {/* Contact */}
    <button
      onClick={() => setTransferMethod("contact")}
      className={`rounded-3xl p-6 border transition-all duration-300 ${
        transferMethod === "contact"
          ? "bg-blue-600 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
          : "bg-white/10 border-white/20 hover:bg-white/15"
      }`}
    >
      <FaUser className="text-3xl mb-4 mx-auto" />
      <h3 className="font-semibold text-lg">Contacts</h3>
      <p className="text-sm text-gray-300 mt-2">
        Send money to saved contacts.
      </p>
    </button>

  </div>
</div>
      
{/* Recipient Details */}
<div className="max-w-6xl mx-auto px-6 mt-10">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-6">
      Recipient Details
    </h2>
      
      

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        

      {/* Recipient Name */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Recipient Name
        </label>

        <input
          type="text"
          placeholder="Enter recipient name"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
        />
      </div>

      {/* Account / UPI */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          {transferMethod === "upi"
            ? "UPI ID"
            : "Account Number"}
        </label>

        <input
          type="text"
          placeholder={
            transferMethod === "upi"
              ? "example@upi"
              : "Enter account number"
          }
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
        />
      </div>

      {/* IFSC - Bank மட்டும் */}
      {transferMethod === "bank" && (
        <>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              IFSC Code
            </label>

            <input
              type="text"
              placeholder="SBIN0001234"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Bank Name
            </label>

            <input
              type="text"
              placeholder="State Bank of India"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>
        </>
      )}

    </div>

  </div>
</div>
      
      {/* Amount Section */}
<div className="max-w-6xl mx-auto px-6 mt-10">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-6">
      Transfer Amount
    </h2>

    {/* Amount Input */}
    <div>
      <label className="block text-sm text-gray-300 mb-2">
        Amount
      </label>

      <input
        type="number"
        placeholder="₹ Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-2xl font-semibold outline-none focus:border-blue-400"
      />
    </div>

    {/* Quick Amount Buttons */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

      {[500, 1000, 5000, 10000].map((value) => (
        <button
          key={value}
          onClick={() => setAmount(value)}
          className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
        >
          ₹{value.toLocaleString()}
        </button>
      ))}

    </div>

    {/* Summary */}
    <div className="mt-8 border-t border-white/20 pt-6">

      <div className="flex justify-between mb-3">
        <span className="text-gray-300">Transfer Fee</span>
        <span>₹0</span>
      </div>

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>
          ₹{amount ? Number(amount).toLocaleString() : "0"}
        </span>
      </div>

    </div>

  </div>
</div>

      {/* Recent Beneficiaries */}
<div className="max-w-6xl mx-auto px-6 mt-10">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">
        Recent Beneficiaries
      </h2>

      <button className="text-blue-400 hover:text-blue-300">
        View All
      </button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

      {beneficiaries.map((user) => (
        <button
          key={user.id}
          className="bg-white/5 hover:bg-blue-600/30 border border-white/10 rounded-2xl p-5 transition-all duration-300"
        >
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mx-auto">
            {user.avatar}
          </div>

          <h3 className="mt-4 font-semibold">
            {user.name}
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            {user.bank}
          </p>
        </button>
      ))}

    </div>

  </div>
</div>


     {/* Purpose & Notes */}
<div className="max-w-6xl mx-auto px-6 mt-10">
  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

    <h2 className="text-2xl font-semibold mb-6">
      Transfer Details
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Purpose */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Purpose
        </label>

        <select
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
        >
          <option className="text-black">Personal</option>
          <option className="text-black">Family</option>
          <option className="text-black">Rent</option>
          <option className="text-black">Shopping</option>
          <option className="text-black">Business</option>
          <option className="text-black">Bills</option>
          <option className="text-black">Others</option>
        </select>
      </div>

      {/* Save Beneficiary */}
      <div className="flex items-end">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-600"
          />

          <span className="text-gray-200">
            Save this beneficiary
          </span>
        </label>
      </div>

    </div>

    {/* Notes */}
    <div className="mt-6">
      <label className="block text-sm text-gray-300 mb-2">
        Notes (Optional)
      </label>

      <textarea
        rows={4}
        placeholder="Add a message..."
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 resize-none outline-none focus:border-blue-400"
      />
    </div>

  </div>
</div>

      {/* Security & Summary */}
<div className="max-w-6xl mx-auto px-6 mt-10 mb-12">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {/* Security Card */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">

      <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl mb-4">
        🔒
      </div>

      <h2 className="text-xl font-semibold">
        Secure Transfer
      </h2>

      <p className="text-gray-300 mt-3 leading-7">
        Your transfer is protected with 256-bit encryption and OTP verification.
      </p>

      <div className="mt-6 space-y-3">

        <div className="flex items-center justify-between">
          <span>Encryption</span>
          <span className="text-green-400">Active</span>
        </div>

        <div className="flex items-center justify-between">
          <span>OTP Required</span>
          <span className="text-green-400">Enabled</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Fraud Detection</span>
          <span className="text-green-400">Active</span>
        </div>

      </div>

    </div>

    {/* Summary */}
    <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">

      <h2 className="text-2xl font-semibold mb-6">
        Transfer Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-300">Transfer Amount</span>
          <span>₹{amount ? Number(amount).toLocaleString() : "0"}</span>
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
          <span>
            ₹{amount ? Number(amount).toLocaleString() : "0"}
          </span>
        </div>

      </div>

     <button
  onClick={() => navigate("/review-transfer")}
  className="w-full mt-8 bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-2xl py-4 text-lg font-semibold transition duration-300 shadow-lg"
>
  Proceed to Review →
</button>

    </div>

  </div>
</div>

    </div>


  );
}