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

## Wave 5: the party packs

The cleric has her pack. Wave 5 gives the other two Year Two PCs theirs, on the same engine and the paper kit. Each plays the PC's Fort Cards scenes (`intro/SPEC.md`) from a new perspective, and each teaches the OSE layer that its PC lives in. Together with the Magic Module they teach three scales: the table (the DM's jobs), the dungeon (the odds), the Fort (the turn).

| | *Two in Six* (`two-in-six`) | *The Spring Turn* (`spring-turn`) |
|---|---|---|
| Character | The elven thief, "The One Who Opens" (`player/year-two/Playbook_Elven_Thief.md`); Summer Pen | The gnome druid, "The One Who Listens" (`player/year-two/Playbook_Gnome_Druid.md`); Spring Pen |
| Plot | A frame scene, then her five Fort Cards scenes: *The Squeeze*, *Summer: The Pen*, *Salt for a Box*, *Maren's Last Muster*, *The Night Before the Road*; the milestone | A frame scene, then her five Fort Cards scenes with a Fort Turn after the Pen: *The Nesting Hall*, *Spring: The Pen*, **The Fort Turn** (new), *The Singing Well*, *Maren's Last Muster*, *The Night Before the Road*; the milestone |
| New perspective | **The odds are on the page.** B/X dice are small and honest: 2-in-6, 20 %. The book prints every chance before the choice, rolls it in the open, and always offers a plan that needs no roll ("Make a plan that still works if the roll fails", the playbook). Time is a cost: a plan takes turns, and every second turn the book checks for wandering monsters (1-in-6). | **The Fort is a character too.** The HUD is the Fort's sheet: Stores, Walls, Folk, Lamp (start 4, 3, 4, 2) beside Fate. The druid holds the Pen in Spring and plays one Fort Turn step by step: Season, Report, two Directives, a Fate fact, the d12 Event, Refresh (`campaign/SPINE.md`, *The Fort Turn, step by step*). Her Lens decides how the land answers her: spirit or engine. |
| Teaches | Roll-under X-in-6 (hear noise, search, surprise, wandering), percentage skills (Open Locks 20 %, one try per lock), the turn as the unit of time, "the DM rolls Move Silently in secret", Planning and Execution | Tracks and what 0 and 6 mean, Size, the Directives and their effects, Surplus, Want and Strain, Oath, Enmity, the Fate fact, Fate refresh, Planning (Report) and Execution (Directives) |
| Engine | `roll.under` (new in wave 5): `1d6` under 2, `1d100` under 20 | `roll.table` (new in wave 5): Trade `1d6` (1-2, 3-4, 5-6) and the Event `1d12` |
| Meters | `fate` (3); `turns` (`bad`, 0 to 6) | `fate` (3); `stores`, `walls`, `folk`, `lamp` (0 to 6) |
| Commentary | `rule` and `dm` notes, label "How the odds work" | `rule` and `dm` notes, label "How the Fort turns" |
| Endings | Three milestones by the Lens (hymn, machine, both), Cassandra's thief line from `intro/index.html` | The same, with the druid's line |

