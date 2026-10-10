# Fort Cards: Spec

`intro/index.html` holds the solo intros for the three Year Two PCs. A player picks a character, rolls 3d6 in order, and plays five short scenes alone (ten to fifteen minutes). Each choice writes onto a **Fort Card**. The intro ends at the humming milestone, where Cassandra says one true thing. The player brings the card to session zero. There they may change any choice, roll HP, copy the card as text, and print it.

One file. No libraries, no network, no build step. It opens from disk and works at 360px. It has light and dark themes, and it works by keyboard and by mouse. The pinned facts are in `campaign/SPINE.md` under *Year Two PC Materials — Pinned Facts*, including *The Brush*. The choices and numbers follow `player/year-two/`. The playbooks say what each choice does; this page is where players make the choices.

## How it adapts Badge Zero

| Badge Zero | Fort Cards |
|-----------|-----------|
| Four classes on a pick screen, each with a status (*Not started / Scene n of 5 / Badge ready*) | Three PCs: the elven thief, the elf cleric of the Sacred Terminal, the gnome druid. Same three statuses; the last reads *Card ready*. |
| Rules box: art register, chrome costs Fate | Rules box: Elmore paint = witnessed (public fact), Otus ink = unwitnessed (secret fact), Fate, bonds, the Lens |
| Roll 3d6 in order with `Math.random` | Roll 3d6 in order with a **seeded** die (mulberry32, as in `demo/`). `?seed=N` sets it; the seed shows on the roll screen, in the footer and on the card. Each PC draws from its own stream, so play order does not change anyone's dice. Race adjustments (elf DEX +1 CON −1; gnome CON +1 STR −1) are applied and stated. |
| Three art registers (ink, duotone, channel paint) | Two: **Elmore paint** (a warm painted wash) and **Otus ink** (black on cream, a hatched band, heavy double rules). Every scene shows its register as a tag and in its styling. |
| Camera tag: on, off, *your choice* | Scene 3 is *Elmore or Otus: you choose*. It starts neutral (dashed border) and takes the chosen register's style once the player picks. |
| One typed fact (public or secret) from the camera scene | **Two** typed facts. Scene 3's register decides which one is typed there. The other is typed in the next scene of the other register: scene 4 (paint) asks for the public fact if scene 3 was ink; scene 5 (ink) asks for the secret fact if scene 3 was paint. |
| Chrome implants cost Fate | None. In their place, **the Lens**: two moments per PC where something old shows at the edge, read as hymn (mystery) or machine (mechanism). |
| "Who Owes Whom" bond scene | Scene 5: one bond from the other two PCs or seven NPCs (Cassandra, Wick, the Paladin, Maren, the Minister, the Glamourist, Biddy) |
| "What You Carry" kit scene | Scene 5: the playbook's kit, plus one extra item the player chooses |
| Badge front and back, live under each scene | Fort Card front and back, live under each scene |
| Floor 31 elevator ending | The milestone on the Old Road hums, and Cassandra says one true thing (a different line per PC) |
| Session zero: retcon chips, HP roll, badge as text, reset (two taps) | The same, plus an editable name, a Pen line, both facts editable, a mutual-bond note, and print (one card per page) |
| `localStorage` in try/catch | The same. The page works when storage throws. Bad stored data is ignored. |

## Scenes

Registers: **P** = Elmore paint (witnessed), **I** = Otus ink (unwitnessed), **C** = the player chooses. *Lens* marks a Brush moment. Each choice writes the card field in the last column.

### The elven thief (Pen: Summer)

