import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/apiError";
import { DbErrorCodes, DbErrorMessages, GenericMessage } from "../constants/error.constants";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import type { IStudent } from "../model/student"; // Assuming you have a student model defined
import type DbService from "../service/dbService";
import { MongooseError, type SortOrder } from "mongoose";
import { DbError } from "../error/dbError";

export class StudentController { 

    constructor (private model : DbService<IStudent>) {
        this.model = model
    }

    
    getStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { page, limit, sort, ...filter } = req.query; // Extract page, limit, sort, and remaining as filter
            const pageNum = parseInt(page as string) || 1;
            const limitNum = parseInt(limit as string) || 10;

            let sortOptions: Record<string, SortOrder> = {};
            if (sort && typeof sort === 'string') {
                // Example: sort=name_asc or sort=createdAt_desc
                const [field, order] = sort.split('_');
                if (field && order) {
                    sortOptions[field] = (order === 'desc' ? -1 : 1);
                }
            } else {
                // Default sort, e.g., by creation date descending
                sortOptions = { createdAt: -1 };
            }


            const queryFilter: Record<string, any> = filter as Record<string, any>;


            const paginatedStudents = await this.model.getAll(
                queryFilter,
                {}, // projection (empty for all fields)
                pageNum,
                limitNum,
                sortOptions
            );

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                ...paginatedStudents, // Spread the paginated object directly
            });
        } catch (error) {
            if (error instanceof DbError) {
                return next(error);
            }
            if (error instanceof MongooseError) {
                return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, (error.message as DbErrorMessages), HttpStatusCode.INTERNAL_SERVER_ERROR, error.cause));
            }
            return next(new ApiError({
                message: GenericMessage.GENERIC_ERROR,
                statusCode: Number(HttpStatusCode.INTERNAL_SERVER_ERROR),
            }));
        }
    }

    
    addStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const {name, email, phone_number, codeforceHandle} = req.body;
            const missingFields = this.getMissingFields({
                name,
                email,
                phone_number,
                codeforceHandle,
              });

              if (missingFields.length > 0) {
                const message = `Missing required fields: ${missingFields.join(", ")}`;
                return next(
                  new ApiError({
                    message,
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                  })
                );
            }

            const student = await this.model.create({
                name,
                email,
                phone_number,
                codeforceHandle
            });

            res.status(Number(HttpStatusCode.CREATED)).json({ // Use 201 Created for successful resource creation
                success:true,
                data : student
            });
        } catch(error) {
            if (error instanceof DbError) {
                return next(error);
            }
            if (error instanceof MongooseError){
                return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, (error.message as DbErrorMessages), HttpStatusCode.INTERNAL_SERVER_ERROR, error.cause));
            }
            return next(new ApiError({
                message : GenericMessage.GENERIC_ERROR,
                statusCode: Number(HttpStatusCode.INTERNAL_SERVER_ERROR),
            }));
        }
    }

    
    deleteStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { id } = req.params;

            if (!id) {
                return next(new ApiError({
                    message: "Student ID is required for deletion.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            const deletedStudent = await this.model.delete(id);

            if (!deletedStudent) {
                return next(new ApiError({
                    message: "Student not found.",
                    statusCode: Number(HttpStatusCode.NOT_FOUND),
                    errorCode: DbErrorCodes.NOT_FOUND,
                }));
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Student deleted successfully.",
                data: deletedStudent,
            });
        } catch (error) {
            if (error instanceof DbError) {
                return next(error);
            }
            if (error instanceof MongooseError) {
                return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, (error.message as DbErrorMessages), HttpStatusCode.INTERNAL_SERVER_ERROR, error.cause));
            }
            return next(new ApiError({
                message: GenericMessage.GENERIC_ERROR,
                statusCode: Number(HttpStatusCode.INTERNAL_SERVER_ERROR),
            }));
        }
    }

    
    updateStudents = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id) {
                return next(new ApiError({
                    message: "Student ID is required for update.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            if (Object.keys(updateData).length === 0) {
                return next(new ApiError({
                    message: "No update data provided.",
                    statusCode: Number(HttpStatusCode.BAD_REQUEST),
                    errorCode: DbErrorCodes.VALIDATION_ERROR,
                }));
            }

            const updatedStudent = await this.model.update(id, updateData);

            if (!updatedStudent) {
                return next(new ApiError({
                    message: "Student not found.",
                    statusCode: Number(HttpStatusCode.NOT_FOUND),
                    errorCode: DbErrorCodes.NOT_FOUND,
                }));
            }

            res.status(Number(HttpStatusCode.OK)).json({
                success: true,
                message: "Student updated successfully.",
                data: updatedStudent,
            });
        } catch (error) {
            if (error instanceof DbError) {
                return next(error);
            }
            if (error instanceof MongooseError) {
                return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, (error.message as DbErrorMessages), HttpStatusCode.INTERNAL_SERVER_ERROR, error.cause));
            }
            return next(new ApiError({
                message: GenericMessage.GENERIC_ERROR,
                statusCode: Number(HttpStatusCode.INTERNAL_SERVER_ERROR),
            }));
        }
    }

    private getMissingFields(data: Record<string, any>): string[] {
        return Object.entries(data)
          .filter(([_, value]) => value == null || value === "" || value === undefined)
          .map(([key]) => key);
      }
}