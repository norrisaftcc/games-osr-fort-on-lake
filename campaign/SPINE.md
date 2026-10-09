# Campaign Spine: The Lesson Ladder

*The design record for three teaching dungeons set around The Fort. Writers of every module and of the demo read this first. When a module and this file disagree, this file wins until someone changes it here.*

---

## What We Are Building

Three B/X dungeons, played in order. Each one teaches the dungeon craft that the next one assumes.

| # | Module | Gloss on | Levels | Teaches |
|---|--------|----------|--------|---------|
| 1 | *The Petrified Caves* (done) | — | 1 | Look, talk, fight, explore, cooperate. One dungeon, one session. |
| 2 | *The Drowned Tower* | The ruined-tower sample dungeon of the 1977 blue Basic book | 1–2 | Time, light, doors, mapping, wandering monsters, retreat and return. A dungeon is a place you visit more than once. |
| 3 | *The Ravine of Mouths* | The cave-lair ravine of module B2 | 1–3 | Reaction, morale, factions, parley, alarm, expedition supply. A dungeon is a society. It ends in **the Temple of the Unwritten**, the gloss on the chaos temple, which tests everything at once. |

Plus a **dungeon generator** (the Forge, below) and one **playable demo**: a single HTML page. The player picks one of the six playbook characters, plays that character's intro at The Fort, then plays the first rooms of the Drowned Tower. The demo teaches the first lesson of Module 2 by doing it.

---

## Rules for Writers

### 1. The IP rule (load-bearing)

The two source dungeons belong to Wizards of the Coast. Neither is open content. We take **ideas and structure**, which are free. We do not take **expression**, which is not.

| We may | We may not |
|--------|------------|
| A ruined tower over a cellar dungeon that opens on a water cave used by smugglers | The names *Zenopus*, *Portown*, *Thalagram*, *Lemunda*, *Keep on the Borderlands*, *Caves of Chaos*, *Shrine of Evil Chaos*, or any other proper name from either book |
| A ravine of cave mouths, each a lair of a different humanoid clan, rising to an evil temple | Their room keys, their maps, their read-aloud text, their NPCs, their specific room contents |
| Generic B/X monsters (kobold, goblin, orc, hobgoblin, gnoll, bugbear, ogre, owlbear, skeleton, zombie, ghoul, giant rat, giant crab) with stats in the OSE/B/X house format | Copying a room's contents in a new order and calling it new |
| Saying in a module's front matter what it glosses, as homage | Their trade dress, their art, their cartography |

Write every room fresh. If a room reads like the original with the nouns changed, cut it and write a room that only this setting could have.

### 2. House style

Match the existing `dm/DM_Guide_Fort_and_Caves.md`. Read it before you write.

- Plain words. Short sentences. One idea in each. Concrete nouns. No filler, no "delve into", no "tapestry".
- Tables for anything a DM looks up at the table. Prose for what a DM reads once.
- Every keyed area has: a header table (Size, Light, Exits, Encounter), a **Read aloud** box of two to four sentences, a Feature table, a stat block if there is a fight, and a **What This Room Teaches** line. Add a **Design Note** where the reason for a choice is not obvious.
- Stat block format, ascending AC in brackets:

  | HD | AC | ATK | MV | ML | Save | HP | XP |
  |----|----|-----|----|----|------|----|----|
  | 1-1 | 6 [13] | 1 × weapon (1d6) | 60' | 7 | 0 | 3, 4, 2 | 5 each |

  Give rolled HP per creature so the DM does not roll at the table. Use B/X/OSE values.
- The world is post-imperial. Old machines and old magic are the same thing seen from two sides. Monsters wear imperial scrap. Nothing is from a generic fantasy catalogue without a reason to be here.
- Each module ends with **The Fort Reacts** (what changes at home) and a **Rumors** table (d8 or d10, marked true, partly true, or false).

### 2a. Patterns taken from *Floor 31*

*Floor 31* is a sister scenario, a five-room AlgoCratic OSR floor on OSE rules. Four of its patterns carry over:

