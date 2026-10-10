#!/usr/bin/env bash
# check.sh - build and test every stage of The First Delve in both languages.
#
#   ./check.sh          check everything; exit 0 only if all is well
#   ./check.sh --regen  rewrite test_vectors/*.out from the Python version,
#                       then check everything (C++ must match the new files)
#
# It fails on: any compiler warning, any crash or non-zero exit, a run that
# does not end within 10 seconds, any difference between Python and C++
# output, any difference from the expected file, and any non-ASCII byte.

set -u
cd "$(dirname "$0")" || exit 1

BUILD="$(mktemp -d)"
trap 'rm -rf "$BUILD"' EXIT
failures=0
fail() { echo "FAIL: $*"; failures=$((failures + 1)); }

TIMEOUT=""
if command -v timeout >/dev/null 2>&1; then TIMEOUT="timeout 10"; fi

# 1. Compile every C++ stage. -Werror turns each warning into an error.
compiled=0
for src in cpp/stage*.cpp; do
    name="$(basename "$src" .cpp)"
    if g++ -std=c++17 -Wall -Wextra -Werror -o "$BUILD/$name" "$src" 2> "$BUILD/$name.log"; then
        compiled=$((compiled + 1))
    else
        fail "compile $src"
        cat "$BUILD/$name.log"
    fi
done
echo "C++: $compiled stages compiled with -Wall -Wextra -Werror"

# 2. Check every Python stage compiles. Run pyflakes if it is installed.
if python3 - "$BUILD" python/stage*.py <<'EOF'
import py_compile, sys
for f in sys.argv[2:]:
    py_compile.compile(f, cfile=sys.argv[1] + "/check.pyc", doraise=True)
EOF
then
    echo "Python: $(ls python/stage*.py | wc -l | tr -d ' ') stages pass py_compile"
else
    fail "py_compile"
fi
if python3 -m pyflakes --version >/dev/null 2>&1; then
    if python3 -m pyflakes python/stage*.py; then echo "Python: pyflakes clean"; else fail "pyflakes"; fi
fi

# 3. ASCII only, so byte parity holds and old Windows consoles cope.
if ! python3 - python/stage*.py cpp/stage*.cpp test_vectors/* <<'EOF'
import sys
bad = [f for f in sys.argv[1:] if any(b > 127 for b in open(f, "rb").read())]
for f in bad:
    print("non-ASCII byte in", f)
sys.exit(1 if bad else 0)
EOF
then
    fail "non-ASCII bytes"
fi

# run_one LANG STAGE INPUT OUTPUT ECHO: run one stage on one input file.
run_one() {
    local lang="$1" stage="$2" input="$3" output="$4" echo_on="$5" rc
    if [ "$lang" = py ]; then
        ECHO_INPUT="$echo_on" $TIMEOUT python3 -B python/"$stage"_*.py < "$input" > "$output" 2> "$output.err"
    else
        ECHO_INPUT="$echo_on" $TIMEOUT "$BUILD/$(basename cpp/"$stage"_*.cpp .cpp)" < "$input" > "$output" 2> "$output.err"
    fi
    rc=$?
    if [ "$rc" -ne 0 ]; then fail "$lang $(basename "$input") exit code $rc"; cat "$output.err"; return 1; fi
    if [ -s "$output.err" ]; then fail "$lang $(basename "$input") wrote to stderr"; cat "$output.err"; return 1; fi
    return 0
}

# 4. Run every test vector in both languages, with and without echo.
vectors=0
for input in test_vectors/*.in; do
    base="${input%.in}"
    vec="$(basename "$base")"
    stage="${vec%%_*}"   # "stage5_fighter_wins" -> "stage5"
    if [ "${1:-}" = "--regen" ]; then
        ECHO_INPUT=1 python3 -B python/"$stage"_*.py < "$input" > "$base.out"
    fi
    if [ ! -f "$base.out" ]; then fail "$vec has no .out file"; continue; fi
    for echo_on in 1 0; do
        run_one py "$stage" "$input" "$BUILD/py.txt" "$echo_on" || continue
        run_one cpp "$stage" "$input" "$BUILD/cpp.txt" "$echo_on" || continue
        if ! cmp -s "$BUILD/py.txt" "$BUILD/cpp.txt"; then
            fail "$vec (echo=$echo_on): Python and C++ differ"
            diff "$BUILD/py.txt" "$BUILD/cpp.txt" | head -20
        fi
        if [ "$echo_on" = 1 ] && ! cmp -s "$BUILD/py.txt" "$base.out"; then
            fail "$vec: output differs from $base.out"
            diff "$base.out" "$BUILD/py.txt" | head -20
        fi
    done
    vectors=$((vectors + 1))
done
echo "Vectors: $vectors run in Python and C++, with and without echo"

if [ "$failures" -eq 0 ]; then
    echo "ALL CHECKS PASSED"
    exit 0
fi
echo "$failures CHECK(S) FAILED"
exit 1
