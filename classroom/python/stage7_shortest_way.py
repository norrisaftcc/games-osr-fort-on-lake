# The First Delve - Stage 7: The Shortest Way
# Teaches: breadth-first search (BFS) over a graph, a queue, and building
# a path backward from a trail of "came from" links.
# Run it:  python3 stage7_shortest_way.py

from collections import deque      # NEW: a queue you can add to and take from
from dataclasses import dataclass

import os
import sys

# ----- Toolbox: dice and input. Use it now; stage 4 explains how it works. -----
MASK = 0xFFFFFFFF  # keeps a number inside 32 bits, as C++ uint32_t does
dice_state = 0     # the dice machine's memory: one 32-bit number


def seed_dice(text):
    """Start the dice machine from the digits in text. Same seed, same rolls."""
    global dice_state
    dice_state = 0
    for ch in text:
        if "0" <= ch <= "9":
            dice_state = (dice_state * 10 + int(ch)) & MASK


def next_u32():
    """Mulberry32: one step of the dice machine. See RNG.md."""
    global dice_state
    dice_state = (dice_state + 0x6D2B79F5) & MASK
    t = dice_state
    t = ((t ^ (t >> 15)) * (t | 1)) & MASK
    t = (t ^ (t + (((t ^ (t >> 7)) * (t | 61)) & MASK))) & MASK
    return t ^ (t >> 14)


def roll(sides):
    """Roll one die with this many sides. The answer is 1 to sides."""
    return 1 + next_u32() % sides


def ask(prompt):
    """Show a prompt, read one line, and return it without spaces at the ends."""
    try:
        line = input(prompt)
    except EOFError:  # no more input: end cleanly, never loop forever
        print()
        print("(No more input. You put out your torch and row home.)")
        sys.exit(0)
    line = line.strip(" \t\r\n")
    if os.environ.get("ECHO_INPUT") == "1":
        print(line)  # show the answer, so a piped transcript reads like a session
    return line
# ----- End of toolbox. -----

JETTY = 0  # each room's place in the rooms list
TOWER = 1
COTTAGE = 2
STAIR = 3
STORE = 4
FLOODED = 5
PASSAGE = 6  # NEW: four more rooms from Module 2's map. Only the passage
STUDY = 7    # and the study can be walked in this game; the hall and
HALL = 8     # the ward room are past doors the demo does not open.
WARD = 9


@dataclass
class Room:  # one object holds every fact about one room
    key: str       # the map key, like "S2"
    name: str
    text: str      # read aloud on the first visit
    exits: list    # the indexes of the rooms you can walk to
    is_open: bool  # False until you find it or force your way in
    visited: bool
    secret: bool   # NEW: True if only a found secret door leads here


@dataclass
class Hero:
    name: str
    hp: int
    ac: int        # ascending AC
    str_mod: int
    die: int       # weapon damage die
    has_sleep: bool


@dataclass
class Game:  # an object can hold other objects and lists
    hero: Hero
    rooms: list
    here: int      # index of the room you stand in
    turn: int
    torch: int
    rat_hp: list
    rat_asleep: list   # kept here, so the rats stay asleep if you leave and come back
    rats_fled: bool
    over: bool


def make_rooms():
    return [  # The exits make the map. It now has a loop in it.
        Room("S1", "The Broken Jetty",
             "Half the jetty lies in the lake. A rope burn on a post is fresh:\n"
             "someone else lands here. Out past the end, a long shadow moves\n"
             "under the water, and is gone.", [TOWER], True, False, False),
        Room("S2", "The Tower Shell",
             "A round shell of stone, thirty feet across, open to the sky.\n"
             "Rubble covers the floor. A stair climbs the wall to a broken top.\n"
             "Crows watch you with the calm of tax collectors.",
             [JETTY, COTTAGE, STAIR], True, False, False),
        Room("S3", "The Keeper's Cottage",
             "No roof. Ash in the hearth, less than a week old. A tin of lamp\n"
             "oil. On the door, a chalked eye with a line through it.",
             [TOWER], True, False, False),
        Room("C1", "The Cellar Stair",
             "A stone stair goes down twenty feet to an oak door, swollen in\n"
             "its frame. It is stuck.", [TOWER, STORE, PASSAGE], False, False, False),
        Room("C2", "The Oil Store",
             "Racks of broken oil jars. The floor is tacky. Five giant rats,\n"
             "each the size of a cat, lift their heads from the spill.",
             [STAIR, FLOODED, HALL], False, False, False),
        Room("C3", "The Flooded Stair",
             "A second stair goes down into black water. As you watch, the\n"
             "water climbs one step, as if the lake took a breath.",
             [STORE], True, False, False),
        Room("VP", "Vane's Passage",  # NEW
             "A narrow passage, dry and dark, runs fifty feet east to a\n"
             "plain door.", [STAIR, STUDY], False, False, True),
        Room("C7", "The Lampwright's Study",  # NEW
             "A square, dry room that smells of paper. At the desk sits a man\n"
             "in a quilted robe, long since bones, his skull on his folded\n"
             "arms. His notes are for Module 2. The north door is locked.",
             [PASSAGE, WARD], True, False, False),
        Room("C4", "The Lamp Hall", "", [STORE, WARD], False, False, False),  # NEW
        Room("C6", "The Ward Room", "", [HALL, STUDY], False, False, False),  # NEW
    ]


