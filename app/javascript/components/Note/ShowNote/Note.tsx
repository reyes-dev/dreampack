import React from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";

interface NoteProps {
  params: {
    id: string;
  };
}

export default function Note({ params }: NoteProps) {
  const [, navigate] = useLocation();

  const fetchEntryNote = async () => {
    const url = `/api/entries/${params.id}/note`;
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        navigate("/entries/new");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["note"],
    queryFn: fetchEntryNote,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="relative flex h-full w-full flex-col gap-4 border">
      <div className="absolute -right-[1px] -top-[1px] flex">
        <Link
          href={`/entries/${params.id}/note/edit`}
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          <span className="hidden lg:block">Edit Notes</span>
          <FaEdit />
        </Link>
      </div>
      <div className="absolute -bottom-[1px] -right-[1px] flex">
        <Link
          href={`/entries/${params.id}`}
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          Back to Entry {`>`}
        </Link>
      </div>
      <div className="flex flex-col gap-16 p-8">
        <h1 className="font-bold">Journal Notes</h1>
        <article className="h-fit resize-none">{data.body}</article>
      </div>
    </section>
  );
}
