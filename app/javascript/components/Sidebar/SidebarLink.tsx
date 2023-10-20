import React, { ReactElement } from "react";
import { Link } from "wouter";

interface SidebarLinkProps {
  destination: string;
  content: string;
  icon: ReactElement;
}

function SidebarLink({ destination, content, icon }: SidebarLinkProps) {
  return (
    <Link
      to={destination}
      className="flex w-min items-center gap-2 whitespace-nowrap rounded border border-white/20 p-3 hover:bg-slate-700 lg:w-full"
    >
      <span>{icon}</span>
      <span className="hidden overflow-hidden text-ellipsis lg:block">
        {content}
      </span>
    </Link>
  );
}

export default SidebarLink;
