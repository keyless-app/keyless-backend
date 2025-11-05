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
 * @route POST /api/contributions
 * @desc Add a contribution to earn $KEY tokens
 * @access Private (with Solana wallet address)
 */
router.post(
  "/",
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { type, modelId, data, keyEarned } = req.body;
    const userId = req.userId || req.walletAddress || "guest";

    if (!type || !modelId || !data) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "Type, modelId, and data are required",
        code: "MISSING_REQUIRED_FIELDS",
      });
    }

    const keyAmount = keyEarned || 10; // Default $KEY tokens
    const contributionId = await keyless.addContribution(
      userId,
      type,
      modelId,
      data,
      keyAmount
    );

    res.status(201).json({
      success: true,
      data: { contributionId },
      message: "Contribution added successfully",
      keyEarned: keyAmount,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route GET /api/contributions
 * @desc Get user contributions
 * @access Private (with Solana wallet address)
 */
router.get(
  "/",
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const userId = req.userId || "guest";

    const contributions = await keyless.getUserContributions(userId);

    res.json({
      success: true,
      data: contributions,
      count: contributions.length,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
