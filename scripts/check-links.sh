#!/usr/bin/env bash
# Walk every page in the export and verify its links: internal hrefs must
# map to a file in out/, external ones must not be dead. A stale portfolio
# hurts more than no portfolio, so this runs weekly in CI and any time by
# hand via `npm run check-links`.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f out/index.html ]; then
  npm run build
fi

python3 << 'PY'
import os, re, subprocess, sys, time

pages = []
for root, _, files in os.walk("out"):
    for f in files:
        if f.endswith(".html"):
            pages.append(os.path.join(root, f))

internal, external = set(), set()
for page in pages:
    html = open(page, encoding="utf-8").read()
    for href in re.findall(r'(?:href|src)="([^"]+)"', html):
        href = href.split("#")[0].split("?")[0]
        if not href:
            continue
        if href.startswith(("http://", "https://")):
            external.add(href)
        elif href.startswith("/"):
            internal.add(href)
        elif href.startswith("mailto:"):
            pass

failures = []

for path in sorted(internal):
    candidates = [
        "out" + path,
        "out" + path.rstrip("/") + "/index.html",
        "out" + path.rstrip("/") + ".html",
    ]
    if not any(os.path.isfile(c) for c in candidates):
        failures.append(f"internal  {path}")

# Sites that answer bots with junk status codes but serve people fine;
# for these only a connection failure counts as broken.
lenient = ("linkedin.com",)

def probe(url):
    for attempt in range(2):
        try:
            out = subprocess.run(
                ["curl", "-o", "/dev/null", "-s", "-L", "--max-time", "20",
                 "-A", "oweneldridge.io link check", "-w", "%{http_code}", url],
                capture_output=True, text=True, timeout=30,
            )
            code = out.stdout.strip()
            if code and code != "000":
                return code
        except subprocess.TimeoutExpired:
            pass
        time.sleep(2)
    return "000"

for url in sorted(external):
    code = probe(url)
    host_lenient = any(d in url for d in lenient)
    ok = code.isdigit() and (
        int(code) < 400 or (host_lenient and code != "000")
    )
    mark = "ok" if ok else "BROKEN"
    print(f"{code:>4}  {mark:6}  {url}")
    if not ok:
        failures.append(f"external  {code}  {url}")

print(f"\nchecked {len(internal)} internal paths, {len(external)} external links")
if failures:
    print("\nbroken:")
    for f in failures:
        print(" ", f)
    sys.exit(1)
print("all links resolve")
PY
