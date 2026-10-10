# The Crawler

A first-person, grid-based party crawler for phones. You lead four characters through a maze of 10-foot squares, a step at a time. You see the corridor ahead as ink lines on paper. The party fights in ranks. A town between delves heals you, sells you light and buys what you carry.

It is one engine and any number of packs. A pack is data: the theme, the rules, the party, the monsters, the maps and the scenes. The engine knows nothing about rats, torches or corporations. The contract is [`SPEC.md`](SPEC.md). Where this file and the spec disagree, the spec wins.

The shape comes from the old party crawlers (the grid, the ranks, the town, the camp). Nothing else does: no names, spells, places or text from any of them.

## Packs

| Pack | Resolver | What it is |
|------|----------|------------|
| [`packs/drowned-tower`](packs/drowned-tower/) | `ose` | Module 2, *The Drowned Tower*, all 25 areas on three maps. Canon-bound: read `AGENTS.md` before you change it. |
| [`packs/test`](packs/test/) | `ose` | A fixture: a 9 × 7 map that uses every feature. For engine tests and view work. |
| [`packs/test-fate`](packs/test-fate/) | `fate4df` | The same fixture, in the Fate resolver. |
| `drowned-floors` | `fate4df` | The same dungeon in the High Tech, Low Lives world. It lives in the HTLL repository, in `arcade/crawler/packs/drowned-floors/`, and builds with a vendored copy of this engine. |

## Play

Build a pack, then open the file. It is one page with no network, and it opens from disk.

```
node crawler/tools/build.mjs crawler/packs/drowned-tower      # writes crawler/dist/drowned-tower.html
```

| Do | Tap | Key | Swipe |
|----|-----|-----|-------|
| Step forward, back | Up, down arrows | Up or W, Down or S | Up, down |
| Turn | Turn arrows | Left or A, Right or D | Left, right |
| Step sideways | Side arrows | Q, E | |
| Open or force a door, use stairs | Act | Space, Enter | |
| Search the area | Search | F | |
| Listen at the door ahead | Listen | L | |
| Rest one turn | Rest | R | |
| Map and route | Map | M, Esc to close | |
| Pick a choice, an order, a hub action | The button | 1 to 9 | |
| Help | F1 How to play | F1 | |

The game saves in the browser after every step. `?seed=N` on the address picks the dice; the seed is shown in the footer. The same seed and the same commands give the same game. *New game* clears the save (tap it twice).

Planning is free. Acting costs time. A dashed choice is a plan: it costs nothing. A solid choice is an act: it costs turns and may roll. A double choice spends a Fate use.

## How it fits together

```
engine/crawl.js     the rules. Pure: Crawl.create, Crawl.step, Crawl.view. No page, no clock.
ui/                 the page: index.html, view.js, style.css. It draws Crawl.view and sends commands.
tools/              load.mjs reads a pack; validate.mjs checks it; build.mjs makes the page; sim.mjs plays every fight many times and audits the rules.
packs/<id>/         the data
dist/<id>.html      the built pages (build output)
test.mjs            the acceptance walk
```

`step(pack, state, command)` never changes its input and never throws. A bad command returns the same state and one `refuse` event. A state is plain JSON. `{seed, commands}` is a whole game, and the page saves exactly that.

`ui/stub-engine.js` is a stand-in engine that the view was first built against. The build does not use it.

## Make a pack

1. Copy `packs/test` (or `packs/test-fate`) to `packs/<your-id>/`. Pick the resolver in `rules.json`: `ose` (d20 against AC, hit points) or `fate4df` (four Fate dice against a ladder, stress boxes marked).
2. Write the files, in this order. Each is described in `SPEC.md`, sections 1 to 8.

   | File | Holds |
   |------|-------|
   | `pack.json` | `id`, `title`, `version`, `credits`, and optional `start: {scene}` |
   | `theme.json` | Palette, fonts and labels. A reskin changes only this file. |
   | `rules.json` | Stats, tracks, the clock, combat, Fate, skills |
   | `party.json` | The default four and the whole roster |
   | `bestiary.json`, `encounters.json` | Monsters and the fights they make |
   | `items.json`, `abilities.json` | Gear, light, spells, powers, chrome |
   | `maps/<id>.json` | A grid of characters, a legend, areas, links, a wandering table |
   | `events.json` | Scenes: read-aloud, and choices that are plans, acts or Fate |
   | `hub.json`, `endings.json` | The town, and how the story ends |

