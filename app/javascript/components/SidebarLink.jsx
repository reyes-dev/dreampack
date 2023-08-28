import React from "react";
import { Link } from "wouter";

function SidebarLink({ destination, content, icon }) {
  return (
    <Link
      href={destination}
      className="flex w-full items-center gap-2 rounded border border-white/20 p-3 hover:bg-slate-700"
    >
      {icon}
      <span className="text-lg">{content}</span>
    </Link>
  );
}

export default SidebarLink;
