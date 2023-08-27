import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import DeleteEntry from "./DeleteEntry";
import * as Selection from "selection-popover";
import DreamSign from "./DreamSign";
import Highlighter from "react-highlight-words";

function Entry({ params }) {
  const [entry, setEntry] = useState({});
  const [selectedText, setSelectedText] = useState();
  const [dreamSigns, setDreamSigns] = useState([]);
  const [dalleUrl, setDalleUrl] = useState("");

  useEffect(() => {
    getEntry();
    getDreamSigns();
  }, []);

  const getEntry = async () => {
    const url = `/api/entries/${params.id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntry(data);
      setDalleUrl(data.image.url);
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getDreamSigns = async () => {
    const url = `/api/dream_signs`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDreamSigns(data);
    } catch (e) {
      console.error(e);
    }
  };

  const generateImage = async () => {
    const url = `/api/entries/${params.id}/dalle_responses`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    const prompt = `Create an image based on the following dream: ${entry.body}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.text();
      setDalleUrl(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const handleMouseUp = () => {
    setSelectedText(window.getSelection().toString());
  };

  const highlightNewDreamSign = () => {
    setDreamSigns((dreamSigns) => [...dreamSigns, selectedText]);
  };

  return (
    <section
      className="flex h-[80vh] w-1/2 flex-col gap-4
        whitespace-pre-line break-words rounded border-2 
        border-[hsl(133.1,66.1%,76.9%)] bg-[#08041A] p-8"
    >
      <div className="flex items-center justify-between border-b pb-2">
        <h1 data-cy="entryTitle" className="text-3xl">
          {entry.title}
        </h1>
        <div className="flex items-center gap-4">
          <DeleteEntry id={params.id} />
          <Link
            href={`/entries/${params.id}/edit`}
            className="text-md min-h whitespace-nowrap rounded 
                      border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-sky-500 hover:bg-slate-700"
            data-cy="editEntry"
          >
            Edit Entry
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex items-end gap-4 pb-2">
          <Link
            href={`/entries/${params.id}/interpretation`}
            className="text-sky-500 underline"
          >
            Go to Interpretation
          </Link>
          <button
            onClick={generateImage}
            className="text-md min-h whitespace-nowrap rounded 
                      border border-amber-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-amber-500 hover:bg-slate-700"
          >
            Generate Image
          </button>
        </div>
      </div>
      <Selection.Root>
        <Selection.Trigger>
          <p onMouseUp={handleMouseUp}>
            <Highlighter
              searchWords={dreamSigns}
              textToHighlight={String(entry.body)}
              data-cy="entryBody"
            />
          </p>
        </Selection.Trigger>
        <Selection.Portal>
          <Selection.Content side="bottom">
            <DreamSign
              phrase={selectedText}
              highlightNewDreamSign={highlightNewDreamSign}
            />
          </Selection.Content>
        </Selection.Portal>
      </Selection.Root>
      <img src={dalleUrl} alt="AI generated image of user dream" />
    </section>
  );
}

export default Entry;
