import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
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
      <p className={styles.colophon}>
        Set in Fraunces and Newsreader. Built with Next.js, no trackers.
      </p>
    </footer>
  );
}
