import {
  KeylessConfig,
  User,
  UserType,
  AIGenerationRequest,
  AITool,
  GenerationConfig,
  PointsTransaction,
  PointsTransactionType,
  POINTS_COSTS,
  UserStats,
  PlatformStats,
  KeylessError,
  TextGenerationResult,
  ImageGenerationResult,
  CodeGenerationResult,
  AudioGenerationResult,
  DataAnalysisResult,
  SearchResult,
  Contribution,
} from "../types";
import { PointsManager } from "./PointsManager";
import { AIGenerationManager } from "./AIGenerationManager";
import { ContributionManager } from "./ContributionManager";

/**
 * Main Keyless platform class that orchestrates AI generation,
 * points management, and user contributions
 */
export class Keyless {
  private config: KeylessConfig;
  private pointsManager: PointsManager;
  private aiGenerationManager: AIGenerationManager;
  private contributionManager: ContributionManager;
  private users: Map<string, User> = new Map();

  constructor(config: KeylessConfig) {
    this.config = config;

    // Initialize core managers
    this.pointsManager = new PointsManager(config);
    this.aiGenerationManager = new AIGenerationManager(config);
    this.contributionManager = new ContributionManager(config);
  }

  /**
   * Initialize the Keyless platform
   */
  async initialize(): Promise<void> {
    try {
      await Promise.all([
        this.pointsManager.initialize(),
        this.aiGenerationManager.initialize(),
        this.contributionManager.initialize(),
      ]);

      console.log("Keyless platform initialized successfully");
    } catch (error) {
      throw new KeylessError(
        "Failed to initialize Keyless platform",
        "INITIALIZATION_ERROR",
        error
      );
    }
  }

  /**
   * Generate AI content using points
   */
  async generateAI(
    userId: string,
    tool: AITool,
    prompt: string,
    config?: GenerationConfig
  ): Promise<any> {
    // Check points balance
    const pointsCost = POINTS_COSTS[tool];
    const user = this.users.get(userId);

    if (!user) {
      throw new KeylessError("User not found", "USER_NOT_FOUND");
    }

    if (user.pointsBalance < pointsCost) {
      throw new KeylessError(
        `Insufficient points. Required: ${pointsCost}, Available: ${user.pointsBalance}`,
        "INSUFFICIENT_POINTS"
      );
    }

    // Deduct points
    await this.pointsManager.deductPoints(
      userId,
      pointsCost,
      `AI Generation: ${tool}`
    );

    // Generate AI content
    const result = await this.aiGenerationManager.generate(
      tool,
      prompt,
      config
    );

    // Update user points balance
    user.pointsBalance -= pointsCost;
    this.users.set(userId, user);

    return result;
  }

  /**
   * Add contribution (Contributors earn $KEY tokens, not points)
   */
  async addContribution(
    userId: string,
    type: string,
    modelId: string,
    data: any,
    keyEarned: number
  ): Promise<string> {
    // Add contribution
    const contributionId = await this.contributionManager.addContribution(
      userId,
      type,
      modelId,
      data,
      keyEarned
    );

    // Update user stats (Contributors earn $KEY, not points)
    const user = this.users.get(userId);
    if (user) {
      user.keyBalance += keyEarned;
      user.contributions += 1;
      this.users.set(userId, user);
    }

    // Note: $KEY tokens are paid out from Rewards Treasury
    // This is handled separately via the Solana payment service

    return contributionId;
  }

  /**
   * Get user points balance
   */
  async getUserPoints(userId: string): Promise<number> {
    const user = this.users.get(userId);
    return user?.pointsBalance || 0;
  }

  /**
   * Get user stats
   */
  async getUserStats(userId: string): Promise<UserStats | null> {
    const user = this.users.get(userId);
    if (!user) return null;

    const generations = await this.aiGenerationManager.getUserGenerations(
      userId
    );
    const transactions = await this.pointsManager.getUserTransactions(userId);

    const pointsPurchased = transactions
      .filter((t) => t.type === PointsTransactionType.PURCHASED)
      .reduce((sum, t) => sum + t.amount, 0);

    const pointsSpent = transactions
      .filter((t) => t.type === PointsTransactionType.SPENT)
      .reduce((sum, t) => sum + t.amount, 0);

    const generationsByTool: Record<AITool, number> = {
      [AITool.TEXT_GENERATION]: 0,
      [AITool.IMAGE_GENERATION]: 0,
      [AITool.CODE_GENERATION]: 0,
      [AITool.AUDIO_GENERATION]: 0,
      [AITool.DATA_ANALYSIS]: 0,
      [AITool.SEARCH_RESEARCH]: 0,
    };

    for (const gen of generations) {
      generationsByTool[gen.tool] = (generationsByTool[gen.tool] || 0) + 1;
    }

    const favoriteTool =
      (Object.entries(generationsByTool).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] as AITool) || AITool.TEXT_GENERATION;

