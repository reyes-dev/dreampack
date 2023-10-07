import React, { useContext } from "react";
import { useLocation } from "wouter";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "context/UserContext";

function LogOutButton() {
  const [, navigate] = useLocation();
  const { setIsLoggedIn } = useContext(UserContext);

  const logoutUser = async () => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    try {
      const response = await fetch(`/logout`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await response.text();
      setIsLoggedIn(false);
      navigate(`/`);
      return response.ok;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={logoutUser}
      className="flex w-min items-center gap-2 whitespace-nowrap rounded border border-white/20 p-3 hover:bg-slate-700 lg:w-full"
    >
      <FaSignOutAlt />
      <span className="hidden lg:block">Logout</span>
    </button>
  );
}

export default LogOutButton;
