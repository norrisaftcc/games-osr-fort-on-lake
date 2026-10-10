# The First Delve: a Teaching Game in Python and C++

*The First Delve* is a small console game. The player rows to the Drowned Tower of Module 2 and plays its first rooms: the docks, then S1, S2, S3, C1, C2 and C3. One character goes: the Wizard or the Fighter.

The game comes in **seven stages**. Each stage is a complete program that adds one first-year idea. Each stage exists in **Python** and in **C++**. Give both versions the same seed and the same typed lines, and they print the same bytes. That is the main teaching device: *same program, two languages*.

## What is here

| Path | What it is |
|------|------------|
| `python/stageN_*.py` | The Python version of each stage. Standard library only. |
| `cpp/stageN_*.cpp` | The C++17 version of each stage. Standard library only. |
| `stages/stageN.md` | One guide per stage: the idea, the book chapter, a PRIMM activity, test vectors, common mistakes, and a Python and C++ table. |
| `test_vectors/` | Input files (`.in`) and expected output (`.out`) for every stage. |
| `RNG.md` | The dice machine. Why we wrote our own, and the code in both languages. |
| `check.sh` | Builds and tests everything. |

## The stages

| Stage | File name | Idea | Gaddis (C++) | Python topic |
|-------|-----------|------|--------------|--------------|
| 1 | `stage1_character_sheet` | Variables, types, output, formatting | Ch. 2-3 | Variables, f-strings |
| 2 | `stage2_choices` | Input, `if / else`, `and / or` | Ch. 4 | Conditions |
| 3 | `stage3_dungeon_clock` | `while` loops, counters, `%` | Ch. 5 | `while` loops |
| 4 | `stage4_dice_functions` | Functions, parameters, return values | Ch. 6 | Functions |
| 5 | `stage5_five_rats` | Arrays and lists | Ch. 7 | Lists |
| 6 | `stage6_rooms_as_data` | Structs and records; the turn as a procedure | Ch. 11, 13 | Classes as records |
| 7 | `stage7_shortest_way` | Breadth-first search (stretch) | Ch. 8, 18, and beyond | Queues, graph search |

Chapter numbers follow the 9th and 10th editions of *Starting Out with C++: From Control Structures through Objects*. Other editions may differ by one.

Each stage starts with a **toolbox**: the dice machine and an input helper. It is the same in every stage. In stages 1 to 3, students use it without reading it, as they use `cout` or `print`. Stage 4 opens it.

In the code, a `# NEW:` or `// NEW:` comment marks each line that teaches the stage's idea.

## How to run it

**Python** (3.8 or newer):

```
cd classroom/python
python3 stage1_character_sheet.py
```

On Windows, type `py` in place of `python3`.

**C++** (any C++17 compiler):

```
cd classroom/cpp
g++ -std=c++17 -Wall -Wextra -o stage1 stage1_character_sheet.cpp
./stage1
```

On Windows with MinGW, run `stage1.exe`. In Visual Studio, make an empty console project and add the one `.cpp` file. Each stage is one file, so it also pastes into an online compiler.

**The first question is always the seed.** Type any number. The same seed gives the same dice.

**To run a test vector**, send the input file to the program. Set `ECHO_INPUT=1` so the program prints each typed line after its prompt. Then the transcript reads like a real session:

```
ECHO_INPUT=1 python3 python/stage5_five_rats.py < test_vectors/stage5_fighter_wins.in
ECHO_INPUT=1 ./stage5 < test_vectors/stage5_fighter_wins.in
```

In Windows PowerShell, set it first: `$env:ECHO_INPUT = "1"`. Without it, the output is the same, but the typed lines do not show.

When the input ends (a file runs out, or the player presses Ctrl+D, or Ctrl+Z then Enter on Windows), every stage stops with the message `(No more input. You put out your torch and row home.)`. No stage can loop forever on missing input.

**To check everything:**

```
./classroom/check.sh
```

It compiles every C++ stage with `-Wall -Wextra -Werror`, compiles every Python stage, runs `pyflakes` if it is installed, runs every test vector in both languages with and without echo, and checks that the stage guides still match the vectors. It fails on any warning, crash, timeout, non-ASCII byte, or difference. After you change the game on purpose, run `./check.sh --regen`: it rewrites the expected files from the Python version, then checks that C++ still matches.

## A 10-minute live demo

Open two terminals side by side: Python on the left in `classroom/python`, C++ on the right in `classroom/cpp`. Build stages 1 and 5 first (`g++ -std=c++17 -Wall -Wextra -o stage5 stage5_five_rats.cpp`). Use a large font.

