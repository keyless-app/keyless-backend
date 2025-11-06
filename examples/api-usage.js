/**
 * Keyless API Usage Examples
 *
 * This example demonstrates how to interact with the Keyless API
 * using Solana wallet addresses for authentication.
 */

const API_BASE_URL = "http://localhost:3000"; // Change to your API URL

// Sample Solana wallet addresses (replace with your actual wallet addresses)
const WALLET_ADDRESSES = {
  SPENDER: "YourSpenderWalletAddress123456789", // Spender wallet (pays USDC for Points)
  CONTRIBUTOR: "YourContributorWalletAddress987654321", // Contributor wallet (earns $KEY)
};

// Helper function to make API requests
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Wallet-Address": options.walletAddress || WALLET_ADDRESSES.SPENDER,
    },
    ...options,
  };

  // Remove walletAddress from options before passing to fetch
  delete config.walletAddress;

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API Error: ${data.message || response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
    throw error;
  }
}

// Example 1: Health Check (no auth required)
async function checkHealth() {
  console.log("🔍 Checking API health...");

  try {
    const health = await makeRequest("/health");
    console.log("✅ API Status:", health.status);
    console.log("📊 Service:", health.service);
    console.log("🔗 Version:", health.version);
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
  }
}

// Example 2: Get Points Balance (for Spenders)
async function getPointsBalance() {
  console.log("\n💰 Fetching points balance...");

  try {
    const balance = await makeRequest("/api/points/balance", {
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });
    console.log("✅ Points Balance:", balance.data.balance);
    console.log("💡 Use points to generate AI content");
  } catch (error) {
    console.error("❌ Failed to fetch points balance:", error.message);
  }
}

// Example 3: Get Points Transactions
async function getPointsTransactions() {
  console.log("\n📜 Fetching points transactions...");

  try {
    const transactions = await makeRequest("/api/points/transactions", {
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });
    console.log(`✅ Found ${transactions.count} transactions:`);

    transactions.data.slice(0, 5).forEach((tx) => {
      console.log(`   ${tx.type}: ${tx.amount} points - ${tx.description}`);
      if (tx.usdcAmount) {
        console.log(`      USDC: $${tx.usdcAmount}`);
      }
    });
  } catch (error) {
    console.error("❌ Failed to fetch transactions:", error.message);
  }
}

// Example 4: Generate Text Content
async function generateText() {
  console.log("\n✍️ Generating text content...");

  try {
    const result = await makeRequest("/api/generation/text", {
      method: "POST",
      body: JSON.stringify({
        prompt: "Write a short story about an AI assistant helping developers",
        config: {
          maxTokens: 500,
          temperature: 0.7,
        },
      }),
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });

    console.log("✅ Text Generated:");
    console.log(`   ${result.data.text.substring(0, 200)}...`);
    console.log(`   💰 Cost: 5 points`);
  } catch (error) {
    console.error("❌ Failed to generate text:", error.message);
  }
}

// Example 5: Generate Image
async function generateImage() {
  console.log("\n🎨 Generating image...");

  try {
    const result = await makeRequest("/api/generation/image", {
      method: "POST",
      body: JSON.stringify({
        prompt: "A futuristic AI city at sunset",
        config: {
          width: 1024,
          height: 1024,
        },
      }),
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });

    console.log("✅ Image Generated:");
    console.log(`   Images: ${result.data.images.length}`);
    console.log(`   💰 Cost: 8 points per image`);
  } catch (error) {
    console.error("❌ Failed to generate image:", error.message);
  }
}

// Example 6: Generate Code
async function generateCode() {
  console.log("\n💻 Generating code...");

  try {
    const result = await makeRequest("/api/generation/code", {
      method: "POST",
      body: JSON.stringify({
        prompt: "Create a REST API endpoint in TypeScript",
        config: {
          language: "typescript",
        },
      }),
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });

    console.log("✅ Code Generated:");
    console.log(`   Language: ${result.data.language}`);
    console.log(`   💰 Cost: 6 points`);
  } catch (error) {
    console.error("❌ Failed to generate code:", error.message);
  }
}

// Example 7: Add Contribution (for Contributors - earns $KEY)
async function addContribution() {
  console.log("\n📝 Adding contribution to earn $KEY...");

  try {
    const result = await makeRequest("/api/contributions", {
      method: "POST",
      body: JSON.stringify({
        type: "training_data",
        modelId: "model_001",
        data: {
          prompt: "What is Solana?",
          response: "Solana is a high-performance blockchain platform designed for decentralized applications.",
        },
        keyEarned: 50, // $KEY tokens earned
      }),
      walletAddress: WALLET_ADDRESSES.CONTRIBUTOR,
    });

    console.log("✅ Contribution added successfully:");
    console.log(`   🆔 Contribution ID: ${result.data.contributionId}`);
    console.log(`   💰 $KEY Earned: ${result.keyEarned}`);
    console.log("   💡 $KEY tokens will be paid out from Rewards Treasury");
  } catch (error) {
    console.error("❌ Failed to add contribution:", error.message);
  }
}

