interface IAchieverData {
  key: "highestRatingUser" | "bestImprovementUser" | "highestConsistencyUser";
  userName: string;
  _id: string;
  number: number;
}

interface StudentMetrics {
  currentRating: number;
  maxRating: number;
  consistency: number;
  highestImporovement: number;
  inActive: boolean;
  status: string;
}
export interface Student {
  _id: string;
  name: string;
  numberOfEmailSent?: number;
  isSendEmailActive?: boolean;
  email: string;
  phone_number: string;
  codeforceHandle: string;
  createdAt: Date;
  updateAt: Date;
  userMetrics: StudentMetrics;
}
