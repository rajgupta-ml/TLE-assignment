import type {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express';
import { DbError } from './../error/dbError';
import { HttpStatusCode } from '../constants/httpStatusCode.constants';
import { GenericMessage } from '../constants/error.constants';
import { ApiError } from '../error/apiError';


type IErr = DbError | ApiError | Error
export const errorHandler: ErrorRequestHandler = (
    err: IErr,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(err);

    if (err instanceof DbError || err instanceof ApiError) {
        res.status(Number(err.statusCode)).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode,
        });
    } else if (err instanceof Error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR as any as number).json({
            success: false,
            message: GenericMessage.INTERNAL_SERVER_ERROR,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        });
    } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR as any as number).json({
            success: false,
            message: GenericMessage.GENERIC_ERROR,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        });
    }
}