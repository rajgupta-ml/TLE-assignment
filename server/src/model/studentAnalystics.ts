import mongoose, { Document, Schema, Types } from "mongoose";
import type { ResponseContestData, studentAnalytics } from "../types/analytics";

const userMetricsSchema = new Schema({
    currentRating: { type: Number, required: true },
    maxRating: { type: Number, required: true },
    consitency: { type: Number, required: true },
    highestImporovement: { type: Number, required: true },
    inActive: { type: Boolean, required: true },
    status: { type: String, required: true },
}, { _id: false }); 

const ResponseContestDataSchema = new Schema({
    contestId: { type: Number, required: true },
    date: { type: String, required: true },
    rating: { type: Number, required: true },
    contest: { type: String, required: true },
    rank: { type: Number, required: true },
    unsolved: { type: Number, required: true },
}, { _id: false });

const BucketSchema = new Schema({
    range: { type: String, required: true },
    count: { type: Number, required: true },
    color: { type: String, required: true },
}, { _id: false });

const ResponseProblemDataSchema = new Schema({
    mostDifficult: {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    totalSolved: { type: Number, required: true },
    averageRating: { type: Number, required: true },
    averagePerDay: { type: Number, required: true },
    ratingDistribution: [BucketSchema],
}, { _id: false });


const studentAnalyticsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, 
        ref: 'Student',              
        required: true,
        alias: 'studentId'         
    },


    userMetrics: { type: userMetricsSchema, required: true },
    contestMetrics: {
        type: Map,
        of: [ResponseContestDataSchema],
        default: new Map()
    },
    problemMetrics: {
        type : Map,
        of : [ResponseProblemDataSchema],
        default : new Map()
    }, 

}, {
    timestamps: true, 
    collection: 'studentAnalytics' 
});




export interface IStudentAnalyticsDocument extends studentAnalytics, Document {
    _id: Types.ObjectId; 
    createdAt: Date;
    updatedAt: Date;
}

export const StudentAnalyticsModel = mongoose.model<IStudentAnalyticsDocument>('StudentAnalytics', studentAnalyticsSchema);
