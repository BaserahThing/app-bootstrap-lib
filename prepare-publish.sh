#!/bin/bash

# Prepare @basirah/app-bootstrap-lib for publishing
echo "🚀 Preparing @basirah/app-bootstrap-lib for publishing..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the package
echo "🔨 Building package..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Show package info
echo "📋 Package information:"
echo "Name: $(node -p "require('./package.json').name")"
echo "Version: $(node -p "require('./package.json').version")"
echo "Description: $(node -p "require('./package.json').description")"

# Check if user is logged in to npm
echo "🔐 Checking npm authentication..."
if ! npm whoami; then
    echo "❌ Not logged in to npm. Please run: npm login"
    exit 1
fi

echo "✅ Ready for publishing!"
echo ""
echo "To publish, run:"
echo "  npm publish"
echo ""
echo "To publish with a specific tag:"
echo "  npm publish --tag beta"
echo ""
echo "To dry-run (test without publishing):"
echo "  npm publish --dry-run"
