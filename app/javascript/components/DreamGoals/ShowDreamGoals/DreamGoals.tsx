import React from "react";
import DreamGoalsIndex from "components/DreamGoals/ShowDreamGoals/DreamGoalsIndex";
import NewDreamGoal from "components/DreamGoals/NewDreamGoal/NewDreamGoal";

export default function () {
  return (
    <section className="sticky top-5 z-[1]  col-start-3 hidden h-fit w-full sm:flex sm:flex-col sm:p-4">
      <h1 className="font-bold">Dream Goals</h1>
      <div className="flex flex-col gap-4 pt-4">
        <DreamGoalsIndex />
        <NewDreamGoal />
      </div>
    </section>
  );
}
