'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLoadMore,
  showLoadMore = false,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalItems === 0) return null;

  if (showLoadMore && onLoadMore) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 animate-fade-in-up">
        <p className="text-sm text-[#1A2B4A]/60">
          Showing <span className="font-semibold text-[#1A2B4A]">{endItem}</span> of{' '}
          <span className="font-semibold text-[#1A2B4A]">{totalItems}</span> resources
        </p>
        {currentPage < totalPages && (
          <button
            onClick={onLoadMore}
            className="btn-primary"
          >
            <span>Load more</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 mt-6 border-t border-[#F0F3F7] animate-fade-in-up">
      <p className="text-sm text-[#1A2B4A]/60">
        Showing{' '}
        <span className="font-semibold text-[#1A2B4A]">{startItem}-{endItem}</span>
        {' '}of{' '}
        <span className="font-semibold text-[#1A2B4A]">{totalItems}</span>
        {' '}resources
      </p>

      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex items-center gap-1 px-4 py-2.5
            text-sm font-semibold
            bg-white border-2 border-[#F0F3F7]
            rounded-xl
            text-[#1A2B4A] hover:border-[#E85D4C]/20 hover:text-[#E85D4C]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#F0F3F7] disabled:hover:text-[#1A2B4A]
            transition-all duration-300
            font-[family-name:var(--font-display)]
          "
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  w-10 h-10 text-sm font-bold rounded-xl
                  transition-all duration-300
                  font-[family-name:var(--font-display)]
                  ${isActive
                    ? 'bg-gradient-to-br from-[#E85D4C] to-[#C94A3B] text-white shadow-[0_4px_12px_rgba(232,93,76,0.3)]'
                    : 'text-[#1A2B4A]/60 hover:bg-[#F0F3F7] hover:text-[#1A2B4A]'
                  }
                `}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex items-center gap-1 px-4 py-2.5
            text-sm font-semibold
            bg-white border-2 border-[#F0F3F7]
            rounded-xl
            text-[#1A2B4A] hover:border-[#E85D4C]/20 hover:text-[#E85D4C]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#F0F3F7] disabled:hover:text-[#1A2B4A]
            transition-all duration-300
            font-[family-name:var(--font-display)]
          "
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
