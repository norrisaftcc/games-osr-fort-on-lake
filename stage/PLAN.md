# The Stage: Plan

This plan was frozen on 2026-10-14, before the build. Changes go in the change log at the end, with a date and a reason. The contract is [`SPEC.md`](SPEC.md).

## Goal

Bring the production value of *Neon On-Call* (team-ycbbb, `spooks/neon-on-call/`) to the solo prototypes of both settings. Keep the contextual help and the commentary. Make one character and one plot from each setting, each seen from a new perspective.

## What Neon On-Call does that we take

| Technique | In Neon On-Call | In the Stage |
|-----------|-----------------|--------------|
| A moving set under the text | Canvas vignettes, 650 ms crossfade | A kit draws the set: the pop-up book (OSR) or the feed (HTLL) |
| A deck with direction | Slides in from the right going forward, from the left going back | `turn` cue: a page turn, or a channel cut |
| Typewriter | Tap to finish, tap to go on | The same |
| Act cards | Glitch numeral, sweeping rule | A scene card per scene, drawn by the kit |
| A HUD that reacts | Meter deltas flash; the screen flashes on cost | `cost`, `gain`, `tear` cues |
| Film mode | AUTO, stops at each decision | The same |
| Sound from code | Web Audio hum, ticks, klaxon | The same; off by default |
| A cast from one picture | Portraits cropped from one poster | `cast.json` |
| Help that teaches | ⓘ field notes, a manual, `--VERIFY` | ⓘ notes, a commentary track, a help sheet, a Verify sheet |

## The picks

| | OSR: *The Magic Module* | HTLL: *The Dead Drop* |
|---|---|---|
| Character | The elf cleric of the Sacred Terminal, "The One Who Believes" | Shodann, the Infiltrator (Ann Sho, Sable Harker) |
| Plot | Her eight Fort Cards scenes, *The Queen's Chamber* to *The Night Before the Road* (`intro/SPEC.md`) | The Harborview dead drop with Manager Chen (`build/shodann-solo/scene2-contact.tw`, 17 passages) |
| New perspective | **The book is the Dungeon Master.** A pop-up module plays the scenes and shows which DM job each part does. The Lens is a pull-tab: the machine reading slides out from behind the hymn, at brush depth. | **The Algorithm is the Game Master.** The scene is seen through the surveillance feed: frames, tracking boxes, a redacted log. Shodann's choices change what the feed can see. |
| Commentary | `dm` notes, "How the module DMs"; `rule` notes, incl. the Planning/Execution gate the first time it matters; Cassandra's one hint | `algorithm` lines (flat STE), `handler` lines (dry, under 90 characters), `guide` notes in Ann Sho's GameFAQs voice; 4dF taught on the first roll |
| Kit | `paper` | `feed` |
| Art | SVG ink and cut paper, drawn for the pack. Otus ink for interiors and machines; Elmore paint (a warm wash and lamplight) for witnessed scenes | One cast sheet compressed from `build/art/` (`sable-harker-algocratic.jpeg` and others), in the Infiltrator duotone, orange `#FF6B35` / teal `#1B4D5C` |

## The Magic Module: how the paper does the DM's jobs

The lineage is structure only. Mentzer's 1983 Basic Players Manual opens with a solo programmed adventure that teaches one rule at a time. TSR's 1983 solo modules hid outcomes in invisible ink. Moldvay's 1981 Basic gave the procedures that let paper decide: reaction, morale, surprise, wandering monsters. OSE gave the layout: one topic per spread, numbers where they are used. We take no names, text, maps or characters from any of them (`AGENTS.md`, IP).

| DM's job | Paper mechanism | Cue | `dm` note |
|----------|-----------------|-----|-----------|
| Describes the scene | Read-aloud box; the spread opens | `turn`, `bloom` | A DM tells you what you see. The box does it here. |
| Keeps secrets | Flap (Referee Note) | `ink` | A DM knows things you don't. The flap holds them until you earn them. |
| Decides what happens | Numbered paragraph | `turn` | Your choice picks the paragraph. That is the DM's ruling, written in advance. |
| Hides the result | Reveal ink | `ink` | The outcome was always there. You could not see it until you chose. |
| Rolls when it is uncertain | Volvelle, reaction table | `roll` | A DM rolls when the answer is not certain. This is the table they would use. |
| Keeps the books | Tracker boxes, Fate ticket | `cost`, `gain`, `tear` | A DM tracks time, hit points and Fate. The margin does it. |
| Asks "are you sure?" | The seal on an Execution choice | `seal` | Planning is free. Once you break the seal, the dice decide. |

## Decisions

| # | Decision | Where it is recorded |
|---|----------|----------------------|
| 1 | Maps on screen have a toggle: black ink on cream (default) or Blueline blue. Print and DM maps stay black on cream. | `campaign/SPINE.md` (map style), `AGENTS.md` (Art), `theme.json` `mapStyles` |
| 2 | One engine, two packs, after the crawler. The engine lives here; HTLL vendors it. | `SPEC.md` §1 |
| 3 | Motion has a grammar: the engine picks the cue, so one motion means one thing. | `SPEC.md` §3 |
| 4 | The OSR look follows the Blueline design system (tokens, Alegreya, the PREP/PLAY type modes). Blueline gains a motion section. | Blueline `motion.md` (wave 1) |
| 5 | Fonts are embedded (Alegreya is OFL). No network. | `SPEC.md` §4 |

## Waves

