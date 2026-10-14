# The Stage: Spec

The Stage plays a solo visual novel as a motion picture you step through. It is one engine and any number of packs. A pack is data: the script, the notes, the sets, the theme and the art. The engine knows nothing about clerics, coffee or the Fort. The build writes each pack to one HTML file that opens from disk.

This spec is **frozen** for the first build (see [`PLAN.md`](PLAN.md)). An agent that needs a change stops and reports it; the lead changes the spec, then the code. Where this file and any other disagree, this file wins.

The model for the production value is *Neon On-Call* (team-ycbbb, `spooks/neon-on-call/`). The model for the layout is the crawler: `engine/`, `ui/`, `tools/`, `packs/`, one `test.mjs`.

## 1. Files

```
stage/
  SPEC.md  PLAN.md  README.md
  engine/stage.js        rules only: state, conditions, effects, dice, cues, simulate. No DOM.
  engine/test.mjs        node --test, no browser
  ui/index.html          the shell, with @style @pack @engine @view @kit markers
  ui/style.css           the shell's styles; every colour and length is a custom property
  ui/view.js             deck, typewriter, HUD, sheets, chips, keys, audio, film mode
  ui/kits/paper.js       the pop-up book: page turn, folds, tunnel, flap, pull-tab, volvelle, ticket, reveal ink
  ui/kits/feed.js        the surveillance feed: frames, tracking boxes, scan, log, redaction
  tools/build.mjs        node stage/tools/build.mjs stage/packs/<id> → stage/dist/<id>.html
  tools/validate.mjs     schema and reference checks; prints OK <id>
  tools/sim.mjs          walks every path; prints endings and unreachable nodes
  packs/test/            a fixture that uses every feature, both kits
  packs/magic-module/    the OSR pack: the elf cleric
  test.mjs               Playwright, every built pack
  dist/                  built files (committed, as in crawler/)
```

The HTLL repository vendors `engine/`, `ui/`, `tools/`, `SPEC.md`, `test.mjs` and `packs/test/` byte for byte into `arcade/stage/`, with a `check-vendor.mjs` like the crawler's. Its own pack is `arcade/stage/packs/dead-drop/`.

## 2. A pack

| File | Holds | Required |
|------|-------|----------|
| `pack.json` | Identity, kit, resolver, meters, card fields, start scene, storage key | Yes |
| `script.json` | Scenes, beats, choice groups, endings | Yes |
| `notes.json` | Every ⓘ note and every commentary line | Yes |
| `sets.json` | Each set: a kit and its layers | Yes |
| `theme.json` | Two themes as custom-property values; fonts; map styles | Yes |
| `cast.json` | One cast sheet image and a face circle for each speaker | No |
| `art/` | SVG and JPEG/WebP files the sets and cast name | No |
| `fonts/` | WOFF2 files and their licence | No |
| `NOTES.md` | Sources, canon pins, what the pack teaches | Yes |

### pack.json

```json
{ "id": "magic-module", "title": "The Magic Module", "subtitle": "The elf cleric",
  "kit": "paper", "resolver": "ose", "start": "s1",
  "storageKey": "fort-stage.magic-module",
  "meters": [ { "id": "fate", "label": "Fate", "min": 0, "max": 5, "start": 1, "hud": true } ],
  "fields": [ { "id": "lens", "label": "The Lens", "side": "front" } ],
  "tallies": [ "lens" ],
  "commentary": { "label": "How the module DMs", "kinds": ["dm", "rule"] } }
```

- `kit` is `paper` or `feed`. `resolver` is `ose` (dN notation) or `fate4df`.
- `storageKey` starts with `fort-stage.` in this repository and with `htll.` in HTLL.
- `fields` are the card the player carries away. `tallies` are counters a choice can add to (the Lens: hymn, machine).
- `commentary.kinds` lists the note kinds the commentary track shows.

### script.json

```json
{ "scenes": [ {
    "id": "s1", "title": "The Queen's Chamber", "place": "Year One · the Gorgon Caves",
    "look": "ink", "set": "chamber",
    "beats": [
      { "text": "…", "kicker": "YEAR ONE", "notes": ["lens"], "comment": "dm-describes" },
      { "text": "…", "speaker": "cassandra" },
      { "text": "…", "reveal": true, "when": { "tally": "lens", "top": "machine" } }
    ],
    "choices": [ {
      "key": "lens1", "ask": "What do you see in the carved eyes?", "gate": "plan",
      "options": [
        { "key": "a", "label": "Wards", "sub": "Lens: hymn", "effects": [ { "tally": "lens", "add": "hymn" } ] },
        { "key": "b", "label": "Sensors", "sub": "Lens: machine", "effects": [ { "tally": "lens", "add": "machine" } ],
          "then": [ { "text": "…" } ] }
      ] } ],
    "next": "s2" } ],
  "endings": { "milestone": { "title": "…", "look": "paint", "set": "road", "beats": [ { "text": "…" } ] } } }
```

