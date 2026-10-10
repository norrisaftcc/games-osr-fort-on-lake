# The First Delve - Stage 1: The Character Sheet
# Teaches: variables, types, arithmetic, output and formatting.
# Run it:  python3 stage1_character_sheet.py

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
    name = ask("Name your wizard: ")  # NEW: a str variable holds text

    # NEW: variables. Each one is a named box that holds one value.
    char_class = "Magic-User"  # str: text
    level = 1                  # int: a whole number
    hit_points = 4
    armor_class = 9            # the old books count AC down: lower is better
    strength = 8
    intelligence = 15
    wisdom = 12
    dexterity = 11
    constitution = 10
    charisma = 9
    str_mod = -1               # STR 8 gives -1 to hit and to damage
    dagger_sides = 4
    torches = 3
    turns_per_torch = 6
    fate_points = 3

    # NEW: expressions. Python works each one out once, right here.
    ascending_ac = 19 - armor_class          # the number in [brackets]
    attack_bonus = 0 + str_mod               # THAC0 19 is +0; then add STR
    dagger_average = (1 + dagger_sides) / 2  # NEW: / always gives a float: 2.5
    light_turns = torches * turns_per_torch
    light_hours = light_turns * 10 / 60      # one turn is 10 minutes

    # Roll 3d6 for gold, then multiply by 10.
    gold_1 = roll(6)
    gold_2 = roll(6)
    gold_3 = roll(6)
    gold = (gold_1 + gold_2 + gold_3) * 10

    # NEW: output with f-strings. {x:2} pads to 2 places,
    # {x:+d} always shows the sign, {x:.1f} shows one digit after the point.
    print()
    print("THE FIRST DELVE - Stage 1: the character sheet")
    print("==============================================")
    print(f"Name:          {name}")
    print(f"Class:         {char_class}, level {level}")
    print(f"Hit points:    {hit_points}")
    print(f"Armor class:   {armor_class} [{ascending_ac}]")
    print(f"Attack bonus:  {attack_bonus:+d}")
    print(f"STR {strength:2}   INT {intelligence:2}   WIS {wisdom:2}")
    print(f"DEX {dexterity:2}   CON {constitution:2}   CHA {charisma:2}")
    print(f"Weapon:        dagger, 1d{dagger_sides}, average {dagger_average:.1f}")
    print("Spell:         Sleep, once a day")
    print(f"Light:         {torches} torches x {turns_per_torch} turns"
          f" = {light_turns} turns = {light_hours:.1f} hours")
    print(f"Gold:          ({gold_1} + {gold_2} + {gold_3}) x 10 = {gold} gp")
    print(f"Fate points:   {fate_points}")
    print("==============================================")
    print("Captain Maren waits at the docks. The boat leaves at noon.")


main()  # Python reads the file top to bottom; this line starts the program
