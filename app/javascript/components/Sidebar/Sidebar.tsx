import React, { useState } from "react";
import SidebarVisible from "components/Sidebar/SidebarVisible";
import SidebarHidden from "components/Sidebar/SidebarHidden";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { BsLayoutSidebarInset } from "react-icons/bs";

function Sidebar() {
  const [visible, setVisible] = useState(true);

  const hideSidebar = () => {
    setVisible(!visible);
  };

  return (
    <nav
      className={
        visible
          ? "sticky top-0 z-[1] col-start-1 inline-block w-full self-start sm:top-5 sm:w-fit"
          : "absolute w-[5vw]"
      }
    >
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
