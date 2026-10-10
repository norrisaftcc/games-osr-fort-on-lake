// The First Delve - Stage 4: Dice as Functions
// Teaches: writing functions, parameters, return values, reference parameters.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage4 stage4_dice_functions.cpp
// Run:    ./stage4

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
// Look back at the toolbox: roll(sides) is a function. "sides" is its
// parameter, and "return" hands the answer back. Now we write our own.

// True if the player typed y or Y.
bool is_yes(const string& answer) {  // NEW: a function that returns a bool
    return answer == "y" || answer == "Y";
}

// Roll a d6. Succeed on in_six or less: check(1) is "1-in-6".
bool check(int in_six) {  // NEW: in_six is a parameter; the caller fills it in
    int die = roll(6);
    bool success = die <= in_six;
    if (success) {
        cout << "d6 = " << die << ", need " << in_six << " or less: yes." << endl;
    } else {
        cout << "d6 = " << die << ", need " << in_six << " or less: no." << endl;
    }
    return success;  // NEW: hand the answer back to the caller
}

// Roll d20 + bonus. Hit if the total is at least the target's AC.
bool attack(int bonus, int ac) {  // NEW: two parameters
    int die = roll(20);
    int total = die + bonus;
    bool hit = total >= ac;
    if (hit) {
        cout << "d20 = " << die << ", total " << total << " vs AC " << ac << ": hit." << endl;
    } else {
        cout << "d20 = " << die << ", total " << total << " vs AC " << ac << ": miss." << endl;
    }
    return hit;
}

// One turn passes. Every second turn, check for wanderers.
// NEW: the & makes turn and torch references: names for the caller's own
// variables. When tick changes them, the caller's variables change.
void tick(int& turn, int& torch) {
    turn = turn + 1;
    torch = torch - 1;
    cout << "Turn " << turn << ". Torch: " << torch << " of 6." << endl;
    if (turn % 2 == 0) {
        cout << "Wandering check: ";  // no endl keeps the line open for check()
        if (check(1)) {
            cout << "Something wet drags itself past in the dark. You hold still" << endl;
            cout << "until it is gone. The torch burns while you wait." << endl;
            torch = torch - 1;
            cout << "Torch: " << torch << " of 6." << endl;
        }
    }
}

void torch_out() {  // NEW: void means the function returns no value
    cout << "Your torch gutters out. In the dark you feel your way back to" << endl;
    cout << "the boat. The delve is over for today." << endl;
}

int main() {
    seed_dice(ask("Seed? "));
    cout << endl;
    cout << "THE FIRST DELVE - Stage 4: dice as functions" << endl;
    cout << endl;
    cout << "Who rows to the island?" << endl;
    cout << "  1. The Wizard: 4 hit points, AC 9 [10], STR 8" << endl;
    cout << "  2. The Fighter: 8 hit points, AC 4 [15], STR 14" << endl;
    string hero = "the Wizard";
    int str_mod = -1;
    if (ask("Pick 1 or 2: ") == "2") {
        hero = "the Fighter";
        str_mod = 1;
    }
    cout << "You are " << hero << "." << endl;
    int turn = 0;
    int torch = 6;

    cout << endl;
    cout << "The Fort docks. Captain Maren sends you to the Isle of Old Stone." << endl;
    cout << "S1. THE BROKEN JETTY. A fresh rope burn on a post. A shadow in the water." << endl;
    cout << "The sun sets. You light a torch. It will burn " << torch << " turns." << endl;
    cout << "S2. THE TOWER SHELL. Rubble, a stair up the wall, and crows." << endl;

    bool found = false;
    while (!found) {
        cout << "What do you do? Each choice takes one turn." << endl;
        cout << "  1. Search the rubble   2. Climb the stair   3. Look in the cottage" << endl;
        string pick = ask("Pick 1, 2 or 3: ");
        if (pick == "1") {
            cout << "Under the rubble lies a trapdoor of black oak." << endl;
            found = true;
        } else if (pick == "2") {
            cout << "From the top: a boat-shaped shadow at the north cliff." << endl;
        } else if (pick == "3") {
            cout << "S3. THE KEEPER'S COTTAGE. Week-old ash. A chalked eye, crossed out." << endl;
        } else {
            cout << "Pick 1, 2 or 3." << endl;
            continue;
        }
        tick(turn, torch);  // NEW: one call replaces 12 copied lines
        if (torch <= 0) {
            torch_out();
            return 0;
        }
    }

    cout << endl;
    cout << "C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck." << endl;
    if (is_yes(ask("Listen at the door? (y/n): "))) {
        cout << "Listen: ";
        if (check(1)) {  // 1-in-6. Elves, dwarves and halflings would use check(2).
            cout << "Scratching. Squeaks. Many small feet." << endl;
        } else {
            cout << "You hear only water, dripping somewhere." << endl;
        }
    }

    bool is_open = false;
    while (!is_open) {
        if (!is_yes(ask("Force the door? It takes one turn. (y/n): "))) {
            cout << "You leave the door shut and climb back out." << endl;
            cout << "The delve is over for today." << endl;
            return 0;
        }
        cout << "Force: ";
        is_open = check(2 + str_mod);  // NEW: the argument can be an expression
        if (is_open) {
            cout << "The door bursts open with a crack like a dropped plank." << endl;
        } else {
            cout << "The door shudders and holds. The noise rolls away into the dark." << endl;
        }
        tick(turn, torch);
        if (torch <= 0) {
            torch_out();
            return 0;
        }
    }

    cout << "C2. THE OIL STORE. Five giant rats lift their heads. One leaps." << endl;
    cout << "You strike first. ";
    if (attack(str_mod, 12)) {  // rats have AC 7 [12]
        cout << "Your blow throws it back among the jars." << endl;
    } else {
        cout << "You miss. Its teeth close on your boot." << endl;
    }
    cout << "The whole fight with all five rats is stage 5." << endl;
    cout << "END OF STAGE 4." << endl;
    return 0;
}
