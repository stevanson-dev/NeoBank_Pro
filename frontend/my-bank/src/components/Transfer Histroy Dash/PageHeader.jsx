import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">

      <button
        onClick={() => navigate(-1)}
        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>

    </div>
  );
}