3. Check it: `node crawler/tools/validate.mjs crawler/packs/<your-id>` prints `OK <id>`, or a list of what is wrong. It checks that every id resolves, every grid row is the same length, every link lands on a passable cell, every area can be reached, and the monster and character fields fit the resolver.
4. Build and play it: `node crawler/tools/build.mjs crawler/packs/<your-id>`.
5. Walk it: `node crawler/test.mjs crawler/dist/<your-id>.html`. The explorer must reach every area. If it cannot, the validator or the walk says which.

The effect vocabulary is ten verbs and nothing else (`flag`, `item`, `damage`, `heal`, `condition`, `bonus`, `reveal`, `fate`, `light`, `goto`). Items, abilities, scene choices, encounters and hub actions all use them. A pack that needs an eleventh needs a change to the engine and to `SPEC.md` first.

Write the pack's `NOTES.md`: what you cut, what you invented, and what the engine could not do.

## The checks

Run these before you push anything in `crawler/`.

| Check | Run | Expect |
|-------|-----|--------|
| Every pack is valid | `node crawler/tools/validate.mjs crawler/packs/<id>` for each pack | `OK <id>` |
| The engine | `node --test crawler/engine/test.mjs` | `# fail 0` (about 3 seconds) |
| The whole game | build every pack, then `node crawler/test.mjs` | `PASS` (about 30 seconds) |
| Balance and rules | `node crawler/tools/sim.mjs crawler/packs/<id> --n 1000 --audit --check` | Exit 0. Exit 1 means a fight misses its target; exit 2 means the engine broke a rule in SPEC.md. Add `--tired` and `--no-reroll` for a sharper gate. |

`node crawler/test.mjs [dist files...]` tests every page in `crawler/dist`, and the HTLL page when that checkout sits next to this one. For each page, at 360 × 780, it checks:

- the page loads with no console error, no page error and no sideways scroll, and `window.CRAWL` is there;
- an explorer plays seeds 1, 7, 42 and 2026 through `window.CRAWL.step`, with the commands a tap sends: it picks the default party, leaves the town, walks by breadth-first search to the nearest unvisited area, forces doors, searches where a secret door is next to an area, takes the first calm act choice in a scene (else steps back), has everyone fight, and goes home to rest when anyone is below half or light is low. Across the seeds it must visit every area of every map. Each seed prints its coverage, turns, and outcome;
- one recorded path, replayed with real key presses on a fresh page, reaches the same state;
- a reload restores the game from `localStorage`, and with storage blocked the game still plays;
- for `drowned-tower`, the pinned facts of Module 2 are on screen in their areas: the rope burn, 30' and 40', ash less than a week old, the chalk eye, two flasks, 20' and the stuck door, 30' × 20', five giant rats and their full OSE line, one step a turn.

The explorer is a stand-in for a player, not a good player. A seed that ends in a dead party is a normal outcome: the test needs every area visited across the four seeds, not in each.

Switches: `SEEDS=1,7 node crawler/test.mjs` runs fewer seeds. `VERBOSE=1` prints the order areas were visited, the fights, and the last commands of a run that did not finish. `TRACE=n` prints the last `n` commands of every run. `MAXCMD=n` caps the commands per seed. `DEBUG=n` prints the explorer's last `n` decisions. `DUMP=file.json` saves the recorded path.

## What it does not do yet

- No experience points, and no calendar: the engine counts turns, not days or nights.
- A scene cannot mark an encounter done, open a door, or spend a spell. Both packs want the first of these. See `SPEC.md`, section 12, and each pack's `NOTES.md`.
- One attack for each foe in each round.
- No weight or encumbrance.

## Layout of the vendored copy

The HTLL repository keeps a byte-for-byte copy of `engine/`, `ui/`, `tools/`, `test.mjs`, `SPEC.md` and the two fixture packs in `arcade/crawler/`. This repository is the source. Change them here, then copy them there (see that repository's `arcade/crawler/README.md`).
