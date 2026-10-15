# The Magic Module: notes

The OSR pack of the Stage. It plays the elf cleric's eight Fort Cards scenes as a pop-up module that runs the game for you and says which Dungeon Master job each part does. Contract: `stage/SPEC.md`. Guide: `stage/GUIDE.md`.

This file follows `GUIDE.md` section 2: the plan, then the checks, then one SET BRIEF per set.

## 1. Plan

### Character

The elf cleric of the Order of the Sacred Terminal, "The One Who Believes". Level 2, Autumn Pen holder, eleven years at a screen in an empty shrine.

### Plot

One frame scene and the eight Fort Cards scenes, in order. Registers are P = paint (witnessed) and I = ink (unwitnessed). Gates are the gate of each choice group.

| Scene | Fort Cards scene | Reg | Groups (gate) | Writes |
|-------|------------------|-----|---------------|--------|
| `s0` The Book Opens | (the module's own frame) | P | name (plan, typed) | Name |
| `s1` The Queen's Chamber | 1 | I | Lens 1 (plan); what the Terminal showed (plan); gave up (plan) | Lens; Year One; *you start knowing* (a reveal) |
| `s2` Autumn: The Pen | 2 | P | Lens 2 (plan); the Year Between A/B/C (plan); Year of Change (plan); the Pen line (plan, typed) | Lens; Autumn tag; Year of Change; Pen |
| `s3` Seven Nights at the Terminal | 3 | I | Night one (plan); Lens 3 (plan); night four (plan); night seven (plan); the last line (plan) | Lens; what the Terminal said; last line |
| `s4` Nine Breaths | 4 | I, then P or I | The act: bell or hood (**exec**, the first); the typed fact (plan) | Public or secret fact |
| `s5` The Two Keepers | 5 | P | Minister (plan); Lens 4: hymn / machine / both (plan); the yard's reaction (**exec**, a roll) | Year One; Lens; the yard's mood |
| `s6` Maren's Last Muster | 6 | P | Fort Office (plan); public fact if scene 4 was ink (plan, typed) | Fort Office; public fact |
| `s7` Cassandra's Question | 7 | I | The answer (**exec**); ask for a hint? (plan); the hint (**fate**, 1 Fate) | *Cassandra asked*; the hint |
| `s8` The Night Before the Road | 8 | I | Bond (plan); kit extra (plan); secret fact if scene 4 was paint (plan, typed); walk out (**exec**, three variants by the Lens tally) | Bond; Gear; secret fact; the card's Lens line; Cassandra's line |

Endings, routed by the Lens tally (the scene `route` reads the same counts that write the card's Lens line): `milestone-hymn`, `milestone-machine`, `milestone-both`. Each plays Cassandra's canon line for the cleric after "This time she does not begin with a question."

### The new perspective: the book is the Dungeon Master

The lineage is structure only: a programmed solo adventure of 1983 (a numbered paragraph for each choice; the paragraphs you skip stay shut), plus the B/X procedures that let paper decide (reaction, and a count kept in the margin). No name, text, map or character comes from any TSR or WotC product.

| DM's job | Paper mechanism | Where it first shows | Note |
|----------|-----------------|----------------------|------|
| Describes the scene | Read-aloud text | `s1`, the Queen's chamber | `dm-describes` |
| Frames the scene | The place line; the page turn | `s1`, first beat | `dm-frames` |
| Keeps secrets | The flap: a Referee Note | `s1`, Lens 1 lean-in | `dm-secrets` |
| Decides what happens | Numbered paragraph | `s0`, how the book works | `dm-decides` |
| Hides the result | Reveal ink | `s1`, *you start knowing*; the glass in `s3` | `dm-hides` |
| Rolls when it is uncertain | Volvelle, reaction roll | `s5`, the yard | `dm-rolls` |
| Keeps the books | Margin ticket, Fate | `s0` (Fate 3); `s7` (the spend) | `dm-books` |
| Asks "are you sure?" | The seal on an Execution choice | `s4`, Nine Breaths | `dm-sure` |
| Plays the people | Quoted lines | `s5` (the Minister); `s7` (Cassandra) | `dm-people` |
| Follows the players | Brush and lean in | `s0`; the lean-ins | `dm-follows` |
| Remembers | Flags | `s3` (the Year Between choice B) | `dm-remembers` |
| Writes it down | The Fort Card, the Fort's book | `s0`; `s2` tags; the endings | `dm-writes` |
| Asks you to say | Typed lines | `s4` | `dm-asks` |

Seven are the jobs in `PLAN.md`. Six are mine: the book also frames the scene, plays the people, follows the table, remembers, writes up and asks.

### What the commentary teaches, and where it first matters

| Scene | Teaches | Where |
|-------|---------|-------|
| `s0` | The seven jobs; paint and ink; the Lens; Fate; the Fort Card | Opening beats |
| `s1` | Planning (a chip); reveal ink (a chip, before the first reveal) | The last read-aloud beat; the beats before each reveal |
| `s2` | Year of Change; the Pen; the Fort's tags | Beats 1, 3 and each tag beat |
| `s4` | **Planning and Execution** (rule note `gate`, in the first Execution group's own `notes`; the lead-in beat carries no copy); public and secret facts | The Execution group's ask, right after the lead-in beat |
| `s5` | The reaction roll (rule note `reaction`, in the `yard` group's own `notes`; the lead-in beat carries no copy) | The `yard` group's ask, right after the lead-in beat |
| `s6` | Fort Office | The third muster beat |
| `s7` | Fate (rule note `fate`, in the beat before the hint) | The lead-in beat after Cassandra's reply |
| `s8` | Bond; the Old Road | Beats 2 and 3 |

### Canon pins kept

| Pin | How the pack keeps it |
|-----|-----------------------|
| The Terminal Glass table (`intro/SPEC.md`) | Every glass line is word for word, as a `screen`. Checked by script against `intro/index.html` (see section 2). |
| The Terminal never speaks as a mind | No glass line has *I*, a feeling, or *I see you*. The lore note says: "It prints; it does not speak." |
| Last line | `Light the first lamp before the second.` if Year Between choice B; `Vigil recorded. Seven of seven.` otherwise. |
| Cassandra asks, never tells | Her wall lines are questions. Her two hints are questions. |
| Cassandra at the milestone | The line is `P.cassandra` from `intro/index.html`. It follows "This time she does not begin with a question." |
| Year of Change | The three cleric options, marked "(Proposed; the DM confirms.)" on the card. |
| Typed facts | Scene 4 asks for the public fact if the player rang the bell, and the secret fact if the player hooded the screen. Scene 6 asks for the public fact if the player hooded the screen. Scene 8 asks for the secret fact if the player rang the bell. Every path ends with both facts written. |
| Lens | Four moments, as in Fort Cards. The fourth offers *both*, and a *both* pick adds one to each tally value. The card line is Hymn if no reading was machine, Machine if no reading was hymn, Both otherwise: the same rule as all four hymn, all four machine, else both. The book writes the line when it reads the Lens at the last step (`go`). |
| The Gorgon Queen | A cockatrice chick's cry paralysed her (`biddy` note). She is never said to be turned to stone. |
| Biddy | A cockatrice; Wick keeps her; the Glamourist holds her chick in scene 1. |
| Pen | The cleric holds it in Autumn. |

### What the pack made up

| Item | Why |
|------|-----|
| Scene `s0`, the book's own frame, and the **name** input | The book introduces itself as the one running the game. The Fort Card has a name. |
| The reaction roll in `s5`, and the card field `yard` | The pack must do the "rolls when uncertain" job once. A reaction roll fits a scene the whole yard watches. It changes no Fort Cards fact. `s6` echoes the result in one line. The DM may drop the field. |
| Cassandra's two hints in `s7` (the voice that answers; the road before dawn), and the field `hint` | The Fate gate needs something to buy. Both hints are questions, as her hints are. They explain nothing. |
| Two echo lines in the endings (one for each hint) | The Fate point should leave a mark. |
| Four lean-in Referee Notes (`s1`, `s2`, `s3`, `s5`) | The Brush needs a *lean in* depth behind each machine reading. See the Brush table below. |
| The bridge beats before each glass line | The player acts, then the glass answers. The bridge is the act. |
| The Execution lead-in beat in `s4`, the Fate lead-in beat in `s7` | To teach each rule the first time it matters. |
| Ending titles `The Milestone: Hymn / Machine / Both` | So the Verify sheet tells the endings apart. |
| Fate starts at 3, max 6 | `campaign/SPINE.md` pins Fate at 3 and Fort Cards uses 3. The hint costs 1, so the player ends with 2 or 3. |

## 2. Checks, as run

Run from the repository root.

```
node stage/tools/validate.mjs stage/packs/magic-module
node stage/tools/sim.mjs stage/packs/magic-module
```

Result when this file was written:

```
OK magic-module
magic-module (paper, ose) · 612,220,032 paths · 8459 states
endings
  milestone-hymn        25,509,168
  milestone-machine     25,509,168
  milestone-both       561,201,696
routes: 216 distinct end states
locked options seen: none
unreachable: none
```

The pack was also replayed on all 216 routes (`Stage.replay` with the route objects). On every route: the game reaches the ending the route names; the ending matches the card's Lens line; the `lens` field is Hymn if no reading was machine, Machine if no reading was hymn, Both otherwise (checked against the tally counts); both facts are written; Fate is 2 if a hint was bought and 3 if not. A second check walks all 24 combinations of Lens picks (three readings, then the fourth as hymn, machine or both) and confirms each ends at the right milestone.

Canon text was compared with `intro/index.html` (cleric scenes, lines 337-470, and `MUSTER`): 168 of 168 option labels, consequence lines, group questions, glass lines, paragraphs, coda lines and road-end lines appear word for word in `script.json`. This count covers more than the first pass (134), which did not include the group questions.

## 3. The Brush

Every machine element is at *brush* depth in the main text. *Lean in* depth sits in a reveal flap that appears only when the Lens tally leads machine (`{ all: [ top machine, not top hymn ] }`). The player must also lift the flap. Nothing glows or pulses.

| Where | Brush (always) | Lean in (flap, when machine leads) | Reward |
|-------|----------------|------------------------------------|--------|
| `s1` the carved eyes | "Glass and wire that see heat, and send what they see somewhere else." | A ward and a sensor are one thing from two sides. Each eye holds a disc of dark glass. A cold wire runs into the stone. | You will know this make again, on any door. |
| `s2` the stone | "A signal. The stone answered the screen, the way one bell answers another." | A signal can be tested. Carry the stone to old things and note where it warms. | A way to measure. |
| `s3` the blinking mark | "A cursor. The screen is waiting for input." | A cursor marks where the next input goes. It waits for keys, not breath. | Permission to use the keys. |
| `s5` the hymns | "Protocol: the rules by which one station speaks to another." | A protocol is rules for who goes first, who answers, what counts as a reply. You have not yet tested one. | An invitation, no answer. |

The lean-ins do not explain the canon glass lines, the station list, the year or the hum. They say how to look, not what is there.

## 4. IP checklist, line by line

| Check | Answer |
|-------|--------|
| Structure only, no expression, from the 1977 Basic sample dungeon and B2? | Yes. This pack has no dungeon. Its structure borrows two ideas: a programmed solo adventure (numbered paragraphs) and the B/X reaction roll. It uses no name, text, map, room key, NPC or read-aloud from any TSR or WotC book. |
| The "Dungeon Master" term? | A generic term of the hobby, used throughout the repository. |
| Forbidden names (the generator's FORBIDDEN list, the capitalised word *Keep*, and the player-facing four from `intro/test.mjs`)? | No hits. Command and result below. The capitalised verb "Keep" was removed from the text. |
| Halcyon: named, never keyed? | Not named. Not keyed. The pack says only "the door beneath the lake", which is canon Fort Cards text. |
| The Sleeper never appears in anything a player reads? | It does not appear anywhere in the pack. |
| Lintel? | Does not appear. |
| The Terminal never speaks as a mind? | Yes. Glass lines are the canon table, word for word. None has *I*, a feeling or *I see you*. Two canon narration lines (Fort Cards) say the Terminal "knew who you were" and "had been waiting for you". They are narration, kept as written. |
| The Gorgon Queen was paralysed by a cockatrice chick's cry, not "turned to stone"? | Yes. The `biddy` note says "paralysed". The phrase "turned to stone" is absent. |
| The cockatrice is Biddy; Wick keeps her? | Yes (`biddy`, `wick`; scene 6 puts her in the Beast Pen). |
| ASSUMED canon written so a DM can replace it? | The pack assumes the Queen's wards are dark ("a disc of dark glass") and that Wick keeps Biddy. Both are in a flap or a lore note, not in a rule. |
| The gate: Planning and Execution, taught the first time it matters? | Yes. The words are Planning and Execution. Rule note `gate` sits on a beat of `s4` and on the group. |
| The Brush: machine at brush unless the player asks? | Yes. See section 3. |
| Science fantasy named plainly? | Yes. A ward is a sensor eye (`s1` flap). A hymn is a protocol (`s5`, canon, and its flap). |
| Puzzles | None. The one hint is Cassandra's, bought with Fate, and it asks. |
| Art: Elmore for characters and hero scenes, Otus for interiors, machines, maps and handouts? | Named in each SET BRIEF below. This pack has no map. |
| Storage key starts `fort-stage.`? | `fort-stage.magic-module`. |
| No network reference? | None in the five JSON files (grep below). |
| The user's Year Two guides, family details or mail? | None used. |

Forbidden-name grep. It covers the five data files, which are what a player reads. This file names the forbidden words only to answer the checklist:

```
cd stage/packs/magic-module
grep -n -iE 'Sleep[e]r|Lint[e]l|Halcy[o]n|turned to ston[e]|Zen[o]pus|Portow[n]|Thalagra[m]|Lemund[a]|Borderland[s]|Chao[s]|medus[a]|Castella[n]|Hermi[t]|Bree-?yar[k]|B\.I\.A' pack.json script.json notes.json theme.json sets.json
grep -n -E '\bKee[p]\b' pack.json script.json notes.json theme.json sets.json
grep -n -iE 'https?:|<script|<link' pack.json script.json notes.json theme.json sets.json
```

Result: no output from any of the three.

## 5. Decisions the lead should know

| Topic | What I did | Why |
|-------|-----------|-----|
| The Lens summary and the endings | The Lens tally decides. Each reading adds to `hymn` or `machine`; a *both* pick adds to both. At the last step (`go`) three variants of the same option show, one by the tally (`machine` count 0, `hymn` count 0, or both counts 1 or more). Each writes the card's `lens` line, and the scene `route` reads the same counts. | The tally-count condition (`{ tally, value, gte|lte }`) can say "none". That removes the flags `read_h` and `read_m` and the five-option Lens 4 (`h1`, `h2`, `m1`, `m2`, `b`): the fourth moment has three plain options again, as in Fort Cards. The cost is that the card's Lens line stays blank until the last page; the card's text copy shows the tally counts under *Readings* before that. |
| Nine Breaths | The two options carry `then` beats with `look: paint` and `look: ink`. | `SPEC.md` section 2: a beat's `look` overrides the scene's for that beat. The bell branch fires `bloom` (the page changes from ink to paint). The hood branch stays ink, and the engine fires no `ink` cue because the look did not change. See section 8. |
| Typed text | No condition reads a typed field. The register choice is a flag (`witnessed`, `unwitnessed`). | `GUIDE.md` section 7. |
| A group with no visible option | Used on purpose: `fact6` and `secret8` are skipped when their option is hidden. | The engine skips a group with no visible option. |
| Group `notes` and `comment` | Set on the Execution and Fate groups. Where a beat repeated the same note and comment right before its group (the `s4` lead-in, the `s5` lead-in), the beat copy is gone. The Fate lead-in beat in `s7` stays: it comes before a Plan choice (ask for a hint?), not before the Fate group. | The engine now reads group notes and comments for reachability and the Notes sheet. The first Execution group carries the `gate` rule note in its own `notes`, as `validate` requires. |
| Speakers | None. Cassandra and the Minister are named in a `kicker` or in the text. | The pack has no `cast.json`. A `speaker` with no cast entry is a warning until a `cast.json` exists, then an error. |
| Theme | Blueline's `paper` values as `light`, its `lamp` values as `dark`, under Blueline's token names (kept). Alegreya families as `font-serif`, `font-caps`, `font-sans`, and as the shell's `font-body`, `font-display`, `font-ui`. Aliases for the names the fixture packs use: `bg`, `panel`, `card`, `line`, `ink-soft`, `muted`. New for the shell: `accent`, `on-accent`, `lamp`, `good`, `bad`. `fonts: []`. | `SPEC.md` section 2; `validate` checks every token in the header of `ui/style.css`. No Blueline value passes 4.5:1 as text for `accent`, `good` or `bad` on all three grounds, so these are chosen: `accent` is Blueline's blue, darkened in light (#2a679c) and Blueline's own in dark; `good` is a green; `bad` is Blueline's red in light and a lighter red in dark. Every text token (`ink`, `ink-soft`, `muted`, `accent`, `lamp`, `good`, `bad`) passes 4.5:1 on `bg`, `panel` and `card` in both themes; `on-accent` on `accent` is 5.71 (light) and 7.57 (dark). |

## 6. Cues, in short

The pack names no motion. The engine picks every cue from the data.

| Cue | Fired by this pack |
|-----|--------------------|
| `turn` | Each scene change, and the jump from a scene to an ending. |
| `shift` | The `glass` close-up in `s3` and back to `terminal`. |
| `ink` | Entering an ink scene; a beat whose look changes to ink; every reveal beat. Not every beat. |
| `bloom` | Entering a paint scene; the endings; the first `look: paint` beat in `s4` (the bell branch). |
| `seal` | `reg`, `yard`, `cassq`, `hint`, `go`. |
| `roll` | `yard` (2d6, 7 or more). |
| `cost` and `tear` | `hint`: Fate 3 to 2. |
| `tally` | Every Lens pick. |
| `close` | The three endings. |

## 7. SET BRIEFS

Eleven sets. `sets.json` holds a skeleton: every id, each with one `spread` layer and no art. The paper-kit agent replaces each with the layers below. Positions are fractions of the stage. Colours come from theme tokens only. Otus ink is black on cream (`ink`, `paper`, `tint-1`, `rule`); in the Blueline map style the same strokes use `blueline`. Elmore paint uses a warm wash with `plate-gold` and `plate-umber` and the grey of the lake stone.

The Lens pull-tab is a `pulltab` layer with `"tally": "lens"` and `"value": "machine"`: the hymn reading is the front layer (`art`) and the machine reading slides out from behind it (`under`). It does not glow, pulse or blink. A tab stub shows at the edge so a reader can find it.

The Referee Note is a `flap` layer with `"opensOn": "reveal"`: `art` is a sealed paper tag reading REFEREE NOTE; `under` is a small ink drawing of the note's subject.

```
SET BRIEF: cover
Scenes and beats that use it: s0 (all beats)
Look: paint        Art style: Elmore (a painted cover plate)
Layers, back to front:
  1. spread   art: the cream double-page ground with a plate-gold hairline border   moves on: turn, bloom
  2. plate    art: the cover painting: an open book standing on a lake shore at dusk, one lit lamp beside it, a grey stone on the left page   moves on: bloom (the warm wash)
  3. vfold    art: the book's spine and title band, THE MAGIC MODULE in caps (font-caps), plate-umber, rising from the gutter   moves on: turn
Cues this set must answer: bloom, turn        Bound state for update(): none
What the player must read in the end state: a painted book and its title.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 60 KB; at most 2 layers move at once
```

```
SET BRIEF: chamber
Scenes and beats that use it: s1 (all beats, and the options' then beats)
Look: ink        Art style: Otus (ink, hatching, heavy double rules)
Layers, back to front:
  1. spread     art: cream ground with a hatched band along the foot   moves on: turn, ink
  2. vfold      art: a ring of seven carved eyes, every eye open, each with a round disc, rising from the gutter   moves on: turn, ink
  3. parallel   art: low platform: the Glamourist's cupped hands holding a small grey chick (Biddy)   moves on: turn
  4. pulltab    art: a ward-glyph ring round one eye (the hymn reading); under: the same eye as a dark glass disc with a wire running down into the floor (the machine reading); x 0.5, y 0.8, w 0.5   moves on: tally
  5. flap       art: a sealed tag REFEREE NOTE; under: a slip showing the cold wire leaving the stone floor   moves on: ink (reveal)
Cues this set must answer: ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 4)
What the player must read in the end state: eyes, the chick, and the tab stub; with the flap shut the wire is not visible.
Palette and tokens: paper, ink, tint-1, tint-2, rule (blueline in the map style)
Budget: 80 KB; at most 3 layers move at once
```

```
SET BRIEF: pen-autumn
Scenes and beats that use it: s2 (all beats, and the options' then beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: warm ground, a soft wash of harvest gold   moves on: turn, bloom
  2. parallel   art: the yard at harvest: long tables, sacks, hanging lamps, no faces   moves on: turn
  3. vfold      art: the Shrine door open on the Terminal, a pane of glass in carved stone, pale hymn lines climbing it   moves on: turn, bloom
  4. plate      art: the lake stone on clean linen, grey, smooth, painted, in the foreground   moves on: bloom
  5. pulltab    art: a small bell glyph (the hymn reading, "a blessing"); under: two rings, one answering the other (the machine reading, "a signal"); x 0.8, y 0.82, w 0.2   moves on: tally
  6. flap       art: a sealed tag REFEREE NOTE; under: a small ink drawing of the stone held to old stone   moves on: ink (reveal)
Cues this set must answer: bloom, ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 5)
What the player must read in the end state: harvest, the Shrine door, and the grey stone.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 120 KB; at most 3 layers move at once
```

```
SET BRIEF: terminal
Scenes and beats that use it: s3 (the opening beats; each night's bridge beat returns here)
Look: ink        Art style: Otus
Layers, back to front:
  1. tunnel     art: four planes: the Shrine's stone arch; the plinth; the carved frame of the glass; the worn keys in the foreground   moves on: drift, tilt
  2. vfold      art: the Terminal itself: a pane of glass in a frame of carved stone, the glass empty, with a few pale hymn lines   moves on: turn, ink
Cues this set must answer: ink, shift        Bound state for update(): none
What the player must read in the end state: a cold shrine, a plinth, a pane of glass, keys worn hollow.
Palette and tokens: paper, ink, ink-2, tint-1, tint-2, rule
Budget: 90 KB; at most 2 layers move at once
```

```
SET BRIEF: glass
Scenes and beats that use it: s3 (every night's glass beat, the last-line beat, the Lens 3 options and their flap)
Look: ink        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground   moves on: shift
  2. plate      art: close on the glass: the carved stone frame (ink, hatched) round a clear panel at x 0.5, y 0.42, w 0.78. Leave the panel empty: the kit prints the beat's `screen` lines there   moves on: shift, ink
  3. pulltab    art: a curled line like a held breath (the hymn reading); under: a solid block cursor (the machine reading); x 0.84, y 0.78, w 0.14   moves on: tally
  4. flap       art: a sealed tag REFEREE NOTE; under: a small drawing of a worn key   moves on: ink (reveal)
Cues this set must answer: shift, ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 3)
What the player must read in the end state: the glass panel, with the glass lines on it in the kit's screen face. The glass lines must be readable at 360 px: at most five lines, each 30 characters or fewer.
Palette and tokens: paper, ink, tint-1, rule
Budget: 50 KB; at most 2 layers move at once
```

```
SET BRIEF: breaths
Scenes and beats that use it: s4 (all beats; the options' then beats)
Look: ink        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground, a heavy double rule across the foot   moves on: turn, ink
  2. tunnel     art: the Shrine before dawn in four planes: stone arch; the plinth; the Terminal with its glass blank (no lines at all); the door ajar at the back with a slit of lamplight and Wick's shape holding a lamp-pole   moves on: drift, tilt
  3. plate      art: nine small tally strokes in a row along the gutter, for the nine breaths. Static   moves on: ink
Cues this set must answer: ink, seal        Bound state for update(): none
What the player must read in the end state: a blank glass, and a small figure at the door.
Palette and tokens: paper, ink, ink-2, tint-2, rule
Budget: 70 KB; at most 2 layers move at once
```

```
SET BRIEF: plinth
Scenes and beats that use it: s5 (all beats; the options' then beats; the roll)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: warm grey ground   moves on: turn, bloom
  2. parallel   art: the Shrine floor and the open door, with the yard beyond and a few folk slowing at the door (flat cut-out figures, no faces)   moves on: turn
  3. vfold      art: the Terminal on its plinth at the centre; the Minister on the left with her palm on the plinth; the elf cleric on the right with the lake stone in hand. Painted   moves on: turn, bloom
  4. volvelle   art: the reaction wheel: the faces 2 to 12 round the rim, the left half marked COOL, the right half WARM, the join at 7, with a pointer; x 0.5, y 0.84, w 0.3   moves on: roll (turns to the total)
  5. pulltab    art: a small word-strip PRAYER (the hymn reading); under: the word-strip PROTOCOL (the machine reading); x 0.14, y 0.84, w 0.22   moves on: tally
  6. flap       art: a sealed tag REFEREE NOTE; under: a small drawing of two stations joined by a line   moves on: ink (reveal)
Cues this set must answer: bloom, roll, ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 5); the wheel's last total, if the engine gives it
What the player must read in the end state: two keepers and one screen; a wheel with a pointer on the result.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 140 KB; at most 3 layers move at once
```

```
SET BRIEF: muster
Scenes and beats that use it: s6 (all beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: warm ground   moves on: turn, bloom
  2. parallel   art: the yard floor, rows of folk seen from behind, the Gate behind them   moves on: turn
  3. vfold      art: Captain Maren at the centre holding a slate that reads WARDEN, SCOUT, STEWARD, LOREKEEPER; the Paladin at the Gate; the Minister at Maren's left hand   moves on: turn, bloom
  4. plate      art: the Beast Pen, lower right, a small cockatrice watching with one cold eye. Painted. No stone, no paralysis   moves on: bloom
Cues this set must answer: bloom        Bound state for update(): none
What the player must read in the end state: Maren with the slate, and the four office names.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 120 KB; at most 2 layers move at once
```

```
SET BRIEF: wall
Scenes and beats that use it: s7 (all beats; the options' then beats)
Look: ink        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground with a hatched night band along the top   moves on: turn, ink
  2. tunnel     art: the wall-walk running back in four planes, three of Wick's lamps lit along the parapet   moves on: drift, tilt
  3. vfold      art: Cassandra in her grey wrap, seated on the wall between the third lamp and the fourth, feet hanging over the dark   moves on: turn, ink
  4. ticket     art: the Fate ticket, top right: a paper stub reading FATE with six boxes, three of them punched, a perforation across the middle; x 0.86, y 0.14, w 0.18   moves on: tear
Cues this set must answer: ink, seal, tear, cost        Bound state for update(): the Fate meter (three of six boxes punched; one more box tears away when a point is spent)
What the player must read in the end state: Cassandra on the wall at night; a Fate ticket with three punched boxes, or two after a hint.
Palette and tokens: paper, ink, ink-2, tint-1, tint-2, rule
Budget: 100 KB; at most 3 layers move at once
```

```
SET BRIEF: road-pack
Scenes and beats that use it: s8 (all beats; the options' then beats)
Look: ink        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground   moves on: turn, ink
  2. vfold      art: the Terminal in the dark at the back, hymn lines scrolling up the glass (static lines)   moves on: turn, ink
  3. parallel   art: the stone floor with the kit laid out in a row: robes, a shield carved with glyphs, a mace, the hymnal, the cracked screen fragment, the lake stone   moves on: turn
Cues this set must answer: ink, seal        Bound state for update(): none
What the player must read in the end state: six things laid out in a row on stone.
Palette and tokens: paper, ink, ink-2, tint-1, rule
Budget: 70 KB; at most 2 layers move at once
```

```
SET BRIEF: milestone
Scenes and beats that use it: the three endings (all beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: pale dawn ground   moves on: bloom, close
  2. tunnel     art: the Old Road receding in mist, five planes: sky greying; the Fields; the new well far off; the road; low mist   moves on: drift, tilt
  3. vfold      art: the milestone in the foreground, cut with numbers nobody can read, three short arcs beside it for the hum. Static end state   moves on: bloom
  4. plate      art: Cassandra, wrapped in grey, standing at the stone. Painted   moves on: bloom
Cues this set must answer: bloom, close        Bound state for update(): none
What the player must read in the end state: a milestone at dawn, and a figure in grey waiting.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 140 KB; at most 2 layers move at once
```

## 8. Open questions for the lead

1. Fate starts at 3 of 6 (settled: SPINE pins 3).
2. Beat `look` works: in Nine Breaths the bell branch fires `bloom`. The hood branch stays ink and fires no `ink` cue, because under the cue rule (ink and bloom fire when the look changes) nothing changed. The `seal` is the only motion there. The pack plays correctly; the lead may want the hood branch to read as its own moment.
3. The pull-tab layer keys (`tally`, `value`, `under`) follow the fixture `packs/test/sets.json`. The paper-kit agent should confirm them.
4. `side` on the card fields is `front` or `back`. I put the seven fields a DM reads first on the front.
