# Stage 6: Rooms as Data

| | |
|---|---|
| **What this teaches** | Records: each room is a `struct` / `dataclass`, the map is a list of rooms with exits, and one function, `turn()`, runs one exploration turn. |
| **Files** | `python/stage6_rooms_as_data.py` and `cpp/stage6_rooms_as_data.cpp` |
| **Book chapter** | C++: Gaddis Ch. 11 (Structured Data) and Ch. 13 (Introduction to Classes); `vector` from Ch. 7. Python: classes as records (`@dataclass`), lists of objects. |
| **New ideas** | A record type with named fields; a list of records; a record that holds records (`Game` holds `Hero` and the rooms); the map as data, not as code; the game loop as `while not over: turn()`. |

Stages 1 to 5 walked the rooms in a fixed order written into the code. Now the rooms are data. Each `Room` lists its `exits`, and the program offers whatever exits are open. Add a room to the list and the game can go there; no new `if` is needed.

**The Turn Is a Procedure.** Module 2 writes the exploration turn in Logo. `turn()` follows it line by line:

```logo
TO TURN
  PLAN                                  ; talk, look, ask: no dice, no time
  EXECUTE                               ; the caller says it; one action each
  MAKE "CLOCK :CLOCK + 1                ; tick a box: ten minutes pass
  BURN 1                                ; every lit torch and lantern loses a turn
  IF 0 = REMAINDER :CLOCK 2 [WANDER]    ; d6, and on a 1 something comes
  IF 0 = REMAINDER :CLOCK 6 [REST]      ; rest now, or -1 to hit and damage
  IF FIGHTING? [ROUNDS]                 ; a fight runs in rounds, then counts as this turn
  IF BELOW? [TURN]                      ; do it again until the party climbs out
END
```

| Logo | Python / C++ |
|------|--------------|
| `PLAN` | `plan(game)`: prints the room, the clock and the choices. Free. |
| `EXECUTE` | `execute(game, choices, answer)`: does one action and returns the turns it used (0 or 1). A fight runs its `ROUNDS` in here and counts as one turn. |
| `MAKE "CLOCK :CLOCK + 1` | `game.turn = game.turn + 1` |
| `BURN 1` | `game.torch = game.torch - 1` |
| `IF 0 = REMAINDER :CLOCK 2 [WANDER]` | `if game.turn % 2 == 0: wander(game)` |
| `IF 0 = REMAINDER :CLOCK 6 [REST]` | Left out: one torch dies by turn 6. A Make challenge. |
| `IF BELOW? [TURN]` | Logo calls `TURN` again (recursion). `main()` uses `while not game.over: turn(game)` instead. Same effect. |

Looking and walking from room to room are free in this program; searching, climbing, forcing and fighting each take a turn.

## PRIMM

**Predict.** Seed `7`. Inputs: `2` (Fighter), `1`, `2`, `1`, `s`, `3`, `l`, `f`, `2`, then `1` five times, then `2`.

1. Using the `exits` lists in `make_rooms()`, which room is the hero in after `1`, `2`, `1`?
2. Why does `3` mean "Go to C1" after the search, when C1 was not in the menu before?
3. How many times does the clock tick in the whole run?

<details><summary>Answers</summary>

1. `1` goes S1 to S2. `2` goes S2 to S3 (the second open exit of S2). `1` goes back to S2.
2. Searching sets `rooms[STAIR].is_open` to true, so `plan()` now lists it as the third open exit.
3. Three times: the search, the forcing (it opens first try with this seed), and the fight. Listening and walking are free.

</details>

**Run.** Same seed and inputs in both languages. Then wander: go back and forth, climb the stair, run from the rats and come back.

**Investigate.**

1. Find `class Room` / `struct Room`. Which field changes during play, and where?
2. Find `turn(game)` in `main()` and `def turn(game)` / `void turn(Game& game)`. In C++, remove the `&`. What happens to the clock? Why does Python not have this problem?
3. Find `choices.append(to)` (C++: `choices.push_back(to)`). Why does `plan()` build a new list instead of printing `exits` straight away?

**Modify.**

1. Make the cottage's description mention the tin of oil in a new field, `item`, and print it on the first visit.
2. Add an exit from S3 straight to S1 (a path behind the cottage). Change only data, not code.

**Make.** Add the module's S4 (the lamp-stones on the east shore) or S5 (the north cliff over the grotto) as a new room with its own action. Or write `rest(game)` for the `REST` line of the procedure.

## Test vectors

<!-- TEST VECTORS -->

### eof

Input, one line per prompt (`test_vectors/stage6_eof.in`). The first line is the seed:

```text
3
2
1
c
```

<details><summary>Expected output, 37 lines (`test_vectors/stage6_eof.out`)</summary>