**Scene**: `id`, `title`, `place`, `look`, `set`, `beats`, `choices` (zero or more groups, played in order after the beats), and one of `next` (a scene id), `ending` (an ending id) or `route` (a list of `{ "when": cond, "to": id }`, first match wins, last entry has no `when`).

**Beat**: `text` (plain text; `*word*` is the only markup, for emphasis), and optional `kicker`, `speaker` (a cast id), `set` (changes the set inside the scene), `notes` (ⓘ chips), `comment` (one commentary note id, shown in the commentary track), `reveal` (hidden until the player reveals it), `screen` (lines shown on an in-world screen, kit-drawn), `when`.

**Choice group**: `key`, `ask`, `gate`, optional `cost` (`{ "meter": "fate", "n": 1 }`, only with gate `fate`), `options`.

**Option**: `key`, `label`, optional `sub` (the mechanical effect in plain words: shown under the label), `when` (hidden when false; `lock` instead of `when` shows it greyed with its `hint`), `effects`, `then` (beats played after the pick), `to` (leave the scene now), `roll`, `input`.

- `gate` is `plan`, `exec` or `fate`. A `plan` pick can be changed by going back. An `exec` or `fate` pick cannot. This is the Planning/Execution gate; the view shows it, and the first `exec` group in a pack must carry a `rule` note that teaches it.
- `roll`: `{ "dice": "2d6" | "1d20" | "3d6" | "4dF", "add": "<meter or field id>", "vs": n, "results": { "fail": {…}, "success": {…}, "style": {…} } }`. Each result is `{ "effects", "then" }`. `ose` reads `fail`/`success` (meet or beat `vs`). `fate4df` reads `fail` (below `vs`), `tie` (equal, falls back to `fail` if absent), `success`, `style` (`vs` + 3 or more, falls back to `success`).
- `input`: `{ "field": "public", "prompt": "…", "max": 140 }`. The player types; the text goes to that card field. Simulation fills it with `"(typed)"`.

**Conditions** (`when`, `lock`, `route`): `{ "flag": "x" }`, `{ "field": "x", "is": "y" }`, `{ "meter": "fate", "gte": 1 }` (also `lte`), `{ "tally": "lens", "top": "machine" }` (that value leads or ties), `{ "all": [ … ] }`, `{ "any": [ … ] }`, `{ "not": cond }`.

**Effects**: `{ "flag": "x" }`, `{ "set": { "field": "value" } }`, `{ "meter": "fate", "add": -1 }`, `{ "tally": "lens", "add": "hymn" }`.

**Endings**: `title`, `look`, `set`, `beats`. Every ending must be reachable (`sim.mjs` fails otherwise).

### notes.json

```json
{ "lens":         { "kind": "rule", "term": "The Lens", "text": "Old things show at the edge. You read each one as hymn or machine. Neither is wrong." },
  "dm-describes": { "kind": "dm",   "term": "The DM describes", "text": "A DM tells you what you see. The read-aloud box does it here." } }
```

