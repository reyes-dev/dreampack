import React from "react";
import { IconContext } from "react-icons";

function ToggleSidebar({ hideSidebar, icon }) {
  return (
    <button
      href="/"
      className="flex h-min w-min items-center justify-center gap-3 rounded-md border border-white/20 p-3 transition-transform duration-300 ease-in hover:bg-slate-700"
      onClick={hideSidebar}
    >
      <IconContext.Provider
        value={{
          size: "1.6em",
        }}
      >
        {icon}
      </IconContext.Provider>
    </button>
  );
}

export default ToggleSidebar;
