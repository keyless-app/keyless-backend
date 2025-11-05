import { Request, Response, NextFunction } from "express";
import { DEFAULT_CONFIG } from "../config";
import { SolanaService } from "../../blockchain/services/solana";

export interface AuthenticatedRequest extends Request {
  walletAddress?: string;
  userId?: string;
  userType?: string;
}

/**
 * Solana Wallet Authentication Middleware
 * 
 * Authenticates users via their Solana wallet address.
 * The wallet address serves as the API key.
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get wallet address from header (X-Wallet-Address or X-Solana-Wallet)
    const walletAddress = 
      (req.headers["x-wallet-address"] as string) ||
      (req.headers["x-solana-wallet"] as string) ||
      (req.headers[DEFAULT_CONFIG.apiKeyHeader.toLowerCase()] as string);

    if (!walletAddress) {
      return res.status(401).json({
        error: "Wallet address required",
        message: `Please provide a valid Solana wallet address in the X-Wallet-Address header`,
        code: "MISSING_WALLET_ADDRESS",
      });
    }

    // Validate Solana wallet address format
    const solanaService = new SolanaService(DEFAULT_CONFIG.solana);
    if (!solanaService.validateWalletAddress(walletAddress)) {
      return res.status(401).json({
        error: "Invalid wallet address",
        message: "The provided Solana wallet address is invalid",
        code: "INVALID_WALLET_ADDRESS",
      });
    }

    // Attach wallet information to the request
    req.walletAddress = walletAddress;
    // In production, you would look up the user by wallet address
    // For MVP, we'll use the wallet address as the userId
    req.userId = walletAddress;

    // Log API usage
    console.log(
      `API Request: ${req.method} ${req.path} - Wallet: ${walletAddress} - IP: ${req.ip}`
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
    const walletAddress = 
      (req.headers["x-wallet-address"] as string) ||
      (req.headers["x-solana-wallet"] as string) ||
      (req.headers[DEFAULT_CONFIG.apiKeyHeader.toLowerCase()] as string);

    if (walletAddress) {
      const solanaService = new SolanaService(DEFAULT_CONFIG.solana);
      if (solanaService.validateWalletAddress(walletAddress)) {
        req.walletAddress = walletAddress;
        req.userId = walletAddress;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional endpoints
    next();
  }
};
