import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.name}>
        Owen Eldridge
      </Link>
      <nav aria-label="Site">
        <ul className={styles.nav}>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/resume">Resume</Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
