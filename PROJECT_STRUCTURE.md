# Keyless Project Structure

## Current Directory Structure

```
keyless/
├── src/                                 # Main TypeScript Application (Current)
│   ├── core/                           # Core business logic
│   │   ├── Keyless.ts
│   │   ├── AIGenerationManager.ts
│   │   ├── PointsManager.ts
│   │   └── ContributionManager.ts
│   ├── routes/                         # API routes
│   ├── middleware/                     # Express middleware
│   ├── utils/                          # Utilities
│   ├── types/                          # TypeScript types
│   ├── config.ts
│   └── index.ts
│
├── backend/                            # Future TypeScript Backend (REST API)
│   ├── src/
│   │   └── services/
│   │       └── ai-client.ts          # Python AI services client
│
├── ai-services/                        # Python AI Services
│   ├── text_generation/               # Text generation service
│   │   ├── service.py
│   │   └── requirements.txt
│   └── shared/
│       └── types.py
│
├── blockchain/                         # Blockchain integration
│   └── services/
│       └── points.ts
│
├── shared/                             # Shared code
│   └── types/
│       └── api.ts
│
├── docs/                               # Documentation
│   └── architecture.md
│
├── examples/                           # Example code
│
├── README.md
├── PROJECT_STRUCTURE.md
└── package.json
```

## Full Project Structure (Planned)

```
keyless/
├── backend/                              # TypeScript Backend (REST API)
│   ├── src/
│   │   ├── core/                        # Core business logic
│   │   │   ├── Keyless.ts              # Main platform class
│   │   │   ├── AIGenerationManager.ts  # AI generation orchestrator
│   │   │   ├── PointsManager.ts        # Points management
│   │   │   └── ContributionManager.ts  # Contribution tracking
│   │   ├── routes/                      # API route handlers
│   │   │   ├── generation.ts           # AI generation endpoints
│   │   │   ├── contributions.ts        # Contributions endpoints
│   │   │   ├── points.ts               # Points management
│   │   │   └── stats.ts                # Statistics
│   │   ├── services/                    # External service integrations
│   │   │   ├── ai-client.ts            # Python AI services client
│   │   │   ├── blockchain.ts           # Blockchain integration
│   │   │   ├── wallet.ts               # Wallet management
│   │   │   └── encryption.ts           # Encryption services
│   │   ├── middleware/                   # Express middleware
│   │   │   ├── authMiddleware.ts       # API key authentication
│   │   │   ├── errorHandler.ts        # Error handling
│   │   │   └── rateLimiter.ts          # Rate limiting
│   │   ├── utils/                       # Utility functions
│   │   │   ├── apiKeyValidator.ts     # API key validation
│   │   │   ├── logger.ts               # Logging utilities
│   │   │   └── validator.ts            # Request validation
│   │   ├── types/                       # TypeScript type definitions
│   │   │   ├── index.ts                # Main types
│   │   │   ├── ai.ts                   # AI-related types
│   │   │   ├── blockchain.ts          # Blockchain types
│   │   │   └── user.ts                 # User types
│   │   ├── config/                      # Configuration files
│   │   │   ├── index.ts                # Main config
│   │   │   ├── database.ts             # Database config
│   │   │   └── services.ts             # Service configs
│   │   ├── config.ts                    # Legacy config
│   │   └── index.ts                      # Main entry point
│   ├── tests/                           # Test files
│   │   ├── unit/                       # Unit tests
│   │   │   ├── core/
│   │   │   ├── routes/
│   │   │   └── services/
│   │   ├── integration/                # Integration tests
│   │   └── e2e/                        # End-to-end tests
│   └── package.json
│
├── ai-services/                         # Python AI Services
│   ├── text_generation/                  # Text generation service
│   │   ├── service.py                   # FastAPI service
│   │   ├── models.py                    # ML models
│   │   ├── inference.py                 # Inference logic
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── image_generation/                 # Image generation
│   │   ├── service.py
│   │   ├── models.py
│   │   ├── inference.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── code_generation/                  # Code generation
│   │   ├── service.py
│   │   ├── models.py
│   │   ├── inference.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── audio_generation/                 # Audio generation
│   │   ├── service.py
│   │   ├── models.py
│   │   ├── inference.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── data_analysis/                    # Data analysis
│   │   ├── service.py
│   │   ├── analytics.py
│   │   ├── models.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── search_research/                  # Search & research
│   │   ├── service.py
│   │   ├── search.py
│   │   ├── models.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── model_training/                   # Model training
│   │   ├── trainer.py                   # Training pipeline
│   │   ├── data_processor.py            # Data processing
│   │   ├── evaluator.py                 # Model evaluation
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── shared/                          # Shared Python modules
│       ├── __init__.py
│       ├── types.py                     # Common types
│       ├── utils.py                     # Utilities
│       ├── config.py                    # Config
│       └── logger.py                    # Logging
│
├── blockchain/                          # Blockchain integration
│   ├── smart-contracts/                 # Solidity smart contracts
│   │   ├── contracts/
│   │   │   ├── Points.sol              # Points contract
│   │   │   ├── Contributions.sol        # Contributions contract
│   │   │   └── Governance.sol           # Governance
│   │   ├── scripts/
│   │   │   ├── deploy.js               # Deploy script
│   │   │   └── verify.js               # Verify script
│   │   ├── tests/
│   │   │   └── Points.test.js
│   │   └── hardhat.config.js
│   ├── services/                        # Blockchain services
│   │   ├── index.ts                     # Main service
│   │   ├── points.ts                    # Points operations
│   │   ├── transactions.ts              # Transaction handling
│   │   └── wallet.ts                    # Wallet management
│   └── docs/
│       └── CONTRACTS.md
│
├── database/                            # Database layer
│   ├── migrations/                      # Database migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_points.sql
│   │   ├── 003_create_generations.sql
│   │   └── 004_create_contributions.sql
│   ├── schemas/                         # Database schemas
│   │   ├── users.sql
│   │   ├── points.sql
│   │   ├── generations.sql
│   │   └── contributions.sql
│   ├── seeds/                           # Seed data
│   │   ├── users.sql
│   │   └── test_data.sql
│   └── config/
│       └── database.ts
│
├── shared/                              # Shared code
│   ├── types/                           # Shared TypeScript types
│   │   ├── api.ts                      # API types
│   │   ├── models.ts                   # Model types
│   │   ├── blockchain.ts               # Blockchain types
│   │   └── index.ts
│   ├── config/                          # Shared config
│   │   └── index.ts
│   ├── utils/                           # Shared utilities
│   │   ├── logger.ts
│   │   ├── validator.ts
│   │   └── helpers.ts
│   └── constants/                       # Constants
│       └── index.ts
│
├── scripts/                              # Utility scripts
│   ├── setup.sh                        # Initial setup
│   ├── migrate.sh                      # DB migration
│   ├── deploy.sh                       # Deploy
│   ├── seed.sh                         # Seed data
│   ├── train-models.sh                 # Train AI models
│   └── start-services.sh               # Start all services
│
├── docker/                              # Docker configs
│   ├── Dockerfile.backend              # Backend Dockerfile
│   ├── Dockerfile.ai-services          # AI services
│   ├── Dockerfile.blockchain            # Blockchain
│   ├── docker-compose.yml              # Dev environment
│   ├── docker-compose.prod.yml         # Production
│   └── kubernetes/                     # K8s manifests
│       ├── backend.yaml
│       ├── ai-services.yaml
│       └── blockchain.yaml
│
├── .github/                             # GitHub workflows
│   └── workflows/
│       ├── ci.yml                      # Continuous integration
│       ├── test.yml                    # Testing
│       ├── deploy.yml                  # Deployment
│       └── lint.yml                    # Linting
│
├── docs/                                # Documentation
│   ├── architecture.md                 # Architecture docs
│   ├── api.md                         # API docs
│   ├── deployment.md                   # Deployment guide
│   ├── contributing.md                 # Contributing guide
│   ├── api/
│   │   ├── generation.md
│   │   ├── points.md
│   │   └── contributions.md
│   └── ai/
│       ├── text-generation.md
│       ├── image-generation.md
│       └── model-training.md
│
├── tests/                               # Integration tests
│   ├── integration/
│   │   ├── api.test.ts
│   │   ├── ai-services.test.ts
│   │   └── blockchain.test.ts
│   ├── e2e/
│   │   ├── user-flow.test.ts
│   │   └── points-flow.test.ts
│   └── fixtures/
│       ├── users.json
│       └── generations.json
│
├── infrastructure/                      # Infrastructure as code
│   ├── terraform/                      # Terraform configs
│   │   ├── main.tf
│   │   ├── backend.tf
│   │   └── variables.tf
│   └── cloudformation/                # AWS CloudFormation
│       └── template.yaml
│
├── monitoring/                         # Monitoring & logging
│   ├── prometheus/                     # Prometheus configs
│   │   └── config.yml
│   ├── grafana/                       # Grafana dashboards
│   │   └── dashboards/
│   └── logging/                        # Logging configs
│       └── fluentd.conf
│
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
├── requirements.txt                     # Python dependencies
├── pyproject.toml                       # Python project config
├── .gitignore
├── .eslintrc.js
├── .prettierrc
└── docker-compose.yml
```

