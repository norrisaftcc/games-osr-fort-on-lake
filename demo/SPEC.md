# SPEC: The Drowned Tower, a First Delve (playable demo)

## What this is
One page, `demo/index.html`. The player picks one of six playbook characters, plays a short intro at The Fort, crosses the Shallows, and plays the first six pinned rooms of *The Drowned Tower* (S1, S2, S3, C1, C2, C3). It teaches the first lesson of Module 2 by doing it: the Dungeon Clock. The page follows the house demo pattern of `team-ycbbb/spooks/mirror-universe`: a data-driven `STORY` object, `START`, `ENDING_IDS`, `body[data-scene]`, `#choices` buttons, number keys, R to restart, a trail, and an endings tracker.

Facts come only from `campaign/SPINE.md`. Where this page and the spine disagree, the spine wins.

## Premise
Captain Maren has a job. Fishers see a light on the Isle of Old Stone, nets come up cut, and since a cockatrice turned the Gorgon Queen to stone, Harrow pays silver for eggs and will not say who buys. Row out (half a day across the Shallows), find out who lands on the island and what moves in the water, and come home. The Minister (NPC) goes with you. The demo ends on the Flooded Stair, where the water rises one step a turn.

## Rules of the tone
- Second person. Plain, short sentences. One idea each. Concrete nouns.
- A little Wolfe and Vance: formal, dry, exact, odd. Science fantasy: a ward is a sensor eye and a spell at once; the Warden's collar is a control collar; a hymn is a protocol. Both readings work.
- No emoji in prose. Never explain Halcyon, the B.I.A. or the Court.
- Low threshold: the first screen is playable with no rules read. Each rule appears in a box the moment it first applies (time at the crossing; Plan/Act and marching order at S1; searching at the oil tin; listening and doors at C1; the stat line at C2; cheat death at 0 HP; TIRED when it bites).

## What it teaches
| Lesson | Where | Ticked at the ending when |
|---|---|---|
| Light and time | Crossing (land by day or at dusk), S1, the oil at S3 and C2 | You filled the lantern, lit a spare torch, or cast Light |
| Searching costs time | S2 rubble, S3 cottage, C2 racks | You searched at least once (or a Fate fact saved a search) |
| Listening and doors | C1 | You listened at the stuck door |
| The clock is a monster | Every 2nd turn, every loud try at the door | A wanderer came, or you reached C3 in 7 turns or fewer |
| Morale | C2 | The rats broke (2 dead, fire, Sleep) or you fed them |
| Retreat and return | Any "row home" choice, or the dark | Always ticked on a turned-back ending |

The Plan / Execute gate (SPINE 2a): in every delve room, **Plan** choices (dashed: look, ask) are free; no time passes and no dice roll. **Act** choices (solid) cost time or roll. **Fate** choices (double border) declare a fact and are free. S1 names the gate in one line.

## Flags
Intro flags are set by the two "Choose One" scenes of each intro (exact playbook options). Each pays off at least once: in the delve (scene extras or mechanics) and always in the ending ("What comes back with you") and on the Intro Card.

