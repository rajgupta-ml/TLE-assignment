// utils/excelGenerator.js
import { ApiResponseAnalytics } from "@/api/studentApi";
import * as XLSX from "xlsx";

export const generateExcel = (data: ApiResponseAnalytics) => {
  const wb = XLSX.utils.book_new(); // Create a new workbook

  // --- Sheet 1: User Metrics ---
  const userMetricsData = [
    ["Metric", "Value"], // Header row
    ["Current Rating", data.userMetrics.currentRating],
    ["Max Rating", data.userMetrics.maxRating],
    ["Consistency", data.userMetrics.consistency],
    ["Highest Improvement", data.userMetrics.highestImporovement],
    ["Inactive", data.userMetrics.inActive],
    ["Status", data.userMetrics.status],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(userMetricsData);
  XLSX.utils.book_append_sheet(wb, ws1, "User Metrics");

  // --- Sheet 2: Problem Metrics (365 days only, no colors) ---
  const problemMetrics365 = data.problemMetrics["365"]
    ? data.problemMetrics["365"][0]
    : null;
  const problemMetricsData = [
    [
      "Most Difficult Problem",
      "Most Difficult Rating",
      "Total Solved",
      "Average Rating",
      "Average Per Day",
    ], // Header row
  ];

  if (problemMetrics365) {
    problemMetricsData.push([
      problemMetrics365.mostDifficult.name,
      problemMetrics365.mostDifficult.rating.toString(),
      problemMetrics365.totalSolved.toString(),
      problemMetrics365.averageRating.toString(),
      problemMetrics365.averagePerDay.toString(),
    ]);

    problemMetricsData.push([]); // Empty row for separation
    problemMetricsData.push(["Rating Distribution:"]); // Sub-header
    problemMetricsData.push(["Range", "Count"]); // Rating distribution headers (no color)

    problemMetrics365.ratingDistribution.forEach((dist) => {
      problemMetricsData.push([dist.range, dist.count.toString()]);
    });
  } else {
    problemMetricsData.push(["No data available for 365 days."]);
  }

  const ws2 = XLSX.utils.aoa_to_sheet(problemMetricsData);
  XLSX.utils.book_append_sheet(wb, ws2, "Problem Metrics");

  // --- Sheet 3: Contest Metrics (365 days only) ---
  const contestMetrics365 = data.contestMetrics["365"];
  const contestMetricsData = [
    ["Contest ID", "Date", "Rating", "Contest", "Rank", "Unsolved"], // Header row
  ];

  if (contestMetrics365 && contestMetrics365.length > 0) {
    contestMetrics365.forEach((contest) => {
      contestMetricsData.push([
        (contest.contenstid || " ").toString(),
        contest.date || "",
        (contest.rating || " ").toString(),
        contest.contest || "",
        (contest.rank || " ").toString(),
        (contest.unsolved || " ").toString(),
      ]);
    });
  } else {
    contestMetricsData.push(["No data available for 365 days."]);
  }

  const ws3 = XLSX.utils.aoa_to_sheet(contestMetricsData);
  XLSX.utils.book_append_sheet(wb, ws3, "Contest Metrics");

  // --- Apply basic header styling (colors) ---
  // Note: Styling is more complex with SheetJS and often requires defining cell styles.
  // The below is a simplified example for setting header cells as "bold".
  // For actual colors, you'd need to dive into cell object properties (like `s` for style).
  // A simple way to highlight is by setting header cells to bold.
  // For more advanced styling, you might need to use a different approach or
  // leverage the full power of SheetJS's style objects, which can be verbose.

  // Example for bolding headers on all sheets:
  [ws1, ws2, ws3].forEach((ws) => {
    if (ws["!ref"]) {
      // Check if sheet has data
      const range = XLSX.utils.decode_range(ws["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: C });
        if (ws[cellAddress]) {
          // This is a basic way to add some property, for actual colors it's more complex.
          // For true colors, you often need to define cell styles which are then referenced.
          // This example will just make them bold as a simple "styling" demonstration.
          if (!ws[cellAddress].s) ws[cellAddress].s = {};
          ws[cellAddress].s.font = { bold: true };
          // If you really need colors, you'd define a style like:
          // ws[cellAddress].s.fill = { fgColor: { rgb: "FFFF0000" } }; // Red background
        }
      }
    }
  });

  return wb;
};
