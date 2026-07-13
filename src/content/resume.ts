// The resume, as data. The page and the printable PDF both render from
// this, so there is exactly one copy to keep true.

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
        "Led a cross-system data quality initiative spanning 3 repositories that corrected 300,000+ pharmacy claims, uncovering a type-mismatch bug that had silently disabled an entire eligibility exclusion system, and executing production backfills through formal change control",
        "Resolved CEO-escalated P1 reporting crises by root-causing deleted-record leakage and missing query deduplication, delivering 3 corrected partner reports on a compressed timeline and leaving behind a reusable correction runbook",
        "Built a CLI migration validation tool with 24 automated checks and 82 unit tests that verified 150 migrated groups during a legacy-to-modern claims platform migration, providing quantitative evidence of data integrity before decommission",
        "Leading a cross-functional Historical Claims Import initiative as engineering lead, producing a 5-phase tech plan with 8 implementation tickets and coordinating product, engineering, and data teams",
        "Built Python automation for production claims analysis that cut batch processing from 4-6 hours to 5 minutes, adopted as the standard workflow by Claims Operations for 10+ batches per month with zero production bugs",
        "Designed GraphQL APIs providing cost calculation transparency for 100% of pharmacy claims, migrating AWS SDK v1 to v2 and reducing frontend duplication by 28% through GraphQL fragments",
        "Investigated and resolved P0 production incidents affecting 140+ partner organizations and up to 1.88M claims, from root cause analysis through data remediation to runbooks that prevent recurrence",
        "Maintained working expertise across 8 repositories, performing 100+ code reviews per quarter and catching security vulnerabilities, nil-pointer dereferences, and race conditions before they shipped",
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
    "German wine, classical guitar, adventure cycling, woodworking, ice carving, travel, and cooking most of the world's cuisines at home.",
};
