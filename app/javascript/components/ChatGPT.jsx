import React from "react";

function ChatGPT({ entry_id, setInterpretationBody }) {
  const createChatGPTResponse = async (event) => {
    event.preventDefault();
    const url = `/api/entries/${entry_id}/interpretation/chatgpt_response`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.text();
      setInterpretationBody(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={createChatGPTResponse}
      className="min-h hidden whitespace-nowrap rounded border border-violet-500 p-[0.450rem_0.450rem_0.4625rem] 
                      text-xs italic text-violet-500 
                      hover:bg-slate-700 lg:block lg:text-lg"
    >
      Interpret with AI
    </button>
  );
}

export default ChatGPT;
