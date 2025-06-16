"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Clock, Mail, Plus, Trash2, Save, Copy } from "lucide-react";

interface CronJob {
  id: string;
  schedule: string;
  emailTemplateId: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface CronBuilder {
  second: string;
  minute: string;
  hour: string;
  day: string;
  month: string;
  year: string;
}

export default function SettingPage() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>([
    { id: "1", schedule: "0 0 2 * * *", emailTemplateId: "1" },
  ]);

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Welcome Email",
      subject: "Welcome to our platform!",
      content:
        "Hi {{name}},\n\nWelcome to our platform!\n\nBest regards,\nThe Team",
    },
  ]);

  const [cronBuilder, setCronBuilder] = useState<
    CronBuilder & { emailTemplateId: string }
  >({
    second: "0",
    minute: "0",
    hour: "0",
    day: "*",
    month: "*",
    year: "*",
    emailTemplateId: "",
  });

  const [newEmailTemplate, setNewEmailTemplate] = useState({
    name: "",
    subject: "",
    content: "",
  });

  const generateCronExpression = () => {
    return `${cronBuilder.second} ${cronBuilder.minute} ${cronBuilder.hour} ${cronBuilder.day} ${cronBuilder.month} ${cronBuilder.year}`;
  };

  const addCronJob = () => {
    const schedule = generateCronExpression();
    setCronJobs([
      ...cronJobs,
      {
        id: Date.now().toString(),
        schedule,
        emailTemplateId: cronBuilder.emailTemplateId,
      },
    ]);
    setCronBuilder({
      second: "0",
      minute: "0",
      hour: "0",
      day: "*",
      month: "*",
      year: "*",
      emailTemplateId: "",
    });
  };

  const deleteCronJob = (id: string) => {
    setCronJobs(cronJobs.filter((job) => job.id !== id));
  };

  const addEmailTemplate = () => {
    if (
      newEmailTemplate.name &&
      newEmailTemplate.subject &&
      newEmailTemplate.content
    ) {
      setEmailTemplates([
        ...emailTemplates,
        {
          id: Date.now().toString(),
          ...newEmailTemplate,
        },
      ]);
      setNewEmailTemplate({ name: "", subject: "", content: "" });
    }
  };

  const deleteEmailTemplate = (id: string) => {
    setEmailTemplates(emailTemplates.filter((template) => template.id !== id));
  };

  const timeOptions = Array.from({ length: 60 }, (_, i) => i.toString());
  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString());
  const dayOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const copyTemplateId = async (templateId: string) => {
    try {
      await navigator.clipboard.writeText(templateId);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy template ID:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b flex flex-col gap-4">
        <h1 className="text-6xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your cron jobs and email templates
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="cron-jobs" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
            <TabsTrigger value="cron-jobs" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Cron Jobs
            </TabsTrigger>
            <TabsTrigger
              value="email-templates"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="cron-jobs"
            className="flex-1 overflow-hidden px-4"
          >
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Cron Builder */}
              <Card className="flex flex-col ">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Cron Builder
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Build cron expressions visually
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Second</Label>
                      <Select
                        value={cronBuilder.second}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, second: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="*/5">Every 5</SelectItem>
                          <SelectItem value="*/10">Every 10</SelectItem>
                          <SelectItem value="*/15">Every 15</SelectItem>
                          <SelectItem value="*/30">Every 30</SelectItem>
                          {timeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Minute</Label>
                      <Select
                        value={cronBuilder.minute}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, minute: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="*/5">Every 5</SelectItem>
                          <SelectItem value="*/10">Every 10</SelectItem>
                          <SelectItem value="*/15">Every 15</SelectItem>
                          <SelectItem value="*/30">Every 30</SelectItem>
                          {timeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Hour</Label>
                      <Select
                        value={cronBuilder.hour}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, hour: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="*/2">Every 2</SelectItem>
                          <SelectItem value="*/4">Every 4</SelectItem>
                          <SelectItem value="*/6">Every 6</SelectItem>
                          <SelectItem value="*/12">Every 12</SelectItem>
                          {hourOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Day</Label>
                      <Select
                        value={cronBuilder.day}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, day: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="*/2">Every 2</SelectItem>
                          <SelectItem value="*/7">Weekly</SelectItem>
                          <SelectItem value="1">1st</SelectItem>
                          <SelectItem value="15">15th</SelectItem>
                          {dayOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Month</Label>
                      <Select
                        value={cronBuilder.month}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, month: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="*/3">Quarterly</SelectItem>
                          <SelectItem value="*/6">Bi-annual</SelectItem>
                          {monthOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {new Date(
                                2024,
                                Number.parseInt(option) - 1,
                              ).toLocaleString("default", {
                                month: "short",
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Year</Label>
                      <Select
                        value={cronBuilder.year}
                        onValueChange={(value) =>
                          setCronBuilder({ ...cronBuilder, year: value })
                        }
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="*">Every</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Generated Expression</Label>
                    <code className="block text-xs bg-muted p-2 rounded font-mono">
                      {generateCronExpression()}
                    </code>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Email Template ID</Label>
                    <Input
                      placeholder="Enter template ID"
                      className="h-8"
                      value={cronBuilder.emailTemplateId}
                      onChange={(e) =>
                        setCronBuilder({
                          ...cronBuilder,
                          emailTemplateId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button onClick={addCronJob} className="w-full h-8">
                    <Plus className="w-3 h-3 mr-2" />
                    Add Cron Job
                  </Button>
                </CardContent>
              </Card>

              {/* Active Cron Jobs */}
              <Card className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Active Cron Jobs</CardTitle>
                  <CardDescription className="text-xs">
                    Manage your scheduled tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    {cronJobs.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8 text-sm">
                        No cron jobs configured
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {cronJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex items-center justify-between p-2 border rounded text-sm"
                          >
                            <div className="flex flex-col gap-1">
                              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                {job.schedule}
                              </code>
                              {job.emailTemplateId && (
                                <span className="text-xs text-muted-foreground">
                                  Template: {job.emailTemplateId}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCronJob(job.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value="email-templates"
            className="flex-1 overflow-hidden px-4"
          >
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Email Template Builder */}
              <Card className="flex flex-col ">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Template
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Create reusable email templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Template Name</Label>
                    <Input
                      placeholder="Welcome Email"
                      className="h-8"
                      value={newEmailTemplate.name}
                      onChange={(e) =>
                        setNewEmailTemplate({
                          ...newEmailTemplate,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Subject Line</Label>
                    <Input
                      placeholder="Welcome to our platform!"
                      className="h-8"
                      value={newEmailTemplate.subject}
                      onChange={(e) =>
                        setNewEmailTemplate({
                          ...newEmailTemplate,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col">
                    <Label className="text-xs">Email Content</Label>
                    <Textarea
                      placeholder="Hi {{name}},&#10;&#10;Your email content here...&#10;&#10;Best regards,&#10;The Team"
                      className="flex-1 resize-none text-xs"
                      value={newEmailTemplate.content}
                      onChange={(e: any) =>
                        setNewEmailTemplate({
                          ...newEmailTemplate,
                          content: e.target.value,
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {"{{variable}}"} for dynamic content
                    </p>
                  </div>
                  <Button onClick={addEmailTemplate} className="w-full h-8">
                    <Plus className="w-3 h-3 mr-2" />
                    Add Template
                  </Button>
                </CardContent>
              </Card>

              {/* Email Templates List */}
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Email Templates</CardTitle>
                  <CardDescription className="text-xs">
                    Manage your templates
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    {emailTemplates.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8 text-sm">
                        No templates created
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {emailTemplates.map((template) => (
                          <div key={template.id} className="border rounded p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="font-medium text-sm">
                                  {template.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  {template.subject}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  ID: {template.id}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2"
                                  onClick={() => copyTemplateId(template.id)}
                                  title="Copy Template ID"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    deleteEmailTemplate(template.id)
                                  }
                                  className="h-6 px-2 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <Separator className="mb-2" />
                            <div className="bg-muted/50 p-2 rounded text-xs max-h-20 overflow-y-auto">
                              <pre className="whitespace-pre-wrap font-sans">
                                {template.content}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
