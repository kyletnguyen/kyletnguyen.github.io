export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Selected Work', href: '#work' },
  { label: 'AI & Automation', href: '#ai' },
  { label: 'Contact', href: '#contact' },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin';
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/kyletnguyen', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ktnguyen43', icon: 'linkedin' },
];

export const hero = {
  name: 'Kyle Thien Nguyen',
  roles: ['Software Engineer.', 'GraphQL, TypeScript & AI-adjacent systems.', 'Building production SaaS.'],
  location: 'Southern California',
};

export const about = {
  paragraphs: [
    "I'm a software engineer at a real estate technology company, where I work in a TypeScript monorepo that runs the CRM and third-party integration platform thousands of businesses rely on day to day.",
    "Most of my time lives in event-driven, multi-tenant backend systems: I own a production contact-enrichment pipeline built on SNS/SQS that batches, retries, and reconciles data against a third-party identity-resolution API at scale; I maintain GraphQL Federation surface area on our core CRM subgraph; and I've built real-time and backfill data-sync pipelines against external partner APIs, complete with feature-flagged rollouts and queue-sharding for safe bulk operations.",
    "I also spend time on the mobile side of the product in React Native, and on the platform side — CI/CD, schema governance across a federated graph, and the operational tooling that keeps a fast-moving monorepo maintainable as it grows.",
    "Outside of work you'll find me deep in a video game, watching sports, or tinkering with whatever new gadget or piece of tech just came out.",
  ],
  quote: {
    text: 'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.',
    author: 'Linus Torvalds, creator of Linux',
  },
};

export interface Highlight {
  title: string;
  description: string;
  tags: string[];
}

export const highlights: Highlight[] = [
  {
    title: 'Production contact-enrichment platform',
    description:
      'Designed and hardened an event-driven enrichment pipeline (SNS → SQS) integrating a third-party identity-resolution API — batched processing at scale, exponential backoff and DLQ-backed error recovery, and a reconciliation system that automatically catches up contacts when entitlements change.',
    tags: ['Event-Driven Architecture', 'AWS SNS/SQS', 'Reliability Engineering'],
  },
  {
    title: 'GraphQL Federation on the core CRM subgraph',
    description:
      'Own schema surface area on the company subgraph — federated queries, M2M-only access patterns, and mutations that dozens of internal services and integrations depend on, all shipped through changeset-driven, versioned releases.',
    tags: ['GraphQL', 'Apollo Federation', 'NestJS'],
  },
  {
    title: 'Real-time + backfill data-sync pipeline',
    description:
      'Built a pipeline syncing data from a partner email API in real time, plus a safe, throttled bulk-backfill mode with FIFO queue sharding and feature-flagged rollout — designed to move millions of records without overwhelming a rate-limited upstream API.',
    tags: ['AWS Lambda', 'Feature Flags', 'Rate-Limit-Aware Design'],
  },
  {
    title: 'Integration Hub agent-mapping reconciliation',
    description:
      'Built auto-reconciliation between external CRM vendor users and internal accounts, with confidence-scored matching and a manual-override path — wired into onboarding and vendor activity push flows across the integration platform.',
    tags: ['Distributed Systems', 'Multi-Tenant SaaS'],
  },
];

export interface TechCategory {
  title: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'Java', 'C / C++'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'NestJS', 'GraphQL', 'Apollo Federation', 'REST APIs', 'Sequelize'],
  },
  {
    title: 'Frontend & Mobile',
    items: ['React', 'React Native', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    title: 'Distributed & Event-Driven Systems',
    items: ['PostgreSQL', 'AWS SQS / SNS', 'Apache Kafka', 'Redis', 'Flyway', 'DLQ / Retry Patterns'],
  },
  {
    title: 'Cloud & Infrastructure',
    items: ['AWS Lambda', 'AWS S3', 'Docker', 'Kubernetes', 'ArgoCD (GitOps)', 'Serverless Framework'],
  },
  {
    title: 'Dev Tooling & Platform',
    items: ['pnpm', 'Turborepo', 'GitHub Actions', 'ESLint', 'Jest', 'Datadog', 'LaunchDarkly'],
  },
];

export const ai = {
  heading: 'AI & Automation',
  intro: "AI isn't a side interest for me — it's part of how I ship software, both at work and on my own systems.",
  paragraphs: [
    "I work adjacent to several AI-powered features in production — an AI-driven lead-nurturing message pipeline, and enrichment/scoring services that use LLMs (Anthropic Claude, Google Gemini) to summarize contacts and surface suggested next actions instead of relying on hand-written rules.",
    "Day to day, I use Claude Code as a core part of my own engineering workflow — planning changes, reviewing diffs, digging through infrastructure (ArgoCD, Datadog, CI/CD) when something breaks, and even building this site. I'm actively deepening how I use agentic AI tooling for real engineering work, not just chat.",
  ],
  items: ['Anthropic Claude API', 'Claude Code', 'Google Gemini', 'LLM-Powered Automation', 'Agentic Dev Workflows'],
};

export const contact = {
  heading: 'Contact Me',
  blurb: "Interested in working together or just want to say hi? Send a message — no email address required.",
  formEndpoint: 'https://formsubmit.co/ajax/73f20528f003d0696734713bde65e25c',
};

export const footer = {
  tag: `Kyle Thien Nguyen © ${new Date().getUTCFullYear()}`,
};
