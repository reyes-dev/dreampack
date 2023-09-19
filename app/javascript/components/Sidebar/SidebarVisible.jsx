import React, { useState, useEffect, useContext } from "react";
import SidebarLink from "./SidebarLink";
import SidebarToggle from "./SidebarToggle";
import LogOutButton from "./LogOutButton";
import { FaPlus, FaBook, FaCog, FaRegCommentAlt } from "react-icons/fa";
import { SidebarEntryContext } from "../../context/SidebarEntryContext";

function SidebarVisible({ hideSidebar, icon, visible }) {
  const [sidebarEntries, setSidebarEntries] = useState([]);
  const { sidebarEntriesUpdateTrigger } = useContext(SidebarEntryContext);

  useEffect(() => {
    getSidebarEntries();
  }, [sidebarEntriesUpdateTrigger]);

  const getSidebarEntries = async () => {
    const url = `/api/sidebar_entry_links`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return setSidebarEntries(data);
    } catch (e) {
      console.error(e);
    }
  };

  const sidebarEntriesList = sidebarEntries.map((entrySidebarLink) => {
    return (
      <li key={entrySidebarLink[0]}>
        <SidebarLink
          destination={`/entries/${entrySidebarLink[0]}`}
          content={entrySidebarLink[1]}
          icon={<FaRegCommentAlt />}
        />
      </li>
    );
  });

  return (
    <nav className="flex h-full w-full justify-between gap-4 p-2 underline-offset-4 md:flex-col md:p-4">
      <section className="flex items-center gap-2 md:flex-col 2xl:items-stretch">
        <div className="flex items-center gap-2 md:flex-col-reverse lg:flex-row">
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
        <section className="hidden flex-col pt-8 md:flex">
          <h1 className="border-b border-b-white font-bold">Recent Entries</h1>
          <ul className="hidden flex-col gap-2 pt-4 md:flex" role="list">
            {sidebarEntriesList}
          </ul>
        </section>
      </section>
      <section className="flex items-center gap-2 md:flex-col">
        <SidebarLink
          destination="/settings"
          content="Settings"
          icon={<FaCog />}
        />
        <LogOutButton />
      </section>
    </nav>
  );
}

export default SidebarVisible;