## Key Directories Explained

### `/backend` - TypeScript Backend

- REST API server built with Express.js
- Handles authentication, business logic, and API routing
- Communicates with Python AI services
- Integrates with blockchain

### `/ai-services` - Python AI Services

- Separate microservices for each AI capability
- Text, Image, Code, Audio generation
- Data analysis and search
- Model training service
- Uses FastAPI for REST endpoints

### `/blockchain` - Blockchain Integration

- Smart contracts in Solidity
- Points and contributions tracking on-chain
- Wallet integration
- Smart contract deployment scripts

### `/database` - Database Layer

- Migration scripts
- Schema definitions
- Seed data
- Database configuration

### `/shared` - Shared Code

- Common TypeScript types
- Shared utilities
- Constants
- Used by multiple services

### `/scripts` - Utility Scripts

- Setup and deployment automation
- Database migrations
- Model training scripts

### `/docker` - Containerization

- Dockerfile for each service
- Docker Compose for local development
- Kubernetes manifests for production

### `/docs` - Documentation

- Architecture documentation
- API documentation
- Deployment guides
- AI model documentation

### `/tests` - Testing

- Unit tests
- Integration tests
- End-to-end tests
- Test fixtures

### `/infrastructure` - IaC

- Terraform configurations
- CloudFormation templates
- Infrastructure automation

### `/monitoring` - Observability

- Prometheus metrics
- Grafana dashboards
- Logging configuration
