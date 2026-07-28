import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGooglePlay,
  FaApple,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-8 py-20">

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Company */}

          <div>

            <h1 className="text-3xl font-bold text-white">
              Neo<span className="text-blue-500">Bank</span> Pro
            </h1>

            <p className="text-slate-400 mt-5 leading-7">
              Secure digital banking platform designed for modern users with
              advanced security and instant transactions.
            </p>

            <div className="flex gap-4 mt-8">

              <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 text-white cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 text-white cursor-pointer">
                <FaTwitter />
              </div>

              <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-500 text-white cursor-pointer">
                <FaInstagram />
              </div>

              <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 text-white cursor-pointer">
                <FaLinkedinIn />
              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white font-bold text-xl">
              Quick Links
            </h3>

            <ul className="space-y-4 mt-6 text-slate-400">
              <li>Home</li>
              <li>About</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Contact</li>
            </ul>

          </div>

          {/* Banking */}

          <div>

            <h3 className="text-white font-bold text-xl">
              Banking
            </h3>

            <ul className="space-y-4 mt-6 text-slate-400">
              <li>Accounts</li>
              <li>Transfers</li>
              <li>Cards</li>
              <li>Loans</li>
              <li>Investments</li>
            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-bold text-xl">
              Contact
            </h3>

            <div className="space-y-5 mt-6 text-slate-400">

              <div className="flex gap-3">
                <FaPhoneAlt className="text-blue-500 mt-1"/>
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <FaEnvelope className="text-blue-500 mt-1"/>
                <span>support@neobankpro.com</span>
              </div>

              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1"/>
                <span>Chennai, Tamil Nadu</span>
              </div>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-white font-bold text-xl">
              Newsletter
            </h3>

            <p className="text-slate-400 mt-6">
              Subscribe for latest banking updates.
            </p>

            <div className="flex mt-6">

              <input
                type="email"
                placeholder="Email Address"
                className="bg-slate-800 text-white px-4 py-3 rounded-l-xl outline-none w-full"
              />

              <button className="bg-blue-600 px-5 rounded-r-xl text-white">
                <FaPaperPlane />
              </button>

            </div>

            <div className="flex gap-4 mt-8">

              <button className="flex items-center gap-2 bg-slate-800 px-4 py-3 rounded-xl text-white">
                <FaGooglePlay />
                Google Play
              </button>

              <button className="flex items-center gap-2 bg-slate-800 px-4 py-3 rounded-xl text-white">
                <FaApple />
                App Store
              </button>

            </div>

          </div>

        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between text-slate-500">

          <p>© 2026 NeoBank Pro. All Rights Reserved.</p>

          <div className="flex gap-8 mt-4 md:mt-0">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Security</p>
          </div>

        </div>

      </div>

    </footer>
  );
}