import React from "react";

function ErrorModal({ content }) {
  return (
    <section className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 p-8  shadow-xl">
      {content}
    </section>
  );
}

export default ErrorModal;
