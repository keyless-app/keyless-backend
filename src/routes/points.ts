import express from "express";
import { Keyless } from "../core/Keyless";
import { DEFAULT_CONFIG } from "../config";
import { asyncHandler } from "../middleware/errorHandler";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Initialize Keyless instance
const keyless = new Keyless(DEFAULT_CONFIG);
keyless.initialize().catch(console.error);

/**
 * @route GET /api/points/balance
 * @desc Get user points balance (for Spenders)
 * @access Private (with Solana wallet address)
 */
router.get(
  "/balance",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const userId = req.userId || "guest";

    const balance = await keyless.getUserPoints(userId);

    res.json({
      success: true,
      data: { balance },
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route GET /api/points/transactions
 * @desc Get user points transactions
 * @access Private (with Solana wallet address)
 */
router.get(
  "/transactions",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const userId = req.userId || "guest";

    const pointsManager = keyless.getPointsManager();
    const transactions = await pointsManager.getUserTransactions(userId);

    res.json({
      success: true,
      data: transactions,
      count: transactions.length,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
