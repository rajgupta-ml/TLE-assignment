import { ContestEntry, HeatmapDataPoint } from "@/types/analytics";
import { Variants } from "motion";

/**
 * Generates heatmap data points for a specified number of days,
 * incorporating contest activity and general random engagement.
 * The randomization is designed to be less consistently active.
 * @param days The number of days to generate data for (e.g., 365 for a year).
 * @param contestData An array of ContestEntry objects containing contest details.
 * @returns An array of HeatmapDataPoint objects, each representing a day's activity.
 */
export const generateHeatmapData = (
  days: number,
  contestData: ContestEntry[],
): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const today = new Date();
  // Flatten all contest entries assuming contestData might be an object of arrays
  // or a flat array. Then map them by date for efficient lookup.
  const allContests = Object.values(contestData).flat();
  const contestMap = new Map(allContests.map((c) => [c.date, c]));

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Format date as YYYY-MM-DD for consistency with contest data
    const dateString = date.toISOString().split("T")[0];

    const contestOnDate = contestMap.get(dateString);
    let submissions = 0;
    let details;

    // Introduce a random roll to determine if there's any activity on a given day.
    // This makes the heatmap less consistently active.
    const activityRoll = Math.random();

    if (contestOnDate) {
      // If there was a contest, there's a higher chance of activity and potentially more submissions.
      // 80% chance of activity on a contest day.
      if (activityRoll < 0.8) {
        submissions = Math.floor(Math.random() * 6) + 3; // Between 3 and 8 submissions for contest days
        details = {
          // Solved problems should be a subset of submissions, at least 1 if submissions > 0.
          solved:
            submissions > 0
              ? Math.floor(Math.random() * Math.min(submissions, 5)) + 1
              : 0,
          unsolved: contestOnDate.unsolved, // Data from the provided contest entry
          rating: contestOnDate.rating, // Data from the provided contest entry
          contest: contestOnDate.contest, // Data from the provided contest entry
        };
      }
    } else {
      // On non-contest days, activity is less likely and typically involves fewer submissions.
      // 25% chance of activity on a non-contest day.
      if (activityRoll < 0.25) {
        submissions = Math.floor(Math.random() * 3) + 1; // Between 1 and 3 submissions for non-contest days
      }
    }

    data.push({
      date: dateString,
      submissions,
      // Determine intensity based on the number of submissions.
      // This mapping might need adjustment if the new submission ranges significantly change.
      intensity:
        submissions === 0
          ? 0 // No activity
          : submissions <= 2
            ? 1 // Low activity
            : submissions <= 4
              ? 2 // Moderate activity
              : submissions <= 6
                ? 3 // High activity
                : 4, // Very high activity
      details,
    });
  }
  return data;
};

/**
 * Returns a color string based on the intensity level for the heatmap.
 * @param intensity The intensity level (0-4).
 * @returns A hex color string.
 */
export const getIntensityColor = (intensity: number): string => {
  const colors = [
    "#0002", // light grey for 0 submissions (no activity)
    "#9be9a8", // light green for low activity
    "#40c463", // medium green for moderate activity
    "#30a14e", // dark green for high activity
    "#216e39", // very dark green for very high activity
  ];
  // Ensure a valid color is always returned, defaulting to grey for unknown intensity.
  return colors[intensity] || colors[0];
};

/**
 * Animation variants for UI components, typically used with motion libraries (e.g., Framer Motion).
 * Defines states for hidden, visible, and exit animations.
 */
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
