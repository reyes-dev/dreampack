import React, { useContext } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ChatGPT from "components/Interpretation/ShowInterpretation/ChatGPT";
import { FaEdit } from "react-icons/fa";
import PopupMessage from "components/Shared/PopupMessage";
import { PopupMessageContext } from "context/PopupMessageContext";

interface InterpretationProps {
  params: {
    id: string;
  };
}

function Interpretation({ params }: InterpretationProps) {
  const { errorExists } = useContext(PopupMessageContext);
  const [, navigate] = useLocation();

  const fetchInterpretation = async () => {
    const url = `/api/entries/${params.id}/interpretation`;
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
    queryFn: fetchInterpretation,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="relative flex h-full w-full flex-col gap-4 border">
      {errorExists && (
        <PopupMessage
          content={[
            "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key.",
          ]}
        />
      )}
      <div className="absolute -right-[1px] -top-[1px] flex">
        <ChatGPT entry_id={params.id} />
        <Link
          href={`/entries/${params.id}/interpretation/edit`}
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          <span className="hidden lg:block">Edit Interpretation</span>
          <FaEdit />
        </Link>
      </div>
      <div className="absolute -bottom-[1px] -left-[1px] flex">
        <Link
          href={`/entries/${params.id}`}
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          {`<`} Back to Entry
        </Link>
      </div>
      <section className="flex flex-col gap-16 p-8">
        <h1 className="font-bold">Dream Interpretation</h1>
        <article className="h-fit resize-none">{data.body}</article>
      </section>
    </section>
  );
}

export default Interpretation;
