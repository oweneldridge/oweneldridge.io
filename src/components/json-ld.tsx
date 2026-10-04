// Structured data for search engines and AI assistants. It's data, not
// script: browsers never execute it, and the build's runtime stripping
// (scripts/strip-runtime.mjs) only removes the framework's own scripts.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
