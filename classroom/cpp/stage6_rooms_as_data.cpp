// The First Delve - Stage 6: Rooms as Data
// Teaches: structs, a vector of structs, a game loop that walks a graph of
// rooms, and the exploration turn as one procedure.
// Build:  g++ -std=c++17 -Wall -Wextra -o stage6 stage6_rooms_as_data.cpp
// Run:    ./stage6

#include <algorithm> // max
#include <cstdint>   // uint32_t: an unsigned 32-bit whole number
#include <cstdlib>   // exit, getenv
#include <iostream>
#include <string>
#include <vector>    // NEW: vector, an array that can grow
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

const int JETTY = 0;  // each room's place in the rooms vector
const int TOWER = 1;
const int COTTAGE = 2;
const int STAIR = 3;
const int STORE = 4;
const int FLOODED = 5;

struct Room {  // NEW: one struct holds every fact about one room
    string key;        // the map key, like "S2"
    string name;
    string text;       // read aloud on the first visit
    vector<int> exits; // NEW: the indexes of the rooms you can walk to
    bool is_open;      // false until you find it or force your way in
    bool visited;
};

struct Hero {
    string name;
    int hp;
    int ac;        // ascending AC
    int str_mod;
    int die;       // weapon damage die
    bool has_sleep;
};

struct Game {  // NEW: a struct can hold other structs and vectors
    Hero hero;
    vector<Room> rooms;
    int here;      // index of the room you stand in
    int turn;
    int torch;
    vector<int> rat_hp;
    vector<bool> rat_asleep;  // kept here, so the rats stay asleep if you leave and come back
    bool rats_fled;
    bool over;
};

vector<Room> make_rooms() {
    return {  // NEW: a vector of Room structs. The exits make the map.
        {"S1", "The Broken Jetty",
         "Half the jetty lies in the lake. A rope burn on a post is fresh:\n"
         "someone else lands here. Out past the end, a long shadow moves\n"
         "under the water, and is gone.", {TOWER}, true, false},
        {"S2", "The Tower Shell",
         "A round shell of stone, thirty feet across, open to the sky.\n"
         "Rubble covers the floor. A stair climbs the wall to a broken top.\n"
         "Crows watch you with the calm of tax collectors.",
         {JETTY, COTTAGE, STAIR}, true, false},
        {"S3", "The Keeper's Cottage",
         "No roof. Ash in the hearth, less than a week old. A tin of lamp\n"
         "oil. On the door, a chalked eye with a line through it.",
         {TOWER}, true, false},
        {"C1", "The Cellar Stair",
         "A stone stair goes down twenty feet to an oak door, swollen in\n"
         "its frame. It is stuck.", {TOWER, STORE}, false, false},
        {"C2", "The Oil Store",
         "Racks of broken oil jars. The floor is tacky. Five giant rats,\n"
         "each the size of a cat, lift their heads from the spill.",
         {STAIR, FLOODED}, false, false},
        {"C3", "The Flooded Stair",
         "A second stair goes down into black water. As you watch, the\n"
         "water climbs one step, as if the lake took a breath.",
         {STORE}, true, false},
    };
}

bool check(int in_six) {
    int die = roll(6);
    string word = die <= in_six ? "yes" : "no";
    cout << "d6 = " << die << ", need " << in_six << " or less: " << word << "." << endl;
    return die <= in_six;
}

bool attack(int bonus, int ac) {
    int die = roll(20);
    string word = die + bonus >= ac ? "hit" : "miss";
    cout << "d20 = " << die << ", total " << die + bonus << " vs AC " << ac
         << ": " << word << "." << endl;
    return die + bonus >= ac;
}

