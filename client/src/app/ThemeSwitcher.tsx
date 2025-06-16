import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { open, animate } = useSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme === "light") {
      console.log("dark");
      setTheme("dark");
    } else {
      console.log("light");

      setTheme("light");
    }
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={handleTheme}
    >
      <div className="relative">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre inline-block !p-0 !m-0"
      >
        Toggle theme
      </motion.span>
    </div>
  );
};

export default ThemeSwitcher;
