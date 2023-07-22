import React from "react";

function ChatGPT({ entry_id }) {
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
      await response.text();
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  return <button onClick={createChatGPTResponse}>Interpret with AI</button>;
}

export default ChatGPT;
