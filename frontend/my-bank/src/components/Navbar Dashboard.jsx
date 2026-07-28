import { MdNotifications } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400">
          Here's your banking overview.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">

          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl bg-[#101827] py-3 pl-11 pr-4 text-white outline-none border border-slate-700"
          />

        </div>

        {/* Notification */}
        <button className="rounded-xl bg-[#101827] p-3 text-white hover:bg-slate-800">
          <MdNotifications size={24} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-[#101827] px-4 py-2 border border-slate-700">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            S
          </div>

          <div>
            <h2 className="text-white font-semibold">
              Stevanson
            </h2>

            <p className="text-xs text-gray-400">
              Premium User
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;