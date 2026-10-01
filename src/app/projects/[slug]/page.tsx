import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFacts } from "@/components/project-facts";
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
    <article className={`frame ${styles.article}`}>
      <p className={styles.back}>
        <Link href="/#work">All projects</Link>
      </p>
      <h1
        className={styles.title}
        style={{ viewTransitionName: `project-${project.slug}` }}
      >
        {project.title}
      </h1>
      <div className="prose">
        <ProjectFacts project={project} className={styles.facts} />
        <Body />
      </div>
    </article>
  );
}
