import React from "react";
import ToggleSidebar from "./ToggleSidebar";

function SidebarHidden({ hideSidebar, icon }) {
  return (
    <section className="flex h-screen flex-col gap-4  p-4 underline-offset-4">
      <ToggleSidebar hideSidebar={hideSidebar} icon={icon} />
    </section>
  );
}

export default SidebarHidden;