`kind` is one of `rule` (how the game works), `dm` (how the module does a DM's job), `lore` (the world), `handler`, `algorithm`, `guide` (HTLL voices). A note opens from a chip in a sheet; a `comment` note appears in the commentary track under the text, and the track can be turned off. Every note text is 60 words or fewer.

### sets.json

```json
{ "chamber": { "kit": "paper", "layers": [
    { "prim": "spread",  "art": "art/chamber-back.svg" },
    { "prim": "vfold",   "art": "art/eyes.svg", "x": 0.5, "y": 0.55, "w": 0.6 },
    { "prim": "flap",    "art": "art/plinth.svg", "under": "art/plinth-under.svg", "opensOn": "reveal" } ] } }
```

Positions are fractions of the stage. Each kit defines its primitives in section 4. A set never names a motion; the engine's cues decide what moves (section 3).

### theme.json

Two themes, `light` and `dark`, each a map of custom-property names (without `--`) to colours. The OSR pack copies Blueline's `paper` and `lamp` values. `fonts`: `[{ "family", "file", "weight", "style" }]`, embedded by the build as base64. `mapStyles`: `["ink", "blueline"]`; the first is the default and the reader can toggle.

### cast.json

`{ "sheet": "art/cast.jpg", "w": 1200, "h": 660, "people": { "chen": { "name": "Manager Chen", "role": "…", "x": 400, "y": 220, "r": 90 } } }`. Portraits are crops of the one sheet by background position, as in Neon On-Call.

## 3. The engine

`engine/stage.js` defines `Stage` (a global in the browser, `module.exports` in Node). It has no DOM and no timers.

```js
const game = Stage.create(pack, { seed: 42, save: null });
game.view()            // → { node, scene, beat, group, options, meters, fields, tallies, flags, cues, canBack }
game.next()            // advance one beat; at a choice group, does nothing
game.choose(optKey)    // pick an option in the current group; returns view()
game.reveal()          // reveal the current beat if it is a reveal
game.input(text)       // answer an input option
game.back()            // review one beat back; undoes the last pick only if its gate was plan
game.save()            // → JSON string
Stage.simulate(pack, { seed }) // → { paths, endings: { id: count }, unreachable: [ids], locked }
Stage.validate(pack)   // → [error strings]
```

`node` is `beat`, `choice`, `input`, `roll` or `ending`. Dice use mulberry32 seeded from `seed`; `?seed=N` sets it in the browser and the footer shows it.

**Cues.** Each step returns `cues`, a list the view plays in order. The engine picks them from the data. Packs cannot pick a motion, so one motion always means one thing:

| Cue | Fires when | Means, and nothing else |
|-----|-----------|-------------------------|
| `turn` (`dir` +1/−1) | The scene changes | Time passes |
| `shift` | A beat changes the set inside a scene | The same moment, a new view |
| `ink` | A beat with look `ink`, or a `reveal`, comes into view | Unwitnessed or secret |
| `bloom` | A beat with look `paint` comes into view | Witnessed or public |
| `seal` | An `exec` or `fate` pick is made | The choice is final |
| `roll` (`dice`, `faces`, `total`) | A roll resolves | The dice decide |
| `cost` / `gain` (`meter`, `n`) | A meter goes down / up | Consequence |
| `tear` | A Fate point is spent | Player authority used |
| `close` | An ending is reached | The story stops |

## 4. The view

**Layout** (one screen, after Neon On-Call): top bar (title, endings found, AUTO/STEP, settings, help) · HUD (meters, the Lens tally, the card button) · stage (the kit draws the set; text panels slide over it) · deck (back, a hint line, next). It works at 360 × 640 and up, with no page scroll; long text scrolls inside its panel.

**Text.** Text types out at 28 ms a character. A tap finishes the line; the next tap goes on. Screen readers get the whole line at once through one polite live region, never a character at a time.

**Commentary track.** Under the text panel, one line in the commentary voice when the beat has a `comment`. A toggle in settings hides it. ⓘ chips open the notes sheet at that note.

**Sheets.** Help (controls, how to play), Notes (every note met so far, grouped by kind), Card (the fields, copy as text), Verify (every path and ending, as Neon On-Call's `--VERIFY`; tap a row to replay to it), Settings (theme, map style, commentary, sound, AUTO speed).

**Film mode.** AUTO plays beats like a film and stops at every choice, roll, input and reveal.

**Sound.** Web Audio only, no files, off until the player turns it on. One sound per cue at most.

**Keys.** → Space Enter: next. ←: back. 1–9: pick. R: reveal. N: notes. C: card. V: verify. H or ?: help. Esc: close a sheet. A: AUTO. All controls are buttons with labels; targets are 44 px or larger.

**Kit: paper** (the pop-up book). Primitives: `spread` (the two-page ground), `vfold` (rises from the gutter), `parallel` (a platform that lifts flat), `tunnel` (three to five layered planes; tilt moves them), `flap` (lifts on `reveal`, shows `under`), `pulltab` (slides a second layer out; bound to a tally value), `volvelle` (a wheel that turns on `roll`), `ticket` (tears on `tear`), `plate` (a framed image; `look` paint blooms it, `ink` draws it). `turn` is a page turn. `ink` draws SVG strokes on (stroke-dashoffset). `bloom` is a warm wash and lamplight.

**Kit: feed** (the Algorithm's view). Primitives: `frame` (a camera frame with timestamp and channel), `track` (a box that follows a cast face with a label and confidence), `scan` (a sweep line), `log` (scrolling machine lines), `redact` (bars that lift on `reveal`), `plate`. `turn` is a hard cut with a channel change. `ink` is a redaction lifting. `bloom` is the frame coming into focus.

**Reduced motion.** Under `prefers-reduced-motion: reduce` every cue jumps to its end state, text appears whole, and nothing loops. Every primitive has a static end state that reads correctly.

**Performance.** Animate only `transform` and `opacity` in CSS. Canvas at device pixel ratio 2 or less. Stop the frame loop when the page is hidden and when no layer is moving.

**Storage.** `localStorage` under `storageKey`, in try/catch: progress, endings found, settings. Bad or missing data is ignored. The page works when storage throws.

**Network.** None. No external scripts, styles, fonts or images. Fonts and art are inlined by the build.

## 5. Checks

| Run | Expect |
|-----|--------|
| `node stage/tools/validate.mjs stage/packs/<id>` | `OK <id>` |
| `node --test stage/engine/test.mjs` | `# fail 0` |
| `node stage/tools/sim.mjs stage/packs/<id>` | Every ending reached; no unreachable scene, beat or note |
| `node stage/tools/build.mjs stage/packs/<id>` for every pack, then `node stage/test.mjs` | `PASS` |

`test.mjs` checks, for every built pack: no network reference; the pack's forbidden-name list (the OSR pack uses `intro/test.mjs`'s list); every path played by keyboard to every ending; reduced motion leaves no running animation (`document.getAnimations()`); no horizontal scroll at 360 and 1280 px; works with `localStorage` throwing; no console errors; the Verify sheet's counts match `sim.mjs`; the commentary toggle hides the track; every ⓘ chip opens its note; light and dark both pass 4.5:1 for text (sampled from the computed tokens).
