import {
  Calendar1Icon,
  Circle,
  Download,
  LayoutDashboardIcon,
  Plus,
  Search,
} from "lucide-react";
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
      <div className="flex items-center gap-6  border-b border-border p-5 ">
        <div className="flex gap-2">
          <LayoutDashboardIcon className="w-6 aspect-square tracking-tight"></LayoutDashboardIcon>
          <h1 className="font-bold">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            className="flex items-center gap-2 bg-primary text-primary-foreground cursor-pointer"
          >
            <Plus className="size-4" />
            Add Student
          </Button>
        </div>
      </div>
    </>
  );
};
