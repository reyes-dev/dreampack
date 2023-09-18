import React from "react";
import { Link } from "wouter";

function NavbarLink({ destination, content, bgColor, bgColorHover }) {
  return (
    <Link
      href={destination}
      className={`hover:.!text-[#09073a] hover:.bg-white hover:.outline-white 
    .outline hover:.outline-offset-4 active:.outline-offset-2 flex w-fit 
    min-w-max basis-1  items-center justify-center 
     gap-2 rounded ${bgColor} p-2 px-5 text-center text-sm  
    font-bold text-yellow-50 outline-[#09073a]/50 backdrop-blur-sm 
    transition-all ${bgColorHover} hover:bg-opacity-100 active:bg-opacity-90 
    md:text-base`}
    >
      {content}
    </Link>
  );
}

export default NavbarLink;
