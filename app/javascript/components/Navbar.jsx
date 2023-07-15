import React from "react";
import { Link } from "wouter";  

function Navbar() {
    return (
        <nav className='flex flex-col self-start h-full w-[15%] p-8 gap-2 bg-gray-900 underline-offset-4'>
            <Link href="/entrys/index" className="text-white hover:underline">All Journal Entries</Link>
            <Link href="/" className="text-white hover:underline">New Entry</Link>
            <Link href="/settings" className="text-white hover:underline">Settings</Link>
        </nav>
    );
};

export default Navbar;
