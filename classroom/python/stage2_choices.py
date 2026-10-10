# The First Delve - Stage 2: Choices
# Teaches: input, if / elif / else, comparison, and / or, bool.
# Run it:  python3 stage2_choices.py

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
    print("THE FIRST DELVE - Stage 2: choices")
    print()
    print("Who rows to the island?")
    print("  1. The Wizard: 4 hit points, AC 9 [10], STR 8")
    print("  2. The Fighter: 8 hit points, AC 4 [15], STR 14")
    pick = ask("Pick 1 or 2: ")

    # NEW: if / elif / else. Python runs exactly one of these branches.
    # pick is text, so we compare it with the text "1", not the number 1.
    if pick == "1":
        hero = "the Wizard"
        str_mod = -1
    elif pick == "2":
        hero = "the Fighter"
        str_mod = 1
    else:
        print("That is not 1 or 2, so the Wizard goes.")
        hero = "the Wizard"
        str_mod = -1
    print(f"You are {hero}. Your STR modifier is {str_mod:+d}.")

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
    print()
    print("S2. THE TOWER SHELL")
    print("A round tower, thirty feet across, open to the sky. Its upper floors")
    print("fell in long ago and lie as rubble on the ground. A stair climbs the")
    print("inside wall to a broken top forty feet up. Crows watch you from the")
    print("rim with the calm of tax collectors.")
    print("You shift stones for ten minutes. Under the rubble lies a trapdoor")
    print("of black oak. Its iron ring is furred with rust.")
    print()

    # NEW: or. The test is true if either side is true.
    answer = ask("Look in the cottage first? (y/n): ")
    if answer == "y" or answer == "Y":
        print("S3. THE KEEPER'S COTTAGE")
        print("A stone cottage beside the tower. The roof is gone. The hearth holds")
        print("ash less than a week old. A tin of lamp oil sits on a shelf, enough for")
        print("two flasks. On the door someone has chalked an eye with a line through")
        print("it. It is not a greeting.")
        print()

    print("C1. THE CELLAR STAIR")
    print("Under the trapdoor a stone stair goes down twenty feet. The air smells")
    print("of old oil and wet stone. At the bottom stands an oak door, swollen in")
    print("its frame. It is stuck.")
    answer = ask("Listen at the door? (y/n): ")
    if answer == "y" or answer == "Y":
        # NEW: "1-in-6" means roll a d6 and succeed on a 1.
        # Elves, dwarves and halflings hear on a 1 or 2 ("2-in-6").
        listen = roll(6)
        print(f"Listen: d6 = {listen}, need 1 or less.")
        if listen <= 1:
            print("Scratching. Squeaks. Many small feet.")
        else:
            print("You hear only water, dripping somewhere.")

    # NEW: and. The test is true only if both sides are true.
    answer = ask("Force the door? (y/n): ")
    if answer != "y" and answer != "Y":
        print("You leave the door shut and climb back into the daylight.")
        print("The delve is over for today.")
        return  # leave main() now: the program ends

    need = 2 + str_mod  # a door opens on 1-2 on a d6; STR moves the number
    force = roll(6)
    print(f"Force: d6 = {force}, need {need} or less.")
    is_open = force <= need  # NEW: a bool holds True or False
    if not is_open:
        print("The door shudders and holds. The noise rolls away into the dark.")
        answer = ask("Try again? (y/n): ")
        if answer == "y" or answer == "Y":  # NEW: an if inside an if
            force = roll(6)
            print(f"Force: d6 = {force}, need {need} or less.")
            is_open = force <= need

    if is_open:
        print("The door bursts open with a crack like a dropped plank.")
        print("In the dark beyond, five pairs of small red eyes turn toward you.")
    else:
        print("The door holds. You climb back into the daylight.")
        print("To try again and again, you need a loop. That is stage 3.")
    print("END OF STAGE 2.")


main()  # Python reads the file top to bottom; this line starts the program
