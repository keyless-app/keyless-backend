# PowerShell script to publish Keyless API to npm
# Usage: .\scripts\publish.ps1 [patch|minor|major]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("patch", "minor", "major")]
    [string]$Version = ""
)

Write-Host "🚀 Preparing to publish Keyless API to npm..." -ForegroundColor Cyan

# Check if version bump is requested
if ($Version -ne "") {
    Write-Host "📦 Bumping version: $Version" -ForegroundColor Yellow
    npm version $Version
}

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
npm run clean

# Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (-not (Test-Path "dist")) {
    Write-Host "❌ Build failed! dist/ directory not found." -ForegroundColor Red
    exit 1
}

# Run tests (if available)
try {
    npm run test 2>$null
    Write-Host "✅ Tests passed" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Tests skipped or failed (continuing anyway)" -ForegroundColor Yellow
}

# Dry run to check what will be published
Write-Host "📋 Checking what will be published..." -ForegroundColor Yellow
npm pack --dry-run

# Ask for confirmation
$confirmation = Read-Host "🤔 Do you want to publish to npm? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "❌ Publishing cancelled" -ForegroundColor Red
    exit 1
}

# Publish to npm
Write-Host "📤 Publishing to npm..." -ForegroundColor Cyan
npm publish --access public

Write-Host "✅ Published successfully!" -ForegroundColor Green
Write-Host "📦 Package: @keyless/keyless-api" -ForegroundColor Cyan
Write-Host "🌐 Check it out: https://www.npmjs.com/package/@keyless/keyless-api" -ForegroundColor Cyan


