import React, { Dispatch, SetStateAction } from "react";
import { useLocation } from "wouter";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  isPlaceholderData: boolean;
}

function Pagination({
  page,
  setPage,
  hasMore,
  isPlaceholderData,
}: PaginationProps) {
  const [, navigate] = useLocation();

  return (
    <nav className="flex w-full items-center justify-between self-center pt-8">
      <button
        onClick={() => setPage((old: number) => Math.max(old - 1, 0))}
        disabled={page === 0}
        className={`${
          page === 0 ? "invisible" : ""
        } rounded-md border p-[10px_20px] hover:border-sky-500 hover:bg-gray-700`}
      >
        Previous Page
      </button>{" "}
      <span>{page}</span>
      <button
        onClick={() => {
          if (!isPlaceholderData && hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !hasMore}
        className={`${
          isPlaceholderData || !hasMore ? "invisible" : ""
        } rounded-md border p-[10px_20px] hover:border-sky-500 hover:bg-gray-700`}
      >
        Next Page
      </button>
    </nav>
  );
}

export default Pagination;
