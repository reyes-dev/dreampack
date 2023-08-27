import React from "react";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  return (
    <section className="col-start-1 row-span-full flex h-screen w-full flex-col justify-between gap-4 self-start border-r-2 border-[hsl(133.1,66.1%,76.9%)] bg-[#08041A] p-4 underline-offset-4">
      <div className="flex flex-col gap-2">
        <div className="mb-1 flex flex-row items-center gap-2">
          <SidebarLink destination="/entries/new" content="New Entry" />
          <a
            href="/"
            className="flex h-full w-16 gap-3 rounded-md border border-white/20 px-3 py-1 hover:bg-slate-700"
          ></a>
        </div>

        <SidebarLink destination="/entries" content="Entries" />
      </div>
      <SidebarLink destination="/settings" content="Settings" />
    </section>
  );
}

export default Sidebar;
