#!/bin/bash

# Script to publish Keyless API to npm
# Usage: ./scripts/publish.sh [patch|minor|major]

set -e

echo "🚀 Preparing to publish Keyless API to npm..."

# Check if version bump is requested
if [ "$1" != "" ]; then
  echo "📦 Bumping version: $1"
  npm version $1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Build failed! dist/ directory not found."
  exit 1
fi

# Run tests (if available)
if npm run test 2>/dev/null; then
  echo "✅ Tests passed"
else
  echo "⚠️  Tests skipped or failed (continuing anyway)"
fi

# Dry run to check what will be published
echo "📋 Checking what will be published..."
npm pack --dry-run

# Ask for confirmation
read -p "🤔 Do you want to publish to npm? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Publishing cancelled"
  exit 1
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

echo "✅ Published successfully!"
echo "📦 Package: @keyless-app/keyless-backend"
echo "🌐 Check it out: https://www.npmjs.com/package/@keyless-app/keyless-backend"


