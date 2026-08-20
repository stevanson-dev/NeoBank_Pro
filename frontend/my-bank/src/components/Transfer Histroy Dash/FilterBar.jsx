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

      {/* Search */}

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


      {/* Category */}

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >

        <option value="ALL" className="text-black">
          All Categories
        </option>

        <option value="DEPOSIT" className="text-black">
          Deposit
        </option>

        <option value="WITHDRAW" className="text-black">
          Withdraw
        </option>

        <option value="TRANSFER" className="text-black">
          Transfer
        </option>

      </select>


      {/* Status */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >

        <option value="ALL" className="text-black">
          All Status
        </option>

        <option value="SUCCESS" className="text-black">
          Success
        </option>

        <option value="PENDING" className="text-black">
          Pending
        </option>

        <option value="FAILED" className="text-black">
          Failed
        </option>

      </select>

    </div>
  );
}