# SPEC: The Crawler

A first-person, grid-based party crawler (a "blobber") for phones. One engine, any number of packs. A pack is data: the theme, the rules, the party, the monsters, the maps, the scenes. The engine knows nothing about rats, torches or corporations.

This file is the contract. Every agent builds to it. Where this file and any other file disagree, this file wins until someone changes it here.

Two packs ship as examples:

| Pack | Repo | Resolver | Source |
|------|------|----------|--------|
| `drowned-tower` | this repo, `crawler/packs/drowned-tower/` | `ose` | `dm/Module_2_The_Drowned_Tower.md`, all 25 areas |
| `drowned-floors` | `game-high-tech-low-lives`, `arcade/crawler/packs/drowned-floors/` | `fate4df` | New. Rhymes Module 2 area for area, in the HTLL world |

Two fixture packs, `packs/test` (`ose`) and `packs/test-fate` (`fate4df`), exercise every feature on a 9 × 7 map. Use them for engine tests and view development.

---

## 1. Files and layout

```
crawler/
  SPEC.md                 this file
  engine/crawl.js         the engine: pure, no DOM, browser and Node
  engine/test.mjs         node tests for the engine
  ui/index.html           the page template, with build markers
  ui/view.js              the view: draws Crawl.view(), sends commands
  ui/style.css
  tools/load.mjs          reads a pack directory into one object
  tools/validate.mjs      node crawler/tools/validate.mjs <packdir>
  tools/build.mjs         node crawler/tools/build.mjs <packdir> [--out file]
  packs/<id>/             one directory per pack
  dist/<id>.html          built, single-file, opens from disk
  test.mjs                Playwright acceptance walk (Phase 2)
```

No libraries, no network, no npm install. Node 22 and the global Playwright (`/opt/node22/lib/node_modules/playwright`, Chromium at `/opt/pw-browsers`) only.

### A pack directory

| File | Holds |
|------|-------|
| `pack.json` | `id`, `title`, `version`, `credits`, and optional `start: {scene}`: a scene that opens the first time the party reaches the hub (the job) |
| `theme.json` | Look and words only: palette, fonts, labels. A reskin changes only this file. |
| `rules.json` | Numbers and procedures: resolver, stats, tracks, clock, combat, fate, skills |
| `party.json` | `default` (four ids, marching order) and `roster` (all characters) |
| `bestiary.json` | Monsters by id |
| `encounters.json` | Encounters by id: which monsters, who acts first, what happens after |
| `items.json` | Items by id |
| `abilities.json` | Spells, powers, chrome and Fate abilities by id. All one kind of thing. |
| `events.json` | Scenes by id |
| `hub.json` | The town: places, actions, the report |
| `endings.json` | Endings by id |
| `maps/<id>.json` | One file per map |

`tools/load.mjs` merges them into one object, `PACK`, with the same keys (`PACK.theme`, `PACK.rules`, ..., `PACK.maps[id]`). Every id is lower-kebab-case, except area keys, which are the module's keys (`S1`, `C12`, `G8`).

---

## 2. Engine API

`engine/crawl.js` is one classic script. In a browser it sets `globalThis.Crawl`. In Node, `require` returns it (`createRequire(import.meta.url)("./crawl.js")` from an `.mjs` file).

```js
Crawl.create(pack, { seed })        → state
Crawl.step(pack, state, command)    → { state, events }
Crawl.view(pack, state)             → view model (section 9)
Crawl.version                       → "0.1"
```

- **Pure.** `step` never mutates its input state. It returns a new state. A state is plain JSON: `JSON.parse(JSON.stringify(state))` round-trips it.
- **Seeded.** The RNG is the demo's mulberry32, with its state kept in `state.rng`:
  ```js
  function rand(s) {
    let t = s.rng = (s.rng + 0x6D2B79F5) >>> 0;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const d = (s, n) => 1 + Math.floor(rand(s) * n);
  ```
  Same pack, same seed, same commands: same state, byte for byte. A replay is `{seed, commands[]}`.
