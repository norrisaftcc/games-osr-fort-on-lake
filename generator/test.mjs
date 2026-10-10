// test.mjs — checks the Forge's invariants over hundreds of seeds, then loads the page in a browser.
// Run: node generator/test.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const Tables = require("./tables.js");
const Forge = require("./forge.js");

const SEEDS = Number(process.env.FORGE_SEEDS || 300);
const SHOTS = process.env.FORGE_SHOTS || "/tmp/claude-0/forge-check";
let checks = 0, failures = [];
function ok(cond, msg) { checks++; if (!cond) { failures.push(msg); if (failures.length < 40) console.error("FAIL: " + msg); } }

// Names from the source books and things the spine says not to explain. "Keep" is checked case-sensitively
// so that the verb "keep" is allowed.
const FORBIDDEN = /Zenopus|Portown|Thalagram|Lemunda|Borderlands|Chaos|medusa|Castellan|Hermit|Bree-?yark|Halcyon|B\.I\.A/i;
const FORBIDDEN_CASE = /\bKeep\b/;

function byKey(d) { const m = {}; d.rooms.forEach(r => { m[r.key] = r; }); return m; }
function bfs(d, start, skip) {
  const m = byKey(d), dist = { [start]: 0 }, q = [start];
  while (q.length) {
    const u = q.shift();
    for (const e of m[u].exits) {
      if (skip && skip(e)) continue;
      if (dist[e.to] === undefined) { dist[e.to] = dist[u] + 1; q.push(e.to); }
    }
  }
  return dist;
}
function overlaps(a, b) { return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h; }
function sentences(s) { return s.trim().split(/(?<=[.!?][”"’)]?)\s+(?=[A-Z“"(])/).filter(Boolean).length; }

// A tiny XML well-formedness check: balanced tags, quoted attributes, escaped ampersands, one root.
function checkXML(s) {
  const stack = []; let roots = 0, i = 0;
  const tagRe = /<(\/?)([A-Za-z][\w:.-]*)((?:\s+[\w:.-]+\s*=\s*"[^"<]*")*)\s*(\/?)>/y;
  while (i < s.length) {
    const lt = s.indexOf("<", i);
    const text = s.slice(i, lt < 0 ? s.length : lt);
    if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(text)) return "bare ampersand near: " + text.slice(0, 40);
    if (stack.length === 0 && text.trim()) return "text outside root";
    if (lt < 0) break;
    tagRe.lastIndex = lt;
    const m = tagRe.exec(s);
    if (!m) return "bad tag at " + lt + ": " + s.slice(lt, lt + 60);
    if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(m[3])) return "bare ampersand in attribute";
    const [, close, name, , self] = m;
    if (close) { if (stack.pop() !== name) return "mismatched </" + name + ">"; }
    else if (!self) { if (stack.length === 0) roots++; stack.push(name); }
    else if (stack.length === 0) roots++;
    i = tagRe.lastIndex;
  }
  if (stack.length) return "unclosed <" + stack.pop() + ">";
  if (roots !== 1) return "expected one root, found " + roots;
  return null;
}

