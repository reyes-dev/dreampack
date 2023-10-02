import React from "react";
import { IconContext } from "react-icons";

function SidebarToggle({ hideSidebar, icon, visible }) {
  return (
    <button
      href="/"
      className={`${
        visible ? "h-full" : "h-fit"
      } hidden w-min items-center justify-center gap-3 rounded-md border border-white/20 p-3 transition-transform duration-300 ease-in hover:bg-slate-700 md:flex lg:text-[1.3em] 2xl:text-[1.6em]`}
      onClick={hideSidebar}
    >
      <IconContext.Provider value={{}}>{icon}</IconContext.Provider>
    </button>
  );
}

export default SidebarToggle;
