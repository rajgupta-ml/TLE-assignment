"use client";

import { Tabs } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import { ICron } from "@/api/CronApi";
import CronTabContent from "./CronJob/cron-tab";
import EmailTemplateTab from "./Email-Template/EmailTemplateTab";

export type CronJob = Omit<ICron, "createdAt" | "updateAt">;

export default function SettingPage() {
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
        <Tabs defaultValue="cron-jobs" className="h-full flex flex-col p-4 ">
          <CronTabContent></CronTabContent>
          <EmailTemplateTab></EmailTemplateTab>
        </Tabs>
      </div>
      {/* Edit Template Dialog */}
    </div>
  );
}
