// Runs at dev/build time (see package.json). Pulls real public GitHub stats via
// GitHub's GraphQL API and writes them to src/data/github-stats.generated.json,
// which the site imports as a typed JSON module (see src/data/github-stats.ts).
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const GITHUB_LOGIN = 'kyletnguyen';
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'github-stats.generated.json');

const FALLBACK = {
  login: GITHUB_LOGIN,
  publicRepos: 0,
  followers: 0,
  contributionsLastYear: 0,
  fetchedAt: null,
};

function resolveToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execSync('gh auth token', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

const QUERY = /* GraphQL */ `
  query GithubStats($login: String!) {
    user(login: $login) {
      login
      followers {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
      repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

async function main() {
  const token = resolveToken();

  if (!token) {
    console.warn('[fetch-github-stats] No GITHUB_TOKEN and `gh auth token` unavailable — writing fallback stats.');
    writeFileSync(OUT_PATH, JSON.stringify(FALLBACK, null, 2));
    return;
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
  });

  if (!res.ok) {
    console.warn(`[fetch-github-stats] GitHub API responded ${res.status} — writing fallback stats.`);
    writeFileSync(OUT_PATH, JSON.stringify(FALLBACK, null, 2));
    return;
  }

  const json = await res.json();
  if (json.errors) {
    console.warn('[fetch-github-stats] GraphQL errors:', json.errors);
    writeFileSync(OUT_PATH, JSON.stringify(FALLBACK, null, 2));
    return;
  }

  const user = json.data.user;
  const stats = {
    login: user.login,
    publicRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    contributionsLastYear: user.contributionsCollection.contributionCalendar.totalContributions,
    fetchedAt: new Date().toISOString(),
  };

  writeFileSync(OUT_PATH, JSON.stringify(stats, null, 2));
  console.log('[fetch-github-stats] Wrote', OUT_PATH);
}

main().catch((err) => {
  console.warn('[fetch-github-stats] Failed, writing fallback stats:', err.message);
  writeFileSync(OUT_PATH, JSON.stringify(FALLBACK, null, 2));
});
