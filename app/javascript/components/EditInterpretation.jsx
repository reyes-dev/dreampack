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
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBody(data.body);
      return data;
    } catch (e) {
      console.error(e);
    }
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
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      setLocation(`/entries/${params.id}/interpretation`);
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      className="flex h-[80vh] w-1/2 flex-col justify-center gap-4 rounded
         border-2 border-dashed border-[hsl(133.1,66.1%,76.9%)] bg-[#08041A] p-8"
      onSubmit={updateInterpretation}
    >
      <div className="flex justify-end border-b pb-2">
        <button
          type="submit"
          className="text-md min-h whitespace-nowrap rounded 
                      border border-sky-500 p-[0.450rem_0.450rem_0.4625rem] 
                      italic text-sky-500 hover:bg-slate-700"
        >
          Update interpretation
        </button>
      </div>

      <textarea
        className="h-full resize-none bg-transparent outline-none"
        name="interpretText"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Interpret the meaning of your dream here..."
        value={body || ""}
      />
    </form>
  );
}

export default EditInterpretation;