| Time | Type | Say | Ask the class |
|------|------|-----|---------------|
| 0:00 | Nothing yet. Show `python/stage1_character_sheet.py` and `cpp/stage1_character_sheet.cpp` side by side. | "One program, written twice. Watch for what is the same." | "What do you think `int` means on the right? Why does the left not need it?" |
| 1:30 | Left: `python3 stage1_character_sheet.py`. Type `42`, then a student's name. Right: `./stage1`, same answers. | "The seed starts the dice. Same seed, same dice." | Before you press Enter on the name: "What will the Attack bonus line say? STR 8 gives -1." |
| 3:00 | Point at `dagger_average`: `/ 2` in Python, `/ 2.0` in C++. | "In C++, 5 divided by 2 is 2. In Python it is 2.5." | "Why did we write 2.0 on the right?" |
| 4:00 | Left: `python3 stage5_five_rats.py`. Type `7`, `2`, `1`, `y`, `y`. Stop at the first fight prompt. | "Five giant rats. Their hit points are a list: 2, 3, 1, 4, 2." | "The Fighter adds 1 to a d20. The rats are AC 12. What does he need to roll?" (11) |
| 5:30 | Type `1` until the fight ends. | "Two dead, and the rest run. Morale is a rule, not a choice." | "Which loop counted the dead rats?" |
| 6:30 | Right: `./stage5`, same inputs, same fight. | "Same seed, same typed lines, same story." | "Do you think the two outputs are exactly equal, to the last space?" |
| 7:30 | From the `classroom` folder: `diff <(ECHO_INPUT=1 python3 python/stage5_five_rats.py < test_vectors/stage5_fighter_wins.in) <(ECHO_INPUT=1 cpp/stage5 < test_vectors/stage5_fighter_wins.in)` | "No output from `diff` means no difference. We wrote our own dice so this would be true." | "What would break this, if we used Python's `random`?" |
| 8:30 | Show `rat_hp = [2, 3, 1, 4, 2]` beside `int rat_hp[RAT_COUNT] = {2, 3, 1, 4, 2};` | "Index 0 is the first rat." | "What happens if we ask for `rat_hp[5]`? Is the answer the same in both languages?" (Python stops with an error. C++ reads past the end and does not tell you.) |
| 9:30 | Show `stages/stage5.md`. | "Each stage has a guide like this. Try the Modify step tonight." | |

For a shorter demo, do only the rows from 4:00 to 7:30.

## How the stages map to a semester

| Weeks | Stage | Pair it with |
|-------|-------|--------------|
| 2-3 | 1 | First programs, `cout`, variables, arithmetic |
| 4-5 | 2 | Decisions |
| 6-7 | 3 | Loops |
| 8-9 | 4 | Functions; open the toolbox; read `RNG.md` |
| 10-11 | 5 | Arrays |
| 12-14 | 6 | Structs; use the Logo procedure to talk about design |
| 15, or honors | 7 | Searching; a first look at graphs and queues |

Each stage takes one lab: Predict and Run in class, Investigate in pairs, Modify as the lab, Make as an optional project.

## The parity idea

Parity holds because of three rules:

1. **Our own dice.** Both languages use the same 32-bit generator (mulberry32), written by hand. See `RNG.md`. Python's `random` and C++'s `<random>` never appear.
2. **Same steps, same order.** Each roll happens at the same point in both programs. Each line of text is the same, space for space.
3. **ASCII only.** No curly quotes, no dashes, no emoji. Old Windows consoles show every character, and the bytes match on every system.

The differences between the languages are the lesson: types, integer division, references, arrays that do not check their bounds. Each stage guide has a table of them.

## Where the game is simpler than Module 2

The rooms follow the pinned facts in `campaign/SPINE.md` and the text of `dm/Module_2_The_Drowned_Tower.md`. To keep each stage small, the game simplifies some rules. Say so if a student who plays the module asks.

| Module 2 | This game |
|----------|-----------|
| A failed forcing, or the crows at the stair top, calls a wandering check at once. | Wandering checks happen every 2 turns only. (Stage 3 Modify adds the noise rule.) |
| Walking is 120 feet a turn. | Walking from room to room is free. Searching, climbing, forcing and fighting take a turn. |
| Each PC carries several torches. | One torch. When it dies, the delve ends. |
| A wandering monster is rolled on a table. | Something passes in the dark; hiding costs one more turn of torch. |
| Rest one turn in six. | Left out: one torch dies by turn 6. (Stage 6 Make.) |
| Five rats can all reach a lone hero. | The hero holds the doorway: two rats bite each round. Without this, a lone Fighter usually dies. |
| The Fighter chooses a weapon. | The Fighter carries the sword (1d8). The Wizard prepares *Sleep*. |

In stage 7 the map also holds four rooms from the module that the game does not play: Vane's passage, the Lampwright's study (C7), the Lamp Hall (C4) and the Ward Room (C6). The secret door on the C1 landing is the module's own.

## Odds, for planning a demo

From 300 seeds each, stage 5, playing straight to the rats:

| Hero | Reaches C3 | Dies | Torch dies first |
|------|-----------|------|------------------|
| Fighter | 70% | 14% | 16% |
| Wizard who casts *Sleep* | 38% | 2% | 61% |
| Wizard who does not | 2% | 47% | 51% |

The Wizard opens the stuck door on a 1 in 6, so the torch often dies at the door. That is the module's lesson too: send the Fighter to the door. For a sure demo, use the seeds in `test_vectors/`.
