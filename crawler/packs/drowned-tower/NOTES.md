# NOTES: The Drowned Tower pack

Pack `drowned-tower`, resolver `ose`. Source: `dm/Module_2_The_Drowned_Tower.md`, all 25 keyed areas as three maps. One cell is 10 feet. x runs east, y runs south.

How it was made: the read-aloud boxes, the OSE stat lines and the 5e notes were pulled from the module by script, not retyped, so they are verbatim (a check script compared each one back to the module: no mismatches). Read-aloud paragraphs longer than 400 characters are split at sentence ends into two or more lines; the words are unchanged. Everything else is written for the pack in plain words.

## 1. The areas and their cells

| Key | Name | Map | Cells (x, y; count) | Module size | Light | Enter scene | Fight |
|-----|------|-----|---------------------|-------------|-------|-------------|-------|
| S1 | The Broken Jetty | surface | x 8-8, y 14-19; 6 | Jetty 10' wide, 60' long; its last 20' has fallen in | daylight | `s1` | - |
| S2 | The Tower Shell | surface | x 7-9, y 6-8; 9 | Round, 30' across inside. Walls 4' thick. | daylight | `s2` | - |
| S3 | The Keeper's Cottage | surface | x 11-13, y 10-11; 6 | 30' × 20'. Roof gone. | daylight | `s3` | - |
| S4 | The Lamp-Stones | surface | x 15-18, y 12-14; 12 | Three stones on the east point, 8' tall, 20' apart. Five more stand alone round the shore. | daylight | `s4` | - |
| S5 | The North Cliff | surface | x 5-8, y 1-2; 8 | A 50' cliff over the lake, with a cleft in its top | daylight | `s5` | - |
| C1 | The Cellar Stair | cellars | x 12-12, y 21-24; 4 | Stair 10' wide, 30' long, falling 20'. A 10' landing at the bottom. | dark | `c1` | - |
| C2 | The Oil Store | cellars | x 10-12, y 18-19; 6 | 30' × 20' | dark | `c2` | c2-rats (auto on every entry until won) |
| C3 | The Flooded Stair | cellars | x 6-9, y 18-19; 8 | 40' × 20'. A broad stair going down to the west. | dark | `c3` | - |
| C4 | The Lamp Hall | cellars | x 6-15, y 13-14; 20 | 100' × 20' | dark | `c4` | - |
| C5 | The Keepers' Dormitory | cellars | x 1-4, y 10-15; 24 | 40' × 60' | dark | `c5` | c5-skeletons (from the scene) |
| C6 | The Ward Room | cellars | x 18-22, y 12-16; 21 | 50' octagon | dark | `c6` | - |
| C7 | The Lampwright's Study | cellars | x 18-21, y 18-21; 16 | 40' × 40' | dark | `c7` | - |
| C8 | The Lens Workshop | cellars | x 10-14, y 5-9; 25 | 50' × 50' | dim | `c8` | c8-stirges |
| C9 | The Blind Stair | cellars | x 7-7, y 9-12; 4 | A 10'-wide passage, 40' long, ending in a stair going up | dim | `c9` | - |
| C10 | The Cistern | cellars | x 1-5, y 1-6; 30 | 50' × 60'. A basin 30' × 30', 10' deep, in the middle. | dark | `c10` | c10-crab |
| C11 | The Station Shrine | cellars | x 19-21, y 7-9; 9 | 30' × 30' | dark | `c11` | c11-zombies (only if the bowl is touched) |
| C12 | The Saltmen Post | cellars | x 26-30, y 16-21; 30 | 50' × 60' | dim | `c12` (gate) | c12-saltmen |
| G1 | The Water Gate | grotto | x 16-25, y 1-5; 50 | About 100' × 50'. Most of it is the channel; a dry ledge 30' wide runs down the east side. | dim | `g1` | g1-crab |
| G2 | The Saltmen's Dock | grotto | x 15-25, y 6-11; 62 | About 100' × 60' | dim | `g2` | g2-saltmen |
| G3 | The Cache | grotto | x 27-31, y 6-9; 20 | About 50' × 40' | dark | `g3` | - |
| G4 | Vosk's Room | grotto | x 8-13, y 7-10; 24 | About 60' × 40' | dim | `g4` | g4-vosk |
| G5 | The Shaft Foot | grotto | x 27-31, y 14-18; 25 | About 50' × 45' | dim | `g5` | g5-sentry |
| G6 | The Drowned Landing | grotto | x 1-9, y 17-20; 34 | About 80' × 40'. Water 1–3' deep. | dark | `g6` | - |
| G7 | The Warden's Pool | grotto | x 9-24, y 12-21; 151 | About 150' × 100'. The pool is 110' × 90' and 40' deep. A rim ledge 5–10' wide runs round the south and west sides; a feeding ledge 30' wide on the east. From the north-west corner, the north arm (a 10' ledge beside deep water) runs 120' north to G8. | dark | `g7` | warden |
| G8 | The Door Beneath the Lake | grotto | x 1-7, y 2-6; 35 | About 70' × 45', under the north cliff, west of the cave mouth. The north half is deep water; the Door's lower half is in it. | dark | `g8` | - |

"Cells" counts every cell that belongs to the area, including water cells, stairs cells that name the area, and the feature cells of section 3. Module sizes are the header-table sizes.

### Exits, both ways

| Key | Exits as built (door glyphs: + door, = stuck, L locked, S secret) |
|-----|------|
| S1 | N: path to S2 (1,300' compressed to 5 cells). E: shore path to S4. S: the lake. The boat is the `<` cell (9,16) beside the jetty; it goes home. |
| S2 | S: door gap (8,9) and path to S1. E: 20' to S3. N: path to S5. Down: trapdoor, the corner cell (7,6): a secret door until found, then a link to C1. |
| S3 | W: door (10,10), facing the tower. |
| S4 | W: shore path to S1. NW: path to S5. |
| S5 | S: path to S2. SE: path to S4. Down: knotted rope, the `>` cell (6,0), to the ledge in G1. |
| C1 | Up: `<` (12,25) to S2. N: stuck door (12,20) to C2. E: secret door (13,21), then Vane's passage (50') and a door (17,21) into C7. |
| C2 | S: stuck door to C1. W: open arch to C3. N: door (12,17) then 30' of passage to C4. |
| C3 | E: arch to C2. W: the flooded stair, `>` cells (5,18) and (5,19), a scene gate to G6. |
| C4 | S: 30' passage, door at its C2 end. W end: 10' passage, door (5,13), into C5. N wall: open arch to C9 (west end); door (12,12) then 30' passage to C8 (middle). E end: 20' passage, door (17,13), into C6. |
| C5 | E: door (5,13) and 10' to C4. N: door (2,9) then 30' passage to C10. |
| C6 | W: door (17,13) from the passage to C4. N: door (20,11) then 20' passage to C11. S: locked door `L` (20,17), 10', to C7 (key: the iron key). |
| C7 | N: locked door (20,17) to C6. W: door (17,21), Vane's passage (50'), the secret door in C1. E: barred door (22,19), 40' passage, then the gate cell (25,19) into C12. |
| C8 | W: door (9,5) and 40' passage to C10. S: 30' passage, door (12,12) at its C4 end. |
| C9 | S: open arch to C4. Nothing else. |
| C10 | S: 30' passage, door (2,9) at its C5 end. E: 40' passage, door (9,5) at its C8 end. |
| C11 | S: 20' passage, door (20,11), to C6. |
| C12 | W: 40' passage to C7's barred door, entered through the gate cell (25,19). Down: the shaft `>` (29,17) with a rope ladder to G5. |
| G1 | N: cave mouth to the open lake (the boat; not a cell). E ledge: the rope up to S5 lands at (24,2). S: channel and ledge into G2. |
| G2 | N: G1. W: plank bridge (cells 14-18 on row 8) to G4. E: passage (26,8) to G3. SE: 50' passage (26,10 to 26,14) to G5. S: the feeding ledge and the pool, G7. |
| G3 | W: passage (26,8) to G2. |
| G4 | E: the plank bridge to G2. No other way in. |
| G5 | Up: the shaft foot `<` (28,15), ladder to C12. NW: 50' passage to G2. |
| G6 | Up (W): the flooded stair, `<` cells (1,18) and (1,19), a scene gate to C3. E: the rim ledge of G7. |
| G7 | N: G2 (the dock and the feeding ledge). W: the rim ledge to G6. NW: the north arm, gate cell (9,13), a scene; it ends at G8. |
| G8 | S: the north arm to G7. G8 has no walkable link; the arm gate scene sends the party in. Reaching it ends the delve. |

