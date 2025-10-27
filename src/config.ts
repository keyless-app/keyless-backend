import dotenv from "dotenv";
import { KeylessConfig } from "./types";

dotenv.config();

export const DEFAULT_CONFIG: KeylessConfig = {
  jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
  bcryptRounds: 12,
  port: parseInt(process.env.PORT || "3000"),
  environment: (process.env.NODE_ENV as any) || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiKeyHeader: process.env.API_KEY_HEADER || "X-API-Key",
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || "100"),
  // AI service configurations
  textGenerationModel: process.env.TEXT_GENERATION_MODEL || "gpt-4",
  imageGenerationModel: process.env.IMAGE_GENERATION_MODEL || "dall-e-3",
  codeGenerationModel: process.env.CODE_GENERATION_MODEL || "gpt-4",
  audioGenerationModel: process.env.AUDIO_GENERATION_MODEL || "whisper",
  dataAnalysisService: process.env.DATA_ANALYSIS_SERVICE || "internal",
  searchService: process.env.SEARCH_SERVICE || "internal",
};

export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  GENERATION: "/api/generation",
  CONTRIBUTIONS: "/api/contributions",
  POINTS: "/api/points",
  STATS: "/api/stats",
};

export const RATE_LIMITS = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  SKIP_SUCCESSFUL_REQUESTS: false,
  SKIP_FAILED_REQUESTS: false,
};

export const SECURITY_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  BCRYPT_ROUNDS: 12,
  SESSION_SECRET: process.env.SESSION_SECRET || "your-session-secret",
};
