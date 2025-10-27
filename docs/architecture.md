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

### 3. Blockchain Layer

- **Purpose**: Transparent point system
- **Tech Stack**: Solidity, Web3.js, Smart Contracts
- **Responsibilities**:
  - Point transactions
  - Contribution verification
  - Trustless point rewards
  - Transaction history

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
│             │      │ (TypeScript)│      │  (Python)   │
└─────────────┘      └─────────────┘      └─────────────┘
                             │
                             ▼
                      ┌─────────────┐
                      │  Blockchain │
                      │ (Solidity)  │
                      └─────────────┘
                             │
                             ▼
                      ┌─────────────┐
                      │  Database   │
                      │(PostgreSQL) │
                      └─────────────┘
```

## Technology Flow

1. **User Request** → Backend API
2. **Authentication** → JWT + API Key validation
3. **Points Check** → Database query
4. **Points Deduction** → Blockchain transaction
5. **AI Generation** → Python service
6. **Result Return** → Backend → User
7. **Points Award** → Blockchain (for contributions)
