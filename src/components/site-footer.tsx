import { execSync } from "node:child_process";
import styles from "./site-footer.module.css";

// The date of the last commit, read at build time, so the footer says
// when the content last changed rather than when it was last deployed.
function lastUpdated(): string | null {
  try {
    const iso = execSync("git log -1 --format=%cs", { encoding: "utf8" }).trim();
    return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return null;
  }
}

export function SiteFooter() {
  const updated = lastUpdated();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <ul className={styles.links}>
          <li>
            <a href="mailto:owen.eldridge@pm.me">owen.eldridge@pm.me</a>
          </li>
          <li>
            <a href="https://github.com/oweneldridge">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/oweneldridge">LinkedIn</a>
          </li>
        </ul>
        <p className={styles.note}>
          Views here are my own and don&rsquo;t represent any employer. Plain
          HTML and CSS; the only script is the theme switch. No analytics or
          trackers. <a href="https://codeberg.org/oweneldridge/oweneldridge.io">
            Source on Codeberg
          </a>
          {updated && <>. Updated {updated}</>}.
        </p>
      </div>
    </footer>
  );
}
