import { useNavigate } from "react-router-dom";

import {
  FaMoneyCheckAlt,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

export default function RecentTransactions({
  transactions = [],
}) {

  const navigate = useNavigate();

  // --------------------------------
  // Latest 4 transactions
  // --------------------------------

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 4);


  // --------------------------------
  // Transaction name
  // --------------------------------

  const getTransactionName = (type) => {

    switch (type) {

      case "DEPOSIT":
        return "Deposit";

      case "WITHDRAW":
        return "Withdrawal";

      case "TRANSFER":
        return "Transfer";

      case "TRANSFER_IN":
        return "Transfer Received";

      default:
        return "Transaction";
    }
  };


  // --------------------------------
  // Date formatter
  // --------------------------------

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // --------------------------------
  // Amount formatter
  // --------------------------------

  const formatAmount = (transaction) => {

    const amount = Number(
      transaction.amount || 0
    );

    const isIncome =
      transaction.type === "DEPOSIT" ||
      transaction.type === "TRANSFER_IN";

    return `${isIncome ? "+" : "-"}₹${amount.toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };


  return (

    <div className="bg-[#141B34] rounded-3xl p-4 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold text-white">
          Recent Transactions
        </h2>


        <button
          onClick={() =>
            navigate("/Transactions-History")
          }
          className="text-blue-400 hover:text-blue-300 font-medium transition"
        >
          View All
        </button>

      </div>


      {/* Transactions */}

      <div className="space-y-4">

        {recentTransactions.length === 0 ? (

          <div className="text-center py-8 text-gray-400">

            No transactions found.

          </div>

        ) : (

          recentTransactions.map((item) => {

            const isIncome =
              item.type === "DEPOSIT" ||
              item.type === "TRANSFER_IN";

            return (

              <div
                key={item.transactionId}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#1B2344] hover:bg-[#25315d] transition"
              >

                {/* Left */}

                <div className="flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      isIncome
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >

                    {isIncome ? (
                      <FaArrowDown />
                    ) : (
                      <FaArrowUp />
                    )}

                  </div>


                  <div>

                    <h3 className="text-white font-semibold">

                      {getTransactionName(
                        item.type
                      )}

                    </h3>


                    <p className="text-gray-400 text-sm">

                      {formatDate(
                        item.createdAt
                      )}

                    </p>

                  </div>

                </div>


                {/* Amount */}

                <h3
                  className={`font-bold ${
                    isIncome
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {formatAmount(item)}

                </h3>

              </div>

            );

          })

        )}

      </div>

    </div>

  );
}