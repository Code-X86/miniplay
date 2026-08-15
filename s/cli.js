#!/usr/bin/env node
// Terminal front-end for the shortlink codecs.
//
//   curl -s https://austin-code.com/s/cli.js | node - "https://example.com/long/url"
//   curl -s https://austin-code.com/s/cli.js | node - --emoji "https://example.com"
//   curl -s https://austin-code.com/s/cli.js | node - --decode "4,r?OM?Qs-y(R=e'uHF5BYPk:"
//   curl -s https://austin-code.com/s/cli.js | node - --password hunter2 "https://example.com"
//   curl -s https://austin-code.com/s/cli.js | node - --password hunter2 --decode "<code>"
//
// The site is static, so nothing computes a link server-side — this fetches
// s/codecs.js and runs the same codecs the page runs, then prints the result.
// Add --base <url> if you are hosting this somewhere other than austin-code.com.

const vm = require('node:vm');

const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); if (i < 0) return null; return args.splice(i, 2)[1]; };
const has  = n => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };

const decode = has('--decode');
const password = flag('--password');
const emoji  = has('--emoji');
const base   = (flag('--base') || 'https://austin-code.com/s/').replace(/\/?$/, '/');
const input  = args.join(' ').trim();

if (!input) {
  console.error('usage: node cli.js [--emoji] [--decode] [--password <pw>] [--base <url>] <url-or-code>');
  process.exit(2);
}

(async () => {
  const src = await fetch(base + 'codecs.js').then(r => {
    if (!r.ok) throw new Error(`could not fetch ${base}codecs.js (${r.status})`);
    return r.text();
  });

  const win = {};
  vm.runInContext(src, vm.createContext({
    window: win, URL, URLSearchParams, TextEncoder, TextDecoder, BigInt,
    Map, Set, Uint8Array, Math, JSON, Array, String, Number, Error, console,
    Promise, setTimeout, CompressionStream, DecompressionStream, Response,
    crypto, decodeURIComponent, encodeURIComponent,
  }));

  const SL = win.SHORTLINK;
  if (decode) {
    const hit = await SL.resolve(input, null);
    if (hit && hit.protected) {
      if (!password) { console.error('error: that code is password protected — pass --password'); process.exit(1); }
      try { console.log(await SL.unlock(input, password)); }
      catch (e) { console.error('error: ' + (e && e.wrongPassword ? 'wrong password' : e.message)); process.exit(1); }
      return;
    }
    if (!hit) { console.error('error: no codec version could decode that'); process.exit(1); }
    console.log(hit.url);
    return;
  }

  const best = password
    ? await SL.encodeProtected(input, password, emoji)
    : await SL.encodeBest(input, emoji);
  if (!best) { console.error('error: nothing encodable in that url'); process.exit(1); }
  console.log(base + '#' + best.code);
})().catch(e => { console.error('error: ' + (e && e.message || e)); process.exit(1); });
