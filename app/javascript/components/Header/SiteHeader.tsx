import React from "react";
import NavbarLink from "components/Header/NavbarLink";
import NavbarDeviseLink from "components/Header/NavbarDeviseLink";

interface ISiteHeader {
  isLoggedIn: boolean;
}

function SiteHeader({ isLoggedIn }: ISiteHeader) {
  return (
    <header
      className={`${isLoggedIn ? "hidden sm:flex" : ""
        } sticky top-0 z-[1] col-span-full row-start-1 flex h-fit w-full items-center justify-between gap-8 border-b bg-[hsl(237.1,25.9%,15.9%)] pb-3 pl-4 pt-4 sm:static`}
    >
      <h1 className="text-xl">Dreampack</h1>
      {isLoggedIn ? (
        <section className="col-start-2 flex items-center gap-4 pr-4">
          <NavbarLink
            destination="/"
            content="About"
            bgColor="bg-green-900/20"
            bgColorHover="hover:bg-green-900"
          />
        </section>
      ) : (
        <section className="col-start-2 flex items-center gap-4 pr-4">
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
