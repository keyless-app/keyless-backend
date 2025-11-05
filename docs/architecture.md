# Keyless Architecture

## Project Structure

```
keyless/
├── backend/                    # TypeScript Backend API
│   ├── src/
│   │   ├── core/             # Core business logic
│   │   │   ├── Keyless.ts
│   │   │   ├── AIGenerationManager.ts
│   │   │   ├── PointsManager.ts
│   │   │   └── ContributionManager.ts
│   │   ├── routes/           # API routes
│   │   │   ├── generation.ts
│   │   │   ├── contributions.ts
│   │   │   ├── points.ts
│   │   │   └── stats.ts
│   │   ├── middleware/       # Express middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── services/         # External services integration
│   │   │   ├── blockchain.ts
│   │   │   ├── wallet.ts
│   │   │   └── encryption.ts
│   │   ├── utils/           # Utilities
│   │   │   └── apiKeyValidator.ts
│   │   ├── types/           # TypeScript types
│   │   │   └── index.ts
│   │   ├── config.ts
│   │   └── index.ts         # Main entry point
│   ├── tests/                # Tests
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   └── package.json
│
├── ai-services/              # Python AI Services
│   ├── text_generation/      # Text generation service
│   │   ├── service.py
│   │   ├── models.py
│   │   └── requirements.txt
│   ├── image_generation/     # Image generation service
│   │   ├── service.py
│   │   ├── models.py
│   │   └── requirements.txt
│   ├── code_generation/      # Code generation service
│   │   ├── service.py
│   │   ├── models.py
│   │   └── requirements.txt
│   ├── audio_generation/     # Audio generation service
│   │   ├── service.py
│   │   ├── models.py
│   │   └── requirements.txt
│   ├── data_analysis/        # Data analysis service
│   │   ├── service.py
│   │   ├── analytics.py
│   │   └── requirements.txt
│   ├── search_research/      # Search & research service
│   │   ├── service.py
│   │   ├── search.py
│   │   └── requirements.txt
│   ├── model_training/       # Model training service
│   │   ├── trainer.py
│   │   ├── data_processor.py
│   │   └── requirements.txt
│   └── shared/               # Shared Python modules
│       ├── __init__.py
│       ├── types.py
│       ├── utils.py
│       └── config.py
│
├── blockchain/               # Blockchain integration
│   ├── smart-contracts/      # Smart contracts
│   │   ├── points.sol
│   │   ├── contributions.sol
│   │   └── README.md
│   ├── services/            # Blockchain services
│   │   ├── index.ts
│   │   ├── points.ts
│   │   └── transactions.ts
│   └── tests/
│
├── database/                 # Database schemas & migrations
│   ├── migrations/
│   ├── schemas/
│   └── seeds/
│
├── shared/                   # Shared code between services
│   ├── types/               # Shared TypeScript types
│   │   ├── api.ts
│   │   ├── models.ts
│   │   └── index.ts
│   ├── config/             # Shared configuration
│   │   └── index.ts
│   └── utils/              # Shared utilities
│       └── index.ts
│
├── scripts/                  # Utility scripts
│   ├── setup.sh            # Initial setup
│   ├── migrate.sh          # Database migration
│   ├── deploy.sh           # Deployment script
│   └── seed.sh             # Seed database
│
├── docs/                    # Documentation
│   ├── architecture.md     # This file
│   ├── api.md             # API documentation
│   ├── deployment.md      # Deployment guide
│   └── contributing.md    # Contributing guide
│
├── tests/                   # Integration & E2E tests
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── docker/                  # Docker configurations
│   ├── Dockerfile.backend
│   ├── Dockerfile.ai-services
│   ├── docker-compose.yml
│   └── docker-compose.prod.yml
│
├── .github/                 # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── test.yml
│
├── README.md
├── package.json
├── tsconfig.json
└── .gitignore
```

## Architecture Layers

### 1. Backend Layer (TypeScript)

- **Purpose**: REST API server, business logic, authentication
- **Tech Stack**: Node.js, Express, TypeScript, JWT
- **Responsibilities**:
  - API endpoint handling
  - Authentication & authorization
  - Points management
  - User management
  - Request routing to AI services

### 2. AI Services Layer (Python)

- **Purpose**: AI model inference and generation
- **Tech Stack**: Python, FastAPI, PyTorch, Transformers
- **Responsibilities**:
  - Text generation (GPT-4, Claude)
  - Image generation (DALL-E, Stable Diffusion)
  - Code generation (Codex, Copilot)
  - Audio generation (Whisper, ElevenLabs)
  - Data analysis
  - Search & research

### 3. Solana Blockchain Layer

- **Purpose**: Payment processing, buyback automation, and $KEY token distribution
- **Tech Stack**: Solana, @solana/web3.js, @solana/spl-token, Jupiter API
- **Responsibilities**:
  - USDC (SPL) payment processing
  - Automatic buyback: USDC → $KEY swaps via Jupiter/Raydium
  - $KEY token distribution to Contributors
  - On-chain transaction verification
  - Wallet address validation

### 4. Database Layer

- **Purpose**: Data persistence
- **Tech Stack**: PostgreSQL, Redis
- **Responsibilities**:
  - User data storage
  - Generation history
  - Points transactions
  - Caching

## Service Communication

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   Backend   │─────▶│AI Services  │
│ (Solana     │      │ (TypeScript)│      │  (Python)   │
│  Wallet)    │      └─────────────┘      └─────────────┘
└─────────────┘             │
                            │
                            ▼
                    ┌─────────────┐
                    │   Solana    │
                    │  Blockchain │
                    │  (Payment/  │
                    │  Buyback)   │
                    └─────────────┘
                            │
                            ▼
                    ┌─────────────┐
                    │  Database   │
                    │(PostgreSQL) │
                    └─────────────┘
```

## Technology Flow

### For Spenders (API Users):

1. **User Request** → Backend API (with Solana wallet address)
2. **Authentication** → Solana wallet address validation
3. **Payment** → USDC (SPL) payment on Solana
4. **Points Credit** → Database ledger (off-chain)
5. **Buyback** → Automatic swap USDC → $KEY via Jupiter
6. **$KEY to Treasury** → Rewards Treasury wallet
7. **Points Check** → Database query
8. **Points Deduction** → Database (off-chain)
9. **AI Generation** → Python service
10. **Result Return** → Backend → User

### For Contributors (Model Trainers):

1. **Contribution** → Submit training data via API
2. **Review** → Contribution approved/rejected
3. **$KEY Reward** → $KEY tokens credited (database)
4. **Payout** → $KEY sent from Treasury to Contributor wallet (on-chain)
