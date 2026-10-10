# Stage 2: Choices

| | |
|---|---|
| **What this teaches** | Input and `if / else`: the player picks a hero, listens at the stuck door in C1, and tries to force it. |
| **Files** | `python/stage2_choices.py` and `cpp/stage2_choices.cpp` |
| **Book chapter** | C++: Gaddis Ch. 4 (Making Decisions). Python: conditions, `if / elif / else`, Boolean logic. |
| **New ideas** | Comparing with `==` and `!=`; `if / elif / else`; `and`, `or`, `not`; a `bool` variable; an `if` inside an `if`; leaving `main` early with `return`. |

**The rules in this stage** (from Module 2, C1). Listening is **1-in-6**: roll a d6 and succeed on a 1. Elves, dwarves and halflings (demi-humans) listen on **2-in-6**: a 1 or a 2. A stuck door opens on **1-2 on a d6**, and the STR modifier moves that number: the Fighter (STR 14, +1) needs 3 or less, the Wizard (STR 8, -1) needs 1 or less.

## PRIMM

**Predict.** Seed `5`. Inputs: `2` (the Fighter), `y` (look in the cottage), `y` (listen), `y` (force).

1. Which lines of room text will print? Which will not?
2. The listen roll is a 1. What does the hero hear?
3. The force roll is a 2. Does the door open? What number does the Fighter need?

<details><summary>Answers</summary>

1. The docks, S1, S2, S3 (because of the `y`), and C1. All of them.
2. `Scratching. Squeaks. Many small feet.` A 1 is "1 or less".
3. Yes. The Fighter needs `2 + 1 = 3` or less.

</details>

**Run.** Run it with the same seed and inputs in both languages. Then run it again and pick the Wizard.

**Investigate.**

1. Find `if pick == "1":`. Why is `"1"` in quotes? What happens if you remove the quotes in Python? In C++?
2. Find `if answer != "y" and answer != "Y":` (C++: `&&`). Read it aloud. Why is it `and` and not `or`?
3. Find `is_open = force <= need`. What type is `is_open`? What two values can it hold?

**Modify.**

1. Make the hero a dwarf: listening succeeds on 1 or 2. Change one number.
2. Accept `yes` and `YES` as well as `y` and `Y` at the "Force the door?" question.

**Make.** Add a third hero of your own design, with a different STR modifier, and give them a reason to open the door another way (a crowbar, a spell, oil on the hinges: the module says oil makes the next try succeed on 1-3). There is no single right answer.

## Test vectors

Run with `ECHO_INPUT=1` so the typed answers show in the transcript.

<!-- TEST VECTORS -->

### bad pick eof

Input, one line per prompt (`test_vectors/stage2_bad_pick_eof.in`). The first line is the seed:

```text
3
7
```

<details><summary>Expected output, 32 lines (`test_vectors/stage2_bad_pick_eof.out`)</summary>

```text
Seed? 3

THE FIRST DELVE - Stage 2: choices

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 7
That is not 1 or 2, so the Wizard goes.
You are the Wizard. Your STR modifier is -1.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
You shift stones for ten minutes. Under the rubble lies a trapdoor
of black oak. Its iron ring is furred with rust.

Look in the cottage first? (y/n): 
(No more input. You put out your torch and row home.)
```

</details>

### fighter opens

Input, one line per prompt (`test_vectors/stage2_fighter_opens.in`). The first line is the seed:

```text
5
2
y
y
y
```

