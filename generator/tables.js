/*
 * tables.js — every rollable list the Forge uses, as plain data.
 *
 * This is the file to change. Add a line to any list, save, press Generate.
 * Text here is original, written for The Fort Country: a post-imperial world
 * where old machines and old magic are the same thing seen from two sides.
 * Name the machine side plainly: a ward is a sensor eye and a spell at once.
 *
 * Rules for entries:
 *  - Read-aloud text ("ra") is one or two complete sentences. The engine adds
 *    one sentence of dressing and sometimes one of sound or smell, so a room
 *    reads aloud in two to four sentences.
 *  - Features are [name, detail] pairs.
 *  - Words in {braces} are filled in by the engine: {clan}, {other}, {n}, {gp},
 *    {name}, {monster}. Leave them as they are.
 *  - Do not use names or contents from the source books (see campaign/SPINE.md).
 *
 * Loaded as a classic script (sets the global ForgeTables) and by Node (module.exports).
 */
var ForgeTables = {};

/* ------------------------------------------------------------------ */
/* MONSTERS: OSE / B/X source values. The engine rolls hp per creature. */
/* hp: [dice, sides, modifier]. xp is the OSE award per creature.       */
/* ------------------------------------------------------------------ */
ForgeTables.monsters = {
  giantRat:      { name: "giant rat", plural: "giant rats", ac: "7 [12]", hd: "½", hp: [1, 4, 0], att: "1 × bite (1d3 + disease)", thac0: "19 [0]", mv: "120' (40') / swim 60' (20')", sv: "D12 W13 P14 B15 S16 (1)", ml: 8, xp: 5, note: "A bite carries disease 1 time in 20 (save vs. poison)." },
  fireBeetle:    { name: "fire beetle", plural: "fire beetles", ac: "4 [15]", hd: "1+2", hp: [1, 8, 2], att: "1 × bite (2d4)", thac0: "18 [+1]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (1)", ml: 7, xp: 15, note: "Three glands glow red, 10' radius. They keep glowing 1d6 days after the beetle dies." },
  stirge:        { name: "stirge", plural: "stirges", ac: "7 [12]", hd: "1*", hp: [1, 8, 0], att: "1 × beak (1d3 + blood drain)", thac0: "19 [0]", mv: "30' (10') / fly 180' (60')", sv: "D12 W13 P14 B15 S16 (2)", ml: 9, xp: 13, note: "+2 to hit on the first dive. Once attached, drains 1d3 a round until killed." },
  giantCentipede:{ name: "giant centipede", plural: "giant centipedes", ac: "9 [10]", hd: "½*", hp: [1, 4, 0], att: "1 × bite (poison)", thac0: "19 [0]", mv: "60' (20')", sv: "D14 W15 P16 B17 S18 (NH)", ml: 7, xp: 6, note: "Poison: save or sick for 10 days (half speed, no fighting)." },
  crabSpider:    { name: "crab spider", plural: "crab spiders", ac: "7 [12]", hd: "2*", hp: [2, 8, 0], att: "1 × bite (1d8 + poison)", thac0: "18 [+1]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (1)", ml: 7, xp: 25, note: "Surprise on 1–4. Poison: save at +2 or die in 1d4 turns." },
  skeleton:      { name: "skeleton", plural: "skeletons", ac: "7 [12]", hd: "1", hp: [1, 8, 0], att: "1 × weapon (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D12 W13 P14 B15 S16 (1)", ml: 12, xp: 10, note: "Undead: immune to sleep, charm, hold. Can be turned." },
  zombie:        { name: "zombie", plural: "zombies", ac: "8 [11]", hd: "2", hp: [2, 8, 0], att: "1 × weapon (1d8) or claw (1d8)", thac0: "18 [+1]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (1)", ml: 12, xp: 20, note: "Undead. Always loses initiative. Can be turned." },
  ghoul:         { name: "ghoul", plural: "ghouls", ac: "6 [13]", hd: "2*", hp: [2, 8, 0], att: "2 × claw (1d3 + paralysis), 1 × bite (1d3 + paralysis)", thac0: "18 [+1]", mv: "90' (30')", sv: "D12 W13 P14 B15 S16 (2)", ml: 9, xp: 25, note: "Paralysis 2d4 turns, save vs. paralysis. Elves are immune. Undead; can be turned." },
  giantCrab:     { name: "giant crab", plural: "giant crabs", ac: "2 [17]", hd: "3", hp: [3, 8, 0], att: "2 × pincer (2d6)", thac0: "17 [+2]", mv: "60' (20')", sv: "D12 W13 P14 B15 S16 (2)", ml: 7, xp: 35, note: "" },
  crocodile:     { name: "crocodile", plural: "crocodiles", ac: "5 [14]", hd: "2", hp: [2, 8, 0], att: "1 × bite (1d8)", thac0: "18 [+1]", mv: "90' (30') / swim 90' (30')", sv: "D12 W13 P14 B15 S16 (1)", ml: 7, xp: 20, note: "" },
  gelatinousCube:{ name: "gelatinous cube", plural: "gelatinous cubes", ac: "8 [11]", hd: "4*", hp: [4, 8, 0], att: "1 × touch (2d4 + paralysis)", thac0: "16 [+3]", mv: "60' (20')", sv: "D12 W13 P14 B15 S16 (2)", ml: 12, xp: 125, note: "Paralysis 2d4 turns, save vs. paralysis. Surprises on 1–4. Immune to cold and lightning." },
  bandit:        { name: "bandit", plural: "bandits", ac: "6 [13]", hd: "1", hp: [1, 6, 0], att: "1 × weapon (1d6)", thac0: "19 [0]", mv: "120' (40')", sv: "D13 W14 P13 B16 S15 (T1)", ml: 8, xp: 10, note: "First-level thieves. Use for any armed, ordinary people." },
  acolyte:       { name: "acolyte", plural: "acolytes", ac: "2 [17]", hd: "1", hp: [1, 6, 0], att: "1 × mace (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D11 W12 P14 B16 S15 (C1)", ml: 7, xp: 10, note: "First-level clerics in heavy armour. No spells yet." },
  kobold:        { name: "kobold", plural: "kobolds", ac: "7 [12]", hd: "½", hp: [1, 4, 0], att: "1 × weapon (1d4)", thac0: "19 [0]", mv: "60' (20')", sv: "D14 W15 P16 B17 S18 (NH)", ml: 6, xp: 5, note: "Infravision 90'." },
  goblin:        { name: "goblin", plural: "goblins", ac: "6 [13]", hd: "1-1", hp: [1, 8, -1], att: "1 × weapon (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D14 W15 P16 B17 S18 (NH)", ml: 7, xp: 5, note: "–1 to hit in daylight. Infravision 90'." },
  orc:           { name: "orc", plural: "orcs", ac: "6 [13]", hd: "1", hp: [1, 8, 0], att: "1 × weapon (1d6)", thac0: "19 [0]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (1)", ml: 8, xp: 10, note: "–1 to hit in daylight. Infravision 60'." },
  hobgoblin:     { name: "hobgoblin", plural: "hobgoblins", ac: "6 [13]", hd: "1+1", hp: [1, 8, 1], att: "1 × weapon (1d8)", thac0: "18 [+1]", mv: "90' (30')", sv: "D12 W13 P14 B15 S16 (1)", ml: 8, xp: 15, note: "Infravision 90'." },
  gnoll:         { name: "gnoll", plural: "gnolls", ac: "5 [14]", hd: "2", hp: [2, 8, 0], att: "1 × weapon (2d4)", thac0: "18 [+1]", mv: "90' (30')", sv: "D12 W13 P14 B15 S16 (2)", ml: 8, xp: 20, note: "" },
  bugbear:       { name: "bugbear", plural: "bugbears", ac: "5 [14]", hd: "3+1", hp: [3, 8, 1], att: "1 × weapon (2d4)", thac0: "16 [+3]", mv: "90' (30')", sv: "D12 W13 P14 B15 S16 (3)", ml: 9, xp: 75, note: "Surprise on 1–3." },
  ogre:          { name: "ogre", plural: "ogres", ac: "5 [14]", hd: "4+1", hp: [4, 8, 1], att: "1 × club (1d10)", thac0: "15 [+4]", mv: "90' (30')", sv: "D10 W11 P12 B13 S14 (4)", ml: 10, xp: 125, note: "" },
  owlbear:       { name: "owlbear", plural: "owlbears", ac: "5 [14]", hd: "5", hp: [5, 8, 0], att: "2 × claw (1d8), 1 × bite (1d8)", thac0: "15 [+4]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (3)", ml: 9, xp: 175, note: "If both claws hit one target, a hug for 2d8 more." },
  wolf:          { name: "wolf", plural: "wolves", ac: "7 [12]", hd: "2+2", hp: [2, 8, 2], att: "1 × bite (1d6)", thac0: "17 [+2]", mv: "180' (60')", sv: "D12 W13 P14 B15 S16 (1)", ml: 6, xp: 25, note: "Morale 8 in a pack of four or more." },
  lizardMan:     { name: "lizard man", plural: "lizard men", ac: "5 [14]", hd: "2+1", hp: [2, 8, 1], att: "1 × weapon (1d6+1)", thac0: "17 [+2]", mv: "60' (20') / swim 120' (40')", sv: "D12 W13 P14 B15 S16 (2)", ml: 12, xp: 25, note: "" },
  /* Leaders: the OSE leader notes give these as a sturdier member of the type. */
  koboldChief:   { name: "kobold chieftain", plural: "kobold chieftains", ac: "7 [12]", hd: "2", hp: [2, 6, 0], att: "1 × weapon (1d6)", thac0: "18 [+1]", mv: "60' (20')", sv: "D12 W13 P14 B15 S16 (2)", ml: 8, xp: 20, note: "While the chieftain lives, kobolds use morale 8." },
  goblinBoss:    { name: "goblin boss", plural: "goblin bosses", ac: "6 [13]", hd: "3", hp: [3, 6, 0], att: "1 × weapon (1d8)", thac0: "17 [+2]", mv: "60' (20')", sv: "D12 W13 P14 B15 S16 (3)", ml: 9, xp: 35, note: "While the boss lives, goblins use morale 9." },
  orcLeader:     { name: "orc leader", plural: "orc leaders", ac: "6 [13]", hd: "2", hp: [2, 8, 0], att: "1 × weapon (1d6+1)", thac0: "18 [+1]", mv: "120' (40')", sv: "D12 W13 P14 B15 S16 (2)", ml: 9, xp: 20, note: "If the leader falls, the band checks morale at once." },
  hobgoblinChief:{ name: "hobgoblin chief", plural: "hobgoblin chiefs", ac: "6 [13]", hd: "4", hp: [4, 6, 0], att: "1 × weapon (1d8+1)", thac0: "16 [+3]", mv: "90' (30')", sv: "D10 W11 P12 B13 S14 (4)", ml: 10, xp: 75, note: "While the chief lives, hobgoblins use morale 10." },
  gnollLeader:   { name: "gnoll leader", plural: "gnoll leaders", ac: "5 [14]", hd: "3", hp: [3, 8, 0], att: "1 × weapon (2d4+1)", thac0: "17 [+2]", mv: "90' (30')", sv: "D12 W13 P14 B15 S16 (3)", ml: 9, xp: 35, note: "" },
  bugbearChief:  { name: "bugbear chief", plural: "bugbear chiefs", ac: "5 [14]", hd: "4+1", hp: [4, 8, 1], att: "1 × weapon (2d4+1)", thac0: "15 [+4]", mv: "90' (30')", sv: "D10 W11 P12 B13 S14 (4)", ml: 10, xp: 200, note: "Surprise on 1–3." },
  /* Reader clerics: NPC clerics of level 2–4, d6 per level, reversed spells. */
  reader2:       { name: "Reader (cleric 2)", plural: "Readers (cleric 2)", ac: "2 [17]", hd: "2*", hp: [2, 6, 0], att: "1 × mace (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D11 W12 P14 B16 S15 (C2)", ml: 9, xp: 25, note: "Spells: cause light wounds (1d6+1)." },
  reader3:       { name: "Reader (cleric 3)", plural: "Readers (cleric 3)", ac: "2 [17]", hd: "3*", hp: [3, 6, 0], att: "1 × mace (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D11 W12 P14 B16 S15 (C3)", ml: 9, xp: 50, note: "Spells: cause light wounds, darkness." },
  reader4:       { name: "Reader (cleric 4)", plural: "Readers (cleric 4)", ac: "2 [17]", hd: "4*", hp: [4, 6, 0], att: "1 × mace (1d6)", thac0: "19 [0]", mv: "60' (20')", sv: "D11 W12 P14 B16 S15 (C4)", ml: 9, xp: 125, note: "Spells: cause light wounds, darkness, hold person." }
};

/* ------------------------------------------------------------------ */
/* SHARED                                                              */
/* ------------------------------------------------------------------ */
ForgeTables.names = {
  /* Two parts make a name. Keep them short and sayable. */
  first: ["Ma", "Ves", "Or", "Tal", "Kes", "Dun", "Sel", "Ab", "Ro", "Hesk", "Ul", "Pell", "Ira", "Cor", "Nim", "Bel", "Tob", "Wen", "Ash", "Gil", "Lor", "Mab", "Quen", "Ost", "Fen", "Hal", "Ilo", "Rud"],
  last: ["rin", "ett", "al", "ow", "ik", "ane", "is", "o", "a", "en", "ory", "ud", "eth", "un", "ace", "imm", "elle", "ock"],
  /* Plain Fort-country names for ordinary people. */
  folk: ["Tam", "Wynn", "Corle", "Idda", "Brenn", "Osk", "Mairi", "Lute", "Dovey", "Hask", "Nell", "Rafe", "Sorrel", "Jory", "Ammet", "Kit", "Pell", "Odile", "Bram", "Fennick", "Teague", "Wil"]
};

ForgeTables.traps = [
  { name: "Pit under boards", trigger: "Stepping on the middle of the floor.", effect: "A 10' pit opens. 1d6 damage. Climbing out takes a turn.", find: "Boards sound hollow when tapped. Searching the floor finds it on 1–2 in 6 (dwarves 1–3).", disarm: "Walk the edges, or lay a pole across." },
  { name: "Glass-tooth sill", trigger: "Climbing over the low sill.", effect: "Broken screen-glass set in pitch cuts hands and knees: 1d4 damage, and the blood draws wanderers (check at once).", find: "A torch held low shows the glitter.", disarm: "Lay a cloak or a shield over the sill." },
  { name: "Speaking plate", trigger: "Weight on a bronze plate in the floor.", effect: "A voice in Imperial Common reads a hymn line very loudly. Make a wandering check. Anything nearby knows where the party is.", find: "The plate is clean while the floor around it is dusty.", disarm: "Step over it, or jam the grille with cloth." },
  { name: "Rope and stones", trigger: "Opening the door more than a hand's width.", effect: "A net of stones drops: 1d6 damage to the first in line, save vs. breath for half.", find: "A rope runs from the door's top hinge into a crack above.", disarm: "Cut the rope while someone holds the door still." },
  { name: "Oil slick and spark", trigger: "Walking the last 10' of the passage.", effect: "Lamp oil on the floor. A flint wheel sparks when stepped on: 1d6 fire damage to anyone in the oil, and the passage burns for 2 turns.", find: "The smell. Anyone who sniffs knows it.", disarm: "Sand or water over the oil, or cross one at a time with no light." },
  { name: "Falling grate", trigger: "Passing under the arch.", effect: "An iron grate drops behind the first two in line and splits the party. Lifting it needs 2 people and a forcing roll.", find: "Grooves worn in the arch sides; flakes of fresh rust on the floor.", disarm: "Wedge a spike in each groove." },
  { name: "Wire chimes", trigger: "Touching a near-invisible copper wire at ankle height.", effect: "Chimes ring deeper in. Whoever lives there is ready: no surprise, and they set an ambush.", find: "Searching the doorway, or a torch held low, shows the wire.", disarm: "Step over it. Cutting it rings the chimes once." },
  { name: "Tipping stair", trigger: "The fifth step down.", effect: "The step pivots. Save vs. paralysis or slide down and take 1d6. Lit torches go out.", find: "The fifth step is a different stone. Searching finds it on 1–2 in 6.", disarm: "Step over it." },
  { name: "Sleeping eye", trigger: "Walking into the gaze of a brass eye set over the door.", effect: "The eye wakes (it is a ward, and a sensor). It shuts the door behind the party and opens it again only to the station hymn sung in order.", find: "The eye's lid twitches if a light passes in front of it.", disarm: "Cover the eye with a hat before it sees you. It counts that as night." },
  { name: "Spear stump", trigger: "Lifting the lid of the chest.", effect: "A spring drives a rusty spike up through the lid: 1d4 damage and save vs. poison or sick for a day.", find: "A hole in the lid, plugged with wax.", disarm: "Open the lid from the side with a pole." },
  { name: "Loose ceiling", trigger: "Loud noise: shouting, a forced door, a fight.", effect: "Slabs fall. Everyone in the room saves vs. breath or takes 1d6.", find: "New stone dust on the floor; cracks with clean edges.", disarm: "Be quiet. Prop the worst slab with timber (a turn)." },
  { name: "Weighted gate", trigger: "Taking anything from the shelf.", effect: "A counterweight drops and a gate shuts the exit. It opens again if the thing goes back.", find: "A chain runs from the shelf into the wall.", disarm: "Put something of equal weight back in its place." },
  { name: "Cold coil", trigger: "Touching the copper rail.", effect: "Old power still in the rail: 1d6 damage, save vs. paralysis or drop what you hold.", find: "The rail hums. Hair stands up near it.", disarm: "Touch it with wood or a rope. Or touch it once: then it is spent for a day." },
  { name: "Drowning room", trigger: "Closing the inner door.", effect: "A sluice opens. Water fills the room to chest height in 3 rounds and to the roof in 6.", find: "Tide-lines on the walls up to the ceiling.", disarm: "Wedge the inner door open, or find the sluice wheel behind the grille." },
  { name: "Dust of the dead", trigger: "Opening the bone niche.", effect: "Grey dust puffs out. Save vs. poison or cough for a turn: no spells, no sneaking, –2 to hit.", find: "The niche seal is cracked and a little dust has leaked.", disarm: "Wet cloth over mouth and nose." },
  { name: "Snare and bell", trigger: "Walking the obvious path.", effect: "A noose catches a leg and hoists the victim upside down. A bell rings.", find: "Bent sapling or loop of rope half-buried. Anyone looking down sees it on 1–3 in 6.", disarm: "Cut the trigger line, or walk off the path." }
];

