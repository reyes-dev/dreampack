import React, { useContext } from "react";
import { useLocation } from "wouter";
import { FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "context/UserContext";

function LogOutButton() {
  const [, navigate] = useLocation();
  const { setIsLoggedIn } = useContext(UserContext);

  const logoutUser = async () => {
    const csrfTokenMetaElement = document.querySelector(
      'meta[name="csrf-token"]',
    ) as HTMLMetaElement;
    const csrfTokenMetaElementContent = csrfTokenMetaElement.content;
    try {
      const response = await fetch(`/logout`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfTokenMetaElementContent,
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
      className="flex w-min items-center gap-2 whitespace-nowrap rounded-xl p-3 hover:bg-slate-700 lg:w-full"
    >
      <FaSignOutAlt />
      <span className="hidden lg:block">Logout</span>
    </button>
  );
}

export default LogOutButton;
