# miniplay

A static browser game hub. **42 games** and **3 apps**, all self-contained — no
build step, no server, no external CDN calls.

## Running it

Most games work by opening `index.html` directly. Four (Slope, Baldi's Basics,
Subway Surfers, Hole.io) are Unity builds that browsers refuse to load from
`file://`, so for the full library serve the folder:

```
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## Layout

```
index.html      the hub: styles, cards, registry and player
Games/          one directory per game
Apps/           MP3 player, Paint, Periodic Speller
docs/           design docs
```

Adding a game means two edits to `index.html`: an entry in the `games` registry
and a matching `<article class="game-card">`. The `data-id` must match the
registry key and `data-game-id` must match the registry `id`.

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

Other titles in `Games/` predate this list and are not all permissively
licensed — check individual directories before redistributing.
