import { FaSearch } from "react-icons/fa";

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

      {/* =========================================================
          SEARCH
      ========================================================= */}

      <div className="md:col-span-2 relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transaction..."
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-400"
        />

      </div>


      {/* =========================================================
          CATEGORY
      ========================================================= */}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >

        {/* ALL */}
        <option value="ALL" className="text-black">
          All Categories
        </option>

        {/* DEPOSIT */}
        <option value="DEPOSIT" className="text-black">
          Deposit
        </option>

        {/* WITHDRAW */}
        <option value="WITHDRAW" className="text-black">
          Withdraw
        </option>

        {/* TRANSFER */}
        <option value="TRANSFER" className="text-black">
          Transfer
        </option>

        {/* BILL PAYMENT */}
        <option value="BILL_PAYMENT" className="text-black">
          Bill Payment
        </option>

        {/* QR PAYMENT */}
        <option value="QR_PAYMENT" className="text-black">
          QR Payment
        </option>

        {/* CARD PAYMENT */}
        <option value="CARD_PAYMENT" className="text-black">
          Card Payment
        </option>

      </select>


      {/* =========================================================
          STATUS
      ========================================================= */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >

        {/* ALL STATUS */}
        <option value="ALL" className="text-black">
          All Status
        </option>

        {/* SUCCESS */}
        <option value="SUCCESS" className="text-black">
          Success
        </option>

        {/* PENDING */}
        <option value="PENDING" className="text-black">
          Pending
        </option>

        {/* FAILED */}
        <option value="FAILED" className="text-black">
          Failed
        </option>

      </select>

    </div>
  );
}