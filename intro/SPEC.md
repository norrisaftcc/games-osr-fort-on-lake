# Fort Cards: Spec

`intro/index.html` holds the solo intros for the three Year Two PCs. A player picks a character, rolls 3d6 in order, and plays short scenes alone: five for the thief and the druid, eight for the cleric (ten to twenty minutes). Each choice writes onto a **Fort Card**. The intro ends at the humming milestone, where Cassandra says one true thing. The player brings the card to session zero. There they may change any choice, roll HP, copy the card as text, and print it.

One file. No libraries, no network, no build step. It opens from disk and works at 360px. It has light and dark themes, and it works by keyboard and by mouse. The pinned facts are in `campaign/SPINE.md` under *Year Two PC Materials — Pinned Facts*, including *The Brush*. The choices and numbers follow `player/year-two/`. The playbooks say what each choice does; this page is where players make the choices.

## How it adapts Badge Zero

| Badge Zero | Fort Cards |
|-----------|-----------|
| Four classes on a pick screen, each with a status (*Not started / Scene n of 5 / Badge ready*) | Three PCs: the elven thief, the elf cleric of the Sacred Terminal, the gnome druid. Same three statuses (*Scene n of 5*, or *of 8* for the cleric); the last reads *Card ready*. The progress dots and the scene tag count the PC's own scenes. |
| Rules box: art register, chrome costs Fate | Rules box: Elmore paint = witnessed (public fact), Otus ink = unwitnessed (secret fact), Fate, bonds, the Lens |
| Roll 3d6 in order with `Math.random` | Roll 3d6 in order with a **seeded** die (mulberry32, as in `demo/`). `?seed=N` sets it; the seed shows on the roll screen, in the footer and on the card. Each PC draws from its own stream, so play order does not change anyone's dice. Race adjustments (elf DEX +1 CON −1; gnome CON +1 STR −1) are applied and stated. |
| Three art registers (ink, duotone, channel paint) | Two: **Elmore paint** (a warm painted wash) and **Otus ink** (black on cream, a hatched band, heavy double rules). Every scene shows its register as a tag and in its styling. |
| Camera tag: on, off, *your choice* | One scene is *Elmore or Otus: you choose*: scene 3 for the thief and the druid, scene 4 (*Nine Breaths*) for the cleric. It starts neutral (dashed border) and takes the chosen register's style once the player picks. |
| One typed fact (public or secret) from the camera scene | **Two** typed facts. The chosen register decides which one is typed in that scene. The other is typed later, in a scene of the other register: *Maren's Last Muster* (paint) asks for the public fact if the choice was ink; *The Night Before the Road* (ink) asks for the secret fact if it was paint. |
| Chrome implants cost Fate | None. In their place, **the Lens**: moments where something old shows at the edge, read as hymn (mystery) or machine (mechanism). Two for the thief and the druid; four for the cleric, whose fourth also offers *both*. |
| "Who Owes Whom" bond scene | The last scene: one bond from the other two PCs or seven NPCs (Cassandra, Wick, the Paladin, Maren, the Minister, the Glamourist, Biddy) |
| "What You Carry" kit scene | The last scene: the playbook's kit, plus one extra item the player chooses |
| Badge front and back, live under each scene | Fort Card front and back, live under each scene |
| Floor 31 elevator ending | The milestone on the Old Road hums, and Cassandra says one true thing (a different line per PC) |
| Session zero: retcon chips, HP roll, badge as text, reset (two taps) | The same, plus an editable name, a Pen line, both facts editable, a mutual-bond note, and print (one card per page) |
| `localStorage` in try/catch | The same. The page works when storage throws. Bad stored data is ignored. A card saved before scenes were added resumes at the first scene with an open choice (an old five-scene cleric resumes at scene 2, at the Year Between choice); nothing already chosen is lost. |

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

