import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/apiError";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import type DbService from "../service/dbService";
import { isValidObjectId, MongooseError } from "mongoose";
import {type IEmailTemplate, type IEmailTemplateDocument} from "../model/emailTemplate";
import { DbError } from "../error/dbError";
import { DbErrorCodes, DbErrorMessages, GenericMessage } from "../constants/error.constants";
import { handleError } from "../error/handleError";

export class EmailTemplateController {


    constructor(private emailTempleteModel : DbService<IEmailTemplateDocument>) {}

    
    
    getAllEmailTemplate = async (req: Request, res : Response, next : NextFunction) => {
        try {
            const template = await this.emailTempleteModel.getAll()

            if(!template.data){
            res.status(Number(HttpStatusCode.OK)).json({
                    success : true,
                    data : []
                })
            }
    
            res.status(Number(HttpStatusCode.OK)).json({
                success : true,
                data : template.data,
                page : template.page,
                limit : template.limit,
                total : template.total,
            })
        } catch (error) {
            handleError(error, next);           
        }



    }

    createEmailTemplate = async (req: Request, res: Response, next: NextFunction) => {
        const templateData: Omit<IEmailTemplateDocument, 'createdAt' | 'updatedAt'> = req.body;

        if (!templateData.subject || !templateData.body || !templateData.description) {
            return next(new ApiError({
                message: "Missing required fields: studentId, subject, email, and description are required.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        try {
            const newTemplateResponse = await this.emailTempleteModel.create(templateData);

            if (!newTemplateResponse) {
                 return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, DbErrorMessages.FAILED_TO_CREATE, HttpStatusCode.INTERNAL_SERVER_ERROR));
            }

            res.status(Number(HttpStatusCode.CREATED)).json({
                success: true,
                message: "Email template created successfully.",
                data: newTemplateResponse,
            });
        } catch (error) {
            handleError(error, next);
        }
    };

    updateEmailTemplate = async (req: Request, res: Response, next: NextFunction) => {

        // emailId
        const { id } = req.params; 
        const updateData: Partial<IEmailTemplate> = req.body; 

        if (!id) {
            return next(new ApiError({
                message: "Email template ID is required for update.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (!isValidObjectId(id)) {
            return next(new ApiError({
                message: "Email template ID is not valid.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (Object.keys(updateData).length === 0) {
            return next(new ApiError({
                message: "No update data provided.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        

        try {
            const updatedTemplateResponse = await this.emailTempleteModel.update(id, updateData);

            if (!updatedTemplateResponse || !updatedTemplateResponse) {
                res.status(Number(HttpStatusCode.NOT_FOUND)).json({
                    success: false,
                    message: "Email template not found or no changes made."
                });
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Email template updated successfully.",
                data: updatedTemplateResponse,
            });
        } catch (error) {
            handleError(error, next);
        }
    };

    deleteEmailTemplate = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; // ID of the email template to delete

        if (!id) {
            return next(new ApiError({
                message: "Email template ID is required for deletion.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        if (!isValidObjectId(id)) {
            return next(new ApiError({
                message: "Email template ID is not valid.",
                statusCode: Number(HttpStatusCode.BAD_REQUEST)
            }));
        }

        try {
            const deleteResultResponse = await this.emailTempleteModel.delete(id);

            if (deleteResultResponse ) { // Assuming data: true indicates successful deletion
                res.status(Number(HttpStatusCode.OK)).json({
                    success: true,
                    message: "Email template deleted successfully."
                });
            } else {
                res.status(Number(HttpStatusCode.NOT_FOUND)).json({
                    success: false,
                    message: "Email template not found."
                });
            }
        } catch (error) {
            handleError(error, next);
        }
    };


}