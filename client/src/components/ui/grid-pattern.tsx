// components/ui/grid-pattern.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GridPattern({
  className,
  children,
  ...props
}: GridPatternProps) {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          className,
        )}
        {...props}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "bg-white dark:bg-black",
          "[mask-image:linear-gradient(to_left,transparent_0%,transparent_80%,black_100%)]",
          "-webkit-mask-image:linear-gradient(to_left,transparent_50%,transparent_20%,black_100%)",
        )}
      ></div>
      {children && <div className="relative z-[1]">{children}</div>}
      assas
    </>
  );
}
