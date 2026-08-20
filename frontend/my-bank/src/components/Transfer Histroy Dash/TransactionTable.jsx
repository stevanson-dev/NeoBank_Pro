import {
  FaArrowUp,
  FaArrowDown,
  FaBolt,
  FaTint,
  FaWifi,
  FaMobileAlt,
  FaReceipt,
} from "react-icons/fa";

import { useState } from "react";

import TransactionModal from "./TransactionModal";

export default function TransactionTable({
  transactions = [],
}) {

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);


  // ========================================
  // BILL CATEGORY ICON
  // ========================================

  const getBillIcon = (category) => {

    if (category === "Electricity") {
      return <FaBolt />;
    }

    if (category === "Water") {
      return <FaTint />;
    }

    if (category === "Internet") {
      return <FaWifi />;
    }

    if (category === "Mobile") {
      return <FaMobileAlt />;
    }

    return <FaReceipt />;
  };


  // ========================================
  // CONVERT BACKEND DATA → UI DATA
  // ========================================

  const formattedTransactions =
    transactions.map((transaction) => {

      const isIncome =
        transaction.type === "DEPOSIT" ||
        transaction.type === "TRANSFER_IN";


      const isBillPayment =
        transaction.type === "BILL_PAYMENT";


      // --------------------------------
      // DEFAULT VALUES
      // --------------------------------

      let name = "Transaction";
      let category = "Transaction";


      // ========================================
      // DEPOSIT
      // ========================================

      if (transaction.type === "DEPOSIT") {

        name = "Deposit";
        category = "Income";

      }


      // ========================================
      // WITHDRAW
      // ========================================

      else if (transaction.type === "WITHDRAW") {

        name = "Withdrawal";
        category = "Withdrawal";

      }


      // ========================================
      // TRANSFER
      // ========================================

      else if (transaction.type === "TRANSFER") {

        name = "Transfer";
        category = "Transfer";

      }


      // ========================================
      // TRANSFER RECEIVED
      // ========================================

      else if (transaction.type === "TRANSFER_IN") {

        name = "Transfer Received";
        category = "Transfer";

      }


      // ========================================
      // BILL PAYMENT
      // ========================================

      else if (isBillPayment) {

        name = "Bill Payment";

        category =
          transaction.billCategory ||
          "Bill Payment";

      }


      // ========================================
      // DATE
      // ========================================

      const date =
        transaction.createdAt
          ? new Date(
              transaction.createdAt
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : "-";


      // ========================================
      // AMOUNT
      // ========================================

      const amount =
        `${isIncome ? "+" : "-"}₹${Number(
          transaction.amount || 0
        ).toLocaleString("en-IN")}`;


      // ========================================
      // RETURN UI OBJECT
      // ========================================

      return {

        id:
          transaction.transactionId,

        transactionId:
          transaction.transactionId,

        name,

        category,

        date,

        amount,

        originalAmount:
          transaction.amount,

        type:
          isIncome
            ? "income"
            : "expense",

        status:
          transaction.status === "SUCCESS"
            ? "Success"
            : transaction.status,

        method:
          transaction.method,

        originalType:
          transaction.type,

        createdAt:
          transaction.createdAt,


        // ========================================
        // BILL DETAILS
        // ========================================

        isBillPayment,

        billCategory:
          transaction.billCategory,

        billProvider:
          transaction.billProvider,

        billAccountNumber:
          transaction.billAccountNumber,

      };

    });


  return (

    <div className="overflow-x-auto mt-8">

      <table className="w-full text-left text-white">

        <thead>

          <tr className="border-b border-white/20 text-gray-300">

            {/* ID */}

            <th className="py-4">
              ID
            </th>


            {/* Transaction */}

            <th>
              Transaction
            </th>


            {/* Category */}

            <th>
              Category
            </th>


            {/* Date */}

            <th>
              Date
            </th>


            {/* Amount */}

            <th>
              Amount
            </th>


            {/* Status */}

            <th>
              Status
            </th>

          </tr>

        </thead>


        <tbody>

          {formattedTransactions.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-12 text-gray-400"
              >
                No transactions found.
              </td>

            </tr>

          ) : (

            formattedTransactions.map(
              (item) => (

                <tr
                  key={item.id}
                  onClick={() =>
                    setSelectedTransaction(item)
                  }
                  className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
                >

                  {/* ========================================
                      ID
                  ======================================== */}

                  <td className="py-5">

                    {item.transactionId}

                  </td>


                  {/* ========================================
                      TRANSACTION
                  ======================================== */}

                  <td className="py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === "income"
                            ? "bg-green-500/20 text-green-400"
                            : item.isBillPayment
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >

                        {item.isBillPayment ? (

                          getBillIcon(
                            item.billCategory
                          )

                        ) : item.type === "income" ? (

                          <FaArrowDown />

                        ) : (

                          <FaArrowUp />

                        )}

                      </div>


                      <div>

                        <p className="font-medium">

                          {item.name}

                        </p>


                        {/* BILL PROVIDER */}

                        {item.isBillPayment &&
                          item.billProvider && (

                            <p className="text-xs text-gray-400 mt-1">

                              {item.billProvider}

                            </p>

                          )}

                      </div>

                    </div>

                  </td>


                  {/* ========================================
                      CATEGORY
                  ======================================== */}

                  <td>

                    <div>

                      <p>

                        {item.category}

                      </p>


                      {/* BILL ACCOUNT */}

                      {item.isBillPayment &&
                        item.billAccountNumber && (

                          <p className="text-xs text-gray-500 mt-1">

                            {item.billAccountNumber}

                          </p>

                        )}

                    </div>

                  </td>


                  {/* ========================================
                      DATE
                  ======================================== */}

                  <td className="text-gray-300">

                    {item.date}

                  </td>


                  {/* ========================================
                      AMOUNT
                  ======================================== */}

                  <td
                    className={
                      item.type === "income"
                        ? "text-green-400 font-semibold"
                        : "text-red-400 font-semibold"
                    }
                  >

                    {item.amount}

                  </td>


                  {/* ========================================
                      STATUS
                  ======================================== */}

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Success"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >

                      {item.status}

                    </span>

                  </td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>


      {/* ========================================
          TRANSACTION MODAL
      ======================================== */}

      <TransactionModal
        transaction={
          selectedTransaction
        }
        close={() =>
          setSelectedTransaction(null)
        }
      />

    </div>

  );
}