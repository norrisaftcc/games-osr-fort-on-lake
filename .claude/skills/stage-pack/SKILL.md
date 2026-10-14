---
name: stage-pack
description: Use when making or changing a Stage pack in this repository (stage/packs/<id>), or its sets, kit, notes or commentary; or when asked for a solo visual novel or choose-your-own-adventure with motion. The Stage is the motion visual-novel engine; a pack is data (script, notes, sets, theme, art).
---

# Build a Stage pack (Fort repository)

The Stage plays a solo story as a motion picture. The engine is fixed; a pack is data. Detail is in `stage/GUIDE.md`. This file is the order of work and the checks.

## Steps, in order

1. **Read** `stage/SPEC.md` (it wins), `stage/GUIDE.md`, `stage/MOTION.md` (the `--m-*` tokens, cue by cue), and `AGENTS.md` (IP, the Brush, the gate, art looks). For the Year Two people, read the spine's *Year Two Canon*.
2. **Plan.** Write the plan first, at the top of `stage/packs/<id>/NOTES.md`: character, plot, the new perspective, what the commentary teaches, canon pins. Then one SET BRIEF per set (GUIDE section 8).
3. **Write the data:** `pack.json`, `script.json`, `notes.json`, `theme.json`. Copy `stage/packs/test` as the shape. Packs never name a motion.
4. **Validate and simulate:**
   - `node stage/tools/validate.mjs stage/packs/<id>` expects `OK <id>`
   - `node stage/tools/sim.mjs stage/packs/<id>` expects every ending reached, nothing unreachable
5. **Write the sets and art** (`sets.json`, `art/`, `cast.json`) from the briefs. Kits live in `stage/ui/kits/`; a pack change never edits one.
6. **Build:** `node stage/tools/build.mjs stage/packs/<id>` (writes `stage/dist/<id>.html`).
7. **Test:** `node --test stage/engine/test.mjs` expects `# fail 0`. Then build every pack and run `node stage/test.mjs`, which expects `PASS`.

## Rules for any pack

- The first `exec` group carries a `rule` note in its own `notes` that teaches Planning and Execution. Teach each rule the first time it matters.
- Every note is 60 words or fewer. One idea per beat. Plain words (see `AGENTS.md`, House style).
- No condition may read a field that an `input` writes.
- `look` decides the cue: `ink` is unwitnessed or secret, `paint` is witnessed. It is not the art style.

## OSR canon checklist

- **IP.** Take structure, never expression, from the 1977 Basic sample dungeon and from B2. Forbidden names: Zenopus, Portown, Thalagram, Lemunda, Borderlands, Chaos, Castellan, Hermit, Bree-yark, Keep (capitalised), medusa. The player-facing check also forbids Sleeper, Lintel and turned to stone (`intro/test.mjs`, `generator/test.mjs`). Grep every authored text and SVG label.
- **Halcyon** may be named, not keyed. **The Sleeper** never appears in anything a player reads.
- **The Terminal never speaks as a mind.** It is a machine and a hymn; it prints, it does not say "I".
- **The Gorgon Queen** was paralysed by a cockatrice chick's cry. She was not turned to stone. The cockatrice is Biddy; Wick keeps her.
- **The Brush.** Machine elements stay at brush depth. The Lens pull-tab slides on a tally and does not glow or pulse. Go further only when the player pulls it.
- **Art.** Elmore (colour paint) for characters and hero scenes; Otus (black ink) for interiors, machines, maps. On screen, black on cream is the default and Blueline blue is the toggle.
- **Words.** Say Planning and Execution. Name the machine side plainly (a ward is a sensor eye and a spell).
- **Storage key** starts `fort-stage.` (for example `fort-stage.magic-module`). No network reference.
- `NOTES.md` answers this checklist, and lists what the pack invented.

## When the spec blocks you

Stop and report. **Never edit `SPEC.md`, `MOTION.md` or `GUIDE.md` to make a pack pass.** The lead changes the spec; then the code; then your pack. Record any design decision that changes canon in `campaign/SPINE.md`, in the same pull request.

HTLL vendors `engine/`, `ui/`, `tools/`, `SPEC.md`, `MOTION.md`, `GUIDE.md`, `test.mjs` and the fixture packs. After you change any of them, re-copy them there and run its `check-vendor.mjs`.