```text
Seed? 3

THE FIRST DELVE - Stage 6: rooms as data
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 2
You are the Fighter. Captain Maren rows you to the Isle of Old
Stone at sunset. You light a torch. It will burn 6 turns.

S1. The Broken Jetty
Half the jetty lies in the lake. A rope burn on a post is fresh:
someone else lands here. Out past the end, a long shadow moves
under the water, and is gone.
[S1] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S2 The Tower Shell
What do you do? 1

S2. The Tower Shell
A round shell of stone, thirty feet across, open to the sky.
Rubble covers the floor. A stair climbs the wall to a broken top.
Crows watch you with the calm of tax collectors.
[S2] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? c
From the top: the whole island, and a boat-shaped shadow at the
north cliff.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? 
(No more input. You put out your torch and row home.)
```

</details>

### fighter full

Input, one line per prompt (`test_vectors/stage6_fighter_full.in`). The first line is the seed:

```text
7
2
1
2
1
s
3
l
f
2
1
1
1
1
1
2
```

<details><summary>Expected output, 126 lines (`test_vectors/stage6_fighter_full.out`)</summary>

```text
Seed? 7

THE FIRST DELVE - Stage 6: rooms as data
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 2
You are the Fighter. Captain Maren rows you to the Isle of Old
Stone at sunset. You light a torch. It will burn 6 turns.

S1. The Broken Jetty
Half the jetty lies in the lake. A rope burn on a post is fresh:
someone else lands here. Out past the end, a long shadow moves
under the water, and is gone.
[S1] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S2 The Tower Shell
What do you do? 1

S2. The Tower Shell
A round shell of stone, thirty feet across, open to the sky.
Rubble covers the floor. A stair climbs the wall to a broken top.
Crows watch you with the calm of tax collectors.
[S2] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? 2

S3. The Keeper's Cottage
No roof. Ash in the hearth, less than a week old. A tin of lamp
oil. On the door, a chalked eye with a line through it.
[S3] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S2 The Tower Shell
What do you do? 1

S2. The Tower Shell
[S2] Turn 0. Torch: 6 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
What do you do? l
Listen: d6 = 5, need 1 or less: no.
You hear only water, dripping somewhere.
[C1] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
What do you do? f
Force: d6 = 3, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 3, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
What do you do? 2

C2. The Oil Store
Racks of broken oil jars. The floor is tacky. Five giant rats,
each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 11, total 12 vs AC 12: hit.
You deal 9 damage.
Rat 1 dies.
Rat 2 bites. d20 = 9, total 9 vs AC 15: miss.
Rat 3 bites. d20 = 10, total 10 vs AC 15: miss.
You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 8, total 9 vs AC 12: miss.
Rat 2 bites. d20 = 14, total 14 vs AC 15: miss.
Rat 3 bites. d20 = 9, total 9 vs AC 15: miss.
You: 8 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 4, total 5 vs AC 12: miss.
Rat 2 bites. d20 = 4, total 4 vs AC 15: miss.
Rat 3 bites. d20 = 15, total 15 vs AC 15: hit.
You lose 2 hp.
You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 6, total 7 vs AC 12: miss.
Rat 2 bites. d20 = 6, total 6 vs AC 15: miss.
Rat 3 bites. d20 = 7, total 7 vs AC 15: miss.
You: 6 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 15, total 16 vs AC 12: hit.
You deal 7 damage.
Rat 2 dies.
The pack breaks. The rest flee down the far stair.
In one rack, five flasks of oil are still whole. You take them.
Ten minutes pass.
[C2] Turn 3. Torch: 3 of 6. HP: 6.
  1. Go to C1 The Cellar Stair
  2. Go to C3 The Flooded Stair
What do you do? 2

C3. The Flooded Stair
A second stair goes down into black water. As you watch, the
water climbs one step, as if the lake took a breath.

WHAT YOU LEARNED
- Light is time. The torch is a clock you can see.
- Searching finds things, and it costs a turn.
- Listen before you open a door. Forcing it makes noise.
- Every second turn, the dungeon rolls against you.
- Monsters run when the fight turns against them.
The first delve ends here, on turn 3. END OF STAGE 6.
```

</details>

### wizard sleep

Input, one line per prompt (`test_vectors/stage6_wizard_sleep.in`). The first line is the seed:

```text
5
1
1
s
3
f
2
3
1
1
2
```

