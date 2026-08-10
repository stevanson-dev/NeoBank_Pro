import { useState } from "react";
import { FaFilePdf, FaFileCsv, FaTimes } from "react-icons/fa";

export default function ExportButtons() {
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
    setFromDate("");
    setToDate("");
  };

  const handleDownload = () => {
    if (!fromDate || !toDate) {
      alert("Please select both dates.");
      return;
    }

    if (fromDate > toDate) {
      alert("From date cannot be later than To date.");
      return;
    }

    console.log("Export Type:", exportType);
    console.log("From:", fromDate);
    console.log("To:", toDate);

    // இங்கே உன் actual PDF / CSV export logic வரும்

    alert(
      `${exportType.toUpperCase()} export selected from ${fromDate} to ${toDate}`
    );

    handleCancel();
  };

  return (
    <>
      {/* Export Buttons */}

      <div className="flex flex-wrap justify-end gap-3 mt-6">

        {/* PDF */}

        <button
          onClick={() => handleOpenModal("pdf")}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-red-400 font-medium"
        >
          <FaFilePdf />
          Export PDF
        </button>


        {/* CSV */}

        <button
          onClick={() => handleOpenModal("csv")}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-green-400 font-medium"
        >
          <FaFileCsv />
          Export CSV
        </button>

      </div>


      {/* Export Modal */}

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
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>


            {/* Export Type */}

            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">

              <p className="text-gray-400 text-sm">
                Export Format
              </p>

              <p className="font-semibold mt-1 uppercase">
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
    onChange={(e) => setFromDate(e.target.value)}
    style={{ colorScheme: "dark" }}
    className="w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition "
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
    onChange={(e) => setToDate(e.target.value)}
    style={{ colorScheme: "dark" }}
    className="w-full mt-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
  />

</div>


            {/* Buttons */}

            <div className="flex gap-3 mt-7">

              {/* Cancel */}

              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-medium"
              >
                Cancel
              </button>


              {/* Download */}

              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
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