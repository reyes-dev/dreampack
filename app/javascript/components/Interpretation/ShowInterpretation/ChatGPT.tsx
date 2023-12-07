import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRobot } from "react-icons/fa";
import { PopupMessageContext } from "context/PopupMessageContext";

interface ChatGPTProps {
  entry_id: string;
}

function ChatGPT({ entry_id }: ChatGPTProps) {
  const { setErrorExists } = useContext(PopupMessageContext);

  const createChatGPTResponse = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(
        `/api/entries/${entry_id}/interpretation/chatgpt_response`,
        {
          method: "POST",
          headers: {
            "X-CSRF-Token": csrfTokenMetaElementContent,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      if (data === null || data.trim() === "") {
        setErrorExists(true);
      }
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createChatGPTResponse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interpretation"] });
    },
  });

  return (
    <button
      type="button"
      onClick={mutation.mutate}
      className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-violet-500"
    >
      <span className="hidden lg:block">Interpret with AI</span>
      <FaRobot />
    </button>
  );
}

export default ChatGPT;