- **Never throws on a bad command.** An illegal command returns the same state and one event `{k:"refuse", text}`.

### Commands

| Command | Mode | Does |
|---------|------|------|
| `{t:"pick", ids:[...]}` | roster | Choose the party (exactly `rules.party.size`, default 4), in marching order. Goes to the hub. |
| `{t:"hub", action}` | hub | Run a hub action by id (section 7) |
| `{t:"turn", dir:"left"\|"right"\|"about"}` | map | Face a new way. No time. |
| `{t:"move", dir:"forward"\|"back"\|"left"\|"right"}` | map | Step one cell. Left and right strafe. |
| `{t:"act"}` | map | Act on the cell ahead: open or force a door, use a link |
| `{t:"search"}` | map | Search the current area (section 5) |
| `{t:"listen"}` | map | Listen at the door ahead |
| `{t:"rest"}` | map | Rest one turn |
| `{t:"use", member, ability?, item?, target?}` | map, fight | Use an ability or item outside the orders flow |
| `{t:"order", ids:[...]}` | map, hub | Change marching order |
| `{t:"choose", id}` | scene | Pick a scene choice |
| `{t:"orders", orders:[{member, act, target?, ability?, item?}]}` | fight | One round. `act`: `fight`, `ability`, `item`, `guard`, `run` |
| `{t:"reroll"}` | fight | Spend Fate to reroll the last missed attack |
| `{t:"cheat"}` / `{t:"letgo"}` | deathDoor | Spend Fate to stay up, or go down |
| `{t:"restart"}` | any | New game, same seed |

### Events

`step` returns an array of events for the view to show, in order:

`{k:"log", text}` · `{k:"roll", who, what, dice:[...], mod, total, target, tier}` · `{k:"tick", turn}` · `{k:"light", text}` · `{k:"wander", roll, hit}` · `{k:"move"}` · `{k:"turn"}` · `{k:"bump", text}` · `{k:"scene", id}` · `{k:"fight", phase:"start"|"end", result?}` · `{k:"harm", who, track, amount}` · `{k:"heal", who, track, amount}` · `{k:"down", who}` · `{k:"ending", id}` · `{k:"refuse", text}`

`who` is a member id or `"enemy:<index>"`. Dice show as numbers (`4dF` dice as -1, 0, +1).

---

## 3. State

```js
{
  v: 1, seed, rng,
  mode: "roster" | "hub" | "map" | "scene" | "fight" | "deathDoor" | "ending",
  turn: 0, sinceRest: 0,
  light: { source: null | "<item id>" | "spell", left: 0, stash: {} },  // stash: snuffed sources' remaining turns
  pos: { map, x, y, facing: 0 },         // facing 0 N, 1 E, 2 S, 3 W; x east, y south
  prev: { map, x, y, facing },           // where "run" retreats to
  party: [ { id, marked: { <track>: n }, fate, used: { <ability>: n }, cond: [], down: false, dead: false } ],
  order: [ ids ],                         // marching order; front = first rules.combat.front living
  bench: [ ids ],                         // roster members not in the party
  flags: {}, items: {}, gold: 0,
  visited: { "<map>": { "<area>": true } },
  seen:    { "<map>": { "x,y": 1 } },     // automap
  doors:   { "<map>": { "x,y": "open" | "found" } },   // "found": a secret door seen, now a closed door
  done:    { "<encounter id>": true },
  foes:    { "<encounter id>": [ { id, hp, marked, state } ] },  // survivors persist across a retreat
  scene: null | { id, said: [], taken: [], from: "map" | "hub" },
  fight: null | { enc, foes: [...], round, first, lastMiss: null | {member, order}, after },
  ending: null | "<ending id>",
  log: [],                                // last 50 log lines, for the view
}
```

