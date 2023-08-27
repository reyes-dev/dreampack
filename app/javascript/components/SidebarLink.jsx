import React from "react";
import { Link } from "wouter";

function SidebarLink({ destination, content }) {
  return (
    <Link
      href={destination}
      className="w-full rounded border border-white/20 p-3 hover:bg-slate-700"
    >
      {content}
    </Link>
  );
}

export default SidebarLink;
