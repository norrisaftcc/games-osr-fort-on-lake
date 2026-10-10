# The Fort & The Petrified Caves — B/X TTRPG Adventure Module

Reusable B/X-era D&D adventure module developed as a low-stakes testbed for the ASCEND facilitation procedure. Built on OSE Advanced rules (class + race separately). First playtest: 2026-06-05 with a 5-player mixed-age group (3 teenagers, 2 adult parents).

See [`../../meetings/2026-06-05_gray_facilitation-roleplay.md`](../../meetings/2026-06-05_gray_facilitation-roleplay.md) for the prof-dev meeting record this material supports.

## Iteration history

The setting and adventure went through a **beta → final** iteration during the Day-before prep (2026-06-04 Thursday, two sessions):

- **Beta:** [`beta/Setting_Lake_Outpost_and_Petrified_Caves.md`](../beta/Setting_Lake_Outpost_and_Petrified_Caves.md) — single unified document containing setting, NPCs, and adventure content together. Superseded but preserved.
- **Final:** [`Players_Guide_The_Fort.md`](Players_Guide_The_Fort.md) plus [`DM_Guide_Fort_and_Caves.md`](../dm/DM_Guide_Fort_and_Caves.md), with information separated by who needs to read what. Plus one playbook per main B/X class.

The split was the load-bearing iteration: separating *what every character knows* (player-facing world brief) from *what's actually going on, what the NPCs want, where the pressure points are* (GM reference). Same kind of "audience separation" decision the ASCEND-vs-Canvas terminology pass made in the FSM data-model document.

## Files

### Final set (used at the table on 2026-06-05)

| File | Audience | Notes |
|---|---|---|
| [Players_Guide_The_Fort.md](Players_Guide_The_Fort.md) | Players | World + The Fort + What's Out There + Current Situation + How This Works at the Table. The "What Everyone Knows" baseline. |
| [DM_Guide_Fort_and_Caves.md](../dm/DM_Guide_Fort_and_Caves.md) | GM only | NPC behavior tables (Wants / Will do / Won't do / Treats PCs as), pressure-point status + trajectory, after-adventure "The Fort reacts" guidance, plus the 5-room Petrified Caves dungeon with room-by-room teaching objectives. |
| [Playbook_Fighter.md](npc/Playbook_Fighter.md) | Player | Main B/X class. |
| [Playbook_Wizard.md](Playbook_Wizard.md) | Player | Main B/X class. |
| [Playbook_Elf.md](npc/Playbook_Elf.md) | Player | OSE Advanced class+race. |
| [Playbook_Elf_Minister.md](Playbook_Elf_Minister.md) | Player | OSE Advanced — the "Minister" Cleric variant of the Order of the Sacred Terminal. |
| [Playbook_Half_Elf_Paladin.md](Playbook_Half_Elf_Paladin.md) | Player | OSE Advanced — the Paladin variant of the Order of the Sacred Terminal. |
| [Playbook_Gnome_Druid.md](Playbook_Gnome_Druid.md) | Player | OSE Advanced class+race. |
| [Playbook_Shrine_Maiden.md](npc/Playbook_Shrine_Maiden.md) | Player + GM fallback | NPC version available if no player chooses the Minister role. |

### Beta (pre-split)

| File | Notes |
|---|---|
| [beta/Setting_Lake_Outpost_and_Petrified_Caves.md](../beta/Setting_Lake_Outpost_and_Petrified_Caves.md) | Unified setting + adventure. Superseded by the final split. Kept for version-history reference and as evidence of the beta-to-final iteration process. |

## Why this works as an ASCEND-procedure testbed

The DM Guide doesn't just describe an adventure — it bakes pedagogical scaffolding into every encounter. Four patterns visible across the rooms map cleanly onto ASCEND's design moves:

**Per-room teaching objectives = per-module MLOs.** Every dungeon room ends with a "What This Room Teaches" sidebar: Room 1 teaches *look before you walk*; Room 2 teaches *not everything is a fight*; Room 3 teaches *combat has permanent consequences*; Room 4 teaches *exploration is rewarded*; Room 5 teaches *boss fights reward tactical thinking and teamwork*. Indistinguishable in shape from the MLO-per-module pattern in ASCEND's canonical spine.

**Scaffold-not-force solutions.** *"The steel mirror costs 5gp and is the trick solution for the basilisk boss fight. Players who buy it are rewarded. Players who don't have to improvise. Either way works."* Same posture ASCEND takes toward learner latitude in pathways — the "right" answer is available but not forced; alternate paths still complete the objective.

**Boost-pattern handling of failure.** *"If a PC gets petrified, that's okay. The feathers are in this room. The scroll is in Room 4. The problem and the solution are in the same dungeon. If it happens, the session becomes a rescue — more dramatic than a replacement character sheet."* Failure routes to scaffolded continuation, not session termination. Same shape as the ASCEND Gauge → Boost detour pattern.

**React-don't-script.** *"When PCs return, The Fort mirrors their choices. Don't plan outcomes in advance — react."* Same posture ASCEND's facilitation procedure takes toward emergent learner pathways: the facilitator responds to what actually happens rather than enforcing a pre-scripted route.

## Use & reuse

The module is reusable for additional playtest sessions — The Fort has more directions yet unexplored (the lake island, the coast path strangers, the silent outposts Old Harrow has heard rumors about). Subsequent playtests give additional ASCEND-procedure validation runs at zero additional design cost.

For instructor reuse: the room-by-room scaffolding pattern in `DM_Guide_Fort_and_Caves.md` is portable to any module-shaped pedagogical content — substitute the "What This Room Teaches" line with a module learning outcome, the "Design Note" callouts with assessment design notes, and the pressure-points table with progress-tracking dimensions.
