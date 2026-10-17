# The Spring Turn: notes

The OSR pack of the Stage for the gnome druid. It plays her five Fort Cards scenes, with a full Fort Turn between the second and the third, and the Fort is a character: the HUD is the Fort's sheet. Contract: `stage/SPEC.md`. Guide: `stage/GUIDE.md`. Written 2026-10-16 (wave 5).

This file follows `GUIDE.md` section 2: the plan, then the checks, then one SET BRIEF per set.

## 1. Plan

### Character

The gnome druid, "The One Who Listens". Level 2, Spring Pen holder. Her Fate ability is *The Land Speaks*; her lane is natural places and what the earth, water, roots and animals know.

### Plot

One frame scene and the five Fort Cards scenes, with the Fort Turn (new) after the Pen. Registers are P = paint (witnessed) and I = ink (unwitnessed). Gates are the gate of each choice group.

| Scene | Fort Cards scene | Reg | Groups (gate) | Writes |
|-------|------------------|-----|---------------|--------|
| `s0` The Book Opens | (the book's own frame) | P | name (plan, typed) | Name |
| `s1` The Nesting Hall | 1 | I | Lens 1: spirit / engine (plan); the land tells you (plan); came because (plan) | Lens; Year One; *You start knowing* (a reveal) |
| `s2` Spring: The Pen | 2 | P | the Year Between A/B/C (plan); Year of Change (plan); the Small Friend animal (plan); level-2 spell (plan); the Pen line (plan, typed) | Spring tag; Year of Change; spell; Pen |
| `s3` The Fort Turn | (new) | P | propose (plan); pick two (**exec**, the first); one resolution group for each Directive (exec); Strain (plan); Fate ask (plan); Fate fact (**fate**, typed); the Event (**exec**, 1d12 table roll); follow-ups raid / bargain / sing (exec); Oath (plan); Refresh (plan); ledger line (plan, typed) | Meters; the Directives; Strain; the Fate fact; the Event; Oath; ledger |
| `s4` The Singing Well | 3 | P, then P or I | Lens 2: woken spring / old pipe (plan); the act: answer before everyone or climb down alone (**exec**); the typed fact (plan) | Lens; public or secret fact |
| `s5` Maren's Last Muster | 4 | P | The Terminal is: tool / wound / conversation (plan); Fort Office (plan); public fact if scene 3 was ink (plan, typed) | Year One; Fort Office; public fact |
| `s6` The Night Before the Road | 5 | I | Bond (plan); kit extra (plan); secret fact if scene 3 was paint (plan, typed); walk out (**exec**, three variants by the Lens tally) | Bond; Gear; secret fact; the card's Lens line; Cassandra's line |

Endings, routed by the Lens tally (the scene `route` reads the same counts that write the card's Lens line): `milestone-hymn`, `milestone-machine`, `milestone-both`. Each plays the shared road text from `intro/index.html` and Cassandra's druid line, word for word.

Every Fort Cards choice of the druid is offered, with the same labels and consequence lines, and every card field is filled. The typed facts route as Fort Cards routes them: scene 3 (here `s4`) types the public fact if the player answered the note before everyone and the secret fact if the player climbed down alone; the Muster types the public fact if scene 3 was ink; the Night Before the Road types the secret fact if scene 3 was paint.

### The new perspective: the Fort is a character too

The HUD is the Fort's sheet: Stores, Walls, Folk and Lamp (start 4, 3, 4, 2), with Fate beside them. The druid holds the Pen in Spring, so she runs one Fort Turn step by step, as `campaign/SPINE.md` gives it (*The Fort Turn, step by step*). The Fort speaks through Maren and the Minister at the Report, acts through the Directives, and is written down in the ledger. Her Lens (a spirit or an engine, a woken spring or an old pipe) decides how the land answers her, and the machine reading stays at brush depth.

The book says once, in `s0`, that the table's own Fort may stand at other numbers: it plays one Spring from the start values to teach the turn.

### The Fort Turn, step by step

| Step | Gate | What it writes | Which note teaches it |
|------|------|----------------|-----------------------|
| Frame: the sheet and the tracks | none | nothing | `fort-sheet`, `dm-sheet` (`s0`); `tracks` (first Report line) |
| 1 Season card | none (read) | nothing | `season`, `dm-season` (`s2`); recapped in `s3` |
| 2 Report | Planning (beats, no group) | nothing | `planning`, `dm-report`, `tracks`, `size`; `dm-remembers` on the tag beat. The tag beat names the tag only ("Surplus: barley."); `surplus`, `want` and `oath` sit on the Year Between group in `s2`, where the tag is chosen |
| 3 Directives: propose | plan (`propose`) | working field `w_dirs` | `directives`, `dm-propose`; `trade` and `tend` in the group's own `notes` |
| 3 Directives: the table picks two | **exec** (`pick`, the first exec group) | `w_dirs` | `gate` (in the group's own `notes`), `dm-resolve` |
| 3 Build | exec (`build`) | `dir_mine` (a 4-segment project, segment 1) | `build` |
| 3 Defend | exec (`defend`) | Walls +1, or Walls +2 and Stores −1 | `defend` |
| 3 Trade | exec (`trade`, a 1d6 table roll) | Stores −1, +1, or +2 (the Surplus adds +1 first) | `trade` (on the propose group). The option's `sub` shows the whole table before the roll |
| 3 Explore | exec (`explore`) | `dir_explore` (one fact for the hex) | `explore` |
| 3 Tend | exec (`tend`) | Lamp +1; one Terminal line | `tend` (on the propose group) |
| 3 Strain | plan (`strain`) | `strain`, if Want: salt and no Trade went out | `want` (on the Year Between group) |
| 4 Fate | plan (`fate_ask`), then **fate** (`fate`, cost 1, typed) | Fate −1; `fatefact` | `fate-fact`, `dm-fate` |
| 5 Event | **exec** (`event`, a 1d12 table roll); follow-ups exec | meters; `event` | `event`, `dm-event`; the lead-in beat after "Roll the Event" lists what the d12 can bring and carries `walls-test`, `mile-house` and `harrow` |
| 5 Oath | plan (`oath`) | `oath` ("Called in, Spring.") | `oath` (on the Year Between group) |
| 6 Refresh | plan (`refresh`), then the ledger line (plan, typed) | Fate back to 3; Stores +1 with Green Hand; `ledger` | `refresh`, `dm-refresh` |

### What the commentary teaches, and where it first matters

| Scene | Teaches | Where |
|-------|---------|-------|
| `s0` | The sheet; paint and ink; the Lens; Fate; the Fort Card; Planning (a chip, in the last beat, before the name) | Opening beats |
| `s1` | The Land Speaks; reveal ink (a chip, before the first reveal); the Lens; the Terminal | The beat before each reveal; the Lens group's `notes`; the origin group's `notes` (`terminal`) |
| `s2` | The Pen; the season card; tags; Surplus, Want and Oath; Year of Change; the level-2 spell | Beats 1 and 4; the group `notes` (the Year Between group carries `surplus`, `want`, `oath`) |
| `s3` | Tracks and what 0 and 6 mean (a track stops at 6); Size (Hamlet at 4); each Directive's effect; Strain; the Fate fact; the Event and the Walls test; Refresh; **Planning and Execution** (rule note `gate`, in the first Execution group's own `notes`; the lead-in beat carries no copy) | Report lines; the propose group and the Build, Defend and Explore groups' `notes`; `fate_ask`; the Event lead-in beat; `refresh` |
| `s4` | Public and secret facts | The beat after the register pick |
| `s5` | Fort Office; Maren and the Minister | The office group; the second muster beat |
| `s6` | Bonds; the Old Road | Beats 2 and 3 |

### Canon pins kept

| Pin | How the pack keeps it |
|-----|-----------------------|
| The Fort Turn, step by step (`campaign/SPINE.md`) | Six steps in order; start values 4, 3, 4, 2; Size by Folk; each Directive's effect as written; the Event row in the guide's order (1 raid, 2 sickness, 3 a quarrel, 4 a form, 5 a stranger, 6 a new Terminal line, 7 Harrow early, 8 a find in the reeds, 9 a good catch for Stores +1, 10 a hard case for the Paladin, 11 the Glamourist's bargain, 12 the lake sings). |
| The Year Between: the Pen's choices | Names and tags only: A. The Long Field (Surplus: barley), B. The Broken Docks (Want: salt), C. The First Moot (Oath: Cassandra). No seed is written. |
| Year of Change | Green Hand, Lake-Speaker, Small Friend (then a stoat, a crow or a toad), each marked "(Proposed; the DM confirms.)". |
| Fort Cards text | 121 of 121 option labels, consequence lines, group questions, scene paragraphs, `y1` and `know` lines, office and bond lines appear word for word (checked by script against `intro/index.html`; the five other strings are group names, era tags, and one line the pack leaves out, see section 5). |
| Cassandra | Her druid line is `P.cassandra`, word for word, in the card field and in all three endings, after the shared road paragraphs. Her Oath is called in as "Called in, Spring." She asks one question and the table writes it; the pack writes no question. |
| The Terminal never speaks as a mind | The two glass screens are machine output: `New line. / Unread: 1.` and `Lamp: tended. / Filed.` No *I*, no feeling. The one canon narration line ("You do not think the Terminal knows you can hear it") is Fort Cards text and is kept as written; the spine records the rule (*The Terminal's voice*). |
| Gorgon Queen, Biddy | The `biddy` note: a cockatrice chick's cry paralysed her. Biddy is the cockatrice. Wick keeps her. |
| The Pen | The druid holds it in Spring. |
| Fate | Starts at 3 (the spine's pin), maximum 6. One point buys the Fate fact. Refresh returns it to 3. |
| Typed facts | Both facts are written on every route (checked on 30,000 random walks and on the simulated routes). |
| Lens | Two moments, as in Fort Cards. The card line is Hymn if both readings are hymn, Machine if both are machine, Both otherwise. The scene `route` reads the same counts. |

### What the pack made up

| Item | Why |
|------|-----|
| Scene `s0`, the book's frame, and the **name** input | The Fort Card has a name. The book introduces the sheet. |
| The whole of `s3`, as a scene | `campaign/SPINE.md` gives the steps; the pack gives each one a page. It sits in the Pen's Spring, after the Year Between choices and the Year of Change, so Green Hand is already in play. Fort Cards puts the change "by midsummer"; the pack leaves that line out. |
| The thief's and the cleric's proposals: Explore and Tend | The brief asks for plausible proposals, and the book says they are the book's choice (`dm-propose`). The druid's own proposal is Build, Defend or Trade, so no two proposals match. The table picks two of the three: seven pick options, three visible at a time. |
| The four Build projects, and one segment filled now | The spine lists a well, a tower, a boat and a smithy. A turn fills one segment (the `build` note says so). In `s4` the diggers hurried the rest of the well in the same Spring, so the well in the endings is the one she began. |
| The three Explore facts | Each opens with the hex's pinned line from the spine's Fort Country rows (the Reed Shore: stilt huts, and the Quiet live there; the Standing Stones: nine stones, one fallen, kingfishers and stars carved; the Weirs: old stone fish traps, someone has re-set the stakes). Then one brush-depth detail: reeds in straight rows; one smooth face on each stone, turned south; a dry channel with the fish crowded at both ends. The lowered encounter risk is stated in the text, not tracked. |
| What meets a Want | A Trade cart meets Want: salt. The guide leaves this open; the `want` note says the DM decides. Strain is marked at 1 of 3 and is not tracked further. |
| Which rumour | Trade 5 or 6: boatmen say the water at the Weirs has not moved in weeks. It echoes Cassandra's line and points at the dry place. The text says the table decides what else the carter heard. |
| Event effects | Raid: a Walls test as the spine has it. A raid succeeds only at Walls 0. At Walls 1 or more the palisade holds, and the table may still play the fight. Walls cannot fall to 0 in this one turn, so the group has one option, "the palisade holds"; the Walls 0 result is in the note, the group's ask and the sub (a second option would be unreachable, and `sim` would fail). Sickness Folk −1. A stranger Folk +1. Harrow early Stores +1. A good catch Stores +1 (spine). The Glamourist's bargain: take it for Walls +2 and Stores −1, or refuse. The lake sings: Lamp +1 or Folk −1, the player's choice (spine; the pack frames Folk −1 as a family leaving when the Fort shutters itself). The other five are prompts with no track change, and each says the table decides. |
| The Oath call-in | The spine says an Oath is called in once. Cassandra asks one question and the table writes it; the pack does not write her question. The card's Oath field reads "Called in, Spring." The `oath` note says the DM decides what an Oath buys. |
| The Fate fact options | One for each Directive, each with its own prompt. |
| Four Referee Note lean-ins | The Brush needs a lean-in depth behind each machine reading (section 3). |
| The two glass screens | The spine says "one new line"; the pack writes two short outputs. |
| `spring` on the card | Fort Cards gives the Year Between choice to the cleric only. The brief asks for it here, so the druid's card carries *Spring, the Year Between* (choice, then tag). |
| Card fields `size`, `dir_mine`, `dir_explore`, `dir_tend`, `strain`, `fatefact`, `event`, `oath`, `ledger` | The Fort's sheet and the turn's record. `size` starts at "Hamlet (Folk 4)" and changes with the Event. |
| The ledger line, typed | "One line in the Fort ledger" is a line the player writes. |
| Ending echoes | One short line for each Lens, and one for the well if the player began it. |
| Four working fields (`w_tag`, `w_change`, `w_dirs`, `w_tmp`) | See section 5. They are `hidden`: the card and its text never show them. They are cleared at the ledger step. |
| Ending titles `The Milestone: Hymn / Machine / Both` | So the Verify sheet tells the endings apart. |

## 2. Checks, as run

Run from the repository root.

```
node stage/tools/validate.mjs stage/packs/spring-turn
node stage/tools/sim.mjs stage/packs/spring-turn
```

Result when this file was written:

```
OK spring-turn
spring-turn (paper, ose) · 1,881,169,920 paths · 32367 states
endings
  milestone-hymn       470,292,480
  milestone-machine    470,292,480
  milestone-both       940,584,960
routes: 54 distinct end states
locked options seen: none
unreachable: none
```

`node --test stage/engine/test.mjs` reports `# fail 0`.

Further checks, all passed (scripts in a scratch folder, not in the repository):

- All simulated routes (36 when this note was first written; 54 after the wave-5 fixes) were replayed with `Stage.replay`. On every route: the game reaches the ending the route names; the ending matches the card's Lens line; the card fields (name, Lens, Year of Change, spell, Fort Office, bond, kit extra, both facts, Year One, *You start knowing*, both Lens readings, Spring tag, Pen, ledger, Cassandra) are filled; Fate is 3.
- 30,000 random walks with seeded dice: every one reached an ending. Each of the twelve Events came up about 2,500 times. Fate ended at 3 every time. No meter left 0 to 6. The working fields were empty at every ending. Cassandra's field equalled the canon line every time.
- Canon text was compared with `intro/index.html` (the druid's scenes, `MUSTER`, `ROADEND`, `ASK`): 121 of 126 quoted strings appear word for word. The five misses are three group names, one era tag and the line "By midsummer, when you gave the Pen to the thief, you were changed."

A browser build to a scratch file (`node stage/tools/build.mjs stage/packs/spring-turn --out <file>`) loaded with no console error. The `dist/` file and `ONLY=spring-turn node stage/test.mjs` are for the sets agent.

## 3. The Brush

Every machine element is at *brush* depth in the main text. *Lean in* depth sits in a Referee Note flap that opens only when the Lens tally leads machine (`{ all: [ top machine, not top hymn ] }`) and only if the player lifts it. Nothing glows or pulses.

| Where | Brush (always) | Lean in (flap, when machine leads) | Reward |
|-------|----------------|------------------------------------|--------|
| `s1` the pulse in the rock | "You count the beats. The count never changes. Living things are not so steady." | A pulse that never misses is a count. A living thing drifts. A machine does not. | A way to tell the difference again. |
| `s3` the Tend line (Terminal) | `Lamp: tended. / Filed.` | A log line is written by a rule, not by a wish. Read enough of them and you can tell what the rule counts. | A way to read a log. |
| `s3` Event 6, the new line | `New line. / Unread: 1.` | A line that arrives unasked is a rule that ran. Its hour can be learned. | A way to watch a rule. |
| `s4` the old pipe | "You decide the note is the water, and the pipe is the glass." | A pipe has a bore, and the bore sets the note. Measure the note and you can measure the pipe. | A way to measure. |

The lean-ins say how to look, not what is there. They do not explain the Terminal, the hum, or what is under the lake.

## 4. IP and canon checklist, line by line

| Check | Answer |
|-------|--------|
| Structure only, no expression, from the 1977 Basic sample dungeon and B2? | Yes. The pack has no dungeon. It takes no name, text, map, room key, NPC or read-aloud from any TSR or WotC book. The table roll is the B/X form (one range for each result). |
| Forbidden names (the Forge's FORBIDDEN list, capitalised *Keep*, and the player-facing four from `intro/test.mjs`)? | No hits. Command and result below. The generator's list also bans the Bureau's initials, so Event 4 reads "a form from Mile-House 13" and names the Bureau in full. The two labels that began with the verb *Keep* were reworded to *Hold*. |
| Halcyon: named, never keyed? | Not named. Not keyed. |
| The Sleeper never appears in anything a player reads? | It appears nowhere in the pack. |
| Lintel? | Does not appear. |
| The Terminal never speaks as a mind? | Yes. See section 1. |
| The Gorgon Queen paralysed by a cockatrice chick's cry, not "turned to stone"? | Yes (`biddy`). The phrase is absent. |
| The cockatrice is Biddy; Wick keeps her? | Yes (`biddy`, `wick`; the Beast Pen in `s5`). |
| ASSUMED canon written so a DM can replace it? | The pack assumes Wick keeps Biddy. It is in a lore note and one muster line. |
| The gate: Planning and Execution, taught the first time it matters? | Yes. The words are Planning and Execution. Rule note `gate` is in the `pick` group's own `notes`; the Report beat carries `planning`. |
| The Brush: machine at brush unless the player asks? | Yes. Section 3. |
| Science fantasy named plainly? | Yes. A log line is written by a rule (a flap); a pipe has a bore (a flap). |
| Puzzles | None. There is no puzzle and no hint. |
| The Year Between: names and tags only, no invented seeds? | Yes. The tag beats say only "Surplus: barley", "Want: salt", "Oath: Cassandra". |
| Art: Elmore for characters and hero scenes, Otus for interiors, machines, maps and handouts? | Named in each SET BRIEF. The Fort Turn pages are Otus ink in the Steinberg manner. The pack has no map. |
| Storage key starts `fort-stage.`? | `fort-stage.spring-turn`. |
| No network reference? | None (grep below). |
| The user's Year Two guides, family details or mail? | None used. |
| Emoji? | None. |

Forbidden-name grep. It covers the five data files, which are what a player reads. This file names the forbidden words only to answer the checklist:

```
cd stage/packs/spring-turn
grep -n -iE 'Sleep[e]r|Lint[e]l|Halcy[o]n|turned to ston[e]|Zen[o]pus|Portow[n]|Thalagra[m]|Lemund[a]|Borderland[s]|Chao[s]|medus[a]|Castella[n]|Hermi[t]|Bree-?yar[k]|B\.I\.A' pack.json script.json notes.json theme.json sets.json
grep -n -E '\bKee[p]\b' pack.json script.json notes.json theme.json sets.json
grep -n -iE 'https?:|<script|<link' pack.json script.json notes.json theme.json sets.json
```

Result: no output from any of the three.

## 5. Decisions the lead should know

| Topic | What I did | Why |
|-------|-----------|-----|
| Working fields, not flags | The turn keeps four fields (`w_tag`, `w_change`, `w_dirs`, `w_tmp`) in place of flags. They hold the Year Between tag, the Year of Change, the Directives picked, and the Event or Fate follow-up. The ledger step sets all four back to empty. | A flag cannot be unset. With flags for the tag, the change, the proposal, the pick and the Event, `Stage.simulate` found 16,164 end states and 818,557 states (45 s), and the browser test plays every route. With cleared fields it finds 36 routes and 22,100 states (1 s). Event 12's follow-up is gated by `w_tmp` ("sing") that the result sets, not by a flag, for the same reason. |
| The working fields are hidden | The four fields carry `"hidden": true` and plain labels (Year Between tag, Year of Change code, Directives picked, Event follow-up). | The lead added `hidden` to `SPEC.md` section 2 (wave 5). The card and its text never show them. |
| Five HUD meters | `pack.json` has Fate, Stores, Walls, Folk, Lamp, all `hud`. | The brief. At 360x640 the shell stacks the five in one column, 257 px tall, and leaves the stage about 150 px (checked in a scratch build). The shell makes a 2x2 block for four. The lead has since changed the shell: five meters lay out three over two on a phone, one row from 640 px. |
| Meters read by conditions | Only Walls (the raid test) and Fate (Refresh) are read. | Every meter a condition reads multiplies the routes. I left out beats for a track at 0 or 6 (`tracks` teaches them, and `s3` ends by sending the player to the sheet). |
| Table rolls | Trade is `1d6` with ranges `1-2`, `3-4`, `5-6`. The Event is `1d12` with twelve single-face ranges, each with a `label`. | `SPEC.md` section 2. |
| Nine Breaths pattern | `s4` is a paint scene. The unwitnessed option's `then` beats carry `look: ink`, so the page turns to ink when the player waits for the lanterns to go home. | The lanterns make the start public. The witnessed branch changes nothing, so no `bloom` cue fires there. |
| Speakers | None. Maren, the Minister and Cassandra are named in `kicker`s. | The pack has no `cast.json` yet. |
| `sets.json` | A skeleton: each set id with one `spread` layer and no art. | `validate` requires the file. The sets agent replaces it. |
| Theme and fonts | Copied from the Magic Module (Blueline's values; Alegreya; the licence file). | `PLAN.md`: fonts and theme from the Magic Module. |
| Fort Cards lines left out | "By midsummer, when you gave the Pen to the thief, you were changed." The Year of Change question is kept verbatim. | The Turn sits in Spring, before midsummer. |

## 6. Cues, in short

The pack names no motion. The engine picks every cue from the data.

| Cue | Fired by this pack |
|-----|--------------------|
| `turn` | Each scene change, and the jump from `s6` to an ending. |
| `shift` | The set changes inside `s3`: `ledger` to `cart` to `ledger`, `ledger` to `event` to `ledger`, `ledger` to `glass` to `ledger`. |
| `ink` | Entering an ink scene (`s1`, `s6`); the unwitnessed branch of `s4`; every reveal beat. |
| `bloom` | Entering a paint scene; the endings. |
| `seal` | `pick`, each resolution group, `fate`, `event`, the follow-ups, `reg`, `go`. |
| `roll` | `trade` (1d6 table) and `event` (1d12 table). |
| `cost` / `gain` | Every Directive and Event that moves a track; Refresh. |
| `tear` | `fate`: Fate 3 to 2. |
| `tally` | Both Lens picks. |
| `close` | The three endings. |

## 7. SET BRIEFS

Eleven sets. `sets.json` holds a skeleton: every id, each with one `spread` layer and no art. The sets agent replaces it with the layers below. Positions are fractions of the book box, and every item the reader must see sits in the top 40 % of the stage (centre y 0.36 or less; a tall layer's centre y 0.30 or less). Colours come from theme tokens only. Otus ink is black on cream (`ink`, `paper`, `tint-1`, `rule`); in the Blueline map style the same strokes use `blueline`. Elmore paint is a warm wash with `plate-gold` and `plate-umber`.

**The Steinberg manner.** The spine asks for ink spot art in the manner of Saul Steinberg on Fort Turn pages: one continuous pen line that turns into what it draws, **one small figure, one huge task, one glad face**. The `ledger`, `cart` and `event` sets follow it. The small figure is always the gnome, barefoot, drawn in a few strokes. The huge task is the Fort's work. The glad face is the Fort's own (a gate with two windows and a mouth) or an animal's. Draw the line itself as part of the joke: a pen stroke becomes a palisade, a furrow, a wagon road.

The Lens pull-tab is a `pulltab` layer with `"tally": "lens"` and `"value": "machine"`: the hymn reading is the front layer (`art`) and the machine reading slides out from behind it (`under`). It does not glow, pulse or blink. A tab stub shows at the edge so a reader can find it.

The Referee Note is a `flap` layer with `"opensOn": "reveal"`: `art` is a sealed paper tag reading REFEREE NOTE; `under` is a small ink drawing of the note's subject.

```
SET BRIEF: cover
Scenes and beats that use it: s0 (all beats)
Look: paint        Art style: Elmore (a painted cover plate)
Layers, back to front:
  1. spread   art: the cream double-page ground with a plate-gold hairline border   moves on: turn, bloom
  2. plate    art: the cover painting: a small barefoot gnome at the edge of a thawing field, a ledger under one arm; behind her the Fort's palisade and one lit lamp on the lake shore; a kingfisher on a stake; x 0.5, y 0.31, w 0.62   moves on: bloom (the warm wash)
  3. vfold    art: the book's spine and title band, THE SPRING TURN in caps (font-caps), plate-umber, rising from the gutter; x 0.5, y 0.13, w 0.74   moves on: turn
Cues this set must answer: bloom, turn        Bound state for update(): none
What the player must read in the end state: a small gnome, a palisade with one lamp, and the title.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 60 KB; at most 2 layers move at once
```

```
SET BRIEF: nesting
Scenes and beats that use it: s1 (all beats, and the options' then beats)
Look: ink        Art style: Otus (ink, hatching, heavy double rules)
Layers, back to front:
  1. spread     art: cream ground with a hatched band along the foot   moves on: turn, ink
  2. vfold      art: the Nesting Hall: a warm floor, one large egg cracked at the top, the Glamourist's crouched silhouette beside it, nothing else; x 0.5, y 0.3, w 0.6   moves on: turn, ink
  3. parallel   art: low platform: a small gnome's hand laid flat on the stone, with three slow pulse rings spreading from it; x 0.5, y 0.34, w 0.5   moves on: turn
  4. pulltab    art: a slow spiral (the hymn reading, "a spirit"); under: a wheel on an axle with evenly spaced tick marks (the machine reading, "an engine"); x 0.85, y 0.3, w 0.2; words ["Spirit", "Engine"]   moves on: tally
  5. flap       art: a sealed tag REFEREE NOTE; under: two rows of marks, one perfectly even and one wandering (a count against a heartbeat); x 0.5, y 0.14, w 0.24   moves on: ink (reveal)
Cues this set must answer: ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 4)
What the player must read in the end state: a cracked egg, a hand on stone with rings, and the tab stub; with the flap shut the two rows are not visible.
Palette and tokens: paper, ink, tint-1, tint-2, rule (blueline in the map style)
Budget: 80 KB; at most 3 layers move at once
```

```
SET BRIEF: pen-spring
Scenes and beats that use it: s2 (all beats, and the options' then beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: warm ground with a soft green-gold wash of thaw   moves on: turn, bloom
  2. parallel   art: the Fields at dawn: furrows, mud, small flat cut-out folk planting, the lake edge with two of the Quiet's boats; no faces; x 0.5, y 0.3, w 0.9   moves on: turn
  3. vfold      art: the season card, standing in the gutter: a card with three pictograms (a boot in mud, a door ajar, a small crowned figure), no words; x 0.5, y 0.17, w 0.5   moves on: turn, bloom
  4. plate      art: the Fort's book open on a stump with a quill, weather drawn in the margin (sun, rain, frost); a kingfisher on a stake at the right; x 0.5, y 0.35, w 0.5   moves on: bloom
Cues this set must answer: bloom, turn        Bound state for update(): none
What the player must read in the end state: thawed fields, a card of three pictograms, and the Fort's book with weather in its margin.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 120 KB; at most 3 layers move at once
```

```
SET BRIEF: ledger
Scenes and beats that use it: s3 (the opening beats; the Report; the Directives; every resolution; Fate; Refresh; the ledger), the return from cart, event and glass
Look: paint (the Fort sees it)        Art style: Otus, in the Steinberg manner
Layers, back to front:
  1. spread     art: a cream ledger page with four ruled columns headed STORES, WALLS, FOLK, LAMP (on paper fills, 10 px or more at 360x640), each with one pictogram and no count (a sheaf, a stake, a figure, a lamp); the ruling lines run off the page and become a palisade at the left   moves on: turn, bloom
  2. vfold      art: the Fort as one big friendly gate-house drawn in a single continuous pen line, leaning over the ledger; two windows and the gate-mouth make a small glad face; x 0.4, y 0.26, w 0.6   moves on: turn, bloom
  3. plate      art: spot art: one tiny barefoot gnome on the page's edge, holding a pen as tall as herself, writing one line; her face is glad; x 0.78, y 0.34, w 0.22   moves on: bloom
  4. ticket     art: the Fate ticket: a paper stub reading FATE with six boxes, three punched, a perforation across the middle; meter fate; x 0.86, y 0.1, w 0.18   moves on: tear
Cues this set must answer: bloom, tear, turn        Bound state for update(): the Fate meter (three of six boxes punched; two after the Fate fact; back to three at Refresh)
What the player must read in the end state: a ledger, a gate-house with a glad face, one small gnome with one huge pen, and a Fate ticket.
Palette and tokens: paper, ink, ink-2, tint-1, tint-2, rule (blueline in the map style)
Budget: 110 KB; at most 3 layers move at once
```

```
SET BRIEF: cart
Scenes and beats that use it: s3 (the Trade beats, from the cart being loaded to the roll)
Look: paint        Art style: Otus, in the Steinberg manner
Layers, back to front:
  1. spread     art: cream ground with one pen line that becomes the coast road and runs off the page   moves on: shift
  2. parallel   art: spot art: a huge cart piled with sacks and barrels, drawn in one rolling line; one tiny barefoot gnome pushes it; the lead ox has a glad face; x 0.5, y 0.2, w 0.8   moves on: shift
  3. volvelle   art: the cart wheel as a d6: faces 1 to 6 round the rim; three arcs mark the results (1 to 2 STORES -1, 3 to 4 STORES +1, 5 to 6 STORES +2 and A RUMOUR, on paper fills); a pointer; range [1,6]; x 0.5, y 0.33, w 0.34   moves on: roll (turns to the total)
Cues this set must answer: shift, roll        Bound state for update(): the wheel's last total, if the engine gives it
What the player must read in the end state: a huge cart, one small gnome, a glad ox, and a wheel with a pointer on the result.
Palette and tokens: paper, ink, ink-2, tint-1, tint-2, rule (blueline in the map style)
Budget: 90 KB; at most 2 layers move at once
```

```
SET BRIEF: event
Scenes and beats that use it: s3 (the Event beat, and the roll)
Look: paint        Art style: Otus, in the Steinberg manner
Layers, back to front:
  1. spread     art: cream ground with a hatched night band along the top   moves on: shift
  2. vfold      art: spot art: a huge calendar page standing in the gutter with a row of twelve small pictograms (a torch, a fever cup, two speech marks, a form, a figure at a gate, a screen line, a wagon, a reed, a fish, a scale, a thorn sprig, a wave); one tiny barefoot gnome peers round its edge with a glad face; x 0.5, y 0.18, w 0.7   moves on: shift
  3. volvelle   art: the Event wheel as a d12: faces 1 to 12 round the rim, a pointer; range [1,12]; x 0.5, y 0.34, w 0.34   moves on: roll (turns to the total)
Cues this set must answer: shift, roll        Bound state for update(): the wheel's last total, if the engine gives it
What the player must read in the end state: a calendar page with twelve pictograms, and a d12 wheel with a pointer on the result.
Palette and tokens: paper, ink, ink-2, tint-1, rule (blueline in the map style)
Budget: 90 KB; at most 2 layers move at once
```

```
SET BRIEF: glass
Scenes and beats that use it: s3 (the Tend beat; Event 6, the new line, and their flaps)
Look: paint (the Fort sees it)        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground   moves on: shift
  2. plate      art: close on the glass: the carved stone frame (ink, hatched) round a clear panel at x 0.5, y 0.3, w 0.74. Leave the panel empty: the kit prints the beat's `screen` lines there   moves on: shift, ink
  3. pulltab    art: a hand trimming a wick (the hymn reading, "a lamp tended"); under: a ruled log line with a tick for the hour (the machine reading, "a log"); x 0.85, y 0.3, w 0.18; words ["Lamp", "Log"]   moves on: tally
  4. flap       art: a sealed tag REFEREE NOTE; under: a small clock face beside a ruled line; x 0.5, y 0.12, w 0.24   moves on: ink (reveal)
Cues this set must answer: shift, ink (reveal), tally        Bound state for update(): lens tally, value machine (layer 3)
What the player must read in the end state: the glass panel with its two lines in the kit's screen face (two lines, each 30 characters or fewer), and the tab stub.
Palette and tokens: paper, ink, tint-1, rule
Budget: 50 KB; at most 2 layers move at once
```

```
SET BRIEF: well
Scenes and beats that use it: s4 (all beats; the options' then beats)
Look: paint, then paint or ink        Art style: Otus (an interior; the register is the page's, not the art's)
Layers, back to front:
  1. spread     art: cream ground with a hatched night band along the top   moves on: turn, bloom, ink
  2. tunnel     art: the well in four planes: the fence with a row of lanterns (far); the well-frame with a rope and a small boy perched on top (Wick); the shaft's mouth; the curved wall of fitted stone seen through the break, smooth as an eggshell, with water running behind it (near); x 0.5, y 0.3, w 0.8   moves on: drift, tilt
  3. plate      art: three rings spreading on the water, for one low note. Static   moves on: bloom, ink
  4. pulltab    art: a water drop with a closed eye (the hymn reading, "a woken spring"); under: a short pipe section with a bore and a bracket (the machine reading, "an old pipe"); x 0.85, y 0.3, w 0.18; words ["Spring", "Pipe"]   moves on: tally
  5. flap       art: a sealed tag REFEREE NOTE; under: a glass rim with a wet finger and wave marks; x 0.5, y 0.12, w 0.24   moves on: ink (reveal)
Cues this set must answer: bloom, ink, ink (reveal), seal, tally        Bound state for update(): lens tally, value machine (layer 4)
What the player must read in the end state: a lit fence, a well-frame, a smooth curved wall in the break, and the tab stub. The art must not say which reading is true.
Palette and tokens: paper, ink, ink-2, tint-1, tint-2, rule (blueline in the map style)
Budget: 120 KB; at most 3 layers move at once
```

```
SET BRIEF: muster
Scenes and beats that use it: s5 (all beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: warm ground   moves on: turn, bloom
  2. parallel   art: the yard floor, rows of folk seen from behind, the Gate behind them; x 0.5, y 0.3, w 0.9   moves on: turn
  3. vfold      art: Captain Maren at the centre holding a slate that reads WARDEN, SCOUT, STEWARD, LOREKEEPER; the Paladin at the Gate; the Minister at Maren's left hand; a small barefoot gnome in the front row, looked down at; x 0.5, y 0.25, w 0.7   moves on: turn, bloom
  4. plate      art: the Beast Pen, lower right: a small cockatrice watching with one cold eye. Painted. No stone, no paralysis; x 0.8, y 0.35, w 0.2   moves on: bloom
Cues this set must answer: bloom        Bound state for update(): none
What the player must read in the end state: Maren with the slate, the four office names, and a small gnome looking up.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 120 KB; at most 2 layers move at once
```

```
SET BRIEF: road-pack
Scenes and beats that use it: s6 (all beats; the options' then beats)
Look: ink        Art style: Otus
Layers, back to front:
  1. spread     art: cream ground   moves on: turn, ink
  2. vfold      art: a pear tree at the right, the wall behind it with Wick's lamps lit along the parapet, an owl in the branches; x 0.5, y 0.22, w 0.8   moves on: turn, ink
  3. parallel   art: the grass under the tree with the kit laid out in a row: staff, sling, stones, herb pouch, waterskin; x 0.5, y 0.34, w 0.7   moves on: turn
Cues this set must answer: ink, seal        Bound state for update(): none
What the player must read in the end state: five things laid out in a row under a tree, and lamps on a wall.
Palette and tokens: paper, ink, ink-2, tint-1, rule
Budget: 70 KB; at most 2 layers move at once
```

```
SET BRIEF: milestone
Scenes and beats that use it: the three endings (all beats)
Look: paint        Art style: Elmore
Layers, back to front:
  1. spread     art: pale dawn ground   moves on: bloom, close
  2. tunnel     art: the Old Road receding in mist, five planes: sky greying; the Fields; the new well far off with its frame; the road; low mist; x 0.5, y 0.3, w 0.9   moves on: drift, tilt
  3. vfold      art: the milestone in the foreground, cut with numbers nobody can read, three short arcs beside it for the hum. Static end state; x 0.5, y 0.3, w 0.4   moves on: bloom
  4. plate      art: Cassandra, wrapped in grey, standing at the stone. Painted; x 0.7, y 0.33, w 0.2   moves on: bloom
Cues this set must answer: bloom, close        Bound state for update(): none
What the player must read in the end state: a milestone at dawn, a well far off, and a figure in grey waiting.
Palette and tokens: paper, ink, plate-gold, plate-umber, tint-1
Budget: 140 KB; at most 2 layers move at once
```

## 8. Open questions for the lead

1. **Five meters on a phone.** Answered in wave 5: three over two (see section 5).
2. **Working fields on the card.** Answered in wave 5: `hidden` (see section 5).
3. **Events with no track change.** Five of the twelve Event results (a quarrel, a form, a new Terminal line, a find in the reeds, a hard case) are prompts that say "the table decides". The guide's row gives a track effect for only two (a good catch, the lake sings). Say if you want effects for the rest.
4. **The lake sings.** The pack frames Folk −1 as the price of shuttering the Fort. The guide row is terse ("Lamp +1 or Folk −1"). The DM may prefer a different reading.
5. **The Year Between on the druid's card.** The card line is the pack's addition, as the brief asked. Fort Cards could gain it too.

## 9. Wave-5 review fixes

Changes made after review, all decided by the lead. The pack validates, `sim` finds three endings with nothing unreachable, and the routes grew from 36 to 54 end states (32,367 states).

| Item | What changed |
|------|--------------|
| Card labels | The sets agent shortened the card labels in `pack.json`. The labels stay short. The Year of Change values already carry "(Proposed; the DM confirms.)". |
| Hidden fields | `w_tag`, `w_change`, `w_dirs` and `w_tmp` carry `"hidden": true`, with plain labels again. |
| B1 chips | The browser test needs every chip met on a route, and `sim` lists routes that all take the Long Field (the tags merge once the working fields are cleared). Moved: `terminal` to the origin group's `notes`; `trade` and `tend` to the propose group's `notes`; `surplus`, `want` and `oath` to the Year Between group's `notes`, where the tag is chosen; `mile-house`, `harrow` and `walls-test` to a new lead-in beat after "Roll the Event" that lists what the d12 can bring. Working fields are still cleared. |
| S1 The raid | The spine: a raid succeeds only at Walls 0. The `walls-test` note, the raid group's ask and sub, its "palisade holds" text and the `defend` note now agree. The pack's old rule (Walls 4 or more) is gone. |
| S2 Stores at 6 | The `tracks` note says a track stops at 6 and points past it are lost. Each Refresh option plays "Stores stand at 6: a feast, and a project." when Stores are 6. |
| S3 The Oath | Cassandra asks one question and the table writes it. The pack writes no question. The card's Oath field reads "Called in, Spring." The `oath` note says the same. |
| S4 Explore facts | Each opens with the hex's pinned line, then a brush-depth detail. The Reed Shore says the Quiet live there. |
| S5 The well | `s4` says the diggers hurried the rest of the well. Its place and kicker read "The same Spring". "The well you began" in the endings stays true. |
| N1 Report beats | "Surplus: barley.", "Want: salt.", "Oath: Cassandra." |
| N2 Ledger art | `art/ledger-page.svg`: the tally marks are now four pictograms (a sheaf, a stake, a figure, a lamp), with no counts. |
| N4 Trade sub | The Trade options show the table before the roll: "1d6: 1–2 Stores −1 · 3–4 Stores +1 · 5–6 Stores +2 and a rumour". |
