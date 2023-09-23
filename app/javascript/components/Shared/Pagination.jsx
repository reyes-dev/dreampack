import React, { useMemo } from "react";
import { useLocation } from "wouter";

function Pagination({ pageNumber, entryCount }) {
  const [, navigate] = useLocation();

  const pageCount = useMemo(() => {
    return Math.floor(entryCount / 10);
  }, [entryCount]);

  return (
    <section className="flex gap-4 self-center">
      <button>{"<-"}</button>
      {`0...${pageCount}`}
      <button
        onClick={() => {
          console.log(pageNumber);
          navigate(`/entries/page/${+pageNumber + 1}`);
        }}
      >
        {"->"}
      </button>
    </section>
  );
}

export default Pagination;
