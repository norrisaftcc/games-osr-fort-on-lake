# Stage 5: Five Rats

| | |
|---|---|
| **What this teaches** | Arrays (lists): five giant rats live in one list of hit points, and loops walk the list to show, search, count and attack. |
| **Files** | `python/stage5_five_rats.py` and `cpp/stage5_five_rats.cpp` |
| **Book chapter** | C++: Gaddis Ch. 7 (Arrays and Vectors): array definition, subscripts, loops over arrays, parallel arrays. Python: lists, indexes, `for i in range(...)`. |
| **New ideas** | A list / array; index 0 to 4; a `for` loop over indexes; a parallel list (`asleep`); search with `break`; count with a loop; named constants. |

**The fight** (Module 2, C2, pinned stats). Giant rats x5: HD 1/2, AC 7 [12], bite 1d3, ML 8, hit points **2, 3, 1, 4, 2**. They flee when 2 lie dead. The hero holds the doorway, so only two rats can bite each round. The Fighter swings a sword (1d8 + 1); the Wizard has a dagger (1d4 - 1, never less than 1) and one *Sleep* spell (2d8 Hit Dice of creatures; each rat counts as 1). A sleeping rat dies to one blow.

The rats' movement (120' (40'), swim 60' (20')) and saves (as F1) are in the module; this program does not need them.

## PRIMM

**Predict.** Seed `5`. Inputs: `1` (Wizard), `1` (search), `n` (do not listen), `y` (force), then in the fight `3` (Sleep), `1`, `1`.

1. The Sleep roll is 2d8 = 13. How many rats fall asleep? Which line of code decides?
2. In round 2, which rat does the Wizard strike? What does the rat row look like after that round?
3. When does the fight end, and why does nobody bite the Wizard?

<details><summary>Answers</summary>

1. All five. The loop gives each living rat 1 Hit Die of the budget while `budget > 0`; 5 is less than 13.
2. Rat 1 (index 0), the first live rat. After the round: `x z z z z`.
3. After round 3, when rat 2 dies too and `dead >= RAT_FLEE`. Sleeping rats do not bite, and the bite loop skips them.

</details>

**Run.** Same seed and inputs in both languages. Then play the Wizard again and *do not* cast Sleep. What happens?

**Investigate.**

1. Find `rat_hp = [2, 3, 1, 4, 2]` (C++: `int rat_hp[RAT_COUNT] = {2, 3, 1, 4, 2};`). What is `rat_hp[0]`? What is `rat_hp[5]`, and what does each language do if you ask for it?
2. Find `print(f"You strike at rat {target + 1}. ", end="")`. Why `+ 1`? What would players see without it?
3. Find the loop with `biters < DOORWAY`. Set `DOORWAY` to 5. Play the Fighter. What changes?

**Modify.**

1. Give the rats a sixth member with 3 hit points. Which lines must change? (Hint: one constant and one list.)
2. Make the pack flee at 3 dead instead of 2.

**Make.** Add a morale check by the book: when the first rat dies, and again when half are dead, roll 2d6; if the total is more than 8 (ML 8), the rest flee. Or give the hero Fate points (3) and let them spend 2 to cheat death once, as the playbooks say.

## Test vectors

<!-- TEST VECTORS -->

### eof mid fight

Input, one line per prompt (`test_vectors/stage5_eof_mid_fight.in`). The first line is the seed:

```text
7
2
1
y
y
1
```

<details><summary>Expected output, 43 lines (`test_vectors/stage5_eof_mid_fight.out`)</summary>

```text
Seed? 7

THE FIRST DELVE - Stage 5: five rats

Who rows to the island?
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 2
You are the Fighter.

The Fort docks. Captain Maren sends you to the Isle of Old Stone.
S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water.
The sun sets. You light a torch. It will burn 6 turns.
S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows.
What do you do? Each choice takes one turn.
  1. Search the rubble   2. Climb the stair   3. Look in the cottage
Pick 1, 2 or 3: 1
Under the rubble lies a trapdoor of black oak.
Turn 1. Torch: 5 of 6.

C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.
Listen at the door? (y/n): y
Listen: d6 = 5, need 1 or less: no.
You hear only water, dripping somewhere.
Force the door? It takes one turn. (y/n): y
Force: d6 = 3, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 3, need 1 or less: no.

C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky.
Five giant rats, each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
Round 1. You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 11, total 12 vs AC 12: hit.
You deal 9 damage.
Rat 1 dies.
Rat 2 bites. d20 = 9, total 9 vs AC 15: miss.
Rat 3 bites. d20 = 10, total 10 vs AC 15: miss.
Round 2. You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 
(No more input. You put out your torch and row home.)
```

</details>

### fighter dies

Input, one line per prompt (`test_vectors/stage5_fighter_dies.in`). The first line is the seed:

```text
4
2
1
n
y
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
```

<details><summary>Expected output, 86 lines (`test_vectors/stage5_fighter_dies.out`)</summary>

```text
Seed? 4

THE FIRST DELVE - Stage 5: five rats

Who rows to the island?
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 2
You are the Fighter.

The Fort docks. Captain Maren sends you to the Isle of Old Stone.
S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water.
The sun sets. You light a torch. It will burn 6 turns.
S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows.
What do you do? Each choice takes one turn.
  1. Search the rubble   2. Climb the stair   3. Look in the cottage
Pick 1, 2 or 3: 1
Under the rubble lies a trapdoor of black oak.
Turn 1. Torch: 5 of 6.

C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.
Listen at the door? (y/n): n
Force the door? It takes one turn. (y/n): y
Force: d6 = 3, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 5, need 1 or less: no.

C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky.
Five giant rats, each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
Round 1. You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 6, total 7 vs AC 12: miss.
Rat 1 bites. d20 = 5, total 5 vs AC 15: miss.
Rat 2 bites. d20 = 6, total 6 vs AC 15: miss.
Round 2. You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 20, total 21 vs AC 12: hit.
You deal 2 damage.
Rat 1 dies.
Rat 2 bites. d20 = 1, total 1 vs AC 15: miss.
Rat 3 bites. d20 = 8, total 8 vs AC 15: miss.
Round 3. You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 6, total 7 vs AC 12: miss.
Rat 2 bites. d20 = 9, total 9 vs AC 15: miss.
Rat 3 bites. d20 = 17, total 17 vs AC 15: hit.
You lose 1 hp.
Round 4. You: 7 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 3, total 4 vs AC 12: miss.
Rat 2 bites. d20 = 17, total 17 vs AC 15: hit.
You lose 1 hp.
Rat 3 bites. d20 = 9, total 9 vs AC 15: miss.
Round 5. You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 8, total 9 vs AC 12: miss.
Rat 2 bites. d20 = 4, total 4 vs AC 15: miss.
Rat 3 bites. d20 = 7, total 7 vs AC 15: miss.
Round 6. You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 17, total 18 vs AC 12: hit.
You deal 2 damage.
Rat 2 bites. d20 = 7, total 7 vs AC 15: miss.
Rat 3 bites. d20 = 2, total 2 vs AC 15: miss.
Round 7. You: 6 hp. Rats: x 1 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 10, total 11 vs AC 12: miss.
Rat 2 bites. d20 = 7, total 7 vs AC 15: miss.
Rat 3 bites. d20 = 20, total 20 vs AC 15: hit.
You lose 2 hp.
Round 8. You: 4 hp. Rats: x 1 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 7, total 8 vs AC 12: miss.
Rat 2 bites. d20 = 20, total 20 vs AC 15: hit.
You lose 3 hp.
Rat 3 bites. d20 = 7, total 7 vs AC 15: miss.
Round 9. You: 1 hp. Rats: x 1 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 10, total 11 vs AC 12: miss.
Rat 2 bites. d20 = 1, total 1 vs AC 15: miss.
Rat 3 bites. d20 = 18, total 18 vs AC 15: hit.
You lose 3 hp.
You fall among the broken jars. The rats close in.
The delve is over for today.
```

</details>

### fighter wins

Input, one line per prompt (`test_vectors/stage5_fighter_wins.in`). The first line is the seed:

```text
7
2
1
y
y
1
1
1
1
1
1
1
```

<details><summary>Expected output, 69 lines (`test_vectors/stage5_fighter_wins.out`)</summary>

```text
Seed? 7

THE FIRST DELVE - Stage 5: five rats

Who rows to the island?
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 2
You are the Fighter.

The Fort docks. Captain Maren sends you to the Isle of Old Stone.
S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water.
The sun sets. You light a torch. It will burn 6 turns.
S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows.
What do you do? Each choice takes one turn.
  1. Search the rubble   2. Climb the stair   3. Look in the cottage
Pick 1, 2 or 3: 1
Under the rubble lies a trapdoor of black oak.
Turn 1. Torch: 5 of 6.

C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.
Listen at the door? (y/n): y
Listen: d6 = 5, need 1 or less: no.
You hear only water, dripping somewhere.
Force the door? It takes one turn. (y/n): y
Force: d6 = 3, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 3, need 1 or less: no.

C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky.
Five giant rats, each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
Round 1. You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 11, total 12 vs AC 12: hit.
You deal 9 damage.
Rat 1 dies.
Rat 2 bites. d20 = 9, total 9 vs AC 15: miss.
Rat 3 bites. d20 = 10, total 10 vs AC 15: miss.
Round 2. You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 8, total 9 vs AC 12: miss.
Rat 2 bites. d20 = 14, total 14 vs AC 15: miss.
Rat 3 bites. d20 = 9, total 9 vs AC 15: miss.
Round 3. You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 4, total 5 vs AC 12: miss.
Rat 2 bites. d20 = 4, total 4 vs AC 15: miss.
Rat 3 bites. d20 = 15, total 15 vs AC 15: hit.
You lose 2 hp.
Round 4. You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 6, total 7 vs AC 12: miss.
Rat 2 bites. d20 = 6, total 6 vs AC 15: miss.
Rat 3 bites. d20 = 7, total 7 vs AC 15: miss.
Round 5. You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 15, total 16 vs AC 12: hit.
You deal 7 damage.
Rat 2 dies.
2 rats lie dead. The pack breaks. The rest flee down the far stair.
Turn 3. Torch: 3 of 6.
In one rack, five flasks of oil are still whole. You take them.

C3. THE FLOODED STAIR. A second stair goes down into black water.
As you watch, the water climbs one step, as if the lake took a breath.
The first delve ends here, on turn 3. Torch: 3 of 6.
END OF STAGE 5.
```

</details>

### wizard sleep

Input, one line per prompt (`test_vectors/stage5_wizard_sleep.in`). The first line is the seed:

```text
5
1
1
n
y
3
1
1
1
1
```

<details><summary>Expected output, 48 lines (`test_vectors/stage5_wizard_sleep.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 5: five rats

Who rows to the island?
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 1
You are the Wizard.

The Fort docks. Captain Maren sends you to the Isle of Old Stone.
S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water.
The sun sets. You light a torch. It will burn 6 turns.
S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows.
What do you do? Each choice takes one turn.
  1. Search the rubble   2. Climb the stair   3. Look in the cottage
Pick 1, 2 or 3: 1
Under the rubble lies a trapdoor of black oak.
Turn 1. Torch: 5 of 6.

C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.
Listen at the door? (y/n): n
Force the door? It takes one turn. (y/n): y
Force: d6 = 1, need 1 or less: yes.
The door bursts open with a crack like a dropped plank.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 2, need 1 or less: no.

C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky.
Five giant rats, each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
Round 1. You: 4 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run, 3 cast Sleep: 3
You speak the word of Sleep. 2d8 = 13.
Round 2. You: 4 hp. Rats: z z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. It is asleep. One blow kills it.
Round 3. You: 4 hp. Rats: x z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. It is asleep. One blow kills it.
2 rats lie dead. The pack breaks. The rest flee down the far stair.
Turn 3. Torch: 3 of 6.
In one rack, five flasks of oil are still whole. You take them.

C3. THE FLOODED STAIR. A second stair goes down into black water.
As you watch, the water climbs one step, as if the lake took a breath.
The first delve ends here, on turn 3. Torch: 3 of 6.
END OF STAGE 5.
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| Both | `for i in range(1, 6)` / `for (int i = 1; i <= 5; i++)` | Skips rat 0 and reads past the end. | Indexes run 0 to 4: `range(5)`, `i < 5`. |
| Python | `rat_hp[5]` | `IndexError: list index out of range`. The program stops. | Check the index is less than `len(rat_hp)`. |
| C++ | `rat_hp[5]` | No error. It reads or writes whatever memory is there: a wrong number, or a crash later. | Keep `i < RAT_COUNT`. Use `vector::at()` while testing. |
| C++ | `bool asleep[RAT_COUNT];` with no `= {}` | Each value is garbage: some rats start asleep. | `bool asleep[RAT_COUNT] = {};` |
| Python | `start_hp = rat_hp`, then changing `rat_hp` | Both names point at one list, so `start_hp` changes too. | Copy it: `start_hp = rat_hp.copy()`. (In C++, plain arrays cannot be assigned at all; a `vector` copy is a real copy.) |
| Both | Counting dead rats without resetting `dead = 0` each round | The count grows every round; the rats flee too soon. | Set the counter to 0 just before the counting loop. |
| Both | Showing index `i` to players | Players see "rat 0". | Show `i + 1`, store `i`. |
| Both | `break` in the wrong loop | Only the innermost loop stops. | Put `break` inside the loop you want to leave. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| A list of five numbers | `rat_hp = [2, 3, 1, 4, 2]` | `int rat_hp[5] = {2, 3, 1, 4, 2};` |
| Five falses | `[False] * 5` | `bool asleep[5] = {};` |
| One item | `rat_hp[0]` | `rat_hp[0]` |
| Change one item | `rat_hp[i] = rat_hp[i] - damage` | `rat_hp[i] = rat_hp[i] - damage;` |
| Length | `len(rat_hp)` | A constant, `RAT_COUNT` (or `vector::size()`, stage 6) |
| Loop over indexes | `for i in range(RAT_COUNT):` | `for (int i = 0; i < RAT_COUNT; i++)` |
| Stop a loop early | `break` | `break;` |
| A constant | `RAT_AC = 12` (by custom, CAPITALS) | `const int RAT_AC = 12;` (the compiler enforces it) |
| Larger of two | `max(1, x)` | `max(1, x)` (needs `<algorithm>`) |
| One-line if / else | `"yes" if ok else "no"` | `ok ? "yes" : "no"` |
