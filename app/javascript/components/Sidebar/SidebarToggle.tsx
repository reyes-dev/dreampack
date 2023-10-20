import React, { ReactElement } from "react";
import { IconContext } from "react-icons";

interface SidebarToggleProps {
  hideSidebar: () => void;
  icon: ReactElement;
  visible: boolean;
}

function SidebarToggle({ hideSidebar, icon, visible }: SidebarToggleProps) {
  return (
    <button
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
