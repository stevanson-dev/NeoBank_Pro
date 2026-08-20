export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-8">

      {/* Previous */}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-2 rounded-xl transition ${
          currentPage === 1
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        Previous
      </button>


      {/* Pages */}

      <div className="flex gap-3">

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (

          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {page}
          </button>

        ))}

      </div>


      {/* Next */}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-5 py-2 rounded-xl transition ${
          currentPage === totalPages
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        Next
      </button>

    </div>
  );
}