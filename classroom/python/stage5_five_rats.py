# The First Delve - Stage 5: Five Rats
# Teaches: lists (arrays), indexes, looping over a list, counting, break.
# Run it:  python3 stage5_five_rats.py

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

RAT_COUNT = 5  # the pinned room: giant rats x5
RAT_AC = 12    # AC 7 [12]
RAT_BITE = 3   # bite 1d3
RAT_FLEE = 2   # ML 8: in this room the pack breaks when 2 lie dead
DOORWAY = 2    # you hold the doorway, so only 2 rats reach you each round


def is_yes(answer):
    return answer == "y" or answer == "Y"


def check(in_six):
    """Roll a d6. Succeed on in_six or less."""
    die = roll(6)
    word = "yes" if die <= in_six else "no"  # a one-line if / else
    print(f"d6 = {die}, need {in_six} or less: {word}.")
    return die <= in_six


def attack(bonus, ac):
    """Roll d20 + bonus. Hit if the total is at least ac."""
    die = roll(20)
    word = "hit" if die + bonus >= ac else "miss"
    print(f"d20 = {die}, total {die + bonus} vs AC {ac}: {word}.")
    return die + bonus >= ac


def tick(turn, torch):
    """One turn passes. Every second turn, check for wanderers."""
    turn = turn + 1
    torch = torch - 1
    print(f"Turn {turn}. Torch: {torch} of 6.")
    if turn % 2 == 0:
        print("Wandering check: ", end="")
        if check(1):
            print("Something wet drags itself past in the dark. You wait.")
            torch = torch - 1
            print(f"Torch: {torch} of 6.")
    return turn, torch


def fight_rats(hp, ac, bonus, die, has_sleep):
    """The C2 fight. Returns "won", "ran" or "dead"."""
    rat_hp = [2, 3, 1, 4, 2]  # NEW: a list holds many values, one per rat
    asleep = [False] * RAT_COUNT  # NEW: a second list, in step with the first
    round_no = 0
    while True:
        round_no = round_no + 1
        print(f"Round {round_no}. You: {hp} hp. Rats:", end="")
        for i in range(RAT_COUNT):  # NEW: i takes the values 0, 1, 2, 3, 4
            if rat_hp[i] <= 0:
                print(" x", end="")
            elif asleep[i]:
                print(" z", end="")
            else:
                print(f" {rat_hp[i]}", end="")
        print("   (x dead, z asleep)")
        if has_sleep:
            pick = ask("1 fight, 2 run, 3 cast Sleep: ")
        else:
            pick = ask("1 fight, 2 run: ")

        if pick == "2":
            print("You back up the stair. The rats do not follow.")
            return "ran"
        elif pick == "3" and has_sleep:
            has_sleep = False
            budget = roll(8) + roll(8)  # Sleep affects 2d8 Hit Dice of creatures
            print(f"You speak the word of Sleep. 2d8 = {budget}.")
            for i in range(RAT_COUNT):
                if rat_hp[i] > 0 and budget > 0:
                    asleep[i] = True
                    budget = budget - 1  # each rat counts as 1 HD
        else:
            target = -1
            for i in range(RAT_COUNT):  # NEW: search the list for the first live rat
                if rat_hp[i] > 0:
                    target = i
                    break  # NEW: found it; stop looking
            print(f"You strike at rat {target + 1}. ", end="")  # people count from 1
            if asleep[target]:
                print("It is asleep. One blow kills it.")
                rat_hp[target] = 0
            elif attack(bonus, RAT_AC):
                damage = max(1, roll(die) + bonus)
                rat_hp[target] = rat_hp[target] - damage
                print(f"You deal {damage} damage.")
                if rat_hp[target] <= 0:
                    print(f"Rat {target + 1} dies.")

        dead = 0
        for i in range(RAT_COUNT):  # NEW: count the items that pass a test
            if rat_hp[i] <= 0:
                dead = dead + 1
        if dead >= RAT_FLEE:
            print(f"{dead} rats lie dead. The pack breaks. The rest flee down the far stair.")
            return "won"

        biters = 0
        for i in range(RAT_COUNT):  # the first DOORWAY rats that are awake bite
            if rat_hp[i] > 0 and not asleep[i] and biters < DOORWAY:
                biters = biters + 1
                print(f"Rat {i + 1} bites. ", end="")
                if attack(0, ac):
                    bite = roll(RAT_BITE)
                    hp = hp - bite
                    print(f"You lose {bite} hp.")
                    if hp <= 0:
                        print("You fall among the broken jars. The rats close in.")
                        return "dead"


