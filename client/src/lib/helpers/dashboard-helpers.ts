// src/lib/helpers/dashboard-helpers.ts
import { Student } from "@/types"; // Import Student type

export const getRatingColor = (rating: number) => {
  if (rating >= 2100) return "text-red-600";
  if (rating >= 1900) return "text-orange-600";
  if (rating >= 1600) return "text-purple-600";
  if (rating >= 1400) return "text-blue-600";
  if (rating >= 1200) return "text-green-600";
  return "text-gray-600";
};

export const downloadCSV = (students: Student[]) => {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Codeforces Handle",
    "Current Rating",
    "Max Rating",
  ];
  const csvContent = [
    headers.join(","),
    ...students.map((student) =>
      [
        student.name,
        student.email,
        student.phone,
        student.codeforcesHandle,
        student.currentRating,
        student.maxRating,
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};