Eight scenes. Three are new (*Seven Nights at the Terminal*, *The Two Keepers*, *Cassandra's Question*), and scene 2 gains the Year Between choice.

| # | Scene | Reg | Choices | Writes |
|---|-------|-----|---------|--------|
| 1 | *The Queen's Chamber*. Year One: the carved eyes; Biddy draws breath in the Glamourist's hands. | I | **Lens:** wards / sensors. **The Terminal showed:** a map / a name / a warning. **Gave up:** elven magic / elven community / time. | Lens; Year One (with *You start knowing*) |
| 2 | *Autumn: The Pen*. The lake stone; the Terminal greets it. | P | **Lens:** a blessing / a signal. **The Year Between** (canon, from the zine): **A. The Harvest Feast** (*Oath: the Quiet owe a meal*) / **B. The Hymn Aloud** (*Want: answers*) / **C. The Gate-Tower** (*Enmity: the night-singers*). **Year of Change:** Hymn of Rest / Hymn of Calling / Lake Stone. Types the Pen line. | Lens; *Autumn, the Year Between*; Year of Change; Pen |
| 3 | *Seven Nights at the Terminal*. Seven nights reading every line aloud (the Fort's promise if scene 2 was B; a private vigil otherwise). Each answer shows on the glass. | I | **Night one:** the Hymn of Opening / your own name / the glyph for *listen*. **Lens:** the blinking mark is a breath held for you / a cursor waiting for input. **Night four:** the Hymn of Lamps / the day's entry from the Fort's book / *How long?* **Night seven:** the whole hymnal / only the first line / every margin note. Then one last line: *“Light the first lamp before the second.”* if scene 2 was B; *“Vigil recorded. Seven of seven.”* otherwise. | Lens; *What the Terminal said* |
| 4 | *Nine Breaths*. The Terminal stops its hymns for nine breaths; Wick at the door. | C | Ring the Shrine bell (witnessed) / hood the screen and wait (unwitnessed). Types the matching fact. | Public or secret fact |
| 5 | *The Two Keepers*. The Minister and the cleric at the plinth, the Shrine door open to the yard. | P | **The Minister:** right but doesn't know why / wrong but necessary / hears something you don't. **Lens:** the hymns are prayer / protocol / both. | Year One (*The Minister*); Lens |
| 6 | *Maren's Last Muster*. | P | **Fort Office.** Public fact if scene 4 was ink. | Fort Office; public fact |
| 7 | *Cassandra's Question*. The wall above the Gate at night; Cassandra asks, *“What do you owe the voice that answers you?”* | I | Nothing (a lock owes nothing to its key) / patience (eleven years, and more) / obedience (if it asks, I will do it). She answers with another question. | *Cassandra asked* |
| 8 | *The Night Before the Road*. | I | **Bond.** **Kit extra:** holy water / candles and tinderbox / chalk and slate. Secret fact if scene 4 was paint. | Bond; Gear; secret fact |

**The Terminal at brush depth.** It is a screen and a shrine. It shows hymns, lists, a date, a count and one instruction. It never speaks as a mind: no *I*, no feelings, no *I see you*. Its answers, by night:

| Night | Read or typed | On the glass |
|-------|---------------|--------------|
| One | The Hymn of Opening | *Let the lamp be lit. / Let the hours be kept. / Let each station answer each.* (the last line stays longest) |
| One | Your own name, the old way | *Received. / 9th night of the Falling Month / 2nd watch / Year 1,204 of the Empire* (tonight's date, in the empire's count) |
| One | The glyph for *listen* | *The line is open.*, repeated until the glass is full |
| Four | The Hymn of Lamps | *Lamp Station Nine: dark. Choir Station Six: dark.* Two unreadable names, dark. *This station: lit.* |
| Four | The day's entry from the Fort's book | *What is written is kept. / What is kept is counted. / What is counted is not lost.* |
| Four | *How long?* | *Hours kept at this station: 10,544,191*, and it counts one more while you watch |
| Seven | The whole hymnal | *End of book. / Begin again at the first line.* |
| Seven | Only the first line | *Let the lamp be lit.*, and no more |
| Seven | Every margin note | *Received. / 3 scripts · 1,412 notes / Filed.* |

Do not explain the canon line, the station list or the year to the player. The DM may replace the year and the count.

Cassandra: the road-stone hums only the first line of a hymn; find where the lake's water stopped running (points at *The Hum* and the outflow tunnel). At the milestone the cleric has met her already (scene 7), so the ending says *This time she does not begin with a question.*

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

*The Milestone* (paint). Before dawn, the Old Road. The milestone hums. Cassandra is waiting, and she says one true thing. Her line is on the card, in the text export and in the print view. The thief and the druid share one ending text; the cleric's third paragraph notes that Cassandra already asked a question on the wall.

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
| **Lens** | *Reads old things as Hymn / Machine / Both*, a tally with one square per moment (two for the thief and the druid, four for the cleric), and each moment with its reading. The rule generalises the old one: **Hymn** if every moment reads hymn, **Machine** if every moment reads machine, **Both** otherwise. A *both* reading (the cleric's fourth moment) always makes Both; its square is half and half. |
| Year One, and since | The playbook's three *Choose One* picks, and *You start knowing* |
| The Pen | The typed line from scene 2 |
| Autumn, the Year Between (cleric) | Scene 2: *Autumn, the Year Between: B. The Hymn Aloud — Want: answers* (the choice, then its zine tag), under the Pen |
| What the Terminal said (cleric) | Scene 3: one line for each of nights one, four and seven, then *Last line:* and the line that closed the seventh night. Retconning the Year Between changes the last line. |
| Year of Change | Scene 2, marked *proposed; the DM confirms* |
| Fort Office | The Muster scene (scene 4; the cleric's scene 6) |
| Public fact, secret fact | Typed; one sentence each |
| Cassandra asked (cleric) | Scene 7: *“What do you owe the voice that answers you?” You answered: “…”*. A hook for the DM. |
| Bond | The last scene; marked *Mutual* when it is |
| Gear | The playbook's weapons and kit, what the thief took, and the extra item |
| Class block | Thief skills at level 2 (Quiet Feet shown), backstab, elf abilities; or spells (2 × 1st, Bless; or the druid's chosen Warp Wood or Heat Metal), turning, gnome illusion |
| 5e line | In the playbooks' format, from the rolled scores, AC and HP |

The cleric's three extra lines are on the card, in the text export, in the retcon panel (every choice of every scene is a chip) and in print.

**Print** shows only the cards, one to a page: *Print this card*, or *Print all cards on this device* when there is more than one.

## Running the test

```
node intro/test.mjs
SHOTS=/tmp/intro-check node intro/test.mjs    # also saves screenshots (the cleric's scenes, Seven Nights, The Two Keepers, Cassandra's Question, the card) and print.pdf
```

It uses the global Playwright install and Chromium at `/opt/pw-browsers`. It checks:

- the source has no network references and no forbidden names (the Sleeper, Lintel, Halcyon, "turned to stone");
- the thief and the druid have five scenes and two Lens moments each; the cleric has eight scenes in the order above and four Lens moments; the scene tag, the progress dots and their label read *Scene n of 5* or *of 8*;
- every option of every scene, and every sub-option, is clicked for every PC, and each non-register choice changes the live card;
- each scene wears its register, and the *you choose* scene takes the chosen one;
- every card field is filled at the end, and the text export holds the name, Year of Change, Fort Office, bond, Lens, Pen line and both facts; the cleric's card and text also hold *Autumn, the Year Between*, *What the Terminal said* and *Cassandra asked*, and the thief's and druid's do not;
- *B. The Hymn Aloud* ends the seventh night with *Light the first lamp before the second.*; A and C do not, in the scene or in the text; retconning the Year Between to and from B changes the card and the text;
- the Lens rule over four moments: all hymn gives Hymn, all machine gives Machine, a mix or a *both* gives Both;
- the retcon panel has a chip for every option of every scene, and retconning each new cleric choice changes the card and the text;
- an old five-scene cleric save resumes at scene 2 of 8 with its earlier choices kept;
- the Lens comes out Machine, Hymn and Both on the three cards, and every Lens retcon (every option of every Lens moment) changes the card and the text;
- the mutual-bond note and the extra Fate appear when two cards name each other, and not otherwise;
- a retcon of the office, the bond, the Small Friend and a typed fact changes the card;
- copy gives a visible result; print shows only the deck, holds the cleric's three extra lines, and a PDF of three cards has three pages;
- reset needs two taps and clears only that PC; the theme toggle cycles; a reload keeps the cards;
- the same seed gives the same stats, and another seed does not;
- the page works end to end with `localStorage` throwing, and ignores bad stored data;
- keyboard only: Tab and Enter pick a card and roll, Space picks an option, and focus stays put;
- no console errors, and no horizontal scroll at 1280px and 360px, light and dark.

It prints a summary and `PASS` or `FAIL`.
