#!/usr/bin/env bash
# Weigh the home page: index.html plus every local asset it references
# (scripts, styles, fonts, icons), uncompressed, the way the 512KB Club
# counts. Fails when the total crosses the budget so weight creep shows
# up in CI instead of in visitors' data plans.
set -euo pipefail
cd "$(dirname "$0")/.."

budget_kb=400

if [ ! -f out/index.html ]; then
  echo "out/index.html missing; run the build first" >&2
  exit 1
fi

python3 - "$budget_kb" << 'PY'
import os, re, sys

budget_kb = int(sys.argv[1])
html = open("out/index.html", encoding="utf-8").read()

# every local URL in src/href attributes, plus preloaded fonts
refs = set(re.findall(r'(?:src|href)="(/[^"]+)"', html))
refs |= set(re.findall(r'"(/_next/static/[^"]+)"', html))

total = os.path.getsize("out/index.html")
rows = [("index.html", total)]
for ref in sorted(refs):
    path = "out" + ref.split("?")[0]
    if os.path.isfile(path):
        size = os.path.getsize(path)
        total += size
        rows.append((ref, size))

for name, size in sorted(rows, key=lambda r: -r[1]):
    print(f"{size/1024:8.1f} KB  {name}")

total_kb = total / 1024
print(f"{'-'*40}\n{total_kb:8.1f} KB  total (budget {budget_kb} KB)")
sys.exit(1 if total_kb > budget_kb else 0)
PY
