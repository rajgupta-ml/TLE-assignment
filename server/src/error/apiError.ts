export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;
    public readonly isOperational: boolean;
  
    constructor({
      message,
      statusCode = 500,
      errorCode = 'INTERNAL_SERVER_ERROR',
      isOperational = true,
    }: {
      message: string;
      statusCode?: number;
      errorCode?: string;
      isOperational?: boolean;
    }) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.isOperational = isOperational;
  
      // Captures stack trace, excluding constructor
      Error.captureStackTrace(this, this.constructor);
    }
  }
  