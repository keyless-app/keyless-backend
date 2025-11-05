// Cross-platform build script that ensures TypeScript is available
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if TypeScript is installed
const nodeModulesBin = path.join(__dirname, '..', 'node_modules', '.bin');
const tscPath = path.join(nodeModulesBin, 'tsc');
const tscPathWin = path.join(nodeModulesBin, 'tsc.cmd');

if (!fs.existsSync(tscPath) && !fs.existsSync(tscPathWin)) {
  console.error('❌ TypeScript not found. Please run: npm install');
  process.exit(1);
}

// Use the local TypeScript compiler
const tsc = process.platform === 'win32' ? tscPathWin : tscPath;

console.log('🔨 Building TypeScript...');

try {
  if (process.platform === 'win32') {
    // On Windows, use cmd.exe to execute .cmd files
    execSync(`"${tsc}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      shell: true
    });
  } else {
    // On Unix-like systems, execute directly
    execSync(`"${tsc}"`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  }
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

