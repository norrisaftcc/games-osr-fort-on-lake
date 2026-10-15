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

Use these characters in "Each PC's Moment" tables and in the demo. **Year Two's real party** is the gnome druid, the elven thief and the elf cleric of the Sacred Terminal (the Elf Minister playbook). The elven thief has no playbook in this repo yet; until one exists, modules do not give the thief a moment. The Paladin is now an NPC (Warden of the Gate, Maren's heir), and the Glamourist, a fae, was a Year One PC.

| Character | File | Class | Fate ability |
|-----------|------|-------|--------------|
| The Wizard | `player/Playbook_Wizard.md` | Magic-User | *I've Read About This* |
| The Elf Minister | `player/Playbook_Elf_Minister.md` | Elf Cleric | *The Archives Are Deep* |
| The Half-Elf Paladin | `player/Playbook_Half_Elf_Paladin.md` | Half-Elf Paladin | *The Oath Remembers* |
| The Gnome Druid | `player/Playbook_Gnome_Druid.md` | Gnome Druid | *The Land Speaks* |
| The Fighter | `player/npc/Playbook_Fighter.md` | Fighter | *I Know How This Was Made* |
| The Elf | `player/npc/Playbook_Elf.md` | Elf | *I Remember When* |
| The Minister (NPC) | `player/npc/Playbook_Shrine_Maiden.md` | Cleric (DM-run) | *The Terminal Remembers* |

Rules base: OSE Advanced Fantasy, plus the playbooks' Fate Points (3 per character; reroll, +4 to a save, or cheat death for 2). Prompt Fate abilities before the DM describes a thing, not after. Year Two adds: a Fate point spent with a spell or an N/day power also gives the player authorship of part of its effect, and Fate refreshes at each Fort Turn.

**The players read 5e; the DM runs OSE.** Write every stat block in OSE first, then **one line** of 5e note under it, using the DM Guide's conversion: HD n → CR about n/2; ascending AC [x] → AC x; save vs. Death or Poison → CON save DC 12; save vs. Petrify → CON save DC 13; ML 7 or lower → flees at half HP. Format: `*5e: CR 1/4 · AC 12 · hp 2, 3, 1 · bite +0 (1d3) · flees at half HP.*`

---

## The Fort Country (canon)

The DM's hex map, *The Fort Country* (1 hex = 6 miles, art rule: Otus ink), fixes where things are. Its key, transcribed:

