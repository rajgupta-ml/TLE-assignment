import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
} from "@tabler/icons-react";
import { User } from "lucide-react";
import { ICard, Student } from "@/types"; // Import types

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "#",
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

export const dashboardCardsData: ICard[] = [
  {
    color: "#EDF6FF",
    title: "Highest Ranking",
    number: "2100",
    name: "Priyansh Agarwal",
  },
  {
    color: "#F6F4FF",
    title: "Most Consitent",
    number: "7 Days",
    name: "Harikart Singh",
  },
  {
    color: "#FFECE7",
    title: "Fastest Improvement",
    number: "+350",
    name: "Aarav Mehta",
  },
];

export const studentsData: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 234 567 8901",
    codeforcesHandle: "alice_codes",
    currentRating: 1547,
    maxRating: 1623,
    progress: { contests: 45, problems: 234, rank: "Expert" },
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 234 567 8902",
    codeforcesHandle: "bob_solver",
    currentRating: 1234,
    maxRating: 1456,
    progress: { contests: 32, problems: 187, rank: "Specialist" },
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 234 567 8903",
    codeforcesHandle: "carol_dev",
    currentRating: 1789,
    maxRating: 1834,
    progress: { contests: 67, problems: 345, rank: "Candidate Master" },
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 234 567 8904",
    codeforcesHandle: "david_algo",
    currentRating: 987,
    maxRating: 1123,
    progress: { contests: 23, problems: 145, rank: "Pupil" },
  },
  {
    id: "5",
    name: "Eva Brown",
    email: "eva.brown@email.com",
    phone: "+1 234 567 8905",
    codeforcesHandle: "eva_competitive",
    currentRating: 2134,
    maxRating: 2234,
    progress: { contests: 89, problems: 567, rank: "Master" },
  },
];
