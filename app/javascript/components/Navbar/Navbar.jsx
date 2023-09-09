import React, { useContext } from "react";
import NavbarLink from "./NavbarLink";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <nav className="flex h-fit items-center justify-end gap-8 p-4 xl:p-8">
      <NavbarLink
        destination="/"
        content="About"
        bgColor="bg-green-900/20"
        bgColorHover="hover:bg-green-900"
      />
      {isLoggedIn ? null : (
        <a
          href="/login"
          className="hover:.!text-[#09073a] hover:.bg-white hover:.outline-white 
    .outline hover:.outline-offset-4 active:.outline-offset-2 flex w-fit 
    min-w-max basis-1  items-center justify-center 
     gap-2 rounded-full bg-blue-900/20 p-2 px-5 text-center text-sm  
    font-bold text-yellow-50 outline-[#09073a]/50 backdrop-blur-sm 
    transition-all hover:bg-blue-900 hover:bg-opacity-100 active:bg-opacity-90 
    md:text-base"
        >
          Log In
        </a>
      )}
    </nav>
  );
}

export default Navbar;
