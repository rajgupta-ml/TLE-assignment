import { CronJob, EmailTemplate } from "@/components/setting/setting-page";
import { useState } from "react";

interface CronBuilder {
  name: string;
  second: string;
  minute: string;
  hour: string;
  day: string;
  month: string;
  year: string;
  emailTemplateId: string;
}

export const useCronManagement = (
  cronJobs: CronJob[],
  setCronJobs: React.Dispatch<React.SetStateAction<CronJob[]>>,
  emailTemplates: EmailTemplate[],
) => {
  const [usePreset, setUsePreset] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [cronBuilder, setCronBuilder] = useState<CronBuilder>({
    name: "",
    second: "0",
    minute: "0",
    hour: "0",
    day: "*",
    month: "*",
    year: "*",
    emailTemplateId: "",
  });
  const timeOptions = Array.from({ length: 60 }, (_, i) => i.toString());
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());
  const dayOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const generateCronExpression = () => {
    if (usePreset && selectedPreset) {
      return selectedPreset;
    }
    return `${cronBuilder.second} ${cronBuilder.minute} ${cronBuilder.hour} ${cronBuilder.day} ${cronBuilder.month} ${cronBuilder.year}`;
  };

  const addCronJob = () => {
    if (!cronBuilder.name || !cronBuilder.emailTemplateId) return;

    const schedule = generateCronExpression();
    const newJob: CronJob = {
      id: Date.now().toString(),
      name: cronBuilder.name,
      cronSchedule: schedule,
      emailTemplateId: cronBuilder.emailTemplateId,
      isActive: false,
    };

    setCronJobs([...cronJobs, newJob]);
    setCronBuilder({
      name: "",
      second: "0",
      minute: "0",
      hour: "0",
      day: "*",
      month: "*",
      year: "*",
      emailTemplateId: "",
    });
    setSelectedPreset("");
    setUsePreset(false);
  };

  const toggleCronJob = (id: string) => {
    setCronJobs(
      cronJobs.map((job) =>
        job.id === id ? { ...job, isActive: !job.isActive } : job,
      ),
    );
  };

  const deleteCronJob = (id: string) => {
    setCronJobs(cronJobs.filter((job) => job.id !== id));
  };

  const getTemplateName = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    return template ? template.name : `Template ${templateId}`;
  };

  const formatNextRun = (date?: Date) => {
    if (!date) return "Not scheduled";
    return date.toLocaleString();
  };

  return {
    timeOptions,
    hourOptions,
    dayOptions,
    monthOptions,

    usePreset,
    setUsePreset,
    selectedPreset,
    setSelectedPreset,

    setCronBuilder,
    cronBuilder,

    generateCronExpression,
    addCronJob,
    toggleCronJob,
    deleteCronJob,
    getTemplateName,
    formatNextRun,
  };
};
