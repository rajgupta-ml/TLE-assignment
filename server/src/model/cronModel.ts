import mongoose, { Document, Schema } from "mongoose";
import type { IEmailTemplate } from "./emailTemplate"; 

export interface ICronJob extends Document {
  studentId : mongoose.Types.ObjectId;
  cronSchedule: string; 
  isActive: boolean; 
  lastRunAt?: Date; 
  nextRunAt?: Date; 
  emailTemplate: Schema.Types.ObjectId | IEmailTemplate;
  createdAt: Date;
  updatedAt: Date;
}

const CronJobSchema = new Schema<ICronJob>(
  {

    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true,
    },

   
    cronSchedule: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
    lastRunAt: {
      type: Date,
      required: false,
    },
    nextRunAt: {
      type: Date,
      required: false, 
    },
    emailTemplate: {
      type: Schema.Types.ObjectId,
      ref: "EmailTemplate", // Reference to the EmailTemplate model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the CronJob model
const CronJob = mongoose.model<ICronJob>("CronJob", CronJobSchema);
export default CronJob;
