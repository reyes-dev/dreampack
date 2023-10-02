import React, { useEffect, useRef } from "react";
import { Link } from "wouter";

function ZeroEntriesMessage() {
  const linkRef = useRef(null);

  useEffect(() => {
    linkRef.current.focus();
  }, []);

  return (
    <section className="flex gap-2 self-center">
      <h1>You have no entries yet...</h1>
      <Link
        className="text-[#52e3ac] underline"
        href={"/entries/new"}
        ref={linkRef}
      >
        why not record last night's dream?
      </Link>
    </section>
  );
}

export default ZeroEntriesMessage;
