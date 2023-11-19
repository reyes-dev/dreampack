import React from "react";
import { Link } from "wouter";

interface NavbarLinkProps {
  destination: string;
  content: string;
  bgColor: string;
  bgColorHover: string;
}

function NavbarLink({ destination, content, bgColorHover }: NavbarLinkProps) {
  return (
    <Link
      href={destination}
      className={`hover:.!text-[#09073a] hover:.bg-white hover:.outline-white .outline 
    hover:.outline-offset-4 active:.outline-offset-2 flex h-min w-fit min-w-max 
    basis-1 items-center  justify-center gap-2 
     rounded border  p-2 px-5 text-center   
    font-bold text-yellow-50 outline-[#09073a]/50 backdrop-blur-sm 
    transition-all ${bgColorHover} hover:bg-opacity-100 active:bg-opacity-90 
    `}
    >
      {content}
    </Link>
  );
}

export default NavbarLink;
