import cron, { type ScheduledTask} from 'node-cron';
import CronJob from '../model/cronModel';
import Student, { type IStudent } from '../model/student';

import sendEmail  from './emailService.ts';
import type { IEmailTemplate } from '../model/emailTemplate';
import type mongoose from 'mongoose';


// This should be signalton class. It should only schedule jobs nothing else but for simplicty sake i have am just making db calls from here.
// This class should get the Emails template and nothing else
// This class should not update the state of StudentModel.
interface ScheduledJob {
    task: ScheduledTask;
    cronJobId: string;
}

export class JobScheduler {
    private scheduledJobs: Map<string, ScheduledJob> = new Map();

    async scheduleJob(cronJobId: string, cronSchedule: string): Promise<void> {
        try {
            if (this.scheduledJobs.has(cronJobId)) {
                await this.destroyJob(cronJobId);
            }

            const task = cron.schedule(cronSchedule, async () => {
                await this.executeJob(cronJobId);
            }, {
                timezone: 'UTC' 
            });

            this.scheduledJobs.set(cronJobId, {
                task,
                cronJobId
            });

            task.start();

            await this.updateNextRunTime(cronJobId, cronSchedule);

            console.log(`Job scheduled successfully for cronJobId: ${cronJobId}`);
        } catch (error) {
            console.error(`Error scheduling job for cronJobId: ${cronJobId}`, error);
            throw error;
        }
    }

    
    private async executeJob(cronJobId: string): Promise<void> {
        try {
            console.info(`Executing job for cronJobId: ${cronJobId}`);
            
            const cronJob = await CronJob.findById(cronJobId).populate('emailTemplates');
            if (!cronJob || !cronJob.isActive) {
                console.warn(`Cron job ${cronJobId} not found or inactive`);
                return;
            }

        
            const emailTemplate = cronJob.emailTemplate as unknown as IEmailTemplate;
            if (!emailTemplate) {
                console.error(`Email template not found for cronJobId: ${cronJobId}`);
                return;
            }

            const activeStudents = await Student.find({ isSendEmailActive: true })  as IStudent[];
            if (activeStudents.length === 0) {
                console.info(`No active students found for cronJobId: ${cronJobId}`);
                return;
            }

            const emailPromises = activeStudents.map(student => 
                this.sendEmailToStudent(student, emailTemplate)
            );

            const results = await Promise.allSettled(emailPromises);
            
            const successCount = results.filter(result => result.status === 'fulfilled').length;
            const failCount = results.filter(result => result.status === 'rejected').length;

            await this.updateJobRunTimes(cronJobId, cronJob.cronSchedule);

            console.info(`Job execution completed for cronJobId: ${cronJobId}. Success: ${successCount}, Failed: ${failCount}`);
        } catch (error) {
            console.error(`Error executing job for cronJobId: ${cronJobId}`, error);
        }
    }

    
    private async sendEmailToStudent(student: IStudent, emailTemplate: IEmailTemplate): Promise<void> {
        try {
            const personalizedSubject = this.replacePlaceholders(emailTemplate.subject, student);
            const personalizedBody = this.replacePlaceholders(emailTemplate.body, student);

            await sendEmail({
                to: student.email,
                subject: personalizedSubject,
                html: personalizedBody,
            });

            await Student.findByIdAndUpdate(
                student._id,
                { $inc: { numberOfEmailSent: 1 } },
                { new: true }
            );

            console.info(`Email sent successfully to student: ${student.email}`);
        } catch (error) {
            console.error(`Error sending email to student: ${student.email}`, error);
            throw error;
        }
    }


    private replacePlaceholders(template: string, student: IStudent): string {
        return template
            .replace(/\{\{name\}\}/g, student.name)
            .replace(/\{\{email\}\}/g, student.email)
            .replace(/\{\{phone_number\}\}/g, student.phone_number)
            .replace(/\{\{codeforceHandle\}\}/g, student.codeforceHandle)
            .replace(/\{\{numberOfEmailSent\}\}/g, student.numberOfEmailSent.toString());
    }

