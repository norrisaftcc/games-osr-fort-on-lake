// Fort Cards: acceptance test for intro/index.html.
// Run from the repo root:  node intro/test.mjs
// Optional: SHOTS=/some/dir node intro/test.mjs   (also saves screenshots at 1280px and 360px)
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
const SRC = path.join(here, "index.html");
const FILE = pathToFileURL(SRC).href;
const PCS = ["thief", "cleric", "druid"];
const FIELDS = ["name", "class", "stats", "hp", "ac", "thac0", "saves", "fate", "ability", "lane", "lens", "gear", "fivee",
  "origin", "pen", "yoc", "office", "public", "secret", "bond", "classblock"];

let browser;
try { browser = await chromium.launch(); }
catch (e) { browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" }); }

const errs = [], fails = [];
const fail = m => fails.push(m);
const watch = (page, tag) => {
  page.on("console", m => { if (["error", "warning"].includes(m.type())) errs.push(tag + " " + m.type() + ": " + m.text()); });
  page.on("pageerror", e => errs.push(tag + " pageerror: " + String(e)));
};
const overflow = page => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

/* ---------------------------------------------------------------------------
   0. The source: forbidden names and pinned numbers.
   ------------------------------------------------------------------------- */
const src = fs.readFileSync(SRC, "utf8");
for (const bad of [/Sleeper/i, /Lintel/i, /Halcyon/i, /turned to stone/i, /https?:\/\//i, /<script[^>]+src=/i, /<link[^>]+href=/i])
  if (bad.test(src)) fail("source contains forbidden text or a network reference: " + bad);

/* ---------------------------------------------------------------------------
   1. Walk every option of every scene for every PC, in one browser context,
      so the mutual-bond note can be checked across cards.
   ------------------------------------------------------------------------- */
// The last option clicked in each group is the one that stays. Chosen so that
// the thief and the cleric name each other (mutual), scene 3 goes both ways,
// and the Lens comes out Machine, Hymn and Both.
const FINAL = {
  thief:  { lens1: 1, lens2: 1, origin: 2, took: 0, yoc: 1, reg: 0, stay: 1, office: 1, bond: 0, kit: 1, friend: 0 },
  cleric: { lens1: 0, lens2: 0, origin: 0, gaveup: 2, yoc: 2, reg: 1, minister: 1, office: 3, bond: 0, kit: 0 },
  druid:  { lens1: 0, lens2: 1, land: 1, origin: 2, yoc: 2, friend: 1, spell2: 1, reg: 0, terminal: 2, office: 0, bond: 8, kit: 2 }
};
const FACTS = {
  thief:  { pen: "The Fort's well rope was cut twice in Summer, and I wrote down who mended it.", public: "Everyone saw me open the Tin Dozen's box with a fishbone.", secret: "The box held a second key, and I kept it." },
  cleric: { pen: "The Terminal greeted a stone in Autumn, and I wrote it down in three scripts.", public: "The Minister named me her equal before the whole yard.", secret: "When the hymns came back, one line was in my own hand." },
  druid:  { pen: "The thaw came nine days early, and the Fields knew it first.", public: "The well stopped singing when I sang back to it.", secret: "There is a door of fitted stone at the bottom of the well." }
};
const NAMES = { thief: "Ash of No Gate", cleric: "Ilvarre Stonehand", druid: "Pim Underbough" };

const ctx = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await ctx.newPage();
watch(page, "[main]");
await page.goto(FILE + "?seed=7");

const optionsClicked = new Set();
let totalOptions = 0, liveChanges = 0, liveChecks = 0;
const meta = await page.evaluate(() => {
  const out = {};
  for (const [k, P] of Object.entries(FORT.PCS)) out[k] = P.scenes.map(sc => ({ id: sc.id, reg: sc.reg, g: sc.g.map(g => ({ k: g.k, n: g.o.length, sub: g.o.map(o => o.sub ? { k: o.sub.k, n: o.sub.o.length } : null) })) }));
  return out;
});
for (const pc of PCS) for (const sc of meta[pc]) for (const g of sc.g) { totalOptions += g.n; g.sub.forEach(s => { if (s) totalOptions += s.n; }); }

const statusOf = pc => page.textContent(`[data-status="${pc}"]`);

for (const pc of PCS) {
  if ((await statusOf(pc)).trim() !== "Not started") fail(pc + ": status should be 'Not started' at first");
  await page.click(`.pick[data-pc="${pc}"]`);
  if (!(await page.isVisible("#roll"))) { fail(pc + ": no roll button"); continue; }
  if (!/Dice seed 7/.test(await page.textContent("main"))) fail(pc + ": the roll screen does not show the seed");
  await page.click("#roll");
  for (let si = 0; si < 5; si++) {
    const sc = meta[pc][si];
    const cls = await page.getAttribute("article.scene", "class");
    const tag = await page.textContent("article.scene .meta .tag");
    const wantReg = sc.reg === "choose" ? "reg-choose" : "reg-" + sc.reg;
    if (!cls.includes(wantReg)) fail(`${pc} scene ${si + 1}: styled ${cls}, expected ${wantReg}`);
    if (!/Elmore|Otus/.test(tag)) fail(`${pc} scene ${si + 1}: no register tag`);
    for (const g of sc.g) {
      for (let o = 0; o < g.n; o++) {
        const before = await page.innerHTML(".fcard");
        await page.click(`.opt[data-g="${g.k}"][data-o="${o}"]`);
        optionsClicked.add(`${pc}:${g.k}:${o}`);
        if (g.k !== "reg") {
          liveChecks++;
          const after = await page.innerHTML(".fcard");
          if (after !== before) liveChanges++;
          else fail(`${pc}: choosing ${g.k} #${o} did not change the live card`);
        }
        const sub = g.sub[o];
        if (sub) for (let s = 0; s < sub.n; s++) { await page.click(`.opt[data-s="${sub.k}"][data-o="${s}"]`); optionsClicked.add(`${pc}:${sub.k}:${s}`); }
      }
      const fin = FINAL[pc][g.k];
      if (fin == null) fail(`${pc}: no final choice for ${g.k}`);
      await page.click(`.opt[data-g="${g.k}"][data-o="${fin}"]`);
      const subFin = g.sub[fin];
      if (subFin) await page.click(`.opt[data-s="${subFin.k}"][data-o="${FINAL[pc][subFin.k]}"]`);
    }
    if (sc.reg === "choose") {
      const c2 = await page.getAttribute("article.scene", "class");
      if (c2.includes("reg-choose")) fail(`${pc}: scene 3 kept the neutral style after the choice`);
    }
    // Type every fact this scene asks for.
    for (const t of await page.$$eval(".factin", ts => ts.map(t => t.dataset.type))) await page.fill(`#fact-${t}`, FACTS[pc][t]);
    const ov = await overflow(page);
    if (ov > 0) fail(`${pc} scene ${si + 1}: horizontal overflow ${ov}px at 360`);
    await page.click("#next");
  }
  // The ending: the shared image.
  const end = await page.textContent("article.scene");
  if (!/milestone/i.test(end) || !/hums/.test(end) || !/Cassandra/.test(end)) fail(pc + ": the ending lacks the milestone or Cassandra");
  const cass = await page.textContent("#cass");
  if (!cass || cass.length < 40) fail(pc + ": no Cassandra line");
  await page.fill("#name", NAMES[pc]);
  await page.click("#hp");
  // Every card field filled.
  const empties = await page.$$eval(".fcard [data-field]", els => els.filter(e => e.querySelector(".empty") || !e.innerText.trim()).map(e => e.dataset.field));
  const present = await page.$$eval(".fcard [data-field]", els => els.map(e => e.dataset.field));
  for (const f of FIELDS) if (!present.includes(f)) fail(pc + ": card has no field " + f);
  if (empties.length) fail(pc + ": card fields not filled: " + empties.join(", "));
  // The text export carries the choices.
  const txt = await page.textContent("#txt");
  const b = await page.evaluate(k => { const B = FORT.build(k, FORT.state.ch[k]); return { yoc: B.yoc, office: B.office.n, bond: B.bond, lens: B.lensSum }; }, pc);
  for (const [k, v] of Object.entries({ yoc: b.yoc, office: "Fort Office: " + b.office, bond: b.bond, lens: "reads old things as " + b.lens, name: NAMES[pc], ...FACTS[pc] }))
    if (!txt.includes(v)) fail(`${pc}: text export lacks ${k} (${v})`);
  const ov = await overflow(page);
  if (ov > 0) fail(`${pc} card: horizontal overflow ${ov}px at 360`);
  await page.click("#back");
  if (!/Card ready/.test(await statusOf(pc))) fail(pc + ": status not 'Card ready' after the intro");
}
const lensWant = { thief: "Machine", cleric: "Hymn", druid: "Both" };
for (const pc of PCS) {
  const got = await page.evaluate(k => FORT.build(k, FORT.state.ch[k]).lensSum, pc);
  if (got !== lensWant[pc]) fail(`${pc}: Lens is ${got}, expected ${lensWant[pc]}`);
}
const missed = [];
for (const pc of PCS) for (const sc of meta[pc]) for (const g of sc.g) {
  for (let o = 0; o < g.n; o++) if (!optionsClicked.has(`${pc}:${g.k}:${o}`)) missed.push(`${pc}:${g.k}:${o}`);
  g.sub.forEach(s => { if (s) for (let j = 0; j < s.n; j++) if (!optionsClicked.has(`${pc}:${s.k}:${j}`)) missed.push(`${pc}:${s.k}:${j}`); });
}
if (missed.length) fail("options never clicked: " + missed.join(", "));

/* ---------------------------------------------------------------------------
   2. Mutual bond, retcon, Lens changes, copy, print, reset.
   ------------------------------------------------------------------------- */
await page.click('.pick[data-pc="cleric"]');
if (!(await page.isVisible("#mutual"))) fail("cleric: no mutual-bond note though thief and cleric name each other");
if (!/Fate ●●●● 4|●●●● 4/.test(await page.textContent('.fcard [data-field="fate"]'))) fail("cleric: mutual bond did not add 1 Fate");
await page.click("#back");
await page.click('.pick[data-pc="druid"]');
if (await page.isVisible("#mutual")) fail("druid: mutual note shown without a mutual bond");

// Retcon: change the office; card and text follow.
const off0 = await page.textContent('.fcard [data-field="office"]');
await page.click('.chip[data-g="office"][data-o="2"]');
const off1 = await page.textContent('.fcard [data-field="office"]');
if (off0 === off1 || !/Steward/.test(off1)) fail("retcon of the office did not change the card");
if (!/Fort Office: Steward/.test(await page.textContent("#txt"))) fail("retcon of the office did not change the text export");
// Retcon: the bond, and a sub-choice.
await page.click('.chip[data-g="bond"][data-o="3"]');
if (!/Wick/.test(await page.textContent('.fcard [data-field="bond"]'))) fail("retcon of the bond did not change the card");
await page.click('.chip[data-s="friend"][data-o="2"]');
if (!/toad/.test(await page.textContent('.fcard [data-field="yoc"]'))) fail("retcon of the Small Friend did not change the card");
// Each Lens choice changes the card, for every PC.
let lensFlips = 0;
for (const pc of PCS) {
  await page.click("#back"); await page.click(`.pick[data-pc="${pc}"]`);
  for (const k of ["lens1", "lens2"]) for (const o of [0, 1]) {
    const before = await page.textContent('.fcard [data-field="lens"]');
    const was = await page.getAttribute(`.chip[data-g="${k}"][data-o="${o}"]`, "aria-pressed");
    await page.click(`.chip[data-g="${k}"][data-o="${o}"]`);
    const after = await page.textContent('.fcard [data-field="lens"]');
    if (was === "false") { lensFlips++; if (before === after) fail(`${pc}: retcon of ${k} to ${o} did not change the Lens`); }
    if (!(await page.textContent("#txt")).includes("Lens: reads old things as")) fail(pc + ": Lens missing from the text export after retcon");
  }
}
// Retcon a typed fact.
await page.fill("#rf-public", "The well sings only for me now.");
if (!/sings only for me/.test(await page.textContent('.fcard [data-field="public"]'))) fail("retcon of the public fact did not change the card");

// Copy: the clipboard, or a visible selectable fallback.
await page.click("#copy");
await page.waitForTimeout(250);
const copyMsg = await page.textContent("#copied");
const preVisible = await page.isVisible("#txt");
if (!copyMsg || !preVisible) fail("copy gave no visible result: " + JSON.stringify(copyMsg));

// Print: one card per page. Build the deck as the print button does, then render a PDF and count pages.
const printCss = await page.evaluate(() => [...document.styleSheets].some(s => [...s.cssRules].some(r => r.media && /print/.test(r.media.mediaText))));
if (!printCss) fail("no @media print rule");
await page.evaluate(() => { document.getElementById("printdeck").innerHTML = FORT.deckHTML(["thief", "cleric", "druid"]); });
await page.emulateMedia({ media: "print" });
const pv = await page.evaluate(() => ({ deck: getComputedStyle(document.getElementById("printdeck")).display, main: getComputedStyle(document.querySelector("main")).display,
  cards: document.querySelectorAll("#printdeck .pcard").length, brk: getComputedStyle(document.querySelector("#printdeck .pcard")).breakAfter,
  lens: [...document.querySelectorAll('#printdeck [data-field="lens"]')].every(e => /Reads old things as/.test(e.innerText)) }));
if (pv.deck === "none" || pv.main !== "none" || pv.cards !== 3 || pv.brk !== "page") fail("print view wrong: " + JSON.stringify(pv));
if (!pv.lens) fail("print view lacks the Lens on a card");
const pdf = await page.pdf({ format: "A4", printBackground: true });
const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
if (pages !== 3) fail(`print gives ${pages} pages for 3 cards (want one card per page)`);
await page.emulateMedia({ media: "screen" });
await page.evaluate(() => { document.getElementById("printdeck").innerHTML = ""; });

// Reset: one tap arms, the second clears.
await page.click("#back"); await page.click('.pick[data-pc="druid"]');
await page.click("#reset");
if (!(await page.isVisible("#retcon"))) fail("one tap on reset already reset the card");
await page.click("#reset");
if ((await statusOf("druid")).trim() !== "Not started") fail("reset did not clear the druid");
if (!/Card ready/.test(await statusOf("thief"))) fail("resetting the druid touched the thief");

// Theme toggle cycles auto → light → dark → auto.
const themes = [];
for (let i = 0; i < 3; i++) { await page.click("#theme"); themes.push(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))); }
if (themes.join(",") !== "light,dark,") fail("theme toggle cycled " + themes.join(","));

// Persistence: a reload keeps the cards.
await page.reload();
if (!/Card ready/.test(await statusOf("cleric"))) fail("reload lost the cleric's card");

/* ---------------------------------------------------------------------------
   3. Same seed, same stats. Different seed, different stats.
   ------------------------------------------------------------------------- */
async function statsFor(seed, pc = "thief") {
  const c = await browser.newContext(); const p = await c.newPage(); watch(p, "[seed " + seed + "]");
  await p.goto(FILE + "?seed=" + seed);
  await p.click(`.pick[data-pc="${pc}"]`); await p.click("#roll");
  const s = await p.evaluate(k => FORT.state.ch[k].stats.join(","), pc);
  const shown = await p.textContent("footer");
  await c.close();
  return { s, shown };
}
const a1 = await statsFor(42), a2 = await statsFor(42), a3 = await statsFor(43);
if (a1.s !== a2.s) fail(`seed 42 gave different stats: ${a1.s} / ${a2.s}`);
if (a1.s === a3.s) fail("seeds 42 and 43 gave the same stats");
if (!/seed 42/.test(a1.shown)) fail("the footer does not show the seed");

/* ---------------------------------------------------------------------------
   4. Storage blocked: the page still works end to end.
   ------------------------------------------------------------------------- */
{
  const c = await browser.newContext({ viewport: { width: 360, height: 800 } }); const p = await c.newPage(); watch(p, "[blocked]");
  await p.addInitScript(() => { Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } }); });
  await p.goto(FILE + "?seed=5");
  await p.click('.pick[data-pc="thief"]'); await p.click("#roll");
  for (let si = 0; si < 5; si++) {
    for (const g of meta.thief[si].g) await p.click(`.opt[data-g="${g.k}"][data-o="0"]`);
    for (const t of await p.$$eval(".factin", ts => ts.map(t => t.dataset.type))) await p.fill(`#fact-${t}`, "A blocked-storage fact.");
    await p.click("#next");
  }
  await p.fill("#name", "Nobody"); await p.click("#hp");
  const empt = await p.$$eval(".fcard [data-field]", els => els.filter(e => e.querySelector(".empty")).map(e => e.dataset.field));
  if (empt.length) fail("blocked storage: card fields empty: " + empt.join(","));
  await p.click("#theme");
  await c.close();
}
// Bad stored data is ignored.
{
  const c = await browser.newContext(); const p = await c.newPage(); watch(p, "[baddata]");
  await p.goto(FILE); await p.evaluate(() => localStorage.setItem("fort-cards-v1", '{"mode":"card","pc":"thief","ch":[1,2]}'));
  await p.goto(FILE);
  if (!(await p.isVisible(".pick"))) fail("bad stored data broke the pick screen");
  await c.close();
}

