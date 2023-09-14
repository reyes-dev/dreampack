import React, { useEffect, useContext } from "react";
import { PopupMessageContext } from "../../context/PopupMessageContext";

function PopupMessage({ content, success = false }) {
  const { setErrorExists } = useContext(PopupMessageContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorExists(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <section
      className={
        (success ? `text-green-500` : `text-red-500`) +
        " border-bg-white rounded border p-4 text-red-500 shadow-xl"
      }
    >
      {content}
    </section>
  );
}

export default PopupMessage;