// The C2 fight, as in stage 5. Returns "won", "ran" or "dead".
string fight_rats(Game& game) {
    Hero& hero = game.hero;          // NEW: a reference: another name, not a copy
    vector<int>& rats = game.rat_hp;
    int count = int(rats.size());
    vector<bool>& asleep = game.rat_asleep;  // a reference too: Sleep lasts past a retreat
    cout << "You hold the doorway. Only two rats can reach you at a time." << endl;
    while (true) {
        cout << "You: " << hero.hp << " hp. Rats:";
        for (int i = 0; i < count; i++) {
            if (rats[i] <= 0) {
                cout << " x";
            } else if (asleep[i]) {
                cout << " z";
            } else {
                cout << " " << rats[i];
            }
        }
        cout << "   (x dead, z asleep)" << endl;
        string pick;
        if (hero.has_sleep) {
            pick = ask("1 fight, 2 run, 3 cast Sleep: ");
        } else {
            pick = ask("1 fight, 2 run: ");
        }
        if (pick == "2") {
            cout << "You back up the stair. The rats do not follow." << endl;
            return "ran";
        } else if (pick == "3" && hero.has_sleep) {
            hero.has_sleep = false;
            int budget = roll(8) + roll(8);
            cout << "You speak the word of Sleep. 2d8 = " << budget << "." << endl;
            for (int i = 0; i < count; i++) {
                if (rats[i] > 0 && budget > 0) {
                    asleep[i] = true;
                    budget = budget - 1;
                }
            }
        } else {
            int target = 0;
            while (rats[target] <= 0) {
                target = target + 1;
            }
            cout << "You strike at rat " << target + 1 << ". ";
            if (asleep[target]) {
                cout << "It is asleep. One blow kills it." << endl;
                rats[target] = 0;
            } else if (attack(hero.str_mod, 12)) {
                int damage = max(1, roll(hero.die) + hero.str_mod);
                rats[target] = rats[target] - damage;
                cout << "You deal " << damage << " damage." << endl;
                if (rats[target] <= 0) {
                    cout << "Rat " << target + 1 << " dies." << endl;
                }
            }
        }
        int dead = 0;
        for (int hp : rats) {  // NEW: loop over the values themselves, not the indexes
            if (hp <= 0) {
                dead = dead + 1;
            }
        }
        if (dead >= 2) {
            cout << "The pack breaks. The rest flee down the far stair." << endl;
            return "won";
        }
        int biters = 0;
        for (int i = 0; i < count; i++) {
            if (rats[i] > 0 && !asleep[i] && biters < 2) {
                biters = biters + 1;
                cout << "Rat " << i + 1 << " bites. ";
                if (attack(0, hero.ac)) {
                    int bite = roll(3);
                    hero.hp = hero.hp - bite;
                    cout << "You lose " << bite << " hp." << endl;
                    if (hero.hp <= 0) {
                        cout << "You fall among the broken jars. The rats close in." << endl;
                        return "dead";
                    }
                }
            }
        }
    }
}

void describe(Game& game) {
    Room& room = game.rooms[game.here];
    cout << endl;
    cout << room.key << ". " << room.name << endl;
    if (!room.visited) {
        cout << room.text << endl;
        room.visited = true;  // NEW: change one field of one struct
    }
}

// Walking to the next room takes less than a turn. Returns turns used.
int walk(Game& game, int to) {
    game.here = to;
    describe(game);
    if (to == STORE && !game.rats_fled) {
        string result = fight_rats(game);
        if (result == "won") {
            game.rats_fled = true;
            cout << "In one rack, five flasks of oil are still whole. You take them." << endl;
        } else if (result == "ran") {
            game.here = STAIR;
        } else {
            game.over = true;
        }
        return 1;  // a fight and the breath after it take a turn
    }
    if (to == FLOODED) {
        cout << endl;
        cout << "WHAT YOU LEARNED" << endl;
        cout << "- Light is time. The torch is a clock you can see." << endl;
        cout << "- Searching finds things, and it costs a turn." << endl;
        cout << "- Listen before you open a door. Forcing it makes noise." << endl;
        cout << "- Every second turn, the dungeon rolls against you." << endl;
        cout << "- Monsters run when the fight turns against them." << endl;
        cout << "The first delve ends here, on turn " << game.turn << ". END OF STAGE 6." << endl;
        game.over = true;
    }
    return 0;
}

// PLAN: show where you are and what you can do. Free: no time passes.
// Returns the rooms you can walk to, in the order shown.
vector<int> plan(Game& game) {
    vector<Room>& rooms = game.rooms;
    cout << "[" << rooms[game.here].key << "] Turn " << game.turn << ". Torch: "
         << game.torch << " of 6. HP: " << game.hero.hp << "." << endl;
    vector<int> choices;
    for (int to : rooms[game.here].exits) {  // NEW: walk the exits of this room
        if (rooms[to].is_open) {
            choices.push_back(to);  // NEW: grow a vector one item at a time
            cout << "  " << choices.size() << ". Go to " << rooms[to].key << " "
                 << rooms[to].name << endl;
        }
    }
    if (game.here == TOWER && !rooms[STAIR].is_open) {
        cout << "  s. Search the rubble (1 turn)" << endl;
    }
    if (game.here == TOWER) {
        cout << "  c. Climb the stair (1 turn)" << endl;
    }
    if (game.here == STAIR && !rooms[STORE].is_open) {
        cout << "  l. Listen at the door" << endl;
        cout << "  f. Force the door (1 turn)" << endl;
    }
    return choices;
}

