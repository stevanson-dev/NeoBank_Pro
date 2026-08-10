import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaLanguage,
  FaCheck,
} from "react-icons/fa";

import GlassCard from "../components/Transfer Histroy Dash/GlassCard";

export default function LanguageSettings() {

  const navigate = useNavigate();

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  const languages = [
    {
      id: "English",
      title: "English",
      description: "Use English throughout the application",
    },
    {
      id: "Tamil",
      title: "தமிழ்",
      description: "Use Tamil throughout the application",
    },
    {
      id: "Hindi",
      title: "हिन्दी",
      description: "Use Hindi throughout the application",
    },
  ];

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] text-white">

      {/* Header */}

      <div className="max-w-4xl mx-auto px-6 pt-8">

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/Settings")}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold">
              Language
            </h1>

            <p className="text-gray-400 mt-1">
              Choose your preferred language
            </p>

          </div>

        </div>

      </div>


      {/* Language Card */}

      <div className="max-w-4xl mx-auto px-6 mt-8 pb-12">

        <GlassCard className="p-8">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-cyan-400">

              <FaLanguage size={24} />

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Select Language
              </h2>

              <p className="text-gray-400">
                Your selection will be saved automatically
              </p>

            </div>

          </div>


          <div className="space-y-4">

            {languages.map((item) => (

              <button
                key={item.id}
                onClick={() => handleLanguageChange(item.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition ${
                  language === item.id
                    ? "bg-blue-600/20 border-blue-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >

                <div className="flex-1 text-left">

                  <h3 className="text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {item.description}
                  </p>

                </div>


                {language === item.id && (

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