| Pattern | What it is | Where it goes here |
|---------|-----------|--------------------|
| **The Plan / Execute gate** | Each room runs in two phases. In **Plan**, players talk, look and ask. The DM answers honestly. No dice, and no time passes. In **Execute**, the caller says "Execute", plans lock, and each player states one action. If a player acts early, the DM asks once: "Is that your plan or your action?" | Module 2 teaches it in S1, as the hard edge of the exploration turn: looking is free, and acting is a declared choice that costs time. Modules 2 and 3 both use it. |
| **Intro hooks** | Players arrive with what their intro produced: one **public fact**, one **secret fact**, one **bond**. A table in the module maps each entry to the room where it lands. | Each module opens with an **Intro Hooks** table: playbook choice → where it lands. The demo ends by printing the character's three facts as a card to bring to the table. |
| **Mutual bonds** | Two characters whose bonds name each other each get 1 extra Fate this session. It can only be spent to help that partner. | Modules 2 and 3, in the Fate rules box. |
| **Running the party** | A table of changes by party size and by missing roles ("No cleric: …"). | Every module, near the end. |

Stat blocks use the full OSE line, as *Floor 31* does: AC, HD (with hp), Att, THAC0, MV with the encounter rate (`120' (40')`), SV, ML, XP. This replaces the shorter format in rule 2 below.

### 3. The cast

Use these characters in "Each PC's Moment" tables and in the demo. The old DM Guide names a Thief and a Hunter. They have no playbook. Do not use them.

| Character | File | Class | Fate ability |
|-----------|------|-------|--------------|
| The Wizard | `player/Playbook_Wizard.md` | Magic-User | *I've Read About This* |
| The Elf Minister | `player/Playbook_Elf_Minister.md` | Elf Cleric | *The Archives Are Deep* |
| The Half-Elf Paladin | `player/Playbook_Half_Elf_Paladin.md` | Half-Elf Paladin | *The Oath Remembers* |
| The Gnome Druid | `player/Playbook_Gnome_Druid.md` | Gnome Druid | *The Land Speaks* |
| The Fighter | `player/npc/Playbook_Fighter.md` | Fighter | *I Know How This Was Made* |
| The Elf | `player/npc/Playbook_Elf.md` | Elf | *I Remember When* |
| The Minister (NPC) | `player/npc/Playbook_Shrine_Maiden.md` | Cleric (DM-run) | *The Terminal Remembers* |

Rules base: OSE Advanced Fantasy, plus the playbooks' Fate Points (3 per character; reroll, +4 to a save, or cheat death for 2). Prompt Fate abilities before the DM describes a thing, not after.

---

## The Fort Country (canon)

The DM's hex map, *The Fort Country* (1 hex = 6 miles, art rule: Otus ink), fixes where things are. Its key, transcribed:

