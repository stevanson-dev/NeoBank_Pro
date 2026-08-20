import {
  FaTimes,
  FaDownload,
  FaBolt,
  FaTint,
  FaWifi,
  FaMobileAlt,
  FaReceipt,
} from "react-icons/fa";

export default function TransactionModal({
  transaction,
  close,
}) {
  if (!transaction) return null;


  // ========================================
  // AMOUNT FORMATTER
  // ========================================

  const formatAmount = (amount) => {

    const value = Number(amount);

    if (Number.isNaN(value)) {
      return "₹0.00";
    }

    return `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };


  // ========================================
  // DATE FORMATTER
  // ========================================

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


  // ========================================
  // TYPE LABEL
  // ========================================

  const getTypeLabel = (type) => {

    switch (type) {

      case "DEPOSIT":
        return "Deposit";

      case "WITHDRAW":
        return "Withdraw";

      case "TRANSFER":
        return "Transfer";

      case "TRANSFER_IN":
        return "Transfer Received";

      case "BILL_PAYMENT":
        return "Bill Payment";

      default:
        return type || "-";
    }
  };


  // ========================================
  // METHOD LABEL
  // ========================================

  const getMethodLabel = (method) => {

    if (!method) return "-";

    return method
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };


  // ========================================
  // BILL PAYMENT CHECK
  // ========================================

  const isBillPayment =
    transaction.originalType === "BILL_PAYMENT";


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
  // INCOME / EXPENSE
  // ========================================

  const isIncome =
    transaction.originalType === "DEPOSIT" ||
    transaction.originalType === "TRANSFER_IN";


  // ========================================
  // ACTUAL TRANSACTION AMOUNT
  // ========================================

  const actualAmount =
    transaction.originalAmount !== undefined
      ? transaction.originalAmount
      : transaction.amount;


  // ========================================
  // STATUS
  // ========================================

  const isSuccess =
    transaction.status === "SUCCESS" ||
    transaction.status === "Success";

  const isPending =
    transaction.status === "PENDING" ||
    transaction.status === "Pending";


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">


      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div
        onClick={close}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />


      {/* ========================================
          MODAL
      ======================================== */}

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-white shadow-2xl">


        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Transaction Details
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Transaction information
            </p>

          </div>


          <button
            onClick={close}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>

        </div>


        {/* ========================================
            BILL PAYMENT HEADER
        ======================================== */}

        {isBillPayment && (

          <div className="mt-6 flex items-center gap-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4">

            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">

              {getBillIcon(
                transaction.billCategory
              )}

            </div>


            <div>

              <p className="font-semibold text-lg">
                Bill Payment
              </p>

              <p className="text-sm text-gray-400">
                {transaction.billProvider ||
                  "Bill Provider"}
              </p>

            </div>

          </div>

        )}


        {/* ========================================
            AMOUNT
        ======================================== */}

        <div className="mt-7 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">

          <p className="text-gray-400 text-sm">
            Transaction Amount
          </p>


          <h3
            className={`text-3xl font-bold mt-2 ${
              isIncome
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {isIncome ? "+" : "-"}

            {formatAmount(actualAmount)}

          </h3>

        </div>


        {/* ========================================
            DETAILS
        ======================================== */}

        <div className="mt-7 space-y-5">


          {/* ========================================
              TRANSACTION ID
          ======================================== */}

          <div className="flex justify-between gap-4">

            <span className="text-gray-400">
              Transaction ID
            </span>

            <span className="font-medium text-right">
              #{transaction.transactionId}
            </span>

          </div>


          {/* ========================================
              TYPE
          ======================================== */}

          <div className="flex justify-between gap-4">

            <span className="text-gray-400">
              Type
            </span>

            <span className="font-medium text-right">

              {getTypeLabel(
                transaction.originalType ||
                transaction.type
              )}

            </span>

          </div>


          {/* ========================================
              BILL CATEGORY
          ======================================== */}

          {isBillPayment && (

            <div className="flex justify-between gap-4">

              <span className="text-gray-400">
                Bill Category
              </span>

              <span className="font-medium text-right">
                {transaction.billCategory ||
                  "-"}
              </span>

            </div>

          )}


          {/* ========================================
              BILL PROVIDER
          ======================================== */}

          {isBillPayment && (

            <div className="flex justify-between gap-4">

              <span className="text-gray-400">
                Provider
              </span>

              <span className="font-medium text-right max-w-[60%] wrap-break-words">

                {transaction.billProvider ||
                  "-"}

              </span>

            </div>

          )}


          {/* ========================================
              BILL ACCOUNT NUMBER
          ======================================== */}

          {isBillPayment &&
            transaction.billAccountNumber && (

              <div className="flex justify-between gap-4">

                <span className="text-gray-400">
                  Account Number
                </span>

                <span className="font-medium text-right">

                  {transaction.billAccountNumber}

                </span>

              </div>

            )}


          {/* ========================================
              METHOD
          ======================================== */}

          <div className="flex justify-between gap-4">

            <span className="text-gray-400">
              Method
            </span>

            <span className="font-medium text-right">

              {getMethodLabel(
                transaction.method
              )}

            </span>

          </div>


          {/* ========================================
              DATE
          ======================================== */}

          <div className="flex justify-between gap-4">

            <span className="text-gray-400">
              Date
            </span>

            <span className="font-medium text-right">

              {formatDate(
                transaction.createdAt
              )}

            </span>

          </div>


          {/* ========================================
              STATUS
          ======================================== */}

          <div className="flex justify-between items-center">

            <span className="text-gray-400">
              Status
            </span>


            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                isSuccess
                  ? "bg-green-500/20 text-green-400"
                  : isPending
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >

              {transaction.status}

            </span>

          </div>

        </div>


        {/* ========================================
            BILL PAYMENT SUCCESS MESSAGE
        ======================================== */}

        {isBillPayment &&
          isSuccess && (

            <div className="mt-7 bg-green-500/10 border border-green-500/20 rounded-2xl p-4">

              <p className="text-green-400 text-sm font-medium">
                Bill payment completed successfully.
              </p>

              <p className="text-gray-400 text-xs mt-1">
                Your payment has been recorded
                in your transaction history.
              </p>

            </div>

          )}


        {/* ========================================
            DOWNLOAD RECEIPT
        ======================================== */}

        <button
          onClick={() =>
            alert(
              "Receipt download functionality will be added next."
            )
          }
          className="w-full mt-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center gap-3 font-semibold hover:opacity-90 transition"
        >

          <FaDownload />

          Download Receipt

        </button>


        {/* ========================================
            CLOSE
        ======================================== */}

        <button
          onClick={close}
          className="w-full mt-3 py-3 rounded-2xl bg-white/10 hover:bg-white/15 transition text-gray-300"
        >
          Close
        </button>

      </div>

    </div>
  );
}