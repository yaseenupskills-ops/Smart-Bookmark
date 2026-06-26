#!/bin/bash
set -e

echo "🚀 Deploying Smart Bookmark Hub..."

cd "$(dirname "$0")"

echo "📦 Pulling latest code..."
git pull

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building frontend..."
npm run build

echo "🔄 Restarting server..."
pm2 restart smarthub 2>/dev/null || \
  PORT=${PORT:-3100} NODE_ENV=production pm2 start server/index.js --name smarthub

echo "✅ Deploy complete!"
