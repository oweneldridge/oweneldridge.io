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
  order: number;
};

const projectsDir = path.join(process.cwd(), "src/content/projects");

export function listProjects(): Project[] {
  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        summary: data.summary as string,
        year: String(data.year),
        tech: (data.tech ?? []) as string[],
        links: (data.links ?? []) as ProjectLink[],
        order: (data.order ?? 99) as number,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return listProjects().find((p) => p.slug === slug);
}