| Flag | Set by | Used by |
|---|---|---|
| `wiz_wrong` / `wiz_power` / `wiz_sent` | wiz_1 (why you left) | wiz_2, wiz_3 lines; s2 (`wiz_power`: the lamp-housing); c3 (`wiz_sent`: the phrase cut in the wall); ending; card public + secret |
| `wiz_scroll` / `wiz_component` / `wiz_nothing` | wiz_2 (what you took) | wiz_3 lines; **scroll**: Light at C3 reveals the Warden's collar and the eye-door, or relights in the dark; **component**: the feather points at the water (s1, c3); **nothing**: master's voice when you cast Sleep (c2); ending; card bond (Minister / Harrow / Maren) |
| `em_map` / `em_name` / `em_warning` | em_1 (what the screen showed) | em_2 lines; s1 + c3 (`em_warning`: "this is the stair to the door"); c3 (`em_map`); ending; card |
| `em_right` / `em_wrongnec` / `em_hears` | em_2 (how you see the Minister) | em_3 lines; the Minister's heal line in c2; c2_after (`em_hears`); ending; card bond |
| `pal_disbanded` / `pal_betrayed` / `pal_consumed` | pal_1 (what happened to the order) | pal_2 lines; s2_top (`pal_betrayed`: the hidden boat); c3 (`pal_consumed`); ending; card |
| `pal_keeper` / `pal_wards` / `pal_witness` | pal_2 (what the oath asks) | pal_3 lines; **keeper**: if the Minister leads, you step in front and she is not bitten at C2; **wards**: the lamp-stones hum (s1), the eye-ward on the stair brightens (c3); **witness**: journal (s3); ending; card bond |
| `gn_sick` / `gn_waking` / `gn_old` | gn_1 (what the land says) | gn_2 lines; s1 extra; ending; card |
| `gn_animals` / `gn_grove` / `gn_hum` | gn_2 (why you came) | gn_3 lines; **animals**: a crow tells you about the boat (s2, Maren report); **hum**: loud under the water (c3); ending; card bond |
| `fi_sword` / `fi_spear` / `fi_hammer` | fi_1 (your weapon) | **mechanics**: sword 1d8; spear 1d6 + one javelin throw (1d4) at C2; hammer 1d6 and +1 to force doors (C1); fi_3 line; ending |
| `fi_plow` / `fi_cage` / `fi_coffin` | fi_2 (what you forged last) | fi_3 lines; ending; card public, secret, bond |
| `elf_gone` / `elf_sent` / `elf_cast` | elf_1 (why the only one) | elf_2 line; s1 (`elf_sent`: is this the sign?); ending; card |
| `elf_empire` / `elf_monsters` / `elf_dead` | elf_2 (what they ask) | elf_3 lines; s2 (`elf_empire`); c2 (`elf_monsters`: they break when two fall); c3 (`elf_dead`); ending; card bond |

