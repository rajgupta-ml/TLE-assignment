// src/components/layout/dashboard-layout.tsx
"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Logo, LogoIcon } from "@/components/logo/logo"; // Import from common
import { sidebarLinks, adminLink } from "@/data/dashboard-data"; // Import data
import { DashboardMain } from "@/components/dashboard/dashboard-main"; // Import DashboardMain

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink link={adminLink} />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardMain /> {/* Render the main dashboard content */}
    </div>
  );
}
