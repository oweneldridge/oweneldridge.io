import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, listProjects } from "@/lib/projects";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  return (
    <article className={styles.article}>
      <p className={styles.back}>
        <Link href="/">Back to the index</Link>
      </p>
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <dl className={styles.meta}>
          <div className={styles.metaRow}>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div className={styles.metaRow}>
            <dt>Built with</dt>
            <dd>{project.tech.join(", ")}</dd>
          </div>
          {project.links.length > 0 && (
            <div className={styles.metaRow}>
              <dt>Links</dt>
              <dd>
                {project.links.map((link, i) => (
                  <span key={link.href}>
                    {i > 0 && " · "}
                    <a href={link.href}>{link.label}</a>
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </header>
      <div className="prose">
        <Body />
      </div>
    </article>
  );
}
