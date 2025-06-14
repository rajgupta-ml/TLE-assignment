// src/components/dashboard/dashboard-main.tsx
"use client";
import React, { useState } from "react";
import { Calendar1Icon, Search, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardOverviewCards } from "./dashboard-overview-cards";
import { StudentsDataTable } from "./student-data-table";
import { downloadCSV } from "@/lib/helpers/dashboard-helpers";
import { studentsData } from "@/data/dashboard-data";
import { Student } from "@/types";
import AddStudentPopup from "./add-student-popup";

type AddStudent = Omit<Student, "currentRating" | "maxRating" | "progress">;
export const DashboardMain = () => {
  const dateStr = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [students, setStudents] = useState<AddStudent[]>(studentsData);
  const [open, setOpen] = useState(false);

  const handleAddStudent = (student: {
    name: string;
    email: string;
    phone: string;
    codeforcesHandle: string;
  }) => {
    const newStudent: AddStudent = {
      id: String(students.length + 1),
      ...student,
    };
    setStudents([...students, newStudent]);
  };

  return (
    <div className="flex flex-1 max-w-[3840px] mx-auto">
      <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center text-2xl">
            <Calendar1Icon className="h-6 w-6 shrink-0 text-neutral-900 dark:text-neutral-200"></Calendar1Icon>
            <span className="font-medium text-center">{dateStr}</span>
          </div>
          <div className="flex gap-2 items-center border-2 border-neutral-200 px-2 py-0.5 rounded-4xl">
            <input
              type="text"
              className="outline-none text-sm"
              placeholder="Search Student"
            />
            <Search className="bg-neutral-200 p-0.5 rounded-4xl text-gray-400"></Search>
          </div>
        </div>
        <div className="flex items-center gap-6 py-8">
          <h1 className="text-6xl font-bold">Dashboard</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => downloadCSV(studentsData)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
            <AddStudentPopup
              onAddStudent={handleAddStudent}
              open={open}
              setOpen={setOpen}
            />
            <Button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-[oklch(0.969_0.0154_247.99)] hover:bg-[oklch(0.949_0.0154_247.99)] text-gray-900 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </div>
        </div>
        <DashboardOverviewCards /> {/* Render the card section */}
        <div className="flex flex-1 gap-2">
          <StudentsDataTable /> {/* Render the students table section */}
        </div>
      </div>
    </div>
  );
};
