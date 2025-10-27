/**
 * Basic Usage Example for CollectFi SDK
 *
 * This example demonstrates how to:
 * - Initialize the CollectFi platform
 * - Connect a wallet
 * - Get available assets
 * - View asset details
 * - Get market data
 * - Check user portfolio
 */

import { Connection } from "@solana/web3.js";
import { CollectFi, DEFAULT_CONFIG } from "../src";

async function main() {
  try {
    console.log("🚀 Initializing CollectFi SDK...");

    // Create Solana connection
    const connection = new Connection(DEFAULT_CONFIG.rpcEndpoint, "confirmed");

    // Initialize CollectFi platform
    const collectFi = new CollectFi(connection, DEFAULT_CONFIG);
    await collectFi.initialize();

    console.log("✅ CollectFi platform initialized successfully!");

    // Get wallet instance
    const wallet = collectFi.getWallet();

    // Connect wallet (in production, this would connect to Phantom/Backpack/etc.)
    console.log("🔗 Connecting wallet...");
    await wallet.connect();

    if (wallet.isConnected()) {
      console.log(`✅ Wallet connected: ${wallet.getAddress()}`);

      // Get wallet information
      const walletInfo = await wallet.getWalletInfo();
      if (walletInfo) {
        console.log(`💰 SOL Balance: ${walletInfo.balance} SOL`);
        console.log(`🎯 Wallet Type: ${walletInfo.walletType}`);
        console.log(
          `🔑 Token Holdings: ${walletInfo.tokens.length} different tokens`
        );
      }
    } else {
      console.log("⚠️  Wallet not connected, using demo mode");
    }

    // Get available collectible assets
    console.log("\n📦 Fetching available collectibles...");
    const assets = await collectFi.getAvailableAssets();

    console.log(`✅ Found ${assets.length} collectible assets:`);

    for (const asset of assets) {
      console.log(`\n🎴 ${asset.name}`);
      console.log(`   📍 Category: ${asset.category}`);
      console.log(`   💎 Rarity: ${asset.metadata.rarity}`);
      console.log(`   🏷️  Current Price: ${asset.currentPrice} SOL`);
      console.log(
        `   📊 Total Supply: ${asset.totalSupply.toLocaleString()} tokens`
      );
      console.log(
        `   🔐 Authentication: ${asset.authentication.provider} ${asset.authentication.grade}`
      );
      console.log(
        `   🏦 Storage: ${asset.storage.location} (${asset.storage.securityLevel})`
      );
      console.log(
        `   🛡️  Insurance: ${
          asset.insurance.provider
        } - $${asset.insurance.coverageAmount.toLocaleString()}`
      );
    }

    // Get market data for first asset
    if (assets.length > 0) {
      const firstAsset = assets[0];
      console.log(`\n📈 Market Data for ${firstAsset.name}:`);

      const marketData = await collectFi.getMarketData(firstAsset.mint);
      if (marketData) {
        console.log(`   💰 Current Price: ${marketData.currentPrice} SOL`);
        console.log(
          `   📊 24h Change: ${marketData.priceChange24h > 0 ? "+" : ""}${
            marketData.priceChange24h
          } SOL (${marketData.priceChangePercentage24h > 0 ? "+" : ""}${
            marketData.priceChangePercentage24h
          }%)`
        );
        console.log(`   📈 24h High: ${marketData.high24h} SOL`);
        console.log(`   📉 24h Low: ${marketData.low24h} SOL`);
        console.log(`   💎 24h Volume: ${marketData.volume24h} SOL`);
        console.log(
          `   🏦 Market Cap: ${(marketData.marketCap / 1e6).toFixed(2)}M SOL`
        );
      }
    }

    // Get platform statistics
    console.log("\n📊 Platform Statistics:");
    const platformStats = await collectFi.getPlatformStats();
    console.log(`   🎴 Total Assets: ${platformStats.totalAssets}`);
    console.log(`   👥 Total Users: ${platformStats.totalUsers}`);
    console.log(`   💰 24h Volume: ${platformStats.totalVolume24h} SOL`);
    console.log(
      `   🏦 Total Market Cap: ${(platformStats.totalMarketCap / 1e6).toFixed(
        2
      )}M SOL`
    );
    console.log(
      `   🚀 Active Traders (24h): ${platformStats.activeTraders24h}`
    );
    console.log(`   📦 Total Redemptions: ${platformStats.totalRedemptions}`);

    // Get trending assets
    console.log("\n🔥 Trending Assets:");
    const trendingAssets = await collectFi.getTrendingAssets(3);
    for (let i = 0; i < trendingAssets.length; i++) {
      const asset = trendingAssets[i];
      console.log(`   ${i + 1}. ${asset.name} - ${asset.currentPrice} SOL`);
    }

    // Search assets by criteria
    console.log("\n🔍 Searching for luxury watches under 200 SOL:");
    const searchResults = await collectFi.searchAssets({
      category: "memorabilia",
      maxPrice: 200,
    });

    console.log(`   Found ${searchResults.length} assets matching criteria:`);
    searchResults.forEach((asset) => {
      console.log(`      • ${asset.name} - ${asset.currentPrice} SOL`);
    });

    // Get price history for first asset
    if (assets.length > 0) {
      const firstAsset = assets[0];
      console.log(`\n📊 Price History for ${firstAsset.name} (7 days):`);

      const priceHistory = await collectFi.getAssetPriceHistory(
        firstAsset.mint,
        "7d"
      );
      if (priceHistory.length > 0) {
        const oldestPrice = priceHistory[0].price;
        const newestPrice = priceHistory[priceHistory.length - 1].price;
        const change = newestPrice - oldestPrice;
        const changePercent = (change / oldestPrice) * 100;

        console.log(
          `   📅 7-day price change: ${change > 0 ? "+" : ""}${change.toFixed(
            2
          )} SOL (${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%)`
        );
        console.log(`   📈 Data points: ${priceHistory.length}`);
      }
    }

    // Check user portfolio (if wallet is connected)
    if (wallet.isConnected()) {
      const walletAddress = wallet.getAddress()!;
      console.log(`\n💼 Portfolio for ${walletAddress}:`);

      const portfolio = await collectFi.getUserPortfolio(walletAddress);
      if (portfolio) {
        console.log(`   💰 Total Value: ${portfolio.totalValue} SOL`);
        console.log(
          `   📊 24h P&L: ${portfolio.pnl24h > 0 ? "+" : ""}${
            portfolio.pnl24h
          } SOL`
        );
        console.log(
          `   📈 7-day P&L: ${portfolio.pnl7d > 0 ? "+" : ""}${
            portfolio.pnl7d
          } SOL`
        );
        console.log(`   🎴 Assets: ${portfolio.assets.length}`);

        for (const asset of portfolio.assets) {
          console.log(
            `      • ${asset.assetId}: ${asset.quantity} tokens (${
              asset.pnl > 0 ? "+" : ""
            }${asset.pnl.toFixed(2)} SOL)`
          );
        }
      } else {
        console.log(
          "   📭 No portfolio found - start trading to build your collection!"
        );
      }
    }

    // Get vault information
    if (assets.length > 0) {
      const firstAsset = assets[0];
      console.log(`\n🏦 Vault Information for ${firstAsset.name}:`);

      const vaultInfo = await collectFi.getVaultInfo(firstAsset.id);
      if (vaultInfo) {
        console.log(`   🆔 Vault ID: ${vaultInfo.vaultId}`);
        console.log(`   📍 Location: ${vaultInfo.location}`);
        console.log(`   🌡️  Temperature: ${vaultInfo.temperature}°C`);
        console.log(`   💧 Humidity: ${vaultInfo.humidity}%`);
        console.log(`   🔒 Security Level: ${vaultInfo.securityLevel}`);
        console.log(
          `   🔍 Last Inspection: ${vaultInfo.lastInspection.toLocaleDateString()}`
        );
        console.log(
          `   📅 Next Inspection: ${vaultInfo.nextInspection.toLocaleDateString()}`
        );
      }
    }

    console.log("\n🎉 CollectFi SDK demo completed successfully!");
    console.log("\n💡 Next steps:");
    console.log("   • Explore more assets and market data");
    console.log("   • Place trading orders (buy/sell tokens)");
    console.log("   • Monitor your portfolio performance");
    console.log("   • Request redemption when you own 100% of tokens");
  } catch (error) {
    console.error("❌ Error running CollectFi SDK demo:", error);

    if (error instanceof Error) {
      console.error("   Error message:", error.message);
      console.error("   Stack trace:", error.stack);
    }
  }
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

export { main };
