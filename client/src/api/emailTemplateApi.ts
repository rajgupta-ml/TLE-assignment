import axios from "axios";
import { BASE_URL } from "./constant";

export interface IEmailTemplate {
  _id: string;
  name: string;
  body: string;
  subject: string;
}

const EMAIL_TEMPLATE_URL = `${BASE_URL}/template`;
export const QUERIES = {
  getEmailTemplates: async (): Promise<IEmailTemplate[]> => {
    return (await axios.get(`${EMAIL_TEMPLATE_URL}/all`)).data.data;
  },
};

export const MUTATIONS = {
  createEmailTemplates: async ({
    name,
    body,
    subject,
  }: {
    name: string;
    body: string;
    subject: string;
  }) => {
    return await axios.post(EMAIL_TEMPLATE_URL, { name, body, subject });
  },

  deleteEmailTemplates: async (id: string) => {
    return await axios.delete(`${EMAIL_TEMPLATE_URL}/${id}`);
  },

  editEmailTemplates: async ({
    id,
    name,
    body,
    subject,
  }: {
    id: string;
    name?: string;
    body?: string;
    subject?: string;
  }) => {
    if (!name || !body || !subject) {
      return;
    }
    return await axios.put(`${EMAIL_TEMPLATE_URL}/${id}`, {
      name,
      body,
      subject,
    });
  },
};
