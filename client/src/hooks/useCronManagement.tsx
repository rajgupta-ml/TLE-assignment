import { CronJob } from "@/components/setting/setting-page";
import {
  useCreateCron,
  useDeleteCron,
  useGetCronData,
  useUpdateCron,
} from "./useCron";
import { useState } from "react";
import { useGetEmailTemplateData } from "./useEmailtemplate";

export const useCronManagement = () => {
  const { data: cronJobsData, isLoading, isError } = useGetCronData();
  const { data: emailTemplates } = useGetEmailTemplateData();
  const cronJobs: CronJob[] = cronJobsData?.data || [];

  const { mutate: createCronMutate } = useCreateCron();
  const { mutate: updateCronMutate } = useUpdateCron();
  const { mutate: deleteCronMutate } = useDeleteCron();

  const [usePreset, setUsePreset] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [cronBuilder, setCronBuilder] = useState({
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
    createCronMutate({
      emailTemplateId: cronBuilder.emailTemplateId,
      cronSchedule: schedule,
      name: cronBuilder.name,
    });

    // Reset form fields
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

  const toggleCronJob = (id: string, currentIsActive: boolean) => {
    console.log(currentIsActive);
    // Use updateCronMutate to update isActive status
    updateCronMutate({ id, isActive: !currentIsActive });
  };

  const deleteCronJob = (id: string) => {
    // Use deleteCronMutate to delete the cron job
    deleteCronMutate(id);
  };

  const getTemplateName = (templateId: string) => {
    if (!emailTemplates) {
      return;
    }
    const template = emailTemplates.find((t) => t._id === templateId);
    return template ? template.name : `Template ${templateId}`;
  };

  const formatNextRun = (date?: Date) => {
    if (!date) return "Not scheduled";
    return date.toLocaleString();
  };

  return {
    cronJobs,
    emailTemplates, // Return the fetched cron jobs
    isLoading,
    isError,
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
