import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import { Sun, User } from "lucide-react";

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

export const adminLink = {
  label: "Admin",
  href: "#",
  icon: (
    <User
      width={40}
      height={40}
      className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
    />
  ),
};

export const ThemeToggle = {
  label: "Toggle",
  href: "#",
  icon: (
    <Sun
      width={40}
      height={40}
      className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"
    />
  ),
};
