// The First Delve - Stage 5: Five Rats
// Teaches: arrays, indexes, looping over an array, counting, break.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage5 stage5_five_rats.cpp
// Run:    ./stage5

#include <algorithm> // max
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

const int RAT_COUNT = 5;  // the pinned room: giant rats x5
const int RAT_AC = 12;    // AC 7 [12]
const int RAT_BITE = 3;   // bite 1d3
const int RAT_FLEE = 2;   // ML 8: in this room the pack breaks when 2 lie dead
const int DOORWAY = 2;    // you hold the doorway, so only 2 rats reach you each round

bool is_yes(const string& answer) {
    return answer == "y" || answer == "Y";
}

// Roll a d6. Succeed on in_six or less.
bool check(int in_six) {
    int die = roll(6);
    string word = die <= in_six ? "yes" : "no";  // a one-line if / else
    cout << "d6 = " << die << ", need " << in_six << " or less: " << word << "." << endl;
    return die <= in_six;
}

// Roll d20 + bonus. Hit if the total is at least ac.
bool attack(int bonus, int ac) {
    int die = roll(20);
    string word = die + bonus >= ac ? "hit" : "miss";
    cout << "d20 = " << die << ", total " << die + bonus << " vs AC " << ac
         << ": " << word << "." << endl;
    return die + bonus >= ac;
}

// One turn passes. Every second turn, check for wanderers.
void tick(int& turn, int& torch) {
    turn = turn + 1;
    torch = torch - 1;
    cout << "Turn " << turn << ". Torch: " << torch << " of 6." << endl;
    if (turn % 2 == 0) {
        cout << "Wandering check: ";
        if (check(1)) {
            cout << "Something wet drags itself past in the dark. You wait." << endl;
            torch = torch - 1;
            cout << "Torch: " << torch << " of 6." << endl;
        }
    }
}

// The C2 fight. Returns "won", "ran" or "dead".
string fight_rats(int hp, int ac, int bonus, int die, bool has_sleep) {
    int rat_hp[RAT_COUNT] = {2, 3, 1, 4, 2};  // NEW: an array holds many values, one per rat
    bool asleep[RAT_COUNT] = {};              // NEW: a second array; {} sets all to false
    int round_no = 0;
    while (true) {
        round_no = round_no + 1;
        cout << "Round " << round_no << ". You: " << hp << " hp. Rats:";
        for (int i = 0; i < RAT_COUNT; i++) {  // NEW: i takes the values 0, 1, 2, 3, 4
            if (rat_hp[i] <= 0) {
                cout << " x";
            } else if (asleep[i]) {
                cout << " z";
            } else {
                cout << " " << rat_hp[i];
            }
        }
        cout << "   (x dead, z asleep)" << endl;
        string pick;
        if (has_sleep) {
            pick = ask("1 fight, 2 run, 3 cast Sleep: ");
        } else {
            pick = ask("1 fight, 2 run: ");
        }

        if (pick == "2") {
            cout << "You back up the stair. The rats do not follow." << endl;
            return "ran";
        } else if (pick == "3" && has_sleep) {
            has_sleep = false;
            int budget = roll(8) + roll(8);  // Sleep affects 2d8 Hit Dice of creatures
            cout << "You speak the word of Sleep. 2d8 = " << budget << "." << endl;
            for (int i = 0; i < RAT_COUNT; i++) {
                if (rat_hp[i] > 0 && budget > 0) {
                    asleep[i] = true;
                    budget = budget - 1;  // each rat counts as 1 HD
                }
            }
        } else {
            int target = -1;
            for (int i = 0; i < RAT_COUNT; i++) {  // NEW: search the array for the first live rat
                if (rat_hp[i] > 0) {
                    target = i;
                    break;  // NEW: found it; stop looking
                }
            }
            cout << "You strike at rat " << target + 1 << ". ";  // people count from 1
            if (asleep[target]) {
                cout << "It is asleep. One blow kills it." << endl;
                rat_hp[target] = 0;
            } else if (attack(bonus, RAT_AC)) {
                int damage = max(1, roll(die) + bonus);
                rat_hp[target] = rat_hp[target] - damage;
                cout << "You deal " << damage << " damage." << endl;
                if (rat_hp[target] <= 0) {
                    cout << "Rat " << target + 1 << " dies." << endl;
                }
            }
        }

        int dead = 0;
        for (int i = 0; i < RAT_COUNT; i++) {  // NEW: count the items that pass a test
            if (rat_hp[i] <= 0) {
                dead = dead + 1;
            }
        }
        if (dead >= RAT_FLEE) {
            cout << dead << " rats lie dead. The pack breaks. The rest flee down the far stair." << endl;
            return "won";
        }

        int biters = 0;
        for (int i = 0; i < RAT_COUNT; i++) {  // the first DOORWAY rats that are awake bite
            if (rat_hp[i] > 0 && !asleep[i] && biters < DOORWAY) {
                biters = biters + 1;
                cout << "Rat " << i + 1 << " bites. ";
                if (attack(0, ac)) {
                    int bite = roll(RAT_BITE);
                    hp = hp - bite;
                    cout << "You lose " << bite << " hp." << endl;
                    if (hp <= 0) {
                        cout << "You fall among the broken jars. The rats close in." << endl;
                        return "dead";
                    }
                }
            }
        }
    }
}

