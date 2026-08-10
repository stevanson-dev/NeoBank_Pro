import { FaTimes, FaDownload } from "react-icons/fa";

export default function TransactionModal({ transaction, close }) {

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50">

      <div className="w-full max-w-lg bg-[#102E5B] border border-white/20 rounded-3xl p-8 text-white">

        {/* Header */}
        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            Transaction Details
          </h2>

          <button
            onClick={close}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
          >
            <FaTimes />
          </button>

        </div>


        {/* Details */}
        <div className="mt-8 space-y-5">

          <div className="flex justify-between">
            <span className="text-gray-300">
              Transaction ID
            </span>
            <span>
              TXN847392615
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-300">
              Name
            </span>
            <span>
              {transaction.name}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-300">
              Category
            </span>
            <span>
              {transaction.category}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-300">
              Amount
            </span>
            <span className="text-xl font-bold">
              {transaction.amount}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-300">
              Date
            </span>
            <span>
              {transaction.date}
            </span>
          </div>


          <div className="flex justify-between">
            <span className="text-gray-300">
              Status
            </span>
            <span className="text-green-400">
              {transaction.status}
            </span>
          </div>


        </div>


        {/* Download Button */}
        <button
          className="w-full mt-8 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center gap-3 font-semibold"
        >
          <FaDownload />
          Download Receipt
        </button>


      </div>

    </div>
  );
}