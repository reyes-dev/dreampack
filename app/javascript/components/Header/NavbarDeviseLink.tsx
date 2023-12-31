import React from "react";

interface NavbarDeviseLinkProps {
  destination: string;
  content: string;
  bgColor: string;
  bgColorHover: string;
}

function NavbarDeviseLink({
  destination,
  content,
  bgColor,
  bgColorHover,
}: NavbarDeviseLinkProps) {
  return (
    <a
      href={destination}
      className={`hover:.!text-[#09073a] hover:.bg-white hover:.outline-white 
    .outline hover:.outline-offset-4 active:.outline-offset-2 flex w-fit 
    min-w-max basis-1  items-center justify-center 
     gap-2 rounded ${bgColor} p-2 px-5 text-center  
    font-bold text-yellow-50 outline-[#09073a]/50 backdrop-blur-sm 
    transition-all ${bgColorHover} hover:bg-opacity-100 active:bg-opacity-90 
    `}
    >
      {content}
    </a>
  );
}

export default NavbarDeviseLink;
