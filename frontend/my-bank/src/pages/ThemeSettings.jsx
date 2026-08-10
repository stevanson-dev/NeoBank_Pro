import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  FaArrowLeft,
  FaSun,
  FaMoon,
  FaDesktop,
  FaCheck,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";


export default function ThemeSettings() {
    
    const { theme, setTheme } = useTheme();

  const navigate = useNavigate();


  const themes = [
    {
      id: "light",
      title: "Light",
      description: "Use a bright interface",
      icon: <FaSun />,
    },
    {
      id: "dark",
      title: "Dark",
      description: "Use a dark interface",
      icon: <FaMoon />,
    },
    {
      id: "system",
      title: "System Default",
      description: "Follow your device settings",
      icon: <FaDesktop />,
    },
  ];


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
              Theme
            </h1>

            <p className="text-gray-400 mt-1">
              Choose how NeoBank Pro looks
            </p>

          </div>

        </div>

      </div>



      {/* Theme Options */}

      <div className="max-w-3xl mx-auto px-6 mt-8 pb-12">

        <GlassCard className="p-8">

          <h2 className="text-2xl font-bold">
            Appearance
          </h2>

          <p className="text-gray-400 mt-2">
            Select your preferred theme.
          </p>


          <div className="mt-6 space-y-4">


            {themes.map((item) => (

              <button
                key={item.id}
                onClick={() => setTheme(item.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition ${
                  theme === item.id
                    ? "bg-blue-600/20 border-blue-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >


                {/* Icon */}

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    theme === item.id
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {item.icon}
                </div>



                {/* Text */}

                <div className="flex-1 text-left">

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {item.description}
                  </p>

                </div>



                {/* Selected */}

                {theme === item.id && (

                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">

                    <FaCheck size={14} />

                  </div>

                )}

              </button>

            ))}


          </div>


        </GlassCard>

      </div>


    </div>

  );
}