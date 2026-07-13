import type { Metadata } from "next";
import { resume } from "@/content/resume";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description: "Owen Eldridge's resume: full stack software engineer.",
};

export default function ResumePage() {
  return (
    <article className={styles.article}>
      <header className={styles.top}>
        <div>
          <h1 className={styles.title}>Resume</h1>
          <p className={styles.headline}>{resume.headline}</p>
          <p className={styles.printContact}>
            {[resume.email, ...resume.links.map((l) => l.label)].join(" · ")}
          </p>
        </div>
        <a
          href="/owen-eldridge-resume.pdf"
          className={styles.download}
          download
        >
          Download as PDF
        </a>
      </header>

      <section aria-labelledby="skills-heading" className={styles.section}>
        <h2 id="skills-heading" className="overline">
          Skills
        </h2>
        <dl className={styles.skills}>
          {resume.skills.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <dt>{group.label}</dt>
              <dd>{group.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="experience-heading" className={styles.section}>
        <h2 id="experience-heading" className="overline">
          Experience
        </h2>
        {resume.experience.map((role) => (
          <section
            key={`${role.company}-${role.dates}`}
            className={styles.role}
            aria-label={`${role.title} at ${role.company}`}
          >
            <div className={styles.roleHeader}>
              <h3 className={styles.roleCompany}>{role.company}</h3>
              <p className={styles.roleDates}>{role.dates}</p>
            </div>
            <p className={styles.roleTitle}>
              {role.title}
              <span className={styles.roleContext}> · {role.context}</span>
            </p>
            <ul className={styles.bullets}>
              {role.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section aria-labelledby="education-heading" className={styles.section}>
        <h2 id="education-heading" className="overline">
          Education
        </h2>
        <p className={styles.plain}>{resume.education}</p>
      </section>

      <section aria-labelledby="interests-heading" className={styles.section}>
        <h2 id="interests-heading" className="overline">
          Off hours
        </h2>
        <p className={styles.plain}>{resume.interests}</p>
      </section>
    </article>
  );
}
