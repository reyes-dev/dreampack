import React from "react";
import SidebarLink from "./SidebarLink";
import SidebarToggle from "./SidebarToggle";
import { FaPlus } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCog } from "react-icons/fa";

function SidebarVisible({ hideSidebar, icon, visible }) {
  return (
    <section className="flex h-full flex-col justify-between gap-4   p-4 underline-offset-4 ">
      <div className="flex flex-col items-center gap-2 2xl:items-stretch">
        <div className="mb-1 flex flex-col-reverse items-center gap-2 lg:flex-row">
          <SidebarLink
            destination="/entries/new"
            content="New Entry"
            icon={<FaPlus />}
          />
          <SidebarToggle
            hideSidebar={hideSidebar}
            icon={icon}
            visible={visible}
          />
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
