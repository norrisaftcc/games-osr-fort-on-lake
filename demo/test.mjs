// The Drowned Tower demo: acceptance test.
// Run from the repo root:  node demo/test.mjs
// Optional: SHOTS=/some/dir node demo/test.mjs   (also saves screenshots at 1280px and 360px)
//
// Uses a global Playwright install (no package.json needed). Tries the default
// Chromium first, then the one at /opt/pw-browsers.
import { createRequire } from "module";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs";

const require = createRequire(import.meta.url);
let chromium;
for (const p of ["playwright", "/opt/node22/lib/node_modules/playwright/index.js"]) {
  try { ({ chromium } = require(p)); break; } catch (e) { /* try next */ }
}
if (!chromium) {
  const { execSync } = await import("child_process");
  ({ chromium } = require(execSync("npm root -g").toString().trim() + "/playwright"));
}

const here = path.dirname(fileURLToPath(import.meta.url));
const FILE = pathToFileURL(path.join(here, "index.html")).href;
const SEEDS = [1, 7, 42, 2026, 99991];
const MAX_DEPTH = 90;          // longest choice sequence we will follow
const MAX_NODES = 400000;      // per seed, a safety valve only
const CHARS = ["wizard", "elfMinister", "paladin", "gnome", "fighter", "elf"];

let browser;
try { browser = await chromium.launch(); }
catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" }); }

const errs = [];
const fails = [];
const watch = page => {
  page.on("console", m => { if (["error", "warning"].includes(m.type())) errs.push(m.type() + ": " + m.text()); });
  page.on("pageerror", e => errs.push("pageerror: " + String(e)));
};

const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await ctx.newPage();
watch(page);

/* ---------------------------------------------------------------------------
   1. Breadth-first walk of every path, for every seed, inside the page.
   Each node is a saved game state. We restore it, click each visible choice
   button (the real handlers), and keep any state we have not seen. States are
   compared by DEMO.sig(): everything that can change what happens next, but not
   the dice position, so the walk ends. Dice make paths branch; the seed makes
   them repeat.
   ------------------------------------------------------------------------- */
const allScenes = new Set(), allEndings = new Set();
const sceneText = {};
const replays = [];
let totalNodes = 0, totalEdges = 0, totalEndArrivals = 0;
const endingsByChar = {};

for (const seed of SEEDS) {
  await page.goto(FILE + "?seed=" + seed);
  const r = await page.evaluate(({ MAX_DEPTH, MAX_NODES }) => {
    const D = window.DEMO;
    const out = { nodes: 0, edges: 0, endArrivals: 0, scenes: {}, endings: {}, dead: [], overflow: [], cardFail: [], deep: false,
                  text: {}, samples: {}, endByChar: {} };
    const seen = new Set();
    const root = D.snapshot();
    seen.add(D.sig());
    let queue = [{ snap: root, path: [] }];
    const html = document.documentElement;
    while (queue.length) {
      const next = [];
      for (const node of queue) {
        if (out.nodes >= MAX_NODES) { out.deep = true; break; }
        out.nodes++;
        D.restore(node.snap);
        const st = D.state, id = st.scene, sc = STORY[id];
        out.scenes[id] = (out.scenes[id] || 0) + 1;
        if (!out.text[id]) out.text[id] = document.getElementById("card").innerText;
        if (html.scrollWidth > html.clientWidth + 0) out.overflow.push(id + " (" + html.scrollWidth + "px) via " + node.path.join(""));
        const n = document.querySelectorAll("#choices button").length;
        if (sc.ending) {
          out.endings[id] = (out.endings[id] || 0) + 1;
          (out.endByChar[st.char] = out.endByChar[st.char] || {})[id] = true;
          if (n) out.dead.push("ending with choices: " + id);
          const card = document.getElementById("introcard");
          if (sc.ending !== "dead") {
            if (!card || !card.innerText.includes(CAST[st.char].name)) out.cardFail.push(id + " " + st.char);
          } else if (card) out.cardFail.push("card on death ending");
          const key = st.char + ":" + id;
          if (!out.samples[key]) out.samples[key] = { path: node.path, sig: D.sig() };
          continue;
        }
        if (n === 0) { out.dead.push("dead scene " + id + " via " + node.path.join("")); continue; }
        if (node.path.length >= MAX_DEPTH) { out.deep = true; continue; }
        for (let i = 0; i < n; i++) {
          D.restore(node.snap);
          document.querySelectorAll("#choices button")[i].click();
          out.edges++;
          if (STORY[D.state.scene].ending) out.endArrivals++;
          const sig = D.sig();
          if (seen.has(sig)) continue;
          seen.add(sig);
          next.push({ snap: D.snapshot(), path: node.path.concat(i + 1) });
        }
      }
      queue = next;
      if (out.deep && out.nodes >= MAX_NODES) break;
    }
    return out;
  }, { MAX_DEPTH, MAX_NODES });

  totalNodes += r.nodes; totalEdges += r.edges; totalEndArrivals += r.endArrivals;
  Object.keys(r.scenes).forEach(s => allScenes.add(s));
  Object.keys(r.endings).forEach(s => allEndings.add(s));
  Object.assign(sceneText, Object.fromEntries(Object.entries(r.text).filter(([k]) => !sceneText[k])));
  for (const [c, e] of Object.entries(r.endByChar)) { endingsByChar[c] = endingsByChar[c] || new Set(); Object.keys(e).forEach(x => endingsByChar[c].add(x)); }
  r.dead.forEach(x => fails.push("seed " + seed + ": " + x));
  r.overflow.slice(0, 5).forEach(x => fails.push("seed " + seed + ": horizontal overflow at 360px in " + x));
  r.cardFail.slice(0, 5).forEach(x => fails.push("seed " + seed + ": intro card missing or wrong on " + x));
  if (r.deep) fails.push("seed " + seed + ": walk hit the depth or node bound");
  for (const [key, v] of Object.entries(r.samples)) replays.push({ seed, key, ...v });
  console.log(`seed ${seed}: ${r.nodes} states, ${r.edges} choices clicked, ${r.endArrivals} arrivals at an ending, endings ${JSON.stringify(r.endings)}`);
}

