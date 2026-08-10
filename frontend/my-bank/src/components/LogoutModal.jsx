import { FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function LogoutModal({ close, logout }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

      {/* Blur Background */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#102E5B]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <FaTimes />
        </button>


        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
          <FaSignOutAlt size={26} />
        </div>


        {/* Text */}
        <div className="text-center mt-5">

          <h2 className="text-2xl font-bold">
            Logout?
          </h2>

          <p className="text-gray-300 mt-3">
            Are you sure you want to logout from your NeoBank Pro account?
          </p>

        </div>


        {/* Buttons */}
        <div className="flex gap-3 mt-8">

          <button
            onClick={close}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold"
          >
            Cancel
          </button>


          <button
            onClick={logout}
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}