import type { Project } from "@/lib/projects";
import styles from "./project-facts.module.css";

// The facts that sit beside a project in the evidence column: when, what
// with, and where to read the code. Each on its own line, so no
// separators. Used on the home page and at the top of each project page.
export function ProjectFacts({
  project,
  tech = true,
  className = "",
}: {
  project: Project;
  tech?: boolean;
  className?: string;
}) {
  return (
    <div className={`aside ${styles.facts} ${className}`}>
      <span className={styles.year}>{project.year}</span>
      {tech && <span>{project.tech.join(", ")}</span>}
      {project.links.map((link) => (
        <a key={link.href} href={link.href}>
          {link.label}
        </a>
      ))}
      {project.disclosure && (
        <span className={styles.disclosure}>{project.disclosure}</span>
      )}
    </div>
  );
}
