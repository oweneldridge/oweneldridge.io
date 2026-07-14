// Removes the framework JavaScript from the static export. Every page is
// prerendered and the only behavior on the site is the inline theme
// toggle, so the React runtime, the router, and the flight payload are
// dead weight for visitors: over 600KB uncompressed at last count.
// Runs as postbuild, so plain `npm run build` produces the light version.
//
// What goes: external <script src="/_next/...">, their preload hints, and
// the inline self.__next_f flight-data scripts that only the runtime
// reads. What stays: the two inline scripts from the layout (theme init
// and theme toggle), which reference neither.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

let files = 0;
let saved = 0;

for (const path of htmlFiles("out")) {
  const before = readFileSync(path, "utf8");
  const after = before
    .replace(/<script[^>]+src="\/_next\/[^"]+"[^>]*><\/script>/g, "")
    .replace(/<link[^>]+rel="preload"[^>]+as="script"[^>]*\/?>/g, "")
    .replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, "")
    .replace(/<script>\(self\.__next_f[\s\S]*?<\/script>/g, "");
  if (after !== before) {
    writeFileSync(path, after);
    files += 1;
    saved += before.length - after.length;
  }
}

// The now-unreferenced bundles don't get shipped either.
let bundles = 0;
function* jsFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* jsFiles(path);
    else if (entry.name.endsWith(".js")) yield path;
  }
}
for (const path of jsFiles("out/_next")) {
  rmSync(path);
  bundles += 1;
}

console.log(
  `strip-runtime: cleaned ${files} pages, removed ${bundles} bundles and ${(saved / 1024).toFixed(0)}KB of markup`,
);
