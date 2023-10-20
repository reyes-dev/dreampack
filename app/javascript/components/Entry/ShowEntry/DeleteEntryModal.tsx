import React, { useContext } from "react";
import { useLocation } from "wouter";
import { SidebarEntryContext } from "context/SidebarEntryContext";

interface DeleteEntryModalProps {
  id: string;
  toggleModalActivation: () => void;
}

function DeleteEntryModal({
  id,
  toggleModalActivation,
}: DeleteEntryModalProps) {
  const [, navigate] = useLocation();
  const { setSidebarEntriesUpdateTrigger } = useContext(SidebarEntryContext);

  const deleteEntry = async () => {
    const url = `/api/entries/${id}`;
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setSidebarEntriesUpdateTrigger((v) => !v);
      navigate("/entries");
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
          autoFocus
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
