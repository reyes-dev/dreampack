import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface DeleteEntryButtonProps {
  toggleModalActivation: () => void;
}

function DeleteEntryButton({ toggleModalActivation }: DeleteEntryButtonProps) {
  return (
    <button
      className="flex items-center gap-2 whitespace-nowrap  border p-[0.450rem_0.450rem_0.4625rem] hover:border-rose-700"
      onClick={toggleModalActivation}
      data-cy="deleteEntry"
    >
      Delete Entry
      <FaTrashAlt />
    </button>
  );
}

export default DeleteEntryButton;
