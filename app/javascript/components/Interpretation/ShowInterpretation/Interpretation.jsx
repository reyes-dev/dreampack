import React, { useState, useEffect, useContext } from "react";
import { Link } from "wouter";
import ChatGPT from "./ChatGPT";
import { FaEdit } from "react-icons/fa";
import PopupMessage from "../../Shared/PopupMessage";
import { PopupMessageContext } from "../../../context/PopupMessageContext";

function Interpretation({ params }) {
  const [interpretationBody, setInterpretationBody] = useState("");
  const { errorExists } = useContext(PopupMessageContext);

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
      className="flex h-full w-full flex-col gap-4 overflow-auto rounded
         border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
    >
      {errorExists && (
        <PopupMessage
          content={[
            "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key.",
          ]}
        />
      )}
      <div className="flex justify-between gap-4 border-b pb-2">
        <h1 className="text-xs lg:text-3xl">Interpretation</h1>
        <div className="flex flex-col-reverse items-end gap-4 lg:flex-row">
          <Link
            href={`/entries/${params.id}`}
            className="whitespace-nowrap text-xs text-sky-500 underline lg:text-lg"
          >
            Back to Entry
          </Link>
          <Link
            href={`/entries/${params.id}/interpretation/edit`}
            className="min-h gap-2 whitespace-nowrap rounded border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] text-xs italic 
                      text-sky-500 hover:bg-slate-700 lg:flex 
                      lg:items-center lg:text-lg"
          >
            <span className="lg:text-md hidden lg:block xl:text-lg">
              Edit Interpretation
            </span>
            <FaEdit />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-2">
        <p className="lg:text-md text-sm text-gray-600">
          Created on {new Date().toDateString()}
        </p>
        <div className="flex gap-4 pb-2">
          <ChatGPT
            entry_id={params.id}
            setInterpretationBody={setInterpretationBody}
          />
        </div>
      </div>

      <p className="h-fit resize-none">{interpretationBody}</p>
    </section>
  );
}

export default Interpretation;
