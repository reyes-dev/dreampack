import React, { useState, useEffect, useRef } from "react";
import Whisper from "./Whisper";
import { useLocation } from "wouter";

function NewEntry() {
  const formRef = useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audioIsReady, setAudioIsReady] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (audioIsReady) {
      formRef.current.requestSubmit();
    }
  }, [audioIsReady]);
  // Store state data for CRUD operations
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  // POST entry data to Rails API
  const createEntry = async (event) => {
    event.preventDefault();
    // Validate body
    if (body.length == 0) return;
    const dataBody = { body, title };
    const token = document.querySelector("meta[name='csrf-token']").content;
    try {
      const response = await fetch(`/api/entries`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLocation(`/entries/${data.id}`);
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
      className="flex h-[80vh] w-1/2 flex-col gap-4 rounded
         border-2 border-dashed border-[hsl(133.1,66.1%,76.9%)] bg-[#08041A] p-8"
      onSubmit={createEntry}
    >
      <div className="flex justify-between gap-4 border-b pb-2">
        <input
          className="w-full bg-transparent text-3xl outline-none"
          name="entryTitle"
          data-cy="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
        />
        <button
          type="submit"
          className="text-md min-h whitespace-nowrap rounded 
                      border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-sky-500 hover:bg-slate-700 "
        >
          Save entry
        </button>
      </div>

      <div className="flex items-center justify-between border-b pb-2">
        <p className=" text-gray-600">Created on {new Date().toDateString()}</p>
        <div className="flex gap-4 pb-2">
          <Whisper setEntryBodyHandler={setEntryBodyHandler} />
        </div>
      </div>

      <textarea
        className="h-full resize-none bg-transparent outline-none"
        name="entryText"
        data-cy="entryText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Your entry here..."
        value={body}
      />
    </form>
  );
}

export default NewEntry;
