import React from "react";
import { Link } from "wouter";

function SidebarLink({ destination, content, icon }) {
  return (
    <Link
      href={destination}
      className="flex w-min items-center gap-2 whitespace-nowrap rounded border border-white/20 p-3 hover:bg-slate-700 lg:w-full"
    >
      {icon}
      <span className="hidden lg:block lg:text-sm 2xl:text-lg">{content}</span>
    </Link>
  );
}

export default SidebarLink;
