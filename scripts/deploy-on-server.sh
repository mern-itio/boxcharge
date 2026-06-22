#!/usr/bin/env bash
# Run ON THE LIVE SERVER inside the project folder (e.g. /var/www/boxcharge)
set -euo pipefail

APP_DIR="${APP_DIR:-$(pwd)}"
cd "$APP_DIR"

echo "==> Deploying BoxCharge from $APP_DIR"

if [ ! -f .env ]; then
  echo "ERROR: .env missing. Copy .env.example to .env and add Supabase keys first."
  exit 1
fi

echo "==> Pull latest code"
git fetch origin
git checkout "${DEPLOY_BRANCH:-feat/production-deploy-and-mobile-fixes}"
git pull origin "${DEPLOY_BRANCH:-feat/production-deploy-and-mobile-fixes}"

echo "==> Install dependencies"
npm ci

echo "==> Stop app during rebuild (avoids stale asset 500s)"
if pm2 describe boxcharge >/dev/null 2>&1; then
  pm2 stop boxcharge
fi

echo "==> Clean previous build output"
rm -rf .output

echo "==> Production build (VITE_* vars from .env are baked in here)"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"
npm run build

if [ ! -f .output/server/index.mjs ]; then
  echo "ERROR: Build failed — .output/server/index.mjs not found"
  exit 1
fi

echo "==> Start / restart PM2"
if pm2 describe boxcharge >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi
pm2 save

echo "==> Done. App should be on http://127.0.0.1:3000"
echo "    Point Nginx to port 3000 — see deploy/nginx.boxcharge.conf"
echo ""
echo " First time migrating from old main? Run: bash scripts/migrate-live-server.sh"
