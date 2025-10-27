# Keyless - AI Generation Platform

<img width="3375" height="3375" alt="banner" src="https://github.com/user-attachments/assets/8d7377d0-2995-4875-85ab-2de1eef70c83" />

> **Train AI models. Earn points. Generate without limits.**

An AI platform where users contribute data and feedback to train models, earn points from contributions, and use those points to generate AI content (text, images, code, audio, data analysis, and research) without API fees or subscriptions.

## 🎯 What is Keyless?

Keyless is an AI generation platform that democratizes access to AI content creation through a points-based system:

- **Train & Earn**: Contribute training data, feedback, annotations, or evaluations to improve AI models and earn points
- **Points-Based Generation**: Use points to generate AI content (text, images, code, audio, analysis, research) without API fees
- **Independent**: No subscriptions, usage limits, or credit cards required
- **Wallet Integration**: Use your wallet address as your unique identifier for seamless access

## 🚀 Key Features

### Points-Based AI Generation

Generate AI content using points earned from contributions:

- **Text Generation** (5 points): Create articles, stories, summaries, and more
- **Image Generation** (8 points): Generate images from text descriptions
- **Code Generation** (6 points): Generate code snippets, functions, and programs
- **Audio Generation** (10 points): Create audio content and speech synthesis
- **Data Analysis** (6 points): Analyze data and generate insights
- **Search & Research** (6 points): Search and research topics with AI

### Contributing to AI

Earn points by contributing to improve AI models:

- Provide training data
- Submit feedback on AI outputs
- Annotate data for model training
- Evaluate model performance
- Suggest improvements

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

#### 3. **Blockchain Layer**

- **Solidity Smart Contracts** for points system
- **Transparent transactions** on-chain
- **Wallet integration** for API authentication
- **Decentralized point tracking**

#### 4. **Database Layer**

- **PostgreSQL** for structured data
- **Redis** for caching
- **Migrations** for schema management

For complete structure details, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) and [docs/architecture.md](docs/architecture.md).

## 📦 Installation

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

### 3. Wallet Authentication

All API endpoints require a valid wallet ID in the `X-Wallet-ID` header:

```bash
curl -H "X-Wallet-ID: {WALLET_ID}" \
     https://{BASE_URL}/health
```

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

### Generate Text Content

```bash
curl -X POST \
  -H "X-Wallet-ID: {WALLET_ID}" \
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

### Add Contribution

```bash
curl -X POST \
  -H "X-Wallet-ID: {WALLET_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "training_data",
    "modelId": "model_001",
    "data": {
      "text": "Sample training data",
      "label": "positive"
    },
    "pointsEarned": 15
  }' \
  https://{BASE_URL}/api/contributions
```

### Get Points Balance

```bash
curl -H "X-Wallet-ID: {WALLET_ID}" \
     https://{BASE_URL}/api/points/balance
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

### Blockchain

- **Smart Contracts**: Solidity
- **Integration**: Web3.js, Ethers.js

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

**Keyless**: Democratizing AI content generation through community contributions.
