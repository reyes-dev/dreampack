import React from "react";
import { Link } from "wouter";  

function Navbar() {
    return (
        <nav className='self-start h-full w-[20%] bg-gray-900'>
            <Link href="/entrys/index" className="text-white">All Journal Entries</Link>
        </nav>
    );
};

export default Navbar;
