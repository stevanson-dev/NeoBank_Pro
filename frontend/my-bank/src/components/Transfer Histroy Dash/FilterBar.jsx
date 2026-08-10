import { FaSearch } from "react-icons/fa";

export default function FilterBar() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

      {/* Search */}
      <div className="md:col-span-2 relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search transaction..."
          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-400"
        />

      </div>


      {/* Category */}
      <select
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >
        <option className="text-black">
          All Categories
        </option>

        <option className="text-black">
          Transfer
        </option>

        <option className="text-black">
          Shopping
        </option>

        <option className="text-black">
          Bills
        </option>

        <option className="text-black">
          Income
        </option>

      </select>


      {/* Status */}
      <select
        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none"
      >

        <option className="text-black">
          All Status
        </option>

        <option className="text-black">
          Success
        </option>

        <option className="text-black">
          Pending
        </option>

        <option className="text-black">
          Failed
        </option>

      </select>


    </div>
  );
}