def check(in_six):
    die = roll(6)
    word = "yes" if die <= in_six else "no"
    print(f"d6 = {die}, need {in_six} or less: {word}.")
    return die <= in_six


def attack(bonus, ac):
    die = roll(20)
    word = "hit" if die + bonus >= ac else "miss"
    print(f"d20 = {die}, total {die + bonus} vs AC {ac}: {word}.")
    return die + bonus >= ac


def fight_rats(game):
    """The C2 fight, as in stage 5. Returns "won", "ran" or "dead"."""
    hero = game.hero
    rats = game.rat_hp  # the same list as game.rat_hp, not a copy
    asleep = game.rat_asleep  # the same list too: Sleep lasts past a retreat
    print("You hold the doorway. Only two rats can reach you at a time.")
    while True:
        print(f"You: {hero.hp} hp. Rats:", end="")
        for i in range(len(rats)):
            if rats[i] <= 0:
                print(" x", end="")
            elif asleep[i]:
                print(" z", end="")
            else:
                print(f" {rats[i]}", end="")
        print("   (x dead, z asleep)")
        if hero.has_sleep:
            pick = ask("1 fight, 2 run, 3 cast Sleep: ")
        else:
            pick = ask("1 fight, 2 run: ")
        if pick == "2":
            print("You back up the stair. The rats do not follow.")
            return "ran"
        elif pick == "3" and hero.has_sleep:
            hero.has_sleep = False
            budget = roll(8) + roll(8)
            print(f"You speak the word of Sleep. 2d8 = {budget}.")
            for i in range(len(rats)):
                if rats[i] > 0 and budget > 0:
                    asleep[i] = True
                    budget = budget - 1
        else:
            target = 0
            while rats[target] <= 0:
                target = target + 1
            print(f"You strike at rat {target + 1}. ", end="")
            if asleep[target]:
                print("It is asleep. One blow kills it.")
                rats[target] = 0
            elif attack(hero.str_mod, 12):
                damage = max(1, roll(hero.die) + hero.str_mod)
                rats[target] = rats[target] - damage
                print(f"You deal {damage} damage.")
                if rats[target] <= 0:
                    print(f"Rat {target + 1} dies.")
        dead = 0
        for hp in rats:  # loop over the values themselves, not the indexes
            if hp <= 0:
                dead = dead + 1
        if dead >= 2:
            print("The pack breaks. The rest flee down the far stair.")
            return "won"
        biters = 0
        for i in range(len(rats)):
            if rats[i] > 0 and not asleep[i] and biters < 2:
                biters = biters + 1
                print(f"Rat {i + 1} bites. ", end="")
                if attack(0, hero.ac):
                    bite = roll(3)
                    hero.hp = hero.hp - bite
                    print(f"You lose {bite} hp.")
                    if hero.hp <= 0:
                        print("You fall among the broken jars. The rats close in.")
                        return "dead"


