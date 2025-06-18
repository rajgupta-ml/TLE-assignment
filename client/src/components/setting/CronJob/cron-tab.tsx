import React from "react";
import { TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

import { useCronManagement } from "@/hooks/useCronManagement";
import CronJobBuilder from "./CronJobBuilder";
import CronJobList from "./CronJobList";
import { Clock, Mail } from "lucide-react";

const CronTabContent = () => {
  const {
    cronJobs,
    cronBuilder,
    addCronJob,
    deleteCronJob,
    setCronBuilder,
    usePreset,
    setSelectedPreset,
    selectedPreset,
    setUsePreset,
    timeOptions,
    hourOptions,
    dayOptions,
    monthOptions,
    generateCronExpression,
    formatNextRun,
    toggleCronJob,
    getTemplateName,
    emailTemplates,
  } = useCronManagement();

  return (
    <>
      <TabsList className="grid w-full grid-cols-2 mx-6 mt-6">
        <TabsTrigger value="cron-jobs" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Cron Jobs ({cronJobs.length})
        </TabsTrigger>
        <TabsTrigger
          value="email-templates"
          className="flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Email Templates (
          {emailTemplates && emailTemplates.length ? emailTemplates.length : 0})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cron-jobs" className="flex-1 overflow-hidden px-6">
        <div className="h-full grid grid-cols-1 xl:grid-cols-3 gap-6">
          <CronJobBuilder
            cronBuilder={cronBuilder}
            setCronBuilder={setCronBuilder}
            emailTemplates={emailTemplates}
            addCronJob={addCronJob}
            usePreset={usePreset}
            setSelectedPreset={setSelectedPreset}
            selectedPreset={selectedPreset}
            setUsePreset={setUsePreset}
            timeOptions={timeOptions}
            hourOptions={hourOptions}
            dayOptions={dayOptions}
            monthOptions={monthOptions}
            generateCronExpression={generateCronExpression}
          />
          <CronJobList
            cronJobs={cronJobs}
            toggleCronJob={toggleCronJob}
            deleteCronJob={deleteCronJob}
            getTemplateName={getTemplateName}
            formatNextRun={formatNextRun}
          />
        </div>
      </TabsContent>
    </>
  );
};

export default CronTabContent;
