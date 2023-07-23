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
      const data = await response.text();
      setInterpretationBody(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  return <button onClick={createChatGPTResponse}>Interpret with AI</button>;
}

export default ChatGPT;
