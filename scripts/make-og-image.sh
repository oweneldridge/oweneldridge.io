#!/usr/bin/env bash
# Render scripts/og-image.html to public/og.png at the standard card size.
# Rerun after editing the template and commit the result.
set -euo pipefail
cd "$(dirname "$0")/.."

npx --yes playwright@1.58 install chromium-headless-shell >/dev/null

npx --yes playwright@1.58 screenshot \
  --viewport-size=1200,630 \
  --wait-for-timeout=1500 \
  "file://$PWD/scripts/og-image.html" \
  public/og.png

echo "wrote public/og.png"