A fight's foes live in `state.foes[enc]` from the first round on, so a retreat and return finds the same monsters with the same hp, asleep or awake. (PR #1's review found exactly this bug in the classroom version. Do not repeat it.)

---

## 4. Rules (`rules.json`)

```jsonc
{
  "resolver": "ose",                   // or "fate4df"
  "party": { "size": 4 },
  "stats":  [ { "id": "str", "label": "STR" } ],          // display order
  "tracks": [ { "id": "hp",  "label": "HP" } ],           // fate4df: meat, nerves, systems
  "down": "dead",                      // "dead": out for good, recruit from the bench at the hub. "recover": back up after a hub rest.
  "clock": {
    "turnMinutes": 10,
    "newArea": 1,                      // turns to enter an area not yet visited; known areas are free
    "search": 1, "fight": 1, "rest": 1, "listen": 0,
    "wander": { "every": 2, "inSix": 1, "onNoise": true },   // onNoise: each forced-door try also checks
    "tired":  { "every": 6, "mod": -1 },                     // turns since rest before TIRED; -1 to attack and damage (ose) or to every roll (fate4df)
    "light":  { "order": ["oil-flask", "torch"], "outScene": "dark" }
  },
  "combat": { "front": 2, "reach": 2, "flee": { "inSix": 4 }, "defense": "reflexes" },
  "fate":   { "start": 3, "reroll": 1, "cheatDeath": 2, "bonus": 2 },
  "endings": { "wipe": "end-dead" },
  "skills": {                          // a check names a skill; the resolver reads this
    "listen":    { "inSix": 1 },       // ose: default chance; a member's skills.listen overrides
    "forceDoor": { "inSix": 2 },
    "search":    { "inSix": 1 }
    // fate4df: "listen": { "stat": "reflexes", "difficulty": 1 }
  },
  "statMods": "ose"                    // ose only: modifier from score by the standard table
}
```

### The two resolvers

Everything else in the engine is shared. A resolver is one object with four functions: `check`, `attack`, `defend`, `harm`. Keep each under about 80 lines.

**Tiers.** Every roll ends in a tier: `style`, `success`, `tie` or `fail`. Scene outcomes key off the tier (section 6).

**`ose`** (B/X, Old-School Essentials):

| Roll | How | Tier |
|------|-----|------|
| Check `{skill}` | d6 ≤ chance. Chance = the best living member's `skills[skill]`, else `rules.skills[skill].inSix` | `success` or `fail` |
| Check `{inSix: n}` | d6 ≤ n, rolled once for the party | `success` or `fail` |
| Check `{save: "D"\|"W"\|"P"\|"B"\|"S", who}` | d20 ≥ the member's `saves[save]` | `success` or `fail` |
| Member attacks | d20 + `attack.bonus` + stat mod (`attack.stat`, default `str`) + tired mod ≥ the foe's ascending `ac`. Natural 20 hits; natural 1 misses. Damage: `attack.damage` + stat mod + tired mod, minimum 1 | `success` or `fail` |
| Foe attacks | d20 + `attack.bonus` ≥ the member's ascending `ac` (+2 if the member guards). Damage: `attack.damage`, marked on `attack.track` (default `hp`) | — |
| Morale | When a foe group first loses one, and again at half: 2d6 > `ml` and the rest flee. A `breakAt: {dead: n}` replaces the roll: at n dead the rest flee. | — |

Stat mods from a score, the standard table: 3: −3; 4–5: −2; 6–8: −1; 9–12: 0; 13–15: +1; 16–17: +2; 18: +3.

**`fate4df`** (HTLL, the canonical ladder from `build/docs-v2/core_moves_sheet.md`):

