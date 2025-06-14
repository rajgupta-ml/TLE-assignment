// src/components/analytics/ContestHistoryTab.tsx
import type { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ContestEntry } from "@/types/analytics";
import { AnimatedCard } from "./AnimatedComponetns";

interface ContestHistoryTabProps {
  data: ContestEntry[];
}

export const ContestHistoryTab: FC<ContestHistoryTabProps> = ({ data }) => {
  const summaryStats = {
    total: data.length,
    peakRating: Math.max(0, ...data.map((c) => c.rating)),
    bestRank: Math.min(Infinity, ...data.map((c) => c.rank)),
    avgUnsolved: (
      data.reduce((acc, c) => acc + c.unsolved, 0) / (data.length || 1)
    ).toFixed(2),
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={100}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp /> Rating Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tickFormatter={(v) =>
                      new Date(v).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    domain={["dataMin - 50", "dataMax + 50"]}
                    fontSize={12}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </AnimatedCard>
        <AnimatedCard delay={200}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Contests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {data
                  .slice()
                  .reverse()
                  .map((contest) => (
                    <div
                      key={contest.date}
                      className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{contest.contest}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(contest.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200"
                        >
                          {contest.rating}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Rank: {contest.rank}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
        <AnimatedCard delay={300} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contest Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div key="total">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {summaryStats.total}
                  </p>
                  <p className="text-sm text-gray-500">Total Contests</p>
                </div>
                <div key="peak">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {summaryStats.peakRating}
                  </p>
                  <p className="text-sm text-gray-500">Peak Rating</p>
                </div>
                <div key="rank">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {summaryStats.bestRank}
                  </p>
                  <p className="text-sm text-gray-500">Best Rank</p>
                </div>
                <div key="unsolved">
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {summaryStats.avgUnsolved}
                  </p>
                  <p className="text-sm text-gray-500">Avg Unsolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </div>
  );
};
