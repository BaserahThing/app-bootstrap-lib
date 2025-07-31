#!/bin/bash

# Setup script for the new app-bootstrap-lib repository
echo "🚀 Setting up new app-bootstrap-lib repository..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the app-bootstrap-lib directory"
    exit 1
fi

# Get the current directory
CURRENT_DIR=$(pwd)
TEMP_DIR="/tmp/app-bootstrap-lib-repo"

echo "📍 Current directory: $CURRENT_DIR"
echo "📁 Temp directory: $TEMP_DIR"

# Check if temp directory exists
if [ ! -d "$TEMP_DIR" ]; then
    echo "❌ Error: Temp directory not found. Run prepare-for-new-repo.sh first."
    exit 1
fi

echo ""
echo "📋 Files ready to copy:"
ls -la "$TEMP_DIR"

echo ""
echo "🚀 Ready to set up new repository!"
echo ""
echo "📝 Instructions:"
echo "1. Create new repository at: https://github.com/BaserahThing/app-bootstrap-lib"
echo "2. Run the following commands:"
echo ""
echo "   # Clone the new repository"
echo "   git clone https://github.com/BaserahThing/app-bootstrap-lib.git"
echo "   cd app-bootstrap-lib"
echo ""
echo "   # Copy all files from temp directory"
echo "   cp -r $TEMP_DIR/* ."
echo "   cp -r $TEMP_DIR/.* . 2>/dev/null || true"
echo ""
echo "   # Initialize git and push"
echo "   git add ."
echo "   git commit -m 'Initial commit: app-bootstrap-lib package'"
echo "   git push origin main"
echo ""
echo "3. Set up GitHub Actions secrets:"
echo "   - Go to repository Settings > Secrets and variables > Actions"
echo "   - Add NPM_TOKEN secret with your npm access token"
echo ""
echo "4. Test the setup:"
echo "   npm install"
echo "   npm run build"
echo "   npm test"
echo ""
echo "5. Publish to npm:"
echo "   npm login"
echo "   npm publish"
echo ""
echo "✅ After completing these steps, the package will be available at:"
echo "   https://www.npmjs.com/package/@basirah/app-bootstrap-lib"
echo "   https://github.com/BaserahThing/app-bootstrap-lib"
