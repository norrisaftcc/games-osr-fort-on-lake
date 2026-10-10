# Stage 3: The Dungeon Clock

| | |
|---|---|
| **What this teaches** | Loops: time passes one turn at a time, the torch burns down, and the game ends when the light dies. |
| **Files** | `python/stage3_dungeon_clock.py` and `cpp/stage3_dungeon_clock.cpp` |
| **Book chapter** | C++: Gaddis Ch. 5 (Loops and Files), the `while` loop, counters, `continue`. Python: `while` loops, counters, the `%` operator. |
| **New ideas** | `while`; a counter (`turn`) and a countdown (`torch`); `%` for "every second turn"; `continue`; a loop with more than one way out. |

**The Dungeon Clock** (Module 2). One turn is 10 minutes. A torch burns 6 turns. Searching takes a turn and, in S2, finds the trapdoor. Every 2 turns, roll a d6 for wandering monsters; on a 1, something comes. In this program, each try at the stuck door also takes a turn.

## PRIMM

**Predict.** Seed `5`. Inputs: `2` (Fighter), `3` (cottage), `1` (search), `y` (listen), `y` (force).

1. How many times will the "What do you do?" menu appear?
2. On which turn numbers does the program make a wandering check?
3. On turn 2 the wandering die shows 1. How much torch is left after turn 2?

<details><summary>Answers</summary>

1. Twice: once before the cottage, once before the search. Searching sets `found` to true, so the loop ends.
2. Only turn 2 in this run. Turn 1 and turn 3 are odd, so `turn % 2` is 1.
3. 3 of 6: one for turn 1, one for turn 2, and one more while the hero hides.

</details>

**Run.** Same seed and inputs in both languages. Then pick the Wizard and keep forcing the door until something happens.

**Investigate.**

1. Find `while not found:` (C++: `while (!found)`). What line makes this loop stop?
2. Find `continue`. Type `9` at the menu. Does the clock tick? Why not?
3. Find the two copies of the clock block (`turn = turn + 1` ... `return`). What is the same in both? What would you have to change in both if a torch burned 5 turns?

**Modify.**

1. Give the hero a lantern: 24 turns instead of 6. Change the start value and the two places that print "of 6". (Notice how many places you had to change. Stage 4 fixes that.)
2. Module 2 says each failed forcing is loud and calls a wandering check at once. Add a wandering check after a failed forcing.

**Make.** Add a rest rule: on every 6th turn the hero must rest (a turn passes with no action), or take -1 to hit for the rest of the delve. Ask the player which.

## Test vectors

<!-- TEST VECTORS -->

### eof in loop

Input, one line per prompt (`test_vectors/stage3_eof_in_loop.in`). The first line is the seed:

```text
9
2
5
2
```

<details><summary>Expected output, 47 lines (`test_vectors/stage3_eof_in_loop.out`)</summary>

```text
Seed? 9

THE FIRST DELVE - Stage 3: the Dungeon Clock

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 2
You are the Fighter.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.
The sun sets. You light a torch. It will burn 6 turns.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 5
Pick 1, 2 or 3.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 2
From the broken top you see the whole island: rock, pine, the jetty,
the cottage. At the north cliff a boat-shaped shadow lies on the water.
Turn 1. Torch: 5 of 6.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 
(No more input. You put out your torch and row home.)
```

</details>

### fighter wanderer

Input, one line per prompt (`test_vectors/stage3_fighter_wanderer.in`). The first line is the seed:

```text
5
2
3
1
y
y
y
y
y
```

