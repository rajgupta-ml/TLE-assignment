"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[var(--color-foreground)]">
        <DashboardLayout />
      </div>
    </QueryClientProvider>
  );
}
