#!/bin/bash
# =====================================
# Hugo Deploy Script for GitHub Pages
# Author: Digenaldo Neto
# =====================================

# Exit immediately if a command exits with a non-zero status
set -e

# Get current date and time for commit message
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

echo "🧹 Cleaning previous build..."
rm -rf public

echo "🏗️ Building the site with Hugo..."
hugo --minify

echo "📂 Entering public directory..."
cd public

echo "🪣 Initializing a new Git repository..."
git init
git add .

echo "📝 Committing changes..."
git commit -m "Auto deploy on ${timestamp}"

echo "🚀 Pushing to gh-pages branch..."
git branch -M gh-pages
git remote add origin git@github.com:digenaldo/digenaldo.github.io.git
git push -f origin gh-pages

cd ..
echo "✅ Deployment completed successfully at ${timestamp}"
