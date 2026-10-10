// The First Delve - Stage 2: Choices
// Teaches: input, if / else if / else, comparison, && and ||, bool.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage2 stage2_choices.cpp
// Run:    ./stage2

#include <cstdint>   // uint32_t: an unsigned 32-bit whole number
#include <cstdlib>   // exit, getenv
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
    cout << endl;
    cout << "THE FIRST DELVE - Stage 2: choices" << endl;
    cout << endl;
    cout << "Who rows to the island?" << endl;
    cout << "  1. The Wizard: 4 hit points, AC 9 [10], STR 8" << endl;
    cout << "  2. The Fighter: 8 hit points, AC 4 [15], STR 14" << endl;
    string pick = ask("Pick 1 or 2: ");

    // NEW: if / else if / else. C++ runs exactly one of these branches.
    // pick is a string, so we compare it with the string "1", not the number 1.
    string hero;
    int str_mod;
    if (pick == "1") {
        hero = "the Wizard";
        str_mod = -1;
    } else if (pick == "2") {
        hero = "the Fighter";
        str_mod = 1;
    } else {
        cout << "That is not 1 or 2, so the Wizard goes." << endl;
        hero = "the Wizard";
        str_mod = -1;
    }
    cout << "You are " << hero << ". Your STR modifier is "
         << showpos << str_mod << noshowpos << "." << endl;

    cout << endl;
    cout << "The Fort docks. Captain Maren coils a wet rope and does not smile." << endl;
    cout << "\"Row to the Isle of Old Stone. Find out who lands there," << endl;
    cout << "and what moves in the water.\"" << endl;
    cout << "Four hours of oars later, the sun is low and the island is close." << endl;
    cout << endl;
    cout << "S1. THE BROKEN JETTY" << endl;
    cout << "A stone jetty runs out from the south shore. Half of it has fallen" << endl;
    cout << "into the lake. On a mooring post, a rope burn shows pale and fresh:" << endl;
    cout << "someone else lands here. Past the end of the jetty, something large" << endl;
    cout << "moves under the water, a long shadow, and is gone." << endl;
    cout << endl;
    cout << "S2. THE TOWER SHELL" << endl;
    cout << "A round tower, thirty feet across, open to the sky. Its upper floors" << endl;
    cout << "fell in long ago and lie as rubble on the ground. A stair climbs the" << endl;
    cout << "inside wall to a broken top forty feet up. Crows watch you from the" << endl;
    cout << "rim with the calm of tax collectors." << endl;
    cout << "You shift stones for ten minutes. Under the rubble lies a trapdoor" << endl;
    cout << "of black oak. Its iron ring is furred with rust." << endl;
    cout << endl;

    // NEW: || means "or". The test is true if either side is true.
    string answer = ask("Look in the cottage first? (y/n): ");
    if (answer == "y" || answer == "Y") {
        cout << "S3. THE KEEPER'S COTTAGE" << endl;
        cout << "A stone cottage beside the tower. The roof is gone. The hearth holds" << endl;
        cout << "ash less than a week old. A tin of lamp oil sits on a shelf, enough for" << endl;
        cout << "two flasks. On the door someone has chalked an eye with a line through" << endl;
        cout << "it. It is not a greeting." << endl;
        cout << endl;
    }

    cout << "C1. THE CELLAR STAIR" << endl;
    cout << "Under the trapdoor a stone stair goes down twenty feet. The air smells" << endl;
    cout << "of old oil and wet stone. At the bottom stands an oak door, swollen in" << endl;
    cout << "its frame. It is stuck." << endl;
    answer = ask("Listen at the door? (y/n): ");
    if (answer == "y" || answer == "Y") {
        // NEW: "1-in-6" means roll a d6 and succeed on a 1.
        // Elves, dwarves and halflings hear on a 1 or 2 ("2-in-6").
        int listen = roll(6);
        cout << "Listen: d6 = " << listen << ", need 1 or less." << endl;
        if (listen <= 1) {
            cout << "Scratching. Squeaks. Many small feet." << endl;
        } else {
            cout << "You hear only water, dripping somewhere." << endl;
        }
    }

    // NEW: && means "and". The test is true only if both sides are true.
    answer = ask("Force the door? (y/n): ");
    if (answer != "y" && answer != "Y") {
        cout << "You leave the door shut and climb back into the daylight." << endl;
        cout << "The delve is over for today." << endl;
        return 0;  // leave main() now: the program ends
    }

    int need = 2 + str_mod;  // a door opens on 1-2 on a d6; STR moves the number
    int force = roll(6);
    cout << "Force: d6 = " << force << ", need " << need << " or less." << endl;
    bool is_open = force <= need;  // NEW: a bool holds true or false
    if (!is_open) {
        cout << "The door shudders and holds. The noise rolls away into the dark." << endl;
        answer = ask("Try again? (y/n): ");
        if (answer == "y" || answer == "Y") {  // NEW: an if inside an if
            force = roll(6);
            cout << "Force: d6 = " << force << ", need " << need << " or less." << endl;
            is_open = force <= need;
        }
    }

    if (is_open) {
        cout << "The door bursts open with a crack like a dropped plank." << endl;
        cout << "In the dark beyond, five pairs of small red eyes turn toward you." << endl;
    } else {
        cout << "The door holds. You climb back into the daylight." << endl;
        cout << "To try again and again, you need a loop. That is stage 3." << endl;
    }
    cout << "END OF STAGE 2." << endl;
    return 0;
}
