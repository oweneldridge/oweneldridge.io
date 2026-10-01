import { Fragment } from "react";
import Link from "next/link";
import { ProjectFacts } from "@/components/project-facts";
import { Reconciliation } from "@/components/reconciliation";
import { listProjects, type Project } from "@/lib/projects";
import styles from "./page.module.css";

// One project: the title and summary in the reading column, then the
// facts (when, what with, where the code is). The facts come right after
// the entry in the source, so the frame grid sets them level with it on
// a wide screen and directly underneath on a narrow one.
function Entry({ project, detailed }: { project: Project; detailed: boolean }) {
  return (
    <Fragment>
      <div className={detailed ? styles.entry : styles.minor}>
        <h3
          className={styles.title}
          style={{ viewTransitionName: `project-${project.slug}` }}
        >
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className={styles.summary}>{project.summary}</p>
      </div>
      <ProjectFacts project={project} tech={detailed} />
    </Fragment>
  );
}

export default function Home() {
  const projects = listProjects();
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);

  return (
    <div className={`frame ${styles.page}`}>
      <h1 className={styles.statement}>
        I&rsquo;m a full-stack engineer working on money in regulated
        industries: payments infrastructure, and now pharmacy claims.
      </h1>
      <div className={styles.intro}>
        <p className={styles.lede}>
          Most of my work is about correctness in money and claims data. I
          establish what the data supports, find where it stopped being true,
          and say clearly what hasn&rsquo;t been measured yet. I came up through the operations
          side of consumer finance before I wrote software for a living, so I
          knew what the numbers meant before I built the systems that carry
          them.
        </p>
        <p className={styles.after}>
          I write Go, TypeScript, and a lot of SQL at work, and run my own
          homelab outside it.
        </p>
      </div>
      <Reconciliation className={styles.recon} />

      <h2 id="work" className={styles.heading}>
        Selected work
      </h2>
      {featured.map((project) => (
        <Entry key={project.slug} project={project} detailed />
      ))}

      {archive.length > 0 && (
        <h2 className={styles.heading}>Other projects</h2>
      )}
      {archive.map((project) => (
        <Entry key={project.slug} project={project} detailed={false} />
      ))}
    </div>
  );
}
