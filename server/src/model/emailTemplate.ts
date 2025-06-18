import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IEmailTemplate {
  subject: string;
  email: string;
  description: string;
}

export interface IEmailTemplateDocument extends IEmailTemplate, Document {
  createdAt: Date;
  updatedAt: Date;
}

const EmailTemplateSchema = new Schema<IEmailTemplateDocument>({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
}, {
  timestamps: true
});

export const EmailTemplateModel = mongoose.model<IEmailTemplateDocument>('EmailTemplate', EmailTemplateSchema);