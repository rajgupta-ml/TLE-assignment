import axios from "axios";
import { BASE_URL } from "./constant";

export interface ICron {
  _id: string;
  name: string;
  cronSchedule: string;
  isActive: boolean;
  emailTemplateId: string;
  createdAt: Date;
  updateAt: Date;
  lastRun?: Date;
  nextRun?: Date;
}

export interface GetApiResponse {
  success: boolean;
  data: ICron[];
  page: number;
  limit: number;
  total: number;
}

const CRON_URL = `${BASE_URL}/cron-job`;

export const QURIES = {
  getCron: async (): Promise<GetApiResponse> => {
    return (await axios.get(CRON_URL)).data;
  },
};

export const MUTATIONS = {
  createCron: async ({
    emailTemplateId,
    cronSchedule,
    name,
  }: {
    emailTemplateId: string;
    cronSchedule: string;
    name: string;
  }) => {
    return await axios.post(CRON_URL, {
      emailTemplateId,
      cronSchedule,
      name,
    });
  },

  editCron: async ({ id, isActive }: { id: string; isActive: boolean }) => {
    return await axios.put(`${CRON_URL}/${id}`, { isActive });
  },

  deleteCron: async (id: string) => {
    return await axios.delete(`${CRON_URL}/${id}`);
  },
};
