#!/usr/bin/env bash
# Build the site and publish out/ to Codeberg Pages.
#
# One-time setup:
#   1. Create an empty repo named "pages" under your Codeberg account
#      (its default branch content is served at
#      https://<username>.codeberg.page/).
#   2. Register your SSH key with Codeberg.
# After that, `npm run deploy` is the whole release process.
#
# Point PAGES_REMOTE somewhere else to publish to a different repo.
set -euo pipefail
cd "$(dirname "$0")/.."

remote="${PAGES_REMOTE:-git@codeberg.org:oweneldridge/pages.git}"
version=$(git rev-parse --short HEAD)

npm run check

workdir=$(mktemp -d)
trap 'rm -rf "$workdir"' EXIT

git clone --depth 1 "$remote" "$workdir"
find "$workdir" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R out/. "$workdir"/

git -C "$workdir" add -A
if git -C "$workdir" diff --cached --quiet; then
  echo "nothing changed since the last publish"
  exit 0
fi
git -C "$workdir" commit -m "publish $version"
git -C "$workdir" push

echo "published $version"
