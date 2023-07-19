import React from "react";
import { useLocation } from "wouter";

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
      setLocation("/entries/index/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button className="text-rose-700" onClick={deleteEntry}>
      [ - ]
    </button>
  );
}

export default DeleteEntry;
