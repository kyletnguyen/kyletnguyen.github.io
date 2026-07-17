import './style.css';
import statsJson from './data/github-stats.generated.json';
import type { GithubStats } from './data/github-stats';
import { hero, contact } from './data/profile';
import { renderNav, renderHero, renderAbout, renderTechStack, renderHighlights, renderAi, renderContact, renderFooter } from './render';

const stats = statsJson as GithubStats;

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('#app root not found');

app.innerHTML = [
  renderNav(),
  renderHero(stats),
  renderAbout(),
  renderTechStack(),
  renderHighlights(),
  renderAi(),
  renderContact(),
  renderFooter(),
].join('');

initMobileMenu();
initNavShrink();
initScrollReveal();
initRoleRotator();
initContactForm();

function initMobileMenu(): void {
  const btn = document.querySelector<HTMLButtonElement>('#menu-btn');
  const menu = document.querySelector<HTMLDivElement>('#mobile-menu');
  if (!btn || !menu) return;

  let open = false;
  const setOpen = (next: boolean) => {
    open = next;
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
  };

  btn.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

function initNavShrink(): void {
  const nav = document.querySelector<HTMLElement>('#site-nav');
  if (!nav) return;

  const apply = () => {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('bg-[var(--color-bg)]/90', scrolled);
    nav.classList.toggle('backdrop-blur', scrolled);
    nav.classList.toggle('shadow-lg', scrolled);
    nav.classList.toggle('shadow-black/30', scrolled);
  };

  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

function initScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

function initRoleRotator(): void {
  const el = document.querySelector<HTMLParagraphElement>('#role-rotator');
  if (!el) return;

  const roles = hero.roles;
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex += 1;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex -= 1;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 30 : 60);
  };

  tick();
}

function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const status = document.querySelector<HTMLParagraphElement>('#form-status');
  const submitBtn = document.querySelector<HTMLButtonElement>('#form-submit');
  if (!form || !status || !submitBtn) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-60');
    status.textContent = 'Sending…';
    status.className = 'text-sm text-white/60';

    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      status.textContent = 'Message sent — thanks for reaching out! I’ll get back to you soon.';
      status.className = 'text-sm text-[var(--color-accent-2)]';
      form.reset();
    } catch {
      status.textContent = "Something went wrong — feel free to reach out on LinkedIn instead.";
      status.className = 'text-sm text-red-400';
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-60');
    }
  });
}
