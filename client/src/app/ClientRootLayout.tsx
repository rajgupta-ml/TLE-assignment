"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Logo, LogoIcon } from "@/components/logo/logo";
import { adminLink, sidebarLinks } from "@/data/dashboard-data";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeSwitcher from "./ThemeSwitcher";
import { Provider } from "./provider/provider";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider>
      <div className="flex h-screen">
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
              <ThemeSwitcher />
              <SidebarLink link={adminLink} />
            </div>
          </SidebarBody>
        </Sidebar>
        <QueryClientProvider client={queryClient}>
          <main className="flex-1">{children}</main>
        </QueryClientProvider>
      </div>
    </Provider>
  );
}
