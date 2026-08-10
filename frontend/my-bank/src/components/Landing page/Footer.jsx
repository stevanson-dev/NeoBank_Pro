import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <section id="contact">
      

    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

      <div className="grid lg:grid-cols-5 gap-12">

        {/* Company */}

        <div className="lg:col-span-1">

          <h1 className="text-3xl font-bold text-white">
            NeoBank <span className="text-blue-500">Pro</span>
          </h1>

          <p className="text-slate-400 mt-5 leading-7">
            A modern digital banking platform designed
            for simple, secure and smarter financial management.
          </p>

          <div className="flex gap-3 mt-8">

            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-blue-600 transition">
              <FaFacebookF />
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-blue-600 transition">
              <FaTwitter />
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-pink-500 transition">
              <FaInstagram />
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-blue-700 transition">
              <FaLinkedinIn />
            </div>

          </div>

        </div>


        {/* Quick Links */}

        <div>

          <h3 className="text-white font-bold text-lg">
            Quick Links
          </h3>

          <ul className="space-y-4 mt-6 text-slate-400">

            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="#features" className="hover:text-white">
                Features
              </a>
            </li>

            <li>
              <a href="#security" className="hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>

          </ul>

        </div>


        {/* Banking */}

        <div>

          <h3 className="text-white font-bold text-lg">
            Banking
          </h3>

          <ul className="space-y-4 mt-6 text-slate-400">

            <li>Accounts</li>
            <li>Transfers</li>
            <li>Cards</li>
            <li>Transactions</li>
            <li>Analytics</li>

          </ul>

        </div>


        {/* Contact */}

        <div>

          <h3 className="text-white font-bold text-lg">
            Contact
          </h3>

          <div className="space-y-5 mt-6 text-slate-400">

            <div className="flex gap-3">
              <FaPhoneAlt className="text-blue-500 text-xl mt-1 shrink-0" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-blue-500 text-xl mt-1 shrink-0" />
              <span>support@neobankpro.com</span>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-blue-500 text-xl mt-1 shrink-0" />
              <span>Chennai, Tamil Nadu</span>
            </div>

          </div>

        </div>


        {/* Newsletter */}

        <div>

          <h3 className="text-white font-bold text-lg">
            Stay Updated
          </h3>

          <p className="text-slate-400 mt-6 leading-7">
            Get updates about the NeoBank Pro platform.
          </p>

          <div className="flex mt-6">

            <input
              type="email"
              placeholder="Email Address"
              className="bg-slate-800 text-white
              px-4 py-3 rounded-l-xl
              outline-none w-full min-w-0"
            />

            <button
              className="bg-blue-600 px-5
              rounded-r-xl text-white
              hover:bg-blue-700 transition"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-slate-800 mt-16 pt-8
        flex flex-col md:flex-row
        justify-between
        text-slate-500 text-sm">

        <p>
          © 2026 NeoBank Pro. All Rights Reserved.
        </p>

        <div className="flex flex-wrap gap-6 mt-4 md:mt-0">

          <span>Privacy Policy</span>

          <span>Terms & Conditions</span>

          <span>Security</span>

        </div>

      </div>

    </div>
    </section>
  );
}