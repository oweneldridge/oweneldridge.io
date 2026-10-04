// Who the site is about, as structured data (schema.org JSON-LD). Search
// engines and AI assistants read this to tell this Owen Eldridge from any
// other, and to connect the site to the same person's other profiles.
// Only facts already public on the site, the resume, or GitHub.

export const SITE = "https://oweneldridge.io";
export const PERSON_ID = `${SITE}/#owen`;

export const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Owen Eldridge",
  url: `${SITE}/`,
  jobTitle: "Software Engineer",
  description:
    "Full-stack engineer working on money in regulated industries: payments infrastructure, now pharmacy claims, and proving the numbers still reconcile.",
  email: "mailto:owen.eldridge@pm.me",
  homeLocation: {
    "@type": "Place",
    name: "Tampa Bay Area, Florida, United States",
  },
  sameAs: [
    "https://github.com/oweneldridge",
    "https://www.linkedin.com/in/oweneldridge",
    "https://codeberg.org/oweneldridge",
  ],
  knowsAbout: [
    "Go",
    "TypeScript",
    "Python",
    "SQL",
    "PostgreSQL",
    "GraphQL",
    "AWS",
    "React",
    "Next.js",
    "Rust",
    "Payments",
    "Payment facilitation",
    "PCI DSS",
    "Pharmacy claims",
    "Data integrity",
    "Reconciliation",
    "Data migration",
    "Accessibility",
    "Self-hosting",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Florida Atlantic University" },
    { "@type": "CollegeOrUniversity", name: "Johnson & Wales University" },
  ],
};

export function profilePage(path: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "ProfilePage",
        "@id": `${SITE}${path}`,
        url: `${SITE}${path}`,
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}
