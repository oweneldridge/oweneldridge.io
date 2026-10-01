import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { resume } from "@/content/resume";
import { getProjectBody, listProjects, type Project } from "@/lib/projects";

// Plain-text copies of the site for AI agents (llmstxt.org). Built from the
// same content files as the pages, so they can't drift from what people see.

const SITE = "https://oweneldridge.io";

function aboutBody(): string {
  const raw = fs.readFileSync(path.join(process.cwd(), "src/content/about.mdx"), "utf8");
  return matter(raw).content.trim();
}

// The about page's first paragraph is the current one-line pitch.
function summary(): string {
  return aboutBody().split(/\n\s*\n/)[0].replace(/\s*\n\s*/g, " ");
}

function absolute(markdown: string): string {
  return markdown.replace(/\]\(\//g, `](${SITE}/`);
}

// Margin notes and the live-preview demo are page devices; in plain text
// a note is just the next paragraph and the demo is dropped.
function unwrapNotes(markdown: string): string {
  return markdown
    .replace(/^<\/?Note>\s*$/gm, "")
    .replace(/^<LivePreviewDemo \/>\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}

// Page headings start at ##, which would collide with the sections here.
function demote(markdown: string, levels: number): string {
  return markdown.replace(/^(#{1,6}) /gm, (_, h: string) => `${"#".repeat(Math.min(6, h.length + levels))} `);
}

function projectLine(p: Project): string {
  return `- [${p.title}](${SITE}/projects/${p.slug}/): ${p.summary}`;
}

export function llmsIndex(): string {
  const projects = listProjects();
  return [
    `# ${resume.name}`,
    "",
    `> ${summary()}`,
    "",
    `${resume.headline}. Contact: ${resume.email}. The whole site as one Markdown file: ${SITE}/llms-full.txt`,
    "",
    "Views here are my own and don't represent any employer.",
    "",
    "## Pages",
    "",
    `- [About](${SITE}/about/): how I went from consumer finance operations to engineering payments and pharmacy claims systems, and how I work`,
    `- [Resume](${SITE}/resume/): experience, skills and education`,
    "",
    "## Projects",
    "",
    ...projects.filter((p) => p.featured).map(projectLine),
    "",
    "## Optional",
    "",
    ...projects.filter((p) => !p.featured).map(projectLine),
    `- [Resume PDF](${SITE}/owen-eldridge-resume.pdf): the same resume as a downloadable file`,
    ...resume.links.map((l) => `- [${l.label}](${l.href})`),
    "",
  ].join("\n");
}

function resumeMarkdown(): string {
  return [
    "## Resume",
    "",
    `${resume.headline}. ${resume.email}.`,
    "",
    "### Skills",
    "",
    ...resume.skills.map((s) => `- **${s.label}:** ${s.items}`),
    "",
    "### Experience",
    "",
    ...resume.experience.flatMap((r) => [
      `#### ${r.title}, ${r.company} (${r.dates})`,
      "",
      r.context,
      "",
      ...r.bullets.map((b) => `- ${b}`),
      "",
    ]),
    "### Education",
    "",
    resume.education,
    "",
    "### Interests",
    "",
    resume.interests,
  ].join("\n");
}

function projectMarkdown(p: Project): string {
  const facts = [
    p.year,
    p.tech.join(", "),
    ...p.links.map((l) => `[${l.label}](${l.href})`),
    p.disclosure,
  ]
    .filter(Boolean)
    .join(" · ");
  return [
    `### ${p.title}`,
    "",
    `${SITE}/projects/${p.slug}/`,
    "",
    facts,
    "",
    `> ${p.summary}`,
    "",
    absolute(demote(unwrapNotes(getProjectBody(p.slug)), 2)),
  ].join("\n");
}

export function llmsFull(): string {
  return [
    `# ${resume.name}`,
    "",
    `> ${summary()}`,
    "",
    "Views here are my own and don't represent any employer.",
    "",
    "## About",
    "",
    absolute(demote(unwrapNotes(aboutBody()), 2)),
    "",
    resumeMarkdown(),
    "",
    "## Projects",
    "",
    listProjects().map(projectMarkdown).join("\n\n"),
    "",
  ].join("\n");
}
