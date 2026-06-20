#!/usr/bin/env bash
# One-time VPS setup (Ubuntu 22/24). Run as root or with sudo.
set -euo pipefail

echo "==> Installing Node.js 20, git, nginx, pm2 prerequisites..."
apt-get update
apt-get install -y curl git nginx

if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v20* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

npm install -g pm2

APP_DIR="${APP_DIR:-/var/www/boxcharge}"
REPO="${REPO:-https://github.com/mern-itio/boxcharge.git}"
BRANCH="${BRANCH:-feat/production-deploy-and-mobile-fixes}"

mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone -b "$BRANCH" "$REPO" "$APP_DIR"
fi

echo ""
echo "==> Next steps:"
echo "  1. cd $APP_DIR"
echo "  2. cp .env.example .env   # add Supabase keys + domain settings"
echo "  3. bash scripts/deploy-on-server.sh"
echo "  4. sudo cp deploy/nginx.boxcharge.conf /etc/nginx/sites-available/boxcharge"
echo "  5. sudo ln -sf /etc/nginx/sites-available/boxcharge /etc/nginx/sites-enabled/"
echo "  6. sudo nginx -t && sudo systemctl reload nginx"
echo "  7. sudo certbot --nginx -d yourdomain.com   # optional SSL"
