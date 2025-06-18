"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Mail, Settings } from "lucide-react";
import { ICron } from "@/api/CronApi";
import CronTabContent from "./CronJob/cron-tab";
import EmailTemplateTab from "./Email-Template/EmailTemplateTab";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

export type CronJob = Omit<ICron, "createdAt" | "updateAt">;

export default function SettingPage() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>([]);

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to our platform!",
      content:
        "Hi {{name}},\n\nWelcome to our platform!\n\nBest regards,\nThe Team",
    },
    {
      id: "2",
      name: "Weekly Newsletter",
      subject: "Your Weekly Update",
      content:
        "Hi {{name}},\n\nHere's your weekly update...\n\nBest regards,\nThe Team",
    },
  ]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="p-6 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Cron Job Manager</h1>
            <p className="text-muted-foreground">
              Schedule and manage automated email campaigns
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="cron-jobs" className="h-full flex flex-col">
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
              Email Templates ({emailTemplates.length})
            </TabsTrigger>
          </TabsList>

          <CronTabContent
            cronJobs={cronJobs}
            emailTemplates={emailTemplates}
            setCronJobs={setCronJobs}
          ></CronTabContent>
          <EmailTemplateTab
            emailTemplates={emailTemplates}
            setEmailTemplates={setEmailTemplates}
          ></EmailTemplateTab>
        </Tabs>
      </div>
      {/* Edit Template Dialog */}
    </div>
  );
}
