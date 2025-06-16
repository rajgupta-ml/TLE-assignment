export type ContestEntry = {
  contenstId: number;
  date: string;
  rating: number;
  contest: string;
  rank: number;
  unsolved: number;
};

export type ContestData = Record<string, ContestEntry[]>;

export type RatingDistributionEntry = {
  range: string;
  count: number;
  color: string;
};

export type ProblemStats = {
  mostDifficult: { name: string; rating: number };
  totalSolved: number;
  averageRating: number;
  averagePerDay: number;
  ratingDistribution: RatingDistributionEntry[];
};

export type ProblemData = Record<string, ProblemStats[]>;

export type HeatmapDataPoint = {
  date: string;
  submissions: number;
  intensity: number;
  details?: {
    solved: number;
    unsolved: number;
    rating: number;
    contest: string;
  };
};

export type TooltipInfo = {
  content: HeatmapDataPoint;
  x: number;
  y: number;
} | null;

export interface CPAnalyticsModalProps {
  isOpen: boolean;
  onClose: (arg: boolean) => void;
}

export interface AnimatedComponentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  delay?: number;
}
