import React, { useMemo } from "react";
import { useLocation } from "wouter";

function Pagination({ pageNumber, entryCount }) {
  const [, navigate] = useLocation();

  const pageCount = useMemo(() => {
    return Math.floor(entryCount / 10);
  }, [entryCount]);

  return (
    <section className="flex gap-4 self-center">
      {pageNumber === 0 ? null : (
        <button
          onClick={() => {
            navigate(`/entries/page/${pageNumber - 1}`);
          }}
        >
          {"<-"}
        </button>
      )}

      {pageNumber}

      {pageNumber === pageCount ? null : (
        <button
          onClick={() => {
            navigate(`/entries/page/${pageNumber + 1}`);
          }}
        >
          {"->"}
        </button>
      )}
    </section>
  );
}

export default Pagination;
