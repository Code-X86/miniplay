# austin-code.com

Two static projects behind one launcher — no build step, no server, no external
CDN calls.

| Path | What |
|---|---|
| `/` | launcher |
| `/miniplay` | a browser game hub — **43 games** and **3 apps** |
| `/s/#<code>` | the shortlink lab — all three codecs on one page |

## Running it

Most games work by opening `miniplay/index.html` directly. Four (Slope, Baldi's
Basics, Subway Surfers, Hole.io) are Unity builds that browsers refuse to load
from `file://`, so for the full library serve the folder:

```
python3 -m http.server 8000
```

then open <http://localhost:8000>. Note that `http.server` has no 404 fallback,
so path-form shortlinks (`/s/3/CODE`) won't resolve locally — use `/s/#CODE`,
which works on any static server.

## Layout

```
index.html      launcher
404.html        not-found page, and the shortlink path router
miniplay/
  index.html    the hub: styles, cards, registry and player
  Games/        one directory per game
  Apps/         MP3 player, Paint, Periodic Speller
s/
  codecs.js     all four codecs, resolve() and encodeBest() — one shared copy
  index.html    the page: url in, link out
  api/gen/      GET /s/api/gen/#<url> -> JSON
  1/ 2/ 3/      redirects, kept so links already shared keep resolving
docs/           design docs
```

Adding a game means two edits to `miniplay/index.html`: an entry in the `games`
registry and a matching `<article class="game-card">`. The `data-id` must match
the registry key and `data-game-id` must match the registry `id`.

## Shortlink routing

The destination is encoded entirely in the URL — there is no database. All three
codecs live in `s/index.html`, so **`/s/#<code>` resolves a code from any
version**: it tries version 3, then 2, then 1, and follows the first result that
is an absolute `http(s)` URL. Order matters because version 1's decoder returns
garbage rather than throwing when handed a foreign code.

Every other entry shape funnels into that one page:

| URL | Route |
|---|---|
| `/s/#<code>` | resolved directly, version auto-detected |
| `/s/<v>/#<code>` | `s/<v>/index.html` forwards to `/s/?v=<v>#<code>` |
| `/s/<v>/<code>` | 404s → `404.html` forwards to `/s/?v=<v>#<code>` |

`?v=<v>` is only a hint: that codec is tried first, then the others. The path
form needs `404.html` because static hosting has no rewrite rules — the page is
served for any unknown path with the URL intact, which is the one hook available.

The encoder hands out the `#` form by default, since it needs no routing tricks
and works on any static server. Codes escape `/` so they can never contain a
reserved `/<n>/` sequence, but the Base81 alphabet includes `?`, so the
forwarders reassemble a code that the browser split into a query string.

A destination typed without a scheme (`youtube.com`) is encoded as
`https://youtube.com` so the link actually redirects. Anything that isn't
host-shaped is left alone and never followed — a decoded value is only
navigated to when it is an absolute `http(s)` URL.

### Preset links

Version 5 is a table of 412 well-known destinations that ships with the site, so
they cost one or two characters — `/s/#1` is youtube.com, `/s/#g` is GitHub.
Nothing is compressed: the code *is* the lookup key, which is why these reach
lengths no general codec can. Versions 1–4 carry the whole URL, and the shortest
code any of them produces is 7 characters, so the 1–2 character space is the
table's alone and no link minted before it can be shadowed.

Keys are drawn from the same 81-character url-safe set the codes use, one or two
characters deep — `81 + 81² = 6642` slots, of which 120 are assigned. That set
is exactly the fragment-safe characters (unreserved, sub-delims, `:` `@` `/`
`?`); going wider to all printable ASCII would add `" < > \ ^ { } | [ ]`, which
chat clients and markdown auto-linkers truncate links on.

A destination may have several keys. The numeric keys handed out first still
decode, and popular entries gained one-character aliases — encoding always picks
the shortest, ties breaking alphabetically so the choice is stable across builds.
Keys are permanent: reassigning one silently redirects every link already handed
out, so append, never reassign.

Only the destination itself is preset — `youtube.com/watch?v=…` encodes in full.

Destinations are listed in `tools/sites.txt`, one per line, and added by:

```
node tools/add-presets.mjs --dry-run   # what would change
node tools/add-presets.mjs             # append them
node tools/add-presets.mjs --check     # validate, non-zero on problems
```