function checkCommon(d, tag) {
  const m = byKey(d);
  ok(Object.keys(m).length === d.rooms.length, tag + ": room keys are unique");
  // Connected from the entry.
  const all = bfs(d, d.entry);
  ok(d.rooms.every(r => all[r.key] !== undefined), tag + ": every room reachable from " + d.entry);
  // Reciprocal exits. Kinds must match, except the one-way secret door: "secret" on the near side, "door" on the far side.
  for (const r of d.rooms) {
    const seen = {};
    for (const e of r.exits) {
      ok(m[e.to], tag + ": " + r.key + " exit to missing " + e.to);
      if (!m[e.to]) continue;
      ok(!seen[e.to], tag + ": " + r.key + " has two exits to " + e.to); seen[e.to] = true;
      const back = m[e.to].exits.filter(x => x.to === r.key);
      ok(back.length === 1, tag + ": exit " + r.key + "→" + e.to + " has a reciprocal");
      if (back.length === 1 && back[0].kind !== e.kind) {
        const oneWay = d.secretDoor && ((e.kind === "secret" && back[0].kind === "door" && r.key === d.secretDoor.from && e.to === d.secretDoor.to) ||
          (e.kind === "door" && back[0].kind === "secret" && r.key === d.secretDoor.to && e.to === d.secretDoor.from));
        ok(oneWay, tag + ": exit kinds differ " + r.key + "(" + e.kind + ")↔" + e.to + "(" + back[0].kind + ") and it is not the one-way secret door");
      }
      ok(["open", "door", "stuck", "locked", "secret", "stair", "water"].includes(e.kind), tag + ": bad exit kind " + e.kind);
    }
  }
  // Lesson slots: present, and in the pinned order by distance from the entry, walking only doors a party can see.
  const L = Forge.templates[d.template].lessons;
  ok(d.lessonOrder.length === L.length, tag + ": lesson ladder has " + L.length + " rungs");
  const open = bfs(d, d.entry, e => e.kind === "secret");
  let prev = -1;
  d.lessonOrder.forEach((l, i) => {
    ok(l.slot === L[i].slot, tag + ": rung " + (i + 1) + " is " + L[i].slot);
    ok(l.rooms.length > 0, tag + ": slot " + l.slot + " has a room");
    const dist = Math.min(...l.rooms.map(k => open[k]));
    ok(dist > prev, tag + ": slot " + l.slot + " (distance " + dist + ") is deeper than the slot before it (" + prev + ")");
    prev = dist;
  });
  // Map: no two rooms overlap inside one panel.
  const panels = {};
  d.rooms.forEach(r => { (panels[r.panel] = panels[r.panel] || []).push(r); });
  for (const p in panels) {
    const rs = panels[p];
    for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++)
      ok(!overlaps(rs[i], rs[j]), tag + ": rooms " + rs[i].key + " and " + rs[j].key + " overlap on panel " + p);
    const pd = d.panels.find(x => x.id === p);
    ok(pd, tag + ": panel " + p + " is described");
    if (pd) rs.forEach(r => ok(r.x >= 0 && r.y >= 0 && r.x + r.w <= pd.w && r.y + r.h <= pd.h, tag + ": room " + r.key + " lies inside panel " + p));
  }
  // Encounters: hp per creature, XP, totals.
  let xp = 0;
  for (const r of d.rooms) {
    ok(typeof r.readAloud === "string" && r.readAloud.length > 0, tag + ": " + r.key + " has read-aloud text");
    const n = sentences(r.readAloud);
    ok(n >= 2 && n <= 4, tag + ": " + r.key + " read-aloud has 2–4 sentences (has " + n + "): " + r.readAloud);
    ok(r.lesson && r.lesson.length > 0, tag + ": " + r.key + " says what it teaches");
    ok(Array.isArray(r.features), tag + ": " + r.key + " has a feature list");
    for (const k of ["x", "y", "w", "h"]) ok(Number.isFinite(r[k]), tag + ": " + r.key + "." + k + " is a number");
    if (!r.encounter) continue;
    let ex = 0;
    for (const g of r.encounter.groups) {
      ok(Array.isArray(g.hp) && g.hp.length === g.count && g.count >= 1, tag + ": " + r.key + " " + g.name + " has hp for each creature");
      ok(g.hp.every(h => Number.isInteger(h) && h >= 1), tag + ": " + r.key + " hp are whole numbers ≥ 1");
      ok(g.xp === g.xpEach * g.count && g.xpEach > 0, tag + ": " + r.key + " " + g.name + " XP");
      for (const f of ["ac", "hd", "att", "thac0", "mv", "sv", "ml"]) ok(g[f] !== undefined && g[f] !== "", tag + ": " + r.key + " stat " + f);
      ok(/\(\d+'\)/.test(g.mv), tag + ": " + r.key + " MV gives the encounter rate");
      ex += g.xp;
    }
    ok(ex === r.encounter.xp, tag + ": " + r.key + " encounter XP adds up");
    xp += r.encounter.xp;
  }
  ok(xp === d.xpTotal, tag + ": xpTotal equals the sum (" + xp + " vs " + d.xpTotal + ")");
  ok(d.rumors.length === 8 && d.rumors.every(r => ["True", "Partly", "False"].includes(r.truth)), tag + ": d8 rumors, each marked");
  ok(d.clock && d.clock.steps.length >= 3, tag + ": the clock has steps");
}

function checkTower(d, tag) {
  const tiers = { S: 0, C: 0, W: 0 };
  d.rooms.forEach(r => { tiers[r.key[0]]++; });
  ok(tiers.S === 4 && tiers.C >= 8 && tiers.C <= 10 && tiers.W >= 5 && tiers.W <= 7, tag + ": tier sizes " + JSON.stringify(tiers));
  // A loop among the open (non-secret) passages: edges ≥ rooms in a connected graph.
  const pairs = new Set();
  d.rooms.forEach(r => r.exits.forEach(e => { if (e.kind !== "secret") pairs.add([r.key, e.to].sort().join("|")); }));
  const secretPairs = new Set();
  d.rooms.forEach(r => r.exits.forEach(e => { if (e.kind === "secret") secretPairs.add([r.key, e.to].sort().join("|")); }));
  // The secret door's far side is a plain door; that pair is not an open passage for the loop count.
  secretPairs.forEach(p => pairs.delete(p));
  ok(pairs.size >= d.rooms.length, tag + ": the open map has a loop");
  ok(secretPairs.size === 1, tag + ": exactly one secret door");
  const dead = d.rooms.filter(r => r.key[0] === "C" && r.exits.length === 1);
  ok(dead.length >= 1, tag + ": the cellars have a dead end");
  const withSecret = bfs(d, d.entry);
  const blind = bfs(d, d.entry, e => e.kind === "secret");
  ok(withSecret[d.climax] < blind[d.climax], tag + ": the secret door shortens S1→" + d.climax + " (" + withSecret[d.climax] + " < " + blind[d.climax] + ")");
  const sd = byKey(d)[d.secretDoor.from];
  ok(sd && sd.slot === "mapping", tag + ": the secret door is in the mapping room");
  ok(d.prize && d.prize.buyers.length === 2 && d.prize.buyers[0].who !== d.prize.buyers[1].who, tag + ": two different buyers");
  const climax = byKey(d)[d.climax];
  ok(climax.art && /Otus ink/.test(climax.art), tag + ": the climax has an art reference");
  ok(climax.features.some(f => f[0].indexOf(d.clue.where) >= 0), tag + ": the climax says what the clue does");
}

function checkRavine(d, tag) {
  const m = byKey(d);
  const mouths = d.lairs.filter(l => l.slot !== "temple");
  ok(mouths.length >= 7 && mouths.length <= 8, tag + ": 7–8 cave mouths (" + mouths.length + ")");
  // Alternating walls: consecutive single mouths are on opposite sides; the twins face each other.
  const singles = mouths.filter(l => l.slot !== "factions");
  const twins = mouths.filter(l => l.slot === "factions");
  ok(twins.length === 2 && twins[0].side !== twins[1].side && twins[0].node === twins[1].node, tag + ": the twin mouths face each other");
  for (let i = 1; i < singles.length; i++) ok(singles[i].side !== singles[i - 1].side, tag + ": mouths alternate walls");
  for (const l of d.lairs) {
    const n = l.rooms.length;
    if (l.slot === "temple") ok(n >= 5 && n <= 8, tag + ": temple has 5–8 areas");
    else ok(n >= 3 && n <= 6, tag + ": lair " + l.letter + " has 3–6 areas (" + n + ")");
  }
  // Rivals share a contested passage.
  const [a, b] = d.rivals;
  const pass = d.rooms.filter(r => r.contested);
  ok(pass.length === 1, tag + ": one contested passage");
  if (pass.length === 1) {
    const toA = pass[0].exits.some(e => d.lairs.find(l => l.letter === a).rooms.includes(e.to));
    const toB = pass[0].exits.some(e => d.lairs.find(l => l.letter === b).rooms.includes(e.to));
    ok(toA && toB, tag + ": the contested passage joins lairs " + a + " and " + b);
  }
  // The temple is last: furthest mouth, last letter.
  const dist = bfs(d, d.entry, e => e.kind === "secret");
  const temple = d.lairs.find(l => l.slot === "temple");
  const tDist = dist[temple.rooms[0]];
  ok(mouths.every(l => dist[l.rooms[0]] < tDist), tag + ": the temple is the furthest lair");
  ok(d.lairs.every(l => l.letter <= temple.letter), tag + ": the temple has the last letter");
  // Temple pieces.
  const tr = temple.rooms.map(k => m[k]);
  ok(tr.some(r => r.encounter && r.encounter.groups.some(g => ["skeleton", "zombie", "ghoul"].includes(g.monster))), tag + ": undead to turn");
  ok(tr.some(r => r.trap), tag + ": a trap in the temple");
  ok(tr.some(r => r.encounter && r.encounter.label === "leader"), tag + ": a leader who talks");
  ok(d.finalChoice.options.length === 3 && m[d.finalChoice.room], tag + ": a final choice with three options");
  ok(d.factions.length >= 6 && d.factions.every(f => f.wants && f.fears && f.hates && f.trades), tag + ": faction table filled");
  ok(d.ravineReacts.length >= 6, tag + ": the ravine reacts");
  const sanct = m[d.finalChoice.room];
  ok(sanct && /Otus ink/.test(sanct.art), tag + ": the sanctum has an art reference");
}

function checkMarkdown(md, tag) {
  ok(!FORBIDDEN.test(md), tag + ": forbidden name in Markdown: " + (md.match(FORBIDDEN) || [])[0]);
  ok(!FORBIDDEN_CASE.test(md), tag + ": the word Keep, capitalised, in Markdown");
  ok(!/\{\w+\}/.test(md), tag + ": an unfilled {token} in Markdown: " + (md.match(/\{\w+\}/) || [])[0]);
  ok(!/\bundefined\b|\bNaN\b|\[object/.test(md), tag + ": 'undefined' or 'NaN' in Markdown");
  ok(!/\.\./.test(md.replace(/\.\.\./g, "")), tag + ": a doubled full stop in Markdown");
  ok(/What This Room Teaches/.test(md) && /> \*\*Read aloud:\*\*/.test(md), tag + ": house format sections present");
  ok(/Art reference/.test(md), tag + ": an art reference");
}

const t0 = Date.now();
const counts = {};
for (const template of ["tower", "ravine"]) {
  for (let level = 1; level <= 3; level++) {
    for (let seed = 1; seed <= SEEDS; seed++) {
      const tag = template + " seed " + seed + " L" + level;
      let d;
      try { d = Forge.generate({ template, seed, partyLevel: level }); }
      catch (e) { ok(false, tag + ": generate threw " + e.message); continue; }
      const again = Forge.generate({ template, seed, partyLevel: level });
      ok(JSON.stringify(d) === JSON.stringify(again), tag + ": deterministic");
      counts[template] = (counts[template] || 0) + 1;
      checkCommon(d, tag);
      if (template === "tower") checkTower(d, tag); else checkRavine(d, tag);
      const md = Forge.toMarkdown(d);
      checkMarkdown(md, tag);
      if (seed % 15 === 0 || seed <= 3) {
        const svg = Forge.toSVG(d);
        ok(svg === Forge.toSVG(again), tag + ": SVG deterministic");
        const err = checkXML(svg);
        ok(!err, tag + ": SVG is well-formed XML" + (err ? " (" + err + ")" : ""));
        ok(JSON.stringify(d) === JSON.stringify(again), tag + ": toSVG does not change the data");
      }
    }
  }
}
// Variety: how different do 20 seeds read?
const variety = {};
for (const template of ["tower", "ravine"]) {
  const titles = new Set(), names = new Set();
  for (let seed = 1; seed <= 20; seed++) {
    const d = Forge.generate({ template, seed, partyLevel: 1 });
    titles.add(d.title);
    d.rooms.forEach(r => names.add(r.name));
  }
  variety[template] = { titles: titles.size, roomNames: names.size };
}
// Table sizes, so a student can see where the content lives.
function sizes(obj, prefix, out) {
  for (const k in obj) {
    const v = obj[k];
    if (Array.isArray(v)) out.push([prefix + k, v.length]);
    else if (v && typeof v === "object" && !("ac" in v)) sizes(v, prefix + k + ".", out);
  }
  return out;
}
const tableSizes = sizes(Tables, "", []);
tableSizes.push(["monsters", Object.keys(Tables.monsters).length]);
console.log("Generated " + counts.tower + " towers and " + counts.ravine + " ravines (" + SEEDS + " seeds × 3 party levels each) in " + ((Date.now() - t0) / 1000).toFixed(1) + "s.");
console.log("Variety over 20 seeds: " + JSON.stringify(variety));

// ---------------------------------------------------------------- Browser checks
async function browserChecks() {
  let chromium;
  try { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }
  catch (e) { try { ({ chromium } = require("playwright")); } catch (e2) { console.log("Playwright not found: browser checks skipped."); return; } }
  let browser;
  try { browser = await chromium.launch(); }
  catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" }); }
  fs.mkdirSync(SHOTS, { recursive: true });
  const page0 = "file://" + path.join(here, "index.html");
  for (const template of ["tower", "ravine"]) {
    const d = Forge.generate({ template, seed: 7, partyLevel: 1 });
    for (const width of [1280, 360]) {
      const tag = "page " + template + " seed 7 @" + width;
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      page.on("pageerror", e => errors.push(String(e)));
      await page.goto(page0 + "?template=" + template + "&seed=7");
      await page.waitForSelector("#map svg");
      const info = await page.evaluate(() => ({
        rooms: document.querySelectorAll("#key h3.room").length,
        svg: !!document.querySelector("#map svg"),
        svgW: document.querySelector("#map svg").getBoundingClientRect().width,
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        title: document.querySelector("#key h1") && document.querySelector("#key h1").textContent,
        status: document.getElementById("status").textContent
      }));
      ok(errors.length === 0, tag + ": no console errors (" + errors.join(" | ") + ")");
      ok(info.svg, tag + ": the map renders");
      ok(info.rooms >= d.rooms.length, tag + ": " + info.rooms + " keyed rooms render (expected " + d.rooms.length + ")");
      ok(info.title === d.title, tag + ": the URL reproduces the dungeon (" + info.title + ")");
      ok(info.scrollW <= info.clientW, tag + ": no horizontal page scroll (" + info.scrollW + " > " + info.clientW + ")");
      ok(info.svgW <= width, tag + ": the map fits the width");
      await page.screenshot({ path: path.join(SHOTS, "page-" + template + "-7-" + width + ".png"), fullPage: false });
      if (width === 360) {
        // The copy button must work or show the fallback.
        await page.click("#copy");
        await page.waitForTimeout(200);
        const fb = await page.evaluate(() => document.getElementById("fallback").style.display === "block" || /copied/i.test(document.getElementById("status").textContent));
        ok(fb, tag + ": Copy Markdown copies or shows the fallback");
      }
      await page.close();
    }
  }
  // Print layout: map first, tiers on new pages.
  const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
  await page.goto(page0 + "?template=tower&seed=7");
  await page.emulateMedia({ media: "print" });
  const pr = await page.evaluate(() => ({
    controlsHidden: getComputedStyle(document.getElementById("controls")).display === "none",
    tierBreaks: Array.from(document.querySelectorAll("#key h2.tier")).filter(h => getComputedStyle(h).breakBefore === "page").length
  }));
  ok(pr.controlsHidden && pr.tierBreaks === 3, "print: controls hidden and a page break before each of 3 tiers (" + JSON.stringify(pr) + ")");
  await page.close();
  await browser.close();
  console.log("Browser checks done; screenshots in " + SHOTS);
}

await browserChecks();

console.log("\nTable sizes: " + tableSizes.map(t => t[0] + " " + t[1]).join(", "));
if (failures.length) {
  console.log("\n" + failures.length + " of " + checks + " checks FAILED.");
  process.exit(1);
} else {
  console.log("\nAll " + checks + " checks passed.");
}