ForgeTables.treasure = [
  { text: "A purse of imperial chits stamped with a lamp, worth {gp} gp in silver weight.", gp: [10, 40] },
  { text: "A copper coil the size of a fist, still warm. A smith or a Terminal-tender pays {gp} gp.", gp: [15, 50] },
  { text: "Six glass tubes in a padded box. Each glows faintly blue when shaken. {gp} gp for the set.", gp: [20, 60] },
  { text: "A bronze astrolabe with one ring missing. {gp} gp to a scholar.", gp: [25, 70] },
  { text: "A keeper's ring of black iron with a lamp in silver. {gp} gp.", gp: [15, 40] },
  { text: "Loose coins of three dead mints in a rotten bag: {gp} gp.", gp: [8, 30] },
  { text: "A tin of lamp oil, sealed: two flasks, still good.", gp: [0, 0] },
  { text: "A drowned officer's whistle in silver. It plays one note, very pure. {gp} gp.", gp: [10, 30] },
  { text: "A roll of imperial survey vellum, blank and clean. Wizards pay {gp} gp for it as scroll stock.", gp: [20, 50] },
  { text: "Twelve brass tokens punched with holes in a pattern. The pattern is a hymn line. {gp} gp to the Minister, or a Reader.", gp: [10, 25] },
  { text: "A screen-glass shard the size of a hand. Text still crawls across it when it is held to the light. {gp} gp to a collector.", gp: [30, 80] },
  { text: "A jade weight from a balance, cut with a fish. {gp} gp.", gp: [20, 45] },
  { text: "A pair of lenses in a copper frame. Worn, they show heat as a dull red glow (60', one hour a day). Worth {gp} gp, or keep them.", gp: [50, 100] },
  { text: "A string of river pearls on wire: {gp} gp.", gp: [30, 90] },
  { text: "A seal of office in green stone, for a post that no longer exists. {gp} gp.", gp: [25, 60] },
  { text: "Silver thread wound on a bobbin: {gp} gp.", gp: [10, 35] },
  { text: "An imperial pay chest, empty but for {gp} gp stuck in the seams.", gp: [5, 20] },
  { text: "A small brass hand that closes when warmed. A toy, or a part. {gp} gp.", gp: [15, 40] },
  { text: "A jar of black salt that does not melt ice. Alchemists pay {gp} gp.", gp: [20, 40] },
  { text: "A gold tooth on a thong. {gp} gp.", gp: [8, 15] },
  { text: "A bundle of good arrows (20) with copper heads.", gp: [0, 0] },
  { text: "A compass whose needle points at the nearest working Terminal. {gp} gp, or priceless to the right buyer.", gp: [40, 100] },
  { text: "Three bars of grey metal that never rust. {gp} gp each to a smith.", gp: [10, 20] },
  { text: "A bone flute with the station number carved on it. {gp} gp.", gp: [5, 15] },
  { text: "A wax-sealed letter in Imperial Common. It is a pay order for the keepers, never paid. Worth {gp} gp to a collector of such things.", gp: [10, 30] }
];

ForgeTables.magic = [
  "A potion of healing in a blue imperial ampoule (heals 1d6+1, or cures paralysis).",
  "A dagger +1. The blade is screen-glass in a bronze hilt and gives light as a candle when drawn.",
  "A scroll of protection from undead, written as a hymn. Read it in order.",
  "A scroll with one spell: light. The ink is copper and the page is warm.",
  "Three sling stones +1, each stamped with an eye.",
  "A potion of water breathing in a stoppered conch (1 hour).",
  "A shield +1 cut from a hull plate. Rivets still in it.",
  "A ring of protection +1: a copper coil sized for a finger.",
  "A potion of climbing that smells of tar.",
  "A scroll of cure light wounds, twice, in a lamp-keeper's hand.",
  "A wand of light with 2d6 charges: a glass tube with a brass cap. Its owner called it a torch.",
  "A cloak of drab oilcloth. +1 to saves vs. breath; it never burns.",
  "A potion of gaseous form in a crushed bottle that still holds.",
  "Elven boots, or so they seem: imperial issue, silent soles of a grey stuff that is not leather."
];

/* ------------------------------------------------------------------ */
/* TOWER TEMPLATE                                                      */
/* ------------------------------------------------------------------ */
ForgeTables.tower = {};

/* What the empire built. "did" finishes the sentence "It ..." */
ForgeTables.tower.purposes = [
  { title: "Lamp Station", did: "kept a beacon burning for the lake boats, and read the weather in the beam" },
  { title: "Signal Tower", did: "passed coded flashes from shore to shore with mirrors and a mercury lamp" },
  { title: "Survey Tower", did: "measured the lake's depth every hour with a weighted wire and wrote it down" },
  { title: "Tide House", did: "watched the water rise and fall, and sent the numbers to someone far away" },
  { title: "Bell Station", did: "rang the hymn hours across the water from a bell that was also a speaker" },
  { title: "Customs Tower", did: "stopped every boat, weighed its cargo and taxed it" },
  { title: "Ward Station", did: "held a ward over something in the water, an eye that never closed" },
  { title: "Listening Post", did: "listened to the lake with brass ears sunk in the mud" },
  { title: "Hymn Relay", did: "carried the Terminal hymns from one shore to the other on a beam of light" },
  { title: "Sky Station", did: "watched the stars through a lens of ground screen-glass and corrected the empire's clocks" },
  { title: "Pump House", did: "drove lake water through iron pipes to a town that is gone" },
  { title: "Holding Tower", did: "kept prisoners the empire did not want to kill or to free" }
];

ForgeTables.tower.numbers = ["Three", "Five", "Six", "Seven", "Eleven", "Twelve", "Fourteen", "Seventeen", "Twenty", "Twenty-Two", "Thirty", "Forty"];

/* The local name. "why" finishes "Locals call it {name} because ..." */
ForgeTables.tower.localNames = [
  { name: "the Blind Tower", why: "its lamp-room windows are painted black from the inside" },
  { name: "the Leaning Tower", why: "it leans north, a little more each winter" },
  { name: "the Gull Tower", why: "nothing else will nest on it" },
  { name: "the Hollow Tower", why: "it booms like a drum when the wind is east" },
  { name: "the Singing Tower", why: "on still nights a hymn comes out of the stones, very faint" },
  { name: "the Split Tower", why: "a crack runs from its top to its foot and you can see daylight through it" },
  { name: "the Green Tower", why: "weed grows on it to the height of a man above the water" },
  { name: "the Crooked Lamp", why: "its broken lamp-arm points the wrong way" },
  { name: "the Salt Tower", why: "its stones sweat white in summer" },
  { name: "the Owl Tower", why: "two round windows near the top look like eyes" },
  { name: "the Stump", why: "only the lowest third still stands" },
  { name: "the Bell Tower", why: "a bell still hangs in it that nobody has heard ring" },
  { name: "the Black Tower", why: "it was burned once and the soot never washed off" },
  { name: "the Weeping Tower", why: "water runs down its inside walls all year" },
  { name: "the Wire Tower", why: "copper wires hang from its top into the water like fishing lines" },
  { name: "the Quiet Tower", why: "birds go silent when they fly over it" }
];

ForgeTables.tower.places = [
  "a rock island in a cold lake, a short row from the shore",
  "a pine island in the middle of a long lake",
  "a stony spit that is only an island when the lake is high",
  "a sea-stack of black rock joined to the shore by a broken causeway",
  "an island of tumbled stone in a reed-choked mere",
  "a steep islet at the mouth of a river, where the current is strong",
  "a flat island of birch and bramble, with the tower at its only high point",
  "an island in a flooded valley, where the tops of drowned trees break the water"
];

ForgeTables.tower.fell = [
  "The keepers left when the pay boats stopped coming.",
  "A fever came over the water one summer and the keepers did not leave.",
  "The lake rose in one night and the lower floors filled.",
  "The keepers fought each other over the last of the oil.",
  "The beam went dark on the day the hymns changed on every Terminal at once.",
  "A storm took the top floors, and nobody came to rebuild them.",
  "The magister in charge sealed the cellars and walked into the water.",
  "The empire sent an order to abandon the station. The keepers burned the order and stayed. Nobody knows how long.",
  "Something in the water broke its ward. The keepers ran for the shore; not all of them made it.",
  "The station's machine stopped, and the keepers forgot how to start it."
];

/* Light for marching-order lesson; landing places (S1). */
ForgeTables.tower.landings = [
  { name: "The Stone Slip", kind: "landing", light: "Daylight", ra: "A ramp of cut stone runs down into the water. Green weed hides its lower half.", features: [["The slip", "Slick. A PC who runs on it saves vs. paralysis or goes in the water: no damage, but a wet torch will not light."], ["Mooring rings", "Four iron rings. One holds a fresh knot of tarred rope."]], obvious: "Tie up the boat and walk up the slip.", clever: "Read the knot: a sailor's hitch, tied in the last few days. Someone else lands here." },
  { name: "The Chain Steps", kind: "landing", light: "Daylight", ra: "Steps cut into the rock climb out of the water. An iron chain bolted to the cliff serves as a handrail.", features: [["The chain", "Sound. Its last link is bright where a rope has rubbed it."], ["Bootprints", "Mud on the top steps, two days old: hobnails in a ring."]], obvious: "Climb the steps holding the chain.", clever: "Haul the boat up out of sight between the rocks, so nobody knows you are here." },
  { name: "The Sunk Boathouse", kind: "landing", light: "Daylight", ra: "A boathouse roof sits on the water like a hat. The walls are under the surface, and a door gapes at the waterline.", features: [["The roof", "Sound enough to stand on. A hatch in it opens into the flooded house."], ["Inside, underwater", "An imperial launch, sunk at its mooring, with a brass name-plate. Prying it off takes a turn underwater."]], obvious: "Row past and land on the beach beside it.", clever: "The launch has a tool locker. A swimmer can reach it in two rounds." },
  { name: "The Shingle Beach", kind: "landing", light: "Daylight", ra: "A crescent of grey shingle under a low bank. Drag marks run up from the water into the trees.", features: [["Drag marks", "A boat was hauled up here and hidden. It is gone now."], ["Fire ring", "Ash, cold. Fish bones. A tin cup with a lamp stamped on it."]], obvious: "Beach the boat and follow the drag marks.", clever: "The cup is imperial issue from this station. Whoever camped here had been inside." },
  { name: "The Iron Pier", kind: "landing", light: "Daylight", ra: "An imperial pier stands on iron legs. Half its planks are gone, and the gaps show black water.", features: [["The gaps", "Anyone who walks it without looking saves vs. paralysis or drops through."], ["The bollard", "A speaking-grille is set in the bollard at the pier's end. Pressed, it crackles and says one word in Imperial Common: “Name?”"]], obvious: "Walk the pier carefully, one at a time.", clever: "Answer the grille. Any name will do; it logs the visit, and something below now expects you." },
  { name: "The Reed Channel", kind: "landing", light: "Daylight", ra: "Someone has cut a channel through the reeds to a mud bank. The cuts are clean and recent.", features: [["The channel", "Cut with a long knife from a boat, three or four days ago."], ["A marker stake", "Painted with a white eye that has a line through it."]], obvious: "Pole up the channel and land on the mud.", clever: "The marker is a warning sign. Whoever cut the channel does not want company." },
  { name: "The Gull Ledge", kind: "landing", light: "Daylight", ra: "A flat ledge white with gull droppings sits just above the waterline. The birds rise screaming as the boat comes in.", features: [["The gulls", "Anyone on the island now knows a boat has landed."], ["Eggs", "Two dozen in the cracks. Good eating."]], obvious: "Land on the ledge and climb.", clever: "Come in slowly, after dusk, when the gulls sleep." },
  { name: "The Wreck Landing", kind: "landing", light: "Daylight", ra: "The hulk of a flat barge lies against the rocks and serves as a jetty. Its deck is grey and soft.", features: [["The deck", "Rotten. Each PC who crosses rolls d6; on a 1 they go through to the knee (no damage, a lost turn)."], ["The hold", "Dark. Three barrels of imperial lamp oil, two of them empty. One holds six flasks' worth."]], obvious: "Cross the barge to the rocks.", clever: "Check the hold before leaving the boat: oil now saves a trip back later." },
  { name: "The Lamp Stones", kind: "landing", light: "Daylight", ra: "A ring of standing posts of grey metal marches into the water. Each post has a dead glass eye at the top.", features: [["The posts", "Old guide-lights. They are dark. One flickers when a hand touches it."], ["The beach", "Coarse sand, and a path up through bracken."]], obvious: "Land on the sand between the posts.", clever: "Touch every post. Two light up for one round and point toward the tower, and toward the north shore." },
  { name: "The Broken Causeway", kind: "landing", light: "Daylight", ra: "A causeway of fitted blocks runs out from the island and stops in deep water. The boat can tie up at its broken end.", features: [["The causeway", "Wide enough for two. The blocks rock underfoot."], ["Carved milestone", "The station's number in Imperial Common, and a lamp."]], obvious: "Tie up and walk the causeway in.", clever: "Count the blocks. A loose one near the island end hides a dry niche with a coil of good rope." }
];

/* Tower variants (always one on the surface). "hide" says where a trapdoor could be. */
ForgeTables.tower.towers = [
  { name: "The Tower Shell", kind: "tower", light: "Daylight from above", ra: "A round tower thirty feet across stands open to the sky. A stair climbs the inside wall to a broken top.", features: [["The stair", "Sound to the top. From there you see the whole island, and the dark water off the north shore."], ["Crows", "They leave when anyone climbs."]], hide: "under the rubble of the fallen floors", obvious: "Climb the stair and look out.", clever: "Search the rubble at the foot of the stair." },
  { name: "The Lamp Room Ruin", kind: "tower", light: "Daylight through a broken dome", ra: "The great lamp has fallen through three floors and lies in pieces on the ground floor. Its lens is a heap of glass bricks, each the size of a loaf.", features: [["The lens", "Some bricks are whole. Each one focuses light like a burning glass. Heavy: 10 coins' weight each."], ["The lamp body", "Brass ribs and copper wire. The wire is still bright."]], hide: "under the lamp's fallen frame", obvious: "Pick through the lens for a whole brick.", clever: "The lamp fell from somewhere; the hole it punched goes down as well as up." },
  { name: "The Signal Tower", kind: "tower", light: "Daylight through arrow slits", ra: "A square tower with walls six feet thick. Mirrors on iron arms still turn when the wind blows.", features: [["The mirrors", "Six. One still flashes in the sun, and someone on the shore could read it."], ["Slit windows", "Each one has a number painted beside it."]], hide: "under a mat of rotten signal flags", obvious: "Look out through the slits.", clever: "The numbers by the windows are bearings. One points at the north cliff." },
  { name: "The Bell Tower", kind: "tower", light: "Daylight", ra: "A slim tower holds a bronze bell as big as a cart, hung from a beam of black wood. The bell has a grille in its side like a mouth.", features: [["The bell", "Struck, it rings once and then hums for a whole turn. Make a wandering check."], ["The grille", "Behind it, a nest of wires. It is a bell and a loudspeaker at once."]], hide: "beneath the bell's sunken pit, under fallen shingle", obvious: "Ring the bell.", clever: "Do not ring the bell. Look under it." },
  { name: "The Stump Tower", kind: "tower", light: "Daylight", ra: "Only the bottom floor of the tower still stands, roofless. Ivy and brambles fill it to the height of a man.", features: [["The brambles", "Cutting a path takes a turn."], ["A broken door", "Imperial oak with iron studs, lying flat inside."]], hide: "under the brambles, where the floor goes hollow", obvious: "Cut a way in.", clever: "Burn the brambles from outside. It takes two turns and makes smoke anyone can see." },
  { name: "The Watch Tower", kind: "tower", light: "Daylight", ra: "A square tower, three floors, still roofed. Its door hangs on one hinge, and the floors inside creak but hold.", features: [["Floors 2 and 3", "Bunks, rotten. A telescope of bronze on a tripod at the top, its lens cracked."], ["The telescope", "Still points at one spot on the north shore."]], hide: "under the ground-floor planks near the hearth", obvious: "Climb to the top and use the telescope.", clever: "Ask why the telescope was left pointing where it is." },
  { name: "The Sky Dome", kind: "tower", light: "Daylight through a split dome", ra: "A squat round tower is capped with a dome of copper gone green. The dome has split, and a slice of sky shows through.", features: [["The dome's lens", "A ring of screen-glass that once turned. A crank on the wall still moves it a little."], ["Star charts", "Painted on the walls. Wrong stars, or old ones."]], hide: "under a fallen sheet of copper", obvious: "Turn the crank.", clever: "The charts show a star over the north shore marked with a lamp." },
  { name: "The Burnt Tower", kind: "tower", light: "Daylight through gaps", ra: "The tower's inside is black with old fire. The stone has cracked into scales and the air still smells of soot.", features: [["The soot", "Writing shows through it if rubbed: tallies of days, hundreds of them."], ["A charred chest", "Locked. Inside, a keeper's spare boots and a flask of oil."]], hide: "under a drift of charcoal and fallen beams", obvious: "Open the chest.", clever: "Read the tallies. They stop on the same day the fire started." }
];