// Example 8: Get User Contributions
async function getUserContributions() {
  console.log("\n📚 Fetching user contributions...");

  try {
    const contributions = await makeRequest("/api/contributions", {
      walletAddress: WALLET_ADDRESSES.CONTRIBUTOR,
    });

    console.log(`✅ Found ${contributions.count} contributions:`);

    contributions.data.slice(0, 3).forEach((contrib) => {
      console.log(`   ${contrib.type}: ${contrib.keyEarned} $KEY - ${contrib.status}`);
      console.log(`      Created: ${new Date(contrib.createdAt).toLocaleDateString()}`);
    });
  } catch (error) {
    console.error("❌ Failed to fetch contributions:", error.message);
  }
}

// Example 9: Get User Statistics
async function getUserStats() {
  console.log("\n📊 Fetching user statistics...");

  try {
    const stats = await makeRequest("/api/stats/user", {
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });

    console.log("✅ User Statistics:");
    console.log(`   👤 User Type: ${stats.data.userType}`);
    console.log(`   💰 Points Balance: ${stats.data.totalPoints}`);
    if (stats.data.keyBalance) {
      console.log(`   🔑 $KEY Balance: ${stats.data.keyBalance}`);
    }
    console.log(`   📈 Points Spent: ${stats.data.pointsSpent}`);
    console.log(`   🎨 Generations: ${stats.data.generations}`);
    console.log(`   📝 Contributions: ${stats.data.contributions}`);
  } catch (error) {
    console.error("❌ Failed to fetch user stats:", error.message);
  }
}

// Example 10: Get Platform Statistics
async function getPlatformStats() {
  console.log("\n🌐 Fetching platform statistics...");

  try {
    const stats = await makeRequest("/api/stats/platform");

    console.log("✅ Platform Statistics:");
    console.log(`   👥 Total Users: ${stats.data.totalUsers}`);
    console.log(`   💳 Spenders: ${stats.data.totalSpenders}`);
    console.log(`   🎓 Contributors: ${stats.data.totalContributors}`);
    console.log(`   💰 Total USDC Received: $${stats.data.totalUsdcReceived}`);
    console.log(`   🔑 Total $KEY Purchased: ${stats.data.totalKeyPurchased}`);
    console.log(`   🎁 Total $KEY Distributed: ${stats.data.totalKeyDistributed}`);
    console.log(`   📊 Total Generations: ${stats.data.totalGenerations}`);
  } catch (error) {
    console.error("❌ Failed to fetch platform stats:", error.message);
  }
}

// Example 11: Purchase Points (Spenders - requires USDC payment)
async function purchasePoints() {
  console.log("\n💳 Purchasing points with USDC...");

  try {
    const result = await makeRequest("/api/payment/purchase", {
      method: "POST",
      body: JSON.stringify({
        usdcAmount: 10.0, // $10 USDC
      }),
      walletAddress: WALLET_ADDRESSES.SPENDER,
    });

    console.log("✅ Points purchased successfully:");
    console.log(`   💰 USDC Paid: $${result.usdcAmount}`);
    console.log(`   🎯 Points Credited: ${result.pointsCredited}`);
    console.log(`   🔑 $KEY Purchased (via buyback): ${result.keyPurchased}`);
    console.log(`   📝 Transaction: ${result.transactionHash}`);
    console.log("   💡 Buyback automatically swapped USDC → $KEY");
  } catch (error) {
    console.error("❌ Failed to purchase points:", error.message);
    console.log("   💡 Note: This requires actual USDC payment on Solana");
  }
}

// Main function to run all examples
async function runExamples() {
  console.log("🚀 Keyless API Examples\n");
  console.log("=".repeat(50));
  console.log("📦 Package: @keyless/keyless-api");
  console.log("🔗 npm: https://www.npmjs.com/package/@keyless/keyless-api");
  console.log("=".repeat(50));

  try {
    // Run examples in sequence
    await checkHealth();
    await getPointsBalance();
    await getPointsTransactions();
    await generateText();
    await generateImage();
    await generateCode();
    await addContribution();
    await getUserContributions();
    await getUserStats();
    await getPlatformStats();

    // This example requires actual USDC payment on Solana
    // await purchasePoints();

    console.log("\n🎉 All examples completed successfully!");
    console.log("\n💡 Next steps:");
    console.log("   • Connect your Solana wallet (Phantom, Solflare)");
    console.log("   • Purchase Points with USDC to use the API");
    console.log("   • Contribute training data to earn $KEY tokens");
    console.log("   • Explore the Revenue-to-Buyback Flywheel");
    console.log("\n🔗 Learn more: https://github.com/keyless/keyless-api");
  } catch (error) {
    console.error("\n❌ Examples failed:", error.message);
  }
}

// Run examples if this file is executed directly
if (typeof require !== "undefined" && require.main === module) {
  runExamples();
}

// Export functions for use in other modules
module.exports = {
  makeRequest,
  checkHealth,
  getPointsBalance,
  getPointsTransactions,
  generateText,
  generateImage,
  generateCode,
  addContribution,
  getUserContributions,
  getUserStats,
  getPlatformStats,
  purchasePoints,
};
