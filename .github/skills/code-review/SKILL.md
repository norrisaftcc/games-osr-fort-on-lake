---
name: code-review
description: Review pull requests in the Fort on the Lake repository for canon, IP, house style and the Stage contract, as well as code correctness.
---

# Reviewing a Fort on the Lake pull request

This repository is a B/X (Old-School Essentials) teaching campaign: modules, playbooks, solo intros, and small offline JavaScript tools. Most bugs here are not code bugs. They are canon breaks, IP leaks and spoilers. Check those first.

The rules come from `AGENTS.md` and `campaign/SPINE.md`. Cite the file and line when you raise one.

## Blocking: raise these as high severity

| Check | What to look for |
|-------|------------------|
| IP | Any proper name, room key, read-aloud, map or NPC from the 1977 Basic sample dungeon or from module B2. Names include Zenopus, Portown, Thalagram, Lemunda, Keep on the Borderlands, Caves of Chaos, Shrine of Evil Chaos, Castellan, Bree-yark. Also anything from Mentzer's or Moldvay's Basic books or the 1983 solo modules beyond structure. Structure is fine; expression is not. **Exempt:** naming the glossed source in a module's front matter as homage (`campaign/SPINE.md:32`), and the forbidden-name lists themselves (`campaign/SPINE.md`, `generator/test.mjs`, `intro/test.mjs`, this file), which are safeguards. |
| The Sleeper | The word "Sleeper", or anything that reveals it, in text a player reads. "Lintel" must not reach players either. |
| Halcyon | Naming Halcyon is allowed. Keying it (rooms, maps, contents) is not. |
| The Gorgon Queen | She was paralysed by a cockatrice chick's cry. "Turned to stone" is wrong. |
| The Terminal | It never speaks as a mind: no "I", no feelings, no "I see you". It shows hymns, lists, dates, counts and one instruction. |
| The Brush | A machine element pushed past brush depth without the player choosing it (the Lens, or a pull-tab). |
| Pinned numbers | A number that disagrees with a pin in `campaign/SPINE.md` (Fate starts at 3; OSE stat lines; giant rats 120' (40'), swim 60' (20')). |
| Privacy | The Year Two DM Guide or Player Guide documents themselves (whole sections, pasted pages), family details, or mail. **Allowed:** the canon the spine already summarises (`AGENTS.md`, "Where canon comes from"; `campaign/SPINE.md`, *Year Two Canon*), and changes to it. |
| Network | Any external script, style, font or image in a page that must open from disk (`intro/`, `demo/`, `crawler/`, `stage/`). |

## The Stage (`stage/`)

This section applies once `stage/` lands (PR #7). It is not the crawler; do not review it against `crawler/SPEC.md`. The contract is `stage/SPEC.md`. Where code and spec disagree, the code is wrong, unless the PR also changes the spec and records it in `stage/PLAN.md`'s change log.

- A pack never names a motion. Only the engine picks cues (SPEC §3).
- Every cue has a reduced-motion end state. Animations use only `transform` and `opacity`.
- `localStorage` is used only in try/catch, under the pack's `storageKey` (`fort-stage.` here, `htll.` in HTLL).
- The engine (`engine/stage.js`) has no DOM, no timers and no `Math.random`.
- `engine/`, `ui/`, `tools/`, `SPEC.md`, `MOTION.md`, `GUIDE.md`, `test.mjs` and the fixture packs are vendored into the HTLL repository. A change here needs a re-copy there; say so if the PR does not mention it.
- Note texts are 60 words or fewer.

## House style (medium severity)

- Plain words, short sentences, one idea each. Simplified Technical English for rules and notes.
- Gene Wolfe and Jack Vance strangeness belongs in read-aloud text only, never in rules sentences.
- A keyed area has a header table, a read-aloud box, a feature table, a stat block if there is a fight, an obvious and a clever action, and a **What This Room Teaches** line.
- Stat blocks use the full OSE line, then one line of 5e note.
- The gate uses the words *Planning* and *Execution*, and is taught the first time it matters.
- Each art entry names its look: Elmore (colour) or Otus (ink). Maps default to black ink on cream; Blueline blue is a screen toggle only.

## Code (medium severity unless it breaks a check)

- Seeded dice must be deterministic: the same seed gives the same game.
- Untrusted text going into `innerHTML` must be escaped.
- The checks table in `AGENTS.md` names the test for each folder. If the PR changes a folder and its test is not updated or run, say so.

## Do not raise

- Taste in prose that follows the house style.
- The deliberate strangeness of names and nouns ("the Azure Warden").
- Missing features that the PR description lists as a later wave.
