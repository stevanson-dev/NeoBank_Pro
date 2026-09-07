export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  // =========================================================
  // PAGE NUMBERS
  // =========================================================

  const getPageNumbers = () => {
    // 3 pages or less -> show all
    if (totalPages <= 3) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    // First page
    if (currentPage === 1) {
      return [1, 2, 3];
    }

    // Last page
    if (currentPage === totalPages) {
      return [
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle pages
    return [
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">

      {/* =====================================================
          PREVIOUS
      ===================================================== */}

      <button
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${
          currentPage === 1
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
        aria-label="Previous page"
      >
        ‹
      </button>


      {/* =====================================================
          PAGE NUMBERS
      ===================================================== */}

      <div className="flex items-center gap-2">

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() =>
              onPageChange(page)
            }
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {page}
          </button>
        ))}

      </div>


      {/* =====================================================
          NEXT
      ===================================================== */}

      <button
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${
          currentPage === totalPages
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
        aria-label="Next page"
      >
        ›
      </button>

    </div>
  );
}