The mapping lesson holds: the secret door (13,21) in C1 turns a 26-step walk from the C1 landing to C7 (stuck door, C2, C4, C6, locked door) into 6 steps (checked by breadth-first search). The west loop C4, C5, C10, C8, C4 closes.

Secret doors: the pack has two `S` cells. (13,21) in C1 is the module's mapping-lesson secret door. (22,19) is C7's barred east door, which the module says is "barred from inside", not hidden; it is an `S` cell only because the engine has no barred door, and the study scene's "Lift the iron bar" choice reveals it. No area is reachable only through a secret door. C7 can be reached by the locked door; C12 is reachable from C7 only by the barred door (the module intends this: "the only way from the cellars to C12") and also from G5 by the shaft. The validator prints no secret-door notes.

## 2. Contents of the pack

- `party.json`: default marching order fighter, paladin, elf, minister (the NPCs). Roster extras: wizard, elf-minister, gnome-druid. The elven thief is left out.
- `abilities.json`: Light (Elf), Sleep (Wizard), Cure Light Wounds (Minister, Elf Minister), Lay on Hands (Paladin), eight Fate abilities, and two scene-only abilities (Turn Undead, Speak with Animals).
- `bestiary.json`: 21 cards, every OSE line and 5e note verbatim. `encounters.json`: 7 wandering and 11 keyed fights.
- `events.json`: 67 scenes. `hub.json`: The Hall, Harrow's Cart, The Shrine, The Docks. `endings.json`: `end-dead`, `end-door`.
- Wandering tables: surface (crows 2, crab 1, stirges 1), cellars (rats, skeletons, stirges, centipede, zombie, 1 each), grotto (crab 1, stirges 1).

