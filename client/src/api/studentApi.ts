import { IAchieverData, Student, StudentMetrics } from "@/types";
import { ContestData, ProblemData } from "@/types/analytics";
import axios from "axios";

export interface ApiResponse {
  success: boolean;
  data: Student[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ApiResponseAnalytics {
  success: boolean;
  _id: string;
  userMetrics: StudentMetrics;
  problemMetrics: ProblemData;
  contestMetrics: ContestData;
}

export interface ApiResponseHighestAchivers {
  success: boolean;
  highestAchieversWithUserData: IAchieverData[];
}

export type OmiitedStudents = Omit<
  Student,
  "_id" | "createdAt" | "updateAt" | "userMetrics"
>;
const BASE_URL = `http://localhost:8080/v1/api/students`;
export const api = {
  getStudent: async (page: number, limit: number): Promise<ApiResponse> => {
    return (await axios.get(`${BASE_URL}?limit=${limit}&page=${page}`)).data;
  },

  getStudentAnalytics: async (id: string): Promise<ApiResponseAnalytics> => {
    return (await axios.get(`${BASE_URL}/${id}`)).data.data;
  },

  getHighestAchiever: async (): Promise<ApiResponseHighestAchivers> => {
    return (await axios.get(`${BASE_URL}/highest-achievers`)).data;
  },

  createStudent: async (student: OmiitedStudents) => {
    const respone = await axios.post(`${BASE_URL}`, student);
    return respone.data;
  },

  updateStudent: async ({
    id,
    student,
  }: {
    id: string;
    student: Partial<Student>;
  }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, student);
    return response.data;
  },

  deleteStudent: async (id: string) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
  getStudentDetailById: async (id: string) => {
    return (await axios.get(`${BASE_URL}/${id}`)).data;
  },
};
