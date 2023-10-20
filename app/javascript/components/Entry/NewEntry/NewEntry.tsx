import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  ChangeEvent,
  FormEvent,
} from "react";
import Whisper from "components/Entry/NewEntry/Whisper";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";
import PopupMessage from "components/Shared/PopupMessage";
import { PopupMessageContext } from "context/PopupMessageContext";
import { SidebarEntryContext } from "context/SidebarEntryContext";

function NewEntry() {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audioIsReady, setAudioIsReady] = useState(false);
  const [, navigate] = useLocation();
  const { errorExists } = useContext(PopupMessageContext);
  const [isLoading, setIsLoading] = useState(false);
  const { setSidebarEntriesUpdateTrigger } = useContext(SidebarEntryContext);

  useEffect(() => {
    if (audioIsReady && formRef.current !== null) {
      formRef.current.requestSubmit();
    }
  }, [audioIsReady]);
  // Store state data for CRUD operations
  const onChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setFunction: (e: string) => void,
  ) => {
    setFunction(event.target.value);
  };
  // POST entry data to Rails API
  const createEntry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    // Validate body
    if (body.length == 0) return;
    let dataBody;
    if (title.length === 0) {
      dataBody = {
        body,
        title: body.split(" ").slice(0, 5).join(" ").slice(0, 249),
      };
    } else {
      dataBody = { body, title };
    }
    try {
      const response = await fetch(`/api/entries`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSidebarEntriesUpdateTrigger((v) => !v);
      navigate(`/entries/${data.id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const setEntryBodyHandler = (transcription) => {
    setBody(transcription);
    setAudioIsReady(true);
  };

  return (
    <form
      ref={formRef}
      className="flex h-full w-full flex-col gap-4 rounded
        border-2 border-dashed border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
      onSubmit={createEntry}
    >
      {errorExists && (
        <PopupMessage
          content={[
            "You received an empty response, meaning something is wrong. Please check to see if you entered the correct API key.",
          ]}
        />
      )}
      <div className="flex flex-row-reverse justify-between gap-4 border-b pb-2">
        <Whisper
          setEntryBodyHandler={setEntryBodyHandler}
          setIsLoading={setIsLoading}
        />
        <label
          htmlFor="entryTitle"
          className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
        >
          Entry Title:
        </label>
        <input
          className=" w-full bg-transparent outline-none"
          name="entryTitle"
          id="entryTitle"
          data-cy="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
        />
      </div>

      <div className="flex items-center justify-between border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex gap-4 pb-2"></div>
      </div>

      <div
        className={
          isLoading
            ? "flex h-full flex-col items-center justify-center"
            : "flex h-full flex-col"
        }
      >
        <label
          htmlFor="entryText"
          className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
        >
          Record Your Dream Journal Entry:
        </label>
        {isLoading ? (
          <div className="h-36 w-36 flex-[0_0_auto] animate-spin self-center rounded-full border-4 border-[rgba(255,255,255,.3)] border-t-[hsl(133.1,66.1%,76.9%)]"></div>
        ) : (
          <textarea
            className="h-full resize-none bg-transparent outline-none"
            name="entryText"
            id="entryText"
            data-cy="entryText"
            onChange={(event) => onChange(event, setBody)}
            placeholder="Your entry here..."
            value={body}
          />
        )}
      </div>
      <button
        type="submit"
        className="min-h flex items-center gap-2 self-end whitespace-nowrap rounded border border-sky-500 
                    p-[0.450rem_0.450rem_0.4625rem]  italic 
                    text-sky-500 hover:bg-slate-700 "
      >
        <span className="lg:block">Save entry</span>
        <FaRegPaperPlane />
      </button>
    </form>
  );
}

export default NewEntry;
