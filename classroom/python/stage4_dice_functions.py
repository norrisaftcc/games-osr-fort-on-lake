# The First Delve - Stage 4: Dice as Functions
# Teaches: writing functions, parameters, return values, returning two values.
# Run it:  python3 stage4_dice_functions.py

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
# Look back at the toolbox: roll(sides) is a function. "sides" is its
# parameter, and "return" hands the answer back. Now we write our own.


def is_yes(answer):  # NEW: a function that returns a bool
    """True if the player typed y or Y."""
    return answer == "y" or answer == "Y"


def check(in_six):  # NEW: in_six is a parameter; the caller fills it in
    """Roll a d6. Succeed on in_six or less: check(1) is "1-in-6"."""
    die = roll(6)
    success = die <= in_six
    if success:
        print(f"d6 = {die}, need {in_six} or less: yes.")
    else:
        print(f"d6 = {die}, need {in_six} or less: no.")
    return success  # NEW: hand the answer back to the caller


def attack(bonus, ac):  # NEW: two parameters
    """Roll d20 + bonus. Hit if the total is at least the target's AC."""
    die = roll(20)
    total = die + bonus
    hit = total >= ac
    if hit:
        print(f"d20 = {die}, total {total} vs AC {ac}: hit.")
    else:
        print(f"d20 = {die}, total {total} vs AC {ac}: miss.")
    return hit


def tick(turn, torch):
    """One turn passes. Every second turn, check for wanderers.
    Python cannot change the caller's numbers, so we return both new values."""
    turn = turn + 1
    torch = torch - 1
    print(f"Turn {turn}. Torch: {torch} of 6.")
    if turn % 2 == 0:
        print("Wandering check: ", end="")  # end="" keeps the line open for check()
        if check(1):
            print("Something wet drags itself past in the dark. You hold still")
            print("until it is gone. The torch burns while you wait.")
            torch = torch - 1
            print(f"Torch: {torch} of 6.")
    return turn, torch  # NEW: return two values at once


def torch_out():  # NEW: a function with no parameters and no return value
    print("Your torch gutters out. In the dark you feel your way back to")
    print("the boat. The delve is over for today.")


def main():
    seed_dice(ask("Seed? "))
    print()
    print("THE FIRST DELVE - Stage 4: dice as functions")
    print()
    print("Who rows to the island?")
    print("  1. The Wizard: 4 hit points, AC 9 [10], STR 8")
    print("  2. The Fighter: 8 hit points, AC 4 [15], STR 14")
    if ask("Pick 1 or 2: ") == "2":
        hero = "the Fighter"
        str_mod = 1
    else:
        hero = "the Wizard"
        str_mod = -1
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
        turn, torch = tick(turn, torch)  # NEW: one call replaces 12 copied lines
        if torch <= 0:
            torch_out()
            return

    print()
    print("C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck.")
    if is_yes(ask("Listen at the door? (y/n): ")):
        print("Listen: ", end="")
        if check(1):  # 1-in-6. Elves, dwarves and halflings would use check(2).
            print("Scratching. Squeaks. Many small feet.")
        else:
            print("You hear only water, dripping somewhere.")

    is_open = False
    while not is_open:
        if not is_yes(ask("Force the door? It takes one turn. (y/n): ")):
            print("You leave the door shut and climb back out.")
            print("The delve is over for today.")
            return
        print("Force: ", end="")
        is_open = check(2 + str_mod)  # NEW: the argument can be an expression
        if is_open:
            print("The door bursts open with a crack like a dropped plank.")
        else:
            print("The door shudders and holds. The noise rolls away into the dark.")
        turn, torch = tick(turn, torch)
        if torch <= 0:
            torch_out()
            return

    print("C2. THE OIL STORE. Five giant rats lift their heads. One leaps.")
    print("You strike first. ", end="")
    if attack(str_mod, 12):  # rats have AC 7 [12]
        print("Your blow throws it back among the jars.")
    else:
        print("You miss. Its teeth close on your boot.")
    print("The whole fight with all five rats is stage 5.")
    print("END OF STAGE 4.")


main()  # Python reads the file top to bottom; this line starts the program