/* Other surface areas (S3, S4). Those with "hide" can hold the trapdoor. */
ForgeTables.tower.surface = [
  { name: "The Keeper's Cottage", kind: "building", light: "Daylight", ra: "A stone cottage beside the tower has lost its roof. The hearth still has a pot hook and a kettle on it.", features: [["The hearth", "Ash less than a week old."], ["The door", "A chalk mark: a lamp with a line through it."]], hide: "under the hearthstone, which lifts", obvious: "Search the cottage.", clever: "Feel the ash. Someone has been here this week." },
  { name: "The Keepers' Graves", kind: "outdoor", light: "Daylight", ra: "Nine grave mounds sit in a row under the pines, each with an iron marker. The ninth has been dug up and left open.", features: [["The markers", "Names and dates in Imperial Common. The dates stop on the same day."], ["The open grave", "Empty. The coffin lid is inside it, clawed from below."]], obvious: "Read the markers.", clever: "Look at the claw marks: from inside, not out." },
  { name: "The Lookout Rock", kind: "outdoor", light: "Daylight", ra: "A bare rock stands high over the north shore. Below it, the water is very dark and very still.", features: [["The view", "A cave mouth in the cliff, just above the waterline. A boat could row in."], ["Old bolts", "Iron rings in the rock where a crane once stood."]], obvious: "Look over the edge.", clever: "A rope from the bolts reaches the water. Someone could climb down to the cave mouth, but the current there is strong." },
  { name: "The Wild Garden", kind: "outdoor", light: "Daylight", ra: "The keepers' garden has gone wild inside a low wall. Bean poles stand in rows, still tied with copper wire.", features: [["Herbs", "Mint, sage and a grey-leaved herb the Druid knows: it stops bleeding."], ["The wire", "Too fine for a fence. It runs from the poles into the ground."]], obvious: "Gather herbs.", clever: "Follow the wire. It runs under the wall toward the tower: the garden was a ground plate for something." },
  { name: "The Goat Shed", kind: "building", light: "Daylight", ra: "A long low shed of stone, with stalls for animals. It stinks of goat, and something has been sleeping in the straw.", features: [["The straw", "A body-shaped hollow, still warm."], ["Hay rack", "A rusty bill-hook and a bag of salt fish."]], hide: "under the last stall's straw, a wooden hatch", obvious: "Search the straw.", clever: "Whoever slept here left in a hurry. Their fish is fresh." },
  { name: "The Signal Mast", kind: "outdoor", light: "Daylight", ra: "A mast of iron lattice has fallen across the clearing. Its top still bears a cage of glass tubes.", features: [["The tubes", "Most broken. Two whole ones glow faintly when shaken (as a candle, for a turn)."], ["The base", "A box of copper bars bolted to the rock, too heavy to move."]], obvious: "Pull out a glowing tube.", clever: "The box hums. Put an ear to it and hear a hymn, sung under the ground." },
  { name: "The Cistern", kind: "outdoor", light: "Daylight", ra: "A square cistern cut in the rock holds green rainwater. A pump handle stands at one corner.", features: [["The water", "Drinkable if boiled."], ["The pump", "Works with a shriek. The shriek carries; make a wandering check."]], hide: "under the pump's stone slab", obvious: "Fill the waterskins.", clever: "Pump it dry. The cistern floor has a grille." },
  { name: "The Boat Shed", kind: "building", light: "Daylight through gaps", ra: "A wooden shed on the shore has slid half into the water. Inside, a rowing boat hangs from the rafters on chains.", features: [["The boat", "Sound. Oars are under the bench."], ["The workbench", "Pitch, nails, a good saw."]], hide: "under the slipway planks at the back", obvious: "Take the boat down.", clever: "A second boat means a second way off the island if the first is lost." },
  { name: "The Beacon Pit", kind: "outdoor", light: "Daylight", ra: "A stone-lined pit on the hilltop holds the black remains of a great fire. Iron baskets stand at its edge.", features: [["The ash", "Old. Under it, glass that melted and ran."], ["The baskets", "Each could hold a fire. Lit, the island can be seen from shore."]], obvious: "Look in the pit.", clever: "Light a basket at dusk as a signal home: The Fort will know the party is alive." },
  { name: "The Hymn Stone", kind: "outdoor", light: "Daylight", ra: "A slab of black glass stands on a plinth in a ring of white stones. Faint letters crawl across it, too slow to read.", features: [["The slab", "A Terminal screen, almost dead. The Minister knows the hymn it shows, but here the lines are out of order."], ["Offerings", "Old coins, buttons, a child's shoe. None are recent."]], obvious: "Read the slab.", clever: "Put the lines in order. The last line is a station password." },
  { name: "The Kiln", kind: "building", light: "Daylight", ra: "A brick kiln stands by a heap of broken pots. The pots are glazed with a grey glaze that shines like metal.", features: [["The pots", "Lamp-oil jars. A few whole."], ["The kiln mouth", "Big enough to crawl into. Warm. Something lives in it."]], hide: "inside the kiln, a flue that goes down", obvious: "Take the whole jars.", clever: "Why is the kiln warm? The flue draws air from below." },
  { name: "The Wrecked Crane", kind: "outdoor", light: "Daylight", ra: "An iron crane leans over the cliff edge. Its chain runs down out of sight into the water.", features: [["The chain", "Haul it up (two turns, three people): a cage of bars, empty, door open."], ["The cab", "A seat, levers, a speaking-tube. The tube runs into the rock."]], obvious: "Haul up the chain.", clever: "Shout into the speaking-tube. Someone below may answer." },
  { name: "The Bath House", kind: "building", light: "Daylight through a broken roof", ra: "A small building holds a sunken bath lined with blue tiles. Pipes come up out of the floor into the bath.", features: [["The pipes", "Bronze. Warm water once came up them. Turn the tap and air breathes out, smelling of the lake."], ["Tiles", "A pattern of lamps and eyes."]], hide: "the bath drain, which is wide enough to climb down", obvious: "Turn the tap.", clever: "The breath from the pipe means a space below with air in it." },
  { name: "The Pine Wood", kind: "outdoor", light: "Daylight, green and dim", ra: "Tall pines stand close together, and the ground is soft with needles. It is very quiet under them.", features: [["A path", "Worn by feet, going north."], ["Snare", "A rabbit snare, set this week."]], obvious: "Walk through.", clever: "Someone set that snare. They plan to eat here." }
];

/* Cellar rooms by lesson slot. */
ForgeTables.tower.stairFoot = [
  { name: "The Stair Foot", light: "Dark", ra: "The stair ends at a small square room. A heavy oak door faces you, swollen in its frame.", features: [["The door", "Stuck. Scratching and squeaks come from beyond it."], ["Wall hooks", "Six, for lamps. One lamp hangs there, empty."]], obvious: "Shove the door.", clever: "Listen first, then oil the hinges before forcing." },
  { name: "The Porter's Room", light: "Dark", ra: "A room with a bench, a hook-board for keys and a door of iron-bound oak. Every key is gone.", features: [["Key-board", "Labels in Imperial Common for every room below. Copy them: they are a rough map."], ["The bench", "A keeper's coat, moth-eaten, with a brass whistle in the pocket."]], obvious: "Take the coat and try the door.", clever: "Copy the key labels. They name rooms you have not found yet." },
  { name: "The Cold Room", light: "Dark", ra: "The air is cold enough to see your breath. A rime of frost covers the walls, though it is summer above.", features: [["The frost", "A cooling coil of copper runs around the walls, still working. Meat was kept here."], ["Hooks", "Empty, except one that holds a goat leg two days old."]], obvious: "Get through fast.", clever: "Someone stores fresh meat here. Someone comes back." },
  { name: "The Wick Room", light: "Dark", ra: "Shelves of tallow, wick-cord and empty lamps fill the room. A door with a grille stands at the far end.", features: [["Wick-cord", "Enough to rope-light a trail back to the stair."], ["The grille", "Too small to see through clearly. Smells of rats."]], obvious: "Take lamps.", clever: "Lay a wick-trail. If you have to run, you can find the stair in the dark." },
  { name: "The Coal Hole", light: "Grey light from the chute above", ra: "A chute brings a little daylight down onto a heap of black coal. A low door leads on.", features: [["The coal", "Good coal. Burns hot."], ["The chute", "Too narrow to climb, but sound carries up it: anyone above can hear the party."]], obvious: "Go on through the door.", clever: "Speak quietly here. Or use the chute to talk to someone left on watch above." },
  { name: "The Bell-Rope Room", light: "Dark", ra: "A rope as thick as an arm hangs from a hole in the ceiling and coils on the floor. A door with a brass handle faces it.", features: [["The rope", "Pull it and the tower bell rings above. Everything on the island hears."], ["The door", "Stuck. Brass handle turns; the door does not."]], obvious: "Pull the rope to see what it does.", clever: "Leave the rope alone. Tie it up out of reach so nobody pulls it by accident." },
  { name: "The Airlock", light: "Dark", ra: "Two doors face each other across a narrow room. Each has a rubber seal round its edge and a wheel in its middle.", features: [["The wheels", "Turn one and the other locks. A small glass eye over each door watches."], ["The seal", "Perished. The doors still work, slowly."]], obvious: "Spin the wheel and push.", clever: "Close the door behind you first. Then the far one opens easily." },
  { name: "The Cistern Landing", light: "Dark", ra: "The stair ends on a stone landing beside a tank of still water. A door is set in the far wall above a step.", features: [["The tank", "Clear, cold, drinkable. A tin cup on a chain."], ["The door", "Swollen with damp."]], obvious: "Drink and go on.", clever: "Fill every skin here. There may be no clean water below." }
];

ForgeTables.tower.wanderRoom = [
  { name: "The Long Gallery", light: "Dark", ra: "A long room runs away into the dark, lined with empty racks. Every footstep echoes back twice.", features: [["The echo", "Sound carries the whole length. Anything at the far end hears you coming."], ["Racks", "For oil jars. All broken."]], obvious: "Walk down the middle.", clever: "Walk on the edges in single file. Quieter." },
  { name: "The Barracks", light: "Dark", ra: "Twelve bunks stand in two rows, each with a locker at its foot. The blankets have been chewed into nests.", features: [["The lockers", "Searching all twelve takes three turns. One holds a silver pay token."], ["Nests", "Rat nests, still used."]], obvious: "Search every locker.", clever: "Search one or two, then move. Three turns is a lot of wandering checks." },
  { name: "The Mess Hall", light: "Dark", ra: "A long table with benches fills the room. Plates are still set at it, under a skin of dust.", features: [["The table", "Twelve places. Eleven plates are clean. One has bones on it, fresh."], ["The hatch", "To a kitchen, too small to climb."]], obvious: "Look at the plates.", clever: "Something eats here. Wait an hour, and it comes back." },
  { name: "The Pump Room", light: "Dark", ra: "A great iron pump stands in the middle of the room, its arm as long as a boat. It drips.", features: [["The pump", "Work the arm and it groans loud enough to be heard on every floor."], ["The drip", "Water rising slowly in a sump. It has not yet been pumped this year."]], obvious: "Try the pump.", clever: "Work the pump only when you want to draw something to this room." },
  { name: "The Stair Hall", light: "Dark", ra: "A broad hall meets three passages. Painted lamps on the walls point down each one.", features: [["The arrows", "Faded. One has been repainted in fresh red."], ["Floor", "Tracks of small clawed feet, and of boots."]], obvious: "Follow the red arrow.", clever: "Whoever painted it wants you to go that way." },
  { name: "The Hymn Room", light: "Faint blue light from the screen", ra: "A Terminal screen glows on a plinth at the end of a narrow hall. Rows of seats face it, and one seat is not dusty.", features: [["The screen", "It runs a hymn on loop. If the Minister or Elf Minister touches it, it pauses, and the clock on it shows the hour."], ["The clean seat", "Somebody comes here to listen."]], obvious: "Sit and read.", clever: "Use the screen's clock. Now you know how long you have been down here." },
  { name: "The Scullery", light: "Dark", ra: "Stone sinks line one wall, and a drain runs down the middle of the floor. Something scratches inside the drain.", features: [["The drain", "Rats use it as a road between rooms."], ["A crock", "Pickled fish, sealed with wax, still good."]], obvious: "Look in the drain.", clever: "Block the drain with a cloak and the rats have to use the doors." },
  { name: "The Clock Room", light: "Dark", ra: "A great clock face fills one wall, with one hand stuck at the hour of nine. Its works tick, slowly, somewhere behind the wall.", features: [["The clock", "Wound by a weight that drops a little every turn. Whoever winds it walks past here often."], ["A panel", "Opens on brass gears. Jamming them stops the tick."]], obvious: "Wind the clock.", clever: "Watch the weight. In a turn it drops a finger's width. It was wound four hours ago." }
];

ForgeTables.tower.mappingRoom = [
  { name: "The Turning Room", light: "Dark", ra: "A round room has four doors, all alike, set at the four quarters. A worn compass rose is cut in the floor.", features: [["The compass rose", "Its north points the wrong way by a quarter turn. Maps drawn by it come out twisted."], ["The doors", "Identical. Mark them, or get lost."]], obvious: "Pick a door.", clever: "Chalk each door before you leave the room." },
  { name: "The Map Room", light: "Dark", ra: "One wall is a mosaic map of the cellars, picked out in coloured stone. Some of it has fallen out.", features: [["The mosaic", "Shows this level, as built. A room is missing where a wall is now. A line runs through that wall."], ["Fallen tiles", "A heap. A patient PC can rebuild the map (three turns)."]], obvious: "Compare the mosaic with your own map.", clever: "Where the mosaic and your map disagree, there is a hidden door." },
  { name: "The Pillar Hall", light: "Dark", ra: "Square pillars hold up a low roof in rows. Every pillar has a number cut into it.", features: [["The numbers", "They run in order, except two that are swapped. The swap marks a hidden way."], ["Dust", "Footprints run between pillars and stop at a blank wall."]], obvious: "Walk through.", clever: "Follow the footprints to the blank wall and search there." },
  { name: "The Crossing", light: "Dark", ra: "Two passages cross here under a low dome. A dry fountain stands in the middle.", features: [["The fountain", "A bronze fish with an open mouth. Something rattles inside it."], ["The walls", "One wall is newer stone than the others."]], obvious: "Shake out the fountain.", clever: "Newer stone means a wall was built later. Search it." },
  { name: "The Chalk Room", light: "Dark", ra: "Someone has covered the walls in chalk arrows, crosses and numbers. Most of them are smudged.", features: [["The marks", "Another party's map, done in chalk. It shows a loop and a dead end. One arrow points into a wall."], ["A stub of chalk", "Use it."]], obvious: "Read the chalk.", clever: "Trust the arrow that points into the wall." },
  { name: "The Gear Room", light: "Dark", ra: "Iron wheels as tall as a man stand frozen in the walls. Shafts run from them through the stone in every direction.", features: [["The gears", "One shaft runs through a wall into a room you have not found."], ["A lever", "Rusted fast. Freeing it takes a turn and makes noise."]], obvious: "Try the lever.", clever: "Follow the shaft. Where it enters the wall, the wall is hollow." },
  { name: "The Echo Room", light: "Dark", ra: "A tall narrow room makes every sound come back changed. A word spoken here returns as a different word.", features: [["The echo", "Shout at each wall in turn. One wall returns no echo: there is space behind it."], ["A carved mouth", "Over the door. The keepers spoke passwords into it."]], obvious: "Hurry through. It is unsettling.", clever: "Use the echo to find the hollow wall." },
  { name: "The Wire Room", light: "Dark", ra: "Copper wires as thick as fingers run along the ceiling in bundles. A few hang down and twitch now and then.", features: [["The wires", "They run in from one wall and out through another. Their path is the shortest way through the level."], ["Loose ends", "A touch gives a jolt (1 damage) and lights a glass bead on the wall."]], obvious: "Duck under the wires.", clever: "Follow the wires. The keepers ran them the shortest way." }
];

ForgeTables.tower.retreatRoom = [
  { name: "The Ward Room", light: "Faint grey light from the wards", ra: "Brass eyes are set in the walls at head height, all facing the door. They follow anything that moves.", features: [["The eyes", "Wards and sensors at once. Undead and vermin will not cross the threshold while the eyes are open."], ["A bench", "Long enough to sleep on."]], obvious: "Stare back at the eyes.", clever: "Rest here. Nothing that is dead or small comes in." },
  { name: "The Strongroom", light: "Dark", ra: "A small room of dressed stone has a door a hand thick, with bolts on the inside. Shelves line the walls, empty.", features: [["The bolts", "Work. With the door bolted, wandering monsters must break it down (it takes them a turn and makes noise)."], ["Shelves", "One loose shelf hides a niche with two flasks of oil."]], obvious: "Bolt the door and rest.", clever: "This is the place to come back to. Mark it on the map." },
  { name: "The Chapel", light: "Dark", ra: "A small chapel holds a dead Terminal on its altar, its screen black. Benches face it, and candles stand in a rack.", features: [["The Terminal", "Dark. If the Minister prays here for a turn, it shows one line of hymn and then sleeps."], ["Candles", "A dozen. Each burns three turns."]], obvious: "Light the candles.", clever: "Rest here and pray. The Minister recovers one spell." },
  { name: "The Keepers' Dormitory", light: "Dark", ra: "Bunks of iron pipe line the walls, three high. Most have been stripped, but two still have dry mattresses.", features: [["Mattresses", "Dry. A party can sleep here."], ["Door", "Can be wedged with a bunk frame."]], obvious: "Sleep.", clever: "Wedge the door and set a watch." },
  { name: "The Infirmary", light: "Dark", ra: "Iron beds stand in a row, and a cabinet of glass jars fills one wall. A sharp clean smell hangs here still.", features: [["The jars", "Most dried out. One holds a salve that heals 1d4 once per character."], ["The door", "It locks from inside. The key is in it."]], obvious: "Take the salve.", clever: "Lock the door and rest. The salve works better after sleep: 1d4+1." },
  { name: "The Dry Well", light: "Dark", ra: "A round room has a dry well in its middle, with a winch. The walls are dry and the air is fresh.", features: [["The well", "Dry, 30' deep. A draught rises from it."], ["The winch", "Works. A bucket could lower gear, or a person."]], obvious: "Look down the well.", clever: "A fresh draught means another way out. This room is safe to rest in." },
  { name: "The Watch Room", light: "Dark", ra: "A small room has a slit that looks out over a long passage. A stool and a dead lantern sit by the slit.", features: [["The slit", "See anything coming down the passage a turn before it arrives."], ["The lantern", "Needs oil. Then it works."]], obvious: "Look through the slit.", clever: "Rest here with one on watch at the slit: no surprise for the party." },
  { name: "The Signal Store", light: "Dark", ra: "Crates of flags, lamps and mirrors are stacked to the roof. There is just space to sit among them.", features: [["The crates", "One holds six signal flares, wrapped in oilcloth. Each burns bright for a turn."], ["A door", "Shuts tight."]], obvious: "Search the crates.", clever: "Flares make good light in a pinch, and a better signal." }
];

ForgeTables.tower.study = [
  { name: "The Magister's Study", light: "Dark", ra: "A desk faces the door, and books line every wall. A body in a magister's coat sits at the desk, slumped over an open book.", features: [["The body", "Dead for years, kept dry. A ring of keys on its belt."], ["The books", "Logs, hymn texts, accounts. Reading them all takes a day."]], obvious: "Take the keys.", clever: "Read the open book first. He died writing it." },
  { name: "The Record Room", light: "Dark", ra: "Pigeonholes cover the walls from floor to ceiling, each stuffed with rolled papers. A ladder runs on a rail.", features: [["The papers", "Station logs, day by day. The last year is in the top row."], ["The ladder", "Squeaks. Make a wandering check the first time it is used."]], obvious: "Pull out papers at random.", clever: "Go to the last year. That is where the story ends." },
  { name: "The Lens Workshop", light: "Dark", ra: "Benches hold grinding wheels and half-made lenses. A daybook lies open beside a lens that was never finished.", features: [["The lenses", "Two finished ones are worth 20 gp each."], ["The daybook", "The lens-grinder's notes. The last pages are not about lenses."]], obvious: "Take the lenses.", clever: "Read the daybook." },
  { name: "The Chart Room", light: "Dark", ra: "A big table holds a chart of the lake, painted on hide and pinned flat with bronze weights. Notes in red ink cover its edges.", features: [["The chart", "Shows the island, the shore and depths. A mark below the island is labelled in red."], ["The weights", "Four bronze fish, 5 gp each."]], obvious: "Take the weights.", clever: "Read the red notes. They are about what lives below." },
  { name: "The Library", light: "Dark", ra: "Two rooms of shelves have been knocked into one. Many books are on the floor, swollen with damp, but one shelf is dry and full.", features: [["The dry shelf", "Hymnals, engineering texts and one keeper's journal."], ["Damp books", "Ruined."]], obvious: "Search the shelves.", clever: "The dry shelf is dry for a reason: the keeper kept what mattered there." },
  { name: "The Log Room", light: "Dark", ra: "A tall desk holds a great log book, chained to it. A pen still stands in a dry inkwell.", features: [["The log", "Every boat, every storm, every hour. The last pages are in a different hand."], ["The chain", "Long enough to read. Too strong to break quickly."]], obvious: "Read the last page.", clever: "Read the last ten pages. The change of handwriting is the key." },
  { name: "The Hymn Archive", light: "Faint blue light from a screen", ra: "Small screens line the walls, each showing a different page of text. Most are dark; three still glow.", features: [["The three screens", "Each shows one page, frozen. One is a keeper's last report, not a hymn."], ["The dark screens", "Copper and glass. 5 gp each to Harrow, if anyone carries them."]], obvious: "Pry out a screen to sell.", clever: "Read the three that still glow before touching anything." },
  { name: "The Keeper's Bedroom", light: "Dark", ra: "A narrow bed, a chest and a writing table fill a small room. Letters are tied in a bundle on the pillow.", features: [["The letters", "Never sent. To a sister, far away. The last one says what was wrong down below."], ["The chest", "Clothes, a razor, a small purse (12 gp)."]], obvious: "Take the purse.", clever: "Read the letters." }
];

