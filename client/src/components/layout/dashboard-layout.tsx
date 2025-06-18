"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { DashboardMain } from "@/components/dashboard/dashboard-main"; // Import DashboardMain

export function DashboardLayout() {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden  md:flex-row bg-background ",
        "h-screen",
      )}
    >
      <DashboardMain />
    </div>
  );
}
