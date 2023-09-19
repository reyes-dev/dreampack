import React, { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import ZeroEntriesMessage from "./ZeroEntriesMessage";

function EntryIndex() {
  const [entries, setEntries] = useState();

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

  if (entries === undefined) {
    return <></>;
  }

  const entryList = entries.map((entry) => {
    return (
      <li className="flex cursor-pointer flex-col justify-between gap-2 hover:rounded hover:bg-gray-600">
        <Link
          href={`/entries/${entry[0]}`}
          key={entry[0]}
          className="flex flex-col gap-2"
        >
          <h1 className="border-b">{entry[1]}</h1>
          <p className="text-xs text-gray-400 lg:text-lg">
            Created on <time>{entry[3]}</time>
          </p>
          <article className="pt md:text-md text-sm text-gray-200 lg:text-lg">
            {entry[2]}
          </article>
        </Link>
      </li>
    );
  });

  return (
    <section
      className="flex h-full w-full flex-col gap-4 overflow-auto rounded 
    border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
    >
      {entries.length ? (
        <ul className="sm:text-md flex flex-col gap-4  whitespace-pre-line pt-2 text-sm  md:text-lg lg:pr-2 lg:text-xl">
          {entryList}
        </ul>
      ) : (
        <ZeroEntriesMessage />
      )}
    </section>
  );
}

export default EntryIndex;
