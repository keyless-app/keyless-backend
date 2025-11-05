import express from "express";
import { Keyless } from "../core/Keyless";
import { DEFAULT_CONFIG } from "../config";
import { asyncHandler } from "../middleware/errorHandler";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { AITool, GenerationConfig } from "../types";

const router = express.Router();

// Initialize Keyless instance
const keyless = new Keyless(DEFAULT_CONFIG);
keyless.initialize().catch(console.error);

/**
 * @route POST /api/generation/text
 * @desc Generate text content
 * @access Private (with API key)
 */
router.post(
  "/text",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.TEXT_GENERATION,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route POST /api/generation/image
 * @desc Generate image content
 * @access Private (with API key)
 */
router.post(
  "/image",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.IMAGE_GENERATION,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route POST /api/generation/code
 * @desc Generate code content
 * @access Private (with API key)
 */
router.post(
  "/code",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.CODE_GENERATION,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route POST /api/generation/audio
 * @desc Generate audio content
 * @access Private (with API key)
 */
router.post(
  "/audio",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.AUDIO_GENERATION,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route POST /api/generation/analysis
 * @desc Analyze data
 * @access Private (with API key)
 */
router.post(
  "/analysis",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.DATA_ANALYSIS,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route POST /api/generation/search
 * @desc Search and research
 * @access Private (with API key)
 */
router.post(
  "/search",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const { prompt, config } = req.body;
    const userId = req.userId || "guest";

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "Prompt is required",
        code: "MISSING_PROMPT",
      });
    }

    const result = await keyless.generateAI(
      userId,
      AITool.SEARCH_RESEARCH,
      prompt,
      config as GenerationConfig
    );

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  })
);

/**
 * @route GET /api/generation/history
 * @desc Get user generation history
 * @access Private (with API key)
 */
router.get(
  "/history",
  asyncHandler(async (req: AuthenticatedRequest, res: express.Response) => {
    const userId = req.userId || "guest";
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const history = await keyless.getUserGenerations(userId, limit);

    res.json({
      success: true,
      data: history,
      count: history.length,
      timestamp: new Date().toISOString(),
    });
  })
);

export default router;
