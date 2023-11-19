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
      className="flex w-min items-center gap-2 whitespace-nowrap rounded-xl p-3 hover:bg-slate-700"
    >
      <span>{icon}</span>
      <span className="w-[150px] overflow-hidden text-ellipsis">{content}</span>
    </Link>
  );
}

export default SidebarLink;
