import React from "react";
import { useLocation } from "wouter";
import { FaTrashAlt } from "react-icons/fa";

function DeleteEntry({ id }) {
  const [location, setLocation] = useLocation();

  const deleteEntry = async () => {
    const url = `/api/entries/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setLocation("/entries");
      return response.json();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      className="rounded border border-rose-700 p-[0.450rem_0.450rem_0.4625rem] text-xs text-rose-700 hover:bg-slate-700 lg:text-lg"
      onClick={deleteEntry}
      data-cy="deleteEntry"
    >
      <FaTrashAlt />
    </button>
  );
}

export default DeleteEntry;