def main():
    seed_dice(ask("Seed? "))
    print()
    print("THE FIRST DELVE - Stage 5: five rats")
    print()
    print("Who rows to the island?")
    print("  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell")
    print("  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1")
    hero = "the Wizard"
    hp = 4
    ac = 10         # AC 9 [10]: we use the ascending number
    str_mod = -1
    die = 4         # dagger 1d4
    has_sleep = True
    if ask("Pick 1 or 2: ") == "2":
        hero = "the Fighter"
        hp = 8
        ac = 15     # AC 4 [15]
        str_mod = 1
        die = 8     # sword 1d8
        has_sleep = False
    print(f"You are {hero}.")
    turn = 0
    torch = 6

    print()
    print("The Fort docks. Captain Maren sends you to the Isle of Old Stone.")
    print("S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water.")
    print(f"The sun sets. You light a torch. It will burn {torch} turns.")
    print("S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows.")
    found = False
    while not found:
        print("What do you do? Each choice takes one turn.")
        print("  1. Search the rubble   2. Climb the stair   3. Look in the cottage")
        pick = ask("Pick 1, 2 or 3: ")
        if pick == "1":
            print("Under the rubble lies a trapdoor of black oak.")
            found = True
        elif pick == "2":
            print("From the top: a boat-shaped shadow at the north cliff.")
        elif pick == "3":
            print("S3. THE KEEPER'S COTTAGE. Week-old ash. A chalked eye, crossed out.")
        else:
            print("Pick 1, 2 or 3.")
            continue
        turn, torch = tick(turn, torch)
        if torch <= 0:
            print("Your torch gutters out. You feel your way back to the boat.")
            return

    print()
    print("C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.")
    if is_yes(ask("Listen at the door? (y/n): ")):
        print("Listen: ", end="")
        if check(1):
            print("Scratching. Squeaks. Many small feet.")
        else:
            print("You hear only water, dripping somewhere.")
    is_open = False
    while not is_open:
        if not is_yes(ask("Force the door? It takes one turn. (y/n): ")):
            print("You leave the door shut and climb back out.")
            return
        print("Force: ", end="")
        is_open = check(2 + str_mod)
        if is_open:
            print("The door bursts open with a crack like a dropped plank.")
        else:
            print("The door shudders and holds. The noise rolls into the dark.")
        turn, torch = tick(turn, torch)
        if torch <= 0:
            print("Your torch gutters out. You feel your way back to the boat.")
            return

    print()
    print("C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky.")
    print("Five giant rats, each the size of a cat, lift their heads from the spill.")
    print("You hold the doorway. Only two rats can reach you at a time.")
    result = fight_rats(hp, ac, str_mod, die, has_sleep)
    if result != "won":
        print("The delve is over for today.")
        return
    turn, torch = tick(turn, torch)  # the fight and the breath after it: one turn
    if torch <= 0:
        print("Your torch gutters out. You feel your way back to the boat.")
        return
    print("In one rack, five flasks of oil are still whole. You take them.")
    print()
    print("C3. THE FLOODED STAIR. A second stair goes down into black water.")
    print("As you watch, the water climbs one step, as if the lake took a breath.")
    print(f"The first delve ends here, on turn {turn}. Torch: {torch} of 6.")
    print("END OF STAGE 5.")


main()  # Python reads the file top to bottom; this line starts the program
