import React from "react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ICard } from "@/types"; // Import type

export const DashboardCard = ({ color, name, title, number }: ICard) => {
  const bgColorClass =
    {
      "#EDF6FF": "bg-[var(--acet-blue)]",
      "#F6F4FF": "bg-[var(--acet-purple)]",
      "#FFECE7": "bg-[var(--acet-orange)]",
    }[color] || "bg-white";

  const textColorClass =
    {
      "#EDF6FF": "text-[var(--text-acet-blue)]",
      "#F6F4FF": "text-[var(--text-acet-purple)]",
      "#FFECE7": "text-[var(--text-acet-orange)]",
    }[color] || "bg-black";

  return (
    <div>
      <div
        className={`relative rounded-lg p-10 h-50 flex flex-col gap-4 ${bgColorClass}`}
      >
        <GridPattern className="opacity-45" /> {/* Using your modular grid */}
        <div className="relative z-10 flex flex-col gap-4 justify-center">
          <div
            className={`font-bold ${textColorClass} text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl`}
          >
            {title}
          </div>
          <div className="flex gap-8 items-center">
            <span className="text-wrap text-md sm:text-2xl md:text-3xl lg:text-4xl  xl:text-5xl font-bold">
              {number}
            </span>
            <span className="font-extrabold text-3xl">|</span>
            <span>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