ForgeTables.tower.guardPost = [
  { name: "The Stair Gate", light: "Lantern light", ra: "An iron gate closes off a stair that winds down into wet dark. A lantern hangs on the gate, lit.", features: [["The gate", "Locked from this side with a padlock. The guards hold the key."], ["The lantern", "Someone fills it every day."]], obvious: "Walk up to the gate.", clever: "Someone keeps that lantern lit. Wait and watch who comes." },
  { name: "The Winch Room", light: "Lantern light", ra: "A great winch drum takes up half the room. Its chain runs down through a hole in the floor into the dark.", features: [["The winch", "Lowers a cage to the cave below: two people a time, one turn a trip."], ["A stair", "Narrow, wet, beside the hole."]], obvious: "Ride the cage.", clever: "The cage is slow and loud. The stair is quiet." },
  { name: "The Sluice Room", light: "Lantern light", ra: "A sluice gate of rusted iron holds back black water. A narrow stair goes down beside it.", features: [["The sluice", "Opening it floods the stair for a turn."], ["The stair", "Wet, steep, 40' down."]], obvious: "Go down the stair.", clever: "Whoever holds the sluice wheel holds the stair." },
  { name: "The Barricade", light: "Firelight", ra: "Barrels, crates and a broken door make a wall across the room. Faces watch you over the top.", features: [["The barricade", "Waist high. Behind it, a stair down."], ["The fire", "Small, in a brazier, behind the wall."]], obvious: "Climb the barricade.", clever: "Talk over it first." },
  { name: "The Toll Room", light: "Lantern light", ra: "A table blocks the way to a stair down, with a cash box on it. A painted board says what everything costs, in three hands.", features: [["The board", "Prices to go down: one coin a head, five a boat, ten for anything that sings."], ["The box", "Holds 30 gp in mixed coins."]], obvious: "Pay.", clever: "Haggle. Everything on the board is a joke but the last line." },
  { name: "The Lift Shaft", light: "Lantern light", ra: "A square shaft drops through the floor. A platform on chains hangs at its top, and a crank stands beside it.", features: [["The platform", "Holds four. The crank needs two people."], ["Ladder", "Iron rungs in the wall of the shaft, slippery."]], obvious: "Ride the platform.", clever: "Climb down the ladder while the guards are busy with the crank." },
  { name: "The Drain Gate", light: "Lantern light", ra: "A grate of bars spans a tunnel that slopes down to the sound of water. Hammocks are slung across the room.", features: [["The grate", "Opens with a key. A small door in it opens with a different key."], ["Hammocks", "Someone lives here."]], obvious: "Look for the key.", clever: "There are two keys. The guards each hold one, and do not trust each other." },
  { name: "The Lower Landing", light: "Lantern light", ra: "A stair from above ends on a landing over a black shaft, where another stair begins. Someone has built a little camp across the top of it.", features: [["The camp", "Bedrolls, a pot, dice."], ["The stair down", "Damp. You can hear water at the bottom."]], obvious: "Walk into the camp.", clever: "Watch from the dark. Count them. Listen to what they argue about." }
];

ForgeTables.tower.cellarFiller = [
  { name: "The Armoury", light: "Dark", ra: "Weapon racks stand empty but for a few rusted spear-heads. A suit of imperial plate hangs on a stand, missing its helm.", features: [["The plate", "Heavy, rusted. A smith could fix it (AC 3 [16]) for 30 gp."], ["Spear-heads", "Junk."]], obvious: "Look at the armour.", clever: "Who took the helm?" },
  { name: "The Kitchen", light: "Dark", ra: "A cold range of black iron fills one wall, with pots still on it. The floor is greasy.", features: [["The range", "Imperial: no fire-box. Copper rings that grew hot by themselves. One still does when touched with iron."], ["Pots", "Mould."]], obvious: "Search the shelves.", clever: "The hot ring can boil water, dry boots, or light a torch." },
  { name: "The Bone Room", light: "Dark", ra: "Bones are stacked neatly along the walls, sorted by kind. Skulls sit in a row on a shelf.", features: [["The skulls", "Nine. Human. Each has a number painted on its brow."], ["Sorting", "Someone sorts the bones still. New ones go on the end."]], obvious: "Count the skulls.", clever: "The numbers match the graves above. All nine keepers are here, and the ninth was moved down last." },
  { name: "The Vinegar Cellar", light: "Dark", ra: "Racks of bottles fill the room, and the air stings the eyes. The wine turned long ago.", features: [["Bottles", "Vinegar. One rack has six sealed bottles of something else."], ["Six bottles", "Brandy, good. 5 gp each."]], obvious: "Open a bottle.", clever: "Search the far rack." },
  { name: "The Cells", light: "Dark", ra: "Four cells with iron doors line a short passage. Three stand open. One is shut.", features: [["The shut cell", "Locked. Inside, a skeleton chained to the wall, and on the wall a calendar of scratches."], ["Keys", "On a nail at the far end of the passage."]], obvious: "Open the shut cell.", clever: "Read the scratches: they count days, then they count something else." },
  { name: "The Smithy", light: "Dark", ra: "An anvil and a cold forge stand under a hood that vents up into the rock. Tools hang neatly on pegs.", features: [["Tools", "Good ones. Tongs, hammers, a file."], ["The forge", "Cold, but the bellows still work."]], obvious: "Take tools.", clever: "Use the forge to mend a weapon or bend a bar." },
  { name: "The Grain Store", light: "Dark", ra: "Wooden bins line the walls. The grain in them has rotted to black dust.", features: [["The dust", "Stirring it fills the room with a fog. –2 to hit in it for a turn."], ["Bin 4", "Has a false bottom: a cache of 40 gp in a tin."]], obvious: "Search the bins.", clever: "Tap the bins. One is shorter inside than out." },
  { name: "The Rope Walk", light: "Dark", ra: "A long narrow room holds hooks and spinning wheels for making rope. Coils of old rope lie on the floor.", features: [["Coils", "Most rotten. One 50' coil is good."], ["Hooks", "A pattern: someone tied knots here as a message."]], obvious: "Take the good rope.", clever: "Read the knots: a keeper's code for “danger below”." },
  { name: "The Glass Store", light: "Dark", ra: "Crates of glass sheets stand on edge in straw. Some have fallen and smashed across the floor.", features: [["Broken glass", "Crossing quietly is hard. Anything nearby hears."], ["Whole sheets", "Screen-glass blanks. Heavy. 10 gp each to the right buyer."]], obvious: "Cross carefully.", clever: "Sweep a path with a cloak." },
  { name: "The Privy", light: "Dark", ra: "A row of stone seats over a deep shaft. A draught comes up from below.", features: [["The shaft", "Drops into the water cave. Too narrow for a person in armour."], ["The draught", "Smells of the lake."]], obvious: "Hold your nose and move on.", clever: "Drop a coin and count: the water is 40' down." },
  { name: "The Pay Office", light: "Dark", ra: "A counter with a grille divides the room. Ledgers stand on shelves behind it.", features: [["The ledgers", "Pay for keepers. The pay stopped a year before the last entry."], ["A strongbox", "Locked, under the counter. 25 gp in imperial silver."]], obvious: "Open the strongbox.", clever: "The pay stopped long before the keepers left. They stayed for something." },
  { name: "The Fallen Room", light: "Dark", ra: "Half the ceiling has come down and filled the room with rubble. A gap runs along one wall.", features: [["The gap", "Single file. Anyone in plate squeezes slowly (a turn)."], ["The rubble", "Something is buried under it: a hand, holding a lamp."]], obvious: "Squeeze through.", clever: "Dig out the lamp. It is a keeper's lantern, and still works." },
  { name: "The Mushroom Beds", light: "Faint green glow", ra: "Trays of black earth hold pale mushrooms that glow green. The air is warm and wet.", features: [["The mushrooms", "Edible, and they glow for a day after picking. A handful lights like a candle."], ["Trays", "Someone has been picking them."]], obvious: "Pick some.", clever: "Use them as a light that does not burn out." },
  { name: "The Lens Vault", light: "Dark", ra: "A round room has a lens as tall as a man set upright in a frame. Light from your torch comes out of it many times brighter.", features: [["The lens", "It throws a beam 120' long. Too big to move."], ["The frame", "Turns on a pin. The beam can be aimed down the passage outside."]], obvious: "Shine the beam down the passage.", clever: "Anything in that passage is now dazzled for a round." },
  { name: "The Bell Room", light: "Dark", ra: "Small bells hang from the ceiling on wires, hundreds of them. They tremble when anyone moves.", features: [["The bells", "Each is tied to a door on this level. When one rings, it says which door opened."], ["Labels", "Under each bell, a room name in Imperial Common."]], obvious: "Walk through, and the bells ring.", clever: "Watch the bells for a turn. You learn where things are moving." },
  { name: "The Engine Room", light: "Faint red glow", ra: "A machine of black iron fills the room, humming. It has no fire and no moving parts, but it is warm.", features: [["The machine", "Old magic, or an old engine. It hums the hymn's bass note, very low."], ["Plates", "In Imperial Common: “Do Not Silence.”"]], obvious: "Touch it.", clever: "Leave it alone. Note what it says, and ask the Minister." },
  { name: "The Battery Room", light: "Faint blue sparks", ra: "Jars as tall as a child stand in rows, joined by copper straps. Now and then a blue spark jumps between two of them.", features: [["The jars", "Hold something that tastes of lightning. Touching a strap: 1d4 damage."], ["One jar", "Cracked, leaking. The floor near it is eaten away."]], obvious: "Go around.", clever: "A spark lights a torch. And iron near the jars gets warm." },
  { name: "The Laundry", light: "Dark", ra: "Stone tubs and a mangle stand under drying lines. Grey uniforms still hang on the lines, stiff with age.", features: [["Uniforms", "Imperial keepers' blue. Wearing one fools a guard for a moment."], ["A tub", "Full of water, not stale. Someone uses it."]], obvious: "Search the uniforms.", clever: "Wear a uniform to the guard post." },
  { name: "The Crypt", light: "Dark", ra: "Niches in the walls hold shrouded bodies, each with a little lamp at its feet. All the lamps are cold.", features: [["The niches", "Six. One is empty, and its lamp is missing."], ["Grave goods", "A silver lamp in each niche, 5 gp each. Taking them angers the Minister."]], obvious: "Take the lamps.", clever: "Light one of the lamps. Something in this crypt is calmer in the light." },
  { name: "The Speaking Room", light: "Dark", ra: "Brass tubes come out of the walls and end in flared mouths. A chair faces them.", features: [["The tubes", "Each runs to another room. Speak into one and be heard there."], ["Labels", "Most are gone. One tube still says “Lower Dock”."]], obvious: "Speak into a tube.", clever: "Listen at the tubes. Someone below is talking." }
];

/* Water cave. */
ForgeTables.tower.caveEntry = [
  { name: "The Wet Stair Foot", light: "Dark. A green glow from the water", ra: "The stair ends in a cave where the walls drip and the floor is wet rock. The sound of water is everywhere.", features: [["The glow", "Something in the water gives off a faint green light."], ["Tide marks", "The water has been 3' higher than now."]], obvious: "Step down into the cave.", clever: "Read the tide marks. If the water rises, this stair is the way out." },
  { name: "The Landing Cave", light: "Dark", ra: "A natural cave has been cut flat on one side to make a dock. Iron rings hang from the cut face.", features: [["The dock", "Wet. A boat was tied here recently."], ["Rings", "Rope fibres still on one."]], obvious: "Walk along the dock.", clever: "A boat came in here from somewhere. There is a way out by water." },
  { name: "The Cage Bottom", light: "Dark", ra: "The shaft opens into the roof of a cave. Below it, a pile of broken crates breaks the fall of anything dropped.", features: [["The crates", "Smugglers' crates, empty, with marks."], ["The roof", "Low. Tall people stoop."]], obvious: "Climb down onto the crates.", clever: "Read the crate marks: who shipped what, and to where." },
  { name: "The Spray Cave", light: "Dark", ra: "Spray from a fall somewhere ahead fills the cave with mist. Torches hiss and spit.", features: [["The mist", "Torches burn half as long here. Lanterns are fine."], ["The noise", "Too loud to hear anything coming."]], obvious: "Push on fast.", clever: "Cover the torches, or switch to a lantern." },
  { name: "The Old Pipe", light: "Dark", ra: "The stair ends in a great iron pipe, cut open, that runs into a cave. Water trickles along its bottom.", features: [["The pipe", "Big enough to walk in. Sound carries along it."], ["Bolts", "Huge. The pipe once ran all the way to the lake."]], obvious: "Walk out of the pipe.", clever: "Listen down the pipe. It brings sound from the far end of the caves." },
  { name: "The Bone Shelf", light: "Dark", ra: "A shelf of rock at the foot of the stair is covered in small white bones. They crunch underfoot.", features: [["The bones", "Fish, birds, rats. Something eats here."], ["A gap", "In the bones, a clean path where something drags itself."]], obvious: "Walk through.", clever: "The clean path is where the big thing goes. Do not stand on it." }
];

/* Hazards: water and obstacle, not damage-dealers. */
ForgeTables.tower.hazards = [
  { name: "The Sump", ra: "The passage dips under the water and comes up again 20' on. The water is black and very cold.", rule: "Swimming through takes one round. Anyone in metal armour must take it off or be hauled through on a rope. Torches go out. Each swimmer saves vs. paralysis or loses one held item.", obvious: "Swim it.", clever: "Run a rope through first, so the rest can pull themselves along and pass gear in a sealed bag." },
  { name: "The Rising Pool", ra: "A pool fills the cave, and the only path is a ledge a foot above the water. The water is rising, slowly.", rule: "The water rises a foot every 2 turns. After 4 turns the ledge is under water and the crossing is a swim (see the Sump).", obvious: "Cross now.", clever: "Learn when the water falls. It comes back down after 6 turns." },
  { name: "The Rope Bridge", ra: "An old bridge of rope and plank spans a cleft over rushing water. Half the planks are missing.", rule: "Crossing takes a round per person. Each crosser saves vs. paralysis (+2 with a safety line). A failure means hanging by the hands; a second failure, the water (see the current).", obvious: "Cross one at a time.", clever: "Run a second rope as a safety line. Then nobody falls far." },
  { name: "The Current", ra: "A fast black stream runs across the cave, waist-deep. It pulls hard toward a low hole in the wall.", rule: "Wading across: save vs. paralysis or be swept 30' to the hole. Anyone swept is pinned there and must be pulled out (a strength test, or two helpers). No damage unless left there.", obvious: "Wade across holding hands.", clever: "Wedge a plank or spear across the hole, so nobody can be swept through it." },
  { name: "The Weed Pool", ra: "Long pale weed fills a pool you must cross. It moves against the current.", rule: "Weed tangles a wading PC: save vs. paralysis or stuck for a round. Cutting free takes a round. Fire makes the weed pull back.", obvious: "Wade and cut.", clever: "Burn a little oil on the water. The weed pulls back for a turn." },
  { name: "The Slick Ramp", ra: "The floor slopes down to the water and is coated in green slime. The cave goes on across the pool.", rule: "Walking down: save vs. paralysis or slide into the water (no damage, wet gear, lost torch). Climbing back up without a rope is impossible.", obvious: "Walk down slowly.", clever: "Sand, ash or a cloak on the slime gives grip. Or fix a rope at the top." },
  { name: "The Cold Run", ra: "Water to the chest fills a long tunnel. It is cold enough to stop the breath.", rule: "Wading takes 2 turns. Each PC saves vs. poison or loses 1d4 hp to cold, and is shaking (–1 to hit) until warmed by a fire.", obvious: "Wade it fast.", clever: "Light a fire on the far side before the rest cross, or carry dry clothes in oilcloth." },
  { name: "The Siphon", ra: "Water drains from this cave in pulses, with a great sucking sound. The floor is dry for a while, and then it is not.", rule: "Every third round water floods the floor knee-deep and drags toward a drain. Anyone on the floor then saves vs. paralysis or is dragged 10' and loses a held item.", obvious: "Run across between pulses.", clever: "Count the pulses first. Then everyone goes at once." },
  { name: "The Drip Shaft", ra: "Water falls from a hole in the roof in a white column, filling the cave with noise. The way on is behind it.", rule: "Passing under the fall: torches go out; save vs. paralysis or be knocked flat (1 damage). The noise hides all sound: no listening, no surprise for anyone.", obvious: "Run through the fall.", clever: "Edge around it on the wall side. Slower, dry." },
  { name: "The Mud Flat", ra: "A flat of grey mud covers the cave floor. It looks firm. It is not.", rule: "Each PC sinks to the knee in the first 10', to the waist in the next 10'. Stuck PCs need a rope from someone on firm ground. Armour makes it worse.", obvious: "Wade it.", clever: "Lay boards, shields or crates as a path. Or go around on the wall ledge." },
  { name: "The Flooded Gallery", ra: "A gallery built by the empire runs on, half flooded. Pillars rise out of still water.", rule: "The water is 4' deep. Under it the floor has holes, old drains. Each PC who does not probe ahead rolls d6: on a 1 they drop into a drain and must be pulled out (a round under water).", obvious: "Wade along the wall.", clever: "Probe ahead with a pole. Then the holes show." },
  { name: "The Ledge Walk", ra: "A ledge a foot wide runs along a cliff of wet rock above deep water. It is the only way.", rule: "Each PC saves vs. paralysis or falls in. The water is deep and still: no damage, but armour drags. Climbing back takes a rope.", obvious: "Walk it.", clever: "Rope everyone together. One fall then costs a round, not a life." },
  { name: "The Tide Door", ra: "A metal door, half under water, closes the way on. A wheel stands in the wall beside it.", rule: "Turning the wheel takes a turn and two people. The door opens and the water behind it rushes out: everyone in the room saves vs. paralysis or is knocked down and loses a held item.", obvious: "Turn the wheel.", clever: "Stand on the high side. Tie the gear down first." },
  { name: "The Eel Pool", ra: "Long dark shapes move in a pool that must be waded. They do not bite. They brush against legs.", rule: "Eels are harmless but frightening: any hireling must check morale or refuse to cross. Fish thrown upstream draws them away for a turn.", obvious: "Wade across.", clever: "Throw them fish, or carry the hirelings." },
  { name: "The Dark Water", ra: "The cave ends in a pool of still black water. The way on is under it: you can see the glow of another cave beneath.", rule: "Swimming down 10' and along 20' takes 2 rounds. A non-swimmer must be towed. Anyone who panics (hireling morale) drops what they hold.", obvious: "Swim.", clever: "Tie a rope and send the strongest swimmer first to fix it on the far side." }
];

