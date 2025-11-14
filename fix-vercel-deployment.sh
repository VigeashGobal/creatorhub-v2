#!/bin/bash

# Fix Vercel Deployment for Monorepo
# This script helps configure Vercel to find your Next.js app in apps/web

echo "🚀 Vercel Monorepo Deployment Fix"
echo "=================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is installed"
echo ""

# Check if project is linked
if [ ! -d ".vercel" ]; then
    echo "🔗 Linking to Vercel project..."
    echo "   (You'll need to select your project)"
    vercel link
    echo ""
fi

echo "⚙️  Configuring root directory to apps/web..."
echo ""

# Option 1: Try to set via vercel.json in apps/web (already done)
if [ -f "apps/web/vercel.json" ]; then
    echo "✅ apps/web/vercel.json exists"
else
    echo "⚠️  Creating apps/web/vercel.json..."
    mkdir -p apps/web
    cat > apps/web/vercel.json << 'EOF'
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
EOF
fi

echo ""
echo "📝 IMPORTANT: You need to set the Root Directory in Vercel Dashboard"
echo ""
echo "👉 Steps:"
echo "   1. Go to: https://vercel.com/dashboard"
echo "   2. Click your project → Settings"
echo "   3. Build & Development Settings → Edit Root Directory"
echo "   4. Enter: apps/web"
echo "   5. Save and Redeploy"
echo ""
echo "Alternative: Deploy now with correct settings:"
echo "   vercel --prod"
echo "   (Vercel will prompt you to confirm settings)"
echo ""

read -p "🤔 Would you like to deploy now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying with root directory set to apps/web..."
    vercel --prod
else
    echo "✅ Setup complete! Remember to set Root Directory in Vercel Dashboard"
fi

