import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the app router. Nothing is remapped yet;
// this is the hook for custom MDX elements when they're needed.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