<details><summary>Expected output, 48 lines (`test_vectors/stage2_fighter_opens.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 2: choices

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 2
You are the Fighter. Your STR modifier is +1.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
You shift stones for ten minutes. Under the rubble lies a trapdoor
of black oak. Its iron ring is furred with rust.

Look in the cottage first? (y/n): y
S3. THE KEEPER'S COTTAGE
A stone cottage beside the tower. The roof is gone. The hearth holds
ash less than a week old. A tin of lamp oil sits on a shelf, enough for
two flasks. On the door someone has chalked an eye with a line through
it. It is not a greeting.

C1. THE CELLAR STAIR
Under the trapdoor a stone stair goes down twenty feet. The air smells
of old oil and wet stone. At the bottom stands an oak door, swollen in
its frame. It is stuck.
Listen at the door? (y/n): y
Listen: d6 = 1, need 1 or less.
Scratching. Squeaks. Many small feet.
Force the door? (y/n): y
Force: d6 = 2, need 3 or less.
The door bursts open with a crack like a dropped plank.
In the dark beyond, five pairs of small red eyes turn toward you.
END OF STAGE 2.
```

</details>

### wizard fails twice

Input, one line per prompt (`test_vectors/stage2_wizard_fails_twice.in`). The first line is the seed:

```text
1
1
n
y
y
y
```

<details><summary>Expected output, 45 lines (`test_vectors/stage2_wizard_fails_twice.out`)</summary>

```text
Seed? 1

THE FIRST DELVE - Stage 2: choices

Who rows to the island?
  1. The Wizard: 4 hit points, AC 9 [10], STR 8
  2. The Fighter: 8 hit points, AC 4 [15], STR 14
Pick 1 or 2: 1
You are the Wizard. Your STR modifier is -1.

The Fort docks. Captain Maren coils a wet rope and does not smile.
"Row to the Isle of Old Stone. Find out who lands there,
and what moves in the water."
Four hours of oars later, the sun is low and the island is close.

S1. THE BROKEN JETTY
A stone jetty runs out from the south shore. Half of it has fallen
into the lake. On a mooring post, a rope burn shows pale and fresh:
someone else lands here. Past the end of the jetty, something large
moves under the water, a long shadow, and is gone.

S2. THE TOWER SHELL
A round tower, thirty feet across, open to the sky. Its upper floors
fell in long ago and lie as rubble on the ground. A stair climbs the
inside wall to a broken top forty feet up. Crows watch you from the
rim with the calm of tax collectors.
You shift stones for ten minutes. Under the rubble lies a trapdoor
of black oak. Its iron ring is furred with rust.

Look in the cottage first? (y/n): n
C1. THE CELLAR STAIR
Under the trapdoor a stone stair goes down twenty feet. The air smells
of old oil and wet stone. At the bottom stands an oak door, swollen in
its frame. It is stuck.
Listen at the door? (y/n): y
Listen: d6 = 2, need 1 or less.
You hear only water, dripping somewhere.
Force the door? (y/n): y
Force: d6 = 4, need 1 or less.
The door shudders and holds. The noise rolls away into the dark.
Try again? (y/n): y
Force: d6 = 6, need 1 or less.
The door holds. You climb back into the daylight.
To try again and again, you need a loop. That is stage 3.
END OF STAGE 2.
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| Both | `answer == "y" or "Y"` (C++: `answer == "y" \|\| "Y"`) | Always true. `"Y"` on its own counts as true. | Compare twice: `answer == "y" or answer == "Y"`. |
| Python | `if pick == 1:` | Never true. `pick` is the text `"1"`, not the number 1. | Compare text with text: `"1"`. |
| C++ | `if (pick == 1)` | Compile error: a `string` cannot be compared with an `int`. | Use `"1"`. |
| C++ | `if (x = 1)` with an `int x` | Sets `x` to 1, then is always true. `-Wall` warns. | Use `==` to compare. |
| Python | `if pick = "1":` | `SyntaxError`. Python will not let `=` sit in a test. | Use `==`. |
| Both | "1-in-6" written as `listen < 1` | Never succeeds. A d6 never rolls below 1. | `listen <= 1` (or `== 1`). For 2-in-6: `<= 2`. |
| C++ | `cin >> pick;` then `getline(cin, answer);` | The `getline` reads the leftover end of line and returns empty text at once. | Use `getline` for every input, as the toolbox does, or `cin.ignore()` after `cin >>`. |
| C++ | A semicolon after the test: `if (is_open);` | The `if` controls an empty statement. The block below always runs. | No semicolon after `if (...)`. |
| Python | Wrong indent under `if` | The line runs outside the branch, or `IndentationError`. | Indent the whole branch the same amount. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| If / else if / else | `if a:` ... `elif b:` ... `else:` | `if (a) { } else if (b) { } else { }` |
| Equal, not equal | `==`, `!=` | `==`, `!=` |
| And, or, not | `and`, `or`, `not` | `&&`, `\|\|`, `!` |
| True and false | `True`, `False` | `true`, `false` |
| A yes/no variable | `is_open = force <= need` | `bool is_open = force <= need;` |
| Blocks | Indentation | `{ }` braces |
| Leave `main` early | `return` | `return 0;` |
| Declare before branches | Not needed | `string hero; int str_mod;` before the `if`, so both branches can set them |
