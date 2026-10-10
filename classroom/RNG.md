# The Dice Machine (RNG spec)

Every stage of *The First Delve* rolls its dice with the same small machine, written by hand in Python and in C++. Given the same seed, both programs roll the same numbers in the same order. That is why the two versions print the same bytes.

## Why we wrote our own

| Reason | What it means |
|--------|---------------|
| **Same rolls in two languages** | Python's `random` and C++'s `<random>` and `rand()` use different methods. Seed both with 42 and they still roll different numbers. Our machine is 6 lines of plain arithmetic, so it does the same thing in any language. |
| **Test vectors** | A test vector is a known input and an exact expected output. With a fixed seed, the whole game is a pure function of the typed lines. We can store the expected transcript and check it to the byte. |
| **No hidden parts** | Students can read every line. Nothing comes from a library they cannot open. |
| **Same as the browser** | The numbers match the usual JavaScript `mulberry32` (with `Math.imul`), so a web page can share our seeds. |

Mulberry32 is fine for games and classroom work. It is not for passwords, keys or anything secret.

## The spec

1. **State.** One unsigned 32-bit number. It starts at 0.
2. **Seed.** Read the first input line (`Seed? `). Start from 0. For each character `0` to `9`, in order: `state = state * 10 + digit`, kept to 32 bits. Skip any other character. So `42`, ` 42 ` and `seed 4-2` all give 42, and an empty line gives 0.
3. **Step** (`next_u32`). All arithmetic is modulo 2^32:
   ```
   state = state + 0x6D2B79F5
   t = state
   t = (t XOR (t >> 15)) * (t OR 1)
   t = t XOR (t + (t XOR (t >> 7)) * (t OR 61))
   return t XOR (t >> 14)
   ```
4. **Roll.** `roll(sides) = 1 + (next_u32() % sides)`. One call to `next_u32` for each die.

The modulo makes faces with a low number a tiny bit more likely (by less than one in 700 million for a d20). For a game, that does not matter. It is a good question for a strong student.

## Side by side

The same machine in each language. Only the 32-bit bookkeeping differs.

**Python**

```python
MASK = 0xFFFFFFFF
dice_state = 0


def seed_dice(text):
    global dice_state
    dice_state = 0
    for ch in text:
        if "0" <= ch <= "9":
            dice_state = (dice_state * 10 + int(ch)) & MASK


def next_u32():
    global dice_state
    dice_state = (dice_state + 0x6D2B79F5) & MASK
    t = dice_state
    t = ((t ^ (t >> 15)) * (t | 1)) & MASK
    t = (t ^ (t + (((t ^ (t >> 7)) * (t | 61)) & MASK))) & MASK
    return t ^ (t >> 14)


def roll(sides):
    return 1 + next_u32() % sides
```

**C++**

```cpp
#include <cstdint>
uint32_t dice_state = 0;

void seed_dice(const string& text) {
    dice_state = 0;
    for (char ch : text) {
        if (ch >= '0' && ch <= '9') {
            dice_state = dice_state * 10 + uint32_t(ch - '0');
        }
    }
}

uint32_t next_u32() {
    dice_state += 0x6D2B79F5u;
    uint32_t t = dice_state;
    t = (t ^ (t >> 15)) * (t | 1u);
    t ^= t + (t ^ (t >> 7)) * (t | 61u);
    return t ^ (t >> 14);
}

int roll(int sides) {
    return 1 + int(next_u32() % uint32_t(sides));
}
```

## Why the two look different

| Point | Python | C++ |
|-------|--------|-----|
| Size of a whole number | No limit. `0xFFFFFFFF * 0xFFFFFFFF` is a 64-bit answer. | `uint32_t` holds exactly 32 bits. |
| Keeping 32 bits | We must write `& MASK` after every add and multiply. | Unsigned arithmetic wraps by itself (modulo 2^32). This is defined behaviour for unsigned types. |
| Danger | Forget one `& MASK` and the numbers drift apart from C++ after a few rolls. | Use `int` instead of `uint32_t` and overflow is *undefined behaviour*: the compiler may do anything. |
| Changing a global | `global dice_state` inside the function. Without it, Python makes a new local variable. | A global variable can be changed from any function. |
| Digit to number | `int(ch)` | `ch - '0'` (characters are small numbers; `'7' - '0'` is 7) |

## Test vectors

Check your own port against these. Each list is the first five values of `next_u32()` after `seed_dice(seed)`.

| Seed text | State after seeding | `next_u32()` x 5 |
|-----------|--------------------|------------------|
| `0` | 0 | 1144304738, 1416247, 958946056, 627933444, 2007157716 |
| `1` | 1 | 2693262067, 11749833, 2265367787, 4213581821, 4159151403 |
| `42` | 42 | 2581720956, 1925393290, 3661312704, 2876485805, 750819978 |
| `2026` | 2026 | 1955961175, 1324980858, 2839649622, 2656330836, 654038057 |
| `seed 4-2` | 42 | same as `42` |
| `99999999999` | 1215752191 (kept to 32 bits) | 3437184645, 960759772, 1596815116, 2615148029, 4161672566 |

Dice after `seed_dice("42")`:

| Call | Results |
|------|---------|
| `roll(6)` x 10 | 1, 5, 1, 6, 1, 4, 5, 6, 1, 4 |
| `roll(20)` x 10 (fresh seed) | 17, 11, 5, 6, 19, 8, 1, 18, 11, 6 |

The same values come from this JavaScript, which is the usual published form:

```js
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0);
  };
}
```

## Rules for keeping parity

- Roll dice in the same order in both languages. Python works out `a + b` left to right. C++ does not promise which side of `+` runs first. `roll(8) + roll(8)` is still safe: both dice are the same size and we use only the sum. If you print each die, or add dice of different sizes, store each roll in its own variable first, as stage 1 does with the gold.
- Never use Python `random`, C++ `rand()` or `<random>` in these programs.
- Print with the same text and the same spacing. `print()` ends with `"\n"`; so does `endl`.