const meta = await page.evaluate(() => ({ scenes: Object.keys(STORY), endings: ENDING_IDS, start: START }));
const unreached = meta.scenes.filter(s => !allScenes.has(s));
const missingEnd = meta.endings.filter(s => !allEndings.has(s));
for (const c of CHARS) {
  for (const e of ["end_water", "end_retreat"]) if (!endingsByChar[c] || !endingsByChar[c].has(e)) fails.push(c + " never reached " + e);
}

/* ---------------------------------------------------------------------------
   2. Replays with the real keyboard, from a fresh page and the same seed.
   One recorded path per character and ending. Same seed + same keys must give
   the same scene and the same state.
   ------------------------------------------------------------------------- */
let replayed = 0;
const pick = {};
for (const r of replays) { if (!pick[r.key]) pick[r.key] = r; }
for (const r of Object.values(pick)) {
  await page.goto(FILE + "?seed=" + r.seed);
  for (const k of r.path) await page.keyboard.press(String(k));
  const got = await page.evaluate(() => ({ scene: document.body.dataset.scene, sig: DEMO.sig() }));
  const want = r.key.split(":")[1];
  if (got.scene !== want || got.sig !== r.sig) fails.push("keyboard replay of " + r.key + " (seed " + r.seed + ") ended at " + got.scene + (got.sig !== r.sig ? " with a different state" : ""));
  replayed++;
}

/* ---------------------------------------------------------------------------
   3. Pinned facts from campaign/SPINE.md appear on screen.
   ------------------------------------------------------------------------- */
const PINNED = {
  s1: ["rope burn", "half fallen", "something large moves under the water"],
  s2: ["thirty feet across", "forty feet up", "Crows", "Rubble"],
  s3: ["roof is gone", "less than a week old", "eye with a line through it"],
  s3_tin: ["Two flasks"],
  c1: ["twenty feet", "stuck", "Listen at a door", "Every try is loud"],
  c2_door: ["thirty feet by twenty", "Five giant rats", "AC 7 [12]", "HD ½ (hp 2, 3, 1, 4, 2)", "1d3", "THAC0 19 [+0]", "MV 60' (20')", "ML 8", "flee at 2 dead"],
  c3: ["black water", "one step a turn"]
};
for (const [id, words] of Object.entries(PINNED)) {
  const t = (sceneText[id] || "").toLowerCase();
  for (const w of words) if (!t.includes(w.toLowerCase())) fails.push("pinned fact missing in " + id + ": " + w);
}

/* ---------------------------------------------------------------------------
   4. Interface checks: restart, tracker, clicks, plan/act, turtle map, card copy,
      storage edge cases, overflow at 1280 and 360.
   ------------------------------------------------------------------------- */
