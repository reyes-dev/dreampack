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
          <Link href={`/entries/${entry.id}`}>{entry.title}</Link>
          <Link href={`/entries/${entry.id}/edit`} className="text-sky-500">
            Edit Entry
          </Link>
        </div>
        <li>{entry.body}</li>
      </ul>
    );
  });

  return (
    <section
      className="flex h-full max-h-[90%] w-[35%] max-w-4xl flex-col gap-4 
        bg-white px-8 py-8 shadow-2xl"
    >
      <h1>Journal Entries</h1>
      {entryList}
    </section>
  );
}

export default EntryIndex;
