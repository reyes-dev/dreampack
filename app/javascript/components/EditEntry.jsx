import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

function EditEntry({ params }) {
  const [entry, setEntry] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useLocation();
  // Store state data for CRUD operations
  useEffect(() => {
    getEntry();
  }, []);

  useEffect(() => {
    setTitle(entry.title);
    setBody(entry.body);
  }, [entry]);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const getEntry = async () => {
    const url = `/api/entries/${params.id}`;
    const response = await fetch(url);
    const data = await response.json();
    setEntry(data);
  };

  const updateEntry = async (event) => {
    event.preventDefault();
    if (title.length == 0 || body.length == 0) return;
    const url = `/api/entries/${params.id}`;
    const id = params.id;
    const body_param = { title, body, id };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body_param),
      });
      await response.text();
      setLocation(`/entries/${params.id}`);
      return response.ok;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex h-full max-h-[90%] w-[35%] max-w-4xl flex-col gap-4 
        bg-white px-8 py-8 shadow-2xl"
      onSubmit={updateEntry}
    >
      <div className="flex border-b pb-2">
        <input
          className="flex-1 text-3xl outline-none"
          name="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
          value={title || ""}
        />
        <button type="submit" className="self-start italic text-sky-500">
          Update entry
        </button>
      </div>

      <div className="border-b pb-2">
        <p className="text-gray-600">Created on {entry.created_at}</p>
      </div>

      <textarea
        className="h-full resize-none outline-none"
        name="entryText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Your entry here..."
        value={body || ""}
      />
    </form>
  );
}

export default EditEntry;
