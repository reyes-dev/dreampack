import React from "react";

function DreamSign({ phrase, highlightNewDreamSign }) {
  // POST entry data to Rails API
  const createDreamSign = async () => {
    if (phrase.length <= 1) return;
    const token = document.querySelector("meta[name='csrf-token']").content;
    try {
      const response = await fetch(`/api/dream_signs`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
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
    >
      Dream Sign
    </button>
  );
}

export default DreamSign;
