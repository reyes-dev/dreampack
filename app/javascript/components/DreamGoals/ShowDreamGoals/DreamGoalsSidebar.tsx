import React from "react";
import { useQuery } from "@tanstack/react-query";
import NewDreamGoal from "components/DreamGoals/NewDreamGoal/NewDreamGoal";
import EditDreamGoal from "components/DreamGoals/EditDreamGoals/EditDreamGoal";
import CompleteDreamGoal from "components/DreamGoals/EditDreamGoals/CompleteDreamGoal";

interface DreamGoalInterface {
  id: number;
  goal: string;
}

export default function DreamGoalsSidebar() {
  const fetchDreamGoals = async () => {
    try {
      const response = await fetch(`/api/sidebar_dream_goals`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchDreamGoals,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <section className="sticky top-5 z-[1]  col-start-3 hidden h-fit w-full sm:flex sm:flex-col sm:p-4">
      <h1 className="font-bold">Dream Goals</h1>
      <div className="flex flex-col gap-4 pt-4">
        <ul className="flex flex-col gap-4">
          {data.map((dreamGoal: DreamGoalInterface) => {
            return (
              <li className="flex items-center gap-2" key={dreamGoal.id}>
                <CompleteDreamGoal id={dreamGoal.id} />
                <EditDreamGoal dreamGoal={dreamGoal} />
              </li>
            );
          })}
        </ul>
        <NewDreamGoal />
      </div>
    </section>
  );
}