int main() {
    seed_dice(ask("Seed? "));
    cout << endl;
    cout << "THE FIRST DELVE - Stage 5: five rats" << endl;
    cout << endl;
    cout << "Who rows to the island?" << endl;
    cout << "  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell" << endl;
    cout << "  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1" << endl;
    string hero = "the Wizard";
    int hp = 4;
    int ac = 10;        // AC 9 [10]: we use the ascending number
    int str_mod = -1;
    int die = 4;        // dagger 1d4
    bool has_sleep = true;
    if (ask("Pick 1 or 2: ") == "2") {
        hero = "the Fighter";
        hp = 8;
        ac = 15;        // AC 4 [15]
        str_mod = 1;
        die = 8;        // sword 1d8
        has_sleep = false;
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
        tick(turn, torch);
        if (torch <= 0) {
            cout << "Your torch gutters out. You feel your way back to the boat." << endl;
            return 0;
        }
    }

    cout << endl;
    cout << "C1. THE CELLAR STAIR. Twenty feet down, an oak door. It is stuck." << endl;
    if (is_yes(ask("Listen at the door? (y/n): "))) {
        cout << "Listen: ";
        if (check(1)) {
            cout << "Scratching. Squeaks. Many small feet." << endl;
        } else {
            cout << "You hear only water, dripping somewhere." << endl;
        }
    }
    bool is_open = false;
    while (!is_open) {
        if (!is_yes(ask("Force the door? It takes one turn. (y/n): "))) {
            cout << "You leave the door shut and climb back out." << endl;
            return 0;
        }
        cout << "Force: ";
        is_open = check(2 + str_mod);
        if (is_open) {
            cout << "The door bursts open with a crack like a dropped plank." << endl;
        } else {
            cout << "The door shudders and holds. The noise rolls into the dark." << endl;
        }
        tick(turn, torch);
        if (torch <= 0) {
            cout << "Your torch gutters out. You feel your way back to the boat." << endl;
            return 0;
        }
    }

    cout << endl;
    cout << "C2. THE OIL STORE. Racks of broken oil jars. The floor is tacky." << endl;
    cout << "Five giant rats, each the size of a cat, lift their heads from the spill." << endl;
    cout << "You hold the doorway. Only two rats can reach you at a time." << endl;
    string result = fight_rats(hp, ac, str_mod, die, has_sleep);
    if (result != "won") {
        cout << "The delve is over for today." << endl;
        return 0;
    }
    tick(turn, torch);  // the fight and the breath after it: one turn
    if (torch <= 0) {
        cout << "Your torch gutters out. You feel your way back to the boat." << endl;
        return 0;
    }
    cout << "In one rack, five flasks of oil are still whole. You take them." << endl;
    cout << endl;
    cout << "C3. THE FLOODED STAIR. A second stair goes down into black water." << endl;
    cout << "As you watch, the water climbs one step, as if the lake took a breath." << endl;
    cout << "The first delve ends here, on turn " << turn << ". Torch: " << torch << " of 6." << endl;
    cout << "END OF STAGE 5." << endl;
    return 0;
}