| Hex | Name | Key line | Used by |
|-----|------|----------|---------|
| D4 | The Fort | Home. Biddy guards the henhouse. | All |
| D3 | The Shallows | Fish by day. Singing at night. | Module 2 (the crossing) |
| D2 | Isle of Old Stone | A broken lamp-tower. A stair into the water. | **Module 2** |
| D1 | The Deep | No bottom. Halcyon lies below. | Module 2 hook: the Door Beneath the Lake faces it. Do not explain Halcyon. |
| E3 | The Reed Shore | The Quiet's stilt huts. | Module 2 (the Quiet know the lake; guides or witnesses) |
| C3 | The Weirs | Old fish traps. New stakes. | Module 3 (clan raids) |
| B3 | The Ridge | Cave mouths. No birds. | **Module 3** |
| B2 | The Gorgon Caves | Last year's dungeon. The skeleton master sits. | Module 1 |
| C4 | The Old Road | A humming milestone. | Module 3 (the Readers' route) |
| B5 | The Webwood | Giant crab spiders. Something larger sleeps. | — |
| C5 | Boar Hollow | A hunter's lodge. A map nailed inside. | — |
| D6 | The Court's Door | A mushroom ring. Opens at each equinox and solstice. | — |
| E4 | The Fields | Fort farms. A new well. | — |
| E5 | The Standing Stones | Nine stones, one fallen. | — |
| F4 | Mile-House 13 | A red-painted B.I.A. way station. | — |
| F5 | The Tin Dozen | Twelve deserters. They want salt. | — |

The fishing village lies one day east of the map. Hexes without a key line: roll d8 for texture and d8 for encounters (tables in a DM Guide not yet in this repo). Do not expand a key line beyond what it says unless the module needs it; never explain Halcyon, the B.I.A., or the Court.

**Map style for module maps:** match this sheet. Black ink on cream paper, no blue. Small-caps serif title rule, "DM COPY" and scale in the top right, keyed areas as white numerals in black circles, a plain legend. Otus ink: dense, hand-feeling linework.

---

## Pedagogy: Low Threshold, No Ceiling

Three ideas from Papert's Logo work shape how the modules teach.

| Idea | What it means here |
|------|-------------------|
| **Low threshold, no ceiling** | A new player can act in the first minute with no rules read. An old hand finds depth in the same room. Every room has an obvious action and a clever one. |
| **Body-syntonic learning** | Children learned geometry by being the turtle: FORWARD 50, RIGHT 90, not x and y. Our players learn dungeon space the same way. The DM describes moves **relative to the party's facing** ("the passage runs 30 feet ahead, then bends right"), and the mapper draws like a turtle. Module 2's mapping lesson is **Turtle Mapping**: a sidebar with the DM's call pattern and a worked example. |
| **Constructionism** | People learn best by making a thing they can hold. The players' map is that thing. So is the Intro Card. The module tells the DM to let the players' map be wrong and to let them find out by walking it. |

A sidebar in Module 2, **The Turn Is a Procedure**, writes the exploration turn as a short Logo-style procedure (`TO TURN … END`: plan, execute, tick the clock, check for wanderers, repeat). It is for tables that include programmers or students, and for the DM who wants the loop in one look.

---

## Procedural Generation: The Forge

The two source dungeons give us **templates**, not content: *a ruined tower over cellars over a water cave*, and *a cleft of lair-caves that rises to a temple*. A template is an idea, and ideas are free. A generator makes the line between structure and expression plain. It also gives every table its own dungeon.

The rule: **the lesson ladder is fixed, the content is rolled.** A generated tower always teaches light, searching, doors, wanderers, mapping (a loop, a dead end, a shortcut secret door), retreat, a readable history, a first parley, a hazard, and a climax that rewards what was learned, in that order of depth. A generated ravine always climbs morale → reaction → factions → alarm → deception → avoidance → temple. What fills each slot comes from our own tables.

| Piece | Path | Does |
|-------|------|------|
| The Forge page | `generator/index.html` | Pick *Tower* or *Ravine*, enter a seed, get a keyed dungeon in the house format and a map in the Otus-ink style. Print it or copy it as Markdown. |
| The engine | `generator/forge.js` | Pure functions, seeded RNG, no DOM. Runs in the browser and in Node. |
| The tables | `generator/tables.js` | Every rollable list, in plain data. Original text only; this file is where a GM or a student adds their own. |
| The checks | `generator/test.mjs` | Generates hundreds of seeds and checks the invariants: connected, exits reciprocal, every lesson slot present in order, the secret door really shortens the path, no overlapping rooms, every fight has hp and XP, no forbidden names. |

The authored modules are the reference: a generated dungeon should read like a rougher cousin of Module 2 or Module 3, never like the source books. The Forge is also a teaching artifact in its own right, for CS students: low threshold (change a table, press Generate) and no ceiling (write a new template).

---

## Science Fantasy, Floor 31 Shape

*Floor 31* is the model for the kind of adventure we want: science fantasy on OSE rules. The Fort's world already is one; the modules should lean in, not hedge.

- **Name the machine side plainly.** A ward is a sensor eye and a spell at once. The Warden's collar is a control collar. The Lampwright's lamp is a lamp, a beacon and an instrument. A hymn is a protocol. Players may treat any of these as magic or as machinery, and both readings work at the table.
- **A job with a clock and two buyers.** Floor 31 gives the party one night, a prize, and two people who want it for opposite reasons. Each module states its clock (what happens if the party is slow) and ends on a choice between buyers or uses, none of them correct.
- **Teach a procedure the first time it matters, not before.**
- **Art reference per major room.** One blockquote, two or three sentences: palette, line style, what is in frame. House art rule from the hex map: Otus ink, black on cream. A climax room may name a painted exception, as Floor 31 does.

## Play Record (canon from the table)

| Session | What happened | What it fixes |
|---------|---------------|---------------|
| Module 1 | **The Gorgon Queen was defeated by a cockatrice.** | The queen is stone, turned by the very creature whose eggs Harrow buys. Read this as the "petrified" branch of Module 1's outcome table: the wards stay lit, she is contained, not destroyed. Word spreads that a cockatrice can beat a gorgon. That is why the eggs are now worth more, and why the Readers want them. |

The repo's Module 1 text calls her the Basilisk Queen and the hex map calls the site the Gorgon Caves. Use **the Gorgon Queen** in new writing.

## The Throughline

One thread runs through all three dungeons. Each module can be played alone, but each one leaves a clue that points to the next.

1. **Module 1.** The Gorgon Queen sat under imperial wards. In play, a cockatrice defeated her; she is stone and the wards still glow. Harrow buys cockatrice eggs and will not say for whom.
2. **Module 2.** Harrow's buyers are **the Saltmen**, smugglers who use the grotto under the island tower as a cache. Their ledger shows eggs going up the Old Road to "the Readers" on the Ridge. Under the grotto is **the Door Beneath the Lake**, sealed with the same eye-wards as the basilisk's chamber. The Elf Minister's warning (*"must not open the door beneath the lake"*) is about this door. **Nobody opens it in Module 2.** It is a campaign hook, not a room.
3. **Module 3.** The clans of the Ridge have started to raid: new stakes at the Weirs (C3), tracks on the Old Road (C4). The clans are paid and bullied by **the Readers of the Unwritten**, a cult that holds the Temple at the head of the ravine. Their temple holds a dark Terminal. It shows the hymns reversed. The Readers want the eggs to make stone guardians and want the door beneath the lake opened. Their map of the island is in the temple.

### The Readers of the Unwritten

Chaos in this setting is not demons. It is noise. The Terminal network kept a song in order; the Readers believe the song is a cage and that unwriting it sets something free. They read the hymns backwards. Their leader is **Reader Sarn** (evil Cleric 5). They are polite, educated and sure.

---

## Module 2: The Drowned Tower — Pinned Facts

The lake island holds the stump of an imperial tower. The empire called it **Lamp Station Nine**. Locals call it the Drowned Tower because its lower floors are under the waterline. It was a lighthouse and an observatory for the lake, built to watch the door below. Its last keeper was the imperial magister **Ostrel Vane, the Lampwright**. His bones and notes are in the cellars.

Getting there: the Isle of Old Stone is hex D2, about 12 miles north of The Fort across the Shallows (D3). Half a day by rowboat (four to five hours), less under sail. The party arrives in the afternoon or camps on the isle; that is part of the time lesson. The island is half a mile across, rock and pine. The Door Beneath the Lake faces north, toward the Deep (D1).

**Three tiers:**

| Tier | Name | Areas | Holds |
|------|------|-------|-------|
| Surface | The Island | S1–S5 | Jetty, tower shell, keeper's cottage, the lamp-stones at the shore, the north cliff over the grotto |
| Level 1 | The Lamp Cellars | C1–C12 or so | Store rooms, rats, the tower's dead (skeletons in imperial kit), the ward room, the Lampwright's study, a stair to the flooded level, a Saltmen guard post at the far end |
| Level 2 | The Grotto | G1–G8 or so | Flooded caves, the Saltmen's dock and cache, their boss **Ketter Vosk**, the ledger, **the Warden** (a giant catfish in a bronze imperial collar, bound to guard the door), and the sealed Door Beneath the Lake |

**Pinned demo rooms.** The demo plays these. The module must key them with the same names and facts. The module may add detail. It may not contradict.

| Key | Name | Facts the demo uses |
|-----|------|---------------------|
| S1 | The Broken Jetty | South shore. Stone jetty, half collapsed. A fresh rope burn on a mooring post: someone else lands here. Something large moves under the water past the end of the jetty and is gone. |
| S2 | The Tower Shell | Round tower, 30' across. The upper floors fell in. A stair climbs the inside wall to a broken top 40' up. Crows. Rubble on the floor hides a trapdoor. Searching the rubble takes one turn and finds it. The stair top gives a view of the whole island and of a boat-shaped shadow at the north cliff. |
| S3 | The Keeper's Cottage | Stone cottage beside the tower, roof gone. A hearth with ash less than a week old. A tin of lamp oil (two flasks). A chalk mark on the door: an eye with a line through it (a Saltmen sign meaning "keep out"). |
| C1 | The Cellar Stair | Under the trapdoor. Stone stair down 20'. At the bottom a **stuck** oak door. Listening at it: 1-in-6 (demi-humans 2-in-6) hears scratching and squeaks. Forcing: 1–2 on d6 (STR adjusts). Each try makes noise. |
| C2 | The Oil Store | 30' × 20'. Racks of broken oil jars. **Giant rats ×5** (HD ½, AC 7 [12], bite 1d3, MV 60', ML 8, HP 2, 3, 1, 4, 2). They flee at 2 dead. Five flasks of oil still sound in one rack. |
| C3 | The Flooded Stair | A stair keeps going down into black water. Water rises one step a turn when the lake is restless. **The demo ends here.** |

**Pinned teaching rules for Module 2:** one turn = 10 minutes. A torch burns 6 turns, a lantern flask 24. Check for wandering monsters every 2 turns (1-in-6). Rest one turn in six or take –1 to hit and damage. Searching a 10' square takes one turn. These rules should appear as a one-page **Dungeon Clock** sheet in the module, written for a first-time DM.

**Lesson order for Module 2** (rooms should teach these, roughly in this order as the party goes deeper):

1. Marching order and light (S1)
2. Searching costs time (S2, S3)
3. Listening and doors (C1)
4. The clock is a monster: wandering checks (C2 onward)
5. Mapping: a loop, a dead end, a secret door that shortens the map
6. Resources run down: retreat, rest, return. The dungeon notices (restock table between visits).
7. Reading a site's history (the Lampwright's study)
8. The first parley: the Saltmen guard post. Introduce the reaction roll (2d6) here, lightly.
9. Water and hazard as obstacles, not damage-dealers
10. The climax rewards earlier choices: what the party learned in the study changes the Warden fight

---

## Module 3: The Ravine of Mouths — Pinned Facts

The Ravine of Mouths is a cleft in **the Ridge**, hex B3, about 12 miles northwest of The Fort by way of the Weirs (C3) or the Old Road (C4). Half a day on foot. Hex B2 beside it holds last year's dungeon, the Gorgon Caves. The Ravine's walls are dotted with cave mouths, each a lair; no birds nest on the Ridge. A footpath climbs the ravine floor. The Temple of the Unwritten is at the top, in an imperial building half-buried in the hill. The Fort itself is the home base, half a day back, as the Keep is in the source; there is no forward camp. Getting loot home, and the clans moving while the party is away, are the supply lesson.

**The lairs, in teaching order (low to high up the ravine):**

| Key | Lair | Clan | Lesson |
|-----|------|------|--------|
| A | First Mouth | Kobolds | Morale. Enemies run. A first fight that ends early if you let it. A trapped entrance. |
| B | Second Mouth | Goblins, with a hired ogre | The reaction roll and parley. The ogre can be bought. |
| C, D | The Twin Mouths | Two orc bands who hate each other | Factions. Play them off each other. Who you help changes the map. |
| E | The Barred Mouth | Hobgoblins holding prisoners | Alarm and reinforcement. The dungeon responds. A rescue under time pressure. |
| F | The Smiling Mouth | Bugbears who feign hospitality, with gnoll hirelings | Deception. Read the table, not the words. |
| G | The Wet Mouth | An owlbear | Avoidance. Not every lair is worth its cost. |
| H | The Temple of the Unwritten | The Readers, their undead, Reader Sarn | Everything at once. Turning undead, traps, a cult leader who talks, the dark Terminal, and a final choice. |

Between lairs: the ravine reacts. Clans reinforce, move, ally, or flee based on what the party did. The module needs a **Ravine Reacts** table and a wandering monster table that changes as clans fall.

The two halves of Module 3 are written as two files:

- `dm/Module_3_The_Ravine_of_Mouths.md` — overview, the journey from The Fort, the ravine, lairs A–G, faction web, ravine reacts.
- `dm/Module_3_Part_2_The_Temple_of_the_Unwritten.md` — lair H in full, the dark Terminal, the final choice, and the campaign ending.

**The final choice at the dark Terminal** (pinned, both files agree): the party can **smash it** (a node of the network dies; The Fort's Terminal goes quiet for a week, then shows a new line), **reclaim it** (the Minister or Paladin re-sings it into order; costly; the Readers' survivors become enemies of The Fort forever), or **read it** (a PC learns where the Door Beneath the Lake leads; the DM decides the cost). No answer is correct.

---

## The Demo: Pinned Shape

One file, `demo/index.html`. No build step, no network, no libraries. Opens from disk in a browser. Works at phone width.

1. **Pick a character.** Six cards: Wizard, Elf Minister, Half-Elf Paladin, Gnome Druid, Fighter, Elf.
2. **Their intro** (3–5 short scenes at The Fort). Built from that playbook's read-aloud and its "Choose One" options: the player makes one or two of those choices in play, and the choice is remembered and comes back later. The Minister (NPC) and Captain Maren appear. Every intro ends at the docks with the Captain's job: row to the island, find out who lands there and what moves in the water.
3. **The shared delve:** S1, S2, S3, C1, C2, C3 exactly as pinned above. The demo keeps the **Dungeon Clock**: turns pass, the torch burns down, wandering checks happen on screen. It shows HP, torch turns, and one Fate ability use. Fights use B/X numbers: d20 + bonus vs. AC, damage dice, morale.
4. **Ending:** at C3, the water rises; the screen says what the player learned (the lessons, named plainly) and points to the module.

A `demo/SPEC.md` describes the scene graph and flags, in the same way as `team-ycbbb/spooks/mirror-universe/SPEC.md`. A `demo/test.mjs` (Node, Playwright) walks every path and fails on a dead scene, a console error, or an unreached scene.
