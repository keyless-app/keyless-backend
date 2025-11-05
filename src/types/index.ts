// Core types for Keyless AI Platform (Solana-based)

export interface User {
  id: string;
  solanaWalletAddress: string; // Solana wallet address (e.g., Phantom, Solflare)
  userType: UserType; // SPENDER or CONTRIBUTOR
  pointsBalance: number; // Points purchased with USDC (for Spenders)
  keyBalance: number; // $KEY token balance (for Contributors)
  contributions: number;
  contributionsHistory: Contribution[];
  createdAt: Date;
  updatedAt: Date;
}

export enum UserType {
  SPENDER = "spender", // Developer who pays USDC to use API
  CONTRIBUTOR = "contributor", // User who trains models and earns $KEY
}

export interface Contribution {
  id: string;
  userId: string;
  type: ContributionType;
  modelId: string;
  data: any;
  keyEarned: number; // $KEY tokens earned (not points)
  status: ContributionStatus;
  payoutTxHash?: string; // Solana transaction hash for $KEY payout
  createdAt: Date;
}

export enum ContributionType {
  TRAINING_DATA = "training_data",
  FEEDBACK = "feedback",
  ANNOTATION = "annotation",
  EVALUATION = "evaluation",
  IMPROVEMENT = "improvement",
}

export enum ContributionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface PointsTransaction {
  id: string;
  userId: string;
  type: PointsTransactionType;
  amount: number;
  description: string;
  referenceId?: string;
  usdcAmount?: number; // USDC amount paid (for purchases)
  solanaTxHash?: string; // Solana transaction hash
  createdAt: Date;
}

export enum PointsTransactionType {
  PURCHASED = "purchased", // Points purchased with USDC
  SPENT = "spent", // Points spent on API calls
  REFUNDED = "refunded",
}

export interface AIGenerationRequest {
  id: string;
  userId: string;
  tool: AITool;
  prompt: string;
  config?: GenerationConfig;
  pointsCost: number;
  status: GenerationStatus;
  result?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface GenerationConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  width?: number;
  height?: number;
  numImages?: number;
  style?: string;
}

export enum AITool {
  TEXT_GENERATION = "text_generation",
  IMAGE_GENERATION = "image_generation",
  CODE_GENERATION = "code_generation",
  AUDIO_GENERATION = "audio_generation",
  DATA_ANALYSIS = "data_analysis",
  SEARCH_RESEARCH = "search_research",
}

export enum GenerationStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export interface PointsCost {
  tool: AITool;
  cost: number;
}

export const POINTS_COSTS: Record<AITool, number> = {
  [AITool.TEXT_GENERATION]: 5,
  [AITool.IMAGE_GENERATION]: 10,
  [AITool.CODE_GENERATION]: 8,
  [AITool.AUDIO_GENERATION]: 15,
  [AITool.DATA_ANALYSIS]: 12,
  [AITool.SEARCH_RESEARCH]: 3,
};

export interface TextGenerationResult {
  text: string;
  tokensUsed?: number;
  finishReason?: string;
}

export interface ImageGenerationResult {
  images: string[]; // URLs or base64 encoded images
  width: number;
  height: number;
}

export interface CodeGenerationResult {
  code: string;
  language: string;
  explanation?: string;
}

export interface AudioGenerationResult {
  audio: string; // URL or base64 encoded audio
  duration: number;
  format: string;
}

export interface DataAnalysisResult {
  analysis: any;
  insights: string[];
  charts?: string[]; // URLs to generated charts
}

export interface SearchResult {
  query: string;
  results: SearchResultItem[];
  sources: string[];
}

export interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  relevance: number;
}

export interface UserStats {
  userId: string;
  userType: UserType;
  totalPoints: number; // For Spenders: points balance
  keyBalance: number; // For Contributors: $KEY token balance
  pointsPurchased?: number; // USDC spent (for Spenders)
  pointsSpent: number;
  contributions: number;
  generations: number;
  favoriteTool: AITool;
  generationsByTool: Record<AITool, number>;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface PlatformStats {
  totalUsers: number;
  totalSpenders: number;
  totalContributors: number;
  totalUsdcReceived: number; // Total USDC received from Spenders
  totalKeyPurchased: number; // Total $KEY purchased via buyback
  totalKeyDistributed: number; // Total $KEY distributed to Contributors
  totalPointsPurchased: number;
  totalPointsSpent: number;
  totalGenerations: number;
  generationsByTool: Record<AITool, number>;
  totalContributions: number;
  activeUsers24h: number;
  activeUsers7d: number;
  averagePointsPerUser: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Solana Configuration
export interface SolanaConfig {
  rpcUrl: string;
  network: "mainnet-beta" | "devnet" | "testnet";
  keyTokenMint: string; // $KEY token mint address (SPL)
  usdcMint: string; // USDC mint address (SPL)
  rewardsTreasuryWallet: string; // Treasury wallet address for $KEY rewards
  paymentProgramId?: string; // Solana program ID for payment/buyback
  jupiterApiUrl?: string; // Jupiter aggregator API URL
  pointsPriceUsdc: number; // Price of 1 Point in USDC (e.g., 0.001)
}

// Configuration types
export interface KeylessConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptRounds: number;
  port: number;
  environment: "development" | "production" | "test";
  corsOrigin: string;
  apiKeyHeader: string;
  maxRequestsPerMinute: number;
  // Solana configuration
  solana: SolanaConfig;
  // AI service configurations
  textGenerationModel: string;
  imageGenerationModel: string;
  codeGenerationModel: string;
  audioGenerationModel: string;
  dataAnalysisService: string;
  searchService: string;
}

// Event types
export interface KeylessEvent {
  type: string;
  data: any;
  timestamp: Date;
  userId?: string;
}

// Error types
export class KeylessError extends Error {
  constructor(message: string, public code: string, public details?: any) {
    super(message);
    this.name = "KeylessError";
  }
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    solanaWalletAddress: string;
    userType: UserType;
    pointsBalance: number;
    keyBalance: number;
  };
}

// Payment/Buyback types
export interface PaymentRequest {
  usdcAmount: number; // Amount of USDC to pay
  walletAddress: string; // User's Solana wallet address
}

export interface PaymentResponse {
  transactionHash: string;
  pointsCredited: number;
  keyPurchased: number; // $KEY purchased via buyback
  usdcAmount: number;
}

export interface BuybackMetrics {
  totalUsdcReceived: number;
  totalKeyPurchased: number;
  buybackTransactions: number;
  averageBuybackSize: number;
}

export interface ApiKeyCredentials {
  apiKey: string;
  userId: string;
  permissions: string[];
}

// Middleware types
export interface AuthenticatedRequest extends Express.Request {
  user?: {
    id: string;
    email: string;
    walletAddress: string;
  };
  permissions?: string[];
}
