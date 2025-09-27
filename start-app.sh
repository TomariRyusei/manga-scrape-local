#!/bin/bash
set -e

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Starting Node App ==="

cd /Users/tryu/dev/manga-scrape-local || exit 1
/opt/homebrew/bin/node ./dist/index.js

echo "=== $(date '+%Y-%m-%d %H:%M:%S') - Completed Successfully ==="