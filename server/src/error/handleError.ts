import type { NextFunction } from "express";
import { DbError } from "./dbError";
import { MongooseError } from "mongoose";
import { DbErrorCodes, DbErrorMessages, GenericMessage } from "../constants/error.constants";
import { HttpStatusCode } from "../constants/httpStatusCode.constants";
import { ApiError } from "./apiError";

export const handleError = (error: unknown, next: NextFunction) => {
    if (error instanceof DbError) {
        return next(error);
    }
    if (error instanceof MongooseError) {
        return next(new DbError(DbErrorCodes.UNKNOWN_ERROR, (error.message as DbErrorMessages), HttpStatusCode.INTERNAL_SERVER_ERROR, error.cause));
    }
    return next(new ApiError({
        message: GenericMessage.GENERIC_ERROR,
        statusCode: Number(HttpStatusCode.INTERNAL_SERVER_ERROR),
        errorCode: DbErrorCodes.UNKNOWN_ERROR,
    }));
}
