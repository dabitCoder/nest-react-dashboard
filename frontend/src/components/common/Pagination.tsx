import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageChange(Number(e.target.value));
  };

  return (
    <div aria-label="pagination" className="flex justify-center mt-6">
      <div className="flex w-full max-w-xs">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="relative flex-grow">
          <select
            value={currentPage}
            onChange={handleSelectChange}
            className="block w-full h-full py-2 pl-3 pr-8 border border-l-0 border-r-0 border-gray-300 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            aria-label="select-page"
          >
            {pageNumbers.map((number) => (
              <option key={number} value={number}>
                Page {number} of {totalPages}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
