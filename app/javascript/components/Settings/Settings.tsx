import React, { useState, useContext, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import PopupMessage from "components/Shared/PopupMessage";
import { PopupMessageContext } from "context/PopupMessageContext";

function Settings() {
  const [openai_token, setOpenAIToken] = useState("");
  const [errorContent, setErrorContent] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const { errorExists, setErrorExists } = useContext(PopupMessageContext);

  const onChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFunction: (openai_token: string) => void,
  ) => {
    setFunction(event.target.value);
  };

  const updateSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/registration`, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            openai_token,
          },
        }),
      });

      if (!response.ok) {
        const errors = await response.json();
        setErrorExists(true);
        setErrorContent(errors);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      setSuccess(true);
      setErrorExists(true);
      setErrorContent([data]);
    },
  });

  return (
    <form
      className="flex h-full w-full flex-col justify-between gap-4 whitespace-pre-line break-words  border p-8"
      onSubmit={mutation.mutate}
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
