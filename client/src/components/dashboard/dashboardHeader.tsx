import { Calendar1Icon, Download, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { downloadCSV } from "@/lib/helpers/dashboard-helpers";

export const DashboardHeader = ({ onClose }: { onClose: () => void }) => {
  const dateStr = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
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
            // onClick={() => downloadCSV(studentsData)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </Button>

          <Button
            onClick={onClose}
            className="flex items-center gap-2 bg-[oklch(0.969_0.0154_247.99)] hover:bg-[oklch(0.949_0.0154_247.99)] text-gray-900 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>
    </>
  );
};