It only ever appends — an entry already in the table keeps its key, so the same
list and the same table give the same keys every run. New keys prefer the site's
own initial (`figma.com` → `f`, `python.org` → `py`) and fall back to the next
free slot. Assignment draws from `A-Za-z0-9-_~` rather than the full 81: a key
is the last thing in the URL, and linkifiers routinely trim a trailing
`. , ; : ? ! ) '`, which would break the link on paste.

### Generating

`encodeBest()` runs every codec, keeps the shortest code, then re-checks that
candidate through `resolve()` untargeted — the exact path a bare `/s/#<code>`
link takes — before handing it out. A codec round-tripping its own output is not
enough on its own: versions 1–3 put no version tag in a code, so a short code
minted by one can also be valid input to another and decode to something else.
The shortest candidate that survives the real resolution path is the one you get.

### API

```
GET /s/api/gen/#<url>          -> the short link, as plain text
    ?emoji=1                   allow the emoji alphabet
```

```
/s/api/gen/#https://www.example.com/products/item?id=12345&utm_source=newsletter

https://austin-code.com/s/#4,r?OM?Qs-y(R=e'uHF5BYPk:
```

The body is the link and nothing else. Failures are a single `error: …` line —
including for a target that isn't an absolute `http(s)` URL, since the resolver
would never follow such a link.

The url rides in the fragment, so it never reaches a server. It is a browser and
bookmarklet endpoint.

### From a terminal

`curl` alone cannot drive the endpoint above, and moving the url into a query
string would not help: the site is static files, so nothing runs server-side to
compute a link. The codecs run in whatever client you point at them — so fetch
the bundle and run it locally:

```
curl -s https://austin-code.com/s/cli.js | node - "https://example.com/long/url"
curl -s https://austin-code.com/s/cli.js | node - --emoji "https://example.com"
curl -s https://austin-code.com/s/cli.js | node - --decode "4,r?OM?Qs-y(R=e'uHF5BYPk:"
```

`cli.js` fetches `s/codecs.js` and runs the same four codecs the page runs, so
it always agrees with the site. It prints the link on stdout and errors on
stderr with a non-zero exit, which makes it pipeable. `--base <url>` points it
at a different deployment.

A genuine `curl https://…/gen?url=…` would need somewhere that executes code —
a small worker or serverless function running this same `codecs.js`. Nothing
here rules that out; it is just not something static hosting can do.

### Emoji mode

Version 3 only. The winning byte payload is re-packed over a 256-symbol
alphabet — the 81 URL-safe characters plus 175 single-code-point emojis — so one
symbol carries a whole byte instead of ~6.34 bits, cutting roughly 21% of the
characters. A leading `✨` marks the mode, so every code minted before it still
decodes. Emojis percent-encode to four bytes each, so the code is shorter on
screen but the raw URL is longer in bytes.

## Hidden features

- `debug123` — type it anywhere on the hub to open the debug engine
  (device stats, library stats, and a card/registry integrity check).
  Also reachable at `#debug`.
- `betatest` — toggles the beta shelf of experimental games.
- `/` focuses search, `Escape` closes the player, arrow keys move between cards.
- Any game is deep-linkable by its registry key, e.g. `#tetris`.

Games flagged `isNew: true` in the registry show a **NEW** badge and float to
the top under the "New first" sort. Clear the flag when they stop being new.

## Third-party games

Vendored from upstream with their LICENSE files intact. Ad and analytics
beacons were stripped, and CDN dependencies were vendored locally so nothing
phones out.

| Game | Upstream | License |
|---|---|---|
| 2048 | gabrielecirulli/2048 | MIT |
| Tetris | jakesgordon/javascript-tetris | MIT |
| Asteroids | dmcinnes/HTML5-Asteroids | MIT |
| Hextris | Hextris/hextris | GPL-3.0 |
| Astray | wwwtyro/Astray | Unlicense |
| HexGL | BKcore/HexGL | MIT |
| Outrun Racer | jakesgordon/javascript-racer | MIT |
| Chess | lhartikk/simple-chess-ai | Apache-2.0 |
| Sudoku | huaminghuangtw/Web-Sudoku-Puzzle-Game | MIT |
| Tower Platformer | jakesgordon/javascript-tower-platformer | MIT |

Plinko is written for this project rather than vendored.

Other titles in `Games/` predate this list and are not all permissively
licensed — check individual directories before redistributing.
