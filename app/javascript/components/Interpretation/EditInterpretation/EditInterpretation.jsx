import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";

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
      className="flex h-full w-full flex-col gap-4 rounded border-2 border-dashed border-[hsl(133.1,66.1%,76.9%)] bg-[hsla(0,0%,0%,0.15)] p-8 lg:h-[80vh] xl:w-1/2"
      onSubmit={updateInterpretation}
    >
      <div className="flex justify-end border-b pb-2">
        <button
          type="submit"
          className="min-h flex items-center gap-2 whitespace-nowrap rounded border border-sky-500 
                      p-[0.450rem_0.450rem_0.4625rem] text-sm italic 
                      text-sky-500 hover:bg-slate-700"
        >
          <span className="lg:text-md hidden lg:block xl:text-lg">
            Update interpretation
          </span>
          <FaRegPaperPlane />
        </button>
      </div>
      <label
        for="interpretationBody"
        className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
      >
        Write or Edit Your Dream Interpration:
      </label>
      <textarea
        className="h-full resize-none bg-transparent outline-none"
        name="interpretationBody"
        id="interpretationBody"
        onChange={(event) => onChange(event, setBody)}
        placeholder="Interpret the meaning of your dream here..."
        value={body || ""}
      />
    </form>
  );
}

export default EditInterpretation;