<details><summary>Expected output, 65 lines (`test_vectors/stage3_fighter_wanderer.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 3: the Dungeon Clock

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 2
You are the Fighter.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.
The sun sets. You light a torch. It will burn 6 turns.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 3
S3. THE KEEPER'S COTTAGE
A stone cottage beside the tower. The roof is gone. The hearth holds
ash less than a week old. A tin of lamp oil sits on a shelf, enough for
two flasks. On the door someone has chalked an eye with a line through
it. It is not a greeting.
Turn 1. Torch: 5 of 6.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 1
You shift stones for ten minutes. Under the rubble lies a trapdoor
of black oak. Its iron ring is furred with rust.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 1, need 1 or less.
Something wet drags itself past in the dark. You hold still
until it is gone. The torch burns while you wait.
Torch: 3 of 6.

C1. THE CELLAR STAIR
Under the trapdoor a stone stair goes down twenty feet. The air smells
of old oil and wet stone. At the bottom stands an oak door, swollen in
its frame. It is stuck.
Listen at the door? (y/n): y
Listen: d6 = 2, need 1 or less.
You hear only water, dripping somewhere.
Force the door? It takes one turn. (y/n): y
Force: d6 = 3, need 3 or less.
The door bursts open with a crack like a dropped plank.
Turn 3. Torch: 2 of 6.
In the dark beyond, five pairs of small red eyes turn toward you.
You reached the oil store on turn 3. Torch: 2 of 6.
END OF STAGE 3.
```

</details>

### wizard torch dies

Input, one line per prompt (`test_vectors/stage3_wizard_torch_dies.in`). The first line is the seed:

```text
1
1
1
n
y
y
y
y
y
y
y
y
```

<details><summary>Expected output, 66 lines (`test_vectors/stage3_wizard_torch_dies.out`)</summary>

```text
Seed? 1

THE FIRST DELVE - Stage 3: the Dungeon Clock

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 1
You are the Wizard.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.
The sun sets. You light a torch. It will burn 6 turns.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
What do you do? Each choice takes one turn.
  1. Search the rubble
  2. Climb the stair
  3. Look in the cottage
Pick 1, 2 or 3: 1
You shift stones for ten minutes. Under the rubble lies a trapdoor
of black oak. Its iron ring is furred with rust.
Turn 1. Torch: 5 of 6.

C1. THE CELLAR STAIR
Under the trapdoor a stone stair goes down twenty feet. The air smells
of old oil and wet stone. At the bottom stands an oak door, swollen in
its frame. It is stuck.
Listen at the door? (y/n): n
Force the door? It takes one turn. (y/n): y
Force: d6 = 2, need 1 or less.
The door shudders and holds. The noise rolls away into the dark.
Turn 2. Torch: 4 of 6.
Wandering check: d6 = 4, need 1 or less.
Force the door? It takes one turn. (y/n): y
Force: d6 = 6, need 1 or less.
The door shudders and holds. The noise rolls away into the dark.
Turn 3. Torch: 3 of 6.
Force the door? It takes one turn. (y/n): y
Force: d6 = 6, need 1 or less.
The door shudders and holds. The noise rolls away into the dark.
Turn 4. Torch: 2 of 6.
Wandering check: d6 = 4, need 1 or less.
Force the door? It takes one turn. (y/n): y
Force: d6 = 3, need 1 or less.
The door shudders and holds. The noise rolls away into the dark.
Turn 5. Torch: 1 of 6.
Force the door? It takes one turn. (y/n): y
Force: d6 = 1, need 1 or less.
The door bursts open with a crack like a dropped plank.
Turn 6. Torch: 0 of 6.
Wandering check: d6 = 5, need 1 or less.
Your torch gutters out. In the dark you feel your way back to
the boat. The delve is over for today.
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| Both | Forgetting to change the loop variable (`found` never becomes true) | The loop never ends. | Make sure some path inside the loop makes the test false, or returns. |
| Both | Reading input outside the loop | The loop uses the same answer forever. | Read the input inside the loop. |
| Python | `turn = turn + 1` written as `turn + 1` | Nothing changes. The sum is thrown away. | `turn = turn + 1` or `turn += 1`. |
| C++ | `while (!found);` with a semicolon | An empty loop that never ends. | No semicolon after `while (...)`. |
| Both | `turn % 2 == 1` for "every second turn" | Checks on turns 1, 3, 5 instead of 2, 4, 6. | `turn % 2 == 0`. |
| Both | Checking the torch before the tick | The hero acts one turn in the dark. | Tick, then check. |
| Both | `torch == 0` as the end test | A wanderer can drop the torch from 1 to -1, past 0, and the game goes on. | `torch <= 0`. |
| C++ | `int torch;` with no value, then `torch = torch - 1` | Undefined behaviour: reading a variable that was never given a value. The torch may seem to work, burn from nonsense, or end the game at once, and it can change between compilers. | `int torch = 6;` |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| While loop | `while not found:` | `while (!found) { }` |
| Add one | `turn = turn + 1` or `turn += 1` | `turn = turn + 1;`, `turn += 1;` or `turn++;` |
| Remainder | `turn % 2` | `turn % 2` |
| Skip to the next loop test | `continue` | `continue;` |
| Leave the loop | `break` | `break;` |
| Leave the whole program from a loop | `return` (we are inside `main`) | `return 0;` |
| Loop forever until `break` | `while True:` | `while (true) { }` |
