import { Request, Response, NextFunction } from "express";
import { validateApiKey } from "../utils/apiKeyValidator";
import { DEFAULT_CONFIG } from "../config";

export interface AuthenticatedRequest extends Request {
  apiKey?: string;
  userId?: string;
  permissions?: string[];
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers[
      DEFAULT_CONFIG.apiKeyHeader.toLowerCase()
    ] as string;

    if (!apiKey) {
      return res.status(401).json({
        error: "API key required",
        message: `Please provide a valid API key in the ${DEFAULT_CONFIG.apiKeyHeader} header`,
        code: "MISSING_API_KEY",
      });
    }

    // Validate the API key
    const validationResult = await validateApiKey(apiKey);

    if (!validationResult.valid) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "The provided API key is invalid or expired",
        code: "INVALID_API_KEY",
      });
    }

    // Attach user information to the request
    req.apiKey = apiKey;
    req.userId = validationResult.userId;
    req.permissions = validationResult.permissions;

    // Log API usage
    console.log(
      `API Request: ${req.method} ${req.path} - User: ${validationResult.userId} - IP: ${req.ip}`
    );

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      error: "Authentication failed",
      message: "An error occurred during authentication",
      code: "AUTH_ERROR",
    });
  }
};

// Optional authentication middleware for endpoints that can work with or without auth
export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers[
      DEFAULT_CONFIG.apiKeyHeader.toLowerCase()
    ] as string;

    if (apiKey) {
      const validationResult = await validateApiKey(apiKey);

      if (validationResult.valid) {
        req.apiKey = apiKey;
        req.userId = validationResult.userId;
        req.permissions = validationResult.permissions;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional endpoints
    next();
  }
};
