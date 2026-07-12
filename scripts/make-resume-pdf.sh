#!/usr/bin/env bash
# Regenerate public/owen-eldridge-resume.pdf from the resume page's print
# styles. Run this after editing src/content/resume.ts and commit the
# refreshed PDF together with the change, or the download drifts out of
# date. Page margins come from the @page rule in globals.css.
set -euo pipefail
cd "$(dirname "$0")/.."

port=4173

npm run build

python3 -m http.server "$port" --directory out >/dev/null 2>&1 &
server=$!
trap 'kill "$server"' EXIT
sleep 1

# First run on a machine downloads the matching headless browser;
# after that it's cached and this is a no-op.
npx --yes playwright@1.58 install chromium-headless-shell >/dev/null

npx --yes playwright@1.58 pdf \
  --paper-format Letter \
  --color-scheme light \
  "http://localhost:$port/resume/" \
  public/owen-eldridge-resume.pdf

echo "wrote public/owen-eldridge-resume.pdf"
