export interface ICard {
  color: string;
  name: string;
  number: string;
  title: string;
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
  email: string;
  phone_number: string;
  codeforceHandle: string;
  createdAt: Date;
  updateAt: Date;
  userMetrics: StudentMetrics;
}
