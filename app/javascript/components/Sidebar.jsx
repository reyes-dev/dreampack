import React, { useState } from "react";
import SidebarVisible from "./SidebarVisible";
import SidebarHidden from "./SidebarHidden";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { BsLayoutSidebarInset } from "react-icons/bs";

function Sidebar() {
  const [visible, setVisible] = useState(true);

  const hideSidebar = () => {
    setVisible(!visible);
  };

  return (
    <nav className={visible ? "w-[15vw]" : "absolute w-[5vw]"}>
      {visible ? (
        <SidebarVisible
          hideSidebar={hideSidebar}
          icon={<BsLayoutSidebarInsetReverse />}
          visible={visible}
        />
      ) : (
        <SidebarHidden
          hideSidebar={hideSidebar}
          icon={<BsLayoutSidebarInset />}
          visible={visible}
        />
      )}
    </nav>
  );
}

export default Sidebar;
