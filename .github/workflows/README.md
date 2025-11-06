# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation.

## Workflows

### 1. `ci.yml` - Continuous Integration
- **Triggers**: Push to `main`/`develop` branches, Pull Requests
- **Purpose**: Run tests, linting, and build checks
- **Runs on**: Multiple Node.js versions (18.x, 20.x)

### 2. `publish.yml` - Publish to npm (Traditional)
- **Triggers**: 
  - Push to `main` branch
  - Tags starting with `v*` (e.g., `v1.0.2`)
  - Manual workflow dispatch
- **Purpose**: Automatically publish package to npm
- **Requirements**: `NPM_TOKEN` secret in GitHub repository settings

### 3. `publish-oidc.yml` - Publish to npm (OIDC/Trusted Publisher)
- **Triggers**: Same as `publish.yml`
- **Purpose**: Publish using npm's Trusted Publisher (OIDC) - more secure
- **Requirements**: 
  - Configure Trusted Publisher in npm package settings
  - No `NPM_TOKEN` secret needed (uses OIDC)

## Setup Instructions

### Option 1: Using NPM_TOKEN (Traditional)

1. Go to your npm account: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Create a new "Automation" token
3. Copy the token
4. In your GitHub repository, go to Settings → Secrets and variables → Actions
5. Add a new secret named `NPM_TOKEN` with your npm token
6. Use the `publish.yml` workflow

### Option 2: Using Trusted Publisher (OIDC) - Recommended

1. Go to your npm package page: https://www.npmjs.com/package/@keyless/keyless-api
2. Click on "Trusted Publisher" tab
3. Click "Set up connection"
4. Fill in:
   - **Publisher**: GitHub Actions
   - **Organization or user**: Your GitHub username or organization
   - **Repository**: `keyless/keyless-api` (or your repo path)
   - **Workflow filename**: `publish-oidc.yml`
5. Click "Set up connection"
6. Use the `publish-oidc.yml` workflow (no secrets needed!)

## Usage

### Automatic Publishing

The workflow automatically publishes when:
- You push to the `main` branch (if version changed)
- You create a git tag (e.g., `git tag v1.0.2 && git push --tags`)

### Manual Publishing

1. Go to Actions tab in GitHub
2. Select "Publish to npm" workflow
3. Click "Run workflow"
4. Choose version bump type (patch, minor, major)
5. Click "Run workflow"

### Version Bumping

The workflow can automatically bump versions:
- **patch**: 1.0.1 → 1.0.2 (bug fixes)
- **minor**: 1.0.1 → 1.1.0 (new features)
- **major**: 1.0.1 → 2.0.0 (breaking changes)

Or manually bump:
```bash
npm version patch  # or minor, major
git push --tags
```

## Workflow Features

- ✅ Automatic version checking (won't republish existing versions)
- ✅ Build verification before publishing
- ✅ Test execution (optional, won't fail if tests don't exist)
- ✅ Automatic GitHub release creation on tag pushes
- ✅ Support for both NPM_TOKEN and OIDC authentication

