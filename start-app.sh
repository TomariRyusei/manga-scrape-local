#!/bin/bash
set -e

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Starting Node App ==="

cd /Users/ryusei/dev/manga-scrape-local || exit 1
node --env-file=.env ./dist/index.js

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Completed Successfully ==="