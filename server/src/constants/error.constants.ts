// error.constants.ts

export enum DbErrorCodes {
    VALIDATION_ERROR = 'DB_VALIDATION_ERROR',
    DUPLICATE_KEY_ERROR = 'DB_DUPLICATE_KEY_ERROR',
    CAST_ERROR = 'DB_CAST_ERROR',
    NETWORK_ERROR = 'DB_NETWORK_ERROR',
    UNKNOWN_ERROR = 'DB_UNKNOWN_ERROR',
    NOT_FOUND = "DB_DATA_NOT_FOUDN"
  }
  
  export enum DbErrorMessages {
    FAILED_TO_CREATE = "FAILED TO CREATE",
    VALIDATION_ERROR = 'Validation failed for one or more fields.',
    DUPLICATE_KEY_ERROR = 'Duplicate key error: a record with the same unique field already exists.',
    CAST_ERROR = 'Invalid identifier format or type mismatch.',
    NETWORK_ERROR = 'Failed to connect to the database. Please check your network.',
    UNKNOWN_ERROR = 'An unexpected database error occurred.',
  }

  export enum GenericMessage {
    STUDENT_NAME_REQUIRED = "student name is required",
    EMAIL_REQUIRED = "email is required",
    CODEFORCE_HANDLE_REQUIRED = "codeforce handle is required",
    PHONE_REQUIRED = "phone is required",

    INTERNAL_SERVER_ERROR = "Internal Server Error",
    TOKEN_NOT_PROVIDED = "Authentication token not provided",
    INVALID_TOKEN = "Invalid or malformed token",
    TOKEN_EXPIRED = "Authentication token expired",
    FORBIDDEN = "Forbidden: Insufficient privileges",
    GENERIC_ERROR = "An unknown error occurred.",
    INVALID_SERVICE_ID = "Unidentified Service",
  }