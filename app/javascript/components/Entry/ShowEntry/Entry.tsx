import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import * as Selection from "selection-popover";
import Highlighter from "react-highlight-words";
import DeleteEntryButton from "components/Entry/ShowEntry/DeleteEntryButton";
import DreamSignButton from "components/Entry/ShowEntry/DreamSign";
import DeleteEntryModal from "components/Entry/ShowEntry/DeleteEntryModal";
import PopupMessage from "components/Shared/PopupMessage";
import { PopupMessageContext } from "context/PopupMessageContext";
import { FaEdit } from "react-icons/fa";

interface EntryProps {
  params: {
    id: string;
  };
}

function Entry({ params }: EntryProps) {
  const [selectedText, setSelectedText] = useState<string>();
  const [modalActivated, setModalActivated] = useState(false);
  const { errorExists } = useContext(PopupMessageContext);
  const [, navigate] = useLocation();

  const _regExpEscape = (string: string) => {
    return string.replace(/[^A-Za-z0-9_]/g, "\\$&");
  };

  const _createRegexForDreamSigns = (dreamSigns: string[]) => {
    const joinedDreamSigns = dreamSigns?.map(_regExpEscape).join("|");
    const dreamSignsRegexPattern = [
      new RegExp("\\b" + joinedDreamSigns + " \\b", "g"),
    ];
    return dreamSignsRegexPattern;
  };

  const _handleMouseUp = () => {
    const windowSelection = window.getSelection();
    if (windowSelection !== null) {
      setSelectedText(windowSelection.toString());
    }
  };

  const _toggleModalActivation = () => {
    setModalActivated((currentBooleanState) => !currentBooleanState);
  };

  const getEntry = async () => {
    try {
      const response = await fetch(`/api/entries/${params.id}`);
      if (response.status === 404) {
        return navigate("/entries/new");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getDreamSigns = async () => {
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/api/dream_signs`, {
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
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const entryQuery = useQuery({
    queryKey: ["entry", params.id],
    queryFn: getEntry,
  });

  const dreamSignsQuery = useQuery({
    queryKey: ["dreamSigns"],
    queryFn: getDreamSigns,
  });

  return (
    <section
      className={`${
        modalActivated ? "pointer-events-none" : ""
      } relative h-full w-full whitespace-pre-line break-words border`}
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
          toggleModalActivation={_toggleModalActivation}
        />
      )}
      <section className="flex items-center justify-between">
        <div className="absolute -right-[1px] -top-[1px] flex">
          <DeleteEntryButton toggleModalActivation={_toggleModalActivation} />
          <Link
            href={`/entries/${params.id}/edit`}
            className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
            data-cy="editEntry"
          >
            <span className="hidden lg:block">Edit Entry</span>
            <FaEdit />
          </Link>
        </div>
      </section>
      <section className="flex p-8">
        <h1 data-cy="entryTitle" className="overflow-hidden font-bold">
          {entryQuery.data?.title}
        </h1>
      </section>
      <Selection.Root whileSelect={true}>
        <Selection.Trigger className="h-fit overflow-auto">
          <article onMouseUp={_handleMouseUp} className="p-8">
            <Highlighter
              highlightClassName="text-[#FFBABB] rounded bg-transparent"
              searchWords={_createRegexForDreamSigns(dreamSignsQuery.data)}
              textToHighlight={entryQuery.data?.body}
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
            <div>
              <DreamSignButton phrase={selectedText ? selectedText : ""} />
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
            </div>
          </Selection.Content>
        </Selection.Portal>
      </Selection.Root>
      <Link
        href={`/entries/${params.id}/note`}
        className="absolute -bottom-[1px] -left-[1px] border p-[0.450rem_0.450rem_0.4625rem] hover:border-lime-500"
      >
        {`<`} Go to Notes
      </Link>
      <Link
        href={`/entries/${params.id}/interpretation`}
        className="absolute -bottom-[1px] -right-[1px] border p-[0.450rem_0.450rem_0.4625rem] hover:border-violet-500"
      >
        Go to Interpretation {`>`}
      </Link>
    </section>
  );
}

export default Entry;