| Roll | How | Tier |
|------|-----|------|
| Any roll | 4dF (each die d3 − 2) + stat + mods vs a difficulty. Shifts = total − difficulty | shifts ≥ 3 `style`; ≥ 1 `success`; 0 `tie`; < 0 `fail` |
| Check `{skill}` | `rules.skills[skill]` gives `stat` and `difficulty`. The best living member rolls. | ladder |
| Check `{stat, difficulty}` | The best living member rolls | ladder |
| Member attacks | `attack.stat` vs the foe's `rating`. Style or success: the foe marks max(1, shifts). Tie: the foe marks 1 and the attacker marks 1 on `attack.costTrack` (default the first track). Fail: nothing. | ladder |
| Foe attacks | The target rolls `rules.combat.defense` vs `attack.rating` (+2 if guarding). Style: the foe marks 1. Success: no harm. Tie: mark 1. Fail: mark −shifts. Marked on `attack.track`. | ladder |
| Breaking | `breakAt: {dead: n}` or `{marked: n}` (total stress marked across the group) | — |

**Harm and down.** A track has a maximum: `ose` from the member's `hp`; `fate4df` from the member's `tracks[id]` (default 3). Harm marks boxes; it never subtracts from a pool. When any track is full, the member is down. If the member has at least `fate.cheatDeath` Fate, the mode becomes `deathDoor` first: `cheat` spends it and leaves the member one box short of full; `letgo` puts them down. A down member drops out of the marching order. If every member is down, go to the ending named by `rules.endings.wipe`.

**Fate.** Each member starts each delve with `fate.start`. `reroll` costs `fate.reroll` and rerolls the last missed attack of the round just played. Fate refreshes at a hub rest.

---

## 5. Maps (`maps/<id>.json`)

```jsonc
{
  "id": "cellars", "title": "The Lamp Cellars", "tier": "Level 1",
  "grid": [                             // one character per 10' square; every row the same length
    "##########",
    "#aaa=bbb.#"
  ],
  "legend": { "a": { "area": "C1" }, "b": { "area": "C2" } },
  "cells":  { "3,1": { "link": { "map": "surface", "x": 4, "y": 2, "facing": 0 } } },
  "areas":  {
    "C1": { "name": "The Cellar Stair", "light": "dark", "enter": "c1", "search": "c1-search", "encounter": null },
    "C2": { "name": "The Oil Store",    "light": "dark", "encounter": "c2-rats",
            "listen": { "flag": "heard-rats", "say": ["Scratching. Squeaks. Many."] } }
  },
  "wander": [ { "weight": 1, "encounter": "lone-rat" } ]
}
```

**Glyphs the engine knows.** A pack's `legend` may add glyphs and may give any glyph more fields (`area`, `water`).

| Glyph | Is |
|-------|----|
| `#` | Wall |
| `.` | Floor with no area. Entering it never costs time. |
| `+` | Door. Walking into it opens it. Free. |
| `=` | Stuck door. Blocks until forced: `act` rolls `forceDoor`. Each try is noise (a wander check if `clock.wander.onNoise`). |
| `L` | Locked door. `act` opens it if the party carries the item named in `cells["x,y"].key`; otherwise it blocks. |
| `S` | Secret door. A wall until found by `search` or a `reveal` effect; then a door (`+`). |
| `<` `>` | Stairs. Must have `cells["x,y"].link`. Moving into the cell, or `act` while facing it, uses the link. |
| `~` | Water. Passable. The view hatches it. |

`cells["x,y"]` may set `area`, `link`, `key`, and `event` (a scene that opens the first time the party steps on the cell). A `link` is `{map, x, y, facing}` or `{hub: true}` or `{scene: id}`.

**Areas.** Every lettered cell belongs to an area. Entering an area not yet visited costs `clock.newArea` turns; then its `enter` scene opens, if it has one. If the area has an `encounter` that is not done, the fight starts on entry, unless the area also has an `enter` scene: then the scene must start it with `goto: {encounter}`. `light` is `daylight`, `dim` or `dark`.

