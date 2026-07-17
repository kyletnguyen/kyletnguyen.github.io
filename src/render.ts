import { icons } from './icons';
import {
  navLinks,
  socialLinks,
  hero,
  about,
  highlights,
  techStack,
  ai,
  contact,
  footer,
} from './data/profile';
import type { GithubStats } from './data/github-stats';

function socialIconLink(link: (typeof socialLinks)[number], extraClass = ''): string {
  return `<a href="${link.href}" target="_blank" rel="noreferrer noopener" aria-label="${link.label}"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:-translate-y-0.5 hover:text-white hover:border-[var(--color-accent)] ${extraClass}">
      <span class="h-5 w-5">${icons[link.icon]}</span>
    </a>`;
}

export function renderNav(): string {
  const links = navLinks.map((l) => `<a href="${l.href}" class="nav-link js-nav-link">${l.label}</a>`).join('');
  return `
  <header id="site-nav" class="fixed inset-x-0 top-0 z-50 transition-all duration-300">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <a href="#top" class="font-display text-lg font-bold tracking-tight text-white">KTN</a>
      <nav class="hidden items-center gap-8 md:flex">${links}</nav>
      <button id="menu-btn" aria-label="Toggle navigation" class="-m-2.5 p-2.5 text-white md:hidden">
        <span class="h-6 w-6 block">${icons.menu}</span>
      </button>
    </div>
    <div id="mobile-menu" class="hidden flex-col gap-1 bg-[var(--color-bg-soft)]/95 px-6 pb-6 backdrop-blur md:hidden">
      ${navLinks.map((l) => `<a href="${l.href}" class="js-nav-link block rounded-lg px-3 py-3 text-white/80 hover:bg-white/5 hover:text-white">${l.label}</a>`).join('')}
    </div>
  </header>`;
}

export function renderHero(stats: GithubStats): string {
  const statItems: Array<[string, string]> = [
    ['Public repos', String(stats.publicRepos)],
    ['GitHub followers', String(stats.followers)],
    ['Contributions (1y)', stats.contributionsLastYear.toLocaleString()],
  ];
  return `
  <section id="top" class="bg-grid relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28">
    <div class="mx-auto w-full max-w-6xl">
      <p class="font-display mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--color-accent)]">
        ${hero.location}
      </p>
      <h1 class="font-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
        ${hero.name}
      </h1>
      <p id="role-rotator" class="mt-6 h-8 text-xl font-medium text-white/70 sm:text-2xl"></p>

      <div class="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
        ${statItems
          .map(
            ([label, value]) => `
          <div>
            <p class="font-display text-2xl font-bold text-white sm:text-3xl">${value}</p>
            <p class="mt-1 text-xs text-white/50">${label}</p>
          </div>`
          )
          .join('')}
      </div>

      <div class="mt-12 flex flex-wrap items-center gap-4">
        <a href="#work" class="btn-primary">See what I've shipped ${icons.arrowDown}</a>
        <div class="flex gap-3">${socialLinks.map((l) => socialIconLink(l)).join('')}</div>
      </div>
    </div>
  </section>`;
}

export function renderAbout(): string {
  return `
  <section id="about" class="reveal mx-auto max-w-4xl px-6 py-28">
    <h2 class="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">About</h2>
    <div class="mt-6 space-y-5 text-lg leading-relaxed text-white/80">
      ${about.paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <blockquote class="mt-10 border-l-2 border-[var(--color-accent)] pl-6 text-white/60 italic">
      "${about.quote.text}"
      <footer class="mt-2 text-sm not-italic text-white/40">— ${about.quote.author}</footer>
    </blockquote>
  </section>`;
}

export function renderTechStack(): string {
  return `
  <section id="stack" class="reveal mx-auto max-w-6xl px-6 py-20">
    <h2 class="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">Tech Stack</h2>
    <p class="mt-4 max-w-2xl text-white/60">Technologies I work with day to day, shaped by what I actually ship.</p>
    <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      ${techStack
        .map(
          (cat) => `
        <div class="card">
          <h3 class="font-display font-semibold text-white">${cat.title}</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            ${cat.items.map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
        </div>`
        )
        .join('')}
    </div>
  </section>`;
}

export function renderHighlights(): string {
  return `
  <section id="work" class="reveal mx-auto max-w-6xl px-6 py-20">
    <h2 class="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">Selected Work</h2>
    <p class="mt-4 max-w-2xl text-white/60">
      A few systems I've designed and shipped to production. Written in general terms — the details
      are proprietary, but the engineering problems are real.
    </p>
    <div class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      ${highlights
        .map(
          (h) => `
        <div class="card">
          <h3 class="font-display text-lg font-semibold text-white">${h.title}</h3>
          <p class="mt-3 text-white/70">${h.description}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            ${h.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>`
        )
        .join('')}
    </div>
  </section>`;
}

export function renderAi(): string {
  return `
  <section id="ai" class="reveal mx-auto max-w-4xl px-6 py-20">
    <h2 class="font-display flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-2)]">
      <span class="h-4 w-4">${icons.spark}</span> ${ai.heading}
    </h2>
    <p class="mt-4 text-xl font-medium text-white/80">${ai.intro}</p>
    <div class="mt-6 space-y-5 leading-relaxed text-white/70">
      ${ai.paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
    <div class="mt-8 flex flex-wrap gap-2">
      ${ai.items.map((item) => `<span class="tag" style="border-color:var(--color-accent-2);color:#34d399">${item}</span>`).join('')}
    </div>
  </section>`;
}

export function renderContact(): string {
  return `
  <section id="contact" class="reveal mx-auto max-w-2xl px-6 py-28 text-center">
    <h2 class="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">${contact.heading}</h2>
    <p class="mt-4 text-white/60">${contact.blurb}</p>

    <form id="contact-form" class="mt-10 space-y-4 text-left" novalidate>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input type="text" name="name" required placeholder="Your name" class="input-field" />
        <input type="email" name="email" required placeholder="Email address" class="input-field" />
      </div>
      <textarea name="message" required rows="6" placeholder="Write your message" class="input-field resize-none"></textarea>
      <input type="text" name="_honey" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />

      <div class="flex items-center justify-between gap-4 pt-2">
        <p id="form-status" class="text-sm" role="status" aria-live="polite"></p>
        <button type="submit" id="form-submit" class="btn-primary">
          Send message ${icons.send}
        </button>
      </div>
    </form>
  </section>`;
}

export function renderFooter(): string {
  return `
  <footer class="border-t border-white/10 px-6 py-12">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <p class="text-sm text-white/40">${footer.tag}</p>
      <div class="flex gap-3">${socialLinks.map((l) => socialIconLink(l)).join('')}</div>
    </div>
  </footer>`;
}
