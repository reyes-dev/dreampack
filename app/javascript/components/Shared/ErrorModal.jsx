import React, { useEffect, useContext } from "react";
import { ErrorModalContext } from "../../context/ErrorModalContext";

function ErrorModal({ content }) {
  const { setErrorExists } = useContext(ErrorModalContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorExists(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <section className="border-bg-white rounded border p-4 text-red-500 shadow-xl">
      {content}
    </section>
  );
}

export default ErrorModal;