| Hex | Name | Key line | Used by |
|-----|------|----------|---------|
| D4 | The Fort | Home. Biddy guards the henhouse. | All |
| D3 | The Shallows | Fish by day. Singing at night. | Module 2 (the crossing) |
| D2 | Isle of Old Stone | A broken lamp-tower. A stair into the water. | **Module 2**. The isle is *the roof of Halcyon*. The Door Beneath the Lake is on the grotto's north side, facing the Deep. |
| D1 | The Deep | No bottom. Halcyon lies below. | Halcyon's drowned avenues. **Year Two's main site**, keyed in the Year Two DM Guide, not here. |
| E3 | The Reed Shore | The Quiet's stilt huts. | Module 2 (the Quiet know the lake; guides or witnesses) |
| C3 | The Weirs | Old fish traps. New stakes. | Module 3 (clan raids) |
| B3 | The Ridge | Cave mouths. No birds. | **Module 3** |
| B2 | The Gorgon Caves | Last year's dungeon. The skeleton master sits. | Module 1 |
| C4 | The Old Road | A humming milestone. | Module 3 (the Readers' route) |
| B5 | The Webwood | Giant crab spiders. Something larger sleeps. | — |
| C5 | Boar Hollow | A hunter's lodge. A map nailed inside. | — |
| D6 | The Court's Door | A mushroom ring. Opens at each equinox and solstice. | The Glamourist's door to the Fae court. |
| E4 | The Fields | Fort farms. A new well. | — |
| E5 | The Standing Stones | Nine stones, one fallen. | — |
| F4 | Mile-House 13 | A red-painted B.I.A. way station. | The B.I.A. is the **Bureau of Imperial Anomalies**: two teen "Junior Men in Red" agents, polite and wrong about many things. |
| F5 | The Tin Dozen | Twelve deserters. They want salt. | — |

The fishing village lies one day east of the map. Hexes without a key line: roll d8 for texture and d8 for encounters (tables in the Year Two DM Guide; see **Year Two Canon** below). The Year Two DM Guide is the authority on every hex. Modules may name Halcyon, the B.I.A. and the Court as it defines them, but must not key Halcyon or spoil **the Sleeper** in anything a player reads.

**Map style for module maps:** match this sheet. Black ink on cream paper, no blue. On screen (the Stage), a reader may toggle maps to Blueline blue; black on cream stays the default and the print style. Small-caps serif title rule, "DM COPY" and scale in the top right, keyed areas as white numerals in black circles, a plain legend. Otus ink: dense, hand-feeling linework.

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
| Module 1 | **In the Gorgon Caves, the Fae player declared the skeleton Petra's master and domesticated a cockatrice chick. The chick's cry paralysed the Gorgon Queen (the basilisk).** | A cockatrice stopped a gorgon. Word spread. That is why eggs sell high, and why the Readers want them. Do not write that she was "turned to stone". |
| Module 1 (assumed) | The Year Two DM Guide marks these as **ASSUMED, replace freely**: the basilisk is dead; Petra is flesh again and sleeps a lot; the skeleton "master" still sits in the Gorgon Caves and the Glamourist visits it; the iron cage in the Beast Pen is empty. | Write so that a DM can change these. Where a module needs a state, use the assumed one and say it is assumed. With the queen dead, Module 1's outcome table says her wards went dark. |
| Module 1 | **The cockatrice is Biddy.** She lives in the Beast Pen and guards the henhouse. Wick keeps her. Everyone keeps clear of her beak. | Vosk, Harrow and the Readers all know a buyer would pay a fortune for her. |
| The Year Between | A one-year prologue played with *The Year Between* zine (in the "Fort on the Lake: Maps and Handouts" canvas). The Fort tracks **Stores, Walls, Folk, Lamp** (0–6 each; start 4/3/4/2), its **Size** (Camp, Hamlet, Village by Folk), a **Surplus**, a **Want** with Strain, an **Oath**, an **Enmity**, and **Footnotes** the DM must use. The Pen: the druid in Spring, the thief in Summer, the cleric in Autumn, all three in Winter. | Year Two opens with the Fort's holdings set by that year. Each module's **The Fort Reacts** table should read as changes to those tracks and tags. |

The repo's Module 1 text calls her the Basilisk Queen and the hex map calls the site the Gorgon Caves. Use **the Gorgon Queen** in new writing.

## Year Two Canon

Source: *Fort on the Lake, Year Two — DM Guide* and *Player Guide* (2026-10-09). They are the authority. This section is a summary for writers; when it and the guides disagree, the guides win.

| Topic | Canon |
|-------|-------|
| **PCs** | The gnome druid, the elven thief, the elf cleric of the Order of the Sacred Terminal. Each picks a *Year of Change* and a *Fort Office* (Warden, Scout, Steward, Lorekeeper). |
| **NPCs** | The Paladin (Warden of the Gate, Maren's heir). The Glamourist (fae; visits at solstice and equinox). Captain Maren (retiring). The Minister. **Lintel** (a damaged stone golem, a walking Terminal, Halcyon's maintenance steward; the DM's GMPC once woken). **Cassandra** (seer at the Shrine; true rumors, half-riddled; hints that ask questions). **Wick** (age 12, lamplighter, keeps Biddy, counts everything; do not put him in danger lightly). |
| **Halcyon** | The drowned lamp-city under the lake: an imperial node of the Terminal network. Year Two's main site, on the B4 lost-city pattern (factions hold districts and keys). Three ways in: the Isle stair (D2), the Quiet's dive (E3), the outflow tunnel (C3). Its vault holds **the Sleeper**, a vast, kind mind; the Fort's Terminal is its mouth. Do not spoil the Sleeper to players. |
| **Factions** | The Quiet (lake-folk who pray to the kingfisher), the B.I.A. (Mile-House 13), the Lamp Wardens (brass automata), the Fae Court, and the Fort itself (Maren against the Minister). |
| **The Fort Turn** | Four times a year: season card, report, two Directives (Build, Defend, Trade, Explore, Tend), Fate facts, a d12 event, refresh. Tracks Stores, Walls, Folk, Lamp. |
| **The gate** | The DM says the mode: **Planning** (talk, maps, Fort decisions) or **Execution** (dice and consequences). A player cannot undo an Execution result. Our "Plan / Execute gate" is the same rule at room scale; use the guide's words, *Planning* and *Execution*, when writing for this table. |
| **Puzzles** | The brothers like math. The math is the way through, not a lock on the story. A puzzle has a rule players can find by trying, gives feedback, and never blocks the game; a Fate point or Cassandra gives one hint. |
| **Art rule** | Two looks, named in each entry: **Elmore** (colour oil paint) for characters, monsters and hero scenes; **Otus** (black-and-white ink) for dungeon interiors, weird machines, occult rooms, maps and handouts. Spot art in the Steinberg manner for Fort Turn pages. |

**How our modules sit beside Year Two.** The modules are teaching dungeons. A new table can play them in order; Year Two's table can use them as side sites. Module 2's Isle of Old Stone is the roof of Halcyon, and its Door Beneath the Lake is one face of the Isle way in. The Readers of the Unwritten (Module 3) believe the hymns are a cage; what they want to free is the Sleeper. They are wrong about what it is, and right that it is there.

## The Throughline

One thread runs through all three dungeons. Each module can be played alone, but each one leaves a clue that points to the next.

1. **Module 1.** The Gorgon Queen sat under imperial wards. In play, a cockatrice chick's cry paralysed her (assumed since: she is dead, and her wards went dark). Harrow buys cockatrice eggs and will not say for whom.
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
| C2 | The Oil Store | 30' × 20'. Racks of broken oil jars. **Giant rats ×5** (HD ½, AC 7 [12], bite 1d3, MV 120' (40'), swim 60' (20'), ML 8, HP 2, 3, 1, 4, 2). They flee at 2 dead. Five flasks of oil still sound in one rack. |
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

