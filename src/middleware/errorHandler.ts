import { Request, Response, NextFunction } from "express";
import { KeylessError } from "../types";

export interface ErrorResponse {
  error: string;
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
  path: string;
  method: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error occurred:", error);
  console.error("Request details:", {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let message = "An unexpected error occurred";
  let details = null;

  // Handle Keyless specific errors
  if (error instanceof KeylessError) {
    statusCode = getStatusCodeFromErrorCode(error.code);
    errorCode = error.code;
    message = error.message;
    details = error.details;
  }
  // Handle validation errors
  else if (error.name === "ValidationError") {
    statusCode = 400;
    errorCode = "VALIDATION_ERROR";
    message = "Request validation failed";
    details = error.message;
  }
  // Handle authentication errors
  else if (error.name === "UnauthorizedError") {
    statusCode = 401;
    errorCode = "UNAUTHORIZED";
    message = "Authentication required";
  }
  // Handle rate limiting errors
  else if (error.message.includes("Too many requests")) {
    statusCode = 429;
    errorCode = "RATE_LIMIT_EXCEEDED";
    message = "Too many requests, please try again later";
  }
  // Handle Solana specific errors
  else if (error.message.includes("Solana") || error.message.includes("SOL")) {
    statusCode = 400;
    errorCode = "SOLANA_ERROR";
    message = "Blockchain operation failed";
    details = error.message;
  }

  const errorResponse: ErrorResponse = {
    error: error.name || "Error",
    message,
    code: errorCode,
    details,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  };

  // Log error for monitoring
  logError(errorResponse, error);

  res.status(statusCode).json(errorResponse);
};

const getStatusCodeFromErrorCode = (code: string): number => {
  const statusCodeMap: { [key: string]: number } = {
    // Client errors (4xx)
    VALIDATION_ERROR: 400,
    INVALID_API_KEY: 401,
    MISSING_API_KEY: 401,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    ASSET_NOT_FOUND: 404,
    USER_NOT_FOUND: 404,
    ORDER_NOT_FOUND: 404,
    CONFLICT: 409,
    RATE_LIMIT_EXCEEDED: 429,

    // Server errors (5xx)
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    DATABASE_ERROR: 500,
    EXTERNAL_SERVICE_ERROR: 502,

    // Keyless specific errors
    INSUFFICIENT_POINTS: 400,
    INVALID_GENERATION_REQUEST: 400,
    INVALID_CONTRIBUTION: 400,
    INITIALIZATION_ERROR: 500,
    POINTS_MANAGER_INIT_ERROR: 500,
    AI_GENERATION_MANAGER_INIT_ERROR: 500,
    CONTRIBUTION_MANAGER_INIT_ERROR: 500,
    GENERATION_NOT_FOUND: 404,
  };

  return statusCodeMap[code] || 500;
};

const logError = (errorResponse: ErrorResponse, originalError: Error) => {
  const logData = {
    timestamp: errorResponse.timestamp,
    level: "ERROR",
    code: errorResponse.code,
    message: errorResponse.message,
    path: errorResponse.path,
    method: errorResponse.method,
    originalError: {
      name: originalError.name,
      message: originalError.message,
      stack: originalError.stack,
    },
    details: errorResponse.details,
  };

  // In production, this would be sent to a logging service
  console.error("API Error Log:", JSON.stringify(logData, null, 2));
};

// Async error wrapper for route handlers
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    code: "ENDPOINT_NOT_FOUND",
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });
};
