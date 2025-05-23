import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Pagination = ({ current, pageSize, total, onChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages === 0) return null;

  // Tạo mảng số trang [1, 2, ..., totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center space-x-2 mt-4 select-none ">
      {/* Prev */}
      <button
        onClick={() => current > 1 && onChange(current - 1)}
        disabled={current === 1}
        className={`px-3 py-1 rounded-md 
          ${
            current === 1
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] cursor-pointer"
          }`}
      >
        <LeftOutlined />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`px-3 py-1 rounded-md border
            ${
              page === current
                ? "bg-[var(--color-primary-main)] text-[var(--color-primary-contrast)] shadow-md"
                : "bg-[var(--color-background-paper)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-primary-main)]"
            } cursor-pointer`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => current < totalPages && onChange(current + 1)}
        disabled={current === totalPages}
        className={`px-3 py-1 rounded-md 
          ${
            current === totalPages
              ? " text-gray-400 cursor-not-allowed"
              : " text-[var(--color-text-primary)] cursor-pointer"
          }`}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Pagination;
