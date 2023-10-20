import React from "react";

interface DreamSignProps {
  phrase: string;
  highlightNewDreamSign: () => void;
}

function DreamSign({ phrase, highlightNewDreamSign }: DreamSignProps) {
  // POST entry data to Rails API
  const createDreamSign = async () => {
    if (phrase.length <= 1) return;
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(`/api/dream_signs`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phrase, description: "" }),
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

  return (
    <button
      onClick={() => {
        createDreamSign();
        highlightNewDreamSign();
      }}
      className="p-2 text-[#FFBABB] hover:bg-[hsl(237.1,25.9%,12.9%)]"
    >
      Dream Sign
    </button>
  );
}

export default DreamSign;
