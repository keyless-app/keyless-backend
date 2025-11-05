import {
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SolanaConfig, KeylessError } from "../../src/types";

/**
 * Solana Blockchain Service
 * 
 * Handles Solana blockchain interactions:
 * - Token balance queries
 * - Transaction verification
 * - Wallet address validation
 */
export class SolanaService {
  private connection: Connection;
  private config: SolanaConfig;

  constructor(config: SolanaConfig) {
    this.config = config;
    this.connection = new Connection(config.rpcUrl, "confirmed");
  }

  /**
   * Validate Solana wallet address
   */
  validateWalletAddress(address: string): boolean {
    try {
      const pubkey = new PublicKey(address);
      return PublicKey.isOnCurve(pubkey.toBytes());
    } catch {
      return false;
    }
  }

  /**
   * Get $KEY token balance for a wallet
   */
  async getKeyBalance(walletAddress: string): Promise<number> {
    try {
      const wallet = new PublicKey(walletAddress);
      const keyMint = new PublicKey(this.config.keyTokenMint);

      const tokenAccount = await getAssociatedTokenAddress(
        keyMint,
        wallet
      );

      try {
        const accountInfo = await getAccount(
          this.connection,
          tokenAccount,
          "confirmed"
        );
        return Number(accountInfo.amount) / 1e9; // Convert from lamports to tokens
      } catch {
        // Token account doesn't exist, balance is 0
        return 0;
      }
    } catch (error) {
      throw new KeylessError(
        `Failed to get $KEY balance: ${error}`,
        "BALANCE_QUERY_ERROR",
        error
      );
    }
  }

  /**
   * Get USDC balance for a wallet
   */
  async getUsdcBalance(walletAddress: string): Promise<number> {
    try {
      const wallet = new PublicKey(walletAddress);
      const usdcMint = new PublicKey(this.config.usdcMint);

      const tokenAccount = await getAssociatedTokenAddress(
        usdcMint,
        wallet
      );

      try {
        const accountInfo = await getAccount(
          this.connection,
          tokenAccount,
          "confirmed"
        );
        return Number(accountInfo.amount) / 1e6; // USDC has 6 decimals
      } catch {
        // Token account doesn't exist, balance is 0
        return 0;
      }
    } catch (error) {
      throw new KeylessError(
        `Failed to get USDC balance: ${error}`,
        "BALANCE_QUERY_ERROR",
        error
      );
    }
  }

  /**
   * Get SOL balance for a wallet
   */
  async getSolBalance(walletAddress: string): Promise<number> {
    try {
      const wallet = new PublicKey(walletAddress);
      const balance = await this.connection.getBalance(wallet);
      return balance / 1e9; // Convert lamports to SOL
    } catch (error) {
      throw new KeylessError(
        `Failed to get SOL balance: ${error}`,
        "BALANCE_QUERY_ERROR",
        error
      );
    }
  }

  /**
   * Verify a transaction on Solana
   */
  async verifyTransaction(transactionHash: string): Promise<boolean> {
    try {
      const transaction = await this.connection.getTransaction(transactionHash, {
        maxSupportedTransactionVersion: 0,
      });
      return transaction !== null;
    } catch {
      return false;
    }
  }

  /**
   * Get connection
   */
  getConnection(): Connection {
    return this.connection;
  }
}

