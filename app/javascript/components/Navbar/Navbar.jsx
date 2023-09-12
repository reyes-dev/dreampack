import React, { useContext } from "react";
import NavbarLink from "./NavbarLink";
import NavbarDeviseLink from "./NavbarDeviseLink";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <nav className="flex h-fit items-center justify-end gap-8 p-4 xl:p-8">
      {isLoggedIn ? (
        <NavbarLink
          destination="/"
          content="About"
          bgColor="bg-green-900/20"
          bgColorHover="hover:bg-green-900"
        />
      ) : (
        <section className="flex items-center gap-4">
          <NavbarDeviseLink
            destination="/login"
            content="Log In"
            bgColor="bg-blue-900/20"
            bgColorHover="hover:bg-blue-900"
          />
          <p>or</p>
          <NavbarDeviseLink
            destination="/registration/sign_up"
            content="Sign Up"
            bgColor="bg-purple-900/20"
            bgColorHover="hover:bg-purple-900"
          />
        </section>
      )}
    </nav>
  );
}

export default Navbar;
