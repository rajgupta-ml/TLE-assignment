import React from "react";
import { Card, CardContent } from "../ui/card";
import { TrendingUp, Trophy } from "lucide-react";

export const DashboardCard = ({
  name,
  title,
  number,
}: {
  name: string;
  title: string;
  number: string | number;
}) => {
  return (
    <Card className="group relative w-full overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-background border-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-chart-1/5 to-chart-2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-chart-2/10 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <CardContent className="relative p-8">
        <div className="space-y-6">
          {/* Title with icon */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary shadow-lg">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>

          {/* Main content area */}
          <div className="flex items-center gap-6">
            {/* Large Number */}
            <div className="flex-shrink-0">
              <div className="text-5xl font-black text-primary drop-shadow-sm">
                {typeof number === "number" ? number.toLocaleString() : number}
              </div>
            </div>

            {/* Stylized Divider */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-chart-1 via-chart-2 to-chart-3" />
              <div className="w-2 h-2 rounded-full bg-primary shadow-lg" />
            </div>

            {/* Name/Category */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-chart-1" />
                <span className="text-lg font-medium text-foreground capitalize">
                  {name}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Category</div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-chart-1 to-chart-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardContent>

      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
    </Card>
  );
};