    private stripHtml(html: string): string {
        return html.replace(/<[^>]*>/g, '');
    }

    private async updateJobRunTimes(cronJobId: string, cronSchedule: string): Promise<void> {
        try {
            const now = new Date();
            const nextRun = this.getNextRunTime(cronSchedule);

            await CronJob.findByIdAndUpdate(
                cronJobId,
                {
                    lastRunAt: now,
                    nextRunAt: nextRun
                },
                { new: true }
            );
        } catch (error) {
            console.error(`Error updating job run times for cronJobId: ${cronJobId}`, error);
        }
    }

    private async updateNextRunTime(cronJobId: string, cronSchedule: string): Promise<void> {
        try {
            const nextRun = this.getNextRunTime(cronSchedule);

            await CronJob.findByIdAndUpdate(
                cronJobId,
                { nextRunAt: nextRun },
                { new: true }
            );
        } catch (error) {
            console.error(`Error updating next run time for cronJobId: ${cronJobId}`, error);
        }
    }

    
    private getNextRunTime(cronSchedule: string): Date {
        try {
            // Create a temporary task to get next execution time
            const tempTask = cron.schedule(cronSchedule, () => {}, { timezone : "UTC" });
            const nextDate = tempTask.getNextRun();
            tempTask.destroy();
            
            return nextDate ? nextDate : new Date();
        } catch (error) {
            console.error(`Error calculating next run time for schedule: ${cronSchedule}`, error);
            return new Date(Date.now() + 60 * 60 * 1000); // Default to 1 hour from now
        }
    }

    async destroyJob(cronJobId: string): Promise<void> {
        try {
            const scheduledJob = this.scheduledJobs.get(cronJobId);
            
            if (scheduledJob) {
                scheduledJob.task.stop();
                scheduledJob.task.destroy();
                
                this.scheduledJobs.delete(cronJobId);
                
                console.info(`Job destroyed successfully for cronJobId: ${cronJobId}`);
            } else {
                console.warn(`Job not found for destruction: ${cronJobId}`);
            }
        } catch (error) {
            console.error(`Error destroying job for cronJobId: ${cronJobId}`, error);
            throw error;
        }
    }

    async destroyAllJobs(): Promise<void> {
        try {
            const cronJobIds = Array.from(this.scheduledJobs.keys());
            
            for (const cronJobId of cronJobIds) {
                await this.destroyJob(cronJobId);
            }
            
            console.info('All jobs destroyed successfully');
        } catch (error) {
            console.error('Error destroying all jobs', error);
            throw error;
        }
    }

    getScheduledJobIds(): string[] {
        return Array.from(this.scheduledJobs.keys());
    }

    isJobScheduled(cronJobId: string): boolean {
        return this.scheduledJobs.has(cronJobId);
    }

    async rescheduleJob(cronJobId: string, newCronSchedule: string): Promise<void> {
        try {
            // Destroy existing job if it exists
            if (this.isJobScheduled(cronJobId)) {
                await this.destroyJob(cronJobId);
            }
            
            // Schedule with new schedule
            await this.scheduleJob(cronJobId, newCronSchedule);
            
            console.info(`Job rescheduled successfully for cronJobId: ${cronJobId}`);
        } catch (error) {
            console.error(`Error rescheduling job for cronJobId: ${cronJobId}`, error);
            throw error;
        }
    }

    async loadAndScheduleAllJobs(): Promise<void> {
        try {
            const activeCronJobs = await CronJob.find({ isActive: true }) ;
            
            for (const cronJob of activeCronJobs) {
                await this.scheduleJob((cronJob._id as mongoose.Types.ObjectId).toString(), cronJob.cronSchedule);
            }
            
            console.info(`Loaded and scheduled ${activeCronJobs.length} active cron jobs`);
        } catch (error) {
            console.error('Error loading and scheduling jobs from database', error);
            throw error;
        }
    }
}

export const jobScheduler = new JobScheduler();