import React from "react";
import { Link } from "wouter";

function ZeroEntriesMessage() {
  return (
    <section className="flex gap-2 self-center">
      <h1>You have no entries yet...</h1>
      <Link className="text-[#52e3ac] underline" href={"/entries/new"}>
        why not start with last night's dream?
      </Link>
    </section>
  );
}

export default ZeroEntriesMessage;
