import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20  flex items-center justify-between">

      {/* Logo */}

      <Link to="/" className="flex items-center gap-2">

        <img
          src={logo}
          alt="NeoBank Pro Logo"
          className="w-12 h-12 object-contain"
        />

        <h1 className="text-2xl font-bold text-white">
          NeoBank <span className="text-blue-600">Pro</span>
        </h1>

      </Link>


      {/* Navigation */}

      <nav className="hidden lg:flex items-center gap-8 font-medium text-white">

        <a
          href="#home"
          className="hover:text-blue-600 transition"
        >
          Home
        </a>

        <a
          href="#features"
          className="hover:text-blue-600 transition"
        >
          Features
        </a>

        <a
          href="#security"
          className="hover:text-blue-600 transition"
        >
          Services
        </a>

        <a
          href="#contact"
          className="hover:text-blue-600 transition"
        >
          Contact
        </a>

      </nav>


      {/* Buttons */}

      <div className="hidden lg:flex items-center gap-4">

        <Link
          to="/login"
          className="bg-linear-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              text-white px-5 py-2.5 rounded-xl
              flex items-center justify-center gap-3
              transition shadow-xl shadow-blue-500/25"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-linear-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              text-white px-8 py-2.5 rounded-xl
              flex items-center justify-center gap-3
              transition shadow-xl shadow-blue-500/25"
        >
          Get Started
        </Link>

      </div>


      {/* Mobile */}

      <button className="lg:hidden text-xl text-slate-800">
        <FaBars />
      </button>

    </div>
  );
}