/* ---------------------------------------------------------------------------
   5. Keyboard only: Tab to a card, Enter, Tab to the roll, Enter, Space on an option.
   ------------------------------------------------------------------------- */
{
  const c = await browser.newContext(); const p = await c.newPage(); watch(p, "[keys]");
  await p.goto(FILE + "?seed=9");
  const tabTo = async sel => { for (let i = 0; i < 25; i++) { await p.keyboard.press("Tab"); if (await p.evaluate(s => document.activeElement && document.activeElement.matches(s), sel)) return true; } return false; };
  if (!(await tabTo('.pick[data-pc="cleric"]'))) fail("keyboard: cannot Tab to a character card");
  await p.keyboard.press("Enter");
  if (!(await tabTo("#roll"))) fail("keyboard: cannot Tab to the roll button");
  await p.keyboard.press("Enter");
  if (!(await tabTo('.opt[data-g="lens1"][data-o="1"]'))) fail("keyboard: cannot Tab to an option");
  await p.keyboard.press(" ");
  if ((await p.getAttribute('.opt[data-g="lens1"][data-o="1"]', "aria-pressed")) !== "true") fail("keyboard: Space did not choose the option");
  if (!(await p.evaluate(() => document.activeElement && document.activeElement.matches('.opt[data-g="lens1"][data-o="1"]')))) fail("keyboard: focus lost after choosing");
  await c.close();
}

