import React, { useContext } from "react";
import { FaPalette } from "react-icons/fa";
import { PopupMessageContext } from "context/PopupMessageContext";

interface DALLE2Props {
  entry_id: string;
  setDalleUrl: (url: string) => void;
  entryBodyText: string;
}

function DALLE2({ entry_id, setDalleUrl, entryBodyText }: DALLE2Props) {
  const { setErrorExists } = useContext(PopupMessageContext);

  const generateImage = async () => {
    const url = `/api/entries/${entry_id}/dalle_responses`;
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    const prompt = `Create an image based on the following dream: ${entryBodyText}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.text();
      if (data === null || data.trim() === "") {
        setErrorExists(true);
      }
      setDalleUrl(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={generateImage}
      className="min-h flex items-center gap-2 whitespace-nowrap rounded border border-amber-500 
                      p-[0.450rem_0.450rem_0.4625rem] italic 
                      text-amber-500 hover:bg-slate-700"
    >
      <span className="hidden lg:block">Generate Image</span>
      <FaPalette />
    </button>
  );
}

export default DALLE2;
