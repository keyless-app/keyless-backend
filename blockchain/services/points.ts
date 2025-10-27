import { ethers } from "ethers";

/**
 * Blockchain service for points management
 */
export class PointsService {
  private provider: ethers.Provider;
  private contract: ethers.Contract;

  constructor(contractAddress: string, abi: any, rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  /**
   * Award points to user
   */
  async awardPoints(
    userAddress: string,
    amount: number,
    reason: string
  ): Promise<string> {
    try {
      const tx = await this.contract.awardPoints(userAddress, amount, reason);
      return tx.hash;
    } catch (error) {
      throw new Error(`Failed to award points: ${error}`);
    }
  }

  /**
   * Deduct points from user
   */
  async deductPoints(
    userAddress: string,
    amount: number,
    reason: string
  ): Promise<string> {
    try {
      const tx = await this.contract.deductPoints(userAddress, amount, reason);
      return tx.hash;
    } catch (error) {
      throw new Error(`Failed to deduct points: ${error}`);
    }
  }

  /**
   * Get user points balance
   */
  async getPointsBalance(userAddress: string): Promise<number> {
    try {
      const balance = await this.contract.getBalance(userAddress);
      return Number(balance);
    } catch (error) {
      throw new Error(`Failed to get points balance: ${error}`);
    }
  }

  /**
   * Get points transaction history
   */
  async getTransactionHistory(
    userAddress: string,
    limit: number = 50
  ): Promise<any[]> {
    try {
      const transactions = await this.contract.getTransactionHistory(
        userAddress,
        limit
      );
      return transactions;
    } catch (error) {
      throw new Error(`Failed to get transaction history: ${error}`);
    }
  }
}