// Restart.
await page.goto(FILE + "?seed=1");
await page.keyboard.press("1"); await page.keyboard.press("1");
await page.keyboard.press("r");
if ((await page.evaluate(() => document.body.dataset.scene)) !== meta.start) fails.push("R did not restart");
if ((await page.textContent("#trail")).trim() !== "(none yet)") fails.push("restart kept the trail");
if (!(await page.isHidden("#clock"))) fails.push("clock visible on the first screen");

// Tracker: the walk reached every ending, so a fresh page counts all of them.
await page.goto(FILE + "?seed=1");
const tracker = await page.textContent("#tracker");
const want = "endings found: " + meta.endings.length + " of " + meta.endings.length;
if (tracker !== want) fails.push(`tracker reads "${tracker}", expected "${want}"`);

// Six character cards on the first screen, each with subtitle, stats and Fate ability.
const cards = await page.$$eval("#choices button", bs => bs.map(b => b.innerText));
if (cards.length !== 6) fails.push("expected 6 character cards, saw " + cards.length);
for (const [i, sub] of ["The Runaway Apprentice", "The One Who Believes", "The One Who Swore", "The One Who Listens", "The Next Blacksmith", "The One Who Stayed"].entries())
  if (!cards[i] || !cards[i].includes(sub) || !/HP \d/.test(cards[i]) || !/AC \d/.test(cards[i]) || !/Fate:/.test(cards[i])) fails.push("card " + (i + 1) + " is missing subtitle, stats or Fate");

// Clicking (not only keys) moves the story.
await page.click("#choices button >> nth=4");
if ((await page.evaluate(() => document.body.dataset.scene)) !== "fi_1") fails.push("clicking card 5 did not open the Fighter intro");

// Walk the Fighter to S1 and check Plan (free) vs Act (costs time), and the turtle map.
for (const k of ["3", "2", "1", "1", "1"]) await page.keyboard.press(k);   // hammer, cage, docks, crossing, row straight
if ((await page.evaluate(() => document.body.dataset.scene)) !== "s1") fails.push("Fighter path did not reach s1");
const planBtns = await page.$$eval("#choices button.plan", bs => bs.length);
const actBtns = await page.$$eval("#choices button.act", bs => bs.length);
if (!planBtns || !actBtns) fails.push("s1 should show both Plan and Act choices");
if (!(await page.textContent("#text")).includes("PLAN, THEN ACT")) fails.push("the Plan/Execute gate is not named at S1");
const t0 = await page.evaluate(() => DEMO.state.turn);
await page.click("#choices button.plan >> nth=0");
const t1 = await page.evaluate(() => DEMO.state.turn);
if (t1 !== t0) fails.push("a Plan choice spent time");
const map0 = await page.evaluate(() => ({ cmds: document.querySelectorAll("#mapcmds li").length, lines: document.querySelectorAll("#mapsvg line").length }));
if (await page.isHidden("#mappanel")) fails.push("map panel not shown in the delve");
await page.click("#choices button.act >> nth=0");                         // go first, climb to the tower
const map1 = await page.evaluate(() => ({ cmds: document.querySelectorAll("#mapcmds li").length, lines: document.querySelectorAll("#mapsvg line").length, text: document.getElementById("mapcmds").innerText, turn: DEMO.state.turn }));
if (!(map1.cmds > map0.cmds && map1.lines > map0.lines)) fails.push("turtle map did not grow after a move");
if (!/FORWARD 60/.test(map1.text)) fails.push("turtle map does not print relative moves");
if (map1.turn !== t0 + 1) fails.push("an Act choice did not spend a turn");
if (await page.isHidden("#clock")) fails.push("clock hidden in the delve");

// Card copy: either the clipboard works, or the selectable fallback appears.
await page.goto(FILE + "?seed=1");
for (const k of ["1", "1", "1", "1", "1", "1", "1"]) await page.keyboard.press(k);   // wizard, three intro scenes, docks, crossing -> s1
const retreatIdx = await page.$$eval("#choices button", bs => bs.findIndex(b => /row back to The Fort/i.test(b.innerText)));
await page.click("#choices button >> nth=" + retreatIdx);
if ((await page.evaluate(() => document.body.dataset.scene)) !== "end_retreat") fails.push("could not reach end_retreat for the card check");
await page.click("#copycard");
await page.waitForTimeout(200);
const copy = await page.evaluate(() => ({ msg: document.getElementById("copymsg").textContent, fb: !document.getElementById("cardfallback").hidden, val: document.getElementById("cardfallback").value }));
if (!copy.msg || !copy.fb || !copy.val.includes("The Wizard") || !/PUBLIC FACT/.test(copy.val) || !/SECRET FACT/.test(copy.val) || !/BOND/.test(copy.val)) fails.push("card copy gave no visible result: " + JSON.stringify(copy));
const printCss = await page.evaluate(() => [...document.styleSheets].some(s => [...s.cssRules].some(r => r.media && /print/.test(r.media.mediaText))));
if (!printCss) fails.push("no @media print rule for the card");

