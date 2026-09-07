import { useState } from "react";
import { FaFilePdf, FaFileCsv, FaTimes } from "react-icons/fa";

export default function ExportButtons({
  transactions = [],
}) {
  const [showModal, setShowModal] = useState(false);
  const [exportType, setExportType] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleOpenModal = (type) => {
    setExportType(type);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setExportType("");
    setFromDate("");
    setToDate("");
  };

  // =========================================================
  // FILTER TRANSACTIONS BY DATE
  // =========================================================

  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      if (!transaction.createdAt) {
        return false;
      }

      const transactionDate =
        new Date(transaction.createdAt);

      const selectedFromDate =
        new Date(`${fromDate}T00:00:00`);

      const selectedToDate =
        new Date(`${toDate}T23:59:59`);

      return (
        transactionDate >= selectedFromDate &&
        transactionDate <= selectedToDate
      );
    });
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    const date = new Date(dateValue);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================================================
  // CSV EXPORT
  // =========================================================

  const exportCSV = (data) => {
    const headers = [
      "Transaction ID",
      "Type",
      "Method",
      "Category",
      "Status",
      "Amount",
      "Date",
      "Bill Provider",
      "Bill Account Number",
      "UPI ID",
      "Notes",
    ];

    const rows = data.map((transaction) => [
      transaction.transactionId || "",
      transaction.type || "",
      transaction.method || "",
      transaction.category || "",
      transaction.status || "",
      transaction.amount || 0,
      formatDate(transaction.createdAt),
      transaction.billProvider || "",
      transaction.billAccountNumber || "",
      transaction.upiId || "",
      transaction.notes || "",
    ]);

    const escapeCSV = (value) => {
      const stringValue = String(value ?? "");

      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `neobank-transactions-${fromDate}-to-${toDate}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // PDF EXPORT
  // =========================================================

  const exportPDF = (data) => {
    const printWindow =
      window.open("", "_blank");

    if (!printWindow) {
      alert(
        "Please allow pop-ups to download the PDF."
      );
      return;
    }

    const rows = data
      .map(
        (transaction) => `
          <tr>
            <td>
              ${transaction.transactionId || "-"}
            </td>

            <td>
              ${transaction.type || "-"}
            </td>

            <td>
              ${transaction.method || "-"}
            </td>

            <td>
              ${transaction.status || "-"}
            </td>

            <td>
              ₹${Number(
                transaction.amount || 0
              ).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>

            <td>
              ${formatDate(
                transaction.createdAt
              )}
            </td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <title>
          NeoBank Pro - Transaction History
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 30px;
            color: #111827;
          }

          h1 {
            margin-bottom: 5px;
          }

          .subtitle {
            color: #6b7280;
            margin-bottom: 20px;
          }

          .range {
            margin-bottom: 20px;
            font-size: 14px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th {
            background: #1d4ed8;
            color: white;
            padding: 10px;
            text-align: left;
            font-size: 12px;
          }

          td {
            border: 1px solid #d1d5db;
            padding: 9px;
            font-size: 11px;
          }

          tr:nth-child(even) {
            background: #f3f4f6;
          }

          .summary {
            margin-top: 20px;
            font-size: 14px;
            font-weight: bold;
          }

          @media print {

            body {
              padding: 10px;
            }

            button {
              display: none;
            }

          }

        </style>

      </head>

      <body>

        <h1>
          NeoBank Pro
        </h1>

        <div class="subtitle">
          Transaction History
        </div>

        <div class="range">
          <strong>From:</strong>
          ${fromDate}

          &nbsp;&nbsp;

          <strong>To:</strong>
          ${toDate}
        </div>

        <table>

          <thead>

            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Method</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            ${
              rows ||
              `
                <tr>
                  <td colspan="6">
                    No transactions found.
                  </td>
                </tr>
              `
            }

          </tbody>

        </table>

        <div class="summary">

          Total Transactions:
          ${data.length}

        </div>

        <button
          onclick="window.print()"
          style="
            margin-top:20px;
            padding:10px 20px;
            background:#2563eb;
            color:white;
            border:none;
            border-radius:8px;
            cursor:pointer;
          "
        >
          Print / Save as PDF
        </button>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const handleDownload = () => {
    if (!fromDate || !toDate) {
      alert(
        "Please select both dates."
      );
      return;
    }

    if (fromDate > toDate) {
      alert(
        "From date cannot be later than To date."
      );
      return;
    }

    const filteredTransactions =
      getFilteredTransactions();

    if (filteredTransactions.length === 0) {
      alert(
        "No transactions found for the selected date range."
      );
      return;
    }

    if (exportType === "csv") {
      exportCSV(
        filteredTransactions
      );
    }

    if (exportType === "pdf") {
      exportPDF(
        filteredTransactions
      );
    }

    handleCancel();
  };

  return (
    <>
      {/* =====================================================
          EXPORT BUTTONS
      ===================================================== */}

      <div className="flex flex-wrap justify-end gap-3 mt-6">

        {/* PDF */}

        <button
          onClick={() =>
            handleOpenModal("pdf")
          }
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-red-400 font-medium"
        >
          <FaFilePdf />

          Export PDF
        </button>


        {/* CSV */}

        <button
          onClick={() =>
            handleOpenModal("csv")
          }
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-green-400 font-medium"
        >
          <FaFileCsv />

          Export CSV
        </button>

      </div>


      {/* =====================================================
          EXPORT MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* Background Blur */}

          <div
            onClick={handleCancel}
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
          />


          {/* Modal */}

          <div className="relative w-full max-w-md bg-[#102E5B] border border-white/20 rounded-3xl p-7 shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Export Transactions
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Select the date range to export
                </p>

              </div>


              {/* Close */}

              <button
                onClick={handleCancel}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white"
              >
                <FaTimes />
              </button>

            </div>


            {/* Export Type */}

            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">

              <p className="text-gray-400 text-sm">
                Export Format
              </p>

              <p className="font-semibold mt-1 uppercase text-white">
                {exportType}
              </p>

            </div>


            {/* From Date */}

            <div className="mt-6">

              <label className="text-gray-300 text-sm">
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                }
                style={{
                  colorScheme: "dark",
                }}
                className="w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>


            {/* To Date */}

            <div className="mt-5">

              <label className="text-gray-300 text-sm">
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
                style={{
                  colorScheme: "dark",
                }}
                className="w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />

            </div>


            {/* Buttons */}

            <div className="flex gap-3 mt-7">

              {/* Cancel */}

              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium text-white"
              >
                Cancel
              </button>


              {/* Download */}

              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white"
              >
                Download
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}