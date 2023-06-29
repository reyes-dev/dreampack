import React from "react";
import { Link } from "wouter";  

function Navbar() {
    return (
        <nav className='flex flex-col self-start h-full w-[20%] bg-gray-900'>
            <Link href="/entrys/index" className="text-white">All Journal Entries</Link>
            <Link href="/" className="text-white">New Entry</Link>
        </nav>
    );
};

export default Navbar;