ForgeTables.tower.caveFiller = [
  { name: "The Smugglers' Shelf", light: "Dark", ra: "A dry shelf of rock above the water holds stacked crates and barrels. Someone has painted numbers on them.", features: [["The crates", "Mostly empty. One holds bolts of good cloth (20 gp)."], ["The numbers", "A count. Some numbers are crossed out."]], obvious: "Search the crates.", clever: "The crossed-out numbers say what left recently." },
  { name: "The Bat Roost", light: "Dark", ra: "The roof of the cave is black with sleeping bats. The floor is thick with their dung.", features: [["The bats", "Light or noise wakes them. They fly out in a storm for a round: no damage, torches go out."], ["Dung", "Saltpetre. Worth money to someone who makes fire-powder."]], obvious: "Walk through quietly.", clever: "Dim the lights and walk on the wall side." },
  { name: "The Shingle Cave", light: "Dark", ra: "A beach of shingle slopes down to still water. Small crabs scatter from every step.", features: [["The shingle", "Noisy underfoot."], ["The crabs", "Harmless. Good eating."]], obvious: "Walk the beach.", clever: "Something larger eats these crabs. Look at the broken shells." },
  { name: "The Wreck Cave", light: "Dark", ra: "The ribs of a boat stick up out of the water like a cage. A lantern hangs from one rib, cold.", features: [["The wreck", "An imperial launch. A box is wedged in the bow, under water."], ["The box", "Holds a sealed tin of charts of the lake."]], obvious: "Dive for the box.", clever: "Use a pole and a hook from the shore." },
  { name: "The Glow Cave", light: "Green glow", ra: "The walls are covered with a soft green growth that glows. You can see without a torch.", features: [["The glow", "Light as dusk. No torch needed here."], ["The growth", "Scrape some and it glows for an hour."]], obvious: "Rest your torches.", clever: "Carry a scraping in a jar. It is a light that does not burn." },
  { name: "The Salt Cave", light: "Dark", ra: "White crystals crust the walls and crunch underfoot. The air tastes of salt.", features: [["The salt", "Good salt. A sack is worth 5 gp at The Fort."], ["A pick", "Left here, the handle still sound."]], obvious: "Fill a sack.", clever: "Salt is a trade good. Who needs it?" },
  { name: "The Shell Midden", light: "Dark", ra: "A heap of shells taller than a man fills the back of the cave. Some shells are as big as shields.", features: [["The big shells", "Giant crab moults. Something big grew up here."], ["In the heap", "A rusted helmet, and in it a silver ring (15 gp)."]], obvious: "Dig in the heap.", clever: "Measure the moults. The crab that made the last one is now bigger." },
  { name: "The Echo Dome", light: "Dark", ra: "A tall round cave rises into darkness. Every drip echoes up and comes back down.", features: [["The echo", "Speak here and the whole cave system hears."], ["The roof", "A hole at the top lets in a line of grey daylight."]], obvious: "Shout to test the echo.", clever: "Do not shout." },
  { name: "The Spring", light: "Dark", ra: "Fresh water bubbles up from a crack into a stone basin. Someone has set a cup beside it.", features: [["The water", "Sweet and clean."], ["The cup", "Bone. Carved with an eye."]], obvious: "Drink.", clever: "Fill the skins. And ask who carved the cup." },
  { name: "The Crystal Throat", light: "Dark", ra: "A narrow passage is lined with glassy crystals that ring when touched. The ringing does not stop.", features: [["The crystals", "Touching one sets them all ringing for a turn. Make a wandering check."], ["A broken one", "Inside, a thread of copper. These are not natural."]], obvious: "Squeeze through.", clever: "Wrap hands and shoulders in cloth before squeezing." },
  { name: "The Old Boat", light: "Dark", ra: "A small boat sits on a ledge high above the water, as if the water once rose to here. Its oars are still in it.", features: [["The boat", "Sound. It could be launched into the cave water."], ["A tin box", "Under the seat: fish-hooks, a flint, a candle."]], obvious: "Search the boat.", clever: "Launch it. A boat crosses the water hazards dry." },
  { name: "The Weed Curtain", light: "Dark", ra: "Long dry weed hangs from the roof like a curtain. Beyond it, the cave goes on.", features: [["The weed", "Burns fast if lit. Burns out in a round."], ["Beyond", "Something has dragged a path through the weed."]], obvious: "Push through.", clever: "Part it with a spear first." },
  { name: "The Bone Beach", light: "Dark", ra: "A strip of sand at the waterline is scattered with bones. Some still wear rusted imperial mail.", features: [["The bones", "Three keepers, from the mail."], ["A belt pouch", "On one: a key of bronze with a lamp on the bow."]], obvious: "Search the bodies.", clever: "The key fits something in the deepest cave." },
  { name: "The Pillar Cave", light: "Dark", ra: "Stone columns rise from the water to the roof. A path of stepping stones winds between them.", features: [["The stones", "One in five rocks underfoot. Save vs. paralysis or a wet foot."], ["Pillars", "Some have iron bands. The empire propped this cave."]], obvious: "Step stone to stone.", clever: "Watch where the last person stepped. The rocking stones are the clean ones." },
  { name: "The Pump Chamber", light: "Faint red glow", ra: "An iron machine stands in the water, its pistons still. Red lamps glow along its side.", features: [["The machine", "A pump. It still has power. A lever starts it."], ["If started", "The water in the next cave falls by 2' in a turn."]], obvious: "Pull the lever.", clever: "The pump can drain a hazard elsewhere in the caves." }
];

/* Climax guardians. Each brings its own room, and the clues that change its fight.
   count: creatures at party level 1, 2, 3. */
ForgeTables.tower.guardians = [
  { id: "lensCrab", monster: "giantCrab", count: [1, 2, 2], room: "The Lamp Pool", light: "Faint white light from the crab's back",
    ra: "A round pool fills a dome of rock, and something under the water carries a light. A giant crab rises with a lamp-lens grown into its shell, shining like a lantern.",
    features: [["The lens", "Imperial. It is a lamp and a ward at once, set in the shell when the crab was small. It still sees."], ["The pool floor", "Silver and bones. 2d6 × 10 gp in old coins."]],
    tactics: "It comes to light. It fights at the water's edge and drags prey under.",
    overview: "a giant crab that wears an imperial lamp-lens grown into its shell",
    clues: [
      { where: "the lens-grinder's notes", text: "“The crab follows the lamp. In the dark it goes back to the pool and waits.”", effect: "If every light is put out, the crab sinks back into the pool for 1d4+1 rounds. The party can cross in the dark." },
      { where: "a drawing pinned over the desk", text: "A sketch of the crab, with the lens circled: “Glass, not shell. Strike the glass.”", effect: "Attacks aimed at the lens are at –2 but hit AC 7 [12]. When the lens breaks, the crab flees into the deep water." }
    ],
    rumor: "Something in the tower's caves carries a light on its back." },
  { id: "keeperDogs", monster: "crocodile", count: [2, 3, 4], room: "The Feeding Trough", light: "Dark",
    ra: "A long trough of stone runs along a pool, and chains hang from rings above it. Crocodiles lie half out of the water, each with a bronze collar round its neck.",
    features: [["The collars", "Control collars. Each has a dull glass eye that brightens when the feeding bell rings."], ["The bell", "Hangs over the trough. Rope gone."], ["Under the trough", "The last keeper's purse: 60 gp."]],
    tactics: "They lie still until someone comes within 10' of the water, then lunge.",
    overview: "collared crocodiles the keepers fed by a bell",
    clues: [
      { where: "the keeper's feeding log", text: "“Three strokes on the bell, and the dogs go to the trough. Wait for the third.”", effect: "Three strokes on the bell send every crocodile to the trough for 3 rounds. It works once a day." },
      { where: "a note in the margin of a hymn", text: "“The dogs will not cross the copper. Mind the copper line when you feed them.”", effect: "A copper strip is set in the floor 10' from the water. The crocodiles will not cross it. A party behind it can shoot in safety." }
    ],
    rumor: "The keepers kept animals in the caves, fed by a bell." },
  { id: "cleaner", monster: "gelatinousCube", count: [1, 1, 1], room: "The Sluice", light: "Dark",
    ra: "A square channel cut in the rock runs to a great iron gate at its end. The channel is clean, very clean, and the air in it does not move.",
    features: [["The cube", "It fills the channel and is almost invisible. Inside it hang a sword, coins and a key."], ["Inside the cube", "A sword +1, 3d10 gp, and a bronze key to the iron gate."], ["The gate wheel", "On the wall by the gate."]],
    tactics: "It slides up the channel toward warmth and swallows what it touches.",
    overview: "a creature the keepers used to keep the drains clean",
    clues: [
      { where: "the station's drain plans", text: "“Open the high sluice and the Cleaner goes down the drain with the flood.”", effect: "Turning the gate wheel (a turn, two people) floods the channel and carries the cube away, with its treasure, unless someone grabs the key first." },
      { where: "a scrawl on the last page of the log", text: "“It will not touch the oil. Never put out the oil.”", effect: "A line of burning oil across the channel stops the cube. It will not cross while the oil burns (a flask burns 1 turn)." }
    ],
    rumor: "The caves under the tower are clean. Too clean." },
  { id: "lastCrew", monster: "ghoul", count: [1, 2, 3], extra: { monster: "skeleton", count: [2, 2, 3] }, room: "The Drowned Barge", light: "Dark",
    ra: "A flat imperial barge lies in a cave pool, its deck just above the water. Figures stand on the deck in a line, as if waiting for an order.",
    features: [["The barge", "Its hold has the crew's pay chest: 120 gp in imperial silver."], ["The watch bell", "On a post at the stern."]],
    tactics: "They wait for a command. When none comes, they come ashore.",
    overview: "the drowned crew of an imperial barge, still on watch",
    clues: [
      { where: "the barge master's orders", text: "“Change of watch at the bell. All hands stand to.”", effect: "Two strokes on the watch bell make the crew stand to attention for one turn. They do not attack anyone who does not touch them." },
      { where: "a keeper's prayer book", text: "“They will not cross salt. We lined the stair with it.”", effect: "A line of salt (any sack from the caves or the cellars) holds the dead back. They will not cross it." }
    ],
    rumor: "A barge sank under the island. Its crew never left it." },
  { id: "standingWatch", monster: "skeleton", count: [4, 6, 8], room: "The Gate of the Watch", light: "Dark",
    ra: "Skeletons in imperial plate stand in two ranks before a gate of bronze. Their helms all turn to face the party at once.",
    features: [["The gate", "Bronze, cut with eyes. Behind it, the station's strong room: 200 gp and a magic item."], ["Their helms", "Each helm has a glass eye in its brow, a ward-eye. They see in the dark."]],
    tactics: "They step forward in rank and fight in rank.",
    overview: "the station's last watch, still standing guard in plate",
    clues: [
      { where: "the station orders", text: "“Watchword: the first line of the evening hymn, spoken in order.”", effect: "Speaking the first line of the evening hymn in order makes the watch step aside. The Minister knows the line. Spoken backward, it makes them attack at +1." },
      { where: "the armourer's notes", text: "“The eyes in the helms see heat, not light. Cold men walk past.”", effect: "A PC soaked in cold water from the caves walks past the watch unseen for 2 rounds." }
    ],
    rumor: "Soldiers still stand guard under the tower." },
  { id: "redChoir", monster: "stirge", count: [4, 6, 8], room: "The Lamp Dome", light: "A dull red lamp, half dead",
    ra: "A high dome of rock holds an iron cage with a red lamp in it, hanging on a chain. The roof around it is crusted with grey bodies that stir.",
    features: [["The red lamp", "Low on oil. When it goes out, the stirges wake."], ["The floor", "Bones and a keeper's satchel: 40 gp and a scroll of light."]],
    tactics: "They drop on the first warm body and drink.",
    overview: "a roost of stirges kept asleep by a red lamp",
    clues: [
      { where: "the lamp-keeper's notes", text: "“While the red lamp burns, they sleep. Oil it every day.”", effect: "Filling the red lamp with oil (one flask) keeps the stirges asleep while the party crosses." },
      { where: "a burned page", text: "“Smoke drives them out. We burned weed at the far end and they flew to the lake.”", effect: "A smoky fire at the far side drives the stirges out of the cave for a turn." }
    ],
    rumor: "Something in the tower drinks blood. It hates smoke." },
  { id: "lampBeetles", monster: "fireBeetle", count: [3, 5, 6], room: "The Furnace", light: "Red glow from the beetles",
    ra: "A great iron furnace stands cold in a cave, its door hanging open. Red lights move inside it and around it.",
    features: [["The furnace", "Imperial. It has no fuel box. It once glowed by itself."], ["Inside", "A nest of beetle eggs and a brass coffer: 80 gp and a potion."]],
    tactics: "They swarm anything warm.",
    overview: "fire beetles nesting in a dead imperial furnace",
    clues: [
      { where: "the stoker's tally", text: "“The beetles come to heat. Warm the far brazier and they leave the furnace.”", effect: "A fire in the brazier at the cave's far end draws the beetles to it for a turn." },
      { where: "a drawing in the margin", text: "“Under the shell, behind the head: soft.”", effect: "A PC who knows where to strike gets +2 to hit the beetles." }
    ],
    rumor: "The old furnace under the tower glows red again." },
  { id: "turningMen", monster: "zombie", count: [2, 3, 4], room: "The Capstan Cave", light: "Dark",
    ra: "Grey figures walk in a slow circle, pushing the bars of a great capstan. A chain from it runs up into the dark.",
    features: [["The capstan", "Holds a sluice shut. If it stops, water floods the lower caves."], ["A box", "By the capstan: the keepers' strongbox, 150 gp."]],
    tactics: "They turn the capstan. If anyone touches it, they stop turning and attack.",
    overview: "dead men who still turn the station's capstan",
    clues: [
      { where: "the engineer's book", text: "“The capstan pawl holds it. Drop the pawl, and the men may rest.”", effect: "Dropping the iron pawl (a lever, a round) locks the capstan. The zombies stop and stand still. Nothing floods." },
      { where: "a hymn-sheet with notes", text: "“They turn to the hymn. Sing it backward and they turn backward.”", effect: "Singing the hymn backward makes the zombies turn the capstan the other way. The chain lifts a gate across the cave in one turn." }
    ],
    rumor: "Dead men turn a wheel under the tower." },
  { id: "boundOne", monster: "ogre", count: [1, 1, 1], room: "The Chain Cave", light: "Dark",
    ra: "An ogre sits chained to a pillar of iron, a bronze collar on its neck. It has been here a long time, and it speaks.",
    features: [["The collar", "A control collar. Its glass eye glows when the ogre goes past the chain's reach."], ["The chain", "20' long. Bolted to the pillar."], ["Behind the pillar", "A smugglers' cache: 100 gp and two flasks of oil."]],
    tactics: "It fights anyone in reach. It talks to anyone out of reach.",
    overview: "an ogre chained there by a control collar",
    clues: [
      { where: "the keeper's list of words", text: "“The collar answers to the word ‘Rest’. Spoken by a keeper.”", effect: "Saying “Rest” in Imperial Common while wearing a keeper's coat opens the collar. The ogre is free; its reaction roll is +3." },
      { where: "a diagram on the wall", text: "“Collar draws power from the pillar. Cut the copper and it sleeps.”", effect: "Cutting the copper at the pillar's base (out of reach) makes the collar shock the ogre once: it sleeps for a turn." }
    ],
    rumor: "Something big is chained under the island. It talks." },
  { id: "glassNest", monster: "crabSpider", count: [2, 3, 3], minLevel: 2, room: "The Glass Cave", light: "Dark",
    ra: "The floor of this cave is a drift of broken screen-glass that glitters in the light. Something pale moves on it, very still, then very fast.",
    features: [["The glass", "Every step crunches. The spiders hunt by the sound."], ["Under the glass", "A dead smuggler with 70 gp and a magic item."]],
    tactics: "They wait in the glass and strike whatever makes noise.",
    overview: "crab spiders in a drift of broken screen-glass",
    clues: [
      { where: "a smuggler's warning chalked on a crate", text: "“They hear the glass. Lay cloth and walk on it.”", effect: "Cloaks laid on the glass silence it. The spiders lose their surprise." },
      { where: "the station's vermin log", text: "“They hate the cold lamp. Shine the white lamp on them.”", effect: "The white glass tubes from the station make the spiders back off: they will not come into that light." }
    ],
    rumor: "The caves are full of broken glass, and something lives in it." },
  { id: "poolFolk", monster: "lizardMan", count: [2, 3, 4], room: "The Lamp Shrine", light: "Torchlight",
    ra: "Lizard men squat round a broken lamp set on a rock in the middle of a pool. They have hung it with shells and fish bones like an altar.",
    features: [["The lamp", "The station's old beacon head. Its glass is gone."], ["Offerings", "Shells, fish bones, 90 gp in coins and a silver ring."]],
    tactics: "They guard the lamp to the death.",
    overview: "lizard men who worship the station's dead beacon",
    clues: [
      { where: "the lens-grinder's notes", text: "“The lake people want the beacon lit. Bring them the lens.”", effect: "Bringing a whole lens from the tower and setting it in the lamp makes the lizard men friendly. They let the party take what they came for." },
      { where: "a trader's letter", text: "“They trade for salt. Never come empty-handed.”", effect: "A sack of salt makes the first reaction roll +3." }
    ],
    rumor: "The lake people pray to an old lamp." }
];

