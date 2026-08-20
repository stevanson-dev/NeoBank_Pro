import { useNavigate } from "react-router-dom";

import {
  FaExchangeAlt,
  FaMoneyBillWave,
  FaWallet,
  FaFileInvoiceDollar,
  FaQrcode,
} from "react-icons/fa";


const actions = [
  {
    id: 1,
    title: "Transfer",
    icon: <FaExchangeAlt />,
    path: "/transfer",
  },

  {
    id: 2,
    title: "Deposit",
    icon: <FaMoneyBillWave />,
    path: "/deposit",
  },

  {
    id: 3,
    title: "Withdraw",
    icon: <FaWallet/>,
    path: "/withdraw",
  },

  {
    id: 4,
    title: "Pay Bills",
    icon: <FaFileInvoiceDollar />,
    path: "/pay-bills",
  },

  {
    id: 5,
    title: "QR Pay",
    icon: <FaQrcode />,
    path: "/qr-pay",
  },
];

export default function QuickActions() {

  const navigate = useNavigate();


  return (

    <div className="bg-[#141B34]/60 border border-white/10 rounded-3xl mb-3 p-4">

      {/* Heading */}

      <h2 className="text-xl font-bold text-white mb-5">
        Quick Actions
      </h2>


      {/* Buttons */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

        {actions.map((action) => (

          <button
            key={action.id}
            type="button"
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center justify-center rounded-2xl bg-[#1B2344] hover:bg-blue-600 transition-all duration-300 p-2 group"
          >

            {/* Icon */}

            <div className="w-10 h-10 rounded-full bg-[#2A3358] group-hover:bg-white flex items-center justify-center text-blue-400 group-hover:text-blue-600 text-2xl transition">

              {action.icon}

            </div>


            {/* Title */}

            <p className="text-white text-sm mt-1">
              {action.title}
            </p>

          </button>

        ))}

      </div>

    </div>

  );
}