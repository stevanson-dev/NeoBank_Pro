import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaKey,
  FaLock,
  FaChevronRight,
} from "react-icons/fa";

import api from "../services/api";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function PinSecurity() {
  const navigate = useNavigate();

  const [hasPin, setHasPin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinStatus = async () => {
      try {
        const response = await api.get("/auth/me");

        setHasPin(response.data.hasPin);

      } catch (error) {
        console.error("Failed to fetch PIN status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPinStatus();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/settings")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              PIN Security
            </h1>

            <p className="text-gray-400 mt-1">
              Manage your transaction PIN
            </p>
          </div>

        </div>

      </div>


      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 mt-10 pb-12">


        {/* Security Info */}
        <GlassCard className="p-7 mb-6">

          <div className="text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-4">
              <FaKey className="text-xl" />
            </div>

            <h2 className="text-2xl font-semibold">
              Transaction PIN
            </h2>

            {!loading && (
              <p className="text-gray-400 mt-2 leading-relaxed">
                {hasPin
                  ? "Your transaction PIN is active and ready to use."
                  : "You haven't set a transaction PIN yet."}
              </p>
            )}

          </div>

        </GlassCard>


        {/* Loading */}
        {loading ? (

          <GlassCard className="p-6">

            <div className="text-center text-gray-400">
              Checking PIN status...
            </div>

          </GlassCard>

        ) : (

          <div className="space-y-5">


            {/* SET NEW PIN */}
            {!hasPin && (

              <GlassCard className="p-6">

                <button
                  onClick={() => navigate("/set-pin")}
                  className="w-full text-left"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-5">

                      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center text-blue-400">
                        <FaKey className="text-xl" />
                      </div>

                      <div>

                        <h2 className="text-xl font-semibold">
                          Set New PIN
                        </h2>

                        <p className="text-gray-400 mt-1">
                          Create a new 6-digit transaction PIN
                        </p>

                      </div>

                    </div>


                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                      <FaChevronRight />
                    </div>

                  </div>

                </button>

              </GlassCard>

            )}


            {/* CHANGE PIN */}
            {hasPin && (

              <GlassCard className="p-6">

                <button
                  onClick={() => navigate("/change-pin")}
                  className="w-full text-left"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-5">

                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-400/10 flex items-center justify-center text-purple-400">
                        <FaLock className="text-xl" />
                      </div>

                      <div>

                        <h2 className="text-xl font-semibold">
                          Change PIN
                        </h2>

                        <p className="text-gray-400 mt-1">
                          Update your existing transaction PIN
                        </p>

                      </div>

                    </div>


                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300">
                      <FaChevronRight />
                    </div>

                  </div>

                </button>

              </GlassCard>

            )}

          </div>

        )}


        {/* Security Note */}
        <div className="mt-6 px-4">

          <p className="text-sm text-gray-500 text-center">
            Never share your transaction PIN with anyone.
          </p>

        </div>

      </div>

    </div>
  );
}