/* Parley groups at the guard post. reaction: [2 or less, 3–5, 6–8, 9–11, 12+]. */
ForgeTables.tower.npcGroups = [
  { id: "oilers", name: "oil smugglers", monster: "bandit", count: [3, 4, 5], look: "Four or five people in oilcloth coats sit around a lantern, dice in hand. Their boss has a hook where her left hand should be.", boss: "a woman with a hook for a hand",
    want: "to move their oil and be left alone", know: "they know the guardian below, and what wakes it", offer: "safe passage for 10 gp a head, or for news of who is coming from the shore",
    reaction: ["They attack, aiming to drive the party back up the stair.", "Hands on knives. “Turn round.” They will fight if pushed.", "They watch, and wait to see what the party wants.", "“Pay the toll and go where you like.” They will talk.", "They offer a drink and tell what they know of the caves below."] },
  { id: "salvagers", name: "salvagers from the fishing village", monster: "bandit", count: [3, 4, 6], look: "People in patched coats are stripping copper from the walls with crowbars. A heap of green wire sits by the stair.", boss: "an old man who calls everyone 'cousin'",
    want: "copper, and nobody else finding it", know: "they have seen the guardian and they know one trick that works on it", offer: "a share of the copper if the party clears the caves below",
    reaction: ["They swing crowbars and shout for help.", "“Our find. Get your own.” They block the stair.", "They stop work and stare.", "“Cousins! Seen any more copper?” They will deal.", "They share their bread and warn the party about the caves."] },
  { id: "netmenders", name: "goblin net-menders", monster: "goblin", count: [4, 6, 8], look: "Goblins sit in a ring mending nets of copper wire. They wear imperial helmets with the visors cut away.", boss: "a goblin with three helmets stacked on its head",
    want: "fish, and copper for their nets", know: "they fish the cave pools and know where the guardian sleeps", offer: "to guide the party past the water for a bag of salt or a good knife",
    reaction: ["They throw nets and attack.", "They brandish spears and hiss.", "They whisper among themselves and wait.", "“Trade? Trade!” They want anything shiny.", "They offer smoked fish and show the way down."] },
  { id: "diggers", name: "kobold glass-diggers", monster: "kobold", count: [5, 7, 9], look: "Kobolds in leather aprons pick through a heap of broken screen-glass by candlelight. Every one wears gloves.", boss: "a kobold with a lens strapped over one eye",
    want: "unbroken screen-glass, which they think is holy", know: "they have dug into every cave and know the safe way", offer: "a map scratched on a slate, for one whole screen",
    reaction: ["They fling glass and charge.", "They hide behind the heap and throw stones.", "They freeze and watch, candles shaking.", "“Glass? You have glass?” They will trade.", "They bow and offer a lens as a gift."] },
  { id: "deserters", name: "deserters in imperial coats", monster: "bandit", count: [3, 5, 6], look: "Men and women in faded imperial coats sit with their backs to the wall, crossbows on their knees. Their coats have the badges cut off.", boss: "a tired sergeant with a burned face",
    want: "to stay hidden and to get news of the road", know: "they came down to hide and found the guardian; two of them did not come back", offer: "everything they know, for a promise to say nothing at The Fort",
    reaction: ["“Nobody saw us.” They shoot.", "Crossbows up. “Back off, slowly.”", "They hold still, fingers on triggers.", "“Sit. Talk. What's the news?”", "They lower their bows and ask for help getting home."] },
  { id: "pilgrims", name: "hymn pilgrims", monster: "acolyte", count: [2, 3, 4], look: "People in white, armoured in old plate, kneel before a dead Terminal screen and sing. Their song is out of tune.", boss: "a young pilgrim with a cracked screen hung round her neck",
    want: "to hear the station's Terminal speak once", know: "they have read the station's hymns and know a line that calms the guardian", offer: "the hymn line, if the party helps them reach the deepest cave",
    reaction: ["They take the party for Readers and attack.", "They draw maces and demand a hymn as proof of faith.", "They keep singing and ignore the party.", "They stop and ask the party's names.", "They bless the party and share their oil and bread."] },
  { id: "surveyors", name: "a lost survey party", monster: "bandit", count: [3, 3, 4], look: "Three or four people in good boots argue over a chart by lantern light. One is bandaged.", boss: "a surveyor with a brass measuring chain",
    want: "to get out alive with their charts", know: "they have measured the caves and know the water rises", offer: "a copy of their chart of the caves",
    reaction: ["They panic and fight.", "“Stay back!” They think the party are smugglers.", "They wait, nervous.", "They ask for help and offer to pay.", "They hand over a copy of their chart and ask to come along."] },
  { id: "tolltakers", name: "orc toll-takers", monster: "orc", count: [3, 5, 6], look: "Orcs in mismatched imperial armour sit around a chest, which they use as a table. A board on the wall says TOLL in three bad hands.", boss: "an orc wearing a magister's hat",
    want: "tolls, and respect", know: "they let the smugglers through and know what lives below", offer: "passage for a toll, and a warning",
    reaction: ["“No toll? Then blood.” They attack.", "“Toll is double for you.”", "They demand the toll and wait.", "“Toll, and we tell you a secret.”", "“You! Friends! Half toll!” They want to hear the party's stories."] },
  { id: "readers", name: "Reader scouts", monster: "acolyte", count: [2, 3, 4], look: "Polite people in grey plate copy the wall inscriptions into books, reading them aloud from end to start.", boss: "a soft-spoken scholar with ink on his fingers",
    want: "the station's hymn texts, to read them backward", know: "they know what the guardian is for, and they mean to set it free", offer: "help with the guardian, if the party lets them copy the study's books",
    reaction: ["They attack, very calmly.", "They ask the party to leave, and do not move aside.", "They keep reading and ignore the party.", "They are pleased to talk. They are very polite.", "They share tea and a warning that sounds like a threat."] },
  { id: "eelfishers", name: "lizard-man eel fishers", monster: "lizardMan", count: [2, 3, 4], look: "Lizard men squat by a stair that runs down to water, with eel traps of woven reed. They watch without blinking.", boss: "the biggest, with a shell necklace",
    want: "to fish in peace", know: "they know the water below and every hazard in it", offer: "a guide past the water for fish, salt or a blade",
    reaction: ["They hiss and attack.", "They stand and raise spears. A warning.", "They watch, still as stone.", "They make signs: trade.", "They offer eels and lead the way down."] },
  { id: "wreckers", name: "wreckers", monster: "bandit", count: [4, 5, 6], look: "Rough people in dark clothes sit by a shuttered lantern. The lantern has a red glass, the kind used to lure boats onto rocks.", boss: "a smiling man with very white teeth",
    want: "to keep their lantern trade secret", know: "they hid loot in the caves and lost a man to the guardian", offer: "a cut of their hidden loot if the party deals with the guardian",
    reaction: ["They draw and attack at once.", "They offer friendship and plan an ambush.", "They pretend to be fishers.", "They talk business.", "They ask to join the party, for a share."] }
];

ForgeTables.tower.dressing = {
  surface: [
    "Wind hisses in the pines.",
    "Gulls wheel overhead and cry.",
    "Bracken grows waist-high on either side.",
    "Grey stones lie half-buried in the turf, cut square once.",
    "A path of crushed shell leads on, mostly grown over.",
    "Rusted wire runs along the ground and disappears into the earth.",
    "The ground underfoot sounds hollow in places.",
    "Old soot streaks a nearby wall.",
    "The water slaps the rocks below.",
    "A glass eye set in a post follows you with a faint click."
  ],
  cellars: [
    "The ceiling is low, and old soot streaks it.",
    "Water drips somewhere in the dark.",
    "A brass plate by the door gives the room a number in Imperial Common.",
    "The floor is laid in square tiles, many cracked.",
    "Copper wire runs along the top of the wall and through a hole into the next room.",
    "A dead glass tube is fixed to the ceiling in a cage.",
    "A painted lamp on the wall points the way you came.",
    "Rat droppings cover the floor.",
    "The air is cool and smells of old oil.",
    "Someone has scratched tally marks by the door.",
    "A brass eye above the door is shut, like a sleeper's.",
    "The walls sweat in the torchlight."
  ],
  cave: [
    "Water drips from long stone teeth in the roof.",
    "The floor is wet rock, slick with green.",
    "The cave walls glitter where the torchlight hits them.",
    "Iron bolts are driven into the rock here and there, rusted to stubs.",
    "The air is cold and smells of the lake.",
    "Somewhere close, water moves.",
    "A faint green light comes up through the water.",
    "The roof comes down low, so that tall people must stoop.",
    "Old rope hangs from a bolt in the wall, rotted to threads.",
    "The rock is cut square in places where the empire widened the cave."
  ]
};

ForgeTables.tower.senses = {
  surface: ["The air smells of pine and lake water.", "Somewhere a crow calls, and another answers.", "The wind drops, and it is very quiet."],
  cellars: ["It smells of rats.", "Something scratches behind the walls.", "A low hum comes up through the floor, and stops.", "It smells of old lamp oil.", "Your torch flame leans toward the far door.", "The air tastes of wet stone."],
  cave: ["The sound of water is everywhere.", "It smells of fish and wet stone.", "Your breath smokes in the cold.", "Far off, something splashes once.", "The water hums, very low, as if something under it sings."]
};

/* Keyed vermin and dead for filler rooms. count = dice at party level 1, 2, 3. */
ForgeTables.tower.denizens = {
  cellars: [
    { monster: "giantRat", count: ["1d4+2", "2d4+2", "3d4+2"], doing: "They are gnawing the leather from an old boot." },
    { monster: "giantRat", count: ["1d6+1", "2d4+2", "3d4+2"], doing: "They squeal and fight over a dead crow." },
    { monster: "fireBeetle", count: ["1d2", "1d3+1", "1d4+1"], doing: "Their red glow shows them before they move." },
    { monster: "giantCentipede", count: ["1d4", "1d4+2", "2d4"], doing: "They come out of cracks in the walls." },
    { monster: "skeleton", count: ["1d2+1", "1d4+1", "1d4+3"], doing: "They wear rusted keepers' coats and stand in a row, as if waiting for pay." },
    { monster: "stirge", count: ["1d3", "1d4+1", "1d6+1"], doing: "They hang from the ceiling like dead leaves." },
    { monster: "zombie", count: ["1", "1d2+1", "1d4+1"], minLevel: 2, doing: "A keeper's body shuffles in a circle, still on its rounds." },
    { monster: "crabSpider", count: ["1", "1", "1d2"], minLevel: 2, doing: "It clings to the ceiling, the colour of the stone." }
  ],
  cave: [
    { monster: "giantRat", count: ["1d4+2", "2d4+2", "3d4+2"], doing: "They swim, heads up, across the pool." },
    { monster: "fireBeetle", count: ["1d3", "1d3+1", "1d4+2"], doing: "Their glow shows on the wet walls." },
    { monster: "stirge", count: ["1d4", "1d4+2", "1d6+2"], doing: "They roost on the roof." },
    { monster: "crocodile", count: ["1", "1d2", "1d3"], doing: "It lies in the shallows like a log." },
    { monster: "giantCrab", count: ["1", "1", "1d2"], minLevel: 2, doing: "It is cracking a bone on the rocks." },
    { monster: "giantCentipede", count: ["1d4", "2d4", "2d4+2"], doing: "They swarm out from under the stones." }
  ]
};

/* Wandering monster tables, one per tier. Check every 2 turns, 1-in-6. */
ForgeTables.tower.wandering = {
  surface: [
    { monster: "giantRat", count: "1d6", text: "foraging at the shore" },
    { monster: "wolf", count: "1d3", text: "swum over from the mainland, hungry" },
    { monster: "stirge", count: "1d4", text: "out of the tower top at dusk" },
    { monster: "bandit", count: "1d4", text: "come ashore for water; they ask who you are" },
    { monster: "giantCentipede", count: "1d4", text: "under a rock you lift" },
    { text: "Crows. Nothing else. But the clock moves: one turn passes while you watch them." },
    { text: "A boat on the water, far off. It turns away when it sees you." },
    { monster: "fireBeetle", count: "1d3", text: "at night only, drawn to firelight" }
  ],
  cellars: [
    { monster: "giantRat", count: "2d4", text: "a pack running from something" },
    { monster: "skeleton", count: "1d4", text: "a patrol of dead keepers on their old round" },
    { monster: "fireBeetle", count: "1d4", text: "their glow shows first" },
    { monster: "giantCentipede", count: "1d6", text: "dropping from a crack" },
    { monster: "stirge", count: "1d6", text: "drawn to the light" },
    { text: "Footsteps ahead that stop when you stop. The guards from the stair, on patrol." },
    { text: "Your light gutters in a draught. Every torch loses 1 turn." },
    { monster: "zombie", count: "1d2", text: "a keeper still walking, with a lamp that does not burn" }
  ],
  cave: [
    { monster: "crocodile", count: "1d2", text: "sliding in from the water" },
    { monster: "giantRat", count: "2d6", text: "swimming" },
    { monster: "stirge", count: "1d6", text: "out of a roof crack" },
    { monster: "giantCrab", count: "1", text: "scuttling from the dark water" },
    { monster: "fireBeetle", count: "1d4", text: "red glow on the water" },
    { text: "The water rises a foot. Anything low is now wet." },
    { text: "A boat with a shuttered lantern slides past, out toward the lake. It does not stop." },
    { monster: "lizardMan", count: "1d3", text: "fishing; they watch, then leave" }
  ]
};

ForgeTables.tower.restock = [
  "Nothing has changed. The dust shows your own footprints.",
  "The guards at the stair have doubled, and they have built a barricade.",
  "Rats have moved into the room you cleared. 1d6 giant rats.",
  "Someone has looted what you left behind.",
  "The trapdoor has been nailed shut from below. Forcing it takes a turn.",
  "Fresh chalk marks: an eye with a line through it, on every door you opened.",
  "The water in the caves is 2' higher. One hazard is now worse.",
  "A new body lies at the foot of the stair: a salvager who came alone.",
  "The dead in the cellars have been set back on their feet. One room's skeletons are back.",
  "The guardian has moved up. It is now one cave nearer the stair.",
  "The guards have hung a bell on a wire across the passage, as an alarm.",
  "Someone has left a note for the party at the stair foot: “Go home.”"
];

ForgeTables.tower.clocks = [
  { what: "the smugglers' boat", steps: ["Day 1: they finish loading below.", "Day 3: they sail with everything worth taking from the caves.", "Day 5: they are back, with more people."] },
  { what: "the lake", steps: ["Day 1: autumn rain begins.", "Day 4: the water cave floods to the roof. Only the stair rooms stay dry.", "Day 10: the water drops again. The lower caves are scoured and changed."] },
  { what: "the Readers", steps: ["Day 2: two Reader scouts land and start copying the inscriptions.", "Day 5: they reach the study and take its books.", "Day 8: they wake the guardian and lead it out."] },
  { what: "the station's machine", steps: ["Turn 30 of the first visit: the hum in the walls grows louder.", "Day 3: the lights come on in the cellars, all at once, and every door unlocks.", "Day 6: the beacon fires once, and every boat on the lake sees it. Visitors come."] },
  { what: "the salvagers", steps: ["Day 2: they hear of the party's find in the village.", "Day 4: a dozen of them come with crowbars.", "Day 7: the cellars are stripped bare, and the guardian is loose in the caves."] },
  { what: "the guardian", steps: ["Day 2: it is hungry. It hunts the caves.", "Day 4: it comes up into the cellars at night.", "Day 7: it reaches the surface. The keeper's cottage is wrecked."] }
];

/* The two buyers for the climax prize. The engine picks two that differ. */
ForgeTables.tower.buyers = [
  { who: "Harrow", wants: "to sell it on to buyers he will not name", pays: "full price in coin, no questions" },
  { who: "the Minister", wants: "to keep it at the Terminal shrine, where it can do no harm", pays: "nothing in coin, but the Terminal answers one question for the party" },
  { who: "Captain Maren", wants: "to use it to defend The Fort", pays: "half price, and a place on the wall for anyone who asks" },
  { who: "the Readers", wants: "to read it backward", pays: "twice Harrow's price, in faceless silver" },
  { who: "the smugglers", wants: "to trade it across the lake", pays: "a boat, a crew for a season, and their silence" },
  { who: "the Gnome Druid's people", wants: "to bury it where the land can hold it", pays: "a favour from the land itself, once" },
  { who: "a scholar from the coast", wants: "to study it in a far city", pays: "a letter of credit, and a book of spells" }
];

ForgeTables.tower.prizes = [
  "the station's lamp-key, a rod of bronze that wakes any imperial beacon",
  "the guardian's control collar, still working",
  "the magister's logbook, which names three more stations",
  "a ward-eye pried from the wall, still watching",
  "the station's hymn-plate, which plays the evening hymn in order",
  "a working screen-glass lens that shows what is behind walls, for a moment"
];

ForgeTables.tower.rumors = [
  { truth: "True", text: "The keepers left in a hurry. Their dinner is still on the table." },
  { truth: "True", text: "The tower has cellars, and the cellars go down to the lake." },
  { truth: "True", text: "Someone lands on the island at night. Fishers see a shuttered lantern." },
  { truth: "Partly", text: "The tower's lamp still works. (It does, but only from the deepest cave.)" },
  { truth: "Partly", text: "The island is cursed: everyone who goes there dies. (Nine keepers died there. Nobody since.)" },
  { truth: "Partly", text: "There is treasure in the tower, a keeper's pay chest. (There is. It is empty but for a few coins.)" },
  { truth: "False", text: "The empire left a garrison there that still holds the tower." },
  { truth: "False", text: "The tower can only be entered at the full moon." },
  { truth: "False", text: "A dragon nests on the tower top." },
  { truth: "True", text: "The station had a Terminal of its own. It was never shut down." },
  { truth: "Partly", text: "Ghosts walk the cellars. (The dead walk there, but they are not ghosts.)" },
  { truth: "False", text: "The water around the island is poisoned." }
];

ForgeTables.tower.fortReacts = [
  "Harrow wants to buy any screen-glass, whole or broken, and will not say why.",
  "The Minister asks to see any hymn text the party copied, and reads it for a long time.",
  "Captain Maren wants to know who else lands on the island, and how many.",
  "The Fort's Terminal shows the station's number for one night, then goes back to its loop.",
  "The families want to know if whatever is under the island can reach the shore.",
  "A fisher asks the party to bring back her brother's boat, if they see it."
];

/* ------------------------------------------------------------------ */
/* RAVINE TEMPLATE                                                     */
/* ------------------------------------------------------------------ */
ForgeTables.ravine = {};

ForgeTables.ravine.names = [
  { name: "the Cleft of Bells", why: "wind in the cave mouths makes a sound like bells" },
  { name: "the Gullet", why: "it narrows as it climbs, like a throat" },
  { name: "the Long Scar", why: "it was cut by the empire in a straight line" },
  { name: "Tally Notch", why: "every clan in it cuts its kills in the rock by the path" },
  { name: "the Ravine of Hands", why: "handprints in red ochre cover the lower walls" },
  { name: "the Split Hill", why: "the hill looks cut in two by a single blow" },
  { name: "the Narrow Choir", why: "on still nights a song comes down it from the top" },
  { name: "the Cut", why: "the empire cut it for stone and never filled it in" },
  { name: "Old Wire Gully", why: "copper cables still hang down its walls" },
  { name: "the Saw", why: "its rim is jagged as a saw blade against the sky" },
  { name: "the Ravine of Faces", why: "great faces are carved round the cave mouths, worn half away" },
  { name: "the Dry Throat", why: "the stream in it dried up the year the empire fell" },
  { name: "the Horn Ravine", why: "the cave mouths are cut like the bells of horns" },
  { name: "Ninefold Cleft", why: "nine mouths were counted once, though fewer are lived in now" }
];

