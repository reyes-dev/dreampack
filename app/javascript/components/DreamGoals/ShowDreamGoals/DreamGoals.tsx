import React from "react";

export default function () {
  return (
    <section className="sticky top-5 z-[1] col-start-3 hidden sm:flex sm:flex-col sm:p-4">
      <h1 className="font-bold">Dream Goals</h1>
      <div className="flex flex-col gap-2 pt-4">
        <p>- Go to the moon</p>
        <p>- Climb mount everest</p>
        <p>- Wear a Halo Spartan suit</p>
      </div>
    </section>
  );
}
