# The Forge

A seeded dungeon generator for the Fort Country. Pick *Tower* or *Ravine*, give it a seed, and it builds a keyed B/X dungeon (OSE Advanced Fantasy) in the house format, with a map in the Otus-ink style of the hex map.

**The lesson ladder is fixed. The content is rolled.** A tower always teaches light, searching, doors, wanderers, mapping, retreat, a readable history, a first parley, a hazard and a climax that rewards the clue, in that order of depth. A ravine always climbs morale → reaction → factions → alarm → deception → avoidance → temple. See `campaign/SPINE.md`, "Procedural Generation: The Forge".

| File | What it is |
|------|-----------|
| `index.html` | The Forge page. Open it from disk; no network, no build. |
| `forge.js` | The engine: seeded RNG, layout, lesson slots, Markdown and SVG. Pure functions, no DOM. |
| `tables.js` | Every rollable list, as plain data. Original text. This is the file to change. |
| `test.mjs` | Checks the invariants over 300 seeds × 3 party levels per template, then loads the page in Chromium. |

## At the table

1. Open `index.html`. Choose a template, a seed and the party's level (1–3). Press **Generate**.
2. **Print** gives the map on one page and the key after it, one tier or lair per page. **Download .md** and **Download .svg** save the text and the map. **Copy Markdown** puts the key on the clipboard (or shows it to copy by hand).
3. Share a dungeon by its link: `index.html?template=tower&seed=42&level=2` always makes the same one, as long as nobody has changed the tables.

Every encounter's OSE stat table is followed by one italic **5e line** per creature (CR nearest HD/2, ascending AC, the same hp, attack bonus from THAC0, CON save DC 12 or 13 for paralysis, poison, disease or petrification, and "flees at half HP" at morale 7 or lower), built from the same monster data so the two cannot disagree; see `campaign/SPINE.md`, "Rules for Writers".

Each dungeon states a **clock** (what happens if the party is slow), ends on a choice between two buyers (tower) or three uses of a relic (ravine), and puts an **Art reference** on its climax room.

## Run the checks

```
node generator/test.mjs
```

Needs Node 18+. The browser part uses Playwright with Chromium; it is skipped if Playwright is not installed. `FORGE_SEEDS=50` runs a shorter pass. Screenshots go to `/tmp/claude-0/forge-check/` (set `FORGE_SHOTS` to change it).

What it checks: same seed gives identical output; every room is reachable from the entry; every exit has a matching exit back (kinds match, except the one-way secret door: `secret` on the near side, `door` on the far side); every lesson slot is present and each is deeper than the last, counting only doors a party can see; towers have a loop, a dead end, and a secret door that strictly shortens the walk from S1 to the climax; ravines have 7–8 mouths on alternating walls, two rival clans joined by a contested passage, and the temple last; no rooms overlap on a map panel; every fight has hp for each creature and XP, and the totals add up; every encounter has a 5e line per creature whose AC, CR, hp, attack bonus and morale agree with its OSE row; read-aloud is two to four sentences; no names from the source books; the SVG is well-formed XML; and the page loads with no console errors and no sideways scroll at 360px.

## Add a table entry

Open `tables.js`, find the list (for example `ForgeTables.tower.cellarFiller` or `ForgeTables.ravine.quirks`), copy an entry and change its words. Keep read-aloud (`ra`) to one or two short sentences: the engine adds a line of dressing to make two to four. Features are `[name, detail]` pairs. Words in `{braces}` are filled in by the engine. Then run the test: it reads your new line in hundreds of dungeons and tells you if anything breaks.

Write for this setting: old machines and old magic are one thing, named plainly (a ward is a sensor eye and a spell at once). Do not use names or room contents from the source books.

## Write a new template

1. In `forge.js`, add its lessons to `TEMPLATES` (the ladder, in order).
2. Write `genSomething(seed, level)`. Use `makeRng(hashSeed(seed, "something"))` for all randomness. Return rooms with `key`, `name`, `panel`, `exits` (`{to, kind, dir}`), `x, y, w, h` in feet on their panel, the house-format fields, and a `slot` on the room that teaches each lesson. Call `finish(d)` to total the XP and build the lesson order.
3. Register it in `GENERATORS` at the bottom of `forge.js`, and add it to the page's template buttons.
4. Add its own checks to `test.mjs` beside `checkTower` and `checkRavine`, and run the test.

`growGrid` lays rooms on a grid and returns a main path plus branches; most templates can start from it.

## Sources

Monster statistics are the OSE / B/X values listed in `ForgeTables.monsters` (AC, HD, attacks, THAC0, movement with encounter rate, saves, morale, XP). Clan leaders follow the OSE leader notes in spirit: a sturdier member of the type with more HD. Everything else in `tables.js` is original to this project.
