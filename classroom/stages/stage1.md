# Stage 1: The Character Sheet

| | |
|---|---|
| **What this teaches** | Variables, types, arithmetic and formatted output: a program that prints the Wizard's sheet. |
| **Files** | `python/stage1_character_sheet.py` and `cpp/stage1_character_sheet.cpp` |
| **Book chapter** | C++: Gaddis, *Starting Out with C++*, Ch. 2 (Introduction to C++) and Ch. 3 (Expressions and Interactivity). Python: variables, types, expressions, f-strings. |
| **New ideas** | `int`, `double`/`float`, `string`/`str`; `=` gives a value; `+ - * /`; integer division; padding and sign in output. |

The toolbox at the top of every file (dice and input) is used, not read, in this stage. Students call `roll(6)` the way they call `print` or `pow`. Stage 4 opens the box.

## PRIMM

**Predict.** Do not run it yet. Seed `42`, name `Mira`.

1. What number appears in the brackets on the Armor class line?
2. What does the Attack bonus line show, sign and all?
3. Look at the table "Dice after `seed_dice("42")`" in `RNG.md`. What will the Gold line say?

<details><summary>Answers</summary>

1. `[10]`, because `19 - 9` is 10.
2. `-1`. THAC0 19 is +0, and STR 8 gives -1.
3. `Gold:          (1 + 5 + 1) x 10 = 70 gp`. The first three d6 rolls for seed 42 are 1, 5, 1.

</details>

**Run.** `python3 stage1_character_sheet.py`, then the C++ build. Type the same seed and name in both. Compare every line.

**Investigate.**

1. Find `dagger_average = (1 + dagger_sides) / 2` in Python and `(1 + dagger_sides) / 2.0` in C++. Change the C++ `2.0` to `2`. What prints now, and why?
2. Find `{attack_bonus:+d}` and `showpos << attack_bonus << noshowpos`. Remove `noshowpos`. Which later numbers change, and why?
3. Find `light_hours = light_turns * 10 / 60`. Is `light_hours` an int or a float? How can you tell from the output?

**Modify.**

1. Make the sheet print the Fighter instead: HP 8, AC 4, STR 14 (modifier +1), INT 9, WIS 10, DEX 11, CON 13, CHA 10, sword 1d8. Change only the variables at the top, plus the weapon and spell words.
2. Give the hero 5 torches. Check that the Light line still adds up.

**Make.** Add a line for encumbrance. In B/X, 10 coins weigh one pound. Print the gold's weight with one digit after the point, and make it work for any gold amount. Then add something of your own to the sheet, with its own variable.

## Test vectors

Feed a vector to the program with `ECHO_INPUT=1` so the typed answers show:

```
ECHO_INPUT=1 python3 python/stage1_character_sheet.py < test_vectors/stage1_mira.in
```

<!-- TEST VECTORS -->

### eof

Input, one line per prompt (`test_vectors/stage1_eof.in`). The first line is the seed:

```text
7
```

Expected output, 3 lines (`test_vectors/stage1_eof.out`):

```text
Seed? 7
Name your wizard: 
(No more input. You put out your torch and row home.)
```

### long name

Input, one line per prompt (`test_vectors/stage1_long_name.in`). The first line is the seed:

```text
2026
Ostrel's last apprentice
```

Expected output, 19 lines (`test_vectors/stage1_long_name.out`):

```text
Seed? 2026
Name your wizard: Ostrel's last apprentice

THE FIRST DELVE - Stage 1: the character sheet
==============================================
Name:          Ostrel's last apprentice
Class:         Magic-User, level 1
Hit points:    4
Armor class:   9 [10]
Attack bonus:  -1
STR  8   INT 15   WIS 12
DEX 11   CON 10   CHA  9
Weapon:        dagger, 1d4, average 2.5
Spell:         Sleep, once a day
Light:         3 torches x 6 turns = 18 turns = 3.0 hours
Gold:          (2 + 1 + 1) x 10 = 40 gp
Fate points:   3
==============================================
Captain Maren waits at the docks. The boat leaves at noon.
```

### mira

Input, one line per prompt (`test_vectors/stage1_mira.in`). The first line is the seed:

```text
42
Mira
```

Expected output, 19 lines (`test_vectors/stage1_mira.out`):

```text
Seed? 42
Name your wizard: Mira

THE FIRST DELVE - Stage 1: the character sheet
==============================================
Name:          Mira
Class:         Magic-User, level 1
Hit points:    4
Armor class:   9 [10]
Attack bonus:  -1
STR  8   INT 15   WIS 12
DEX 11   CON 10   CHA  9
Weapon:        dagger, 1d4, average 2.5
Spell:         Sleep, once a day
Light:         3 torches x 6 turns = 18 turns = 3.0 hours
Gold:          (1 + 5 + 1) x 10 = 70 gp
Fate points:   3
==============================================
Captain Maren waits at the docks. The boat leaves at noon.
```

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| C++ | `(1 + 4) / 2` | Prints `2`. Both sides are `int`, so C++ throws away the .5. | Make one side a `double`: `/ 2.0`. |
| Python | `(1 + 4) // 2` when you meant `/` | Prints `2`. `//` is floor division. | Use `/` for a true division. |
| C++ | `int dagger_average = 2.5;` | Stores 2. A whole-number box cannot hold .5. | Use `double`. |
| C++ | Forgetting `noshowpos` | Every number after it gets a `+`: the stats print as `STR +8   INT +15`. | Turn it off right after use. |
| C++ | `cout << setw(2) << a << b;` and expecting both padded | `setw` only lasts for the next item. | Put `setw` before each item. |
| C++ | Using a variable before you give it a value | Garbage output. C++ does not set it for you. | Give every variable a value where you declare it. |
| Python | `print("Gold: " + gold)` | `TypeError`: you cannot add text and a number. | Use an f-string: `f"Gold: {gold}"`. |
| Both | A typo in a variable name | Python: `NameError` when that line runs. C++: a compile error before anything runs. | Read the error message: it names the line. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| Comment | `# text` | `// text` |
| Whole number | `level = 1` | `int level = 1;` |
| Decimal number | `x = 2.5` (a `float`) | `double x = 2.5;` |
| Text | `name = "Mira"` | `string name = "Mira";` (needs `<string>`) |
| Type of a variable | Fixed by the value, can change later | Fixed when declared, never changes |
| Division | `5 / 2` is `2.5`; `5 // 2` is `2` | `5 / 2` is `2`; `5 / 2.0` is `2.5` |
| Print a line | `print("Hit points:", hp)` | `cout << "Hit points: " << hp << endl;` |
| Pad to 2 places | `f"{x:2}"` | `setw(2) << x` (needs `<iomanip>`) |
| Always show the sign | `f"{x:+d}"` | `showpos << x << noshowpos` |
| One digit after the point | `f"{x:.1f}"` | `fixed << setprecision(1) << x` |
| Read a line of text | `input("Name? ")` | `getline(cin, name);` |
| Where the program starts | The top of the file. Our last line calls `main()`. | `int main()`, always. |
