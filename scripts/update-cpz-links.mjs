#!/usr/bin/env node
// Points the docs' demo .cpz download links at the .cpz in artifacts/cpz/.
//
// The bundle's file name includes the Essentials version, so the links go stale whenever a new bundle
// is built. Run this after adding it:
//
//   node scripts/update-cpz-links.mjs           rewrite the links (and the "about N MB" note) in docs/
//   node scripts/update-cpz-links.mjs --check   change nothing; exit 1 if any link is out of date
//
// Needs Node.js 18 or later and nothing else. It works the same on macOS, Windows and Linux, and from
// any folder: paths are resolved from this file's location.

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const cpzDir = join(root, 'artifacts', 'cpz');
const docsDir = join(root, 'docs');
const checkOnly = process.argv.includes('--check');

// Folders under docs/ that hold generated or third-party files, not pages.
const skippedDirs = new Set(['_site', 'obj', 'node_modules']);

// A link to a .cpz in this repo's artifacts/cpz folder: group 1 is everything before the file name.
const linkPattern = /(https:\/\/github\.com\/PepperDash\/EssentialsDemoConfig\/raw\/main\/artifacts\/cpz\/)[^)\s]+\.cpz/g;
// The size note that follows a link, such as "[download the `.cpz`](...) (about 13 MB)".
const sizePattern = /(artifacts\/cpz\/[^)\s]+\.cpz\) \(about )\d+( MB\))/g;

function fail(message) {
  console.error(message);
  process.exit(1);
}

/** The one .cpz directly inside artifacts/cpz (the archive subfolder doesn't count). */
function findBundle() {
  let names;
  try {
    names = readdirSync(cpzDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.cpz'))
      .map((entry) => entry.name);
  } catch {
    fail(`Can't read ${relative(root, cpzDir)}. Run this from a checkout of the repository.`);
  }

  if (names.length === 0) {
    fail(`No .cpz found in ${relative(root, cpzDir)}. Add the new bundle first.`);
  }
  if (names.length > 1) {
    fail(
      `Found ${names.length} .cpz files in ${relative(root, cpzDir)}, so it's unclear which one the docs should use:\n` +
        names.map((name) => `  ${name}`).join('\n') +
        '\nMove the older ones to artifacts/cpz/archive or delete them, then run this again.',
    );
  }
  return names[0];
}

/** Every Markdown file under docs/, skipping generated folders. */
function markdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skippedDirs.has(entry.name) && !entry.name.startsWith('.')) {
        files.push(...markdownFiles(join(dir, entry.name)));
      }
    } else if (entry.name.toLowerCase().endsWith('.md')) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

const bundle = findBundle();
// Decimal megabytes, which is what GitHub and macOS show. "About" covers Windows' binary megabytes.
const sizeMb = Math.round(statSync(join(cpzDir, bundle)).size / 1_000_000);
const encodedName = encodeURIComponent(bundle);

let linksFound = 0;
const changed = [];

for (const file of markdownFiles(docsDir)) {
  const before = readFileSync(file, 'utf8');
  if (!linkPattern.test(before)) continue;
  linkPattern.lastIndex = 0;

  linksFound += (before.match(linkPattern) ?? []).length;
  const after = before
    .replace(linkPattern, (_, base) => base + encodedName)
    .replace(sizePattern, (_, start, end) => start + sizeMb + end);

  if (after !== before) {
    changed.push(relative(root, file));
    if (!checkOnly) writeFileSync(file, after);
  }
}

if (linksFound === 0) {
  fail(`No links to a .cpz in artifacts/cpz found under ${relative(root, docsDir)}. Nothing to update.`);
}

if (changed.length === 0) {
  console.log(`All ${linksFound} link(s) already point at ${bundle} (about ${sizeMb} MB).`);
} else if (checkOnly) {
  console.error(`These files are out of date; the bundle in artifacts/cpz is ${bundle}:`);
  changed.forEach((file) => console.error(`  ${file}`));
  console.error('Run: node scripts/update-cpz-links.mjs');
  process.exit(1);
} else {
  console.log(`Pointed ${linksFound} link(s) at ${bundle} (about ${sizeMb} MB). Updated:`);
  changed.forEach((file) => console.log(`  ${file}`));
  console.log('Review the changes, then commit them with the new bundle.');
}
