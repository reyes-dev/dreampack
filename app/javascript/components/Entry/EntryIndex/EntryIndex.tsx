import React, { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";

function EntryIndex() {
  const [, params] = useRoute("/entries/page/:page");
  const [page, setPage] = useState(+params?.page);

  const fetchEntries = async (page = 0) => {
    try {
      const response = await fetch(`/api/entries/page/` + page);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["entries", page],
      queryFn: () => fetchEntries(page),
      placeholderData: keepPreviousData,
    });

  const hasMore = data?.length == 10;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="relative flex h-full w-full flex-col sm:px-20 sm:pt-4">
      <ul className="flex flex-col gap-4" role="list">
        {data.map((entry: string) => {
          return (
            <li
              className="flex cursor-pointer flex-col justify-between gap-2 border border-white p-[20px_20px_50px] text-start hover:border-sky-500"
              key={entry[0]}
            >
              <Link href={`/entries/${entry[0]}`} className="gap flex flex-col">
                <h1 className="pb-3 font-bold">{entry[1]}</h1>
                <article className="pt text-gray-200">{entry[2]}</article>
              </Link>
            </li>
          );
        })}
      </ul>
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData && hasMore) {
            console.log("test");
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </section>
  );
}

export default EntryIndex;
