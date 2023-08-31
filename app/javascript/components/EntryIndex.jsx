import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { FaEdit } from "react-icons/fa";

function EntryIndex() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    const url = `/api/entries`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const entryList = entries.map((entry) => {
    return (
      <ul key={entry[0]}>
        <div className="flex justify-between pb-1">
          <div className="flex items-baseline gap-2">
            <Link
              href={`/entries/${entry[0]}`}
              className="whitespace-nowrap border-b pl-2 pr-2 pt-2 text-sm hover:rounded hover:bg-gray-600 xl:text-xl"
            >
              {entry[1]}
            </Link>
            <p className="text-xs text-gray-400 lg:text-lg">
              Created on {entry[3]}
            </p>
          </div>
          <Link
            href={`/entries/${entry[0]}/edit`}
            className="lg:text-md flex h-min items-center gap-2 whitespace-nowrap rounded border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] 
                      text-sm italic text-sky-500 
                      hover:bg-slate-700"
          >
            <span className="lg:text-md hidden lg:block xl:text-lg">
              Edit Entry
            </span>
            <FaEdit />
          </Link>
        </div>
        <li className="pt text-gray-300">{entry[2]}</li>
      </ul>
    );
  });

  return (
    <section
      className="flex h-full w-full flex-col gap-4 overflow-auto rounded 
    border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 max-[1440px]:w-fit lg:h-[80vh] xl:w-1/2"
    >
      {entryList}
    </section>
  );
}

export default EntryIndex;
