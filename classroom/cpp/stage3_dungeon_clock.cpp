// The First Delve - Stage 3: The Dungeon Clock
// Teaches: while loops, counters, the % operator, and ending a loop.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage3 stage3_dungeon_clock.cpp
// Run:    ./stage3

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
    cout << "THE FIRST DELVE - Stage 3: the Dungeon Clock" << endl;
    cout << endl;
    cout << "Who rows to the island?" << endl;
    cout << "  1. The Wizard: 4 hit points, AC 9 [10], STR 8" << endl;
    cout << "  2. The Fighter: 8 hit points, AC 4 [15], STR 14" << endl;
    string pick = ask("Pick 1 or 2: ");
    string hero = "the Wizard";
    int str_mod = -1;
    if (pick == "2") {
        hero = "the Fighter";
        str_mod = 1;
    }
    cout << "You are " << hero << "." << endl;

    int turn = 0;   // NEW: a counter. One turn is 10 minutes.
    int torch = 6;  // NEW: turns of light left. A torch burns 6 turns.

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
    cout << "The sun sets. You light a torch. It will burn " << torch << " turns." << endl;
    cout << endl;
    cout << "S2. THE TOWER SHELL" << endl;
    cout << "A round tower, thirty feet across, open to the sky. Its upper floors" << endl;
    cout << "fell in long ago and lie as rubble on the ground. A stair climbs the" << endl;
    cout << "inside wall to a broken top forty feet up. Crows watch you from the" << endl;
    cout << "rim with the calm of tax collectors." << endl;

    bool found = false;
    // NEW: a while loop repeats its body for as long as its test is true.
    while (!found) {
        cout << "What do you do? Each choice takes one turn." << endl;
        cout << "  1. Search the rubble" << endl;
        cout << "  2. Climb the stair" << endl;
        cout << "  3. Look in the cottage" << endl;
        pick = ask("Pick 1, 2 or 3: ");
        if (pick == "1") {
            cout << "You shift stones for ten minutes. Under the rubble lies a trapdoor" << endl;
            cout << "of black oak. Its iron ring is furred with rust." << endl;
            found = true;  // this makes the loop test false, so the loop ends
        } else if (pick == "2") {
            cout << "From the broken top you see the whole island: rock, pine, the jetty," << endl;
            cout << "the cottage. At the north cliff a boat-shaped shadow lies on the water." << endl;
        } else if (pick == "3") {
            cout << "S3. THE KEEPER'S COTTAGE" << endl;
            cout << "A stone cottage beside the tower. The roof is gone. The hearth holds" << endl;
            cout << "ash less than a week old. A tin of lamp oil sits on a shelf, enough for" << endl;
            cout << "two flasks. On the door someone has chalked an eye with a line through" << endl;
            cout << "it. It is not a greeting." << endl;
        } else {
            cout << "Pick 1, 2 or 3." << endl;
            continue;  // NEW: skip the rest of the body; go back to the test
        }

        // The clock ticks. (This block appears again below. Stage 4 fixes that.)
        turn = turn + 1;
        torch = torch - 1;
        cout << "Turn " << turn << ". Torch: " << torch << " of 6." << endl;
        if (turn % 2 == 0) {  // NEW: % is the remainder. Even turns leave 0.
            int wander = roll(6);
            cout << "Wandering check: d6 = " << wander << ", need 1 or less." << endl;
            if (wander <= 1) {
                cout << "Something wet drags itself past in the dark. You hold still" << endl;
                cout << "until it is gone. The torch burns while you wait." << endl;
                torch = torch - 1;
                cout << "Torch: " << torch << " of 6." << endl;
            }
        }
        if (torch <= 0) {
            cout << "Your torch gutters out. In the dark you feel your way back to" << endl;
            cout << "the boat. The delve is over for today." << endl;
            return 0;
        }
    }

    cout << endl;
    cout << "C1. THE CELLAR STAIR" << endl;
    cout << "Under the trapdoor a stone stair goes down twenty feet. The air smells" << endl;
    cout << "of old oil and wet stone. At the bottom stands an oak door, swollen in" << endl;
    cout << "its frame. It is stuck." << endl;
    string answer = ask("Listen at the door? (y/n): ");
    if (answer == "y" || answer == "Y") {
        int listen = roll(6);
        cout << "Listen: d6 = " << listen << ", need 1 or less." << endl;
        if (listen <= 1) {
            cout << "Scratching. Squeaks. Many small feet." << endl;
        } else {
            cout << "You hear only water, dripping somewhere." << endl;
        }
    }

    int need = 2 + str_mod;
    bool is_open = false;
    // NEW: this loop can end three ways: the door opens, you give up,
    // or the torch dies.
    while (!is_open) {
        answer = ask("Force the door? It takes one turn. (y/n): ");
        if (answer != "y" && answer != "Y") {
            cout << "You leave the door shut and climb back out." << endl;
            cout << "The delve is over for today." << endl;
            return 0;
        }
        int force = roll(6);
        cout << "Force: d6 = " << force << ", need " << need << " or less." << endl;
        if (force <= need) {
            cout << "The door bursts open with a crack like a dropped plank." << endl;
            is_open = true;
        } else {
            cout << "The door shudders and holds. The noise rolls away into the dark." << endl;
        }

        // The clock ticks. (The same block again. Stage 4 fixes that.)
        turn = turn + 1;
        torch = torch - 1;
        cout << "Turn " << turn << ". Torch: " << torch << " of 6." << endl;
        if (turn % 2 == 0) {
            int wander = roll(6);
            cout << "Wandering check: d6 = " << wander << ", need 1 or less." << endl;
            if (wander <= 1) {
                cout << "Something wet drags itself past in the dark. You hold still" << endl;
                cout << "until it is gone. The torch burns while you wait." << endl;
                torch = torch - 1;
                cout << "Torch: " << torch << " of 6." << endl;
            }
        }
        if (torch <= 0) {
            cout << "Your torch gutters out. In the dark you feel your way back to" << endl;
            cout << "the boat. The delve is over for today." << endl;
            return 0;
        }
    }

    cout << "In the dark beyond, five pairs of small red eyes turn toward you." << endl;
    cout << "You reached the oil store on turn " << turn << ", with " << torch
         << " turns of light left." << endl;
    cout << "END OF STAGE 3." << endl;
    return 0;
}
