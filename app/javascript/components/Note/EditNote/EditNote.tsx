import React, { FormEvent, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";

interface EditNoteProps {
  params: {
    id: string;
  };
}

export default function EditNote({ params }: EditNoteProps) {
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

  const updateNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(`/api/entries/${params.id}/note`, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: noteBody,
          id: params.id,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      navigate(`/entries/${params.id}/note`);
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["note"],
    queryFn: fetchEntryNote,
  });

  const [noteBody, setNoteBody] = useState(data.body || "");

  const mutation = useMutation({
    mutationFn: updateNote,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <form
      onSubmit={mutation.mutate}
      className="relative flex h-full w-full flex-col gap-4 rounded border p-8 pb-16"
    >
      <h1 className="font-bold">Journal Notes</h1>
      <label
        htmlFor="noteBody"
        className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
      >
        Edit your journal notes
      </label>
      <textarea
        className="h-full resize-none rounded bg-[hsl(237.1,25.9%,19%)] p-2 pl-5 pt-5"
        name="noteBody"
        onChange={(e) => setNoteBody(e.target.value)}
        id="noteBody"
        placeholder="Write your journal notes here..."
        value={noteBody}
      ></textarea>
      <div className="absolute -bottom-[1px] -right-[1px]">
        <button
          type="submit"
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          <span className="lg:block">Update notes</span>
          <FaRegPaperPlane />
        </button>
      </div>
    </form>
  );
}
