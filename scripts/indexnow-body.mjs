// Turns the list of files a publish changed (one path per line on stdin,
// relative to out/) into an IndexNow request body. Only things a person
// or a search engine would open count as pages: each index.html becomes
// its directory URL, plus the llms files and the resume PDF. Framework
// payloads, fonts and the 404 pages are left out. Prints nothing when no
// page changed.
import { readFileSync } from "node:fs";

const SITE = "https://oweneldridge.io";
const key = process.argv[2];

function toUrl(file) {
  if (file === "index.html") return `${SITE}/`;
  if (file.endsWith("/index.html")) {
    const dir = file.slice(0, -"index.html".length);
    if (dir === "404/" || dir === "_not-found/") return null;
    return `${SITE}/${dir}`;
  }
  if (/^llms(-full)?\.txt$/.test(file) || file.endsWith(".pdf")) return `${SITE}/${file}`;
  return null;
}

const urls = readFileSync(0, "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map(toUrl)
  .filter(Boolean);

if (key && urls.length > 0) {
  console.log(
    JSON.stringify({
      host: new URL(SITE).host,
      key,
      keyLocation: `${SITE}/${key}.txt`,
      urlList: urls,
    }),
  );
}