# NEW: the whole of shortest_path() is new in this stage.
def shortest_path(rooms, start, goal, use_secrets):
    """Breadth-first search over the whole map. Visit rooms in rings: every
    room one step away, then every room two steps away, and so on. The first
    time a room is reached, it is reached by a shortest path. Secret rooms
    count only if use_secrets is True. Returns room indexes, start to goal."""
    came_from = [-1] * len(rooms)  # came_from[r]: the room we stepped to r from
    seen = [False] * len(rooms)
    seen[start] = True
    queue = deque([start])
    while len(queue) > 0:
        r = queue.popleft()  # NEW: take from the front: first in, first out
        for nxt in rooms[r].exits:
            if not seen[nxt] and (use_secrets or not rooms[nxt].secret):
                seen[nxt] = True
                came_from[nxt] = r
                queue.append(nxt)  # NEW: add to the back
    if not seen[goal]:
        return []  # no way there
    path = []
    r = goal
    while r != -1:  # NEW: follow the trail backward, from goal to start
        path.insert(0, r)  # put each room at the front, so the path reads forward
        r = came_from[r]
    return path


def path_text(rooms, path):
    """Turn a list of room indexes into text like "C2 -> C1 (1 move)"."""
    keys = []
    for r in path:
        keys.append(rooms[r].key)
    moves = len(path) - 1
    word = "move" if moves == 1 else "moves"
    return " -> ".join(keys) + f" ({moves} {word})"


def describe(game):
    room = game.rooms[game.here]
    print()
    print(f"{room.key}. {room.name}")
    if not room.visited:
        print(room.text)
        room.visited = True  # change one field of one object


def walk(game, to):
    """Walking to the next room takes less than a turn. Returns turns used."""
    game.here = to
    describe(game)
    if to == STORE and not game.rats_fled:
        result = fight_rats(game)
        if result == "won":
            game.rats_fled = True
            print("In one rack, five flasks of oil are still whole. You take them.")
        elif result == "ran":
            game.here = STAIR
        else:
            game.over = True
        return 1  # a fight and the breath after it take a turn
    if to == FLOODED:
        found = game.rooms[PASSAGE].is_open
        long_way = shortest_path(game.rooms, STUDY, JETTY, False)  # NEW: no secret door
        short_way = shortest_path(game.rooms, STUDY, JETTY, True)  # NEW: through it
        print("The water climbs another step. Time to think about the way home.")
        from_here = shortest_path(game.rooms, FLOODED, JETTY, found)
        print("From here:              " + path_text(game.rooms, from_here))
        print("Module 2's map goes on. From the study, C7, deep in the cellars:")
        print("  the long way:         " + path_text(game.rooms, long_way))
        print("  by the secret door:   " + path_text(game.rooms, short_way))
        if found:
            print("You found the secret door on the C1 landing.")
        else:
            print("You never found the secret door. It is in the C1 landing's east wall.")
        print()
        print("WHAT YOU LEARNED")
        print("- Light is time. The torch is a clock you can see.")
        print("- Searching finds things, and it costs a turn.")
        print("- Listen before you open a door. Forcing it makes noise.")
        print("- Every second turn, the dungeon rolls against you.")
        print("- Monsters run when the fight turns against them.")
        print("- A secret door can turn a long way home into a short one.")
        print(f"The first delve ends here, on turn {game.turn}. END OF STAGE 7.")
        game.over = True
    return 0


def plan(game):
    """PLAN: show where you are and what you can do. Free: no time passes.
    Returns the list of rooms you can walk to, in the order shown."""
    rooms = game.rooms
    print(f"[{rooms[game.here].key}] Turn {game.turn}. Torch: {game.torch} of 6. HP: {game.hero.hp}.")
    choices = []
    for to in rooms[game.here].exits:  # walk the exits of this room
        if rooms[to].is_open:
            choices.append(to)  # grow a list one item at a time
            print(f"  {len(choices)}. Go to {rooms[to].key} {rooms[to].name}")
    if game.here == TOWER and not rooms[STAIR].is_open:
        print("  s. Search the rubble (1 turn)")
    if game.here == TOWER:
        print("  c. Climb the stair (1 turn)")
    if game.here == STAIR and not rooms[STORE].is_open:
        print("  l. Listen at the door")
        print("  f. Force the door (1 turn)")
    if game.here == STAIR and not rooms[PASSAGE].is_open:  # NEW
        print("  s. Search the landing (1 turn)")
    print("  m. Ask your map: the shortest way to the jetty")
    return choices


