import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  tech: string[];
  links: ProjectLink[];
  featured: boolean;
  order: number;
};

const projectsDir = path.join(process.cwd(), "src/content/projects");

// Fails the build with the filename when a project's frontmatter is
// missing something, instead of rendering "undefined" to visitors.
function need(data: Record<string, unknown>, field: string, file: string) {
  const value = data[field];
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`${file}: frontmatter is missing "${field}"`);
  }
  return String(value);
}

export function listProjects(): Project[] {
  return fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map(({ name }) => {
      const raw = fs.readFileSync(path.join(projectsDir, name), "utf8");
      const { data } = matter(raw);
      return {
        slug: name.replace(/\.mdx$/, ""),
        title: need(data, "title", name),
        summary: need(data, "summary", name),
        year: need(data, "year", name),
        tech: (data.tech ?? []) as string[],
        links: (data.links ?? []) as ProjectLink[],
        featured: data.featured === true,
        order: (data.order ?? 99) as number,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return listProjects().find((p) => p.slug === slug);
}
