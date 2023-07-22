import React, { useState } from "react";
import { useLocation } from "wouter";

function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useLocation();
  // Store state data for CRUD operations
  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };
  // POST entry data to Rails API
  const createEntry = async (event) => {
    event.preventDefault();
    // Validate body
    if (body.length == 0) return;
    const dataBody = { body, title };
    const token = document.querySelector("meta[name='csrf-token']").content;
    try {
      const response = await fetch(`/api/entries`, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });
      const data = await response.json();
      setLocation(`/entries/${data.id}`);
      return data;
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form
      className="flex h-full max-h-[90%] w-[35%] max-w-4xl flex-col gap-4 
        bg-white px-8 py-8 shadow-2xl"
      onSubmit={createEntry}
    >
      <div className="flex border-b pb-2">
        <input
          className="flex-1 text-3xl outline-none"
          name="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
        />
        <button type="submit" className="self-start italic text-sky-500">
          Save entry
        </button>
      </div>

      <div className="border-b pb-2">
        <p className="text-gray-600">Created on {new Date().toDateString()}</p>
      </div>

      <textarea
        className="h-full resize-none outline-none"
        name="entryText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Your entry here..."
      />
    </form>
  );
}

export default NewEntry;
