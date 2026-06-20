#!/usr/bin/env bash
# Upgrade live server from old `main` (Vite/dev) → new Node production branch.
# Run on server inside project folder, e.g. /var/www/boxcharge
#
# Usage:
#   cd /var/www/boxcharge
#   bash scripts/migrate-live-server.sh
#
# Optional env vars:
#   DEPLOY_BRANCH=feat/production-deploy-and-mobile-fixes
#   APP_DIR=/var/www/boxcharge

set -euo pipefail

APP_DIR="${APP_DIR:-$(pwd)}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-feat/production-deploy-and-mobile-fixes}"
cd "$APP_DIR"

echo "=========================================="
echo " BoxCharge live migration → Node branch"
echo " Branch: $DEPLOY_BRANCH"
echo " Folder: $APP_DIR"
echo "=========================================="

# --- 1. Backup .env ---
if [ -f .env ]; then
  cp .env ".env.backup.$(date +%Y%m%d-%H%M%S)"
  echo "==> .env backed up"
else
  echo "WARNING: No .env found. Create from .env.example before continuing."
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "      Created .env from .env.example — EDIT IT NOW with real keys, then re-run."
    exit 1
  fi
  exit 1
fi

# Ensure production vars exist in .env
grep -q '^PORT=' .env || echo 'PORT=3000' >> .env
grep -q '^NODE_ENV=' .env || echo 'NODE_ENV=production' >> .env
grep -q '^HOST=' .env || echo 'HOST=127.0.0.1' >> .env

# --- 2. Stop OLD processes (main branch setups) ---
echo "==> Stopping old processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Kill stray vite dev servers on common ports
for port in 8080 5173 3000 4173; do
  fuser -k "${port}/tcp" 2>/dev/null || true
done

# --- 3. Node 20 check ---
if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: Node.js not installed. Run: bash scripts/server-setup.sh"
  exit 1
fi
NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "ERROR: Node >= 20 required (found $(node -v))"
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing PM2..."
  npm install -g pm2
fi

# --- 4. Switch to new branch ---
echo "==> Fetching and checking out $DEPLOY_BRANCH"
git fetch origin
git checkout "$DEPLOY_BRANCH"
git pull origin "$DEPLOY_BRANCH"

# --- 5. Install + build ---
echo "==> npm ci"
npm ci

echo "==> npm run build (creates .output/server/index.mjs)"
npm run build

if [ ! -f .output/server/index.mjs ]; then
  echo "ERROR: Build failed — .output/server/index.mjs not found"
  exit 1
fi

# --- 6. Start new Node server via PM2 ---
echo "==> Starting PM2 (boxcharge on port 3000)"
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u "${SUDO_USER:-$USER}" --hp "$HOME" 2>/dev/null || true

# --- 7. Health check ---
sleep 2
if curl -sf "http://127.0.0.1:3000/" >/dev/null; then
  echo "==> OK: App responding on http://127.0.0.1:3000"
else
  echo "WARNING: No response on port 3000. Check: pm2 logs boxcharge"
fi

echo ""
echo "=========================================="
echo " Migration complete!"
echo ""
echo " NEXT: Update Nginx to proxy port 3000"
echo "   sudo cp deploy/nginx.boxcharge.conf /etc/nginx/sites-available/boxcharge"
echo "   sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo " Useful commands:"
echo "   pm2 status"
echo "   pm2 logs boxcharge"
echo "   bash scripts/deploy-on-server.sh   # future updates"
echo "=========================================="
