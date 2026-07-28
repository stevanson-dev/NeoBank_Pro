import { FaBars } from "react-icons/fa";


export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
            N
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            NeoBank <span className="text-blue-600">Pro</span>
          </h1>
        </div>

        {/* Menu */}

        <nav className="hidden lg:flex gap-8 font-medium text-slate-700">

          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Services
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            About
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>

        </nav>

        {/* Buttons */}
         
        <div className="hidden lg:flex gap-4">
           
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition duration-300">
            Login
          </button>
    

          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg">
            Get Started
          </button>

        </div>

        {/* Mobile Menu */}

        <button className="lg:hidden text-2xl">
          <FaBars />
        </button>

      </div>
    </header>
  );
}