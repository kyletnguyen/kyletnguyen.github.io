import { icons } from './icons';
import {
  navLinks,
  socialLinks,
  hero,
  about,
  highlights,
  trading,
  techStack,
  ai,
  personal,
  contact,
  footer,
  type TechItem,
} from './data/profile';
import type { GithubStats } from './data/github-stats';
import techIconsJson from './data/tech-icons.generated.json';

const techIconMap = techIconsJson as Record<string, { path: string; hex: string; title: string }>;

const fallbackGlyph = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/></svg>`;

function socialIconLink(link: (typeof socialLinks)[number]): string {
  return `<a href="${link.href}" target="_blank" rel="noreferrer noopener" aria-label="${link.label}"
      class="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-[color:var(--color-accent)] hover:text-fg">
      <span class="h-5 w-5">${icons[link.icon]}</span>
    </a>`;
}

function techChip(item: TechItem): string {
  const icon = item.slug ? techIconMap[item.slug] : undefined;
  const glyph = icon ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${icon.path}"/></svg>` : fallbackGlyph;
  const brand = icon ? ` style="--brand:${icon.hex}"` : '';
  return `<span class="chip"${brand}>${glyph}${item.name}</span>`;
}

export function renderNav(): string {
  const links = navLinks.map((l) => `<a href="${l.href}" class="nav-link js-nav-link">${l.label}</a>`).join('');
  return `
  <header id="site-nav" class="fixed inset-x-0 top-0 z-50 h-16 border-b border-line bg-ink/70 backdrop-blur-xl">
    <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
      <a href="#top" class="font-display text-sm font-semibold text-fg">KTN</a>
      <div class="hidden items-center gap-8 md:flex">${links}</div>
      <button id="menu-btn" aria-label="Toggle navigation" class="-m-2.5 p-2.5 text-fg md:hidden">
        <span class="block h-6 w-6">${icons.menu}</span>
      </button>
    </nav>
    <div id="mobile-menu" class="hidden flex-col gap-1 border-b border-line bg-ink px-6 pb-6 md:hidden">
      ${navLinks.map((l) => `<a href="${l.href}" class="js-nav-link block rounded-lg px-3 py-3 text-muted hover:bg-white/5 hover:text-fg">${l.label}</a>`).join('')}
    </div>
  </header>`;
}

export function renderHero(stats: GithubStats): string {
  const statItems: Array<[string, string]> = [
    ['Repos', String(stats.publicRepos)],
    ['Followers', String(stats.followers)],
    ['Commits (1y)', stats.contributionsLastYear.toLocaleString()],
  ];
  return `
  <section id="top" class="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
    <div class="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl"></div>
    <div class="relative mx-auto max-w-6xl px-6 sm:px-8">
      <div class="max-w-3xl">
        <p class="eyebrow reveal">${hero.location}</p>
        <h1 class="reveal mt-4 text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.05]">
          ${hero.name}
        </h1>
        <p id="role-rotator" class="reveal mt-5 min-h-[1.75em] text-lg font-medium text-fg sm:text-xl"></p>

        <div class="reveal mt-8 flex flex-wrap items-center gap-3">
          <a href="#work" class="btn-primary">See what I've built ${icons.arrowDown}</a>
          <a href="#contact" class="btn-ghost">Get in touch</a>
          <div class="ml-1 flex gap-2">${socialLinks.map(socialIconLink).join('')}</div>
        </div>

        <dl class="reveal mt-14 flex max-w-md divide-x divide-white/10 border-t border-line pt-6">
          ${statItems
            .map(
              ([label, value]) => `
            <div class="px-6 first:pl-0">
              <dd class="text-2xl font-semibold tabular-nums text-fg">${value}</dd>
              <dt class="mt-1 text-xs uppercase tracking-wider text-muted">${label}</dt>
            </div>`
            )
            .join('')}
        </dl>
      </div>
    </div>
  </section>`;
}

export function renderAbout(): string {
  return `
  <section id="about" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-3xl px-6 sm:px-8">
      <p class="eyebrow">About</p>
      <h2 class="section-title mt-4">Full-stack, end to end.</h2>
      <div class="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
        ${about.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <blockquote class="mt-10 border-l-2 border-[color:var(--color-accent)] pl-6 italic text-muted">
        "${about.quote.text}"
        <footer class="mt-2 text-sm not-italic text-muted/70">— ${about.quote.author}</footer>
      </blockquote>
    </div>
  </section>`;
}

