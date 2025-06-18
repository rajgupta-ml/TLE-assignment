import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IEmailTemplate { 
    studentId : mongoose.Types.ObjectId;
    subject : string,
    email : string,
    description : string,
    createdAt : Date,
    updatedAt : Date,
}

const EmailTemplateSchema = new Schema<IEmailTemplate>({
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true,
    },
    subject : {
        type: String,
        required: true,
        trim: true,
    },
    email : {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});


export interface IEmailTemplateDocument extends IEmailTemplate, mongoose.Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const EmailTemplateModel = mongoose.model<IEmailTemplate>('EmailTemplate', EmailTemplateSchema);
