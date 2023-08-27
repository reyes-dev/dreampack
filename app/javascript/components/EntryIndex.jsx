import React, { useState, useEffect } from "react";
import { Link } from "wouter";

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
      <ul key={entry.id}>
        <div className="flex justify-between">
          <Link
            href={`/entries/${entry.id}`}
            className="h-min border-b text-xl"
          >
            {entry.title}
          </Link>
          <Link
            href={`/entries/${entry.id}/edit`}
            className="text-md rounded border border-sky-500 
                      p-[0.450rem_0.450rem_0.4625rem] italic text-sky-500 
                      hover:bg-slate-700"
          >
            Edit Entry
          </Link>
        </div>
        <li className="pt text-gray-300">
          {entry.body.split(/\s+/).slice(0, 20).join(" ").concat("...")}
        </li>
      </ul>
    );
  });

  return (
    <section
      className="flex h-[80vh] w-1/2 flex-col gap-4 overflow-auto rounded 
    border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 
        "
    >
      {entryList}
    </section>
  );
}

export default EntryIndex;
