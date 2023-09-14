import React from "react";
import { Link } from "wouter";

function ZeroEntriesMessage() {
  return (
    <div className="flex gap-2 self-center">
      <p>You have no entries yet...</p>
      <Link className="text-[#52e3ac] underline" href={"/entries/new"}>
        why not start with last night's dream?
      </Link>
    </div>
  );
}

export default ZeroEntriesMessage;
