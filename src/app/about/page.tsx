import type { Metadata } from "next";
import About from "@/content/about.mdx";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I went from the operations side of consumer finance to engineering payments and pharmacy claims systems, and how I work.",
};

export default function AboutPage() {
  return (
    <article className={`frame ${styles.article}`}>
      <h1 className={styles.title}>About</h1>
      <div className="prose">
        <About />
      </div>
    </article>
  );
}
