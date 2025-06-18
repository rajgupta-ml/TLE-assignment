import React from "react";
import { TabsContent } from "../../ui/tabs";

import { CronJob, EmailTemplate } from "../setting-page";
import { useCronManagement } from "@/hooks/useCronManagement";
import CronJobBuilder from "./CronJobBuilder";
import CronJobList from "./CronJobList";

// --- Parent CronTabContent Component ---
interface CronTabProps {
  cronJobs: CronJob[];
  setCronJobs: React.Dispatch<React.SetStateAction<CronJob[]>>;
  emailTemplates: EmailTemplate[];
}

const CronTabContent: React.FC<CronTabProps> = (props) => {
  const {
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
  } = useCronManagement(
    props.cronJobs,
    props.setCronJobs,
    props.emailTemplates,
  );

  return (
    <TabsContent value="cron-jobs" className="flex-1 overflow-hidden px-6">
      <div className="h-full grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CronJobBuilder
          cronBuilder={cronBuilder}
          setCronBuilder={setCronBuilder}
          emailTemplates={props.emailTemplates}
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
          cronJobs={props.cronJobs}
          toggleCronJob={toggleCronJob}
          deleteCronJob={deleteCronJob}
          getTemplateName={getTemplateName}
          formatNextRun={formatNextRun}
        />
      </div>
    </TabsContent>
  );
};

export default CronTabContent;
