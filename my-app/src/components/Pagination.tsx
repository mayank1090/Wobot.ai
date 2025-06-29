import React from 'react';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronDown } from 'react-icons/fa';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  return (
    <div className="flex justify-end items-center px-6 py-2 bg-white text-sm text-[#545454] gap-4">
      {/* Items Per Page Dropdown */}
      <div className="relative">
        <select
          className="appearance-none text-[#545454] text-[0.75rem] font-inter pr-5 pl-2 py-0.5 border border-transparent bg-white cursor-pointer"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {[10, 25, 50].map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <FaChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 text-xs pointer-events-none" />
      </div>

      {/* Page Range */}
      <span className="text-[#545454] text-[0.75rem] font-inter">{startItem}–{endItem} of {totalItems}</span>

      {/* Pagination Buttons */}
      <div className="flex gap-2 text-[#8D8D8D]">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          <FaAngleDoubleLeft size={14} />
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          <FaChevronLeft size={14} />
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          <FaChevronRight size={14} />
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          <FaAngleDoubleRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
