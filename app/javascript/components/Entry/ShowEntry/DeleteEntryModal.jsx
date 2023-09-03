import React from "react";
import { useLocation } from "wouter";

function DeleteEntryModal({ id, toggleModalActivation }) {
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
    <section className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 p-8  shadow-xl">
      <h1 className="mb-4 text-lg lg:text-2xl">Delete entry</h1>
      <p className="mb-8 text-gray-200">Delete your entry permanently?</p>
      <div className="flex justify-end gap-6">
        <button
          onClick={toggleModalActivation}
          className="pointer-events-auto text-sky-500"
        >
          Cancel
        </button>
        <button
          className="pointer-events-auto text-sky-500"
          onClick={deleteEntry}
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default DeleteEntryModal;
