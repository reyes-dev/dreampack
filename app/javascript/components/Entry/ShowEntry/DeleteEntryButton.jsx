import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function DeleteEntryButton({ toggleModalActivation }) {
  return (
    <button
      className="rounded border border-rose-700 p-[0.450rem_0.450rem_0.4625rem] text-xs text-rose-700 hover:bg-slate-700 lg:text-lg"
      onClick={toggleModalActivation}
      data-cy="deleteEntry"
    >
      <FaTrashAlt />
    </button>
  );
}

export default DeleteEntryButton;
