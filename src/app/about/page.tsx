import type { Metadata } from "next";
import About from "@/content/about.mdx";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Who I am, how I got here, and what I care about building.",
};

export default function AboutPage() {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>About</h1>
      <div className="prose">
        <About />
      </div>
    </article>
  );
}