ForgeTables.ravine.histories = [
  "The empire cut this ravine for stone. Then it found a better use for it: a relay station at the top, and horns in the walls to carry the hymns down the valley.",
  "The empire bored galleries into both walls to mine copper. The cables ran up to a station at the head of the ravine that sent power down the Old Road.",
  "The ravine was an imperial proving ground. Machines were tested here, and old spells. The galleries were their sheds.",
  "A road ran up the ravine to a signal house at the top. Waystations were cut into the walls for the road's soldiers.",
  "The ravine was a quarry, then a prison. The galleries were cells. The station at the top was the warden's house."
];

ForgeTables.ravine.path = [
  { name: "The Foot", ra: "The footpath leaves the scrub and enters the ravine between two walls of grey rock. No birds sing here.", feature: ["Tracks", "Many feet, going up and down. Some are bare and clawed; some wear hobnails."] },
  { name: "The Stake Line", ra: "A line of sharpened stakes crosses the path, with a gap in the middle wide enough for one. Each stake wears an imperial helmet.", feature: ["The helmets", "Scrap. One has a dead glass eye in its brow. The eye twitches when touched."] },
  { name: "The Cable Fall", ra: "A cable as thick as a man's arm hangs down the wall and lies coiled across the path. Its copper core has been stripped in places.", feature: ["The cable", "Still faintly warm. Something somewhere still sends power down it."] },
  { name: "The Washed Stair", ra: "The path climbs a stair of rough steps cut by the empire. Water runs down it in a thin sheet.", feature: ["The steps", "Slick. Anyone who runs saves vs. paralysis or falls."] },
  { name: "The Tally Wall", ra: "The rock beside the path is scratched with marks in rows, thousands of them. Some are fresh.", feature: ["The marks", "Clan tallies of kills and raids. A clan symbol heads each column."] },
  { name: "The Fallen Face", ra: "A carved stone face has fallen from the wall and lies across the path, its mouth open. You must climb over it or crawl through its mouth.", feature: ["The mouth", "A horn. Speak into it and the sound runs up the ravine."] },
  { name: "The Bone Heap", ra: "A heap of bones sits beside the path, picked clean. A crude sign stands on top of it.", feature: ["The sign", "A warning in three clans' marks. It means: this far, no further, without paying."] },
  { name: "The Spring", ra: "A spring comes out of the wall into a stone trough cut by the empire. Fresh tracks of every kind come to drink.", feature: ["The trough", "Clean water. Every clan drinks here. Nobody fights here."] },
  { name: "The Narrows", ra: "The walls close in until the path is a cleft three feet wide. Above, the sky is a thin grey line.", feature: ["Overhead", "Anything above could drop rocks on anyone below."] },
  { name: "The Burned Camp", ra: "A ring of black stones and burned bedrolls lies by the path. Somebody camped here and did not leave.", feature: ["The camp", "A traveller's pack, slashed. In it, a letter to The Fort that never arrived."] },
  { name: "The Horn Ledge", ra: "The path runs along a ledge under a great carved horn that juts from the wall. Wind moans in it.", feature: ["The horn", "On still nights it plays a hymn, backward."] },
  { name: "The Wire Bridge", ra: "A bridge of cable and grating crosses a gap in the ravine floor. Below, darkness, and the sound of water.", feature: ["The bridge", "Holds two at a time. Three, and it sags and sings."] },
  { name: "The Scree", ra: "Loose stone covers the path where the wall has slid. Each step sends pebbles rattling down.", feature: ["The noise", "Anyone in the nearby mouths hears the party coming. No surprise."] },
  { name: "The Shrine Niche", ra: "A niche in the wall holds a dead Terminal screen, its glass smashed. Someone has painted its frame black.", feature: ["The paint", "Fresh. The Readers mark their road."] },
  { name: "The Head", ra: "The ravine ends in a wall of stone. Set into it, half buried, is the face of an imperial building with a door of bronze.", feature: ["The door", "Shut. A grille in it speaks in a polite voice: “Who reads?”"] }
];

/* Clan names are plural nouns. "sign" is how they mark their mouth. */
ForgeTables.ravine.clanNames = [
  { name: "the Rust-Teeth", sign: "teeth filed from imperial nails, hung on a string" },
  { name: "the Bell-Takers", sign: "a cracked bell hung over the mouth" },
  { name: "the Nine Lamps", sign: "nine dead glass tubes stuck in the rock" },
  { name: "the Glass Knives", sign: "a fringe of screen-glass shards over the door" },
  { name: "the Copper Saints", sign: "a figure of twisted wire, with a halo" },
  { name: "the Hollow Choir", sign: "a carved mouth painted white" },
  { name: "the Spokes", sign: "a cart wheel nailed to the rock" },
  { name: "the Mended", sign: "a helmet sewn together with wire" },
  { name: "the Wire-Hair", sign: "a tuft of copper wire, twisted like hair" },
  { name: "the Ash Tally", sign: "rows of ash marks smeared on the rock" },
  { name: "the Grey Hands", sign: "handprints in grey clay" },
  { name: "the Long Count", sign: "a pole cut with notches from top to bottom" },
  { name: "the Bolt-Eaters", sign: "a heap of rusted bolts, piled into a cairn" },
  { name: "the Lantern Thieves", sign: "a dead lantern on a chain" },
  { name: "the Shut Eyes", sign: "an eye carved in the rock, gouged out" },
  { name: "the Saltless", sign: "a broken salt jar on a pole" },
  { name: "the Old Ninth", sign: "an imperial standard with the number 9, in rags" },
  { name: "the Gnaw", sign: "gnawed bones in a ring" },
  { name: "the Pale Brothers", sign: "chalk lines down the rock like tears" },
  { name: "the Cablers", sign: "a loop of cable tied in a knot" },
  { name: "the Hornblowers", sign: "a cow horn fixed in a crack" },
  { name: "the Smoke Crowns", sign: "soot rings round the cave mouth" },
  { name: "the Silver Mouths", sign: "a mouth painted with flaking silver" },
  { name: "the Tin Saints", sign: "tin plates cut into the shape of people" }
];

ForgeTables.ravine.quirks = [
  "Every one of them wears a piece of imperial helmet, and nobody wears a whole one.",
  "They paint a white eye on every surface and scrape it off when it looks at them wrong.",
  "They count everything aloud, all the time, in a language that is half Imperial Common.",
  "They keep the copper they strip in neat coils, sorted by thickness.",
  "Their spears are tipped with screen-glass, which glints like water.",
  "They sing work songs that are hymns with the words changed.",
  "They wear the badges of imperial units, stolen off the dead, and salute each other.",
  "They keep a tame stirge in a cage and feed it on their own blood.",
  "They wrap their feet in cloth and move without a sound.",
  "They bury their dead standing up, in the wall.",
  "They keep a dead Terminal screen and bow to it each morning.",
  "Their chief speaks through a speaking-trumpet, even up close.",
  "They burn copper in their fires, so their smoke is green.",
  "They wear masks cut from imperial road signs.",
  "They tie bits of string to everything they own, so it can be found in the dark.",
  "They never turn their backs on a light.",
  "They file their nails to points and paint them black.",
  "They speak Imperial Common better than the party does, and sneer at mistakes.",
  "They paint tallies of their raids on their own arms in red.",
  "They carry their dead's skulls in net bags at their belts.",
  "They hum. Always. The hum is a hymn, very slowed down.",
  "They keep ward-eyes taken from old doors in a jar, and say the eyes keep watch for them."
];

ForgeTables.ravine.wants = [
  "salt", "iron tools", "more copper", "their dead back from the Readers", "the spring to themselves", "a new chief",
  "a way off the Ridge", "the Fort's goats", "a working lamp", "revenge on their rivals", "to be paid what the Readers promised",
  "lamp oil", "a healer for their sick", "imperial screens, whole", "to be left alone", "steel weapons"
];
ForgeTables.ravine.fears = [
  "the Readers' walking dead", "the beast in the high mouth", "the dark", "silence: a horn that stops playing", "fire",
  "the Gorgon Caves next door", "being counted", "The Fort's soldiers", "running water", "the song at night",
  "a cockatrice", "elves", "being sold to the Readers", "their own chief"
];
ForgeTables.ravine.trades = [
  "stripped copper", "smoked goat", "news of the ravine", "safe passage up the path", "screen-glass shards",
  "prisoners", "imperial scrap", "a guide", "spring water rights", "stolen lamp oil", "bone needles and gut thread",
  "the location of another clan's treasure", "a hand in a fight", "furs"
];

/* Area roles, used to fill any lair. ra = one or two sentences. */
ForgeTables.ravine.areas = {
  mouth: [
    { name: "The Mouth", ra: "A cave mouth opens in the wall, ringed by a carved face worn smooth. The ground before it is beaten bare.", features: [["The face", "Its stone lips are a horn. Inside, a cable runs into the dark."]], obvious: "Walk in.", clever: "Watch the mouth for a turn first. See who comes and goes." },
    { name: "The Gallery Mouth", ra: "A square gallery cut by the empire runs into the hill. Its sides are scored with tool marks.", features: [["Tool marks", "Imperial. The gallery runs straight."]], obvious: "Walk in.", clever: "Straight galleries carry sound. Speak low." },
    { name: "The Low Mouth", ra: "A low cave mouth forces anyone tall to stoop. A curtain of hide hangs across it.", features: [["The curtain", "Bells sewn on the inside. Anyone pushing through rings them."]], obvious: "Push through.", clever: "Cut the curtain from the side, below the bells." },
    { name: "The Ledge Mouth", ra: "A ledge climbs to a cave mouth 20' up the wall. A ladder of lashed poles leans against it.", features: [["The ladder", "Can be pulled up from above in a round."]], obvious: "Climb the ladder.", clever: "Climb the rock beside it. The ladder is watched." },
    { name: "The Walled Mouth", ra: "Someone has walled up the cave mouth with stacked stones, leaving a door-gap. Spear points show over the top.", features: [["The wall", "Chest high, loose. Pushing it over takes a round."]], obvious: "Go through the gap.", clever: "Push the wall over onto whoever waits behind it." },
    { name: "The Pipe Mouth", ra: "A great iron pipe juts from the wall, cut open, and its end serves as a door. It booms when anything walks inside.", features: [["The pipe", "Every footstep is heard deep in the lair."]], obvious: "Walk in.", clever: "Lay furs or cloaks along the pipe floor." }
  ],
  guard: [
    { name: "The Guard Nook", ra: "A side cave holds a fire pit and a heap of furs. Spears lean against the wall.", features: [["The fire", "Kept low. Its smoke goes up a crack."]], obvious: "Rush them.", clever: "Block the crack. Smoke fills the nook in a turn." },
    { name: "The Watch Hole", ra: "A narrow cave has a slit that looks back down the passage. A stool stands by it.", features: [["The slit", "Whoever sits here sees anything coming."]], obvious: "Charge.", clever: "Douse the lights and come in the dark. They see by infravision, but not around corners." },
    { name: "The Gate Room", ra: "A gate of lashed poles closes the passage. A rope runs from it into the dark.", features: [["The rope", "Pulled, it rings a bell further in."]], obvious: "Break the gate.", clever: "Cut the rope first." },
    { name: "The Drum Room", ra: "A great drum made from a cut-down imperial boiler sits in a side cave. Two sticks lie on it.", features: [["The drum", "Beaten, it is heard through the whole lair."]], obvious: "Fight the guards.", clever: "Get to the drum first. Or cut its skin." },
    { name: "The Spear Hall", ra: "A short hall bristles with spears set in the floor, points out. A path winds between them.", features: [["The spears", "Anyone who runs saves vs. paralysis or takes 1d4."]], obvious: "Walk the path.", clever: "Pull up spears to make a wider path, or use them." }
  ],
  common: [
    { name: "The Common Cave", ra: "A big cave holds sleeping furs, cook fires and the clutter of many lives. It smells of smoke and goat.", features: [["The clutter", "Pots, bones, scrap. Nothing worth much."]], obvious: "Fight.", clever: "Most of them are asleep by day." },
    { name: "The Hall of Hooks", ra: "Hooks line the walls, and from them hang packs, weapons and dried meat. Hammocks are slung across the roof.", features: [["The hooks", "A pack might hold anything: 1 in 6 holds 1d6 gp."]], obvious: "Fight.", clever: "Cut the hammock ropes. Sleepers fall." },
    { name: "The Long Gallery", ra: "An imperial gallery runs deep into the hill, lined with sleeping places cut into the walls. A cable runs along the ceiling.", features: [["The cable", "Live. It hums. Cut, it sparks: 1d6 damage to the cutter, and the gallery goes dark."]], obvious: "Fight in the gallery.", clever: "Fight at the gallery's mouth, where only two can come at once." },
    { name: "The Fire Hall", ra: "A great fire burns in the middle of a round cave, and its smoke climbs to a hole in the roof. Figures sit around it, eating.", features: [["The fire", "Kicking it scatters coals: 1d4 damage to anyone close."]], obvious: "Fight.", clever: "Talk. They are eating, and less eager to fight." },
    { name: "The Old Shed", ra: "An imperial machine shed has become a home. Racks for tools now hold bedrolls.", features: [["The racks", "Climbable. A high place to fight from."]], obvious: "Fight.", clever: "Climb the racks." }
  ],
  chief: [
    { name: "The Chief's Cave", ra: "A cave hung with stolen cloth holds a seat made from an imperial chair. A chest stands behind it.", features: [["The chair", "Metal, padded with fur. Once an officer's."]], obvious: "Fight the chief.", clever: "Challenge the chief to single combat. The clan watches." },
    { name: "The High Seat", ra: "A seat of stone stands on a ledge above the cave floor. Weapons and trophies hang around it.", features: [["The trophies", "Helmets, a Fort militia badge, a Reader's grey sash."]], obvious: "Climb up and fight.", clever: "The badge and the sash mean the chief has dealt with both." },
    { name: "The Screen Room", ra: "A dead Terminal screen is set in the back wall, and the chief's furs are laid before it. Candles stand in front of the screen.", features: [["The screen", "Dark. The chief thinks it speaks to them."]], obvious: "Fight.", clever: "Make the screen 'speak'. The Minister can wake it for a moment." },
    { name: "The Strong Cave", ra: "A small cave with a door of iron plate holds the chief and the clan's best things.", features: [["The door", "Bars from inside."]], obvious: "Break in.", clever: "Talk through the door." }
  ],
  store: [
    { name: "The Store Cave", ra: "Sacks, barrels and heaps of scrap fill a dry cave. Rats run from the light.", features: [["The stores", "Food for a month. Copper scrap, 40 gp worth, heavy."]], obvious: "Loot it.", clever: "Burn it, and the clan must raid or starve." },
    { name: "The Copper Heap", ra: "Coils of stripped copper are piled to the roof. Green dust covers everything.", features: [["The copper", "200 coins' weight is worth 20 gp. There is far more than anyone can carry."]], obvious: "Fill your packs.", clever: "Think about the walk home. Copper is heavy." },
    { name: "The Larder", ra: "Meat hangs from the roof on hooks. Some of it is goat.", features: [["The meat", "Goat, from The Fort's flocks."]], obvious: "Leave.", clever: "These are The Fort's goats. Maren will want to know." },
    { name: "The Loot Pile", ra: "Raided goods lie in a heap: pots, cloth, a cart wheel, a cradle. Some of it is from The Fort.", features: [["The heap", "Search a turn: 3d10 gp in goods."]], obvious: "Search it.", clever: "Return the Fort goods. The Fort will remember." }
  ],
  shrine: [
    { name: "The Shrine", ra: "A niche holds a heap of imperial scrap arranged like an altar. Fat candles burn in front of it.", features: [["The altar", "A helmet, a lamp, a screen. Offerings of food."]], obvious: "Take the scrap.", clever: "Leave it. Taking it makes the clan fight to the death." },
    { name: "The Horn Room", ra: "A great horn of carved stone comes through the wall into this cave. The clan has hung charms from it.", features: [["The horn", "On still nights it plays a hymn backward. The clan thinks it is a god."]], obvious: "Wreck the charms.", clever: "Speak into the horn. The clan will think it is the god." },
    { name: "The Bone Shrine", ra: "Skulls sit in rows on shelves cut in the rock. Each has a coin in its mouth.", features: [["The coins", "One silver piece in each skull: 2d10 sp."]], obvious: "Take the coins.", clever: "Leave them. The dead are watched here." }
  ],
  pens: [
    { name: "The Pens", ra: "Pens of woven poles hold goats and a few thin dogs. The smell is strong.", features: [["The goats", "Six. Two have The Fort's brand."]], obvious: "Let them out.", clever: "Stampede them through the lair." },
    { name: "The Kennel", ra: "Chains hang from rings in the wall, and some of them still hold dogs. The dogs bark at once.", features: [["The dogs", "War dogs, starving. Fed, they calm."]], obvious: "Fight the dogs.", clever: "Feed them." }
  ],
  young: [
    { name: "The Nursery", ra: "A warm cave holds the clan's young and old. They scatter into the dark corners.", features: [["Non-combatants", "They do not fight. They will tell anything to anyone who spares them."]], obvious: "Leave.", clever: "Ask them questions." },
    { name: "The Back Cave", ra: "A cave at the back holds the sick and the old on beds of straw. A fire burns low.", features: [["The sick", "Coughing. A Reader came and did not help."]], obvious: "Leave.", clever: "Heal one. The clan will hear of it." }
  ],
  well: [
    { name: "The Water Hole", ra: "Water drips from the roof into a pool. Buckets sit beside it.", features: [["The pool", "The clan's only water."]], obvious: "Drink.", clever: "Whoever holds the water holds the lair." },
    { name: "The Cistern", ra: "An imperial cistern lies under a grate. The clan lowers buckets through it.", features: [["The cistern", "A passage at its bottom leads under the hill."]], obvious: "Drink.", clever: "Climb down. It is another way in." }
  ]
};

/* Lesson-specific pieces. */
ForgeTables.ravine.hirelings = [
  { monster: "ogre", look: "An ogre sits on a heap of furs, eating a goat leg. It wears an imperial breastplate as a helmet.", price: "a barrel of salt fish a week, or 50 gp", turn: "It will switch sides for more, and says so." },
  { monster: "ogre", look: "An ogre in a coat made of sacks plays a game with knucklebones against itself.", price: "a cart wheel's weight in copper, or a working lamp", turn: "It wants to go home, to the hills. Pay it to go, and it goes." },
  { monster: "bugbear", look: "A bugbear sleeps, or seems to, by the far wall. One eye is open.", price: "30 gp and a steel blade", turn: "It is loyal to whoever paid last." },
  { monster: "gnoll", count: 2, look: "Two gnolls dice with knucklebones by the fire. They wear scraps of imperial uniform.", price: "20 gp each, or a sack of salt each", turn: "They despise the clan and say so in their own tongue." },
  { monster: "ogre", look: "An ogre stands guard with a club made from an iron lamp-post. A glass globe is still on its end.", price: "anything that shines", turn: "It loves light. A lit lantern buys an hour of its time." }
];

