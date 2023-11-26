import React from "react";

export default function Footer() {
  return (
    <footer className="container col-span-full mx-auto flex w-full justify-between gap-4 border-t p-4 text-white">
      <p>Dreampack</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/reyes-dev/dreampack"
          className="text-green hover:underline"
        >
          GitHub
        </a>
        <a href="/">Feedback</a>
      </div>
    </footer>
  );
}