**Listening.** `listen` while facing a door (`+`, `=`, `L`, or a found `S`) costs `clock.listen` turns and rolls the `listen` skill. On a success, if the area beyond the door has `listen`, the engine sets its `flag` and shows its `say`; otherwise it logs that you hear nothing. A failure always logs "You hear nothing", so a player cannot tell a miss from silence.

**Searching.** `search` costs `clock.search` turns. It rolls the `search` skill once for each unfound `S` cell next to (4-neighbour) any cell of the current area; a success finds it. If the area has a `search` scene, that opens once, after the roll.

**Wandering monsters.** Every `clock.wander.every` turns, roll d6 ≤ `clock.wander.inSix`. A hit picks from the current map's `wander` table by weight. A wandering encounter with `"nonLethal": true` cannot take a member below one box from full.

**Light.** In a `dark` area, if no light is lit, the engine lights the first carried item in `clock.light.order` (an item is carried if `state.items[id] > 0` and any `light.requires` item is also carried) and logs it. A lit source loses one turn per tick. At zero it is spent and the next is lit. If none is left in a dark area, the view shows nothing ahead and the `outScene` opens once. Entering a `daylight` area snuffs the source, keeping its turns in `light.stash`. An ability with a `light` effect lights `"spell"`.

---

## 6. Scenes (`events.json`)

```jsonc
{
  "c1": {
    "title": "The Cellar Stair", "area": "C1",
    "text": [ "Read-aloud. Two to four sentences." ],
    "choices": [
      { "id": "look-door", "mode": "plan", "text": "Look at the door.", "say": [ "Oak, swollen in its frame." ] },
      { "id": "listen", "mode": "act", "text": "Listen at the door.", "turns": 0,
        "check": { "skill": "listen" },
        "on": { "success": { "flag": { "set": ["heard-rats"] }, "say": ["Scratching. Squeaks. Many."] },
                "fail":    { "say": ["Nothing."] } }, "once": true },
      { "id": "made", "mode": "fate", "ability": "know-how-made", "text": "I Know How This Was Made.",
        "effects": { "flag": { "set": ["door-silent"] }, "say": ["..."] } },
      { "id": "home", "mode": "act", "text": "Row home.", "effects": { "goto": { "hub": true } } }
    ]
  }
}
```

**The gate.** Every choice has a `mode`:

| Mode | Cost | Drawn |
|------|------|-------|
| `plan` | Free. No time, no dice. Must not have `turns` or `check`. | Dashed border |
| `act` | `turns` (default 0) tick first, then any `check`, then effects. | Solid border |
| `fate` | Free. Spends one use of `ability` (which some living member must have unused). | Double border |

The view names the gate the first time a scene shows both a `plan` and an `act` choice: *Planning is free. Acting costs time.* Use the Year Two words, **Planning** and **Execution**, in packs for the Fort.

**Outcomes.** A choice has either `effects`, or `check` plus `on: {style?, success, tie?, fail}`. A missing `style` uses `success`. A missing `tie` uses `success` (fate4df: success at a cost; put the cost in `tie` when there is one). `say` lines are shown under the scene text and kept in `scene.said`. A choice with `"once": true` hides after it is taken.

**Leaving.** A scene opened from the map gets a last choice, *Step back* (`theme.labels.leave`), which closes it. Set `"noLeave": true` to remove it (a trap, a fight about to start). Hub and interrupt scenes must have their own way out.

**Conditions** (`"if": {...}` on a choice; an unmet choice is shown greyed, with `reason`, so number keys stay stable):
`flags: []`, `notFlags: []`, `items: {id: n}`, `member: id` (in the party and up), `ability: id` (unused), `fate: n` (some member has n), `gold: n`, `visited: "<area>"`.

### Effects: the whole vocabulary

Items, abilities, scene choices, encounters' `onWin` and hub actions all use these ten verbs, and nothing else. Apply them in this order:

