import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useLocation } from "wouter";
import { FaRegPaperPlane } from "react-icons/fa";

interface EditInterpretationProps {
  params: {
    id: string;
  };
}

function EditInterpretation({ params }: EditInterpretationProps) {
  const [interpretation, setInterpretation] = useState("");
  const [, navigate] = useLocation();
  // Store state data for CRUD operations
  useEffect(() => {
    getInterpretation();
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    setFunction: (eventValue: string) => void,
  ) => {
    setFunction(event.target.value);
  };

  const getInterpretation = async () => {
    const url = `/api/entries/${params.id}/interpretation`;
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        navigate("/entries/new");
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInterpretation(data.body);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  if (interpretation === undefined) {
    return <></>;
  }

  const updateInterpretation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `/api/entries/${params.id}/interpretation`;
    const id = params.id;
    const body_param = { body: interpretation, id };
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body_param),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      navigate(`/entries/${params.id}/interpretation`);
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      className="relative flex h-full w-full flex-col gap-4 rounded border p-8 pb-16"
      onSubmit={updateInterpretation}
    >
      <h1 className="font-bold">Dream Interpretation</h1>
      <label
        htmlFor="interpretationBody"
        className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden"
      >
        Write or Edit Your Dream Interpration:
      </label>
      <textarea
        className="h-full resize-none rounded bg-[hsl(237.1,25.9%,19%)] p-2 pl-5 pt-5"
        name="interpretationBody"
        id="interpretationBody"
        onChange={(event) => onChange(event, setInterpretation)}
        placeholder="Interpret the meaning of your dream here..."
        value={interpretation || ""}
      />
      <div className="absolute -bottom-[1px] -right-[1px]">
        <button
          type="submit"
          className="min-h flex items-center gap-2 whitespace-nowrap border p-[0.450rem_0.450rem_0.4625rem] hover:border-sky-500"
        >
          <span className="lg:block">Update interpretation</span>
          <FaRegPaperPlane />
        </button>
      </div>
    </form>
  );
}

export default EditInterpretation;
