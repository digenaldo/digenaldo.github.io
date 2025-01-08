#!/bin/zsh

# Script to run Jekyll with multiple config files
echo "Starting Jekyll server with production and default configs..."
bundle exec jekyll serve --config _config.dev.yml
