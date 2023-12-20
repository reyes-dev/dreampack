import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CompleteDreamGoal({ id }: { id: number }) {
  const completeDreamGoal = async () => {
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
        body: JSON.stringify({ id, achieved: true }),
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

  const completeMutation = useMutation({
    mutationFn: completeDreamGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["sidebarGoals"] });
    },
  });

  return (
    <button
      className="flex h-4 w-4 items-center justify-center rounded-full border hover:border-yellow-500 hover:bg-gray-800 hover:before:content-['✓']"
      onClick={() => {
        completeMutation.mutate();
      }}
    ></button>
  );
}
