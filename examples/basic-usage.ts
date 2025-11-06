/**
 * Basic Usage Example for Keyless SDK
 *
 * This example demonstrates how to:
 * - Initialize the Keyless platform
 * - Use Solana wallet authentication
 * - Generate AI content (for Spenders)
 * - Add contributions to earn $KEY (for Contributors)
 * - Check points and $KEY balances
 */

import { Keyless, DEFAULT_CONFIG, UserType, AITool } from "../src";

async function main() {
  try {
    console.log("🚀 Initializing Keyless SDK...");
    console.log("📦 Package: @keyless-app/keyless-backend");
    console.log("🔗 npm: https://www.npmjs.com/package/@keyless-app/keyless-backend");
    console.log("=".repeat(50));

    // Initialize Keyless platform
    const keyless = new Keyless(DEFAULT_CONFIG);
    await keyless.initialize();

    console.log("✅ Keyless platform initialized successfully!");
    console.log("");

    // Example 1: Create a Spender user
    console.log("👤 Example 1: Creating Spender user...");
    const spenderWallet = "YourSpenderWalletAddress123456789";
    const spenderUser = {
      id: "spender_001",
      solanaWalletAddress: spenderWallet,
      userType: UserType.SPENDER,
      pointsBalance: 1000, // Purchased with USDC
      keyBalance: 0,
      contributions: 0,
      contributionsHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await keyless.addUser(spenderUser);
    console.log(`✅ Spender user created: ${spenderWallet}`);
    console.log(`   Points Balance: ${spenderUser.pointsBalance}`);
    console.log("");

    // Example 2: Generate AI content (Spender)
    console.log("✍️ Example 2: Generating text content...");
    try {
      const textResult = await keyless.generateAI(
        "spender_001",
        AITool.TEXT_GENERATION,
        "Write a short story about an AI assistant helping developers build on Solana",
        {
          maxTokens: 500,
          temperature: 0.7,
        }
      );
      console.log("✅ Text generated successfully!");
      console.log(`   Preview: ${textResult.text.substring(0, 100)}...`);
      console.log(`   Points spent: 5`);
    } catch (error) {
      console.error("❌ Failed to generate text:", error);
    }
    console.log("");

    // Example 3: Check points balance
    console.log("💰 Example 3: Checking points balance...");
    const pointsBalance = await keyless.getUserPoints("spender_001");
    console.log(`✅ Points Balance: ${pointsBalance}`);
    console.log("");

    // Example 4: Create a Contributor user
    console.log("👤 Example 4: Creating Contributor user...");
    const contributorWallet = "YourContributorWalletAddress987654321";
    const contributorUser = {
      id: "contributor_001",
      solanaWalletAddress: contributorWallet,
      userType: UserType.CONTRIBUTOR,
      pointsBalance: 0,
      keyBalance: 0, // Will earn $KEY from contributions
      contributions: 0,
      contributionsHistory: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await keyless.addUser(contributorUser);
    console.log(`✅ Contributor user created: ${contributorWallet}`);
    console.log(`   $KEY Balance: ${contributorUser.keyBalance}`);
    console.log("");

    // Example 5: Add contribution (Contributor earns $KEY)
    console.log("📝 Example 5: Adding contribution to earn $KEY...");
    try {
      const contributionId = await keyless.addContribution(
        "contributor_001",
        "training_data",
        "model_001",
        {
          prompt: "What is Solana?",
          response: "Solana is a high-performance blockchain platform designed for decentralized applications and crypto projects.",
        },
        50 // $KEY tokens earned
      );
      console.log("✅ Contribution added successfully!");
      console.log(`   Contribution ID: ${contributionId}`);
      console.log(`   $KEY Earned: 50`);
      console.log("   💡 $KEY tokens will be paid out from Rewards Treasury");
    } catch (error) {
      console.error("❌ Failed to add contribution:", error);
    }
    console.log("");

    // Example 6: Get user statistics
    console.log("📊 Example 6: Getting user statistics...");
    try {
      const userStats = await keyless.getUserStats("spender_001");
      if (userStats) {
        console.log("✅ User Statistics:");
        console.log(`   User Type: ${userStats.userType}`);
        console.log(`   Points Balance: ${userStats.totalPoints}`);
        console.log(`   Points Spent: ${userStats.pointsSpent}`);
        console.log(`   Generations: ${userStats.generations}`);
        console.log(`   Favorite Tool: ${userStats.favoriteTool}`);
      }
    } catch (error) {
      console.error("❌ Failed to get user stats:", error);
    }
    console.log("");

    // Example 7: Get platform statistics
    console.log("🌐 Example 7: Getting platform statistics...");
    try {
      const platformStats = await keyless.getPlatformStats();
      console.log("✅ Platform Statistics:");
      console.log(`   Total Users: ${platformStats.totalUsers}`);
      console.log(`   Spenders: ${platformStats.totalSpenders}`);
      console.log(`   Contributors: ${platformStats.totalContributors}`);
      console.log(`   Total USDC Received: $${platformStats.totalUsdcReceived}`);
      console.log(`   Total $KEY Purchased: ${platformStats.totalKeyPurchased}`);
      console.log(`   Total $KEY Distributed: ${platformStats.totalKeyDistributed}`);
      console.log(`   Total Generations: ${platformStats.totalGenerations}`);
    } catch (error) {
      console.error("❌ Failed to get platform stats:", error);
    }
    console.log("");

    // Example 8: The Revenue-to-Buyback Flywheel
    console.log("🎯 Example 8: The Revenue-to-Buyback Flywheel");
    console.log("   1. Spenders pay USDC (SPL) → Purchase Points → Use API");
    console.log("   2. Buyback automatically swaps USDC → $KEY via Jupiter/Raydium");
    console.log("   3. $KEY goes to Rewards Treasury");
    console.log("   4. Contributors earn $KEY for training models");
    console.log("   All powered by Solana's near-instant, low-cost transactions!");
    console.log("");

    console.log("🎉 All examples completed successfully!");
    console.log("");
    console.log("💡 Next steps:");
    console.log("   • Connect your Solana wallet (Phantom, Solflare)");
    console.log("   • Purchase Points with USDC to use the API");
    console.log("   • Contribute training data to earn $KEY tokens");
    console.log("   • Explore the Revenue-to-Buyback Flywheel");
    console.log("");
    console.log("🔗 Learn more: https://github.com/keyless-app/keyless-backend");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run the example
main();