Game-state fields (not flags, but remembered): `dusk`, `quietSaw` (crossing / reeds), `front` (marching order, S1), `foundTrap`, `climbed`/`sawBoat`, `searchedS2/S3/C2`, `listened`, `heardRats`, `knowsRats` (Gnome's Fate fact), `ratsAlert` (a wandering rat warned the pack), `doorOpen`, `doorShut`, `fight`, `ratsOutcome`, `fact` (which Fate fact was declared), `lightReveal`.

## Scene graph
Format: `id` - title. Each choice: text -> target [sets] {shown only if}. **P** = Plan (free), **A** = Act, **F** = Fate. Plan choices stay in the room.

**start** - Who Rows Out? Six character cards -> wiz_1, em_1, pal_1, gn_1, fi_1, elf_1.

**Intros** (each: two Choose One scenes, then Maren; all end at docks):
- wiz_1 (why you left: 3) -> wiz_2 Old Harrow's Cart (what you took: 3; Harrow on eggs and the Gorgon Queen) -> wiz_3 The Captain's Table (Maren, the Minister) -> docks
- em_1 (what the screen showed: 3) -> em_2 Two Clerics (how you see her: 3) -> em_3 The Captain Is Wary -> docks
- pal_1 (the order: 3) -> pal_2 The Words of the Oath (3) -> pal_3 A Knight Beside Her -> docks
- gn_1 (the land: 3) -> gn_2 The Minister Sits Down (why you came: 3) -> gn_3 Weather for the Captain -> docks
- fi_1 (weapon: 3) -> fi_2 The Last Thing You Made (3) -> fi_3 The Captain's Word (Biddy at the henhouse) -> docks
- elf_1 (why the only one: 3) -> elf_2 The Question (3) -> elf_3 What You Tell Her -> docks

**docks** - Maren's Job (the job; the Gorgon Queen; one torch; a dry lantern) -> crossing

**crossing** - The Shallows
1. A: Row straight (land by day) -> s1
2. A: Put in at the Reed Shore (land at dusk) -> reeds [dusk]

**reeds** - The Reed Shore (a Quiet woman signs: a boat, no lamp, north side) -> s1 [quietSaw]

**s1** - The Broken Jetty (rope burn; the thing in the water; Plan/Act named; the clock starts)
1. P: Look at the mooring post. 2. P: Ask the Minister what she saw.
3. F: I've Read About This {Wizard} 4. F: The Land Speaks {Gnome} [knowsRats]
5. A: You go first -> s2 (1 turn) [front=you] 6. A: The Minister goes first -> s2 (1 turn) [front=minister]
7. A: Row home -> end_retreat

**s2** - The Tower Shell (30' across, stair to 40', crows, rubble)
P: lamp-housing; P: ask about the crows; F: I Remember When {Elf, trapdoor not found} [foundTrap];
A: Search the rubble (1 turn) {not found} [foundTrap]; A: Climb the stair (1 turn) {not climbed} -> s2_top;
A: Go to the cottage (1 turn) {not visited} -> s3; A: Lift the trapdoor (1 turn) {foundTrap} -> c1; A: Row home -> end_retreat

**s2_top** - The Top of the Stair (whole island; boat-shaped shadow at the north cliff) [climbed, sawBoat]. P: look north. A: Climb down -> s2

**s3** - The Keeper's Cottage (roof gone, ash under a week old, chalk eye with a line)
P: the chalk mark (Harrow's crate); P: the ash; A: Search (1 turn) {not searched} -> s3_tin; A: Back to the tower -> s2; A: Down the trapdoor (1 turn) {foundTrap} -> c1; A: Row home -> end_retreat

**s3_tin** - A Tin of Lamp Oil (two flasks). A: Fill the lantern, keep one -> s3. A: Keep both -> s3.

**c1** - The Cellar Stair (20' down; a stuck oak door)
P: look at the door; P: light on the floor; F: I Know How This Was Made {Fighter} -> c2_door (silent);
A: Listen (d6, no turn) {not listened}; A: Force the door (d6 1–N, wandering check each try) -> c2_door on success;
A: Open the door again {doorShut} -> c2_fight; A: Rest (1 turn) {4+ turns since rest}; A: Row home -> end_retreat

**c2_door** - The Oil Store (30' × 20', five giant rats, full OSE line). If you heard them (or the Gnome's fact) and no wanderer warned them: you act first with any fight action. Otherwise: A: Brace -> c2_fight (they bite first). If the Minister leads, she is bitten first (her heal is spent, the torch gutters) unless `pal_keeper`.

**c2_fight** - Rats in the Oil Store (one round per choice)
A: Attack; A: Javelin {fi_spear, once}; A: Throw burning oil {flasks}; A: Sleep {Wizard}; A: Speak to the rats {Gnome, once};
A: Cure Light Wounds {Elf Minister}; A: Lay on hands {Paladin}; A: Minister heals {once}; F: Reroll a miss (1 FP) {last action missed};
A: Back out and shut the door {once} -> c1. The round ends -> c2_fight, c2_after (fight over), or death_door / end_dead.

**c2_after** - The Oil Store, After. P: the hole; P: the racks; F: The Oath Remembers {Paladin} [five flasks];
A: Search the racks (1 turn) [five flasks; the lantern is filled if dry]; heals; A: Rest; A: Go on (1 turn) -> c3; A: Row home -> end_retreat

**c3** - The Flooded Stair (water rises one step a turn; the demo ends here)
P: the walls; P: ask the Minister; F: The Archives Are Deep {Elf Minister}; A: Read the scroll of Light {wiz_scroll}; A: Cast Light {Elf};
A: Watch the water (1 turn) {watched < 2}; A: Mark the step and climb out -> end_water

**dark** (interrupt: the last light dies; returns to the scene you were heading for)
A: Cast Light {Elf}; A: Read the scroll {wiz_scroll}; A: Fill the lantern by feel {flasks}; A: Lead her out -> end_dark

**death_door** (interrupt: 0 HP with 2+ FP). F: Spend 2 FP, up at 1 HP -> c2_fight. A: Let go -> end_dead.

Every non-ending scene always shows at least one choice: a "row home" or "climb out" choice, or Attack, or "Let go".

## Endings (4; no choices on any of them)
| id | Kind | Title | How |
|---|---|---|---|
| end_water | good | The Water Rises | Climb out from C3 |
| end_retreat | back | Turned Back | Row home from S1, S2, S3, C1 or C2 |
| end_dark | back | Turned Back in the Dark | The light dies and you lead the Minister out |
| end_dead | dead | The Lake Keeps You | 0 HP in the fight, without 2 FP or choosing to let go |

Every ending except death prints: **What you tell Maren** (evidence you actually saw), **What you learned** (the lessons with ticks), **What comes back with you** (the payoff of both intro flags and your Fate fact), the **Intro Card** (character + OSE line, one public fact, one secret fact, one bond to the Minister, Maren, Harrow), with **Copy card** (clipboard, falling back to a visible, pre-selected text box) and **Print card** (`@media print` prints only the card), and the link to `../dm/Module_2_The_Drowned_Tower.md`. The death ending prints the lessons and the link. The tracker counts "endings found: N of 4" (localStorage, wrapped in try/catch).

## Mechanics
**Characters** (playbook level 1): HP, AC, THAC0 19 [+0], STR modifier to melee hit and damage, MV.
| | HP | AC | Melee | Edge | Hear | Force door | Torches |
|---|---|---|---|---|---|---|---|
| Wizard | 4 | 9 [10] | dagger 1d4, −1 | Sleep | 1-in-6 | 1-in-6 (STR 8) | 3 |
| Elf Minister | 6 | 7 [12] | mace 1d6, −1 | Cure Light Wounds | 2-in-6 | 1-in-6 | 0 |
| Half-Elf Paladin | 8 | 4 [15] | longsword 1d8, +1 | Lay on Hands 2 HP | 2-in-6 | 3-in-6 (STR 14) | 3 |
| Gnome Druid | 6 | 7 [12] | staff 1d6, −1 | speaks with rats | 2-in-6 | 1-in-6 | 0 |
| Fighter | 8 | 4 [15] | sword 1d8 / spear 1d6 / hammer 1d6, +1 | hammer +1 door | 1-in-6 | 3-in-6 (4 with hammer) | 3 |
| Elf | 6 | 5 [14] | longsword 1d8 | Light (12 turns) | 2-in-6 | 2-in-6 (STR 11) | 0 |

**The Dungeon Clock** (pinned): 1 turn = 10 minutes. Torch 6 turns, lantern flask 24. Wandering check every 2nd turn, 1-in-6; also one per try at the stuck door. Rest one turn in six, or TIRED: −1 to hit and damage. Searching takes one turn. Moving into a new room takes one turn; returning through a known room is free. The fight takes one turn in all. Watching the water takes a turn.
- **Light.** The Minister carries one torch (lit at S1 if you land at dusk; at the trapdoor if you land by day). Spares come from the playbook. Maren's lantern is dry; oil from S3 (2 flasks) or C2 (5 flasks) fills it. When the light dies: lantern, then the half-burnt torch, then a spare, then the `dark` scene.
- **Wanderers** never kill (HP floors at 1) but cost: crows on the surface (1 HP, and a torch turn), a lone giant rat below (a bite, and it warns the pack: you lose first move at C2).
- **Fight.** Your attack: d20 + STR mod (−1 if tired) vs AC 12; damage weapon die + STR mod, minimum 1. Rats: d20 vs your ascending AC, bite 1d3; only two reach you in the doorway. You act first each round (after any surprise round). The pack flees at 2 dead (pinned). Burning oil: d20 vs AC 12, 1d8 to the two nearest, and the pack breaks (a miss sets fire between you: no bites that round). Sleep: 2d8, each rat counts as 1 HD; the rest run. Gnome: reaction 2d6 +2 for the bread, 7+ they take it and go.
- **Rats, full OSE line:** AC 7 [12] · HD ½ (hp 2, 3, 1, 4, 2) · Att 1 × bite (1d3) · THAC0 19 [+0] · MV 120' (40'), swim 60' (20') · SV D12 W13 P14 B15 S16 (F1) · ML 8 · XP 5 each.
- **Fate Points** (3): reroll a missed attack (1); cheat death (2, drop to 1 HP). **Fate ability**: once, one true fact, each in its own room: Wizard S1 (the bound guard in a bronze collar), Gnome S1 (the starving rats: you count as having heard them), Elf S2 (the trapdoor, no search), Fighter C1 (the door opens silently), Paladin C2 (the stone rack: five flasks, no search), Elf Minister C3 (Lamp Station Nine, "the water is the lock"). The Minister answers each with "The Terminal Remembers".
- **Turtle map.** "Your map" draws one line per move (solid on the surface, dashed below) and prints the move Logo-style, relative to the party's facing: `FORWARD 60 → S2`, `RIGHT 90 · FORWARD 30 → S3`, `DOWN 20 · FORWARD 20 → C1`.
- **Dice.** Seeded mulberry32. `?seed=N` sets the seed; without it one is picked and shown in the footer. Same seed and same choices give the same rolls. R restarts with the same seed.

## Technical constraints
- One file, no libraries, no network, opens from disk. Light and dark (CSS tokens on `:root`, `prefers-color-scheme`), ink on cream like the hex sheet, small-caps serif titles, room keys as white text in black circles, monospace for dice and clock. 16px gutter; no horizontal scroll at 360px.
- Keyboard and mouse: number keys pick, R restarts.
- Test hook: `window.DEMO = { state, rngSeed, snapshot(), restore(json), load(json), step(i), choiceCount(), sig(), cardText() }`.

## Acceptance test
`node demo/test.mjs` from the repo root (Playwright from the global install; Chromium from `/opt/pw-browsers` if the default launch fails). `SEEDS=1,2 node demo/test.mjs` picks seeds; `SHOTS=dir` also saves screenshots.

1. **Walk.** For seeds 1, 7, 42, 2026 and 99991, a breadth-first walk of every path from the first screen, through every intro choice and the whole delve. States are compared by an abstraction: the intro exactly; in the delve, only what can still change a choice or a roll in the current phase (light exact, HP as full/hurt/low, which rats are alive, which resources are spent); endings by scene and character. Choices are applied through the same handler a click calls. Up to 150 states per scene and character are drawn and checked in the DOM (drawn buttons = visible choices, no horizontal overflow at 360px, scene text); the rest are stepped without drawing. Fails on a dead scene, any console error or warning, any page error, any STORY scene never reached, any ending never reached, any character that never reaches `end_water` and `end_retreat`, or an Intro Card missing (or naming the wrong character) on a non-death ending.
2. **Keyboard replays.** One recorded path per character and ending is replayed with real key presses from a fresh page and the same seed; it must reach the same scene and state.
3. **Pinned facts** (SPINE) appear on screen: rope burn; 30' tower and 40' stair; ash under a week, the chalk eye; two flasks; 20' stair and a stuck door with the listening and forcing rules; 30' × 20', five giant rats and the full OSE line; one step a turn.
4. **Payoffs.** For all 54 intro combinations (6 characters × 3 × 3), play the intro and a plain policy down to C3; the ending must print the payoff line for both flags.
5. **Interface.** R restarts with an empty trail and no clock; the tracker reads 4 of 4 after the walk; six cards with subtitle, stats and Fate; clicking works; at S1 there are Plan and Act choices, the gate is named, a Plan choice spends no time and an Act choice spends one turn; the turtle map grows and prints FORWARD; Copy card gives a visible result; there is a print rule; no overflow at 1280 or 360; blocked storage still counts an ending; bad stored data is ignored.

## Departures and additions (for the lead)
- Rats' MV and SV follow the corrected spine (120' (40'), swim 60' (20'); F1).
- Added, consistent with the spine but not in it: the Minister has seen the chalk eye "on a crate in Old Harrow's cart" (a clue toward the Saltmen); a ring of carved-eye lamp-stones along the shore; tide-marks and an eye-ward on the C3 stair; the Light reveal at C3 shows the Warden's bronze control collar and the lit eye on the Door Beneath the Lake (nobody opens it).
- The "turned back" ending is two ids (`end_retreat`, `end_dark`) so the test can prove both causes are reachable.
