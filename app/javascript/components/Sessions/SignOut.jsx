import React from "react";
import { useLocation } from "wouter";
import { FaSignOutAlt } from "react-icons/fa";

function SignOut() {
  const [location, setLocation] = useLocation();

  const logoutUser = async () => {
    try {
      const response = await fetch(`/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("logoutUser is being called.");
      window.localStorage.removeItem("token");
      const data = await response.json();
      setLocation(`/`);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button
      onClick={logoutUser}
      className="flex w-min items-center gap-2 whitespace-nowrap rounded border border-white/20 p-3 hover:bg-slate-700 lg:w-full"
    >
      <FaSignOutAlt />
      <span className="hidden lg:block lg:text-sm 2xl:text-lg">Logout</span>
    </button>
  );
}

export default SignOut;