export function renderHighlights(): string {
  return `
  <section id="work" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 sm:px-8">
      <p class="eyebrow">Selected Work</p>
      <h2 class="section-title mt-4">Things I've built.</h2>
      <p class="lead mt-4">A few systems I've shipped to production. Kept general on purpose, but the engineering is real.</p>
      <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
        ${highlights
          .map(
            (h) => `
          <article class="card">
            <h3 class="font-display text-lg font-semibold text-fg">${h.title}</h3>
            <p class="mt-3 leading-relaxed text-muted">${h.description}</p>
            <div class="mt-5 flex flex-wrap gap-2">
              ${h.tags.map((t) => `<span class="chip">${t}</span>`).join('')}
            </div>
          </article>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

export function renderTrading(): string {
  const curve = 'M0,102 L30,96 L60,100 L90,84 L120,90 L150,70 L180,78 L210,58 L240,66 L270,44 L300,52 L330,30 L360,38 L400,16';
  const metrics: Array<[string, string]> = [
    ['10,000+', 'Securities streamed'],
    ['3', 'Asset classes traded'],
    ['Sub-second', 'Signal to order'],
  ];
  return `
  <section id="trading" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 sm:px-8">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">Markets</p>
      <h2 class="section-title mt-4">${trading.heading}</h2>
      <div class="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div class="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          ${trading.paragraphs.map((p) => `<p>${p}</p>`).join('')}
          <div class="flex flex-wrap gap-2 pt-2">
            ${trading.items.map((t) => `<span class="chip">${t}</span>`).join('')}
          </div>
        </div>
        <div class="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8">
          <svg viewBox="0 0 400 120" preserveAspectRatio="none" class="h-32 w-full" fill="none" aria-hidden="true">
            <path d="${curve} L400,120 L0,120 Z" fill="#34d399" fill-opacity="0.10"/>
            <path d="${curve}" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <dl class="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
            ${metrics
              .map(
                ([value, label]) => `
              <div>
                <dd class="text-xl font-semibold tabular-nums text-fg">${value}</dd>
                <dt class="mt-1 text-xs text-muted">${label}</dt>
              </div>`
              )
              .join('')}
          </dl>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderAi(): string {
  return `
  <section id="ai" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-3xl px-6 sm:px-8">
      <p class="eyebrow flex items-center gap-2"><span class="h-4 w-4 text-accent">${icons.spark}</span> ${ai.heading}</p>
      <h2 class="section-title mt-4">${ai.intro}</h2>
      <div class="mt-6 space-y-5 leading-relaxed text-muted">
        ${ai.paragraphs.map((p) => `<p>${p}</p>`).join('')}
      </div>
      <div class="mt-8 flex flex-wrap gap-2">
        ${ai.items.map((item) => `<span class="chip">${item}</span>`).join('')}
      </div>
    </div>
  </section>`;
}

export function renderTechStack(): string {
  return `
  <section id="stack" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 sm:px-8">
      <p class="eyebrow">Stack</p>
      <h2 class="section-title mt-4">What I build with.</h2>
      <div class="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${techStack
          .map(
            (cat) => `
          <div class="card">
            <h3 class="font-display font-semibold text-fg">${cat.title}</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              ${cat.items.map(techChip).join('')}
            </div>
          </div>`
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

export function renderPersonal(): string {
  return `
  <section id="life" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-6xl px-6 sm:px-8">
      <p class="eyebrow">${personal.heading}</p>
      <h2 class="section-title mt-4">Life away from the keyboard.</h2>
      <p class="lead mt-4">${personal.intro}</p>
      <ul class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        ${personal.items
          .map((item) => {
            const visual = item.image
              ? `<img src="${item.image}" alt="Pepe" class="h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--color-accent)]/40" />`
              : `<span class="text-3xl leading-none">${item.emoji ?? ''}</span>`;
            return `
          <li class="flex flex-col items-center gap-3 rounded-2xl border border-line bg-white/[0.02] p-6 text-center transition-colors hover:border-line-strong hover:bg-white/[0.04]">
            ${visual}
            <span class="text-sm font-medium text-fg">${item.label}</span>
          </li>`;
          })
          .join('')}
      </ul>
    </div>
  </section>`;
}

export function renderContact(): string {
  return `
  <section id="contact" class="reveal py-20 sm:py-32">
    <div class="mx-auto max-w-xl px-6 sm:px-8">
      <p class="eyebrow text-center">Contact</p>
      <h2 class="section-title mt-4 text-center">${contact.heading}</h2>
      <p class="mt-4 text-center text-muted">${contact.blurb}</p>

      <form id="contact-form" class="mt-10 flex flex-col gap-4" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <input type="text" name="name" required placeholder="Your name" class="input-field" />
          <input type="email" name="email" required placeholder="Email address" class="input-field" />
        </div>
        <textarea name="message" required rows="6" placeholder="Write your message" class="input-field min-h-32 resize-none"></textarea>
        <input type="text" name="_honey" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <button type="submit" id="form-submit" class="btn-primary w-full sm:w-auto sm:self-start">
          Send message ${icons.send}
        </button>
        <p id="form-status" class="text-sm text-muted" role="status" aria-live="polite"></p>
      </form>
    </div>
  </section>`;
}

export function renderFooter(): string {
  return `
  <footer class="border-t border-line px-6 py-12 sm:px-8">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p class="text-sm text-muted">${footer.tag}</p>
      <div class="flex gap-2">${socialLinks.map(socialIconLink).join('')}</div>
    </div>
  </footer>`;
}