| # | Scene | Reg | Choices | Writes |
|---|-------|-----|---------|--------|
| 1 | *The Squeeze*. Year One, the Gorgon Caves: a crack behind the Garden of Stone ends at an iron plate with a lit glass eye. | I | **Lens:** a ward / a lock. **Came from:** the coast / the old foundations in the forest / a file at Mile-House 13. **Took from the caves:** a ward-eye / a key that fits nothing / nothing. | Lens; Year One (with *You start knowing*); Gear (*what you took*) |
| 2 | *Summer: The Pen*. The Tin Dozen want salt; the Shallows sing at the same hour each night. | P | **Lens:** spirits / a signal. **Year of Change:** Locksmith's Eye / Quiet Feet / Fence. Types **the Pen line**. | Lens; Year of Change (Quiet Feet adds 20% to Move Silently); Pen |
| 3 | *Salt for a Box*. The Tin Dozen's sergeant pays with a locked iron box. | C | Open it at the Gate (witnessed) / open it alone after dark (unwitnessed). Types the matching fact. | Public or secret fact |
| 4 | *Maren's Last Muster*. | P | **Stays because:** Wick counted you / Maren gave you a key / there is a city under the lake. **Fort Office:** Warden / Scout / Steward / Lorekeeper. Types the public fact if scene 3 was ink. | Year One; Fort Office; public fact |
| 5 | *The Night Before the Road*. | I | **Bond:** 2 PCs + 7 NPCs. **Kit extra:** hooded lantern and oil / grapnel and cord / short iron bar. Types the secret fact if scene 3 was paint. | Bond; Gear; secret fact |

