import React from "react";
import NavbarLink from "./NavbarLink";

function Navbar() {
  return (
    <nav className="col-start-2 flex h-fit items-center justify-end gap-8 p-8">
      <NavbarLink
        destination="/"
        content="About"
        bgColor="bg-emerald-900/20"
        bgColorHover="hover:bg-emerald-900"
      />
      <NavbarLink
        destination="/sign_in"
        content="Sign In"
        bgColor="bg-rose-900/20"
        bgColorHover="hover:bg-rose-900"
      />
    </nav>
  );
}

export default Navbar;
