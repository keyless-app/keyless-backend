import {
  KeylessConfig,
  Contribution,
  ContributionType,
  ContributionStatus,
  KeylessError,
} from "../types";

/**
 * Manages user contributions to train and improve AI models
 */
export class ContributionManager {
  private config: KeylessConfig;
  private contributions: Map<string, Contribution> = new Map();

  constructor(config: KeylessConfig) {
    this.config = config;
  }

  /**
   * Initialize the contribution manager
   */
  async initialize(): Promise<void> {
    try {
      console.log("ContributionManager initialized successfully");
    } catch (error) {
      throw new KeylessError(
        "Failed to initialize ContributionManager",
        "CONTRIBUTION_MANAGER_INIT_ERROR",
        error
      );
    }
  }

  /**
   * Add a contribution
   */
  async addContribution(
    userId: string,
    type: string,
    modelId: string,
    data: any,
    pointsEarned: number
  ): Promise<string> {
    const contributionId = this.generateContributionId();

    const contribution: Contribution = {
      id: contributionId,
      userId,
      type: type as ContributionType,
      modelId,
      data,
      pointsEarned,
      status: ContributionStatus.PENDING,
      createdAt: new Date(),
    };

    this.contributions.set(contributionId, contribution);

    // Auto-approve for MVP (in production, this would require review)
    await this.approveContribution(contributionId);

    return contributionId;
  }

  /**
   * Get user contributions
   */
  async getUserContributions(userId: string): Promise<Contribution[]> {
    return Array.from(this.contributions.values())
      .filter((c) => c.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get all contributions
   */
  async getAllContributions(): Promise<Contribution[]> {
    return Array.from(this.contributions.values());
  }

  /**
   * Get contribution by ID
   */
  async getContributionById(
    contributionId: string
  ): Promise<Contribution | null> {
    return this.contributions.get(contributionId) || null;
  }

  /**
   * Approve a contribution
   */
  async approveContribution(contributionId: string): Promise<boolean> {
    const contribution = this.contributions.get(contributionId);
    if (!contribution) return false;

    contribution.status = ContributionStatus.APPROVED;
    this.contributions.set(contributionId, contribution);

    return true;
  }

  /**
   * Reject a contribution
   */
  async rejectContribution(contributionId: string): Promise<boolean> {
    const contribution = this.contributions.get(contributionId);
    if (!contribution) return false;

    contribution.status = ContributionStatus.REJECTED;
    this.contributions.set(contributionId, contribution);

    return true;
  }

  /**
   * Get total contributions count
   */
  async getTotalContributions(): Promise<number> {
    return this.contributions.size;
  }

  /**
   * Get contributions by status
   */
  async getContributionsByStatus(
    status: ContributionStatus
  ): Promise<Contribution[]> {
    return Array.from(this.contributions.values())
      .filter((c) => c.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Get contributions by type
   */
  async getContributionsByType(
    type: ContributionType
  ): Promise<Contribution[]> {
    return Array.from(this.contributions.values())
      .filter((c) => c.type === type)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /**
   * Generate unique contribution ID
   */
  private generateContributionId(): string {
    return `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
