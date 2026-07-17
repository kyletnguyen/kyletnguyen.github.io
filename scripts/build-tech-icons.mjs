// Build-time: resolve brand logos for the tech stack from simple-icons (CC0) and
// write a small slug -> {path, hex, title} map to src/data/tech-icons.generated.json.
// Only the slugs we actually use get bundled. Missing slugs are logged and fall back
// to a neutral glyph in the UI.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as si from 'simple-icons';

const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'tech-icons.generated.json');

// Every brand slug referenced by the tech stack (keep in sync with profile.ts).
const SLUGS = [
  'typescript', 'javascript', 'csharp', 'sharp', 'dotnet', 'python', 'openjdk', 'c', 'cplusplus',
  'nodedotjs', 'nestjs', 'graphql', 'apollographql',
  'react', 'reactnative', 'expo', 'redux', 'zustand', 'reactnavigation', 'html5', 'css', 'tailwindcss',
  'fastlane', 'appium', 'firebase',
  'postgresql', 'microsoftsqlserver', 'redis', 'apachekafka', 'flyway',
  'amazonwebservices', 'amazonaws', 'awslambda', 'amazons3', 'amazonsqs', 'amazonsimplenotificationservice',
  'docker', 'kubernetes', 'argo', 'serverless',
  'git', 'pnpm', 'turborepo', 'githubactions', 'jest', 'datadog', 'launchdarkly',
  'linear', 'jira', 'notion', 'confluence',
];

const map = {};
const missing = [];

for (const slug of SLUGS) {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const icon = si[key];
  if (icon && icon.path) {
    map[slug] = { path: icon.path, hex: `#${icon.hex}`, title: icon.title };
  } else {
    missing.push(slug);
  }
}

writeFileSync(OUT_PATH, JSON.stringify(map, null, 2));
console.log(`[build-tech-icons] Wrote ${Object.keys(map).length} icons to ${OUT_PATH}`);
if (missing.length) {
  console.warn(`[build-tech-icons] Missing (will use fallback glyph): ${missing.join(', ')}`);
}
