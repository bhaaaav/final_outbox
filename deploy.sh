#!/bin/bash

# Deployment script for Vercel
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Build the project
echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

echo "✅ Frontend build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Go to vercel.com and create a new project"
echo "3. Connect your GitHub repository"
echo "4. Set Root Directory to 'frontend'"
echo "5. Add environment variable: REACT_APP_API_URL=https://your-backend-url.railway.app/api"
echo "6. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
