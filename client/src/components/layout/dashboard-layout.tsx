"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { DashboardMain } from "@/components/dashboard/dashboard-main"; // Import DashboardMain

export function DashboardLayout() {
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen",
      )}
    >
      <DashboardMain />
    </div>
  );
}
