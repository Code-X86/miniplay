#!/usr/bin/env node
// Adds entries from tools/sites.txt to the preset table in s/codecs.js.
//
//   node tools/add-presets.mjs            add anything missing
//   node tools/add-presets.mjs --dry-run  show what would change, write nothing
//   node tools/add-presets.mjs --check    validate the table, non-zero on problems
//
// Keys are permanent. Every key already in the file keeps the destination it
// has — reassigning one would silently redirect links already handed out — so
// this only ever appends. Given the same sites.txt and the same existing table
// it produces the same keys every run.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CODECS = join(ROOT, 's', 'codecs.js');
const SITES = join(ROOT, 'tools', 'sites.txt');

// A key may legally use any of the 81 url-safe characters, and the table
// validates against that. Assignment draws from a narrower set on purpose:
// a key is the LAST thing in the url, and linkifiers in chat clients, mail and
// markdown routinely trim trailing . , ; : ? ! ) ' — so a key ending in one
// would produce links that break when pasted. '/' is out too: /s/#a/b reads
// like a path.
const VALID = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~!$&'()*+,;=:@/?";
const KEYSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_~";
const MAX_KEYS = KEYSET.length + KEYSET.length ** 2;

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const checkOnly = argv.includes('--check');

/* ---------- read the table out of the shipped source ---------- */

const source = readFileSync(CODECS, 'utf8');
const blockRe = /(var PRESETS = \{\n)([\s\S]*?)(\n    \};)/;
const m = source.match(blockRe);
if (!m) fail('could not find the PRESETS block in s/codecs.js');

const entryRe = /(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
const unq = (a, b) => (a !== undefined ? a.replace(/\\(.)/g, '$1') : b.replace(/\\(.)/g, '$1'));
const existing = [...m[2].matchAll(entryRe)].map(x => ({ key: unq(x[1], x[2]), url: unq(x[3], x[4]) }));

function fail(msg) { console.error('error: ' + msg); process.exit(1); }

/* ---------- validate what is already there ---------- */

const problems = [];
const seenKey = new Set();
for (const { key, url } of existing) {
  if (seenKey.has(key)) problems.push(`duplicate key '${key}'`);
  seenKey.add(key);
  if (key.length < 1 || key.length > 2) problems.push(`key '${key}' is not 1-2 characters`);
  for (const ch of key) if (!VALID.includes(ch)) problems.push(`key '${key}' uses '${ch}', outside the url-safe set`);
  try { if (new URL(url).href !== url) problems.push(`'${url}' is not in canonical form (want ${new URL(url).href})`); }
  catch { problems.push(`'${url}' is not a valid url`); }
}

if (checkOnly) {
  const dests = new Set(existing.map(e => e.url));
  if (problems.length) { problems.forEach(p => console.error('  ' + p)); fail(`${problems.length} problem(s)`); }
  console.log(`ok: ${existing.length} keys over ${dests.size} destinations`);
  console.log(`    ${existing.filter(e => e.key.length === 1).length} single-character keys`);
  console.log(`    ${MAX_KEYS - existing.length} of ${MAX_KEYS} assignable slots free (${VALID.length + VALID.length ** 2} addressable)`);
  process.exit(0);
}
if (problems.length) { problems.forEach(p => console.error('  ' + p)); fail(`${problems.length} problem(s) in the existing table`); }

/* ---------- read the wanted sites ---------- */

const wanted = readFileSync(SITES, 'utf8').split('\n')
  .map(l => l.replace(/#.*$/, '').trim())
  .filter(Boolean)
  .map(line => {
    const [left, right] = line.split('->').map(s => s && s.trim());
    const url = right || ('https://' + left.replace(/^https?:\/\//, ''));
    let href;
    try { href = new URL(url).href; } catch { fail(`'${line}' is not a valid url`); }
    return { label: left, url: href };
  });

const dup = wanted.map(w => w.url).filter((u, i, a) => a.indexOf(u) !== i);
if (dup.length) fail('sites.txt lists these more than once: ' + [...new Set(dup)].join(', '));

/* ---------- assign keys to whatever is new ---------- */

const taken = new Set(existing.map(e => e.key));
const haveUrl = new Set(existing.map(e => e.url));

function* keyOrder() {
  for (const a of KEYSET) yield a;
  for (const a of KEYSET) for (const b of KEYSET) yield a + b;
}
const sequential = keyOrder();
function nextFree() {
  for (;;) {
    const { value, done } = sequential.next();
    if (done) fail('ran out of keys');
    if (!taken.has(value)) return value;
  }
}

// A memorable key beats a sequential one: try the site's own initials first.
function pick(url) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  const letters = host.replace(/[^a-z0-9]/gi, '');
  const candidates = [
    letters[0], letters[0] && letters[0].toUpperCase(),
    letters.slice(0, 2), letters[0] && (letters[0] + letters[1] || '').toUpperCase(),
  ].filter(c => c && c.length <= 2 && [...c].every(ch => KEYSET.includes(ch)));
  for (const c of candidates) if (!taken.has(c)) return c;
  return nextFree();
}

const added = [];
for (const w of wanted) {
  if (haveUrl.has(w.url)) continue;
  const key = pick(w.url);
  taken.add(key); haveUrl.add(w.url);
  added.push({ key, url: w.url });
}

if (!added.length) {
  console.log(`nothing to add — all ${wanted.length} sites are already in the table`);
  process.exit(0);
}

/* ---------- write it back ---------- */

// JSON.stringify, not hand-rolled quotes: a key may legally BE an apostrophe
const row = e => `      ${JSON.stringify(e.key)}: ${JSON.stringify(e.url)},`;
const rows = [
  ...existing.map(row),
  '',
  `      // added by tools/add-presets.mjs`,
  ...added.map(row),
].join('\n');

console.log(`${added.length} new:`);
for (const e of added) console.log(`  #${e.key.padEnd(3)} ${e.url}`);
console.log(`\ntable: ${existing.length} -> ${existing.length + added.length} keys`);
console.log(`slots: ${MAX_KEYS - existing.length - added.length} of ${MAX_KEYS} free`);

if (dryRun) { console.log('\n--dry-run, nothing written'); process.exit(0); }
writeFileSync(CODECS, source.replace(blockRe, (_, a, __, c) => a + rows + c));
console.log('\nwrote s/codecs.js');
