import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // The whole site is prerendered, so it ships as plain files in out/
  // and any static host can serve it. Trailing slashes make every page
  // a directory with an index.html, which dumb file servers understand.
  output: "export",
  trailingSlash: true,
};

const withMDX = createMDX({
  options: {
    // strip the yaml block so it doesn't render as a stray paragraph;
    // the metadata itself is read with gray-matter in src/lib/projects.ts
    remarkPlugins: [["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