## 3. Feature cells

A plain floor cell that carries a `link` to a scene. Walking into it opens the scene again; the party does not step onto it. The engine opens an area's enter scene only on the first visit, so without these a room's pickups, the study's notes and the sluice wheel would vanish after a "Step back". Pickups are guarded by `took-...` flags so reopening a scene never pays twice.

| Map | Cell | Area | Scene it opens |
|-----|------|------|----------------|
| cellars | 10,18 | C2 | `c2-after` |
| cellars | 9,13 | C4 | `c4` |
| cellars | 1,15 | C5 | `c5-after` |
| cellars | 20,14 | C6 | `c6` |
| cellars | 19,19 | C7 | `c7` |
| cellars | 14,8 | C8 | `c8-after` |
| cellars | 5,1 | C10 | `c10` |
| cellars | 20,8 | C11 | `c11` |
| cellars | 5,18 | - | `c3-swim` |
| cellars | 5,19 | - | `c3-swim` |
| cellars | 25,19 | - | `c12` |
| grotto | 1,18 | G6 | `g6-up` |
| grotto | 1,19 | G6 | `g6-up` |
| grotto | 9,13 | G7 | `g7-arm` |
| grotto | 31,7 | G3 | `g3` |
| grotto | 11,8 | G4 | `g4` |
| grotto | 23,13 | G7 | `g7` |
| surface | 9,6 | S2 | `s2` |
| surface | 13,11 | S3 | `s3` |
| surface | 18,12 | S4 | `s4` |

