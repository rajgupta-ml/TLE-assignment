import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document { 
  name: string;
  email: string;
  phone_number: string;
  codeforceHandle: string;
  syncTime : Date,
  numberOfEmailSent : number
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex =
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const phoneRegex =
  /^\+?[1-9]\d{9,14}$/; 

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [emailRegex, "Please enter a valid email address"],
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      match: [phoneRegex, "Please enter a valid phone number"],
      unique: true,
    },
    codeforceHandle: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    numberOfEmailSent : {
      type : Number,
      default : 0,
    },
    syncTime : {
      type : Date,
      default : new Date()
    }
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model<IStudent>("Student", StudentSchema);
export default Student;
