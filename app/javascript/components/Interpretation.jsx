import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import ChatGPT from "./ChatGPT";

function Interpretation({ params }) {
  const [interpretationBody, setInterpretationBody] = useState("");

  useEffect(() => {
    getInterpretation();
  }, []);

  const getInterpretation = async () => {
    const url = `/api/entries/${params.id}/interpretation`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInterpretationBody(data.body);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      className="flex h-[80vh] w-1/2 flex-col gap-4
        whitespace-pre-line break-words rounded border-2 
        border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8"
    >
      <div className="flex justify-between gap-4 border-b pb-2">
        <h1 className="text-3xl">Interpretation</h1>
        <div className="flex items-end gap-4">
          <Link
            href={`/entries/${params.id}`}
            className="text-sky-500 underline"
          >
            Back to Entry
          </Link>
          <Link
            href={`/entries/${params.id}/interpretation/edit`}
            className="text-md min-h whitespace-nowrap rounded 
                      border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-sky-500 hover:bg-slate-700"
          >
            Edit Interpretation
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex gap-4 pb-2">
          <ChatGPT
            entry_id={params.id}
            setInterpretationBody={setInterpretationBody}
          />
        </div>
      </div>

      <p>{interpretationBody}</p>
    </section>
  );
}

export default Interpretation;