Cassandra: the hunter in Boar Hollow drew one door too few (points at *The Hunter's Map*).

### The elf cleric of the Sacred Terminal (Pen: Autumn)

| # | Scene | Reg | Choices | Writes |
|---|-------|-----|---------|--------|
| 1 | *The Queen's Chamber*. Year One: the carved eyes; Biddy draws breath in the Glamourist's hands. | I | **Lens:** wards / sensors. **The Terminal showed:** a map / a name / a warning. **Gave up:** elven magic / elven community / time. | Lens; Year One (with *You start knowing*) |
| 2 | *Autumn: The Pen*. The lake stone; the Terminal greets it. | P | **Lens:** a blessing / a signal. **Year of Change:** Hymn of Rest / Hymn of Calling / Lake Stone. Types the Pen line. | Lens; Year of Change; Pen |
| 3 | *Nine Breaths*. The Terminal stops its hymns for nine breaths; Wick at the door. | C | Ring the Shrine bell (witnessed) / hood the screen and wait (unwitnessed). Types the matching fact. | Public or secret fact |
| 4 | *Maren's Last Muster*. | P | **The Minister:** right but doesn't know why / wrong but necessary / hears something you don't. **Fort Office.** Public fact if scene 3 was ink. | Year One; Fort Office; public fact |
| 5 | *The Night Before the Road*. | I | **Bond.** **Kit extra:** holy water / candles and tinderbox / chalk and slate. Secret fact if scene 3 was paint. | Bond; Gear; secret fact |

Cassandra: the road-stone hums only the first line of a hymn; find where the lake's water stopped running (points at *The Hum* and the outflow tunnel).

### The gnome druid (Pen: Spring)

| # | Scene | Reg | Choices | Writes |
|---|-------|-----|---------|--------|
| 1 | *The Nesting Hall*. Year One: a pulse in the rock under the warm nest. | I | **Lens:** a spirit / an engine. **The land tells you:** sick / waking up / old, and remembers. **Came because:** the animals / your grove was destroyed / you heard the Terminal from underground. | Lens; Year One (with *You start knowing*) |
| 2 | *Spring: The Pen*. The thaw, the Fields, the Quiet and the kingfishers. | P | **Year of Change:** Green Hand / Lake-Speaker / Small Friend (then a stoat / a crow / a toad). **Level-2 spell:** Warp Wood / Heat Metal. Types the Pen line. | Year of Change; spells; Pen |
| 3 | *The Singing Well*. The new well broke into a curved stone wall and sings one note. | C | **Lens:** a woken spring / an old pipe. Then answer the note before everyone (witnessed) / climb down alone (unwitnessed). Types the matching fact. | Lens; public or secret fact |
| 4 | *Maren's Last Muster*. | P | **The Terminal is:** a tool / a wound / a conversation. **Fort Office.** Public fact if scene 3 was ink. | Year One; Fort Office; public fact |
| 5 | *The Night Before the Road*. | I | **Bond.** **Kit extra:** seeds / willow whistle / wild honey. Secret fact if scene 3 was paint. | Bond; Gear; secret fact |

Cassandra: the lake breathes out under the Weirs and has been holding its breath (points at the outflow tunnel).

### The shared ending

*The Milestone* (paint). Before dawn, the Old Road. The milestone hums. Cassandra is waiting, and she says one true thing. Her line is on the card, in the text export and in the print view.

## The Fort Card

| Field | Source |
|-------|--------|
| Name | Typed on the card screen |
| Class and level | Fixed: level 2 |
| 3d6 in order | The seeded roll, race adjustment applied, with modifiers |
| HP | Rolled on the card screen. Level 2 = two Hit Dice: the first at its maximum (as the playbooks give it), the second rolled, CON modifier on each, each at least 1. A second button rolls both dice if the DM rolls every Hit Die. |
| AC | Playbook armour + DEX modifier (cleric: robes and shield; thief and druid: leather; the druid also shows the gnome's +2 against larger foes) |
| THAC0 | 19 [+0] |
| Saves | From the playbooks (thief D13 W14 P13 B16 S15; cleric D11 W12 P14 B16 S15; druid D11 W10 P14 B16 S13), plus the WIS bonus against magic when there is one |
| Fate | 3, +1 when this card and another card on the device name each other; the spend menu |
| Fate ability and lane | From the playbooks |
| **Lens** | *Reads old things as Hymn / Machine / Both*, a two-square tally, and each moment with its reading |
| Year One, and since | The playbook's three *Choose One* picks, and *You start knowing* |
| The Pen | The typed line from scene 2 |
| Year of Change | Scene 2, marked *proposed; the DM confirms* |
| Fort Office | Scene 4 |
| Public fact, secret fact | Typed; one sentence each |
| Bond | Scene 5; marked *Mutual* when it is |
| Gear | The playbook's weapons and kit, what the thief took, and the extra item |
| Class block | Thief skills at level 2 (Quiet Feet shown), backstab, elf abilities; or spells (2 × 1st, Bless; or the druid's chosen Warp Wood or Heat Metal), turning, gnome illusion |
| 5e line | In the playbooks' format, from the rolled scores, AC and HP |

**Print** shows only the cards, one to a page: *Print this card*, or *Print all cards on this device* when there is more than one.

## Running the test

```
node intro/test.mjs
SHOTS=/tmp/intro-check node intro/test.mjs    # also saves screenshots and print.pdf
```

It uses the global Playwright install and Chromium at `/opt/pw-browsers`. It checks:

- the source has no network references and no forbidden names (the Sleeper, Lintel, Halcyon, "turned to stone");
- every option of every scene, and every sub-option, is clicked for every PC, and each non-register choice changes the live card;
- each scene wears its register, and scene 3 takes the chosen one;
- every card field is filled at the end, and the text export holds the name, Year of Change, Fort Office, bond, Lens, Pen line and both facts;
- the Lens comes out Machine, Hymn and Both on the three cards, and every Lens retcon changes the card and the text;
- the mutual-bond note and the extra Fate appear when two cards name each other, and not otherwise;
- a retcon of the office, the bond, the Small Friend and a typed fact changes the card;
- copy gives a visible result; print shows only the deck, and a PDF of three cards has three pages;
- reset needs two taps and clears only that PC; the theme toggle cycles; a reload keeps the cards;
- the same seed gives the same stats, and another seed does not;
- the page works end to end with `localStorage` throwing, and ignores bad stored data;
- keyboard only: Tab and Enter pick a card and roll, Space picks an option, and focus stays put;
- no console errors, and no horizontal scroll at 1280px and 360px, light and dark.

It prints a summary and `PASS` or `FAIL`.
