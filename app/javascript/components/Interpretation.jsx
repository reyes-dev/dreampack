import React, { useState, useEffect } from "react";
import { Link } from "wouter";

function Interpretation({ params }) {
  const [interpretationBody, setInterpretationBody] = useState("");

  useEffect(() => {
    getInterpretation();
  }, []);

  const getInterpretation = async () => {
    const url = `/api/entries/${params.id}/interpretation`;
    const response = await fetch(url);
    const data = await response.json();
    setInterpretationBody(data.body);
  };

  return (
    <section
      className="flex flex-col bg-white px-8 py-8 gap-4 w-[35%] 
        max-w-4xl max-h-[90%] h-full shadow-2xl"
    >
      <h1>Interpretation</h1>
      <div>
        <button>Interpret with AI</button>
        <Link href={`/entries/index/${params.id}`}>Back to Entry</Link>
      </div>
      <p>{interpretationBody}</p>
    </section>
  );
}

export default Interpretation;