    return {
      userId,
      userType: user.userType,
      totalPoints: user.pointsBalance,
      keyBalance: user.keyBalance,
      pointsPurchased: user.userType === UserType.SPENDER ? pointsPurchased : undefined,
      pointsSpent,
      contributions: user.contributions,
      generations: generations.length,
      favoriteTool,
      generationsByTool,
      createdAt: user.createdAt,
      lastActiveAt: user.updatedAt,
    };
  }

  /**
   * Get platform statistics
   */
  async getPlatformStats(): Promise<PlatformStats> {
    const users = Array.from(this.users.values());
    const allGenerations = await this.aiGenerationManager.getAllGenerations();
    const allTransactions = await this.pointsManager.getAllTransactions();

    const totalPointsPurchased = allTransactions
      .filter((t) => t.type === PointsTransactionType.PURCHASED)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalUsdcReceived = allTransactions
      .filter((t) => t.type === PointsTransactionType.PURCHASED && t.usdcAmount)
      .reduce((sum, t) => sum + (t.usdcAmount || 0), 0);

    const totalPointsSpent = allTransactions
      .filter((t) => t.type === PointsTransactionType.SPENT)
      .reduce((sum, t) => sum + t.amount, 0);

    const generationsByTool: Record<AITool, number> = {
      [AITool.TEXT_GENERATION]: 0,
      [AITool.IMAGE_GENERATION]: 0,
      [AITool.CODE_GENERATION]: 0,
      [AITool.AUDIO_GENERATION]: 0,
      [AITool.DATA_ANALYSIS]: 0,
      [AITool.SEARCH_RESEARCH]: 0,
    };

    for (const gen of allGenerations) {
      generationsByTool[gen.tool] = (generationsByTool[gen.tool] || 0) + 1;
    }

    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const activeUsers24h = new Set(
      allGenerations
        .filter((g) => g.createdAt >= oneDayAgo)
        .map((g) => g.userId)
    ).size;

    const activeUsers7d = new Set(
      allGenerations
        .filter((g) => g.createdAt >= oneWeekAgo)
        .map((g) => g.userId)
    ).size;

    const contributions =
      await this.contributionManager.getTotalContributions();

    const totalSpenders = users.filter((u) => u.userType === UserType.SPENDER).length;
    const totalContributors = users.filter((u) => u.userType === UserType.CONTRIBUTOR).length;

    const totalKeyDistributed = Array.from(users.values())
      .reduce((sum, u) => sum + u.keyBalance, 0);

    // Note: totalKeyPurchased would come from the buyback service
    // For MVP, we'll set it to 0 and it would be populated from on-chain data

    return {
      totalUsers: users.length,
      totalSpenders,
      totalContributors,
      totalUsdcReceived,
      totalKeyPurchased: 0, // Would be populated from buyback service
      totalKeyDistributed,
      totalPointsPurchased,
      totalPointsSpent,
      totalGenerations: allGenerations.length,
      generationsByTool,
      totalContributions: contributions,
      activeUsers24h,
      activeUsers7d,
      averagePointsPerUser:
        users.length > 0 ? totalPointsPurchased / users.length : 0,
    };
  }

  /**
   * Get user generation history
   */
  async getUserGenerations(
    userId: string,
    limit: number = 50
  ): Promise<AIGenerationRequest[]> {
    return this.aiGenerationManager.getUserGenerations(userId, limit);
  }

  /**
   * Get user contributions
   */
  async getUserContributions(userId: string): Promise<Contribution[]> {
    return this.contributionManager.getUserContributions(userId);
  }

  /**
   * Add or update user
   */
  async addUser(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null;
  }

  /**
   * Get user by Solana wallet address
   */
  async getUserByWallet(walletAddress: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.solanaWalletAddress === walletAddress) {
        return user;
      }
    }
    return null;
  }

  /**
   * Get points manager
   */
  getPointsManager(): PointsManager {
    return this.pointsManager;
  }

  /**
   * Get AI generation manager
   */
  getAIGenerationManager(): AIGenerationManager {
    return this.aiGenerationManager;
  }

  /**
   * Get contribution manager
   */
  getContributionManager(): ContributionManager {
    return this.contributionManager;
  }

  /**
   * Get configuration
   */
  getConfig(): KeylessConfig {
    return this.config;
  }
}