Gate cells, which open a scene every time the party walks into them: S2 (7,6) the trapdoor, C3 (5,18) and (5,19), C12 (25,19), G6 (1,18) and (1,19), G7 (9,13). The C12 gate replaces C12's enter scene, so every approach to the Saltmen meets them.

## 4. Departures from the module, and why

### Time and the clock

1. **Moves cost no time.** The engine charges only for entering a new area, a search, a rest, a fight, and scene choices with `turns`. Walking is free, so the surface paths are compressed: S1 to S2 is 5 cells (module: about 1,300'), S2 to S5 about 11, S4 to S5 18. G2 is 11 cells wide (110') so the channel and the plank bridge fit; G4 is walled on its east side except the bridge cell, so the pool cannot be waded into it. Walking them still costs the one new-area turn, as in the demo.
2. **The crossing is not counted** in turns. It is a scene: land by day, or put in at the Reed Shore at dusk (sets `dusk`, which nothing reads except the scene text).
3. **No calendar.** The Clock (Saltmen leave on night 4), nights 1 to 3 at the cottage, "The Dungeon Notices" (restock) and "alarmed means Vosk leaves tomorrow" are not modelled. Time of day does not exist in the engine, so "by day" and "at dusk" results (stirges, G5's sentry asleep 4 in 6, the fisherman, daylight from the C8 flue) are written as scene text or as a d6 check, and C8, C9 and every lit room are `dim` all the time.
4. **Transient flags** (`dish-lit`, `lamp-lit`) are reset at the Docks crossing. The lit dish does not time out after 6 turns: it empties the pool once, until the party sails. The Warden's Lamp lights a 24-turn light (the engine's spell light) and sets flags; the flags do not time out either.
5. **Search is guaranteed where the module says so.** The engine's search roll is 1 in 6 for a hidden door. The S2 trapdoor and the S3 hearth key are found by scene choices (one turn, no roll); C1's secret door uses the engine roll (elves 2 in 6).

### Wandering monsters

6. Results that are not fights are left out: fog, the Warden passing, the lake restless, Sign, the bell. The engine starts every wandering encounter as a fight. Results that need a reaction roll (Saltmen on every table, 1d3 bass "in the water only") are also left out. The remaining entries share the same 1-in-6 chance, so wanderers are a little more dangerous than printed.
7. Conditions the engine cannot read are dropped: stirges "dusk and night only" (crows get weight 2 instead), crabs "only at S1, S4 or S5", skeletons and zombies "treat as Sign once cleared". 2d4 giant rats is 5 rats; 1d3 stirges is 2.
8. **Crows have no stat block.** The module says "harmless, loud". The bestiary card is a stand-in of my own (the card no longer says so; the player should not read a note to the DM): three 1-hp birds, nonLethal. Each bird is a "Crow" so the log reads "The Crow falls."
9a. **Wandering checks start on turn 2 on every map.** The module's C1 header says they start in C2. SPEC section 5 says every 2 turns on the current map, so the surface and C1 are checked too (a wander table on the surface is part of the pack). The spec wins.
9. **Wandering checks rolled during a scene choice.** *Fixed at integration.* The engine used to drop the encounter unless the party was on the map when the step ended, which lost every hit rolled in a search that opens a scene, a scene choice with turns, or an area entry with an enter scene. It now keeps the hit in `state.queued` and starts the fight when the scene closes. Going home drops it.

### Fights

