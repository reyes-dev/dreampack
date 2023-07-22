import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

function EditInterpretation({ params }) {
  const [body, setBody] = useState("");
  const [location, setLocation] = useLocation();
  // Store state data for CRUD operations
  useEffect(() => {
    getInterpretation();
  }, []);

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const getInterpretation = async () => {
    const url = `/api/entries/${params.id}/interpretation`;
    const response = await fetch(url);
    const data = await response.json();
    setBody(data.body);
  };

  const updateInterpretation = async (event) => {
    event.preventDefault();
    const url = `/api/entries/${params.id}/interpretation`;
    const id = params.id;
    const body_param = { body, id };
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
      setLocation(`/entries/${params.id}/interpretation`);
      return response.ok;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="flex h-full max-h-[90%] w-[35%] max-w-4xl flex-col gap-4 
        bg-white px-8 py-8 shadow-2xl"
      onSubmit={updateInterpretation}
    >
      <div className="flex border-b pb-2">
        <button type="submit" className="self-start italic text-sky-500">
          Update interpretation
        </button>
      </div>

      <textarea
        className="h-full resize-none outline-none"
        name="interpretText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Interpret the meaning of your dream here..."
        value={body || ""}
      />
    </form>
  );
}

export default EditInterpretation;
