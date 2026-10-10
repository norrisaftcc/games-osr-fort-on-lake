# The First Delve - Stage 3: The Dungeon Clock
# Teaches: while loops, counters, the % operator, and ending a loop.
# Run it:  python3 stage3_dungeon_clock.py

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


def main():
    seed_dice(ask("Seed? "))
    print()
    print("THE FIRST DELVE - Stage 3: the Dungeon Clock")
    print()
    print("Who rows to the island?")
    print("  1. The Wizard: 4 hit points, AC 9 [10], STR 8")
    print("  2. The Fighter: 8 hit points, AC 4 [15], STR 14")
    pick = ask("Pick 1 or 2: ")
    if pick == "2":
        hero = "the Fighter"
        str_mod = 1
    else:
        hero = "the Wizard"
        str_mod = -1
    print(f"You are {hero}.")

    turn = 0   # NEW: a counter. One turn is 10 minutes.
    torch = 6  # NEW: turns of light left. A torch burns 6 turns.

    print()
    print("The Fort docks. Captain Maren coils a wet rope and does not smile.")
    print("\"Row to the Isle of Old Stone. Find out who lands there,")
    print("and what moves in the water.\"")
    print("Four hours of oars later, the sun is low and the island is close.")
    print()
    print("S1. THE BROKEN JETTY")
    print("A stone jetty runs out from the south shore. Half of it has fallen")
    print("into the lake. On a mooring post, a rope burn shows pale and fresh:")
    print("someone else lands here. Past the end of the jetty, something large")
    print("moves under the water, a long shadow, and is gone.")
    print(f"The sun sets. You light a torch. It will burn {torch} turns.")
    print()
    print("S2. THE TOWER SHELL")
    print("A round tower, thirty feet across, open to the sky. Its upper floors")
    print("fell in long ago and lie as rubble on the ground. A stair climbs the")
    print("inside wall to a broken top forty feet up. Crows watch you from the")
    print("rim with the calm of tax collectors.")

    found = False
    # NEW: a while loop repeats its body for as long as its test is true.
    while not found:
        print("What do you do? Each choice takes one turn.")
        print("  1. Search the rubble")
        print("  2. Climb the stair")
        print("  3. Look in the cottage")
        pick = ask("Pick 1, 2 or 3: ")
        if pick == "1":
            print("You shift stones for ten minutes. Under the rubble lies a trapdoor")
            print("of black oak. Its iron ring is furred with rust.")
            found = True  # this makes the loop test false, so the loop ends
        elif pick == "2":
            print("From the broken top you see the whole island: rock, pine, the jetty,")
            print("the cottage. At the north cliff a boat-shaped shadow lies on the water.")
        elif pick == "3":
            print("S3. THE KEEPER'S COTTAGE")
            print("A stone cottage beside the tower. The roof is gone. The hearth holds")
            print("ash less than a week old. A tin of lamp oil sits on a shelf, enough for")
            print("two flasks. On the door someone has chalked an eye with a line through")
            print("it. It is not a greeting.")
        else:
            print("Pick 1, 2 or 3.")
            continue  # NEW: skip the rest of the body; go back to the test

        # The clock ticks. (This block appears again below. Stage 4 fixes that.)
        turn = turn + 1
        torch = torch - 1
        print(f"Turn {turn}. Torch: {torch} of 6.")
        if turn % 2 == 0:  # NEW: % is the remainder. Even turns leave 0.
            wander = roll(6)
            print(f"Wandering check: d6 = {wander}, need 1 or less.")
            if wander <= 1:
                print("Something wet drags itself past in the dark. You hold still")
                print("until it is gone. The torch burns while you wait.")
                torch = torch - 1
                print(f"Torch: {torch} of 6.")
        if torch <= 0:
            print("Your torch gutters out. In the dark you feel your way back to")
            print("the boat. The delve is over for today.")
            return

    print()
    print("C1. THE CELLAR STAIR")
    print("Under the trapdoor a stone stair goes down twenty feet. The air smells")
    print("of old oil and wet stone. At the bottom stands an oak door, swollen in")
    print("its frame. It is stuck.")
    answer = ask("Listen at the door? (y/n): ")
    if answer == "y" or answer == "Y":
        listen = roll(6)
        print(f"Listen: d6 = {listen}, need 1 or less.")
        if listen <= 1:
            print("Scratching. Squeaks. Many small feet.")
        else:
            print("You hear only water, dripping somewhere.")

    need = 2 + str_mod
    is_open = False
    # NEW: this loop can end three ways: the door opens, you give up,
    # or the torch dies.
    while not is_open:
        answer = ask("Force the door? It takes one turn. (y/n): ")
        if answer != "y" and answer != "Y":
            print("You leave the door shut and climb back out.")
            print("The delve is over for today.")
            return
        force = roll(6)
        print(f"Force: d6 = {force}, need {need} or less.")
        if force <= need:
            print("The door bursts open with a crack like a dropped plank.")
            is_open = True
        else:
            print("The door shudders and holds. The noise rolls away into the dark.")

        # The clock ticks. (The same block again. Stage 4 fixes that.)
        turn = turn + 1
        torch = torch - 1
        print(f"Turn {turn}. Torch: {torch} of 6.")
        if turn % 2 == 0:
            wander = roll(6)
            print(f"Wandering check: d6 = {wander}, need 1 or less.")
            if wander <= 1:
                print("Something wet drags itself past in the dark. You hold still")
                print("until it is gone. The torch burns while you wait.")
                torch = torch - 1
                print(f"Torch: {torch} of 6.")
        if torch <= 0:
            print("Your torch gutters out. In the dark you feel your way back to")
            print("the boat. The delve is over for today.")
            return

    print("In the dark beyond, five pairs of small red eyes turn toward you.")
    print(f"You reached the oil store on turn {turn}. Torch: {torch} of 6.")
    print("END OF STAGE 3.")


main()  # Python reads the file top to bottom; this line starts the program
