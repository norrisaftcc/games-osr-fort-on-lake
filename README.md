# The Fort on the Lake — B/X Teaching Dungeons

A short B/X campaign for OSE Advanced Fantasy, built to teach the dungeon craft one lesson at a time. Each dungeon assumes the skills the one before it taught.

| # | Module | Levels | Teaches | GM file |
|---|--------|--------|---------|---------|
| 1 | *The Petrified Caves* | 1 | Look, talk, fight, explore, cooperate | [`dm/DM_Guide_Fort_and_Caves.md`](dm/DM_Guide_Fort_and_Caves.md) |
| 2 | *The Drowned Tower* | 1–2 | Time, light, doors, mapping, wandering monsters, retreat and return | [`dm/Module_2_The_Drowned_Tower.md`](dm/Module_2_The_Drowned_Tower.md) |
| 3 | *The Ravine of Mouths* | 1–3 | Reaction, morale, factions, parley, alarm, expedition supply | [`dm/Module_3_The_Ravine_of_Mouths.md`](dm/Module_3_The_Ravine_of_Mouths.md) |
| 3, part 2 | *The Temple of the Unwritten* | 2–3 | Everything at once; the campaign's last choice | [`dm/Module_3_Part_2_The_Temple_of_the_Unwritten.md`](dm/Module_3_Part_2_The_Temple_of_the_Unwritten.md) |

Maps are in [`dm/maps/`](dm/maps/). The design record that binds the three modules together is [`campaign/SPINE.md`](campaign/SPINE.md).

## Make your own: the Forge

Open [`generator/index.html`](generator/index.html). Pick *Tower* or *Ravine*, give it a seed, and it builds a keyed dungeon with a map. The lesson ladder is fixed; the rooms, monsters and treasure are rolled from original tables. The same seed always gives the same dungeon, so a table can share one by number.

## Play the demo

Open [`demo/index.html`](demo/index.html) in a browser. Pick one of six characters, play their intro at The Fort, then row to the island and make the first descent into the Drowned Tower. The demo keeps the dungeon clock on screen, so a new player learns light, time, doors, and wandering monsters by spending them.

Test it with `node demo/test.mjs` (needs Playwright and Chromium).

## Play the crawler

[`crawler/`](crawler/) is a first-person party crawler for phones, with the Drowned Tower as its first pack: build it with `node crawler/tools/build.mjs crawler/packs/drowned-tower` and open `crawler/dist/drowned-tower.html`. See [`crawler/README.md`](crawler/README.md).

## For programming classes: The First Delve

[`classroom/`](classroom/) holds the first descent into the Drowned Tower as a console game in **Python and C++**, built up in seven stages: variables, choices, loops, functions, arrays, structs and the room graph, then breadth-first search. Each stage runs on its own. Given the same seed and inputs, the Python and C++ versions print the same text byte for byte. Each stage has a PRIMM activity (Predict, Run, Investigate, Modify, Make), test vectors, and the common mistakes for that concept. Start with [`classroom/README.md`](classroom/README.md).

## For players

Start with [`player/Players_Guide_The_Fort.md`](player/Players_Guide_The_Fort.md), then pick a playbook in [`player/`](player/). The Fighter, the Elf, and the NPC Minister are in [`player/npc/`](player/npc/); a player can take the Fighter or the Elf, and the GM runs the Minister if no one plays the Elf Minister.

## Working on this repository

Read [`AGENTS.md`](AGENTS.md) first. It says where canon comes from, the rules that are easy to break, the house style, and the checks to run before you push. [`CLAUDE.md`](CLAUDE.md) points Claude Code at it.

## Sources and homage

Modules 2 and 3 are glosses. Module 2 follows the shape of the ruined-tower sample dungeon in the 1977 Basic rulebook. Module 3 follows the shape of the cave-lair ravine in module B2. Those books belong to Wizards of the Coast and are not open content. We took their structure, which is free, and wrote every name, room, map and line of text new for this setting. Monster statistics follow the B/X conventions as published in Old-School Essentials.

## Licence

MIT. See [`LICENSE`](LICENSE).
