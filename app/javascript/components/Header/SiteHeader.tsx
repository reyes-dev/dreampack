import React, { useContext } from "react";
import NavbarLink from "components/Header/NavbarLink";
import NavbarDeviseLink from "components/Header/NavbarDeviseLink";
import { UserContext } from "context/UserContext";

function SiteHeader() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className="col-span-2 col-end-auto row-start-1 row-end-auto flex h-fit w-full items-center justify-between gap-8 p-4 xl:p-8">
      <div className="flex items-center">
        <img
          className="h-28 w-28"
          src="https://raw.githubusercontent.com/reyes-dev/dreampack-pictures/main/logo.png"
          alt="logo"
        />
        <h1 className="text-3xl">Dreampack</h1>
      </div>
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
    </header>
  );
}

export default SiteHeader;
