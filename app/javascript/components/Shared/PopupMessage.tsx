import React, { useEffect, useContext } from "react";
import { PopupMessageContext } from "context/PopupMessageContext";

interface PopupMessage {
  content: string[];
  success?: boolean;
}

function PopupMessage({ content, success = false }: PopupMessage) {
  const { errorExists, setErrorExists } = useContext(PopupMessageContext);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorExists(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
      setErrorExists(false);
    };
  }, []);

  if (errorExists === false) {
    return <></>;
  }

  const errorList = content.map((error: string, index: number) => {
    return <li key={index}>{error}</li>;
  });

  return (
    <ul
      className={
        (success ? `text-green-500` : `text-red-500`) +
        " border-bg-white rounded border p-4 shadow-xl"
      }
      role="list"
    >
      {errorList}
    </ul>
  );
}

export default PopupMessage;
