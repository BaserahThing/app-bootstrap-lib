#!/bin/bash

# Prepare app-bootstrap-lib for new repository
echo "🚀 Preparing app-bootstrap-lib for new repository..."

# Get the current directory
CURRENT_DIR=$(pwd)
PACKAGE_NAME="app-bootstrap-lib"

echo "📦 Package: $PACKAGE_NAME"
echo "📍 Current directory: $CURRENT_DIR"

# Create a temporary directory for the new repo
TEMP_DIR="/tmp/$PACKAGE_NAME-repo"
echo "📁 Creating temporary directory: $TEMP_DIR"

# Clean up any existing temp directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy all necessary files
echo "📋 Copying files..."
cp -r src/ "$TEMP_DIR/"
cp -r dist/ "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
cp package-lock.json "$TEMP_DIR/"
cp tsconfig.json "$TEMP_DIR/"
cp tsup.config.ts "$TEMP_DIR/"
cp README.md "$TEMP_DIR/"
cp LICENSE "$TEMP_DIR/" 2>/dev/null || echo "⚠️  No LICENSE file found"

# Create .gitignore for the new repo
echo "📝 Creating .gitignore..."
cat > "$TEMP_DIR/.gitignore" << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
EOF

# Create GitHub Actions workflow for CI/CD
echo "🔧 Creating GitHub Actions workflow..."
mkdir -p "$TEMP_DIR/.github/workflows"
cat > "$TEMP_DIR/.github/workflows/ci.yml" << 'EOF'
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build package
      run: npm run build

    - name: Run tests
      run: npm test

    - name: Lint code
      run: npm run lint

  publish:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
        registry-url: 'https://registry.npmjs.org'

    - name: Install dependencies
      run: npm ci

    - name: Build package
      run: npm run build

    - name: Publish to npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
EOF

# Create release workflow
cat > "$TEMP_DIR/.github/workflows/release.yml" << 'EOF'
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
        registry-url: 'https://registry.npmjs.org'

    - name: Install dependencies
      run: npm ci

    - name: Build package
      run: npm run build

    - name: Publish to npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

    - name: Create Release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        body: |
          Changes in this Release:
          ${{ github.event.head_commit.message }}
        draft: false
        prerelease: false
EOF

# Create CONTRIBUTING.md
echo "📖 Creating CONTRIBUTING.md..."
cat > "$TEMP_DIR/CONTRIBUTING.md" << 'EOF'
# Contributing to @basirah/app-bootstrap-lib

Thank you for your interest in contributing to the app-bootstrap-lib! This document provides guidelines for contributing.

## Development Setup

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/app-bootstrap-lib.git
   cd app-bootstrap-lib
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development mode**:
   ```bash
   npm run dev
   ```

## Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test your changes**:
   ```bash
   npm run build
   npm test
   npm run lint
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Pull Request Process

1. **Push your branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub

3. **Ensure the PR description clearly describes the problem and solution**

4. **Include the appropriate type of change**:
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `test`: Adding missing tests or correcting existing tests
   - `chore`: Changes to the build process or auxiliary tools

## Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Add JSDoc comments for public APIs
- Ensure all tests pass
- Run linting before submitting

## Testing

- Add tests for new features
- Ensure all existing tests pass
- Test in multiple environments if applicable

## Release Process

1. **Update version** in package.json
2. **Create a git tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. **GitHub Actions will automatically publish to npm**

## Questions?

If you have questions, please open an issue on GitHub.
EOF

# Create CHANGELOG.md
echo "📝 Creating CHANGELOG.md..."
cat > "$TEMP_DIR/CHANGELOG.md" << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release

## [1.0.0] - 2025-07-31

### Added
- Vite plugin for automatic AppBootstrap.js generation
- React hooks for app bootstrap management
- Cache manager for PWA functionality
- Asset manifest generator
- TypeScript support
- Comprehensive documentation

### Features
- `appBootstrapPlugin`: Vite plugin for build-time integration
- `useAppBootstrap`: React hook for loading state management
- `useAppBootstrapStatus`: React hook for status tracking
- `AppCacheManager`: Cache management class
- `initializeCacheManager`: Quick initialization function
- `generateAssetManifest`: Asset manifest generation
- `AssetManifestGenerator`: Class-based manifest generator
EOF

# Show the prepared files
echo ""
echo "✅ Package prepared for new repository!"
echo ""
echo "📁 Files prepared in: $TEMP_DIR"
echo ""
echo "📋 Files included:"
ls -la "$TEMP_DIR"
echo ""
echo "🚀 Next steps:"
echo "1. Create new repository at: https://github.com/BaserahThing/app-bootstrap-lib"
echo "2. Clone the new repository locally"
echo "3. Copy files from: $TEMP_DIR"
echo "4. Push to the new repository"
echo "5. Set up GitHub Actions secrets (NPM_TOKEN)"
echo ""
echo "💡 Commands to run after creating the repo:"
echo "git clone https://github.com/BaserahThing/app-bootstrap-lib.git"
echo "cp -r $TEMP_DIR/* app-bootstrap-lib/"
echo "cd app-bootstrap-lib"
echo "git add ."
echo "git commit -m 'Initial commit'"
echo "git push origin main"
