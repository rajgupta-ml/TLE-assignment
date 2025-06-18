import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailTemplate } from "../setting-page";
import { Plus, Timer } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const PRESET_SCHEDULES = [
  { label: "Every minute", value: "0 * * * * *" },
  { label: "Every 5 minutes", value: "0 */5 * * * *" },
  { label: "Every hour", value: "0 0 * * * *" },
  { label: "Daily at midnight", value: "0 0 0 * * *" },
  { label: "Weekly (Sunday)", value: "0 0 0 * * 0" },
  { label: "Monthly (1st)", value: "0 0 0 1 * *" },
];

interface CronJobBuilderProps {
  cronBuilder: any; // Type according to useCronManagement's return
  setCronBuilder: React.Dispatch<React.SetStateAction<any>>; // Type according to useCronManagement's return
  emailTemplates: EmailTemplate[];
  addCronJob: () => void;
  usePreset: boolean;
  setSelectedPreset: React.Dispatch<React.SetStateAction<string>>;
  selectedPreset: string;
  setUsePreset: React.Dispatch<React.SetStateAction<boolean>>;
  timeOptions: string[];
  hourOptions: string[];
  dayOptions: string[];
  monthOptions: string[];
  generateCronExpression: () => string;
}

const CronJobBuilder: React.FC<CronJobBuilderProps> = ({
  cronBuilder,
  setCronBuilder,
  emailTemplates,
  addCronJob,
  usePreset,
  setSelectedPreset,
  selectedPreset,
  setUsePreset,
  timeOptions,
  hourOptions,
  dayOptions,
  monthOptions,
  generateCronExpression,
}) => {
  return (
    <Card className="xl:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Cron Job
        </CardTitle>
        <CardDescription>Build and schedule automated tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Job Name</Label>
          <Input
            placeholder="e.g., Daily Newsletter"
            value={cronBuilder.name}
            onChange={(e) =>
              setCronBuilder({ ...cronBuilder, name: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Email Template</Label>
          <Select
            value={cronBuilder.emailTemplateId}
            onValueChange={(value) =>
              setCronBuilder({
                ...cronBuilder,
                emailTemplateId: value,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {emailTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex flex-col">
                    <span>{template.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="use-preset"
              checked={usePreset}
              onCheckedChange={setUsePreset}
            />
            <Label htmlFor="use-preset">Use preset schedule</Label>
          </div>

          {usePreset ? (
            <div className="space-y-2">
              <Label>Schedule Preset</Label>
              <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a preset" />
                </SelectTrigger>
                <SelectContent>
                  {PRESET_SCHEDULES.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Custom Schedule
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Second</Label>
                  <Select
                    value={cronBuilder.second}
                    onValueChange={(value) =>
                      setCronBuilder({
                        ...cronBuilder,
                        second: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every</SelectItem>
                      <SelectItem value="*/5">Every 5</SelectItem>
                      <SelectItem value="*/10">Every 10</SelectItem>
                      <SelectItem value="*/15">Every 15</SelectItem>
                      <SelectItem value="*/30">Every 30</SelectItem>
                      {timeOptions.slice(0, 10).map((option) => (
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
                      setCronBuilder({
                        ...cronBuilder,
                        minute: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every</SelectItem>
                      <SelectItem value="*/5">Every 5</SelectItem>
                      <SelectItem value="*/10">Every 10</SelectItem>
                      <SelectItem value="*/15">Every 15</SelectItem>
                      <SelectItem value="*/30">Every 30</SelectItem>
                      {timeOptions.slice(0, 10).map((option) => (
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
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every</SelectItem>
                      <SelectItem value="*/2">Every 2</SelectItem>
                      <SelectItem value="*/4">Every 4</SelectItem>
                      <SelectItem value="*/6">Every 6</SelectItem>
                      <SelectItem value="*/12">Every 12</SelectItem>
                      {hourOptions.slice(0, 12).map((option) => (
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
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="*">Every</SelectItem>
                      <SelectItem value="*/2">Every 2</SelectItem>
                      <SelectItem value="*/7">Weekly</SelectItem>
                      <SelectItem value="1">1st</SelectItem>
                      <SelectItem value="15">15th</SelectItem>
                      {dayOptions.slice(0, 10).map((option) => (
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
                    <SelectTrigger className="h-9">
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
                    <SelectTrigger className="h-9">
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
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Generated Expression</Label>
          <code className="block text-sm bg-muted p-3 rounded-md font-mono border">
            {generateCronExpression()}
          </code>
        </div>

        <Button
          onClick={addCronJob}
          className="w-full"
          disabled={!cronBuilder.name || !cronBuilder.emailTemplateId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Cron Job
        </Button>
      </CardContent>
    </Card>
  );
};

export default CronJobBuilder;
