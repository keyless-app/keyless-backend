import {
  KeylessConfig,
  PointsTransaction,
  PointsTransactionType,
  KeylessError,
} from "../types";

/**
 * Manages points balance, transactions, and history
 * 
 * Points are purchased with USDC (SPL) by Spenders.
 * Points are spent on API calls.
 */
export class PointsManager {
  private config: KeylessConfig;
  private transactions: Map<string, PointsTransaction> = new Map();

  constructor(config: KeylessConfig) {
    this.config = config;
  }

  /**
   * Initialize the points manager
   */
  async initialize(): Promise<void> {
    try {
      console.log("PointsManager initialized successfully");
    } catch (error) {
      throw new KeylessError(
        "Failed to initialize PointsManager",
        "POINTS_MANAGER_INIT_ERROR",
        error
      );
    }
  }

  /**
   * Purchase points with USDC (for Spenders)
   * This is called after a USDC payment is verified on-chain
   */
  async purchasePoints(
    userId: string,
    amount: number,
    usdcAmount: number,
    solanaTxHash: string,
    description: string = "Points purchased with USDC"
  ): Promise<string> {
    const transactionId = this.generateTransactionId();

    const transaction: PointsTransaction = {
      id: transactionId,
      userId,
      type: PointsTransactionType.PURCHASED,
      amount,
      description,
      usdcAmount,
      solanaTxHash,
      createdAt: new Date(),
    };

    this.transactions.set(transactionId, transaction);
    return transactionId;
  }

  /**
   * Add points to user account (legacy method, kept for compatibility)
   * Note: Points should now be purchased, not earned
   */
  async addPoints(
    userId: string,
    amount: number,
    description: string,
    referenceId?: string
  ): Promise<string> {
    const transactionId = this.generateTransactionId();

    const transaction: PointsTransaction = {
      id: transactionId,
      userId,
      type: PointsTransactionType.PURCHASED,
      amount,
      description,
      referenceId,
      createdAt: new Date(),
    };

    this.transactions.set(transactionId, transaction);
    return transactionId;
  }

  /**
   * Deduct points from user account
   */
  async deductPoints(
    userId: string,
    amount: number,
    description: string,
    referenceId?: string
  ): Promise<string> {
    const transactionId = this.generateTransactionId();

    const transaction: PointsTransaction = {
      id: transactionId,
      userId,
      type: PointsTransactionType.SPENT,
      amount: -amount,
      description,
      referenceId,
      createdAt: new Date(),
    };

    this.transactions.set(transactionId, transaction);
    return transactionId;
  }

  /**
   * Get user transactions
   */
  async getUserTransactions(userId: string): Promise<PointsTransaction[]> {
    return Array.from(this.transactions.values())
      .filter((t) => t.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get all transactions
   */
  async getAllTransactions(): Promise<PointsTransaction[]> {
    return Array.from(this.transactions.values());
  }

  /**
   * Get user points balance from transactions
   */
  async getBalanceFromTransactions(userId: string): Promise<number> {
    const transactions = await this.getUserTransactions(userId);
    return transactions.reduce((balance, transaction) => {
      // Purchased points are positive, spent points are negative
      return balance + transaction.amount;
    }, 0);
  }

  /**
   * Get total USDC spent by user (for Spenders)
   */
  async getTotalUsdcSpent(userId: string): Promise<number> {
    const transactions = await this.getUserTransactions(userId);
    return transactions
      .filter((t) => t.type === PointsTransactionType.PURCHASED && t.usdcAmount)
      .reduce((sum, t) => sum + (t.usdcAmount || 0), 0);
  }

  /**
   * Generate unique transaction ID
   */
  private generateTransactionId(): string {
    return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
