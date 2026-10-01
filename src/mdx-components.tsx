import type { MDXComponents } from "mdx/types";
import { LivePreviewDemo } from "@/components/live-preview-demo";

// A margin note: evidence for the paragraph just above it, such as a
// permalink to the code being described. On a wide screen it sits in the
// evidence column level with that paragraph; on a narrow one it follows
// it. Usable in any MDX file as <Note>...</Note> without an import.
function Note({ children }: { children: React.ReactNode }) {
  return <aside className="aside">{children}</aside>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { Note, LivePreviewDemo, ...components };
}