| Verb | Shape | Does |
|------|-------|------|
| `flag` | `{set: [], unset: []}` | Story flags |
| `item` | `{add: {id: n}, remove: {id: n}}` | Shared party pack. `gold` is an item id. |
| `damage` | `{who, amount, track?}` | Marks harm. `amount` is a number or dice (`"1d8"`). |
| `heal` | `{who, amount, track?}` | Clears marks |
| `condition` | `{who, add?, remove?, budget?}` | `asleep`, `tired`, or any pack word. `budget: "2d8"` with `who: "foes"` affects foes in order while their `hd` fits the budget (Sleep). |
| `bonus` | `{who, amount, scope: "next"\|"fight"}` | A modifier to rolls |
| `reveal` | `{map, cells: ["x,y"]}` | Finds secret doors; marks cells seen |
| `fate` | `{who, amount}` | Gives or spends Fate |
| `light` | `{turns}` or `{item}` | Lights a source |
| `goto` | `{scene}` \| `{map, x, y, facing}` \| `{hub: true}` \| `{encounter}` \| `{ending}` \| `{close: true}` | Moves the game. At most one. Applied last. |

Plus `say: []` (lines to show) on any effect block.

`who`: `self`, `target`, `leader` (first living in order), `front`, `party`, `random`, `foes`, `foe` (the targeted foe), `nearest` (with `n`).

---

## 7. Party, monsters, items, abilities, hub, endings

**Characters** (`party.json` → `roster.<id>`):

```jsonc
{
  "name": "The Fighter", "title": "The Next Blacksmith", "npc": true,
  "class": "Fighter", "text": "One-line read-aloud for the roster card.",
  "stats": { "str": 14, "int": 9, "wis": 10, "dex": 11, "con": 13, "cha": 10 },   // fate4df: { "body": 2, ... } as modifiers
  "ac": 15, "hp": 8,                         // ose. fate4df: "tracks": { "meat": 3, "nerves": 3, "systems": 3 }
  "attack": { "name": "sword", "bonus": 0, "damage": "1d8", "stat": "str", "ranged": false },
  "saves": { "D": 12, "W": 13, "P": 14, "B": 15, "S": 16 },
  "skills": { "listen": 1, "forceDoor": 3 },
  "abilities": ["know-how-made"],
  "items": { "torch": 3 },                   // added to the shared pack when the member joins
  "fate": 3,
  "oseLine": "AC 4 [15] · HD 1 (8 hp) · ...",  "note5e": "..."   // shown on the card
}
```

Only the front rank can make a melee attack or be attacked in melee. A back-rank member with a `ranged` attack can fight from the back.

**Monsters** (`bestiary.json`): `ose`: `{name, ac, hd, hp: [..] or "1d8", attack: {bonus, damage, track?}, ml, breakAt?, xp, oseLine, note5e}`. `fate4df`: `{name, rating, stress, attack: {rating, track}, breakAt?, aura?}`.

`aura` (both resolvers): at the start of each round, each living member not using the `avoid` stance rolls `check` and on a fail gains `condition`. `{check: {...}, condition: "flagged", avoid: "guard"}`. Use sparingly.

**Encounters** (`encounters.json`): `{foes: [{id, count?, hp?: [..]}], first: "party" | "foes" | {ifFlag, then, else}, reach?, nonLethal?, onWin?: effects, onFlee?: effects, after?: sceneId, text?: [..]}`. `first` decides only round one.

**Items**: `{name, kind: "light"|"use"|"gear"|"treasure", value?, light?: {turns, requires?}, use?: {when: "map"|"fight"|"any", target, effects}}`.

**Abilities**: `{name, kind: "spell"|"power"|"chrome"|"fate", per: "rest"|"delve", uses: 1, when: "map"|"fight"|"any"|"scene", target: "foe"|"foes"|"ally"|"party"|"self"|"none", effects, check?, on?}`. A `fate` ability is used only through a `fate`-mode scene choice.

