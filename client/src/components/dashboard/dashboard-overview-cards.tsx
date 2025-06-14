// src/components/dashboard/dashboard-overview-cards.tsx
import React from "react";
import { dashboardCardsData } from "@/data/dashboard-data"; // Import data
import { DashboardCard } from "./dashboard-card"; // Import single card component

export const DashboardOverviewCards = () => {
  return (
    <div className="grid grid-cols-subgrid sm:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {dashboardCardsData.map((card, idx) => (
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
