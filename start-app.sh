#!/bin/bash
set -e

export PATH="$HOME/.volta/bin:$PATH"

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Starting Node App ==="

cd /Users/ryusei/dev/manga-scrape-local || exit 1
node --env-file=.env ./dist/index.js

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Completed Successfully ==="