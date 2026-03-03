#!/bin/bash
set -euo pipefail

# Trap errors and log them
trap 'echo "❌ Error on line $LINENO. Command: $BASH_COMMAND"' ERR

echo "🚀 ShaadiBio Backend Quick Start"
echo "================================"
echo ""

# Check if .env.example exists
if [ ! -f .env.example ]; then
    echo "❌ Error: .env.example file not found"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please update MONGODB_URI and other secrets."
    echo ""
    read -p "Press enter to continue after updating .env..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
if ! npm install; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "⚠️  Make sure MongoDB is running:"
echo "  - Local: mongod"
echo "  - Or use MongoDB Atlas (cloud)"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Server will be available at: http://localhost:3000"
