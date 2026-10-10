// The First Delve - Stage 1: The Character Sheet
// Teaches: variables, types, arithmetic, output and formatting.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage1 stage1_character_sheet.cpp
// Run:    ./stage1

#include <cstdint>   // uint32_t: an unsigned 32-bit whole number
#include <cstdlib>   // exit, getenv
#include <iomanip>   // NEW: setw, setprecision, fixed, showpos
#include <iostream>
#include <string>
using namespace std;

// ----- Toolbox: dice and input. Use it now; stage 4 explains how it works. -----
uint32_t dice_state = 0;  // the dice machine's memory: one 32-bit number

// Start the dice machine from the digits in text. Same seed, same rolls.
void seed_dice(const string& text) {
    dice_state = 0;
    for (char ch : text) {
        if (ch >= '0' && ch <= '9') {
            dice_state = dice_state * 10 + uint32_t(ch - '0');
        }
    }
}

// Mulberry32: one step of the dice machine. See RNG.md.
uint32_t next_u32() {
    dice_state += 0x6D2B79F5u;
    uint32_t t = dice_state;
    t = (t ^ (t >> 15)) * (t | 1u);
    t ^= t + (t ^ (t >> 7)) * (t | 61u);
    return t ^ (t >> 14);
}

// Roll one die with this many sides. The answer is 1 to sides.
int roll(int sides) {
    return 1 + int(next_u32() % uint32_t(sides));
}

// Show a prompt, read one line, and return it without spaces at the ends.
string ask(const string& prompt) {
    cout << prompt;
    string line;
    if (!getline(cin, line)) {  // no more input: end cleanly, never loop forever
        cout << "\n(No more input. You put out your torch and row home.)\n";
        exit(0);
    }
    const string spaces = " \t\r\n";
    size_t first = line.find_first_not_of(spaces);
    if (first == string::npos) {
        line = "";
    } else {
        size_t last = line.find_last_not_of(spaces);
        line = line.substr(first, last - first + 1);
    }
    const char* echo = getenv("ECHO_INPUT");
    if (echo != nullptr && string(echo) == "1") {
        cout << line << "\n";  // show the answer, so a piped transcript reads like a session
    }
    return line;
}
// ----- End of toolbox. -----

int main() {
    seed_dice(ask("Seed? "));
    string name = ask("Name your wizard: ");  // NEW: a string variable holds text

    // NEW: variables. Each one has a type and holds one value.
    string char_class = "Magic-User";  // string: text
    int level = 1;                     // int: a whole number
    int hit_points = 4;
    int armor_class = 9;               // the old books count AC down: lower is better
    int strength = 8;
    int intelligence = 15;
    int wisdom = 12;
    int dexterity = 11;
    int constitution = 10;
    int charisma = 9;
    int str_mod = -1;                  // STR 8 gives -1 to hit and to damage
    int dagger_sides = 4;
    int torches = 3;
    int turns_per_torch = 6;
    int fate_points = 3;

    // NEW: expressions. C++ works each one out once, right here.
    int ascending_ac = 19 - armor_class;              // the number in [brackets]
    int attack_bonus = 0 + str_mod;                   // THAC0 19 is +0; then add STR
    double dagger_average = (1 + dagger_sides) / 2.0; // NEW: 2.0 makes it a double. (1 + 4) / 2 is 2!
    int light_turns = torches * turns_per_torch;
    double light_hours = light_turns * 10 / 60.0;     // one turn is 10 minutes

    // Roll 3d6 for gold, then multiply by 10.
    int gold_1 = roll(6);
    int gold_2 = roll(6);
    int gold_3 = roll(6);
    int gold = (gold_1 + gold_2 + gold_3) * 10;

    // NEW: output with cout. setw(2) pads to 2 places, showpos shows the sign,
    // fixed and setprecision(1) show one digit after the point.
    cout << fixed << setprecision(1);
    cout << endl;
    cout << "THE FIRST DELVE - Stage 1: the character sheet" << endl;
    cout << "==============================================" << endl;
    cout << "Name:          " << name << endl;
    cout << "Class:         " << char_class << ", level " << level << endl;
    cout << "Hit points:    " << hit_points << endl;
    cout << "Armor class:   " << armor_class << " [" << ascending_ac << "]" << endl;
    cout << "Attack bonus:  " << showpos << attack_bonus << noshowpos << endl;
    cout << "STR " << setw(2) << strength << "   INT " << setw(2) << intelligence
         << "   WIS " << setw(2) << wisdom << endl;
    cout << "DEX " << setw(2) << dexterity << "   CON " << setw(2) << constitution
         << "   CHA " << setw(2) << charisma << endl;
    cout << "Weapon:        dagger, 1d" << dagger_sides << ", average " << dagger_average << endl;
    cout << "Spell:         Sleep, once a day" << endl;
    cout << "Light:         " << torches << " torches x " << turns_per_torch << " turns"
         << " = " << light_turns << " turns = " << light_hours << " hours" << endl;
    cout << "Gold:          (" << gold_1 << " + " << gold_2 << " + " << gold_3
         << ") x 10 = " << gold << " gp" << endl;
    cout << "Fate points:   " << fate_points << endl;
    cout << "==============================================" << endl;
    cout << "Captain Maren waits at the docks. The boat leaves at noon." << endl;
    return 0;
}
