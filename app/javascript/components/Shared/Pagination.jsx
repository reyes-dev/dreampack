import React, { useMemo, useEffect } from "react";
import { useLocation } from "wouter";

function Pagination({ pageNumber, entryCount }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  const pageCount = useMemo(() => {
    return Math.floor(entryCount / 10);
  }, [entryCount]);

  return (
    <section className="flex gap-4 self-center">
      {pageNumber === 0 ? null : <button>{"<-"}</button>}

      {`0...${pageCount}`}

      {pageNumber === pageCount ? null : (
        <button
          onClick={() => {
            console.log(pageNumber);
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
