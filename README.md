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

### Generating

`encodeBest()` runs every codec, keeps the shortest code, then re-checks that
candidate through `resolve()` untargeted — the exact path a bare `/s/#<code>`
link takes — before handing it out. A codec round-tripping its own output is not
enough on its own: versions 1–3 put no version tag in a code, so a short code
minted by one can also be valid input to another and decode to something else.
The shortest candidate that survives the real resolution path is the one you get.

### API

```
GET /s/api/gen/#<url>          -> JSON
    ?emoji=1                   allow the emoji alphabet
    ?pretty=0                  compact output
```

```json
{ "ok": true, "url": "…", "link": "…", "code": "…",
  "chars": 25, "original": 68, "version": 2,
  "strategy": "URL grammar → Base81", "emoji": false }
```

The url rides in the fragment, so it never reaches a server — which also means
`curl` cannot drive this. It is a browser and bookmarklet endpoint; there is no
server here to run anything. Errors come back as `{"ok": false, "error": …}`,
including for a target that isn't an absolute `http(s)` URL, since the resolver
would never follow such a link.

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
