#!/bin/bash
# =====================================
# Hugo Deploy Script for GitHub Pages
# Author: Digenaldo Neto
# =====================================

set -e  # Exit immediately if a command exits with a non-zero status

# Always run from the script's directory (repo root)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Get current date and time for commit message
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

echo "Committing and pushing main branch (source)..."
git add .
git commit -m "Deploy: sync source ${timestamp}" --allow-empty
git push origin main

echo "Cleaning previous build..."
rm -rf public

echo "Building the site with Hugo..."
hugo --minify

echo "Adding CNAME..."
echo "digenaldo.com" > public/CNAME

echo "Entering public directory..."
cd public

echo "Initializing a new Git repository..."
git init

# Ensure commit works (e.g. in CI or when global git config is missing)
git config user.email "${GIT_USER_EMAIL:-deploy@digenaldo.github.io}"
git config user.name "${GIT_USER_NAME:-Digenaldo Deploy}"

echo "Git add..."
git add .

echo "Git commit..."
git commit -m "Auto deploy on ${timestamp}" --allow-empty

echo "Git push to gh-pages branch..."
git branch -M gh-pages
git remote add origin git@github.com:digenaldo/digenaldo.github.io.git 2>/dev/null || git remote set-url origin git@github.com:digenaldo/digenaldo.github.io.git
git push -f origin gh-pages

cd "$SCRIPT_DIR"
echo "Deployment completed successfully at ${timestamp}"
