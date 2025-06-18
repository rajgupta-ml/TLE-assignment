import type { NextFunction, Request, Response } from "express";
import type { ICronJob } from "../model/cronModel";
import type DbService from "../service/dbService";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import { handleError } from "../error/handleError";
import { ApiError } from "../error/apiError";
import { DbError } from "../error/dbError";
import { DbErrorCodes, DbErrorMessages } from "../constants/error.constants";
import { isValidObjectId } from "mongoose";
import { jobScheduler } from "../service/jobScheduler";

export class CronController {
    constructor(private cronJobModel: DbService<ICronJob>) {}

    getCronJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get all cron jobs without pagination
            const cronJob = await this.cronJobModel.getAll({});
            
            if (!cronJob || !cronJob.data) {
                res.status(Number(HttpStatusCode.OK)).json({
                    success: true,
                    data: []
                });
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                data: cronJob.data,
                page: cronJob.page,
                limit: cronJob.limit,
                total: cronJob.total
            });
        } catch (error) {
            handleError(error, next);
        }
    };

    createCronJob = async (req: Request, res: Response, next: NextFunction) => {
        const cronJobData: Partial<ICronJob> = req.body;

        // Validate required fields
        if (!cronJobData.cronSchedule || !cronJobData.emailTemplateId || !cronJobData.name) {
             return next(new ApiError({
                message: "Missing required fields: cronSchedule and emailTemplateId are required.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        // Validate emailTemplateId ObjectId
        if (!isValidObjectId(cronJobData.emailTemplateId)) {
             return next(new ApiError({
                message: "Invalid emailTemplateId ID provided.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        // I am Validation the Email Template Id since The frontend will show the email template Id's as drop therefore no need to validate it 
        try {
            const newCronJobResponse = await this.cronJobModel.create(cronJobData);

            if (!newCronJobResponse) {
                return next(new DbError(
                    DbErrorCodes.UNKNOWN_ERROR, 
                    DbErrorMessages.FAILED_TO_CREATE, 
                    HttpStatusCode.INTERNAL_SERVER_ERROR
                ));
            }

            res.status(Number(HttpStatusCode.CREATED)).json({
                success: true,
                message: "Cron job created successfully.",
                data: newCronJobResponse,
            });
        } catch (error) {
            handleError(error, next);
        }
    };

    updateCronJobs = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const updateData: Partial<ICronJob> = req.body;


        

        if (!id) {
            return next(new ApiError({
                message: "Cron job ID is required for update.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (!isValidObjectId(id)) {
            return next(new ApiError({
                message: "Cron job ID is not valid.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (Object.keys(updateData).length === 0) {
            return next(new ApiError({
                message: "No update data provided.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        // Validate emailTemplate if provided in update
        if (updateData.emailTemplateId && !isValidObjectId(updateData.emailTemplateId)) {
            return next(new ApiError({
                message: "Invalid emailTemplate ID provided.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        try {
            const updatedCronJobResponse = await this.cronJobModel.update(id, updateData) as ICronJob;

            if (!updatedCronJobResponse ) {
                res.status(Number(HttpStatusCode.NOT_FOUND)).json({
                    success: false,
                    message: "Cron job not found or no changes made."
                });
            }

            if(updateData.isActive === true) {
                await jobScheduler.scheduleJob(id, updatedCronJobResponse.cronSchedule);
            }else if(updateData.isActive == false){
                await jobScheduler.destroyJob(id);
            }else if(updatedCronJobResponse.cronSchedule && updatedCronJobResponse.isActive){
                await jobScheduler.rescheduleJob(id, updatedCronJobResponse.cronSchedule);
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Cron job updated successfully.",
                data: updatedCronJobResponse,
            });
        } catch (error) {
            handleError(error, next);
        }
    };

    deleteCronJobs = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id) {
            return next(new ApiError({
                message: "Cron job ID is required for deletion.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (!isValidObjectId(id)) {
            return next(new ApiError({
                message: "Cron job ID is not valid.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        try {
            const deleteResultResponse = await this.cronJobModel.delete(id);
            jobScheduler.destroyJob(id);
            if (deleteResultResponse) {
                res.status(Number(HttpStatusCode.OK)).json({
                    success: true,
                    message: "Cron job deleted successfully."
                });
            } else {
                res.status(Number(HttpStatusCode.NOT_FOUND)).json({
                    success: false,
                    message: "Cron job not found."
                });
            }
        } catch (error) {
            handleError(error, next);
        }
    };
}