The lead session holds the spec, reviews each wave and integrates. Builders are Sonnet agents. Each agent owns its own files and touches nothing else.

| Wave | Agent | Owns | Done when |
|------|-------|------|-----------|
| 0 | Lead | `PLAN.md`, `SPEC.md`, the canon notes | Merged to this branch |
| 1 | **Engine** | `engine/`, `tools/`, `packs/test/` | Engine tests pass; `validate` and `sim` pass on the fixture |
| 1 | **Shell** | `ui/index.html`, `ui/style.css`, `ui/view.js` | The fixture builds and plays every path by keyboard, with stub kits |
| 1 | **OSR script** | `packs/magic-module/` except `sets.json` and `art/` | `validate` and `sim` pass; canon and IP checklist answered in `NOTES.md` |
| 1 | **HTLL script** | `arcade/stage/packs/dead-drop/` except `sets.json` and `art/` (HTLL repo) | The same |
| 1 | **Motion** | Blueline `motion.md` draft (handed to the lead, who publishes it) | Every cue has a duration, an easing and a reduced-motion end state |
| 2 | **Paper kit** | `ui/kits/paper.js`, `packs/magic-module/sets.json`, `art/` | Every primitive drawn; every set in the pack built |
| 2 | **Feed kit** | `ui/kits/feed.js`, `dead-drop/sets.json`, `cast.json`, `art/` | The same |
| 2 | **Tests** | `stage/test.mjs`, HTLL `check-vendor.mjs` | Every check in `SPEC.md` §5 runs |
| 3 | **Canon and IP review** | Read only; reports | No finding left open |
| 3 | **Access and motion review** | Read only; reports | The same |
| 3 | **Phone performance review** | Read only; reports | The same |
| — | Lead | Fixes, `AGENTS.md` rows, one PR per repository | Every check passes |

Waves 1 and 2 run as two workflows of five and four agents. Wave 3 runs after the lead integrates.

## Acceptance

- Each pack is one offline file, 360 px and up, light and dark, keyboard and touch.
- Each pack plays every simulated route to every ending; Verify agrees with `sim.mjs`.
- Every cue has a reduced-motion end state, and the test proves nothing runs under reduced motion.
- The commentary track and the ⓘ notes cover every rule the first time it matters.
- OSR: no forbidden name; the Terminal never speaks as a mind; the Sleeper never appears; machine elements stay at brush depth unless the player pulls the tab.
- HTLL: storage under `htll.`; Handler lines under 90 characters; Algorithm lines in STE.

## Change log

- 2026-10-14: frozen.
- 2026-10-14, before wave 1: `simulate` projects state onto the keys conditions read, because the cleric's paths cannot all be walked. Added the kit interface, `MOTION.md` (the motion agent writes it in the repo; the lead publishes it to Blueline) and a second fixture, `packs/test-feed`.
- 2026-10-14, Copilot review of #7: Fate starts at 3 (SPINE pin); beats take a `look`; groups take `notes` and `comment`; validate rejects conditions on typed fields; simulation projects onto roll adds and costs, branches only on reachable tiers, and records replayable routes (`Stage.replay`); a `tally` cue; kits get `update(state)` and `finish()`; tests play every route, not every path. Wave 1 started before this change; the lead brings its output up to this spec at integration.
- 2026-10-14, from writing GUIDE.md: `look` is the witness register, not the art style; `tallies` declares allowed values; the pull-tab binds by `tally` and `value`; notes count in `unreachable`; `screen`, card `side`, roll `add`, option `to` and `lock`/`hint` are typed; comment kinds are checked; GUIDE.md is vendored.
- 2026-10-14, wave 1 reports: cues carry `type`, a fixed order within a step, and `ink`/`bloom` only on a change of look; `Stage.replay` takes `{ seed, upTo }` and `create` takes `force`; a tally-count condition; a 4 s typing ceiling; a Calm motion setting (WCAG 2.2.2); fixtures keep `fort-stage.` keys; theme names come from `ui/style.css`. The pull-tab may be tapped to peek at the machine reading without changing state (a lean-in the player chooses); the tags Witnessed, Unwitnessed and Sealed pair with bloom, ink and seal.
- 2026-10-14, HTLL script report: meters can be marked `bad`, so rising stress plays as a cost; routes use the spec's step objects (`{ opt, result }`), not strings; speakers are warnings until a pack has a `cast.json`.
- 2026-10-14, user decision: Manager Chen has no portrait in this version; the feed shows a VIDEO FEED DISABLED box. A cast person with no crop gets the kit's placeholder. Other HTLL faces may reuse `build/art/`.
- 2026-10-14, shell report: `StageKit` lives in `ui/index.html`; the view calls `show()` before the revealing cue and `update()` after; kits may add `setMap` and `screen`; `tallies` is a map only. Verify lists 60 routes with Show all; film mode starts as STEP.
- 2026-10-15, engine integration report: `Stage.check` returns errors and warnings; the view carries the effective look; after a reveal the next beat compares its look with `ink`; card `side` defaults to `front`; `screen` must not be empty; the token header's `a | b` and `x, y` rows have fixed meanings. `validate` is strict about old forms (list `tallies`, a number for roll `add`); the runtime still accepts them so old saves load.
- 2026-10-15, shell integration report: Calm is `html[data-motion="calm"]`, which kits read in `show`, `update` and `tick`; a kit that reads a new theme token adds a row to the style.css header; Verify rows gain a Last pick button. The usual HTLL storage key is `htll.stage.<id>`. GUIDE, MOTION and both skills brought up to date.