<details><summary>Expected output, 85 lines (`test_vectors/stage6_wizard_sleep.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 6: rooms as data
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 1
You are the Wizard. Captain Maren rows you to the Isle of Old
Stone at sunset. You light a torch. It will burn 6 turns.

S1. The Broken Jetty
Half the jetty lies in the lake. A rope burn on a post is fresh:
someone else lands here. Out past the end, a long shadow moves
under the water, and is gone.
[S1] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S2 The Tower Shell
What do you do? 1

S2. The Tower Shell
A round shell of stone, thirty feet across, open to the sky.
Rubble covers the floor. A stair climbs the wall to a broken top.
Crows watch you with the calm of tax collectors.
[S2] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
What do you do? f
Force: d6 = 1, need 1 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 2, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
What do you do? 2

C2. The Oil Store
Racks of broken oil jars. The floor is tacky. Five giant rats,
each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
You: 4 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run, 3 cast Sleep: 3
You speak the word of Sleep. 2d8 = 13.
You: 4 hp. Rats: z z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. It is asleep. One blow kills it.
You: 4 hp. Rats: x z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. It is asleep. One blow kills it.
The pack breaks. The rest flee down the far stair.
In one rack, five flasks of oil are still whole. You take them.
Ten minutes pass.
[C2] Turn 3. Torch: 3 of 6. HP: 4.
  1. Go to C1 The Cellar Stair
  2. Go to C3 The Flooded Stair
What do you do? 2

C3. The Flooded Stair
A second stair goes down into black water. As you watch, the
water climbs one step, as if the lake took a breath.

WHAT YOU LEARNED
- Light is time. The torch is a clock you can see.
- Searching finds things, and it costs a turn.
- Listen before you open a door. Forcing it makes noise.
- Every second turn, the dungeon rolls against you.
- Monsters run when the fight turns against them.
The first delve ends here, on turn 3. END OF STAGE 6.
```

</details>

### wizard sleep retreat

Input, one line per prompt (`test_vectors/stage6_wizard_sleep_retreat.in`). The first line is the seed:

```text
5
1
1
s
3
f
2
3
2
2
1
1
```

<details><summary>Expected output, 86 lines (`test_vectors/stage6_wizard_sleep_retreat.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 6: rooms as data
  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell
  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1
Pick 1 or 2: 1
You are the Wizard. Captain Maren rows you to the Isle of Old
Stone at sunset. You light a torch. It will burn 6 turns.

S1. The Broken Jetty
Half the jetty lies in the lake. A rope burn on a post is fresh:
someone else lands here. Out past the end, a long shadow moves
under the water, and is gone.
[S1] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S2 The Tower Shell
What do you do? 1

S2. The Tower Shell
A round shell of stone, thirty feet across, open to the sky.
Rubble covers the floor. A stair climbs the wall to a broken top.
Crows watch you with the calm of tax collectors.
[S2] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
What do you do? f
Force: d6 = 1, need 1 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 2, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
What do you do? 2

C2. The Oil Store
Racks of broken oil jars. The floor is tacky. Five giant rats,
each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
You: 4 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run, 3 cast Sleep: 3
You speak the word of Sleep. 2d8 = 13.
You: 4 hp. Rats: z z z z z   (x dead, z asleep)
1 fight, 2 run: 2
You back up the stair. The rats do not follow.
Ten minutes pass.
[C1] Turn 3. Torch: 3 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
What do you do? 2

C2. The Oil Store
You hold the doorway. Only two rats can reach you at a time.
You: 4 hp. Rats: z z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. It is asleep. One blow kills it.
You: 4 hp. Rats: x z z z z   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. It is asleep. One blow kills it.
The pack breaks. The rest flee down the far stair.
In one rack, five flasks of oil are still whole. You take them.
Ten minutes pass.
Wandering check: d6 = 4, need 1 or less: no.
[C2] Turn 4. Torch: 2 of 6. HP: 4.
  1. Go to C1 The Cellar Stair
  2. Go to C3 The Flooded Stair
What do you do? 
(No more input. You put out your torch and row home.)
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| C++ | `void turn(Game game)` without `&` | The function changes a copy. In `main`, the game never moves on. | `Game& game` |
| C++ | `Room room = game.rooms[i]; room.visited = true;` | Changes a copy; the real room stays unvisited. | `Room& room = game.rooms[i];` |
| Python | Expecting `room = game.rooms[i]` to be a copy | It is the same object. Changing `room` changes the map. | That is what we want here. Use `copy.copy()` if you need a copy. |
| C++ | Forgetting the `;` after `struct Room { ... }` | A confusing compile error on the next line. | `};` |
| Both | Fields given in the wrong order when building a record | The name goes into the key, the text into the name. | Match the field order, or in Python use keywords: `Room(key="S1", ...)`. |
| Both | Exits that do not go both ways | You can walk into a room and not back out. | When you add `A -> B`, add `B -> A` too. |
| Both | Testing the room by its name text: `room.name == "The Oil Store"` | One typo and the test is never true. | Test by index constant: `game.here == STORE`. |
| C++ | `for (int i = 0; i < rooms.size(); i++)` | `-Wall` warns: signed and unsigned compared. | `for (size_t i = 0; ...)` or a range `for (Room& r : rooms)`. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| A record type | `@dataclass` `class Room:` with `key: str` ... | `struct Room { string key; ... };` |
| Make one | `Room("S1", "The Broken Jetty", ...)` | `Room r = {"S1", "The Broken Jetty", ...};` |
| Read or set a field | `room.visited = True` | `room.visited = true;` |
| A list of records | `rooms = [Room(...), Room(...)]` | `vector<Room> rooms = {{...}, {...}};` (needs `<vector>`) |
| Add to the end | `choices.append(to)` | `choices.push_back(to);` |
| Loop over items | `for to in room.exits:` | `for (int to : room.exits)` |
| Pass a record to a function so it can change it | Just pass it: `turn(game)` (Python passes the object itself) | Pass by reference: `void turn(Game& game)` |
| A second name for the same thing | `rats = game.rat_hp` | `vector<int>& rats = game.rat_hp;` |