**Hub** (`hub.json`): `{title, text, places: [{id, label, text, actions: [{id, label, kind, ...}]}], report: {title, lines: {flag: text}}}`. Kinds: `rest` (clears all marks and conditions, restores uses and Fate; `"recover"` packs raise the down; costs `price` gold), `shop` (`stock: [{item, price}]`, and sells treasure at `value`), `scene` (`scene: id`; how the party leaves for the dungeon), `roster` (swap bench members in, fill places left by the dead). When the party comes home, the hub shows `report.lines` for every set flag.

**Endings** (`endings.json`): `{title, kind: "good"|"back"|"dead", text: [..]}`. `rules.endings.wipe` names the ending for a dead party.

---

## 8. Theme (`theme.json`)

```jsonc
{
  "palette":     { "paper": "#F2EAD3", "ink": "#1B1712", "accent": "#7A2E1C", "muted": "#6B6253" },
  "paletteDark": { "paper": "#14120F", "ink": "#E9E0C9", "accent": "#D0704E", "muted": "#9C927F" },
  "fonts": { "title": "Georgia, serif", "body": "Georgia, serif", "mono": "ui-monospace, Menlo, monospace" },
  "titleCaps": true,
  "labels": { "leave": "Step back", "turn": "Turn", "light": "Light", "search": "Search", "rest": "Rest", "map": "Map" }
}
```

System fonts only. The view fills any missing label with its English default.

---

## 9. The view model and the view

`Crawl.view(pack, state)` returns what the screen needs. The view draws only this, and sends only commands.

```js
{
  mode,
  hud:   { turn, minutes, light: { label, left } | null, dark, tired, gold, area: { key, name } | null },
  party: [ { id, name, title, rank: "front"|"back", down, dead, fate,
             tracks: [ { id, label, max, marked } ], cond: [], abilities: [ { id, name, left, usable } ] } ],
  map:   { id, title, x, y, facing,                // facing 0..3
           ahead: [ [L, C, R], ... ],              // depth 0..3; each a cell kind
           can: { forward, back, left, right, act, search, listen, rest },
           automap: { w, h, rows: [ "string per row, unseen cells as space" ] } } | null,
  scene: { id, title, text: [], said: [], choices: [ { id, text, mode, enabled, reason } ], gate: bool } | null,
  fight: { round, foes: [ { i, name, state, hp: "label" } ], members: [ { id, acts: [ "fight", ... ], abilities: [...], items: [...] } ],
           canReroll, canRun } | null,
  hub:   { title, text, places: [...], report: [ "lines" ] } | null,
  roster:{ need, members: [ { id, name, title, text, npc, stats, card } ] } | null,
  ending:{ id, title, kind, text } | null,
  log:   [ last 50 lines ]
}
```

Cell kinds in `ahead`: `wall`, `open`, `door`, `stuck`, `locked`, `stairs`, `water`. A secret door not yet found is `wall`. Out of bounds is `wall`. `ahead[0][1]` is the party's own cell. When dark, every kind except `ahead[0][1]` is `dark`.

### The screen (portrait first, 360 px wide and up)

```
┌──────────────────────────┐
│ C2 · The Oil Store  T 14 │  hud: area, turn, light, TIRED
│                          │
│   wireframe view         │  square; ink lines on paper; depth 0..3
│   (foe plate in a fight) │
├──────────────────────────┤
│ Fighter ▮▮▮▯  Elf ▮▮▯▯    │  four cards, 2 × 2; front rank on top
│ Paladin ▮▮▮▮  Minister ▮▮ │  tap a card for its abilities
├──────────────────────────┤
│ log, 3 lines, aria-live  │
├──────────────────────────┤
│  ↶   ↑   ↷     [ Act ]   │  thumb zone
│  ←   ↓   →  [Map] [Rest] │  scene: choices replace it. fight: orders replace it.
└──────────────────────────┘
```

