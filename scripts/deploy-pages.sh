#!/usr/bin/env bash
# Build the site and publish out/ to Codeberg Pages (the new git-pages
# system: content lives on a branch named "pages" in the pages repo).
#
# One-time setup:
#   1. Create a public repo named "pages" under your Codeberg account.
#   2. Register your SSH key with Codeberg.
#   3. In the repo: Settings > Webhooks > Add webhook > Forgejo, with
#      target URL https://<username>.codeberg.page and branch filter
#      "pages". That's what tells the pages server to pull new pushes.
# After that, `npm run deploy` is the whole release process.
#
# Point PAGES_REMOTE somewhere else to publish to a different repo.
set -euo pipefail
cd "$(dirname "$0")/.."

remote="${PAGES_REMOTE:-git@codeberg.org:oweneldridge/pages.git}"
branch="pages"
version=$(git rev-parse --short HEAD)

npm run check

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT

git init -q -b "$branch" "$workdir"
git -C "$workdir" remote add origin "$remote"
# keep publish history if the branch already exists; start fresh if not
if git -C "$workdir" fetch -q --depth 1 origin "$branch" 2>/dev/null; then
  git -C "$workdir" reset -q --soft FETCH_HEAD
fi

find "$workdir" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R out/. "$workdir"/

git -C "$workdir" add -A
if git -C "$workdir" diff --cached --quiet; then
  echo "nothing changed since the last publish"
  exit 0
fi
changed=$(git -C "$workdir" diff --cached --name-only)
git -C "$workdir" commit -q -m "publish $version"
git -C "$workdir" push -q origin "$branch"

echo "published $version to $branch"

# Tell the IndexNow search engines (Bing, Yandex, Seznam, Naver) which
# pages just changed, so they don't wait for a crawl to notice. The key
# file in public/ proves the site is mine. A failed ping is only a
# warning: the pages are already live.
key_file=$(ls public | grep -E '^[0-9a-f]{32}\.txt$' | head -1 || true)
if [ -n "$key_file" ]; then
  body=$(printf '%s\n' "$changed" | node scripts/indexnow-body.mjs "${key_file%.txt}")
  if [ -n "$body" ]; then
    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 \
      -X POST https://api.indexnow.org/indexnow \
      -H "Content-Type: application/json; charset=utf-8" -d "$body" || true)
    case "$status" in
      200|202) echo "indexnow: accepted ($status)" ;;
      *) echo "indexnow: not accepted (HTTP $status), pages are live anyway" >&2 ;;
    esac
  fi
fi
