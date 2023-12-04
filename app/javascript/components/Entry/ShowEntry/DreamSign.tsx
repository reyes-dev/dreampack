import React, { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DreamSignProps {
  phrase: string;
}

export default function DreamSignButton({ phrase }: DreamSignProps) {
  const createDreamSign = async (event: FormEvent) => {
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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDreamSign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dreamSigns"] });
    },
  });

  return (
    <form onSubmit={mutation.mutate}>
      <button
        type="submit"
        className="flex p-2 text-[#FFBABB] hover:bg-[hsl(237.1,25.9%,12.9%)]"
      >
        Dream Sign
      </button>
    </form>
  );
}
