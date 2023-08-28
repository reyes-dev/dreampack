import React from "react";
import SidebarLink from "./SidebarLink";
import { FaPlus } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { IconContext } from "react-icons";

function Sidebar() {
  return (
    <section className="col-start-1 row-span-full flex h-screen w-full flex-col justify-between gap-4 self-start border-r-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-4 underline-offset-4">
      <div className="flex flex-col gap-2">
        <div className="mb-1 flex flex-row items-center gap-2">
          <SidebarLink
            destination="/entries/new"
            content="New Entry"
            icon={<FaPlus />}
          />
          <a
            href="/"
            className="flex h-full w-16 items-center justify-center gap-3 rounded-md border border-white/20 px-3 py-1 hover:bg-slate-700"
          >
            <IconContext.Provider
              value={{
                size: "1.2em",
              }}
            >
              <BsLayoutSidebarInsetReverse />
            </IconContext.Provider>
          </a>
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

export default Sidebar;
