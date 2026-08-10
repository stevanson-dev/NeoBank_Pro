import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function NotFound() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen bg-linear-to-br from-[#07162F] via-[#0A2245] to-[#102E5B] flex items-center justify-center px-6">


      <div className="text-center text-white">


        <h1 className="text-8xl font-bold text-cyan-400">
          404
        </h1>


        <h2 className="text-3xl font-bold mt-5">
          Page Not Found
        </h2>


        <p className="text-gray-400 mt-3 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>



        <div className="flex justify-center gap-4 mt-8">


          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition"
          >

            <FaArrowLeft />

            Go Back

          </button>




          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
          >

            <FaHome />

            Home

          </button>


        </div>


      </div>


    </div>

  );
}