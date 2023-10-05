import React, { useState, useContext } from "react";
import PopupMessage from "../Shared/PopupMessage";
import { PopupMessageContext } from "../../context/PopupMessageContext";

function Settings() {
  const [openai_token, setOpenAIToken] = useState("");
  const [errorContent, setErrorContent] = useState([]);
  const [success, setSuccess] = useState(false);
  const { errorExists, setErrorExists } = useContext(PopupMessageContext);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const updateSettings = async (event) => {
    event.preventDefault();
    const url = `/registration`;
    const body_param = {
      user: {
        openai_token,
      },
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body_param),
      });
      if (!response.ok) {
        const errors = await response.json();
        setErrorExists(true);
        setErrorContent(errors);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSuccess(true);
      setErrorExists(true);
      setErrorContent([data]);
      return;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col justify-between gap-4 whitespace-pre-line break-words
        rounded border-2 border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] 
        p-8 md:h-[80vh] md:w-1/2"
      onSubmit={updateSettings}
    >
      <div className="flex flex-col gap-4">
        <h1 className="w-full border-b bg-transparent pb-2 outline-none">
          Your settings
        </h1>
        <section className="flex flex-col gap-8">
          {errorExists && (
            <PopupMessage content={errorContent} success={success} />
          )}
          <label className="flex flex-col gap-1">
            OpenAI API Key
            <input
              type="password"
              className="rounded border border-black p-2 text-black"
              onChange={(event) => onChange(event, setOpenAIToken)}
              placeholder="Enter your OpenAI API Key"
              value={openai_token || ""}
              autoFocus
            />
          </label>
        </section>
      </div>
      <button
        className="flex w-min items-center justify-center gap-2 whitespace-nowrap rounded border border-white/20 p-3 hover:bg-slate-800 active:bg-slate-900 lg:w-full"
        type="submit"
      >
        Save settings
      </button>
    </form>
  );
}

export default Settings;