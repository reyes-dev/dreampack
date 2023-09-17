import React, { useState, useEffect, useContext } from "react";
import { Link } from "wouter";
import DeleteEntryButton from "./DeleteEntryButton";
import * as Selection from "selection-popover";
import DreamSign from "./DreamSign";
import Highlighter from "react-highlight-words";
import { FaEdit } from "react-icons/fa";
import DeleteEntryModal from "./DeleteEntryModal";
import PopupMessage from "../../Shared/PopupMessage";
import { PopupMessageContext } from "../../../context/PopupMessageContext";
import DALLE2 from "./DALLE2";

function Entry({ params }) {
  const [entry, setEntry] = useState({});
  const [body, setBody] = useState("");
  const [selectedText, setSelectedText] = useState();
  const [dreamSigns, setDreamSigns] = useState([]);
  const [dalleUrl, setDalleUrl] = useState("");
  const [modalActivated, setModalActivated] = useState(false);
  const { errorExists } = useContext(PopupMessageContext);

  useEffect(() => {
    getEntry();
    getDreamSigns();
  }, [params.id]);

  const getEntry = async () => {
    const url = `/api/entries/${params.id}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntry(data);
      setBody(String(data.body));
      if (data.image != null) {
        setDalleUrl(data.image.url);
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  function regExpEscape(string) {
    return string.replace(/[^A-Za-z0-9_]/g, "\\$&");
  }

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
      console.log(data);
      const joinedDreamSigns = data.map(regExpEscape).join("|");
      console.log(joinedDreamSigns);
      dreamSignsRegexPattern = [
        new RegExp("\\b" + joinedDreamSigns + " \\b", "g"),
      ];
      setDreamSigns(dreamSignsRegexPattern);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMouseUp = () => {
    setSelectedText(window.getSelection().toString());
  };

  const highlightNewDreamSign = () => {
    console.log("highlighting...");
    setDreamSigns((dreamSigns) => [...dreamSigns, selectedText]);
  };

  const toggleModalActivation = () => {
    setModalActivated((currentBooleanState) => !currentBooleanState);
  };

  return (
    <section
      className={`${
        modalActivated ? "pointer-events-none" : " "
      } flex h-full w-full flex-col gap-4 whitespace-pre-line break-words rounded border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2`}
    >
      {errorExists && (
        <PopupMessage
          content={
            "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key."
          }
        />
      )}
      {modalActivated && (
        <DeleteEntryModal
          id={params.id}
          toggleModalActivation={toggleModalActivation}
        />
      )}
      <div className="flex items-center justify-between border-b pb-2">
        <h1 data-cy="entryTitle" className="text-sm lg:text-3xl">
          {entry.title}
        </h1>
        <div className="flex items-center gap-4">
          <DeleteEntryButton toggleModalActivation={toggleModalActivation} />
          <Link
            href={`/entries/${params.id}/edit`}
            className="min-h flex items-center gap-2 whitespace-nowrap rounded border border-sky-500 
                      p-[0.450rem_0.450rem_0.4625rem] text-xs italic 
                      text-sky-500 hover:bg-slate-700 lg:text-lg"
            data-cy="editEntry"
          >
            <span className="lg:text-md hidden lg:block xl:text-lg">
              Edit Entry
            </span>
            <FaEdit />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex items-end gap-4 pb-2">
          <Link
            href={`/entries/${params.id}/interpretation`}
            className="text-xs text-sky-500 underline lg:text-lg"
          >
            Go to Interpretation
          </Link>
          <DALLE2
            entry_id={params.id}
            setDalleUrl={setDalleUrl}
            entry_body_text={entry.body}
          />
        </div>
      </div>
      <Selection.Root>
        <Selection.Trigger className="h-fit overflow-auto">
          <p onMouseUp={handleMouseUp} className="text-xl">
            <Highlighter
              highlightClassName="text-[#FFBABB] rounded bg-transparent"
              searchWords={dreamSigns}
              textToHighlight={body}
              data-cy="entryBody"
              highlightStyle={{ textShadow: "0 0 5px #FFBABB" }}
            />
          </p>
        </Selection.Trigger>
        <Selection.Portal>
          <Selection.Content
            side="top"
            className="flex w-full flex-col items-center rounded-md bg-[hsl(237.1,25.9%,15.9%)] px-2.5 shadow-xl"
          >
            <div className="flex">
              <DreamSign
                phrase={selectedText}
                highlightNewDreamSign={highlightNewDreamSign}
              />
            </div>
            <span className="h-0">
              <svg
                className="fill-[hsl(237.1,25.9%,15.9%)]"
                width="10"
                height="5"
                viewBox="0 0 30 10"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 30,0 15,10"></polygon>
              </svg>
            </span>
          </Selection.Content>
        </Selection.Portal>
      </Selection.Root>
      <img
        src={dalleUrl}
        alt="AI generated image of user dream"
        className="h-20 w-20 rounded border-2 border-sky-100"
      />
    </section>
  );
}

export default Entry;
