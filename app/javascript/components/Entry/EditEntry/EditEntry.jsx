import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";

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
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEntry(data);
      return data;
    } catch (e) {
      console.error(e);
    }
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
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      setLocation(`/entries/${params.id}`);
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4 rounded border-2
        border-dashed border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
      onSubmit={updateEntry}
    >
      <div className="flex justify-between gap-4 border-b pb-2">
        <input
          className="flex-1 bg-transparent text-sm outline-none lg:text-3xl"
          name="entryTitle"
          data-cy="entryTitle"
          onChange={(event) => onChange(event, setTitle)}
          placeholder="Entry Title"
          value={title || ""}
        />
        <button
          type="submit"
          className="min-h flex items-center gap-2 whitespace-nowrap rounded border border-sky-500 
                      p-[0.450rem_0.450rem_0.4625rem] text-xs italic 
                      text-sky-500 hover:bg-slate-700 lg:text-lg"
        >
          <span className="lg:text-md hidden lg:block xl:text-lg">
            Update entry
          </span>
          <FaRegPaperPlane />
        </button>
      </div>

      <div className="border-b pb-2">
        <p className="lg:text-md text-sm text-gray-600">
          Created on {entry.created_at}
        </p>
      </div>

      <textarea
        className="h-full resize-none bg-transparent outline-none"
        name="entryText"
        data-cy="entryText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Your entry here..."
        value={body || ""}
      />
    </form>
  );
}

export default EditEntry;
