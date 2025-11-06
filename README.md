# Keyless - AI Generation Platform (Solana-based)

[![npm version](https://img.shields.io/npm/v/@keyless/keyless-api.svg)](https://www.npmjs.com/package/@keyless/keyless-api)
[![npm downloads](https://img.shields.io/npm/dm/@keyless/keyless-api.svg)](https://www.npmjs.com/package/@keyless/keyless-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


> **Train AI models. Earn $KEY. Generate without limits. Powered by Solana.**

An AI platform powered by Solana's high-speed, low-cost blockchain. The first AI platform with a real-time, transparent buyback mechanism powered by Solana's speed.

**📦 Available on npm:** [@keyless/keyless-api](https://www.npmjs.com/package/@keyless/keyless-api)

## 🎯 What is Keyless?

Keyless is an AI generation platform that democratizes access to AI content creation through a **Revenue-to-Buyback Flywheel** powered by Solana:

### The Flywheel

**Revenue** → **Spenders** (developers) pay in USDC (SPL) to purchase "Points" for API access

**Buyback** → A large portion of that USDC is immediately swapped for $KEY (SPL) on a Solana DEX (Jupiter/Raydium)

**Reward** → Purchased $KEY is sent to the "Contributor Rewards Treasury"

**Distribution** → **Contributors** (users training models) earn $KEY from this treasury

This flywheel is highly efficient on Solana, as the buyback swaps are near-instant and cost fractions of a cent.

### Two User Types

- **Spenders**: Developers who pay USDC (SPL) to purchase "Points" and use the AI API
- **Contributors**: Users who train models and earn $KEY tokens from the Rewards Treasury

### Key Features

- **Solana Wallet Authentication**: Connect your Phantom, Solflare, or any Solana wallet
- **Pay-as-you-go**: No credit cards, no monthly subscriptions—just USDC
- **Transparent Buyback**: All buyback transactions are on-chain and visible
- **Fast & Cheap**: Powered by Solana's speed and low fees

## 🚀 Key Features

### For Spenders: Pay-as-you-go AI API

Purchase Points with USDC (SPL) and use them to generate AI content:

- **Text Generation** (5 points): Create articles, stories, summaries, and more
- **Image Generation** (8 points): Generate images from text descriptions
- **Code Generation** (6 points): Generate code snippets, functions, and programs
- **Audio Generation** (10 points): Create audio content and speech synthesis
- **Data Analysis** (6 points): Analyze data and generate insights
- **Search & Research** (6 points): Search and research topics with AI

**Price**: 1 Point = $0.001 USDC (e.g., 1000 points = $1 USDC)

### For Contributors: Train AI & Earn $KEY

Earn $KEY tokens by contributing to improve AI models:

- Provide training data (prompt/response pairs)
- Submit feedback on AI outputs
- Annotate data for model training
- Evaluate model performance
- Suggest improvements

**Reward**: $KEY tokens are paid out from the Rewards Treasury (funded by buyback)

### Core Infrastructure

- **REST API**: Comprehensive HTTP endpoints for all operations
- **Wallet Authentication**: Secure access using wallet address
- **Rate Limiting**: Protection against abuse
- **Points Management**: Track earnings, spending, and balance
- **Generation History**: Keep track of all AI generations
- **Platform Statistics**: Monitor usage and contributions

## 🏗️ Architecture

### Current Directory Structure

```
keyless/
├── src/                    # Main TypeScript Application
│   ├── core/              # Core business logic (Keyless, PointsManager, etc.)
│   ├── routes/            # API routes (generation, contributions, points, stats)
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utilities
│   ├── types/             # TypeScript types
│   └── config.ts          # Configuration
│
├── ai-services/           # Python AI Services (FastAPI)
│   ├── text_generation/   # Text generation service
│   └── shared/            # Shared Python modules
│
├── blockchain/            # Blockchain integration
│   └── services/          # Blockchain services
│
├── shared/                # Shared TypeScript types
│   └── types/
│
├── docs/                  # Documentation
└── examples/             # Example code
```

### Architecture Layers

#### 1. **Backend Layer (TypeScript)**

- **Express.js REST API** for HTTP requests
- **Authentication & Authorization** via JWT + Wallet ID
- **Points Management** and transaction tracking
- **Request routing** to Python AI services
- **Business logic** orchestration

#### 2. **AI Services Layer (Python)**

- **FastAPI** microservices for each AI capability
- **Text Generation**: GPT-4, Claude integration
- **Image Generation**: DALL-E, Stable Diffusion
- **Code Generation**: Codex, Copilot
- **Audio Generation**: Whisper, ElevenLabs
- **Data Analysis**: Custom ML models
- **Model Training**: Retraining with contributions

#### 3. **Solana Blockchain Layer**

- **Solana Program** for payment/buyback automation
- **$KEY SPL Token** on Solana mainnet
- **USDC (SPL)** payments from Spenders
- **Jupiter/Raydium** for USDC → $KEY swaps
- **Transparent buyback** transactions on-chain
- **Solana wallet** authentication (Phantom, Solflare, etc.)

#### 4. **Database Layer**

- **PostgreSQL** for structured data
- **Redis** for caching
- **Migrations** for schema management

For complete structure details, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) and [docs/architecture.md](docs/architecture.md).

## 📦 Installation

### Install from npm (Recommended)

The package is available on npm: **[@keyless/keyless-api](https://www.npmjs.com/package/@keyless/keyless-api)**

```bash
npm install @keyless/keyless-api
```

### Install from source

```bash
git clone https://github.com/keyless/keyless-api.git
cd keyless-api
npm install
```

## 🔧 Quick Start

### 1. Environment Setup

```bash
cp env.example .env
# Edit .env with your configuration
```

Required environment variables:

```env
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*

# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_NETWORK=mainnet-beta
KEY_TOKEN_MINT=your-key-token-mint-address
USDC_MINT=usd-key-here
REWARDS_TREASURY_WALLET=your-rewards-treasury-wallet
JUPITER_API_URL=https://quote-api.jup.ag/v6
POINTS_PRICE_USDC=0.001

# Optional: AI service configurations
TEXT_GENERATION_MODEL=gpt-4
IMAGE_GENERATION_MODEL=dall-e-3
CODE_GENERATION_MODEL=gpt-4
AUDIO_GENERATION_MODEL=whisper
```

### 2. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### 3. Solana Wallet Authentication

All API endpoints require a valid Solana wallet address in the `X-Wallet-Address` header:

```bash
curl -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
     https://{BASE_URL}/health
```

**Supported Wallets**: Phantom, Solflare, or any Solana wallet

## 🔑 API Endpoints

### Health Check

- `GET /health` - Service health status (no auth required)

### AI Generation

- `POST /api/generation/text` - Generate text content
- `POST /api/generation/image` - Generate image content
- `POST /api/generation/code` - Generate code content
- `POST /api/generation/audio` - Generate audio content
- `POST /api/generation/analysis` - Analyze data
- `POST /api/generation/search` - Search and research
- `GET /api/generation/history` - Get generation history

### Contributions

- `POST /api/contributions` - Add a contribution to earn points
- `GET /api/contributions` - Get user contributions

### Points

- `GET /api/points/balance` - Get points balance
- `GET /api/points/transactions` - Get points transaction history

### Statistics

- `GET /api/stats/user` - Get user statistics
- `GET /api/stats/platform` - Get platform statistics

## 📊 Points System

### Points Costs by AI Tool

| AI Tool           | Points Cost |
| ----------------- | ----------- |
| Text Generation   | 5 points    |
| Image Generation  | 8 points    |
| Code Generation   | 6 points    |
| Audio Generation  | 10 points   |
| Data Analysis     | 6 points    |
| Search & Research | 6 points    |

### Earning Points

Earn points by contributing to improve AI models:

- **Training Data**: 10-50 points depending on quality and quantity
- **Feedback**: 5-20 points per submission
- **Annotations**: 15-30 points per data point
- **Evaluations**: 10-25 points per evaluation
- **Improvements**: 20-50 points for significant contributions

## 📋 Example API Calls

### Purchase Points (Spenders)

```bash
curl -X POST \
  -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
  -H "Content-Type: application/json" \
  -d '{
    "usdcAmount": 10.0
  }' \
  https://{BASE_URL}/api/payment/purchase
```

This will:
1. Accept USDC payment from your wallet
2. Credit your account with Points (1 Point = $0.001 USDC)
3. Trigger automatic buyback: swap ~80% of USDC for $KEY
4. Send $KEY to Rewards Treasury

### Generate Text Content

```bash
curl -X POST \
  -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a short story about an AI assistant",
    "config": {
      "maxTokens": 1000,
      "temperature": 0.7
    }
  }' \
  https://{BASE_URL}/api/generation/text
```

### Generate Image

```bash
curl -X POST \
  -H "X-Wallet-ID: {WALLET_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A futuristic AI city at sunset",
    "config": {
      "width": 1024,
      "height": 1024
    }
  }' \
  https://{BASE_URL}/api/generation/image
```

### Generate Code

```bash
curl -X POST \
  -H "X-Wallet-ID: {WALLET_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a REST API endpoint in TypeScript",
    "config": {
      "language": "typescript"
    }
  }' \
  https://{BASE_URL}/api/generation/code
```

### Add Contribution (Contributors)

```bash
curl -X POST \
  -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "training_data",
    "modelId": "model_001",
    "data": {
      "prompt": "Sample prompt",
      "response": "Sample response"
    },
    "keyEarned": 50
  }' \
  https://{BASE_URL}/api/contributions
```

Contributors earn $KEY tokens (not points). $KEY tokens are paid out from the Rewards Treasury.

### Get Points Balance (Spenders)

```bash
curl -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
     https://{BASE_URL}/api/points/balance
```

### Get $KEY Balance (Contributors)

```bash
curl -H "X-Wallet-Address: {SOLANA_WALLET_ADDRESS}" \
     https://{BASE_URL}/api/key/balance
```

### Get User Statistics

```bash
curl -H "X-Wallet-ID: {WALLET_ID}" \
     https://{BASE_URL}/api/stats/user
```

## 🔐 Security Features

- **Wallet Authentication**: Secure access using wallet addresses
- **Rate Limiting**: Protection against abuse
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Request parameter validation
- **Error Handling**: Secure error responses
- **Helmet**: Security headers for Express
- **HTTPS Support**: Encrypted connections
- **Request Validation**: Zod schema validation

## 💡 Technology Stack

### Backend (TypeScript)

- **Runtime**: Node.js 18+
- **Framework**: Express.js + TypeScript
- **Authentication**: JWT + Wallet ID
- **Database**: PostgreSQL + Redis

### AI Services (Python)

- **Framework**: FastAPI
- **Models**: GPT-4, DALL-E, Claude, Stable Diffusion
- **Training**: PyTorch + Transformers

### Blockchain (Solana)

- **Smart Contracts**: Solana Programs (Rust/Anchor)
- **Integration**: @solana/web3.js, @solana/spl-token
- **DEX Integration**: Jupiter Aggregator API
- **Token Standards**: SPL Token

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Maintain API documentation
- Follow REST API design principles
- Test new endpoints thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

**Keyless**: The first AI platform with a real-time, transparent buyback mechanism, powered by Solana's speed and low fees.

## 🎯 The Revenue-to-Buyback Flywheel

1. **Spenders** pay USDC (SPL) → Purchase Points → Use API
2. **Buyback** automatically swaps USDC → $KEY via Jupiter/Raydium
3. **$KEY** goes to Rewards Treasury
4. **Contributors** earn $KEY for training models

All powered by Solana's near-instant, low-cost transactions.
