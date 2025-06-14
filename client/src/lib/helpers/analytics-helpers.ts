import { contestData } from "@/data/analytics-data";
import { HeatmapDataPoint } from "@/types/analytics";
import { Variants } from "motion";

export const generateHeatmapData = (days: number): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const today = new Date();
  const allContests = Object.values(contestData).flat();
  const contestMap = new Map(allContests.map((c) => [c.date, c]));

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split("T")[0];

    const contestOnDate = contestMap.get(dateString);
    let submissions = 0;
    let details;

    if (contestOnDate) {
      submissions = Math.floor(Math.random() * 4) + 4;
      details = {
        solved: Math.floor(Math.random() * 3) + 2,
        unsolved: contestOnDate.unsolved,
        rating: contestOnDate.rating,
        contest: contestOnDate.contest,
      };
    } else if (Math.random() > 0.4) {
      submissions = Math.floor(Math.random() * 5) + 1;
    }

    data.push({
      date: dateString,
      submissions,
      intensity:
        submissions === 0
          ? 0
          : submissions <= 2
            ? 1
            : submissions <= 4
              ? 2
              : submissions <= 6
                ? 3
                : 4,
      details,
    });
  }
  return data;
};

export const getIntensityColor = (intensity: number): string => {
  const colors = [
    "#ebedf0", // light grey for 0
    "#9be9a8", // light green
    "#40c463", // medium green
    "#30a14e", // dark green
    "#216e39", // very dark green
  ];
  return colors[intensity] || colors[0];
};

// --- ANIMATION VARIANTS ---
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