10. One attack per foe per round. Giant crab: one 2d6 pincer (not two). Warden: the 2d8 bite only; the four feelers are dropped. Stirge: one beak 1d3 a round with +2 to hit, standing in for the first-attack bonus and the blood drain. Giant centipede: poison and disease are not modelled (the bite does 0). So crabs and the Warden hit about half as hard as printed.
11. **Sleep and immunity.** The engine's Sleep reads one number, `hd`. Half-HD monsters carry `hd: 1` (they count as 1 HD), and sleep-immune monsters (skeletons, zombies, the Warden) carry `hd: 99`. The printed HD is on the stat line.
12. **Morale.** Rats use `breakAt: {dead: 2}`, per the module. Others use the engine's morale on the first foe's ML. Vosk "yields below half hp" is not modelled: a single foe that dies ends the fight, and nothing else triggers. *Balance edits (the sim in `crawler/tools/sim.mjs`):* the keyed crabs (C10, G1) use `breakAt: {marked: n}` at half hp, as the module's 5e note says (8 of 15, 7 of 13). The **wandering** crab breaks at 4 of 14 hp, earlier than half, because with one pincer in place of two it still wiped 3.6 per cent of parties against a target of 2 (it wiped 15.3 without any break). The Warden uses `breakAt: {marked: 19}`, half of 38 hp: it "sinks" and the fight is won, and the Warden is not killed, which the report line says (flag `warden-sunk`). Without the break it won 15 per cent of fresh-party fights, against a band of 40 to 75.
13. **Fights that start from a scene are not persistent.** Only C2 has an area encounter, so its rats come back if the party flees and returns. For the other fights the foes' hp is kept, but nothing restarts the fight when the party walks back in (the engine cannot mark a scene-started parley or damper as "done"). C12's gate, which meets the Saltmen on every approach, is the one mitigation. See "open".
14. Initiative: the engine decides only round one. Zombies "always lose initiative" is modelled as party first; the other first-strike rules use flags (heard-rats, plate-popped, sentry-asleep).
15. XP is printed on every card but not awarded. There is no XP in the engine. Weight and encumbrance are not modelled (the module's treasure-weight lessons are text).

### Doors, stairs, water

16. **The Fighter's C1 Fate ability** cannot open a door (the engine has no effect for it), so it carries the party through into C2 and the door sticks again behind them.
17. **Locked door C6 to C7.** Breaking it down takes 3 turns and gives the party the iron key as a stand-in for "the door hangs open". The engine cannot bash an `L` door.
18. **The flooded stair and the arm are scene gates.** The swim is a scene (rope, save vs death, or the drained stair). The north arm and the G8 approach are one gate scene at G7, so the Warden cannot be walked around. G8 is not linked by cells; the arm gate scene sends the party there.
19. **Not modelled:** the plank bridge cut (kicking it in), the G3 alarm string (it is text and a G2 search scene only), the water level rising one step per turn, the boat as a vehicle (cutting it loose sets a flag), the false bottom, the C5 skeletons' round, hiding the light so the dead lie back down, holy water.

### Reaction rolls and parleys

20. **The reaction roll** (2d6 plus modifiers, five rows) is two d6 checks on `inSix`: first "they will talk" (2d6 + mod is 6 or more), then "they take you in" (9 or more, given the first). The chances come from the exact 2d6 table, rounded to a die face. Each opener (plain, Harrow's name, 10 gp, both, the sign, all three) has its own pair, shown as its modifier. The "weapons drawn" and "heard fighting in C6 or C7" modifiers are not offered. Hostile (a roll of 2, shoot at once) and Eager (12) are folded in: hostile into "turn round", eager into Cobb's aside (1 in 6).
21. **Guests.** A willing C12 or G2 sets the flag `guest`; the G2 enter scene then splits to the guest or the intruder scene. Backing away from G2 and walking in again skips the Saltmen (see item 13).

### Abilities

22. **Turn Undead and Speak with Animals are scene-only** (kind `fate`, which is how the engine lets a scene choice spend an ability). Turn Undead is two uses a rest for each cleric, at C5 and C11. Speak with Animals appears at S2 (the crows) and G7 (the Warden). The Gnome has no Speak with Animals in a fight; a fight spell cannot tell a rat from a Saltman.
23. Fate abilities are free choices that spend one use a delve. The Wizard and Gnome are at S1, the Elf at S2, the Fighter at C1, the Paladin at C2 (after the fight), the Elf Minister at C3, as the demo pins. More are at S4, C5, C6, C11, G7 ("What each of you knows") and G8. The Minister NPC's "The Terminal Remembers" wakes the screen at C11, and her question at G7 is a plain choice.
24. **Listening cone:** a bronze ear-trumpet can be taken; the engine cannot raise a listen chance, so it has no effect. **Reading Vane's notes** is one turn each for everyone (the module: two turns for INT 13+ readers when none of the Minister, Elf Minister or Paladin is present). **The rite** lays the C5 skeletons and C11 zombies to rest through scene gating, not by removing foes.

### Intro hooks, Fort, text

25. **No intro hooks.** The pack has no intro, so the Intro Hooks table (what each playbook choice does in the tower) is not used. The Fate facts at G7 are the Each PC's Moment table.
26. **Pay.** Maren's job scene gives 20 gp now for oil and rope (the engine starts with no gold). The "Report to Maren" scene pays 40 gp for who lands and 40 gp for what moves in the water, 80 in all: the module's 20 each for four.
27. **Harrow's Cart sells** torches 1, oil 2, lantern 10, rope 1, salt 1 and salt fish 1 (my prices, from the common OSE list; the module lists none). It buys treasure at its value. The ledger is treasure worth 200 (Harrow's offer), though it also sets the report flag.
28. **The Fort Reacts** rows are report lines, shown when the flag is set. Vosk as a prisoner is not modelled (a deal sets a flag instead). The Door row is in the `end-door` text.
29. **Planning and Execution.** S1's lesson line says "Planning, then Execution" where the module says "Plan, then Execute", per the Year Two rule. Lesson lines are the module's "What This Room Teaches" trimmed to their first plain sentences; the Dungeon Master asides ("Have them draw the order on a card") are cut. Stat blurbs are mine. *Edited after review:* lesson, size and stat lines are no longer read-aloud. They sit in the scene's `notes[]`, which the view draws small and muted in the body font, so the Wolfe register is kept for the read-aloud only.
30. **Names.** Halcyon and the Sleeper do not appear. Nobody opens the Door: every "try" ends in the same four lines and the good ending. "The Gorgon Queen" only.

### Integration edits

31. **Size lines added to S2, C1 and C2** (one plain text line after the read-aloud, taken from the module's Size row, plus "the oak door is stuck" at C1). The pinned facts 30' (S2), 20' and the stuck door (C1) and 30' × 20' (C2) were in the module's header tables but not on screen; `crawler/test.mjs` checks that they now are.
32. **Wandering rolls in scenes** no longer vanish (item 9). Engine fix, no pack change.
33. **Review edits.** The fight's turn is charged when the fight ends, not when it starts (SPEC section 5), so a fight on the sixth turn is not played tired. A taken once-choice stays in the list, greyed as "Done.", so number keys do not shift. The S2 search scene had a "Mark the trapdoor" choice that was easy to skip: its own Leave now marks the trapdoor. The report line for the Warden is flag `warden-sunk`. The Warden's Fort Reacts line no longer tells the Druid's player to decide anything.

## 5. Smoke test

Engine `crawler/engine/crawl.js` existed. With seed 7: `Crawl.create`, pick the default party, close Maren's job, cross, land at S1 (turn 1), walk up to S2 (turn 2), the Elf reveals the trapdoor, walk into the corner cell, arrive at C1 (turn 3, Torch 5 left). 0 refusals. A longer walk by script (seeds 1, 2, 3, 5, 9, 11, 42, and a roster of fighter, wizard, elf-minister and gnome-druid) went from the Fort through every area to G8 and `end-door`, with 0 refusals; it healed the party between rounds, so it tests the map and scenes, not balance. A second script ran every choice of every scene under 24 seeds (7,656 runs, 0 refusals), and a random walker ran 20,000+ commands with no engine errors.

## 6. Open

See the report to the lead. The main items: (the lost wandering rolls were fixed at integration); no way for a scene to retire an area encounter; no way for an effect to open a door; fate-kind abilities used for scene-only spells; no calendar.
