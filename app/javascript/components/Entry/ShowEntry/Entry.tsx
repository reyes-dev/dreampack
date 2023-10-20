import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation } from "wouter";
import DeleteEntryButton from "components/Entry/ShowEntry/DeleteEntryButton";
import * as Selection from "selection-popover";
import DreamSign from "components/Entry/ShowEntry/DreamSign";
import Highlighter from "react-highlight-words";
import { FaEdit } from "react-icons/fa";
import DeleteEntryModal from "components/Entry/ShowEntry/DeleteEntryModal";
import PopupMessage from "components/Shared/PopupMessage";
import { PopupMessageContext } from "context/PopupMessageContext";
import DALLE2 from "components/Entry/ShowEntry/DALLE2";

interface EntryProps {
  params: {
    id: string;
  };
}
function Entry({ params }: EntryProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [entry, setEntry] = useState({ title: "", body: "", created_at: "" });
  const [body, setBody] = useState("");
  const [selectedText, setSelectedText] = useState<string>();
  const [dreamSigns, setDreamSigns] = useState<Array<string | RegExp>>([]);
  const [dalleUrl, setDalleUrl] = useState("");
  const [modalActivated, setModalActivated] = useState(false);
  const [imageActivated, setImageActivated] = useState(false);
  const { errorExists } = useContext(PopupMessageContext);
  const [, navigate] = useLocation();

  useEffect(() => {
    getEntry();
    getDreamSigns();
    setImageActivated(false);
  }, [params.id]);

  useEffect(() => {
    const clickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setImageActivated(false);
      }
    };

    document.addEventListener("click", clickOutside, true);

    return () => {
      document.removeEventListener("click", clickOutside, true);
    };
  }, [ref]);

  const getEntry = async () => {
    const url = `/api/entries/${params.id}`;
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        return navigate("/entries/new");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntry(data);
      setBody(String(data.body));
      if (data.image != null) {
        setDalleUrl(data.image.url);
      } else {
        setDalleUrl("");
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  function regExpEscape(string: string) {
    return string.replace(/[^A-Za-z0-9_]/g, "\\$&");
  }

  const getDreamSigns = async () => {
    const url = `/api/dream_signs`;
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const joinedDreamSigns = data.map(regExpEscape).join("|");
      const dreamSignsRegexPattern = [
        new RegExp("\\b" + joinedDreamSigns + " \\b", "g"),
      ];
      setDreamSigns(dreamSignsRegexPattern);
    } catch (e) {
      console.error(e);
    }
  };

  if (entry == undefined) {
    return <></>;
  }

  const handleMouseUp = () => {
    const windowSelection = window.getSelection();
    if (windowSelection !== null) {
      setSelectedText(windowSelection.toString());
    }
  };

  const highlightNewDreamSign = () => {
    if (selectedText) {
      setDreamSigns((dreamSigns) => [...dreamSigns, selectedText]);
    }
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
          content={[
            "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key.",
          ]}
        />
      )}
      {modalActivated && (
        <DeleteEntryModal
          id={params.id}
          toggleModalActivation={toggleModalActivation}
        />
      )}
      <section className="flex items-center justify-between border-b pb-2">
        <h1 data-cy="entryTitle" className="lg:text-3xl">
          {entry.title}
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href={`/entries/${params.id}/edit`}
            className="min-h flex items-center gap-2 whitespace-nowrap rounded border border-sky-500 
                      p-[0.450rem_0.450rem_0.4625rem] italic 
                      text-sky-500 hover:bg-slate-700"
            data-cy="editEntry"
          >
            <span className="hidden lg:block">Edit Entry</span>
            <FaEdit />
          </Link>
          <DeleteEntryButton toggleModalActivation={toggleModalActivation} />
        </div>
      </section>
      <section className="flex items-center justify-between border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex items-end gap-4 pb-2">
          {dalleUrl.length === 0 ? null : (
            <button
              onClick={() => {
                setImageActivated((imageActivated) => !imageActivated);
              }}
            >
              <img
                alt="AI generated image of user dream"
                src={dalleUrl}
                className="h-10 w-10 rounded border-2"
              />
            </button>
          )}

          <Link
            href={`/entries/${params.id}/interpretation`}
            className="text-sky-500 underline"
          >
            Go to Interpretation
          </Link>
          <DALLE2
            entry_id={params.id}
            setDalleUrl={setDalleUrl}
            entryBodyText={entry.body}
          />
        </div>
      </section>
      <Selection.Root>
        <Selection.Trigger className="h-fit overflow-auto">
          <article onMouseUp={handleMouseUp}>
            <Highlighter
              highlightClassName="text-[#FFBABB] rounded bg-transparent"
              searchWords={dreamSigns}
              textToHighlight={body}
              data-cy="entryBody"
              highlightStyle={{ textShadow: "0 0 5px #FFBABB" }}
            />
          </article>
        </Selection.Trigger>
        <Selection.Portal>
          <Selection.Content
            side="top"
            className="flex w-full flex-col items-center rounded-md bg-[hsl(237.1,25.9%,15.9%)] px-2.5 shadow-xl"
          >
            <div className="flex">
              <DreamSign
                phrase={selectedText ? selectedText : ""}
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
      {imageActivated ? (
        <img
          src={dalleUrl}
          alt="AI generated image of user dream"
          className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 shadow-xl"
          ref={ref}
        />
      ) : null}
    </section>
  );
}

export default Entry;