- **Wireframe.** Canvas 2D, device-pixel-ratio aware. Lines only, in `ink` on `paper`: walls as trapezoids, doors as a frame inside the wall, stairs as a few steps, water as hatching. No fills except the paper. This is the Otus-ink house look; a theme's palette makes it duotone.
- **Input.** Tap the arrows; swipe on the view (up forward, down back, left and right turn); keys: ↑/W forward, ↓/S back, ←/A and →/D turn, Q/E strafe, Space or Enter act, F search, L listen, R rest, M map, 1–9 choices and orders, Esc closes the map. Tap targets at least 44 px. No horizontal scroll at 360 px.
- **The map.** An overlay draws `automap` and, under it, the moves as a turtle: `FORWARD 30 · RIGHT 90 · FORWARD 20` (10' per cell). This is Module 2's mapping lesson.
- **Scenes.** Read-aloud in the title font; choices as buttons with the mode border; greyed choices show `reason`.
- **Fight.** One member at a time: the view asks for each living member's order, then sends one `orders` command. Rolls appear in the log in mono: `Fighter d20 14 +1 = 15 vs AC 12 · hit · 1d8+1 = 6`.
- **Light and dark.** CSS tokens on `:root` from `theme.palette`; `prefers-color-scheme: dark` uses `paletteDark`. Respect `prefers-reduced-motion`.
- **Saves.** `localStorage["crawl.<pack id>"]` holds `{seed, commands}`, written after each step; the page replays it on load. Wrap every storage call in try/catch; the page must work without storage. `?seed=N` sets the seed; the footer shows it. A *New game* button clears the save.
- **Frame bar.** `F1 How to play` (a `<details>` with the controls and the gate) in the static HTML, so it reads with scripting off.
- **Test hook.** `window.CRAWL = { pack, get state(), step(cmd), view(), replay({seed, commands}), seed }`.

---

## 10. Build and validate

- `node crawler/tools/validate.mjs <packdir>`: prints `OK <id>` or a list of errors and exits non-zero. It checks: required fields; ids resolve (events, encounters, monsters, items, abilities, maps, endings, flags used in `if` against flags set anywhere); grid rows equal length; every glyph known; every lettered cell in an area that exists; every link lands on a passable cell; every area reachable from some entry, with secret doors counted as passable (and reports areas reachable only through a secret door); `plan` choices have no `turns` or `check`; resolver-specific monster and character fields; the default party is in the roster. Warnings (not errors): text lines over 400 characters, labels missing.
- `node crawler/tools/build.mjs <packdir> [--out <file>]`: reads `ui/index.html` and replaces `<!-- @style -->`, `<!-- @pack -->`, `<!-- @engine -->`, `<!-- @view -->` with inline `<style>`/`<script>` blocks, and `{{title}}` with the pack title. Default output `crawler/dist/<id>.html`. It looks for `engine/` and `ui/` next to `tools/`, so a vendored copy builds the same way.

---

## 11. Canon and IP rules for pack writers

- **This repo.** Read `AGENTS.md`. Module 2's pinned facts are fixed: names, sizes, numbers, the rat line. Copy the module's read-aloud and stat lines; do not rewrite them. Do not key Halcyon. Never mention the Sleeper. The Door Beneath the Lake is not opened. Use "the Gorgon Queen", never "the Basilisk Queen". Full OSE line plus one 5e note per monster, on its card.
- **Wizardry is someone else's.** Take its structure (the grid, the party of ranks, the town, the camp) and nothing else: no names, spell words, places, monsters, art or text from any Wizardry game.
- **HTLL.** Read `.claude/conventions/writing-style.md` and `design-principles.md` there. Stress is marked, not subtracted. Palettes are the playbooks' own. The pregens' facts come from their files.
- **Style.** Plain words, short sentences. UI labels in Simplified Technical English. Read-aloud in the Wolfe and Vance register: dry, exact, odd, never explaining itself.