def execute(game, choices, answer):
    """EXECUTE: do the one action the player declared. Returns turns used."""
    rooms = game.rooms
    if len(answer) == 1 and "1" <= answer <= "9" and int(answer) <= len(choices):
        return walk(game, choices[int(answer) - 1])  # people count from 1
    if game.here == TOWER and answer == "s" and not rooms[STAIR].is_open:
        print("You shift stones for ten minutes. Under them lies a trapdoor.")
        rooms[STAIR].is_open = True
        return 1
    if game.here == TOWER and answer == "c":
        print("From the top: the whole island, and a boat-shaped shadow at the")
        print("north cliff.")
        return 1
    if game.here == STAIR and answer == "l" and not rooms[STORE].is_open:
        print("Listen: ", end="")
        if check(1):
            print("Scratching. Squeaks. Many small feet.")
        else:
            print("You hear only water, dripping somewhere.")
        return 0
    if game.here == STAIR and answer == "f" and not rooms[STORE].is_open:
        print("Force: ", end="")
        if check(2 + game.hero.str_mod):
            print("The door bursts open with a crack like a dropped plank.")
            rooms[STORE].is_open = True
        else:
            print("The door shudders and holds. The noise rolls into the dark.")
        return 1
    if game.here == STAIR and answer == "s" and not rooms[PASSAGE].is_open:  # NEW
        print("You search the landing: ", end="")
        if check(1):  # secret doors: 1-in-6 (elves 2-in-6)
            print("A stone panel in the east wall turns on an iron pin.")
            print("A secret door! A dark passage runs east.")
            rooms[PASSAGE].is_open = True
        else:
            print("Cold stone, and old lamp hooks stamped IX.")
        return 1
    if answer == "m":  # NEW: ask the BFS from where you stand
        found = rooms[PASSAGE].is_open
        way = shortest_path(rooms, game.here, JETTY, found)
        print("Shortest way to the jetty: " + path_text(rooms, way))
        return 0  # reading a map is free
    print("You cannot do that here.")
    return 0


def wander(game):
    """WANDER: d6, and on a 1 something comes."""
    print("Wandering check: ", end="")
    if check(1):
        print("Something wet drags itself past in the dark. You wait.")
        game.torch = game.torch - 1


# The Turn Is a Procedure. Module 2 writes the exploration turn in Logo:
#   TO TURN
#     PLAN                                  ; talk, look, ask: no dice, no time
#     EXECUTE                               ; the caller says it; one action each
#     MAKE "CLOCK :CLOCK + 1                ; tick a box: ten minutes pass
#     BURN 1                                ; every lit torch loses a turn
#     IF 0 = REMAINDER :CLOCK 2 [WANDER]    ; d6, and on a 1 something comes
#     IF 0 = REMAINDER :CLOCK 6 [REST]      ; rest now, or -1 to hit and damage
#     IF FIGHTING? [ROUNDS]                 ; a fight runs in rounds
#     IF BELOW? [TURN]                      ; do it again until the party climbs out
#   END
# turn() below follows it line by line.
def turn(game):
    choices = plan(game)                                     # PLAN
    used = execute(game, choices, ask("What do you do? "))  # EXECUTE (a fight runs
    if used == 0 or game.over:                               #   its ROUNDS in here)
        return  # looking and walking are free: no time passes
    game.turn = game.turn + 1                                # MAKE "CLOCK :CLOCK + 1
    print("Ten minutes pass.")
    game.torch = game.torch - 1                              # BURN 1
    if game.turn % 2 == 0:                                   # IF 0 = REMAINDER :CLOCK 2
        wander(game)                                         #   [WANDER]
    # IF 0 = REMAINDER :CLOCK 6 [REST]: one torch dies by turn 6, so we leave it out.
    if game.torch <= 0:
        print("Your torch gutters out. You feel your way back to the boat.")
        game.over = True
    # IF BELOW? [TURN]: Logo calls TURN again. main() uses a while loop instead.


def main():
    seed_dice(ask("Seed? "))
    print()
    print("THE FIRST DELVE - Stage 7: the shortest way")
    print("  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell")
    print("  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1")
    if ask("Pick 1 or 2: ") == "2":
        hero = Hero("the Fighter", 8, 15, 1, 8, False)  # build an object
    else:
        hero = Hero("the Wizard", 4, 10, -1, 4, True)
    game = Game(hero, make_rooms(), JETTY, 0, 6, [2, 3, 1, 4, 2], [False] * 5, False, False)
    print(f"You are {game.hero.name}. Captain Maren rows you to the Isle of Old")
    print("Stone at sunset. You light a torch. It will burn 6 turns.")
    describe(game)
    while not game.over:  # REPEAT the turn until the delve ends
        turn(game)


main()  # Python reads the file top to bottom; this line starts the program