The Ravine of Mouths is a cleft in **the Ridge**, hex B3, about 12 miles northwest of The Fort by way of the Weirs (C3) or the Old Road (C4). Half a day on foot. Hex B2 beside it holds last year's dungeon, the Gorgon Caves. The Ravine's walls are dotted with cave mouths, each a lair; no birds nest on the Ridge. A footpath climbs the ravine floor. The Temple of the Unwritten is at the top, in an imperial building half-buried in the hill. The Fort itself is the home base, half a day back, as the borderland castle is in the source module; there is no forward camp. Getting loot home, and the clans moving while the party is away, are the supply lesson.

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

---

## Year Two PC Materials — Pinned Facts

Materials for the three Year Two PCs: a Year Two playbook each, a Badge Zero–style solo intro for each, and a first session for the party (issue #2). Writers of all three read this section; it wins over their own choices.

### Common to all three

| Item | Pinned |
|------|--------|
| **Level** | 2 by default. The DM may set another. Playbooks show levels 1–4. |
| **House conventions** | Keep the Year One playbooks' conventions: cleric and druid have one spell at level 1; XP to the next level is the class base plus the race surcharge, as the Year One playbooks state it. |
| **Fate** | 3 points; refresh at each Fort Turn and at the start of a session. Spend 1: reroll; +4 to a save; or state one true fact in your lane. Spend 2: cheat death. **Year Two:** spending 1 with a spell or an N/day power also lets the player write part of its effect. |
| **The Fort Card** | Replaces Badge Zero's badge. Fields: name; class and level; 3d6 in order; HP; AC; THAC0; saves; Year of Change; Fort Office; Fate ability and lane; **public fact** (typed, one sentence); **secret fact** (typed, one sentence); **bond**; gear; class block (thief skills, or spells); a **5e line** for players who read 5e. |
| **Registers** | **Elmore paint** = witnessed: the Fort will hear of it, and the public fact comes from such a scene. **Otus ink** = unwitnessed: nobody tells the Fort, and the secret fact comes from such a scene. A private moment with Cassandra or alone at the Terminal is ink; it becomes paint only if it is done before the Fort. |
| **The Terminal's voice** | The Terminal never speaks as a mind. Its glass prints machine output: no *I*, no feeling, no *I see you*. Narration is different: it may say how the Terminal seems to a person. The elf cleric's Fort Card option *A name* says the Terminal "knew who you were", "had been waiting for you" and "keeps a list of names it is waiting for". These lines are narration and stay as written (DM decision, 2026-10-15). They are the cleric's reading, not the Terminal's words. Do not move such a line onto the glass. |
| **Bonds** | Each card names one bond: another PC, or an NPC (Cassandra, Wick, the Paladin, Maren, the Minister, the Glamourist, Biddy). Mutual PC bonds give each 1 extra Fate, spent only to help that partner. |
| **Year of Change** (Player Guide; proposed numbers, marked for the DM to confirm) | **Gnome:** *Green Hand*: plants grow faster near you; once a year, Stores +1 at a Fort Turn. *Lake-Speaker*: once a day, ask the fish or the birds one question; they answer truly, as far as they know. *Small Friend*: a small animal follows you (a stoat, a crow or a toad; HD ½, 1 hp, cannot fight); once per hex it scouts ahead and the party cannot be surprised there. **Thief:** *Locksmith's Eye*: once per room, ask the DM one question about a lock or a trap; the answer is true. *Quiet Feet*: Move Silently +20%, and old stone never gives you away. *Fence*: Trade directives roll +1, and loot sells for 10% more. **Cleric:** *Hymn of Rest*: when you sing at camp, each ally who rests heals 1d4 extra, once a night. *Hymn of Calling*: once a season, read the Terminal and ask it one question; the DM answers truly and briefly. *Lake Stone*: your holy symbol tingles within 30' of old machines. |
| **Fort Office** (Player Guide) | *Warden*: Walls +1 when you take the Defend directive. *Scout*: one extra clue per hex you explore. *Steward*: you see the Fort's tracks before the DM reports them. *Lorekeeper*: one free hint per puzzle. |
| **5e** | Player-facing: a "For 5e players" box in each playbook and a 5e line on each card, in the DM Guide's terms. DM-facing stat blocks: the full OSE line plus one 5e line. |
| **Privacy** | Nothing about the real players goes in any file. |

### The three PCs

| PC | Playbook (Year Two) | Base | Fate ability | Pinned |
|----|--------------------|------|--------------|--------|
| **The elven thief** | `player/year-two/Playbook_Elven_Thief.md` (new) | OSE Advanced: Thief class, Elf race. Thief skills at L1–4 from OSE; backstab +4 to hit, ×2 damage. Elf: infravision 60', immune to ghoul paralysis, detect secret doors 2-in-6 when searching, hear noise 2-in-6. | ***I Was Already Here*** (named in Module 1's DM Guide): declare one true fact about a place before the DM describes it, as if you scouted it earlier. | Year One: was in the Gorgon Caves. Holds the Pen in Summer of the Year Between. |
| **The elf cleric** of the Order of the Sacred Terminal | `player/year-two/Playbook_Elf_Cleric.md` (Year Two update of `Playbook_Elf_Minister.md`) | As the Elf Minister playbook. | ***The Archives Are Deep*** (from the Elf Minister playbook). | Holy symbol: a smooth grey **lake stone**; the Terminal knew it. Do not say why (Lintel, the Quiet's claim and the Sleeper belong to the DM Guide). Holds the Pen in Autumn. |
| **The gnome druid** | `player/year-two/Playbook_Gnome_Druid.md` (Year Two update) | As the Gnome Druid playbook. | ***The Land Speaks*** (from the Gnome Druid playbook). | Year One choice *"I heard the Terminal from underground"* stays available. Holds the Pen in Spring. |

### Solo intros (`intro/index.html`)

One offline page, Badge Zero pattern, five scenes per PC (the elf cleric plays eight: *Seven Nights at the Terminal*, *The Two Keepers* and *Cassandra's Question* are hers alone), 10–20 minutes each: (1) a Year One memory (origin), (2) the Year Between (Year of Change), (3) a witnessed or unwitnessed scene that produces the typed fact, (4) the Fort Office, (5) the bond and the kit. Then the card, HP roll, session-zero retcon, text export, print layout. Every intro ends at the same image: **the milestone on the Old Road hums, and Cassandra says one true thing to each of them.**

### First session (`dm/Year_Two_First_Session_The_Hum.md`)

Seeds 1 (*The Hum*, C4) and 10 (*The Hunter's Map*, C5) lead to the **outflow tunnel** (C3), "dry, long, and trapped", which opens near the Eval Chamber. Five keyed rooms, Floor 31 shape: a clock, two buyers (the B.I.A. at Mile-House 13 want the tunnel sealed and the map filed; the Quiet want the water to keep running past their shrines), and an ending with no correct answer. One **new** math puzzle that follows the puzzle rule and is not one of Halcyon's three (not function memory, not binary, not balance weights). Each PC's Year of Change and Fort Office has somewhere to matter. The session stops at the inner door; it does not enter Halcyon. Party: the three PCs at level 2, with a "Running the Party" table for adding the Paladin.

### The Brush: science fantasy as an invitation

Year Two tests whether the players want a science-fiction setting. So the science fantasy **brushes against** the Fort's world; it does not take it over.

- **Show the edge; do not push through it.** Old machines appear at the edge of things: a hum in a milestone, a lamp that should not still burn, a screen that answers once. Each appearance is short, concrete, and can be left alone.
- **Let each player choose the reading.** Where a scene shows the machine side, offer a choice between reading it as mystery (hymn, ward, spirit) and reading it as mechanism (signal, lock, engine). Both are true. The choice goes on the Fort Card as the **Lens** field, so the DM can see, card by card, who leans toward the machine.
- **Follow the players.** In the first session, every machine element has two depths: **brush** (seen, named, left) and **lean in** (opened, explained a little, with a reward). A DM table says how to play each element at each depth. If the cards and the table lean in, Year Two can turn toward science fiction; if not, it stays fantasy with old ruins.
- **All choices are made in the playable intros**: Year of Change, Fort Office, the Lens, the facts, the bond and the kit. The playbooks are the reference for what each choice does; the intros are where players choose.
