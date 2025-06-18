import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface IEmailTemplate {
  name: string;
  subject: string;
  body : string;
}

export interface IEmailTemplateDocument extends IEmailTemplate, Document {
  createdAt: Date;
  updatedAt: Date;
}

const EmailTemplateSchema = new Schema<IEmailTemplateDocument>({
    name: {
      type: String,
      required: false,
      trim: true,
    },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  body : {
    type : String,
    required : true,
    trim : true,
  },
}, {
  timestamps: true
});

export const EmailTemplateModel = mongoose.model<IEmailTemplateDocument>('EmailTemplate', EmailTemplateSchema);