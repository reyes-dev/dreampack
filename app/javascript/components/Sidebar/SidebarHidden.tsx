import React, { ReactElement } from "react";
import SidebarToggle from "components/Sidebar/SidebarToggle";

interface SidebarHiddenProps {
  hideSidebar: () => void;
  icon: ReactElement;
  visible: boolean;
}

function SidebarHidden({ hideSidebar, icon, visible }: SidebarHiddenProps) {
  return (
    <section className="flex h-screen flex-col gap-4  p-4 underline-offset-4">
      <SidebarToggle hideSidebar={hideSidebar} icon={icon} visible={visible} />
    </section>
  );
}

export default SidebarHidden;
