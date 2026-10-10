# Stage 4: Dice as Functions

| | |
|---|---|
| **What this teaches** | Functions: `check(in_six)`, `attack(bonus, ac)` and `tick(...)` take parameters and return values, and replace the copied code of stage 3. |
| **Files** | `python/stage4_dice_functions.py` and `cpp/stage4_dice_functions.cpp` |
| **Book chapter** | C++: Gaddis Ch. 6 (Functions): parameters, return values, `void`, reference parameters. Python: defining functions, parameters, `return`, returning two values. |
| **New ideas** | `def` / a function definition; parameters and arguments; `return`; `void`; C++ reference parameters (`int& torch`); Python returning a pair. |

Open the toolbox now. `roll(sides)` was a function all along: `sides` is its parameter and `return` hands back the number. The new functions use it.

| Function | Rule it holds | Returns |
|----------|---------------|---------|
| `check(in_six)` | Roll a d6; succeed on `in_six` or less. `check(1)` is 1-in-6. | `True` / `true` on a success |
| `attack(bonus, ac)` | Roll d20 + bonus; hit if the total is at least the target's ascending AC. Giant rats are AC 7 [12]. | `True` / `true` on a hit |
| `tick(turn, torch)` | One turn passes; every 2nd turn, a wandering check. | Python: the new `(turn, torch)`. C++: changes the caller's variables through references. |

## PRIMM

**Predict.** Seed `7`. Inputs: `2` (Fighter), `1` (search), `y` (listen), `y` (force).

1. How many times is `check` called in this run? (Count wandering checks too.)
2. The Fighter's `attack` uses `bonus = 1` against `ac = 12`. What d20 roll is the lowest that hits?
3. If `tick` is called and `turn` becomes 2, what does it print before it returns?

<details><summary>Answers</summary>

1. Three: the listen check, the force check, and the wandering check on turn 2. The door opens on the first try with this seed.
2. 11, because 11 + 1 = 12.
3. `Turn 2. Torch: 4 of 6.` and then `Wandering check: d6 = ...`.

</details>

**Run.** Same seed and inputs in both languages. Compare with stage 3: the game plays the same, but the code is shorter.

**Investigate.**

1. Find `def check(in_six):` (C++: `bool check(int in_six)`). Find every call to `check`. What value does `in_six` take in each call?
2. Find `turn, torch = tick(turn, torch)` in Python and `tick(turn, torch);` in C++. In C++, remove both `&` signs from `void tick(int& turn, int& torch)`. What goes wrong when you run it?
3. Find `is_open = check(2 + str_mod)`. When is `2 + str_mod` worked out: before the call or inside `check`?

**Modify.**

1. Make the Wizard a dwarf wizard who listens on 2-in-6. Change one argument.
2. Add a function `force_door(str_mod)` that returns a bool, and use it in the door loop.

**Make.** Write `damage(sides, bonus)` that rolls one die, adds the bonus, and never returns less than 1. Use it after the hit at the end, and print the damage. Then think: what other rule in this game deserves its own function?

## Test vectors

<!-- TEST VECTORS -->

### eof

Input, one line per prompt (`test_vectors/stage4_eof.in`). The first line is the seed:

```text
4
2
1
```

Expected output, 23 lines (`test_vectors/stage4_eof.out`):

```text
Seed? 4

THE FIRST DELVE - Stage 4: dice as functions

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
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
Listen at the door? (y/n): 
(No more input. You put out your torch and row home.)
```

### fighter hits

Input, one line per prompt (`test_vectors/stage4_fighter_hits.in`). The first line is the seed:

```text
7
2
1
y
y
y
y
y
```

<details><summary>Expected output, 34 lines (`test_vectors/stage4_fighter_hits.out`)</summary>

```text
Seed? 7

THE FIRST DELVE - Stage 4: dice as functions

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
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
C2. THE OIL STORE. Five giant rats lift their heads. One leaps.
You strike first. d20 = 11, total 12 vs AC 12: hit.
Your blow throws it back among the jars.
The whole fight with all five rats is stage 5.
END OF STAGE 4.
```

</details>

### wizard misses

Input, one line per prompt (`test_vectors/stage4_wizard_misses.in`). The first line is the seed:

```text
5
1
1
n
y
y
y
```

<details><summary>Expected output, 32 lines (`test_vectors/stage4_wizard_misses.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 4: dice as functions

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
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
C2. THE OIL STORE. Five giant rats lift their heads. One leaps.
You strike first. d20 = 3, total 2 vs AC 12: miss.
You miss. Its teeth close on your boot.
The whole fight with all five rats is stage 5.
END OF STAGE 4.
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| Both | Calling `check` without the parentheses: `if check:` / `if (check)` | Python: always true (a function is not empty). C++: a warning, and always true. | `check(1)` |
| Both | Forgetting `return` | Python returns `None`, which counts as false. C++: flowing off the end of a value-returning function is undefined behaviour. `-Wall` warns (`-Wreturn-type`), so with this course's `-Werror` it will not compile. | Every path through the function must `return` a value. |
| Python | `tick(turn, torch)` without using the result | `turn` and `torch` never change in `main`. | `turn, torch = tick(turn, torch)` |
| C++ | `void tick(int turn, int torch)` without `&` | The function changes its own copies. The caller's values never change. | `int& turn, int& torch` |
| C++ | Calling a function above where it is written | Compile error: not declared in this scope. | Write the function above `main`, or put a prototype at the top. |
| Both | Printing inside a function when you meant to return | The value is shown, not handed back. The caller gets nothing to test. | `return` the value; let the caller print. |
| Both | Mixing up argument order: `attack(12, 1)` | Bonus 12 against AC 1: every swing hits. | Arguments match parameters by position. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| Define a function | `def check(in_six):` | `bool check(int in_six) { }` |
| Parameter types | Not written | Written for each parameter |
| Return a value | `return success` | `return success;` |
| No value returned | (any function; returns `None`) | `void torch_out() { }` |
| Change the caller's variable | Not possible for a number. Return the new value instead. | Reference parameter: `int& torch` |
| Return two values | `return turn, torch` and `turn, torch = tick(...)` | Reference parameters, or a struct (stage 6) |
| Print without a newline | `print("Force: ", end="")` | `cout << "Force: ";` |
| Where it must be written | Anywhere above the line that *runs* the call | Above the call in the file, or declared by a prototype |
