import React from "react";
import { useQuery } from "@tanstack/react-query";
import NewDreamGoal from "components/DreamGoals/NewDreamGoal/NewDreamGoal";
import EditDreamGoal from "components/DreamGoals/EditDreamGoals/EditDreamGoal";
import CompleteDreamGoal from "components/DreamGoals/EditDreamGoals/CompleteDreamGoal";

interface DreamGoalInterface {
  id: number;
  goal: string;
}

export default function DreamGoalsIndex() {
  const fetchDreamGoals = async () => {
    try {
      const response = await fetch(`/api/dream_goals`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
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
    <section className="flex w-full flex-col gap-4 border p-8">
      <h1 className="text-center">Dream Goals</h1>
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
    </section>
  );
}
