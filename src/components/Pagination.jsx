import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-8 flex-wrap">

      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-semibold 
        ${
          currentPage === 1
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-accent text-white hover:scale-105 transition"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-lg font-semibold
          ${
            currentPage === index + 1
              ? "bg-accent text-white"
              : "bg-white text-black border hover:bg-accent hover:text-white hover:border-accent"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-semibold
        ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-accent text-white hover:scale-105 transition"
        }`}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;