export interface ICard {
  color: string;
  name: string;
  number: string;
  title: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  codeforcesHandle: string;
  currentRating: number;
  maxRating: number;
  progress: {
    contests: number;
    problems: number;
    rank: string;
  };
}
