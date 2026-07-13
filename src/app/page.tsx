import Link from "next/link";
import { listProjects } from "@/lib/projects";
import styles from "./page.module.css";

export default function Home() {
  const projects = listProjects();
  const featured = projects.filter((p) => p.featured);
  const archive = projects.filter((p) => !p.featured);

  return (
    <div className={styles.page}>
      <section className={`${styles.hero} rise`}>
        <h1 className={styles.heroTitle}>
          Full-stack engineer. I build software meant to outlast the hype
          cycle, and I run my own.
        </h1>
        <p className={styles.heroSub}>
          Days go to healthcare claims infrastructure in Go, GraphQL, and
          React. Nights go to a homelab, an e-reader that plays audiobooks
          because I taught it to, and tools that keep my data mine.
        </p>
      </section>

      <section aria-labelledby="work-heading" className={styles.work}>
        <h2
          id="work-heading"
          className="overline rise"
          style={{ "--rise-order": 1 } as React.CSSProperties}
        >
          Selected work
        </h2>
        <ol className={styles.index}>
          {featured.map((project, i) => (
            <li
              key={project.slug}
              className={`${styles.entry} rise`}
              style={{ "--rise-order": i + 2 } as React.CSSProperties}
            >
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.entryTitle}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={styles.entryLink}
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className={styles.entrySummary}>{project.summary}</p>
                <p className={styles.entryTech}>{project.tech.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {archive.length > 0 && (
        <section aria-labelledby="archive-heading" className={styles.archive}>
          <h2
            id="archive-heading"
            className="overline rise"
            style={
              { "--rise-order": featured.length + 2 } as React.CSSProperties
            }
          >
            Earlier and elsewhere
          </h2>
          <ul className={styles.archiveList}>
            {archive.map((project) => (
              <li key={project.slug} className={styles.archiveEntry}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={styles.archiveLink}
                >
                  {project.title}
                </Link>
                <span className={styles.archiveSummary}>
                  {project.summary}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
