// db-error.ts

import type { HttpStatusCode } from '../constants/httpStatusCode.constants';
import { DbErrorCodes, DbErrorMessages } from '../constants/error.constants';

export class DbError extends Error {
  public readonly code: DbErrorCodes;
  public readonly statusCode: HttpStatusCode;
  public readonly originalError?: any;

  constructor(
    code: DbErrorCodes,
    message: DbErrorMessages,
    statusCode: HttpStatusCode,
    originalError?: any
  ) {
    super(message);
    this.name = 'DbError';
    this.code = code;
    this.statusCode = statusCode;
    this.originalError = originalError;
    Error.captureStackTrace(this, this.constructor);
  }
}
