export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'AI', href: '#ai' },
  { label: 'Stack', href: '#stack' },
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
  roles: ['Full-stack engineer.', 'GraphQL, TypeScript, AWS.', 'I like building the whole thing.'],
  location: 'Southern California',
};

export const about = {
  paragraphs: [
    "I'm a full-stack engineer. I like owning the whole thing, from the database and APIs on the backend to the screens people actually use.",
    "Lately most of my work is backend and infrastructure. I build data pipelines on AWS, design GraphQL and REST APIs, and keep busy services running under real traffic. A lot of the job is the part nobody sees: making sure work retries when it fails, never runs twice, and is easy to trace when something goes sideways.",
    "I've shipped plenty on the front end and on mobile too, with React and React Native, so I move up and down the stack depending on what a problem actually needs.",
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
  accent: string;
}

export const highlights: Highlight[] = [
  {
    title: 'Real estate app',
    description:
      "Helped launch the company's first mobile app as a founding engineer and its second-most-active contributor, taking it from an empty repo to a product used daily. Established the CI, testing, and iOS and Android release pipelines, then delivered core product surfaces spanning property search with maps and filters, saved listings, contact management, and push notifications.",
    tags: ['React Native', 'iOS & Android', 'Fastlane'],
    accent: '#38bdf8',
  },
  {
    title: 'Algorithmic trading platform',
    description:
      'Built a C# platform that automates options, futures, and equities strategies and executes far faster than a human trader. Integrated a market-data feed streaming live quotes across 10,000+ securities and implemented the buy and sell signal logic driven by price, volume, and timing.',
    tags: ['C#', '.NET', 'Real-Time Market Data'],
    accent: '#34d399',
  },
  {
    title: 'Data enrichment pipeline',
    description:
      'Designed an event-driven enrichment pipeline that processes records at scale while cutting third-party API request volume roughly 10x through batching. Added rate-limit backoff, dead-letter recovery so failed calls are never dropped, and a reconciliation job that automatically backfills records that fall behind.',
    tags: ['Event-Driven', 'AWS SNS/SQS', 'Reliability'],
    accent: '#8b7cf6',
  },
  {
    title: 'Federated GraphQL APIs',
    description:
      'Own and evolve part of a federated GraphQL schema that dozens of internal services and integrations depend on. Ship every change through versioned, reviewed releases with automated schema checks so downstream consumers never break.',
    tags: ['GraphQL', 'Apollo Federation', 'NestJS'],
    accent: '#f472b6',
  },
  {
    title: 'High-throughput data sync',
    description:
      'Built real-time data-sync pipelines plus a throttled bulk mode capable of moving millions of records without overwhelming a rate-limited upstream API. Rolled the entire migration out safely behind feature flags.',
    tags: ['AWS Lambda', 'Feature Flags', 'Scale'],
    accent: '#fbbf24',
  },
  {
    title: 'Third-party integrations',
    description:
      'Built integration systems that sync data with external CRM vendors and keep records reconciled across both sides, using confidence-scored automatic matching with a manual override for ambiguous cases.',
    tags: ['Distributed Systems', 'Multi-Tenant SaaS'],
    accent: '#22d3ee',
  },
];

export interface TechItem {
  name: string;
  /** simple-icons slug; omit for items with no brand logo (renders a neutral glyph). */
  slug?: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    title: 'Languages',
    items: [
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'C#' },
      { name: 'Python', slug: 'python' },
      { name: 'Java', slug: 'openjdk' },
      { name: 'C / C++', slug: 'cplusplus' },
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'NestJS', slug: 'nestjs' },
      { name: 'GraphQL', slug: 'graphql' },
      { name: 'Apollo Federation', slug: 'apollographql' },
      { name: '.NET / ASP.NET Core', slug: 'dotnet' },
      { name: 'Razor Pages' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Frontend & Mobile',
    items: [
      { name: 'React', slug: 'react' },
      { name: 'React Native', slug: 'react' },
      { name: 'Apollo Client', slug: 'apollographql' },
      { name: 'Reanimated' },
      { name: 'Zustand' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
    ],
  },
  {
    title: 'Data & Messaging',
    items: [
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'SQL Server' },
      { name: 'Redis', slug: 'redis' },
      { name: 'Apache Kafka', slug: 'apachekafka' },
      { name: 'AWS SQS / SNS' },
      { name: 'Flyway', slug: 'flyway' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    items: [
      { name: 'AWS Lambda' },
      { name: 'AWS S3' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Kubernetes', slug: 'kubernetes' },
      { name: 'ArgoCD', slug: 'argo' },
      { name: 'Serverless Framework', slug: 'serverless' },
    ],
  },
  {
    title: 'Dev Tooling',
    items: [
      { name: 'Git', slug: 'git' },
      { name: 'pnpm', slug: 'pnpm' },
      { name: 'Turborepo', slug: 'turborepo' },
      { name: 'GitHub Actions', slug: 'githubactions' },
      { name: 'Fastlane', slug: 'fastlane' },
      { name: 'Jest', slug: 'jest' },
      { name: 'Appium', slug: 'appium' },
      { name: 'Datadog', slug: 'datadog' },
      { name: 'LaunchDarkly' },
    ],
  },
  {
    title: 'Collaboration & PM',
    items: [
      { name: 'Linear', slug: 'linear' },
      { name: 'Jira', slug: 'jira' },
      { name: 'Notion', slug: 'notion' },
      { name: 'Confluence', slug: 'confluence' },
    ],
  },
];

export const ai = {
  heading: 'AI & Automation',
  intro: 'I use AI in the actual work, not as a gimmick.',
  paragraphs: [
    "I've worked on features that use large language models like Claude and Gemini to summarize data and suggest next steps instead of leaning on hard-coded rules.",
    'Day to day I lean on Claude Code while I build. I use it to plan changes, review my own diffs, and dig through logs and infrastructure when something breaks. I built most of this site with it too.',
  ],
  items: ['Claude', 'Claude Code', 'Google Gemini', 'LLM Automation', 'Agentic Workflows'],
};

export interface PersonalItem {
  emoji?: string;
  image?: string;
  label: string;
}

export const personal = {
  heading: 'Beyond the Code',
  intro: "When I'm not shipping code, here's what fills the rest of my time.",
  items: [
    { emoji: '👑', label: 'Girl dad to three daughters' },
    { emoji: '🐕', label: 'Khloe, my Shiba Inu' },
    { emoji: '🐱', label: 'King, my Mackerel tabby' },
    { emoji: '⌨️', label: 'Mechanical keyboards' },
    { emoji: '🎮', label: 'Video games' },
    { emoji: '🎹', label: 'Piano, the one instrument I can play' },
    { emoji: '🔧', label: 'Working on cars' },
    { emoji: '🏠', label: 'Home renovations' },
    { image: '/pepe.png', label: 'Pepe memes, always' },
  ] as PersonalItem[],
};

export const contact = {
  heading: 'Get in touch',
  blurb: "Want to work together, or just say hi? Drop me a message below. You don't even need my email.",
  formEndpoint: 'https://formsubmit.co/ajax/73f20528f003d0696734713bde65e25c',
};

export const footer = {
  tag: `Kyle Thien Nguyen © ${new Date().getUTCFullYear()}`,
};
