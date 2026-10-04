import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProjectFacts } from "@/components/project-facts";
import { PERSON_ID, SITE, person } from "@/lib/identity";
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
    alternates: { canonical: `/projects/${slug}/` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/projects/${slug}.mdx`);

  const repo = project.links.find((l) => l.href.startsWith("https://github.com/"));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "TechArticle",
        "@id": `${SITE}/projects/${slug}/`,
        url: `${SITE}/projects/${slug}/`,
        headline: project.title,
        description: project.summary,
        author: { "@id": PERSON_ID },
        keywords: project.tech.join(", "),
        ...(repo && {
          about: {
            "@type": "SoftwareSourceCode",
            codeRepository: repo.href,
            programmingLanguage: project.tech,
          },
        }),
      },
    ],
  };

  return (
    <article className={`frame ${styles.article}`}>
      <JsonLd data={data} />
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