ForgeTables.ravine.contested = [
  { name: "The Contested Passage", ra: "A tunnel runs under the ravine floor between the two lairs. A line of skulls across its middle marks the border, and it has been moved more than once.", features: [["The skull line", "Fresh scrape marks show it has been pushed both ways."]] },
  { name: "The Shared Spring", ra: "A spring cave lies between the two lairs, with a pool in its middle. Both clans need it, and both have built a wall at their end.", features: [["The two walls", "Each has a slit. Each is watched."]] },
  { name: "The Pipe Gallery", ra: "An imperial pipe gallery joins the two lairs under the ravine. Its middle is a no-man's land of broken spears.", features: [["The broken spears", "Every week there is a fight here."]] },
  { name: "The Mushroom Farm", ra: "A wet cave between the lairs grows pale mushrooms in rows. Both clans farm it, and both say it is theirs.", features: [["The rows", "Half are tended by one clan, half by the other. The line between moves."]] },
  { name: "The Old Cable Room", ra: "A cave full of imperial cable drums joins the two lairs. Both clans strip copper here.", features: [["The drums", "Copper worth 60 gp, if anyone could carry it out."]] },
  { name: "The Bone Bridge", ra: "A natural bridge of rock spans a pit between the two lairs. Each end is guarded.", features: [["The pit", "40' deep. The losers of the last fight are at the bottom."]] }
];

ForgeTables.ravine.alarms = [
  "a gong made from an imperial road sign",
  "a chain of tin cans and helmet shells",
  "a hand-cranked siren that still works",
  "a horn cut from a bull's skull",
  "a boiler-drum with two great sticks",
  "a bell taken from a Terminal shrine",
  "glass chimes strung across the passage",
  "a speaking-horn that runs through the rock to the barracks"
];

ForgeTables.ravine.prisoners = [
  { who: "{folk}, a trapper from The Fort's snare lines", knows: "the clan's guard schedule", reward: "her family's thanks, and a good knife" },
  { who: "two reed-cutters from the lake shore", knows: "where the clan's raids go", reward: "a guide across the lake, later" },
  { who: "{folk}, a merchant's guard from the Old Road", knows: "who pays the clan", reward: "25 gp from his employer" },
  { who: "a goblin from another lair, held for ransom", knows: "a back way into its own lair", reward: "its clan's goodwill (+2 on their reaction)" },
  { who: "an old woman who mends nets and curses everyone", knows: "the clan's chief is afraid of the Readers", reward: "nothing, but she curses the party's enemies" },
  { who: "a Reader novice who tried to leave the temple", knows: "the temple's door-word", reward: "a map of the temple's first rooms" },
  { who: "{folk}, a tinker with a box of tools the clan cannot open", knows: "how the alarm works", reward: "free repairs at The Fort for a season" },
  { who: "a boy from the fishing village", knows: "nothing, but he saw where they took the eggs", reward: "the village's thanks" },
  { who: "{folk}, a Fort militia scout", knows: "the clan's numbers", reward: "Captain Maren's favour" },
  { who: "a dwarf miner taken from the Ridge", knows: "an old gallery that joins two lairs", reward: "a share of a copper seam she found" },
  { who: "a pedlar who sold the clan bad salt", knows: "the clan's chief by name", reward: "his whole pack (20 gp of goods)" },
  { who: "a herder and her dog", knows: "which goats came from The Fort", reward: "a goat" }
];

ForgeTables.ravine.tells = [
  "The stew has no steam. It was cooked long ago and kept for guests.",
  "The hosts never sit with their backs to the party.",
  "Every host keeps one hand under the table.",
  "The sleeping furs are rolled and tied. Nobody sleeps here tonight.",
  "Fresh sand by the door covers something dark.",
  "They offer the best seats: the ones under the hanging net.",
  "The hirelings are told to sing, and they sing badly, as if told.",
  "The chief asks, twice, how many more of you are outside.",
  "The cups for guests are a different clay from the hosts' cups.",
  "One of the hosts is wearing a Fort militia cloak, too small.",
  "There are more spears in the rack than hosts at the table.",
  "When the party laughs, the hosts laugh a moment late.",
  "The door behind the party has a new bar on the outside.",
  "A guest's pack from last week sits in the corner, still full."
];

ForgeTables.ravine.beasts = [
  { monster: "owlbear", count: 1, name: "The Den", ra: "The cave stinks. Bones and feathers carpet the floor, and claw marks score the walls higher than a man can reach.", cost: "It has as many hit points as a whole party of first-level characters, and it hugs.", reward: "A dead traveller's purse in the bones: {gp} gp. That is all." },
  { monster: "giantCrab", count: 2, name: "The Wet Pool", ra: "Water fills the back of the cave, and the floor is littered with cracked shells. Two humped shapes lie still in the shallows.", cost: "Armour like plate. Two of them. The pool is deep.", reward: "A Reader's satchel at the bottom of the pool: {gp} gp of faceless silver." },
  { monster: "crabSpider", count: 3, name: "The Pale Cave", ra: "Pale webs hang in sheets in the cave mouth. Things are wrapped in them, and some of them were kobolds.", cost: "Poison that kills in turns. They strike first.", reward: "A wrapped body with {gp} gp in its belt." },
  { monster: "owlbear", count: 1, name: "The Nest", ra: "A nest of branches and imperial cable fills the cave, as big as a cart. Something feathered and huge sleeps in it.", cost: "Waking it is a fight to the death. It does not run.", reward: "An egg (100 gp to a mad buyer), and {gp} gp in scraps." },
  { monster: "wolf", count: 5, name: "The Wolf Cave", ra: "A low cave holds a pack of wolves, lean and grey. They watch from the dark with green eyes.", cost: "Five of them, fast, and more come home at dusk.", reward: "Nothing but {gp} gp in a dead man's boot." }
];

ForgeTables.ravine.supply = [
  { name: "The Empty Mouth", ra: "This cave was a lair once. Now it is empty, swept clean, with old fire rings and a dry floor.", features: [["The floor", "Dry. A good place to rest and stash loot."], ["The fire rings", "Smoke from here is seen by the whole ravine."]] },
  { name: "The Spring Cave", ra: "A spring rises in a quiet cave with a narrow mouth. Nobody lives here.", features: [["The spring", "Fresh water. Fill every skin."], ["The narrow mouth", "Easy to hold. A good camp."]] },
  { name: "The Burned Lair", ra: "Black soot covers everything. A clan lived here once, until the Readers came.", features: [["The soot", "Under it, a hidden cache: 3 days' rations, 2 torches, 20 gp."]] },
  { name: "The Old Store", ra: "An imperial store room, its door broken, holds racks and empty crates.", features: [["The crates", "Good for building a barricade."], ["A rack", "Six torches, wrapped in oilcloth."]] }
];

/* Temple of the Readers. */
ForgeTables.ravine.temple = {
  names: ["the House of the Backward Hymn", "the Unwritten Chapel", "the Reading House", "the Hall of Erasure", "the Station of the Unsung", "the Annex of Silence"],
  porch: [
    { name: "The Porch", ra: "Bronze doors stand under a carved lintel that once bore the station's number. Someone has chiselled out the number and carved new words backward.", features: [["The words", "Read forward, they are a hymn line. Read backward, they are the Readers' creed."], ["The doors", "Unlocked. A speaking-grille asks: “Who reads?”"]], obvious: "Open the doors.", clever: "Answer the grille with a line read backward. The door opens with a bow." },
    { name: "The Courtyard", ra: "A yard paved with screen-glass tiles lies inside the wall. Every tile is cracked, and lines of text crawl through the cracks.", features: [["The tiles", "Walking on them makes the text stop and follow your feet."]], obvious: "Cross.", clever: "Walk in the gutters. The tiles report footsteps to the hall." },
    { name: "The Gatehouse", ra: "A gatehouse with a slot window guards the way in. A bell-rope hangs by the slot.", features: [["The slot", "A Reader looks out, politely."]], obvious: "Ring.", clever: "Say you are pilgrims." }
  ],
  undead: [
    { name: "The Hall of the Kept", ra: "Niches line a long hall, each holding a body in grey. They step out of the niches together.", features: [["The niches", "Each has a brass plate with a name. The names are of clan dead and Fort dead."]], obvious: "Fight.", clever: "Turn them." },
    { name: "The Ossuary", ra: "Bones are stacked in patterns that look like writing. Some of the bones get up.", features: [["The patterns", "A hymn, written in bone, backward."]], obvious: "Fight.", clever: "Turn them, then read the bones." },
    { name: "The Choir Room", ra: "Rows of the dead stand in a choir loft, mouths open, as if singing. There is no sound until they move.", features: [["The loft", "Raised. They come down the steps in a line."]], obvious: "Fight.", clever: "Fight at the foot of the steps, where they come one at a time." }
  ],
  trap: [
    { name: "The Long Corridor", ra: "A straight corridor runs a long way, its floor tiled in black and white. At the far end, a door.", features: [], obvious: "Walk.", clever: "Search." },
    { name: "The Reading Room", ra: "Lecterns stand in rows, each holding an open book. The books are all the same, and all blank.", features: [], obvious: "Look at the books.", clever: "Search before touching anything." },
    { name: "The Stair of Erasure", ra: "A stair goes down between walls scraped smooth of any writing. Scrapers lie on each step.", features: [], obvious: "Go down.", clever: "Search the steps." }
  ],
  leader: [
    { name: "The Lector's Room", ra: "A study full of books and good lamps, with a table set for tea. A person in grey sits waiting.", features: [["The books", "Hymns, copied backward, with commentary."], ["The tea", "Not poisoned."]], obvious: "Attack.", clever: "Sit. Drink the tea. Listen." },
    { name: "The Chapter House", ra: "A round room with a ring of seats faces a lectern. The leader stands there, as if expecting a class.", features: [["The seats", "Ten. Each has a name scratched on it."]], obvious: "Attack.", clever: "Take a seat and ask a question." },
    { name: "The Scriptorium", ra: "Desks with copying stands fill a long room. The leader is at work on a page and does not look up.", features: [["The page", "A copy of a hymn, backward, half done."]], obvious: "Attack.", clever: "Read the page over the leader's shoulder." }
  ],
  extras: [
    { name: "The Dormitory", ra: "Plain beds stand in two rows, each made tight. A book lies on every pillow.", features: [["The books", "Hymnals with the lines reversed in ink."]], obvious: "Search the beds.", clever: "Read the inside covers: each reader writes the date they joined." },
    { name: "The Kitchen", ra: "A clean kitchen with a working imperial range. Bread is rising under a cloth.", features: [["The range", "Hot without fire."]], obvious: "Eat.", clever: "The bread is for many more than are here. More are coming." },
    { name: "The Cells", ra: "Small cells with barred doors line a passage. Some hold people.", features: [["The prisoners", "{n} people from the ravine and the road."]], obvious: "Free them.", clever: "Ask what they were told they were for." },
    { name: "The Map Room", ra: "A table holds a map of the country, drawn in fine ink, with notes in a neat hand.", features: [["The map", "The lake, the island, and a mark beneath the island. A note: “The door.”"]], obvious: "Take the map.", clever: "Copy it and leave it. Then they do not know you know." },
    { name: "The Egg Store", ra: "Straw-lined crates hold grey eggs, warm to the touch. A lamp keeps them warm.", features: [["The eggs", "Cockatrice eggs. {n} of them. Harrow would pay; so would others."]], obvious: "Take them.", clever: "Smash them, or take them. Either has a cost." },
    { name: "The Cistern", ra: "A cistern under a grate holds dark water. Something moves in it.", features: [["The water", "Fresh. A grate leads down."]], obvious: "Drink.", clever: "Don't." },
    { name: "The Library", ra: "Shelves of books reach the ceiling, each one bound in grey.", features: [["The books", "All hymnals, copied backward."]], obvious: "Search.", clever: "The one book not in grey is the leader's diary." },
    { name: "The Bell Loft", ra: "A small bell hangs from a beam over a shaft that drops into the dark.", features: [["The bell", "Ringing it calls every Reader in the temple."]], obvious: "Ring it.", clever: "Tie the clapper." }
  ],
  titles: ["Lector", "Second Reader", "Proctor", "Unwriter", "Reader-Elder", "Keeper of the Margin"],
  says: [
    "“You read the hymns forward. So did I, once. Sit down; I will show you the other way.”",
    "“Nothing you have been told is false. It is only in the wrong order.”",
    "“The song is a cage. I am only asking you to listen to it from the outside.”",
    "“Your Minister reads the screen. I read what the screen hides.”",
    "“Every clan in this ravine works for me, and every one of them thinks it does not.”",
    "“I could have you killed. I would rather have you read.”",
    "“The empire built a lock. I am only a locksmith.”",
    "“Kill me if you like. The book will still be read.”"
  ],
  offers: [
    "safe passage home, and a copy of the backward hymns",
    "the prisoners, if the party leaves the relic alone",
    "a truth about a PC's past, from the Terminal's deep files",
    "gold, a great deal of it, for the eggs the party carries",
    "a place among the Readers for anyone who asks"
  ],
  relics: [
    { name: "the dark Terminal", ra: "A Terminal screen as tall as a door glows in the dark. The hymns crawl up it backward.", options: [["Smash it", "This node of the network dies. The Fort's Terminal goes quiet for a week, then shows a new line."], ["Reclaim it", "The Minister or Paladin sings it back into order. Costly: a spell lost for a month, and the Readers who live become enemies of The Fort forever."], ["Read it", "A PC learns where the Door Beneath the Lake leads. The DM decides the cost."]] },
    { name: "the backward bell", ra: "A bell cast from screen-glass hangs over a shaft. When it rings, the sound comes before the stroke.", options: [["Break it", "The horns in the ravine fall silent forever. The clans, who slept to its song, wake angry and lost."], ["Ring it forward", "A hymn in order runs down the ravine. Every undead in the Ridge falls still. The Readers who live hunt the bell-ringer."], ["Take it", "Heavy (500 coins). It rings by itself at night wherever it is kept, and sometimes it tells the truth."]] },
    { name: "the Unwritten Book", ra: "A book on a lectern is blank, but letters appear on its pages from the bottom up, as if being unwritten.", options: [["Burn it", "The letters scream as they go. A PC who watches loses a memory of their choice."], ["Finish it", "A PC writes the last line. The DM decides what it unlocks."], ["Carry it home", "The Minister can read it slowly. Each page read gives a true answer and takes a night's sleep."]] },
    { name: "the black lamp", ra: "A lamp of bronze on a pillar burns with a flame that gives darkness instead of light.", options: [["Put it out", "Every shadow in the temple falls on the party at once: each PC saves vs. spells or is blind for a turn."], ["Relight it white", "Costs a cleric spell and a hymn sung in order. The lamp becomes a beacon The Fort can see from the wall."], ["Take it", "It makes darkness wherever it is set down, which is useful, and draws Readers, which is not."]] },
    { name: "the speaking head", ra: "A bronze head on a plinth speaks hymn lines backward in a calm voice. Its eyes are ward-eyes.", options: [["Silence it", "Its eyes go dark. Every ward-eye in the country blinks once; somewhere, a door unseals."], ["Turn it forward", "It speaks once in order, and answers one question truly. Then it never speaks again."], ["Carry it out", "It talks all the way home, and some of what it says is about the party."]] },
    { name: "the cable loom", ra: "A frame of copper wire weaves a ward into noise, its shuttle moving by itself. Sparks run along the threads.", options: [["Cut it", "The ward it was unweaving snaps back. The Readers' dead fall; so does the temple roof, partly."], ["Reverse it", "It weaves the ward back. Takes a day. The Readers will not allow a day."], ["Steal the shuttle", "The loom stops. The shuttle hums in a pack, and the Terminal at The Fort wants it."]] }
  ],
  leaderMonster: ["reader2", "reader3", "reader4"]
};

ForgeTables.ravine.wandering = [
  { clan: true, count: "1d4+1", text: "foragers from {lair}, carrying goats" },
  { clan: true, count: "1d6", text: "a war band from {lair}, out to raid" },
  { monster: "acolyte", count: "1d3", text: "Reader collectors, polite, with a mule of copper" },
  { monster: "skeleton", count: "1d4", text: "the Readers' dead, carrying a stone" },
  { monster: "stirge", count: "1d6", text: "out of the cave mouths at dusk" },
  { monster: "wolf", count: "1d4", text: "lean and hungry" },
  { clan: true, count: "1d3", text: "envoys from {lair}, who want to talk" },
  { text: "The horns sing. On a still night a hymn runs backward down the ravine. Every clan is awake." },
  { text: "Rock fall from above. Save vs. breath or 1d6. Everyone in the ravine heard it." },
  { monster: "giantCentipede", count: "1d6", text: "under the stones of the path" }
];

ForgeTables.ravine.rumors = [
  { truth: "True", text: "There are seven or eight lairs in the ravine walls, and the clans hate each other." },
  { truth: "True", text: "Someone at the top of the ravine pays the clans in silver with no faces on it." },
  { truth: "True", text: "The horns in the ravine play hymns backward at night." },
  { truth: "Partly", text: "The clans raid for food. (They raid for food, and for people, and both are sold up the ravine.)" },
  { truth: "Partly", text: "The low clans run if you kill their chief. (They run if you kill a few. Their chief runs first.)" },
  { truth: "Partly", text: "The people at the top are priests. (They are. They are not your Minister's kind.)" },
  { truth: "False", text: "The ravine is empty. The clans left last winter." },
  { truth: "False", text: "The empire's soldiers still guard the top." },
  { truth: "False", text: "The clans are all one tribe under one king." },
  { truth: "True", text: "The spring halfway up is a truce ground. Nobody fights there." },
  { truth: "Partly", text: "The hosts in one of the mouths feed travellers. (They do. Once.)" },
  { truth: "False", text: "Gold can be panned in the ravine stream." }
];

ForgeTables.ravine.clocks = [
  { what: "the Readers' collection", steps: ["Week 1: the clans send the Readers the prisoners they hold.", "Week 2: the prisoner pens are empty; the prisoners are in the temple's cells.", "Week 3: the temple has what it needs. Its doors are barred and its dead walk the ravine floor.", "Week 4: the Readers walk down the Old Road toward the lake."] },
  { what: "the clan war", steps: ["Week 1: the twin bands fight in the contested passage.", "Week 2: one band wins and takes both lairs, doubling its numbers.", "Week 3: the winners raid the Fort's fields.", "Week 4: the losers' survivors come to The Fort begging, or burning."] },
  { what: "the horns", steps: ["Week 1: the horns sing every night.", "Week 2: the clans stop sleeping and start fighting each other.", "Week 3: the horns can be heard at The Fort.", "Week 4: The Fort's Terminal begins to show its hymns backward."] }
];

ForgeTables.ravine.fortReacts = [
  "Harrow will buy copper by the cartload, and asks where it came from.",
  "Captain Maren wants every prisoner brought back, and their stories.",
  "The Minister asks what the horns sang, and whether the words ran forward or back.",
  "Families come to the gate asking after missing goats and missing people.",
  "A clan envoy comes to The Fort under a white rag, asking for the party by name."
];

if (typeof module !== "undefined" && module.exports) { module.exports = ForgeTables; }