/* ---------------------------------------------------------------------------
   6. No horizontal scroll at 1280 and 360 on the main screens (both themes).
   ------------------------------------------------------------------------- */
for (const scheme of ["light", "dark"]) for (const w of [1280, 360]) {
  await page.emulateMedia({ colorScheme: scheme });
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto(FILE + "?seed=7");
  let ov = await overflow(page); if (ov > 0) fail(`pick screen overflows at ${w} (${scheme})`);
  await page.click('.pick[data-pc="thief"]');
  ov = await overflow(page); if (ov > 0) fail(`card screen overflows at ${w} (${scheme})`);
  await page.click("#back");
}

/* ---------------------------------------------------------------------------
   7. Optional screenshots.
   ------------------------------------------------------------------------- */
if (process.env.SHOTS) {
  const dir = process.env.SHOTS; fs.mkdirSync(dir, { recursive: true });
  const shoot = async (p, name) => { await p.evaluate(() => window.scrollTo(0, 0)); await p.screenshot({ path: path.join(dir, name + ".png"), fullPage: true }); };
  for (const [scheme, widths] of [["light", [1280, 360]], ["dark", [360]]]) {
    const c = await browser.newContext({ colorScheme: scheme }); const p = await c.newPage(); watch(p, "[shots]");
    for (const w of widths) {
      await p.setViewportSize({ width: w, height: 900 });
      const t = "-" + w + (scheme === "dark" ? "-dark" : "");
      await p.goto(FILE + "?seed=7"); await p.evaluate(() => localStorage.clear()); await p.goto(FILE + "?seed=7");
      await shoot(p, "pick" + t);
      await p.click('.pick[data-pc="cleric"]'); await p.click("#roll");
      await p.click('.opt[data-g="lens1"][data-o="1"]'); await p.click('.opt[data-g="origin"][data-o="2"]');
      await shoot(p, "ink-scene" + t);
      await p.click('.opt[data-g="gaveup"][data-o="0"]'); await p.click("#next");
      await p.click('.opt[data-g="lens2"][data-o="0"]'); await p.click('.opt[data-g="yoc"][data-o="2"]');
      await p.fill("#fact-pen", FACTS.cleric.pen);
      await shoot(p, "paint-scene" + t);
      await p.click("#next");
      await shoot(p, "choose-scene" + t);
      await p.click('.opt[data-g="reg"][data-o="1"]'); await p.fill("#fact-secret", FACTS.cleric.secret); await p.click("#next");
      await p.click('.opt[data-g="minister"][data-o="2"]'); await p.click('.opt[data-g="office"][data-o="3"]'); await p.fill("#fact-public", FACTS.cleric.public); await p.click("#next");
      await p.click('.opt[data-g="bond"][data-o="2"]'); await p.click('.opt[data-g="kit"][data-o="0"]'); await p.click("#next");
      await p.fill("#name", NAMES.cleric); await p.click("#hp");
      await shoot(p, "card" + t);
      if (w === 1280 && scheme === "light") {
        await p.evaluate(() => { document.getElementById("printdeck").innerHTML = FORT.deckHTML(["cleric"]); });
        await p.emulateMedia({ media: "print" }); await p.setViewportSize({ width: 794, height: 1123 });
        await shoot(p, "print");
        await p.pdf({ path: path.join(dir, "print.pdf"), format: "A4", printBackground: true });
        await p.emulateMedia({ media: "screen" });
      }
    }
    await c.close();
  }
  console.log("screenshots saved to " + dir);
}

await browser.close();

const summary = {
  pcs: PCS.length, scenesWalked: PCS.length * 5, optionsInPage: totalOptions, optionsClicked: optionsClicked.size,
  liveCardChecks: liveChecks, liveCardChanges: liveChanges, lensRetconFlips: lensFlips, printPages: pages,
  seed42: a1.s, errs: errs.slice(0, 10), fails: fails.slice(0, 30)
};
console.log(summary);
const bad = errs.length || fails.length;
console.log(bad ? "FAIL" : "PASS");
process.exit(bad ? 1 : 0);
