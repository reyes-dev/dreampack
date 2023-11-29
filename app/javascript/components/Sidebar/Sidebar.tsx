import React, { useState, useEffect, useContext } from "react";
import SidebarLink from "components/Sidebar/SidebarLink";
import LogOutButton from "components/Sidebar/LogOutButton";
import { FaPlus, FaBook, FaCog, FaRegCommentAlt } from "react-icons/fa";
import { SidebarEntryContext } from "context/SidebarEntryContext";
import { useQuery } from "@tanstack/react-query";

/* Componentize the three "sections" into separate components */
/* delete contexts */
/* in-place map instead of variable map */

export default function Sidebar() {
  const getSidebarEntries = async () => {
    try {
      const response = await fetch(`/api/sidebar_entry_links`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sidebarEntries"],
    queryFn: getSidebarEntries,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const sidebarEntriesList = data.map((entry: string[]) => {
    return (
      <li key={entry[0]}>
        <SidebarLink
          destination={`/entries/${entry[0]}`}
          content={entry[1]}
          icon={<FaRegCommentAlt />}
        />
      </li>
    );
  });

  return (
    <nav className="sticky top-0 z-[1] col-start-1 w-full justify-between self-start bg-[hsl(237.1,25.9%,15.9%)] py-4 underline-offset-4 sm:top-5  sm:flex sm:w-fit sm:flex-col sm:gap-12 sm:p-4">
      <section className="flex flex-col gap-12">
        <div className="flex flex-col">
          <h1 className="hidden w-full font-bold sm:block">Dream Journal</h1>
          <div className="flex gap-2 sm:flex-col sm:pt-4">
            <SidebarLink
              destination="/entries/new"
              content="New Entry"
              icon={<FaPlus />}
            />
            <SidebarLink
              destination="/entries/page/0"
              content="All Entries"
              icon={<FaBook />}
            />
          </div>
        </div>
        <section className="hidden flex-col md:flex">
          <h1 className="hidden font-bold sm:block">Recent Entries</h1>
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
