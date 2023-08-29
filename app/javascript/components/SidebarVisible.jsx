import React from "react";
import SidebarLink from "./SidebarLink";
import ToggleSidebar from "./ToggleSidebar";
import { FaPlus } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

function SidebarVisible({ hideSidebar, icon }) {
  return (
    <section className="flex h-screen  flex-col justify-between gap-4 self-start border-r-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-4 underline-offset-4">
      <div className="flex flex-col gap-2">
        <div className="mb-1 flex flex-row items-center gap-2">
          <SidebarLink
            destination="/entries/new"
            content="New Entry"
            icon={<FaPlus />}
          />
          <ToggleSidebar hideSidebar={hideSidebar} icon={icon} />
        </div>

        <SidebarLink
          destination="/entries"
          content="All Entries"
          icon={<FaBook />}
        />
      </div>
      <SidebarLink
        destination="/settings"
        content="Settings"
        icon={<FaCog />}
      />
    </section>
  );
}

export default SidebarVisible;