Pins for both: the Year Between choices and tags (`campaign/SPINE.md`, *The Pen's choices*), names and tags only, never a seed; the Year of Change options marked "(Proposed; the DM confirms.)"; every Fort Cards choice and card field of the PC, with the typed facts routed as in Fort Cards; Halcyon may be named, never keyed; no Sleeper, no Lintel in player text; machine elements at brush depth; the Terminal never speaks as a mind; the Gorgon Queen and Biddy as in `AGENTS.md`; storage `fort-stage.<id>`; fonts and theme from the Magic Module (Blueline). *The Spring Turn* says, once, that the table's own Fort may stand at other numbers: the book plays one Spring from the start values to teach the turn.

| Wave 5 agent | Owns | Done when |
|--------------|------|-----------|
| Lead | `engine/` (`under`, `table`), `SPEC.md`, this section, `campaign/SPINE.md` | Engine tests pass |
| **Thief script** | `packs/two-in-six/` except `sets.json`, `art/`, `cast.json` | `validate` and `sim` pass; `NOTES.md` plan, canon checklist and set briefs |
| **Druid script** | `packs/spring-turn/` the same | The same |
| **Thief sets** | `packs/two-in-six/sets.json`, `art/`, `cast.json`; `dist/two-in-six.html` | Every set built from its brief; `ONLY=two-in-six node stage/test.mjs` passes |
| **Druid sets** | The same for `spring-turn` | The same |
| **Reviewers** (one per pack, read only) | Reports | The lead checks every finding |

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
- 2026-10-15, wave 2: the shell reads `?force=` (roll tiers, in order) so `test.mjs` can play every route by keyboard; the tests agent adds it. GitHub review credits are spent, so code review is done by reviewer agents that apply each repository's `.github/skills/code-review/SKILL.md`, then the lead verifies every finding.
- 2026-10-15, wave 2 review (agents in place of GitHub review; the lead checked every finding): a cast person may carry `alt` crops; the kit state carries `ended`; a `?force=` run saves nothing; the page exposes `data-ending`; moment cues are not restored on Back or Continue. Set positions move into the top 40 % of the stage, where a phone shows them, even where the briefs' numbers differ. Alegreya Sans ships at 400 and 700, not 500, because the shell asks for 600 to 800. Feed `ink` is soft focus.
- 2026-10-16, wave 3 (three read-only reviewers: canon and IP, access and motion, phone performance; six fixers, a test writer and two re-checkers; the lead checked every finding). Canon: the Terminal's narration lines stay (recorded in `campaign/SPINE.md`); the Magic Module keeps one 2d6 threshold and says the table has five bands; the Fate caps (six, five) and Cassandra's one-point hint stay and are stated; the Dead Drop's speaker chip may name Ann while the feed does not. Shell: a phone layout (meters never clip, a stage floor with page scroll on short screens, room for the pull-tab), a shortcuts setting, spoken gates and rolls, the text slides only on a turn, and Verify reads a simulate result embedded at build time (about 65 KB on the Magic Module). Accepted, not fixed: each Play again leaves about 32 nodes (low; TODO); the load long task (265 to 424 ms at 6x CPU); at 360x640 some Dead Drop track labels sit under a tall text panel (the text says the same); the cover picture behind the panel at 360x640 (the title stays clear); on a screen under 480 px tall the text panel also prints the in-world screen's lines, since it covers the kit's screen.
- 2026-10-16, wave 4 (finish and ship; a perf fixer, a label fixer and a reviewer; the lead checked every claim). The 32 nodes per Play again were the measuring script's element handle, not the page: no leak. The load long task at 6x CPU falls from a median 361 to 154 ms (Magic Module) and 614 to 167 ms (Dead Drop): the title preview and Begin's focus wait for the first paint, and the feed kit lays out its first set a frame late. Single runs can still pass 200 ms, and on a slow phone the Dead Drop's title shows an empty stage for up to 0.8 s before its set fades in; both accepted. Dead Drop labels choose above, beside or below and keep clear of logs and of each other: covered labels at 360x640 fall from 36 to 18, at 375x667 from 27 to 7; the rest sit where a tall text panel covers the whole top of the stage. Blueline gains its Motion section (decision 4). The READMEs link the built packs.
- 2026-10-16, wave 5 (the party packs): two packs on the paper kit, *Two in Six* (the elven thief) and *The Spring Turn* (the gnome druid), as in the section above. The engine gains two B/X dice forms: `roll.under` (succeed on `vs` or less: 2-in-6, a thief's percentage) and `roll.table` (results keyed by face range, each with an optional `label`). `campaign/SPINE.md` gains the Fort Turn step by step and the Year Between choices with their tags.
