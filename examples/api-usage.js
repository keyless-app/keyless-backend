/**
 * CollectFi API Usage Examples
 *
 * This example demonstrates how to interact with the CollectFi API
 * using different API keys and endpoints.
 */

const API_BASE_URL = "http://localhost:3000"; // Change to your API URL

// Sample API keys (replace with your actual keys)
const API_KEYS = {
  READ_ONLY: "cf_live_1234567890abcdef",
  TRADING: "cf_live_0987654321fedcba",
  ADMIN: "cf_live_admin_superuser",
};

// Helper function to make API requests
async function makeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": options.apiKey || API_KEYS.READ_ONLY,
    },
    ...options,
  };

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
    console.log("📊 Solana Network:", health.solana.network);
    console.log("🔗 RPC Endpoint:", health.solana.endpoint);
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
  }
}

// Example 2: Get Available Assets
async function getAssets() {
  console.log("\n📦 Fetching available collectibles...");

  try {
    const assets = await makeRequest("/api/assets");
    console.log(`✅ Found ${assets.count} assets:`);

    assets.data.forEach((asset) => {
      console.log(`   🎴 ${asset.name}`);
      console.log(`   💰 Price: ${asset.currentPrice} SOL`);
      console.log(`   📊 Supply: ${asset.totalSupply.toLocaleString()} tokens`);
      console.log(`   🔐 Auth: ${asset.authentication.provider}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Failed to fetch assets:", error.message);
  }
}

// Example 3: Search Assets
async function searchAssets() {
  console.log("\n🔍 Searching for luxury watches under 200 SOL...");

  try {
    const searchResults = await makeRequest(
      "/api/assets/search?category=memorabilia&maxPrice=200"
    );
    console.log(`✅ Found ${searchResults.count} assets matching criteria:`);

    searchResults.data.forEach((asset) => {
      console.log(`   • ${asset.name} - ${asset.currentPrice} SOL`);
    });
  } catch (error) {
    console.error("❌ Search failed:", error.message);
  }
}

// Example 4: Get Market Data
async function getMarketData() {
  console.log("\n📈 Fetching market data...");

  try {
    const marketData = await makeRequest("/api/trading/market-data");
    console.log(`✅ Market data for ${marketData.count} assets:`);

    marketData.data.forEach((data) => {
      console.log(`   📊 Asset: ${data.assetMint}`);
      console.log(`   💰 Current Price: ${data.currentPrice} SOL`);
      console.log(
        `   📈 24h Change: ${data.priceChangePercentage24h > 0 ? "+" : ""}${
          data.priceChangePercentage24h
        }%`
      );
      console.log(`   💎 Volume: ${data.volume24h} SOL`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Failed to fetch market data:", error.message);
  }
}

// Example 5: Get Trending Assets
async function getTrendingAssets() {
  console.log("\n🔥 Fetching trending assets...");

  try {
    const trending = await makeRequest("/api/market/trending?limit=3");
    console.log(`✅ Top ${trending.count} trending assets:`);

    trending.data.forEach((asset, index) => {
      console.log(`   ${index + 1}. ${asset.name} - ${asset.currentPrice} SOL`);
    });
  } catch (error) {
    console.error("❌ Failed to fetch trending assets:", error.message);
  }
}

// Example 6: Get Market Overview
async function getMarketOverview() {
  console.log("\n📊 Fetching market overview...");

  try {
    const overview = await makeRequest("/api/market/overview");
    console.log("✅ Market Overview:");
    console.log(`   🎴 Total Assets: ${overview.data.totalAssets}`);
    console.log(
      `   💰 Total Market Cap: ${(overview.data.totalMarketCap / 1e6).toFixed(
        2
      )}M SOL`
    );
    console.log(`   📈 Total 24h Volume: ${overview.data.totalVolume24h} SOL`);
    console.log(
      `   📊 Average 24h Change: ${overview.data.averagePriceChange24h.toFixed(
        2
      )}%`
    );
  } catch (error) {
    console.error("❌ Failed to fetch market overview:", error.message);
  }
}

// Example 7: Place Trading Order (requires trading API key)
async function placeOrder() {
  console.log("\n📝 Placing trading order...");

  try {
    const orderData = {
      assetMint: "ROLEXDAYTONA1mintaddress123456789",
      side: "buy",
      quantity: 1000,
      price: 180,
      type: "limit",
    };

    const order = await makeRequest("/api/trading/place-order", {
      method: "POST",
      body: JSON.stringify(orderData),
      apiKey: API_KEYS.TRADING,
    });

    console.log("✅ Order placed successfully:");
    console.log(`   🆔 Order ID: ${order.data.orderId}`);
    console.log(`   📊 Type: ${order.data.type}`);
    console.log(`   📈 Side: ${order.data.side}`);
    console.log(`   💰 Price: ${order.data.price} SOL`);
    console.log(`   📦 Quantity: ${order.data.quantity}`);
  } catch (error) {
    console.error("❌ Failed to place order:", error.message);
  }
}

// Example 8: Get Portfolio (requires user wallet address)
async function getPortfolio(walletAddress) {
  console.log(`\n💼 Fetching portfolio for ${walletAddress}...`);

  try {
    const portfolio = await makeRequest(`/api/portfolio/${walletAddress}`);
    console.log("✅ Portfolio Details:");
    console.log(`   💰 Total Value: ${portfolio.data.totalValue} SOL`);
    console.log(
      `   📊 24h P&L: ${portfolio.data.pnl24h > 0 ? "+" : ""}${
        portfolio.data.pnl24h
      } SOL`
    );
    console.log(
      `   📈 7-day P&L: ${portfolio.data.pnl7d > 0 ? "+" : ""}${
        portfolio.data.pnl7d
      } SOL`
    );
    console.log(`   🎴 Assets: ${portfolio.data.assets.length}`);
  } catch (error) {
    console.error("❌ Failed to fetch portfolio:", error.message);
  }
}

// Example 9: Get Vault Information
async function getVaultInfo(assetId) {
  console.log(`\n🏦 Fetching vault info for asset ${assetId}...`);

  try {
    const vaultInfo = await makeRequest(`/api/vault/${assetId}`);
    console.log("✅ Vault Information:");
    console.log(`   🆔 Vault ID: ${vaultInfo.data.vaultId}`);
    console.log(`   📍 Location: ${vaultInfo.data.location}`);
    console.log(`   🌡️ Temperature: ${vaultInfo.data.temperature}°C`);
    console.log(`   💧 Humidity: ${vaultInfo.data.humidity}%`);
    console.log(`   🔒 Security Level: ${vaultInfo.data.securityLevel}`);
  } catch (error) {
    console.error("❌ Failed to fetch vault info:", error.message);
  }
}

// Main function to run all examples
async function runExamples() {
  console.log("🚀 CollectFi API Examples\n");
  console.log("=".repeat(50));

  try {
    // Run examples in sequence
    await checkHealth();
    await getAssets();
    await searchAssets();
    await getMarketData();
    await getTrendingAssets();
    await getMarketOverview();

    // These examples require specific conditions
    // await placeOrder(); // Requires trading API key
    // await getPortfolio('TestWallet123'); // Requires valid wallet address
    // await getVaultInfo('rolex-daytona-panda-1'); // Requires valid asset ID

    console.log("\n🎉 All examples completed successfully!");
    console.log("\n💡 Next steps:");
    console.log("   • Try different API keys for different permissions");
    console.log("   • Explore more endpoints and parameters");
    console.log("   • Build your own trading application");
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
  getAssets,
  searchAssets,
  getMarketData,
  getTrendingAssets,
  getMarketOverview,
  placeOrder,
  getPortfolio,
  getVaultInfo,
};
