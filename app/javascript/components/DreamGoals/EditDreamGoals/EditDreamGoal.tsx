import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaRegPaperPlane } from "react-icons/fa";

interface DreamGoalInterface {
  dreamGoal: {
    id: number;
    goal: string;
  };
}

export default function EditDreamGoal({ dreamGoal }: DreamGoalInterface) {
  const [showInput, setShowInput] = useState(false);
  const [dreamGoalBody, setDreamGoalBody] = useState(dreamGoal.goal);

  const deleteDreamGoal = async (id: number) => {
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/api/dream_goals/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  const updateDreamGoal = async (id: number) => {
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/api/dream_goals/${id}`, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: dreamGoal.id, goal: dreamGoalBody }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteDreamGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["sidebarGoals"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDreamGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["sidebarGoals"] });
      setShowInput(false);
    },
  });

  return showInput ? (
    <div className="flex">
      <button
        className="border p-2 hover:border-sky-500"
        onClick={() => {
          deleteMutation.mutate(dreamGoal.id);
        }}
      >
        <FaTrashAlt />
      </button>
      <input
        className="w-full border bg-[hsl(237.1,25.9%,19%)] p-2"
        onChange={(e) => setDreamGoalBody(e.target.value)}
        value={dreamGoalBody}
      />
      <button
        className="border p-2 hover:border-sky-500"
        onClick={() => updateMutation.mutate(dreamGoal.id)}
        type="submit"
      >
        <FaRegPaperPlane />
      </button>
    </div>
  ) : (
    <button
      className="border-dashed border-red-500 text-start hover:border-b"
      onClick={() => setShowInput(true)}
    >
      {dreamGoal.goal}
    </button>
  );
}
