import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // strip the yaml block so it doesn't render as a stray paragraph;
    // the metadata itself is read with gray-matter in src/lib/projects.ts
    remarkPlugins: [["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
