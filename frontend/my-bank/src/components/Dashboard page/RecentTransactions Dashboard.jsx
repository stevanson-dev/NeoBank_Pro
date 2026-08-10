 
 import { useNavigate } from "react-router-dom";
 import {
  FaAmazon,
  FaMoneyCheckAlt,
  FaUtensils,
  FaBolt,
} from "react-icons/fa";

const transactions = [
  {
    id: 1,
    icon: <FaAmazon className="text-orange-500" />,
    title: "Amazon Shopping",
    date: "24 May 2026",
    amount: "-$130.50",
    type: "debit",
  },
  {
    id: 2,
    icon: <FaMoneyCheckAlt className="text-green-500" />,
    title: "Salary Credit",
    date: "23 May 2026",
    amount: "+$3,200.00",
    type: "credit",
  },
  {
    id: 3,
    icon: <FaUtensils className="text-pink-500" />,
    title: "Swiggy Order",
    date: "23 May 2026",
    amount: "-$45.00",
    type: "debit",
  },
  {
    id: 4,
    icon: <FaBolt className="text-yellow-500" />,
    title: "Electricity Bill",
    date: "22 May 2026",
    amount: "-$80.00",
    type: "debit",
  },
];

export default function RecentTransactions() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#141B34] rounded-3xl   p-4 shadow-xl">

      <div className="flex items-center justify-between  mb-4">
        <h2 className="text-xl font-bold text-white">
          Recent Transactions
        </h2>

       <button
  onClick={() => navigate("/Transactions-History")}
  className="text-blue-400 hover:text-blue-300 font-medium transition"
>
  View All
</button>
      </div>

      <div className="space-y-4">

        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#1B2344] hover:bg-[#25315d] transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-[#2A3358] flex items-center justify-center text-xl">
                {item.icon}
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.date}
                </p>
              </div>

            </div>

            <h3
              className={`font-bold ${
                item.type === "credit"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {item.amount}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
}