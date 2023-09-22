import React from "react";

function Pagination() {
  return (
    <section className="flex gap-4 self-center">
      <button>{"<-"}</button>
      {"0...10"}
      <button>{"->"}</button>
    </section>
  );
}

export default Pagination;
