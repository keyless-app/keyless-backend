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
 * @route GET /api/stats/user
 * @desc Get user statistics
 * @access Private (with API key)
 */
router.get(
  "/user",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const userId = req.userId || "guest";

    const stats = await keyless.getUserStats(userId);

    if (!stats) {
      return res.status(404).json({
        success: false,
        error: "User not found",
        message: `User statistics not found`,
        code: "USER_NOT_FOUND",
      });
    }

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route GET /api/stats/platform
 * @desc Get platform statistics
 * @access Private (with API key)
 */
router.get(
  "/platform",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const stats = await keyless.getPlatformStats();

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
