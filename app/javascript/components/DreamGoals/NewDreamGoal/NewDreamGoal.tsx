import React, { useState, FormEvent, ChangeEvent } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FaRegPaperPlane } from "react-icons/fa";

export default function NewDreamGoal() {
  const [showInput, setShowInput] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  const newDreamGoal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/api/dream_goals`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal: newGoal,
          achieved: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.text();
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newDreamGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setShowInput(false);
    },
  });

  return (
    <form onSubmit={mutation.mutate}>
      {showInput ? (
        <div className="flex gap-2">
          <input
            className="w-full rounded-xl bg-[hsl(237.1,25.9%,19%)] p-2"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNewGoal(event.target.value);
            }}
          />
          <button className="border p-2 hover:border-sky-500" type="submit">
            <FaRegPaperPlane />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowInput(true);
          }}
        >
          + Add Goal
        </button>
      )}
    </form>
  );
}
