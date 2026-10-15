# AGENTS.md

Guidance for AI agents (Claude Code and others) working in this repository. Read it before you change anything.

## What this repository is

A B/X teaching campaign set around **The Fort on the Lake**, a post-imperial frontier outpost in a science-fantasy world. The players read 5e; the DM runs **Old-School Essentials (OSE) Advanced Fantasy**, with Fate points from the playbooks. The repository holds:

| Path | What it is |
|------|-----------|
| `campaign/SPINE.md` | **The design record.** Canon, pinned facts, rules for writers, the lesson ladder, the throughline. Read it first. |
| `dm/` | GM-facing modules. Module 1 (`DM_Guide_Fort_and_Caves.md`, the Gorgon Caves), Module 2 (*The Drowned Tower*), Module 3 (*The Ravine of Mouths* and *The Temple of the Unwritten*). Maps in `dm/maps/`. |
| `player/` | Player's Guide and playbooks. `player/npc/` holds the Fighter, the Elf and the NPC Minister. |
| `generator/` | **The Forge**: a seeded dungeon generator (towers and ravines). Pure JS, no build. |
| `demo/` | A single-file browser demo: six character intros and the first delve into the Drowned Tower. |
| `classroom/` | **The First Delve** for first-year programming classes: seven stages in Python and C++ with byte-identical output. |
| `player/year-two/` | Year Two playbooks for the real party: the elven thief, the elf cleric, the gnome druid. |
| `intro/` | **Fort Cards**: Badge Zero–style solo intros for the three Year Two PCs. All their choices are made here. |
| `dm/Year_Two_First_Session_The_Hum.md` | Year Two's first session: the humming milestone, the hunter's map, the outflow tunnel. Stops at Halcyon's door. |
| `crawler/` | **The Crawler**: a first-person party crawler for phones. One engine, a view, and data packs; `packs/drowned-tower` plays Module 2 (canon-bound: its pinned facts are checked on screen). Pure JS, no libraries. Contract: `crawler/SPEC.md`. |
| `stage/` | **The Stage** (in build): a motion visual-novel engine and packs; `packs/magic-module` plays the elf cleric as a pop-up module that runs the game. Contract: `stage/SPEC.md`; plan: `stage/PLAN.md`; motion: `stage/MOTION.md`; how to build a pack: `stage/GUIDE.md`. The skill `stage-pack` (`.claude/skills/stage-pack/`) carries the steps and the canon checklist. |
| `beta/` | The superseded pre-split setting document. Keep it; do not edit it. |

## Where canon comes from

Use this order when sources disagree:

1. **The Year Two DM Guide and Player Guide** (*Fort on the Lake, Year Two*, 2026-10-09). They are not in this repository: they describe the people at the table. The spine's **Year Two Canon** section summarises what writers need. Ask the user for the documents if you need more than the summary. Never commit them.
2. **`campaign/SPINE.md`**, especially *The Fort Country (canon)*, *Play Record*, *Year Two Canon* and the pinned facts for each module.
3. The modules themselves.

Other sources the user has shared: the **"Fort on the Lake: Maps and Handouts"** design canvas (the Fort Country hex map, *The Year Between* zine, the tulip-fold sheet, the Reckoning card) **Floor 31**, a sister scenario that is the model for the kind of adventure we want; and **Badge Zero**, Floor 31's solo-intro page, the model for character intros (scenes whose choices write onto a card, typed public and secret facts, bonds, a session-zero retcon). Floor 31 and Badge Zero are in the user's "AlgoCratic OSR" Drive folder.

Canon marked **ASSUMED** in the DM Guide (the basilisk is dead; Petra is restored; the Beast Pen cage is empty) may change. Write so a DM can replace it.

## Rules that are easy to break

