import { useState } from "react";
import type { JSX, FC } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CalendarDays, Target, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  TooltipInfo,
  ContestData,
  ProblemData,
  ContestEntry,
} from "@/types/analytics";

import { ContestHistoryTab } from "./ContestHistoryTab";
import { ProblemSolvingTab } from "./ProblemSolvingTab";
import { contestData, problemData } from "@/data/analytics-data";
import { useGetStudentAnalytics } from "@/hooks/useStudents";

interface CPAnalyticsModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedStudentId: string;
}

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const HeatmapTooltip: FC<{ tooltip: TooltipInfo }> = ({ tooltip }) => (
  <AnimatePresence>
    {tooltip && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: tooltip.y,
          left: tooltip.x,
          transform: "translate(-50%, -110%)",
          pointerEvents: "none",
          zIndex: 100,
        }}
        className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl text-sm w-max"
      >
        <p className="font-bold mb-2">
          {new Date(tooltip.content.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {tooltip.content.details ? (
          <>
            <p className="text-gray-800 dark:text-gray-200">
              <strong>Contest:</strong> {tooltip.content.details.contest}
            </p>
            <p className="text-green-600 dark:text-green-400">
              <strong>Solved:</strong> {tooltip.content.details.solved}
            </p>
            <p className="text-red-600 dark:text-red-400">
              <strong>Unsolved:</strong> {tooltip.content.details.unsolved}
            </p>
            <p className="text-blue-600 dark:text-blue-400">
              <strong>Rating:</strong> {tooltip.content.details.rating}
            </p>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            <strong>Submissions:</strong> {tooltip.content.submissions}
          </p>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function CPAnalyticsModal({
  isOpen,
  toggle,
  selectedStudentId,
}: CPAnalyticsModalProps): JSX.Element | null {
  const {
    data: studentAnalytics,
    isLoading,
    error,
  } = useGetStudentAnalytics(selectedStudentId);

  const [contestFilter, setContestFilter] = useState<keyof ContestData>("90");
  const [problemFilter, setProblemFilter] = useState<keyof ProblemData>("90");
  const [tooltip, setTooltip] = useState<TooltipInfo>(null);

  const currentContestData = studentAnalytics?.contestMetrics[contestFilter];
  const currentProblemData = studentAnalytics?.problemMetrics[problemFilter];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggle}
            aria-hidden="true"
          />
          <HeatmapTooltip tooltip={tooltip} />
          <motion.div
            className="relative w-[90%] md:w-[80%] h-[90%] max-w-7xl bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-xl overflow-hidden flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 md:p-6 border-b dark:border-gray-700 flex-shrink-0">
              <h1
                id="modal-title"
                className="text-xl md:text-3xl font-bold text-gray-900 dark:text-gray-100"
              >
                Competitive Programming Analytics
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggle}
                className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors rounded-full"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </Button>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Tabs defaultValue="contest-history" className="w-full">
                <TabsList className="cursor-pointer">
                  <TabsTrigger
                    value="contest-history"
                    className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    <CalendarDays className="h-4 w-4" /> Contest History
                  </TabsTrigger>
                  <TabsTrigger
                    value="problem-solving"
                    className="flex items-center gap-2 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded-md transition-all"
                  >
                    <Target className="h-4 w-4" /> Problem Solving
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="contest-history" className="mt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      Contest Performance
                    </h2>
                    <Select
                      value={contestFilter}
                      onValueChange={(v) =>
                        setContestFilter(v as keyof ContestData)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>

                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last 365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {currentContestData ? (
                    <ContestHistoryTab data={currentContestData} />
                  ) : (
                    <div>No Contest Data available</div>
                  )}
                </TabsContent>
                <TabsContent value="problem-solving" className="mt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      Problem Solving Analytics
                    </h2>
                    <Select
                      value={problemFilter}
                      onValueChange={(v) =>
                        setProblemFilter(v as keyof ProblemData)
                      }
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last 365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {currentProblemData && currentProblemData[0] ? (
                    <ProblemSolvingTab
                      data={currentProblemData[0]}
                      setTooltip={setTooltip}
                    />
                  ) : (
                    <div>No Problem Data available</div>
                  )}
                </TabsContent>
              </Tabs>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
