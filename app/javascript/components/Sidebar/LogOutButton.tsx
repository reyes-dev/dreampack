import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { FaSignOutAlt } from "react-icons/fa";

function LogOutButton() {
  const [, navigate] = useLocation();

  const logoutUser = async () => {
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;

    try {
      const response = await fetch(`/logout`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
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
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      className="flex w-min items-center gap-2 whitespace-nowrap rounded-xl p-3 hover:bg-slate-700 lg:w-full"
    >
      <FaSignOutAlt />
      <span className="hidden lg:block">Logout</span>
    </button>
  );
}

export default LogOutButton;