- **IP.** Modules 2 and 3 are glosses on the 1977 Basic sample dungeon and on module B2. Both belong to Wizards of the Coast and are not open content. Take structure, never expression: no names, room keys, read-aloud, maps or NPCs from those books. `generator/test.mjs` checks generated text for the forbidden names; check authored text yourself with the list in the spine.
- **Halcyon and the Sleeper.** Halcyon, the drowned lamp-city under the lake, is Year Two's main site and is keyed in the Year Two DM Guide, not here. You may name it. Do not key it. Never reveal **the Sleeper** in anything a player reads.
- **The Gorgon Queen.** A cockatrice chick's cry paralysed her. She was not "turned to stone". The cockatrice is **Biddy**; Wick keeps her.
- **Stat blocks.** The full OSE line (AC, HD with pre-rolled hp, Att, THAC0, MV with encounter rate, SV, ML, XP), then **one line of 5e note** in the spine's format. Use OSE values; giant rats move 120' (40'), swim 60' (20').
- **The gate.** Planning (talk, look, maps: no dice, no time) and Execution (dice and consequences, which cannot be undone). Teach it the first time it matters.
- **Art.** Two looks, named in each entry: Elmore (colour) for characters, monsters and hero scenes; Otus (black-and-white ink) for interiors, machines, maps and handouts. Maps are black ink on cream, to match the hex sheet. On screen, the Stage offers a toggle to Blueline blue; black on cream stays the default.
- **Science fantasy.** Name the machine side plainly: a ward is a sensor eye and a spell at once; a hymn is a protocol.
- **Puzzles** have a rule players can discover by trying, give feedback, and never block the game. A Fate point or Cassandra gives one hint.
- **The Brush.** Year Two tests whether the players want science fiction. Old machines appear at the edge and can be left alone; the player chooses whether to read them as hymn or machine (the Fort Card's **Lens**). Every machine element in a session has a *brush* depth and a *lean in* depth. Do not push past brush unless the players ask.

## House style

Plain words. Short sentences, one idea each. Concrete nouns. Tables for anything a DM looks up at the table; prose for what a DM reads once. The touchstones are Simplified Technical English and Orwell's rules for everything, and Gene Wolfe and Jack Vance for read-aloud text only. Every keyed area has a header table, a read-aloud box, a feature table, a stat block if there is a fight, an obvious and a clever action, and a **What This Room Teaches** line. Match `dm/DM_Guide_Fort_and_Caves.md`.

## Checks to run before you push

| Changed | Run | Expect |
|---------|-----|--------|
| `generator/` | `node generator/test.mjs` | "All … checks passed" (a few minutes; uses Chromium) |
| `demo/` | `node demo/test.mjs` (or `SEEDS=1,7 node demo/test.mjs` for a quick pass) | `PASS` |
| `intro/` | `node intro/test.mjs` | `PASS` |
| `classroom/` | `bash classroom/check.sh` | `ALL CHECKS PASSED`. After a deliberate output change: `bash classroom/check.sh --regen`, then check the diff of `test_vectors/`. |
| `crawler/` | `node crawler/tools/validate.mjs crawler/packs/<id>` for every pack; `node --test crawler/engine/test.mjs`; build each pack (`node crawler/tools/build.mjs crawler/packs/<id>`), then `node crawler/test.mjs` | `OK <id>` for every pack; engine tests `# fail 0`; `PASS`. The HTLL repository vendors `engine/`, `ui/`, `tools/` and `SPEC.md`: after a change, copy them over (see `crawler/README.md`) and run `check-vendor.mjs` there. |
| `stage/` | `node stage/tools/validate.mjs stage/packs/<id>` and `node stage/tools/sim.mjs stage/packs/<id>` for every pack; `node --test stage/engine/test.mjs`; build each pack (`node stage/tools/build.mjs stage/packs/<id>`), then `node stage/test.mjs` | `OK <id>`; every ending reached, nothing unreachable; `# fail 0`; `PASS`. The HTLL repository vendors `engine/`, `ui/`, `tools/`, `SPEC.md`, `MOTION.md`, `GUIDE.md`, `test.mjs` and the fixture packs: after a change, copy them over and run `check-vendor.mjs` there. |
| A map in `dm/maps/` | Render the SVG to PNG with Playwright and look at it | Every keyed area labelled; exits match the module's key |
| A module | Read every exit both ways; grep for the forbidden names | Exits reciprocal; no hits |

Playwright is installed globally (`/opt/node22/lib/node_modules/playwright`); Chromium is at `/opt/pw-browsers`.

## Workflow

- Branch from `main`; open a pull request; one logical change per commit, with a message that says what changed and why.
- When a design decision changes canon, record it in `campaign/SPINE.md` in the same pull request.
- Keep the classroom stages single-file, so students can paste a stage into an online compiler.
- Do not commit the user's Year Two guides, family details, or anything from their mail.
- New solo narrative work (a visual novel or choose-your-own-adventure) uses the Stage and its skill, `stage-pack`.

## Open items

- The DM confirms the Year Two numbers marked "DM confirms": the Year of Change effects, recomputed saves and the cleric's shield AC, XP to levels 3 and 4, gnome infravision.
- The first session invents Senior Agent Emory Platt (the missing B.I.A. agent) and Tobin Ash (the hunter); replace them if the DM Guide names them.

- The Year Two party includes an **elven thief**, who has no playbook here yet, so the modules give the thief no moments.
- Each module's **The Fort Reacts** table should eventually read as changes to the Fort's tracks (Stores, Walls, Folk, Lamp) and tags.
- `dm/DM_Guide_Fort_and_Caves.md` still calls the Gorgon Queen "the Basilisk Queen" and its outcome table predates the play record.
- `player/README.md` links to a meetings note (`../../meetings/…`) that lives in another repository.
- The Forge prints 5e notes under encounter tables but not yet under its wandering-monster tables.
- CR for a 5e note is the standard CR nearest HD/2, ties rounding up (HD 3 → CR 2). The DM Guide says only "about n/2"; change the rule here and in `generator/test.mjs` together if the DM prefers otherwise.
