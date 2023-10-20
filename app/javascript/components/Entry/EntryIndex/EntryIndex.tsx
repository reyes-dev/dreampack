import React, { useState, useEffect, useRef } from "react";
import { Link, useRoute } from "wouter";
import ZeroEntriesMessage from "components/Entry/EntryIndex/ZeroEntriesMessage";
import Pagination from "components/Shared/Pagination";

function EntryIndex() {
  const [entries, setEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(0);
  const [, params] = useRoute("/entries/page/:page");
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    getEntryCount();
  }, []);

  useEffect(() => {
    getEntries();
  }, [params?.page]);

  useEffect(() => {
    if (entries && entryCount > 0 && linkRef.current !== null) {
      linkRef.current.focus();
    }
  }, [entries]);

  const getEntryCount = async () => {
    const url = `/api/entries/count`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return setEntryCount(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getEntries = async () => {
    const url = `/api/entries/page/${params?.page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setEntries(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  if (entries === undefined) {
    return <></>;
  }

  const entryList = entries.map((entry, index) => {
    return (
      <li
        className="flex cursor-pointer flex-col justify-between gap-2 hover:rounded hover:bg-gray-600"
        key={entry[0]}
      >
        <Link
          href={`/entries/${entry[0]}`}
          className="flex flex-col gap-2"
          ref={index === 0 ? linkRef : null}
        >
          <h1 className="border-b">{entry[1]}</h1>
          <p className="text-gray-400">
            Created on <time>{entry[3]}</time>
          </p>
          <article className="pt text-gray-200">{entry[2]}</article>
        </Link>
      </li>
    );
  });

  return (
    <section
      className="flex h-full w-full flex-col justify-between gap-4 overflow-auto rounded 
    border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
    >
      {entryCount ? (
        <ul
          className="flex flex-col gap-4  whitespace-pre-line pt-2 lg:pr-2"
          role="list"
        >
          {entryList}
        </ul>
      ) : (
        <ZeroEntriesMessage />
      )}
      <Pagination
        pageNumber={params === null ? 0 : +params.page}
        entryCount={entryCount}
      />
    </section>
  );
}

export default EntryIndex;
