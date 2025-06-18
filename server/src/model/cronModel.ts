import mongoose, { Document, Schema } from "mongoose";

export interface ICronJobBase {
    name : string;
    cronSchedule: string;
    isActive: boolean;
    lastRunAt?: Date;
    nextRunAt?: Date;
    emailTemplateId: Schema.Types.ObjectId ;
}

export interface ICronJob extends ICronJobBase, Document {
    createdAt: Date;
    updatedAt: Date;
}

const CronJobSchema = new Schema<ICronJob>(
    {
        cronSchedule: {
            type: String,
            required: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        lastRunAt: {
            type: Date,
            required: false,
        },
        nextRunAt: {
            type: Date,
            required: false,
        },
        emailTemplateId: {
            type: Schema.Types.ObjectId,
            ref: "EmailTemplate", 
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

const CronJob = mongoose.model<ICronJob>("CronJob", CronJobSchema);
export default CronJob;