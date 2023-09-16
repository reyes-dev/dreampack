import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IconContext } from "react-icons";

function Homepage() {
  return (
    <section className="lex max-w-5xl flex-col gap-8 overflow-auto px-[min(7.8vw,6.25rem)]">
      <article className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="relative flex text-3xl leading-none text-white">
            <IconContext.Provider
              value={{
                className: "right-full md:absolute mr-2 text-teal-500",
              }}
            >
              <HiOutlineInformationCircle />
            </IconContext.Provider>
            About
          </h1>
        </div>
        <p className="text-lg text-gray-200">
          Dreampack is a dream journaling app that is intended to aid serious
          lucid dreamers and hobbyist dream explorers alike in achieving their
          dream goals. Every night we enter the wilderness of our dreams without
          suitable preparation, and as a result, we squander the true potential
          latent within our nightly foray into the imagination. Think of
          Dreampack like your bag of magic tools that allows you to thrive in
          the wilderness you used to be lost in.
        </p>
        <p className="text-lg">
          If you're still lost and don't know what a
          <a
            href="https://en.wikipedia.org/wiki/Dream_diary"
            className="text-[#52e3ac]"
            target="_blank"
          >
            {" "}
            dream diary{" "}
          </a>{" "}
          or
          <a
            href="https://en.wikipedia.org/wiki/Lucid_dream"
            className="text-[#52e3ac]"
            target="_blank"
          >
            {" "}
            lucid dreaming{" "}
          </a>
          is, read up on those wikipedia articles!
        </p>

        <h1 className="text-3xl">Features</h1>
        <ul className="list-disc">
          <li>Write journal entries</li>
          <li>Track dream signs</li>
          <li>Interpret your dream with AI</li>
          <li>Generate images for your entries</li>
          <li>Record journal entries with audio transcription</li>
        </ul>
      </article>
    </section>
  );
}

export default Homepage;
