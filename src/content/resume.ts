// The resume, as data. The page renders from this, and the downloadable
// PDF is generated from that page: after editing, run
// scripts/make-resume-pdf.sh and commit the refreshed PDF alongside.
//
// This is the public-web version, kept to the same register as my
// LinkedIn profile: employers named, no internal metrics, no incident
// war stories with numbers attached. The detailed private resume lives
// elsewhere.

export type Role = {
  company: string;
  title: string;
  context: string;
  dates: string;
  bullets: string[];
};

export const resume = {
  name: "Owen Eldridge",
  headline: "Full Stack Software Engineer",
  email: "owen.eldridge@pm.me",
  // Printed on the PDF only: it travels away from the site, so it should
  // say where home is. On screen you are already here.
  site: "oweneldridge.io",
  links: [
    { label: "github.com/oweneldridge", href: "https://github.com/oweneldridge" },
    {
      label: "linkedin.com/in/oweneldridge",
      href: "https://www.linkedin.com/in/oweneldridge",
    },
  ],
  skills: [
    {
      label: "Languages and frameworks",
      items:
        "Go, GORM, Python, PyTest, TypeScript, Node.js, React, Next.js, GraphQL (gqlgen), gRPC/Protobuf, Django, Ember.js, Redux, OAuth 2.0",
    },
    {
      label: "Infrastructure and data",
      items:
        "AWS (Lambda, S3, SQS, SNS, Kinesis, EKS, EventBridge, Step Functions, ECS, CDK, IAM, Secrets Manager), PostgreSQL, Redis, DynamoDB",
    },
    {
      label: "Tools and practices",
      items:
        "GitHub Actions, Docker, Podman, Datadog APM/Logs, Statsig, Playwright, Vitest, SonarCloud, CI/CD, microservices, feature-flag rollouts, Agile/Scrum",
    },
  ],
  experience: [
    {
      company: "SmithRx",
      title: "Software Engineer",
      context: "Healthcare technology, pharmacy benefits management",
      dates: "2025 to present",
      bullets: [
        "Engineering lead on a historical claims import platform: designed the data model so adjudication, accumulators, and reporting could consume imported claims with no code changes from those teams, and delivered it code-complete across three repositories ahead of the deadline",
        "Owned cross-team data-integrity validation for a legacy-to-modern claims platform migration: built a CLI validation suite with dozens of automated checks and a thorough unit test suite, wrote the source-to-target mapping and validation guide the team adopted, and independently confirmed the full dry-run at a 100% match across more than a million rows before legacy decommission",
        "Found and fixed a migration defect that had attached claims to the wrong members, correcting hundreds of thousands of claims and heading off downstream eligibility, accumulator, and reporting errors",
        "Led cross-system data quality initiatives across the claims pipeline, finding and fixing systemic issues that affected hundreds of thousands of records, with production corrections delivered through formal change control",
        "Root-caused a high-exposure billing discrepancy and showed the real member impact was a small fraction of the headline figure, then rewrote the query plan behind it to take a multi-million-row member resolution from twenty minutes to seconds",
        "Investigated and resolved escalated production reporting incidents through root cause analysis, and wrote the correction runbooks so the fixes outlived the incidents",
        "Built Python automation for production claims analysis that turned hours of manual batch work into minutes, adopted as the operations team's standard workflow",
        "Designed GraphQL APIs bringing cost calculation transparency to pharmacy claims, with Relay-compliant patterns, graceful degradation for older data, and shared fragments that cut frontend duplication",
        "Performed 100+ code reviews per quarter across 8 repositories, catching security vulnerabilities, data integrity bugs, and race conditions before they shipped",
      ],
    },
    {
      company: "Indigo Tech Group | Mindbody",
      title: "Technical Lead, Full Stack Software Engineer",
      context: "Payments",
      dates: "2023 to 2025",
      bullets: [
        "Authored Python coding standards based on PEP 8/257 that became the team baseline, covering layout, naming, error handling, and documentation while keeping the payments platform PCI compliant",
        "Engineered a webhook subscription management system on AWS Lambda and DynamoDB, enabling real-time payment event notifications to external systems",
        "Built card-present transaction processing by integrating the TriPOS Cloud API with Payrix, from POS terminal communication through transaction storage",
        "Architected a secure, responsive iframe payment component in Next.js and TypeScript for credit card and bank account management inside the core application",
        "Restructured monolithic Lambdas into modular microservices with PyTest suites at 80%+ coverage, surfacing 60+ bugs along the way",
        "Designed the Datadog tagging schema and monitoring strategy across payment services, cutting incident response time through structured, contextual logging",
        "Mentored junior engineers through reviews and pairing, on Pythonic idioms, data structures, and test-driven development",
      ],
    },
    {
      company: "Mariana Tek | Xplor Technologies",
      title: "Full Stack Software Engineer",
      context: "Boutique fitness studio management SaaS",
      dates: "2022 to 2023",
      bullets: [
        "Developed the Ember.js admin application and Django REST APIs for a multi-tenant platform serving Barry's, barre3, and Pvolve",
        "Implemented cart and checkout features including line-item discounts, quick-sale modals, and payment flows for in-studio point of sale",
        "Built automated end-to-end suites in Selenium and Python covering check-in, checkout, and class reservation flows",
        "Engineered a multi-tenant customization framework letting franchise clients ship white-labeled apps with their own styling and feature sets",
      ],
    },
    {
      company: "Spearmint",
      title: "Full Stack Engineer",
      context:
        "Accessibility-focused GUI for generating JavaScript tests, 1,000+ GitHub stars",
      dates: "2021 to 2022",
      bullets: [
        "Improved application performance roughly 300% and cut code editor memory use 60% by replacing heavyweight dependencies while preserving full terminal emulation",
        "Extended TypeScript coverage through the React-Redux layer so action creators, reducers, and state were checked at compile time",
        "Implemented Redux for immutable, predictable state, eliminating unnecessary re-renders and prop drilling",
      ],
    },
  ] satisfies Role[],
  education:
    "Florida Atlantic University, Computer Science. Johnson & Wales University, BS.",
  interests:
    "Homelab and self-hosting, open-source tinkering, classical guitar, adventure cycling, travel, and cooking most of the world's cuisines at home.",
};
