import React from "react";
import { Link } from "wouter";

function Navbar() {
  return (
    <nav className="flex h-full w-[15%] flex-col gap-2 self-start bg-gray-900 p-8 underline-offset-4">
      <Link href="/entries" className="text-white hover:underline">
        All Journal Entries
      </Link>
      <Link href="/" className="text-white hover:underline">
        New Entry
      </Link>
      <Link href="/settings" className="text-white hover:underline">
        Settings
      </Link>
    </nav>
  );
}

export default Navbar;
