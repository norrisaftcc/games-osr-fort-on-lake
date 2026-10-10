# Stage 7: The Shortest Way (stretch)

| | |
|---|---|
| **What this teaches** | Breadth-first search (BFS): "what is the shortest way back to the jetty?", and how a secret door, once found, makes the answer shorter. |
| **Files** | `python/stage7_shortest_way.py` and `cpp/stage7_shortest_way.cpp` |
| **Book chapter** | C++: Gaddis Ch. 8 (Searching and Sorting Arrays) for the idea of a search, and Ch. 18 (Stacks and Queues) for the queue. BFS itself is beyond the book. Python: `collections.deque`, graph search. |
| **New ideas** | A graph (rooms are nodes, exits are edges); a queue (first in, first out); BFS; a `came_from` list that lets you rebuild the path backward. |

This is the "no ceiling" stage. It needs nothing new from the game rules, only a new question.

**The map** (Module 2's own). The game still plays S1 to C3. But the map now holds four more rooms from the module: Vane's passage (VP), the Lampwright's study (C7), the Lamp Hall (C4) and the Ward Room (C6). The long way from the study back to the jetty runs C7, C6, C4, C2, C1, S2, S1. The module hides a **secret door** in the east wall of the C1 landing; it opens on Vane's passage, which runs straight to the study. Searching the landing takes a turn and finds it on a 1 in 6 (elves 2 in 6). Found, it closes the map into a loop and cuts the trip from 6 moves to 4.

```
 S1 -- S2 -- S3            C1 --(secret)-- VP -- C7
       |                   |                     |
       C1 -- C2 -- C3      C2 -- C4 -- C6 -------+
```

**How BFS works**, in one breath: put the start in a queue. Take the front room out. Put every neighbour you have not seen yet at the back, and write down which room you came from. Repeat until the queue is empty. Rooms come out of the queue in rings: all rooms 1 step away, then all rooms 2 steps away, and so on. So the first time you reach a room, you reached it by a shortest path. Follow `came_from` back from the goal to read the path.

## PRIMM

**Predict.** Do this one on paper first, with the map above.

1. From C3, what is the shortest way to S1? How many moves?
2. From C7, what is the shortest way to S1 if nobody has found the secret door? And if they have?
3. BFS starts at C7 and the secret door is found. In what order do rooms come out of the queue? (Use the `exits` lists in `make_rooms()`: they set the order.)

<details><summary>Answers</summary>

1. C3 -> C2 -> C1 -> S2 -> S1, 4 moves. The secret door does not help from here.
2. Without: C7 -> C6 -> C4 -> C2 -> C1 -> S2 -> S1 (6 moves). With: C7 -> VP -> C1 -> S2 -> S1 (4 moves).
3. C7, VP, C6, C1, C4, S2, C2, S1, S3, C3. (C7's exits are VP then C6; VP adds C1; C6 adds C4; C1 adds S2; C4 adds C2; S2 adds S1 and S3; C2 adds C3.)

</details>

**Run.** Seed `623` with the inputs of the `stage7_finds_secret_door` vector below. Press `m` in different rooms to ask the map.

**Investigate.**

1. Find `queue.popleft()` (C++: `waiting.front()` then `waiting.pop()`). Change it to take from the back: `queue.pop()` in Python. Is the path still the shortest? Try it from C7 with the door found. (This turns BFS into a depth-first search.)
2. Find `seen[nxt] = True` (C++: `seen[next] = true`). What would happen without the `seen` list on a map with a loop?
3. Find `path.insert(0, r)`. Why does the path come out backward first?

**Modify.**

1. Print the queue each time a room comes out of it, so the class can watch the rings.
2. Let `m` also say how many turns of torch the way home costs, if each move took a turn.

**Make.** Give every exit a length in feet (the module gives them: the passage is 50', C2 to C4 is 30'), and find the shortest way by distance, not by count of moves. BFS is no longer enough; look up Dijkstra's algorithm. Or: write a generator that builds a random tower map and uses BFS to check that every room can be reached, as the module's dungeon generator does.

## Test vectors

<!-- TEST VECTORS -->

### eof

Input, one line per prompt (`test_vectors/stage7_eof.in`). The first line is the seed:

```text
12
1
m
1
m
```

<details><summary>Expected output, 43 lines (`test_vectors/stage7_eof.out`)</summary>

```text
Seed? 12

THE FIRST DELVE - Stage 7: the shortest way
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
  m. Ask your map: the shortest way to the jetty
What do you do? m
Shortest way to the jetty: S1 (0 moves)
[S1] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  m. Ask your map: the shortest way to the jetty
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
  m. Ask your map: the shortest way to the jetty
What do you do? m
Shortest way to the jetty: S2 -> S1 (1 move)
[S2] Turn 0. Torch: 6 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  s. Search the rubble (1 turn)
  c. Climb the stair (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? 
(No more input. You put out your torch and row home.)
```

</details>

### finds secret door

Input, one line per prompt (`test_vectors/stage7_finds_secret_door.in`). The first line is the seed:

```text
623
2
1
s
3
f
s
3
2
m
1
1
2
1
1
1
1
1
1
2
```

<details><summary>Expected output, 174 lines (`test_vectors/stage7_finds_secret_door.out`)</summary>

```text
Seed? 623

THE FIRST DELVE - Stage 7: the shortest way
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
  m. Ask your map: the shortest way to the jetty
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
  m. Ask your map: the shortest way to the jetty
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? f
Force: d6 = 3, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 3, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? s
You search the landing: d6 = 1, need 1 or less: yes.
A stone panel in the east wall turns on an iron pin.
A secret door! A dark passage runs east.
Ten minutes pass.
[C1] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
  3. Go to VP Vane's Passage
  m. Ask your map: the shortest way to the jetty
What do you do? 3

VP. Vane's Passage
A narrow passage, dry and dark, runs fifty feet east to a
plain door.
[VP] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to C1 The Cellar Stair
  2. Go to C7 The Lampwright's Study
  m. Ask your map: the shortest way to the jetty
What do you do? 2

C7. The Lampwright's Study
A square, dry room that smells of paper. At the desk sits a man
in a quilted robe, long since bones, his skull on his folded
arms. His notes are for Module 2. The north door is locked.
[C7] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to VP Vane's Passage
  m. Ask your map: the shortest way to the jetty
What do you do? m
Shortest way to the jetty: C7 -> VP -> C1 -> S2 -> S1 (4 moves)
[C7] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to VP Vane's Passage
  m. Ask your map: the shortest way to the jetty
What do you do? 1

VP. Vane's Passage
[VP] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to C1 The Cellar Stair
  2. Go to C7 The Lampwright's Study
  m. Ask your map: the shortest way to the jetty
What do you do? 1

C1. The Cellar Stair
[C1] Turn 3. Torch: 3 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
  3. Go to VP Vane's Passage
  m. Ask your map: the shortest way to the jetty
What do you do? 2

C2. The Oil Store
Racks of broken oil jars. The floor is tacky. Five giant rats,
each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 11, total 12 vs AC 12: hit.
You deal 2 damage.
Rat 1 dies.
Rat 2 bites. d20 = 14, total 14 vs AC 15: miss.
Rat 3 bites. d20 = 16, total 16 vs AC 15: hit.
You lose 3 hp.
You: 5 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 1, total 2 vs AC 12: miss.
Rat 2 bites. d20 = 5, total 5 vs AC 15: miss.
Rat 3 bites. d20 = 9, total 9 vs AC 15: miss.
You: 5 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 10, total 11 vs AC 12: miss.
Rat 2 bites. d20 = 3, total 3 vs AC 15: miss.
Rat 3 bites. d20 = 10, total 10 vs AC 15: miss.
You: 5 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 4, total 5 vs AC 12: miss.
Rat 2 bites. d20 = 3, total 3 vs AC 15: miss.
Rat 3 bites. d20 = 20, total 20 vs AC 15: hit.
You lose 2 hp.
You: 3 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 6, total 7 vs AC 12: miss.
Rat 2 bites. d20 = 5, total 5 vs AC 15: miss.
Rat 3 bites. d20 = 5, total 5 vs AC 15: miss.
You: 3 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 17, total 18 vs AC 12: hit.
You deal 9 damage.
Rat 2 dies.
The pack breaks. The rest flee down the far stair.
In one rack, five flasks of oil are still whole. You take them.
Ten minutes pass.
Wandering check: d6 = 6, need 1 or less: no.
[C2] Turn 4. Torch: 2 of 6. HP: 3.
  1. Go to C1 The Cellar Stair
  2. Go to C3 The Flooded Stair
  m. Ask your map: the shortest way to the jetty
What do you do? 2

C3. The Flooded Stair
A second stair goes down into black water. As you watch, the
water climbs one step, as if the lake took a breath.
The water climbs another step. Time to think about the way home.
From here:              C3 -> C2 -> C1 -> S2 -> S1 (4 moves)
Module 2's map goes on. From the study, C7, deep in the cellars:
  the long way:         C7 -> C6 -> C4 -> C2 -> C1 -> S2 -> S1 (6 moves)
  by the secret door:   C7 -> VP -> C1 -> S2 -> S1 (4 moves)
You found the secret door on the C1 landing.

WHAT YOU LEARNED
- Light is time. The torch is a clock you can see.
- Searching finds things, and it costs a turn.
- Listen before you open a door. Forcing it makes noise.
- Every second turn, the dungeon rolls against you.
- Monsters run when the fight turns against them.
- A secret door can turn a long way home into a short one.
The first delve ends here, on turn 4. END OF STAGE 7.
```

</details>

### misses secret door

Input, one line per prompt (`test_vectors/stage7_misses_secret_door.in`). The first line is the seed:

```text
64
2
1
s
3
m
f
2
1
1
1
1
1
1
2
```

<details><summary>Expected output, 132 lines (`test_vectors/stage7_misses_secret_door.out`)</summary>

```text
Seed? 64

THE FIRST DELVE - Stage 7: the shortest way
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
  m. Ask your map: the shortest way to the jetty
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
  m. Ask your map: the shortest way to the jetty
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? m
Shortest way to the jetty: C1 -> S2 -> S1 (2 moves)
[C1] Turn 1. Torch: 5 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? f
Force: d6 = 1, need 3 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 4, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 8.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? 2

C2. The Oil Store
Racks of broken oil jars. The floor is tacky. Five giant rats,
each the size of a cat, lift their heads from the spill.
You hold the doorway. Only two rats can reach you at a time.
You: 8 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 10, total 11 vs AC 12: miss.
Rat 1 bites. d20 = 1, total 1 vs AC 15: miss.
Rat 2 bites. d20 = 19, total 19 vs AC 15: hit.
You lose 1 hp.
You: 7 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 6, total 7 vs AC 12: miss.
Rat 1 bites. d20 = 4, total 4 vs AC 15: miss.
Rat 2 bites. d20 = 9, total 9 vs AC 15: miss.
You: 7 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 9, total 10 vs AC 12: miss.
Rat 1 bites. d20 = 13, total 13 vs AC 15: miss.
Rat 2 bites. d20 = 13, total 13 vs AC 15: miss.
You: 7 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 9, total 10 vs AC 12: miss.
Rat 1 bites. d20 = 4, total 4 vs AC 15: miss.
Rat 2 bites. d20 = 10, total 10 vs AC 15: miss.
You: 7 hp. Rats: 2 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 1. d20 = 19, total 20 vs AC 12: hit.
You deal 4 damage.
Rat 1 dies.
Rat 2 bites. d20 = 13, total 13 vs AC 15: miss.
Rat 3 bites. d20 = 2, total 2 vs AC 15: miss.
You: 7 hp. Rats: x 3 1 4 2   (x dead, z asleep)
1 fight, 2 run: 1
You strike at rat 2. d20 = 17, total 18 vs AC 12: hit.
You deal 6 damage.
Rat 2 dies.
The pack breaks. The rest flee down the far stair.
In one rack, five flasks of oil are still whole. You take them.
Ten minutes pass.
[C2] Turn 3. Torch: 3 of 6. HP: 7.
  1. Go to C1 The Cellar Stair
  2. Go to C3 The Flooded Stair
  m. Ask your map: the shortest way to the jetty
What do you do? 2

C3. The Flooded Stair
A second stair goes down into black water. As you watch, the
water climbs one step, as if the lake took a breath.
The water climbs another step. Time to think about the way home.
From here:              C3 -> C2 -> C1 -> S2 -> S1 (4 moves)
Module 2's map goes on. From the study, C7, deep in the cellars:
  the long way:         C7 -> C6 -> C4 -> C2 -> C1 -> S2 -> S1 (6 moves)
  by the secret door:   C7 -> VP -> C1 -> S2 -> S1 (4 moves)
You never found the secret door. It is in the C1 landing's east wall.

WHAT YOU LEARNED
- Light is time. The torch is a clock you can see.
- Searching finds things, and it costs a turn.
- Listen before you open a door. Forcing it makes noise.
- Every second turn, the dungeon rolls against you.
- Monsters run when the fight turns against them.
- A secret door can turn a long way home into a short one.
The first delve ends here, on turn 3. END OF STAGE 7.
```

</details>

### wizard sleep retreat

Input, one line per prompt (`test_vectors/stage7_wizard_sleep_retreat.in`). The first line is the seed:

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

<details><summary>Expected output, 96 lines (`test_vectors/stage7_wizard_sleep_retreat.out`)</summary>

```text
Seed? 5

THE FIRST DELVE - Stage 7: the shortest way
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
  m. Ask your map: the shortest way to the jetty
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
  m. Ask your map: the shortest way to the jetty
What do you do? s
You shift stones for ten minutes. Under them lies a trapdoor.
Ten minutes pass.
[S2] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S1 The Broken Jetty
  2. Go to S3 The Keeper's Cottage
  3. Go to C1 The Cellar Stair
  c. Climb the stair (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? 3

C1. The Cellar Stair
A stone stair goes down twenty feet to an oak door, swollen in
its frame. It is stuck.
[C1] Turn 1. Torch: 5 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  l. Listen at the door
  f. Force the door (1 turn)
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
What do you do? f
Force: d6 = 1, need 1 or less: yes.
The door bursts open with a crack like a dropped plank.
Ten minutes pass.
Wandering check: d6 = 2, need 1 or less: no.
[C1] Turn 2. Torch: 4 of 6. HP: 4.
  1. Go to S2 The Tower Shell
  2. Go to C2 The Oil Store
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
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
  s. Search the landing (1 turn)
  m. Ask your map: the shortest way to the jetty
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
  m. Ask your map: the shortest way to the jetty
What do you do? 
(No more input. You put out your torch and row home.)
```

</details>

<!-- END TEST VECTORS -->

## Common mistakes

| Language | Mistake | What happens | Fix |
|----------|---------|--------------|-----|
| Both | Marking a room seen when it comes *out* of the queue, not when it goes *in* | The same room joins the queue many times. Still correct, but slow on big maps. | Mark it as you add it. |
| Both | No `seen` list | On a map with a loop, the search never ends. | Keep `seen`. |
| Python | Using a plain list and `pop(0)` | Works, but each `pop(0)` moves every item. Slow on big maps. | `collections.deque` and `popleft()`. |
| Python | `queue.pop()` on a deque | Takes from the back: that is a stack, and the search goes deep, not wide. | `popleft()` |
| C++ | `waiting.pop()` expecting it to return the room | `pop()` returns nothing. | Read `front()` first, then `pop()`. |
| Both | Following `came_from` from the start instead of the goal | You get only the start. | Begin at the goal and walk back to `-1`. |
| Both | Forgetting that the goal may be unreachable | Python: the path is just the goal. C++: the same. Both wrong. | Check `seen[goal]` first. |

## Python and C++ side by side

| Idea | Python | C++ |
|------|--------|-----|
| A queue | `from collections import deque`; `queue = deque([start])` | `#include <queue>`; `queue<int> waiting; waiting.push(start);` |
| Take from the front | `r = queue.popleft()` | `int r = waiting.front(); waiting.pop();` |
| Add to the back | `queue.append(nxt)` | `waiting.push(next);` |
| Is it empty? | `len(queue) > 0` | `!waiting.empty()` |
| A list of n copies | `[-1] * len(rooms)` | `vector<int> came_from(rooms.size(), -1);` |
| Insert at the front | `path.insert(0, r)` | `path.insert(path.begin(), r);` |
| Join text with a separator | `" -> ".join(keys)` | A loop that adds `" -> "` before every item but the first |
| Number to text | `f"{moves}"` | `to_string(moves)` |