// EXECUTE: do the one action the player declared. Returns turns used.
int execute(Game& game, const vector<int>& choices, const string& answer) {
    vector<Room>& rooms = game.rooms;
    if (answer.size() == 1 && answer[0] >= '1' && answer[0] <= '9'
        && answer[0] - '0' <= int(choices.size())) {
        return walk(game, choices[answer[0] - '1']);  // people count from 1
    }
    if (game.here == TOWER && answer == "s" && !rooms[STAIR].is_open) {
        cout << "You shift stones for ten minutes. Under them lies a trapdoor." << endl;
        rooms[STAIR].is_open = true;
        return 1;
    }
    if (game.here == TOWER && answer == "c") {
        cout << "From the top: the whole island, and a boat-shaped shadow at the" << endl;
        cout << "north cliff." << endl;
        return 1;
    }
    if (game.here == STAIR && answer == "l" && !rooms[STORE].is_open) {
        cout << "Listen: ";
        if (check(1)) {
            cout << "Scratching. Squeaks. Many small feet." << endl;
        } else {
            cout << "You hear only water, dripping somewhere." << endl;
        }
        return 0;
    }
    if (game.here == STAIR && answer == "f" && !rooms[STORE].is_open) {
        cout << "Force: ";
        if (check(2 + game.hero.str_mod)) {
            cout << "The door bursts open with a crack like a dropped plank." << endl;
            rooms[STORE].is_open = true;
        } else {
            cout << "The door shudders and holds. The noise rolls into the dark." << endl;
        }
        return 1;
    }
    cout << "You cannot do that here." << endl;
    return 0;
}

// WANDER: d6, and on a 1 something comes.
void wander(Game& game) {
    cout << "Wandering check: ";
    if (check(1)) {
        cout << "Something wet drags itself past in the dark. You wait." << endl;
        game.torch = game.torch - 1;
    }
}

// The Turn Is a Procedure. Module 2 writes the exploration turn in Logo:
//   TO TURN
//     PLAN                                  ; talk, look, ask: no dice, no time
//     EXECUTE                               ; the caller says it; one action each
//     MAKE "CLOCK :CLOCK + 1                ; tick a box: ten minutes pass
//     BURN 1                                ; every lit torch loses a turn
//     IF 0 = REMAINDER :CLOCK 2 [WANDER]    ; d6, and on a 1 something comes
//     IF 0 = REMAINDER :CLOCK 6 [REST]      ; rest now, or -1 to hit and damage
//     IF FIGHTING? [ROUNDS]                 ; a fight runs in rounds
//     IF BELOW? [TURN]                      ; do it again until the party climbs out
//   END
// turn() below follows it line by line.
void turn(Game& game) {  // NEW: one function for one whole turn
    vector<int> choices = plan(game);                           // PLAN
    int used = execute(game, choices, ask("What do you do? "));  // EXECUTE (a fight runs
    if (used == 0 || game.over) {                               //   its ROUNDS in here)
        return;  // looking and walking are free: no time passes
    }
    game.turn = game.turn + 1;                                  // MAKE "CLOCK :CLOCK + 1
    cout << "Ten minutes pass." << endl;
    game.torch = game.torch - 1;                                // BURN 1
    if (game.turn % 2 == 0) {                                   // IF 0 = REMAINDER :CLOCK 2
        wander(game);                                           //   [WANDER]
    }
    // IF 0 = REMAINDER :CLOCK 6 [REST]: one torch dies by turn 6, so we leave it out.
    if (game.torch <= 0) {
        cout << "Your torch gutters out. You feel your way back to the boat." << endl;
        game.over = true;
    }
    // IF BELOW? [TURN]: Logo calls TURN again. main() uses a while loop instead.
}

int main() {
    seed_dice(ask("Seed? "));
    cout << endl;
    cout << "THE FIRST DELVE - Stage 6: rooms as data" << endl;
    cout << "  1. The Wizard: 4 hp, AC 9 [10], dagger 1d4, STR -1, one Sleep spell" << endl;
    cout << "  2. The Fighter: 8 hp, AC 4 [15], sword 1d8, STR +1" << endl;
    Hero hero;
    if (ask("Pick 1 or 2: ") == "2") {
        hero = {"the Fighter", 8, 15, 1, 8, false};  // NEW: fill a struct in one line
    } else {
        hero = {"the Wizard", 4, 10, -1, 4, true};
    }
    Game game = {hero, make_rooms(), JETTY, 0, 6, {2, 3, 1, 4, 2}, {false, false, false, false, false}, false, false};
    cout << "You are " << game.hero.name << ". Captain Maren rows you to the Isle of Old" << endl;
    cout << "Stone at sunset. You light a torch. It will burn 6 turns." << endl;
    describe(game);
    while (!game.over) {  // REPEAT the turn until the delve ends
        turn(game);
    }
    return 0;
}
