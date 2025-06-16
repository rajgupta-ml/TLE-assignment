// src/components/dashboard/dashboard-overview-cards.tsx
import React from "react";
import { DashboardCard } from "./dashboard-card"; // Import single card component
import { useGetStudentAchivers } from "@/hooks/useStudents";

export const DashboardOverviewCards = () => {
  const { data: response } = useGetStudentAchivers();
  const highestAchievers = response?.highestAchieversWithUserData;
  if (!highestAchievers) {
    // Add a toast
    return;
  }
  const dashboardCardData = highestAchievers.map((data) => {
    if (data.key == "bestImprovementUser") {
      return {
        name: data.userName,
        number: "+" + data.number.toString(),
        _id: data._id,
        color: "#FFECE7",
        title: "Fastest Improvement",
      };
    } else if (data.key == "highestConsistencyUser") {
      return {
        name: data.userName,
        number: data.number.toString() + " days",
        _id: data._id,
        color: "#F6F4FF",
        title: "Most Consitent",
      };
    } else {
      return {
        name: data.userName,
        number: data.number.toString(),
        _id: data._id,
        color: "#EDF6FF",
        title: "Highest Ranking",
      };
    }
  });

  console.log(dashboardCardData);

  return (
    <div className="grid grid-cols-subgrid sm:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {dashboardCardData.map((card, idx) => (
        <DashboardCard
          key={idx}
          color={card.color}
          title={card.title}
          number={card.number}
          name={card.name}
        />
      ))}
    </div>
  );
};
