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
      className="flex h-full max-h-[90%] w-[35%] max-w-4xl flex-col gap-4 
        whitespace-pre-line break-words bg-white px-8 py-8 shadow-2xl"
    >
      <div className="flex justify-between">
        <h1>{entry.title}</h1>
        <div className="flex gap-4">
          <DeleteEntry id={params.id} />
          <Link
            href={`/entries/${params.id}/edit`}
            className="self-start italic text-sky-500"
          >
            Edit Entry
          </Link>
          <Link href={`/entries/${params.id}/interpretation`}>
            Interpret Dream
          </Link>
          <button onClick={generateImage}>Generate Image</button>
        </div>
      </div>
      <p>{entry.created_at}</p>
      <Selection.Root>
        <Selection.Trigger>
          <p onMouseUp={handleMouseUp}>
            <Highlighter
              searchWords={dreamSigns}
              textToHighlight={String(entry.body)}
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
