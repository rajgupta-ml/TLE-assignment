import React, { useState, useMemo, FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Target, BarChart3, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  ProblemStats,
  HeatmapDataPoint,
  TooltipInfo,
  ContestEntry,
} from "@/types/analytics";
import {
  generateHeatmapData,
  getIntensityColor,
} from "@/lib/helpers/analytics-helpers";
import { AnimatedCard } from "./AnimatedComponetns";

// Child Component for the Heatmap
const Heatmap: FC<{
  contestData: ContestEntry[];
  onMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    day: HeatmapDataPoint,
  ) => void;
  onMouseLeave: () => void;
}> = ({ onMouseOver, onMouseLeave, contestData }) => {
  const heatmapGridCells = useMemo(() => {
    const data = generateHeatmapData(365, contestData);
    const firstDate = new Date(data[0].date);
    const dayOfWeek = firstDate.getDay();
    const cells: (HeatmapDataPoint | null)[] = Array.from(
      { length: dayOfWeek },
      () => null,
    );
    cells.push(...data);
    return cells;
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-flow-col grid-rows-14 gap-1">
        {heatmapGridCells.map((day, index) => {
          if (!day) {
            return (
              <div
                key={`empty-${index}`}
                className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded-sm"
              />
            );
          }
          return (
            <div
              key={day.date}
              className="relative w-4 h-4 rounded-sm transition-transform duration-150 ease-in-out hover:scale-125 hover:z-10 cursor-pointer"
              style={{ backgroundColor: getIntensityColor(day.intensity) }}
              onMouseOver={(e) => onMouseOver(e, day)}
              onMouseLeave={onMouseLeave}
            />
          );
        })}
      </div>
      <div className="flex self-end items-center mt-4 space-x-2 text-xs text-gray-500">
        <span>Less</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getIntensityColor(i) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

interface ProblemSolvingTabProps {
  contestData: ContestEntry[];
  data: ProblemStats;
  setTooltip: React.Dispatch<React.SetStateAction<TooltipInfo>>;
}

export const ProblemSolvingTab: FC<ProblemSolvingTabProps> = ({
  contestData,
  data,
  setTooltip,
}) => {
  const statCards = [
    {
      icon: Target,
      iconColor: "text-red-500",
      label: "Most Difficult",
      value: data.mostDifficult.rating,
      subtitle: data.mostDifficult.name,
    },
    {
      icon: BarChart3,
      label: "Total Solved",
      value: data.totalSolved,
      iconColor: "text-blue-500",
    },
    {
      icon: TrendingUp,
      label: "Average Rating",
      value: data.averageRating.toFixed(0),
      iconColor: "text-green-500",
    },
    {
      icon: Activity,
      label: "Avg/Day",
      value: data.averagePerDay.toFixed(2),
      iconColor: "text-purple-500",
    },
  ];

  const handleMouseOver = (
    event: React.MouseEvent<HTMLDivElement>,
    day: HeatmapDataPoint,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({ content: day, x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseLeave = () => setTooltip(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <AnimatedCard key={stat.label} delay={100 * (i + 1)}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-400 truncate w-24">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={500}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Problems by Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.ratingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis dataKey="range" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {data.ratingDistribution.map((entry) => (
                      <Cell key={entry.range} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </AnimatedCard>
        <AnimatedCard delay={600}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity /> Submission Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Heatmap
                contestData={contestData}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
              />
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
};