// Overflow at both widths on a few busy screens.
for (const w of [1280, 360]) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const keys of [[], ["1", "1"], ["5", "1", "1", "1", "1", "1"]]) {
    await page.goto(FILE + "?seed=3");
    for (const k of keys) await page.keyboard.press(k);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) fails.push("horizontal scroll at " + w + "px: " + sw);
  }
}

// Storage blocked: an ending found this session still counts. Bad stored data is ignored.
const ctx2 = await browser.newContext(); const p2 = await ctx2.newPage(); watch(p2);
await p2.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
await p2.goto(FILE + "?seed=1");
for (const k of ["1", "1", "1", "1", "1", "1", "1"]) await p2.keyboard.press(k);
const ri = await p2.$$eval("#choices button", bs => bs.findIndex(b => /row back to The Fort/i.test(b.innerText)));
await p2.click("#choices button >> nth=" + ri);
if (!(await p2.textContent("#tracker")).startsWith("endings found: 1 of")) fails.push("blocked storage lost the ending");
await ctx2.close();
await page.evaluate(k => localStorage.setItem(k, '{"x":1}'), "drowned-tower-endings");
await page.goto(FILE + "?seed=1");
if ((await page.textContent("#tracker")) !== "endings found: 0 of " + meta.endings.length) fails.push("bad stored data was not ignored");

/* ---------------------------------------------------------------------------
   5. Optional screenshots.
   ------------------------------------------------------------------------- */
if (process.env.SHOTS) {
  fs.mkdirSync(process.env.SHOTS, { recursive: true });
  const fightPath = (await page.evaluate(() => 0), null);
  // Paths: select; an intro scene; the C2 fight; an ending.
  const shots = {
    select: [],
    intro: ["3", "1"],
    // Fighter (sword, plow), docks, crossing (row straight), S1 go first, S2 search, trapdoor, force door until open, brace / attack
    fight: null,
    ending: null
  };
  const findPath = (want) => Object.values(pick).find(r => r.key.endsWith(want));
  for (const w of [1280, 360]) {
    await page.setViewportSize({ width: w, height: 900 });
    for (const [name, keys] of Object.entries(shots)) {
      let seed = 1, path = keys;
      if (name === "ending") { const r = findPath("end_water"); seed = r.seed; path = r.path; }
      if (name === "fight") {
        const r = Object.values(pick).find(x => x.key.startsWith("paladin") && x.key.endsWith("end_water")) || findPath("end_water");
        seed = r.seed; path = r.path;
        await page.goto(FILE + "?seed=" + seed);
        for (const k of path) { await page.keyboard.press(String(k)); if ((await page.evaluate(() => document.body.dataset.scene)) === "c2_fight") break; }
      } else {
        await page.goto(FILE + "?seed=" + seed);
        for (const k of path) await page.keyboard.press(String(k));
      }
      await page.evaluate(() => { document.getElementById("card").classList.remove("fade"); window.scrollTo(0, 0); });
      await page.screenshot({ path: path_join(process.env.SHOTS, `${name}-${w}.png`), fullPage: true });
    }
  }
  for (const scheme of ["dark"]) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.setViewportSize({ width: 360, height: 900 });
    const r = findPath("end_water");
    await page.goto(FILE + "?seed=" + r.seed);
    for (const k of r.path.slice(0, -1)) await page.keyboard.press(String(k));
    await page.screenshot({ path: path_join(process.env.SHOTS, `c3-dark-360.png`), fullPage: true });
  }
}
function path_join(a, b) { return path.join(a, b); }

await browser.close();

const summary = {
  seeds: SEEDS, scenes: meta.scenes.length, endings: meta.endings.length,
  statesWalked: totalNodes, choicesClicked: totalEdges, pathsToEndings: totalEndArrivals,
  keyboardReplays: replayed, unreached, missingEnd,
  tracker, errs: errs.slice(0, 10), fails: fails.slice(0, 30)
};
console.log(summary);
const bad = unreached.length || missingEnd.length || errs.length || fails.length;
console.log(bad ? "FAIL" : "PASS");
process.exit(bad ? 1 : 0);
