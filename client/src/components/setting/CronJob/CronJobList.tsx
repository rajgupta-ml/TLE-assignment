import { CronJob } from "../setting-page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface CronJobListProps {
  cronJobs: CronJob[];
  toggleCronJob: (id: string, isActive: boolean) => void;
  deleteCronJob: (id: string) => void;
  getTemplateName: (id: string) => string | undefined;
  formatNextRun: (dateString: Date | undefined) => string;
}

const CronJobList: React.FC<CronJobListProps> = ({
  cronJobs,
  toggleCronJob,
  deleteCronJob,
  getTemplateName,
  formatNextRun,
}) => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Scheduled Jobs
        </CardTitle>
        <CardDescription>
          Manage and monitor your automated tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          {cronJobs.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No cron jobs configured</p>
              <p className="text-sm text-muted-foreground">
                Create your first automated task
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cronJobs.map((job) => (
                <Card key={job._id} className="border-l-4 border-l-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{job.name}</h3>
                          <Badge
                            variant={job.isActive ? "default" : "secondary"}
                          >
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Schedule</p>
                            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                              {job.cronSchedule}
                            </code>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Template</p>
                            <p className="font-medium">
                              {getTemplateName(job.emailTemplateId)}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Last Run</p>
                            <p>
                              {job.lastRun
                                ? new Date(job.lastRun).toLocaleString()
                                : "Never"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Next Run</p>
                            <p>{formatNextRun(job.nextRun)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={job.isActive}
                            onClick={() =>
                              toggleCronJob(job._id, !!job.isActive)
                            }
                          />
                          <Label className="text-sm">
                            {job.isActive ? "Active" : "Inactive"}
                          </Label>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCronJob(job._id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CronJobList;
