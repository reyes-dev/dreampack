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
        className="flex cursor-pointer flex-col justify-between gap-2 border border-white p-[20px_20px_50px] text-start hover:border-sky-500"
        key={entry[0]}
      >
        <Link
          href={`/entries/${entry[0]}`}
          className="gap flex flex-col"
          ref={index === 0 ? linkRef : null}
        >
          <h1 className="pb-3 font-bold">{entry[1]}</h1>
          <article className="pt text-gray-200">{entry[2]}</article>
        </Link>
      </li>
    );
  });

  return (
    <section className="relative flex h-full w-full flex-col break-all sm:px-20 sm:pt-4">
      {entryCount ? (
        <ul className="flex flex-col gap-4" role="list">
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
