// The Stage: browser test. Contract: stage/SPEC.md section 5.
//   node stage/test.mjs               every built page in dist/, every route
//   SAMPLE=5 node stage/test.mjs      play only 5 routes per pack (one per ending first, then evenly spaced)
//   ONLY=magic-module,test node ...   only those pack ids
//   JOBS=4 node ...                   browser contexts at a time (default: one per CPU, at most 8)
//   SHOTS=/dir node ...               save a screenshot of each pack at 360 px
//
// Every path comes from this file's own place, so the same file runs in the Fort (stage/) and in HTLL (arcade/stage/).
// For every page in dist/ it checks:
//   build        the page was built from the pack and the sources beside it (not stale)
//   network      no network reference in the HTML; no request during play that is not file: or data:
//   names        no forbidden name in the pack's text or art (the lists in ../intro/test.mjs and ../generator/test.mjs, when they exist)
//   routes       every route from Stage.simulate, opened with ?seed=1&force=<its roll tiers>, played by keyboard under
//                reduced motion, reaches its ending; no running animation after any step; no horizontal scroll at 360 px
//   verify       the Verify sheet's counts equal Stage.simulate's; a route replays to its ending; Last pick stops at a choice
//   commentary   the toggle hides the track; the track's note is in the Notes sheet
//   chips        every ⓘ chip opens its note
//   contrast     light and dark text pairs are 4.5:1 or better, from the computed tokens (by data-theme and by the system setting)
//   storage      the page works when localStorage throws, when its methods throw, and when it holds garbage
//   layout       no horizontal scroll at 360 and 1280 px (play, title, every sheet)
//   calm         Settings > Calm behaves like reduced motion
//   motion       full motion plays a route by keyboard, tapping through every cue, with no console error
//   console      no console error, no console warning, no page error, anywhere
// The last line is PASS, or FAIL with the checks that failed.
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import assert from "node:assert";
import { loadPack } from "./tools/load.mjs";

const require = createRequire(import.meta.url);
const Stage = require("./engine/stage.js");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(HERE, "dist");
const PACKS = path.join(HERE, "packs");
const SAMPLE = Math.max(0, Math.floor(Number(process.env.SAMPLE) || 0));
const JOBS = Math.max(1, Math.floor(Number(process.env.JOBS) || Math.min(os.cpus().length, 8)));
const ONLY = (process.env.ONLY || "").split(",").map(s => s.trim()).filter(Boolean);
const SHOTS = process.env.SHOTS || "";
const T0 = Date.now();
const secs = () => ((Date.now() - T0) / 1000).toFixed(1);

/* ---------------------------------------------------------------------------
   Playwright and Chromium
   ------------------------------------------------------------------------- */
let chromium;
for (const p of ["playwright", "/opt/node22/lib/node_modules/playwright/index.js"]) {
  try { ({ chromium } = require(p)); break; } catch (e) { /* try the next */ }
}
if (!chromium) {
  try {
    const { execSync } = await import("node:child_process");
    ({ chromium } = require(execSync("npm root -g").toString().trim() + "/playwright"));
  } catch (e) { /* reported below */ }
}
if (!chromium) { console.log("FAIL: Playwright is not installed"); process.exit(1); }
let browser;
try { browser = await chromium.launch(); } catch (e) {
  const exe = ["/opt/pw-browsers/chromium", ...fs.existsSync("/opt/pw-browsers") ? fs.readdirSync("/opt/pw-browsers").filter(d => /^chromium-\d+$/.test(d)).map(d => `/opt/pw-browsers/${d}/chrome-linux/chrome`) : []].find(p => fs.existsSync(p));
  if (!exe) { console.log("FAIL: no Chromium found (" + e.message.split("\n")[0] + ")"); process.exit(1); }
  browser = await chromium.launch({ executablePath: exe });
}

/* ---------------------------------------------------------------------------
   Failures: one list, deduplicated, grouped by check at the end
   ------------------------------------------------------------------------- */
const failures = []; // { pack, check, msg, n }
const failIndex = new Map();
function fail(pack, check, msg) {
  const k = `${pack}\u0000${check}\u0000${msg}`;
  const hit = failIndex.get(k);
  if (hit) { hit.n++; return; }
  const f = { pack, check, msg, n: 1 };
  failIndex.set(k, f); failures.push(f);
}
const notes = []; // information lines printed at the end
const errText = e => (e && e.message ? e.message : String(e)).split("\n")[0].slice(0, 400);

/* ---------------------------------------------------------------------------
   Forbidden names. The lists are read from the Fort's own tests, never copied here.
   ------------------------------------------------------------------------- */
// AGENTS.md: "Halcyon ... You may name it. Do not key it." The intro and the Forge forbid it; a Stage pack may say it.
const NAMEABLE = ["Halcyon"];
function regexLiterals(text) {
  const out = [];
  const re = /\/((?:\\.|\[(?:\\.|[^\]\\])*\]|[^\/\\\n])+)\/([gimsuy]*)/g;
  let m;
  while ((m = re.exec(text))) out.push([m[1], m[2].replace(/[gy]/g, "")]);
  return out;
}
function loadForbidden() {
  const intro = path.join(HERE, "..", "intro", "test.mjs");
  const gen = path.join(HERE, "..", "generator", "test.mjs");
  if (!fs.existsSync(intro)) return { list: null, from: [] };
  const list = [], from = [];
  // `mid` is for a capitalised word that is only a name in mid-sentence ("at the Keep"); "Keep it" opening a sentence is a verb.
  const add = (src, flags, mid) => {
    const alts = src.split("|").filter(a => !NAMEABLE.includes(a));
    if (alts.length) list.push({ re: new RegExp(alts.join("|"), flags + "g"), mid: !!mid });
  };
  const isyntax = /https?|script|link\[|<link/; // the intro's own network checks are done by the network check here
  // intro/test.mjs: `for (const bad of [ /Sleeper/i, ... ])`
  const it = fs.readFileSync(intro, "utf8");
  const m = it.match(/for \(const bad of \[([^\n]*)\]\)/);
  if (m) { for (const [s, f] of regexLiterals(m[1])) if (!isyntax.test(s)) add(s, f); from.push("intro/test.mjs"); }
  // generator/test.mjs: `const FORBIDDEN = /.../i;` and `const FORBIDDEN_CASE = /.../;`
  if (fs.existsSync(gen)) {
    const gt = fs.readFileSync(gen, "utf8");
    for (const name of ["FORBIDDEN", "FORBIDDEN_CASE"]) {
      const g = gt.match(new RegExp("const " + name + "\\s*=\\s*(/(?:\\\\.|[^/\\\\\\n])+/[a-z]*)\\s*;"));
      if (g) { const [[s, f]] = regexLiterals(g[1]); add(s, f, name === "FORBIDDEN_CASE"); }
    }
    if (list.length) from.push("generator/test.mjs");
  }
  return { list: list.length ? list : null, from };
}
const FORBIDDEN = loadForbidden();

function stringsOf(x, out = []) {
  if (typeof x === "string") out.push(x);
  else if (Array.isArray(x)) for (const v of x) stringsOf(v, out);
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) { out.push(k); stringsOf(v, out); }
  return out;
}

/* ---------------------------------------------------------------------------
   Static checks on one built page
   ------------------------------------------------------------------------- */
const NS_OK = /^https?:\/\/www\.w3\.org\/(1999\/xhtml|2000\/svg|1999\/xlink|1998\/Math\/MathML)$/;
function networkScan(html) {
  const bad = [];
  for (const m of html.matchAll(/\bhttps?:\/\/[^\s"'<>)\\]+/gi)) if (!NS_OK.test(m[0])) bad.push(m[0]);
  for (const m of html.matchAll(/<(?:script|img|iframe|embed|source|video|audio|link|object)\b[^>]*?\b(?:src|href|data)\s*=\s*["']?(?!data:|#|\$\{|["'>])[^\s"'>]+/gi)) bad.push(m[0].slice(0, 120));
  for (const m of html.matchAll(/(?<![A-Za-z.])url\(\s*["']?(?!data:|#|\$\{)[^)"']+/gi)) bad.push(m[0].slice(0, 120));
  for (const m of html.matchAll(/@import\b[^;]{0,80}/gi)) bad.push(m[0]);
  for (const m of html.matchAll(/["'(]\/\/[a-z0-9-]+\.[a-z0-9.-]+\//gi)) bad.push("protocol-relative " + m[0]);
  for (const m of html.matchAll(/\b(?:fetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource|importScripts|serviceWorker)/g)) bad.push("script reaches the network: " + m[0]);
  return [...new Set(bad)];
}
// The inverse of the build's escape, so the sources can be found inside the page.
const safe = s => s.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

/* ---------------------------------------------------------------------------
   Browser sessions
   ------------------------------------------------------------------------- */
const URL_OF = (spec, query) => pathToFileURL(spec.file).href + (query ? "?" + query : "");

async function session(spec, o = {}) {
  const ctx = await browser.newContext({
    viewport: { width: o.width || 360, height: o.height || 740 },
    reducedMotion: o.reduced === false ? "no-preference" : "reduce",
    colorScheme: o.colorScheme || "light",
    deviceScaleFactor: 1,
  });
  if (o.init) await ctx.addInitScript(o.init, o.initArg);
  const page = await ctx.newPage();
  page.setDefaultTimeout(o.timeout || 5000);
  const s = { ctx, page, errors: [], requests: [], tag: o.tag || "" };
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") s.errors.push(`console.${m.type()}: ${m.text().slice(0, 300)}`); });
  page.on("pageerror", e => s.errors.push("pageerror: " + errText(e)));
  page.on("request", r => { const u = r.url(); if (!/^(file|data):/i.test(u)) s.requests.push(u.slice(0, 200)); });
  s.close = async () => {
    for (const e of s.errors) fail(spec.id, "console", (s.tag ? `[${s.tag}] ` : "") + e);
    for (const u of s.requests) fail(spec.id, "network", `request during play: ${u}`);
    await ctx.close().catch(() => {});
  };
  return s;
}

// What the page looks like right now. Runs inside the page. With `wait`, it first waits for the page to stop being busy.
async function READ(arg) {
  const app = document.getElementById("app");
  if (arg.wait) {
    const t0 = performance.now();
    while (app.dataset.busy !== "0" && performance.now() - t0 < arg.limit) await new Promise(r => setTimeout(r, 2));
  }
  const de = document.documentElement;
  const slide = document.querySelector("#slides .sl:not(.out)");
  const track = slide && slide.querySelector(".track");
  const name = n => n ? n.tagName.toLowerCase() + (n.id ? "#" + n.id : "") + (typeof n.className === "string" && n.className.trim() ? "." + n.className.trim().split(/\s+/).join(".") : "") : "?";
  const anims = document.getAnimations().map(a => {
    const t = a.effect && a.effect.target;
    const n = a.animationName || a.transitionProperty || "";
    return `${a.constructor.name}${n ? " " + n : ""} on ${name(t)}`;
  });
  // Content that is wider than the window or than its box, even where the page clips it so that the page itself does not scroll.
  const vw = de.clientWidth;
  let clip = 0, clipWhy = "";
  const over = (el, n) => { if (n > clip) { clip = n; clipWhy = name(el) + ` "${(el.innerText || "").replace(/\s+/g, " ").slice(0, 40)}"`; } };
  for (const b of document.querySelectorAll("#bar, #hud, #deck, #stage")) over(b, b.scrollWidth - b.clientWidth);
  if (slide) for (const p of slide.querySelectorAll("*")) {
    const r = p.getBoundingClientRect();
    if (r.width <= 1 || p.closest(".sr-only")) continue;
    over(p, Math.ceil(r.right - vw)); over(p, Math.ceil(-r.left));
  }
  const end = slide && slide.querySelector(".end-title");
  let found = null;
  try { found = JSON.parse(localStorage.getItem(window.PACK.storageKey)).found; } catch (e) { found = null; }
  const a = document.activeElement;
  return {
    phase: app.dataset.phase, node: app.dataset.node, busy: app.dataset.busy === "1",
    secretHidden: !!(slide && slide.querySelector('[data-act="reveal"]')),
    keys: slide ? [...slide.querySelectorAll(".opt")].map(b => ({ key: b.dataset.key, locked: b.getAttribute("aria-disabled") === "true" })) : [],
    chips: slide ? [...slide.querySelectorAll(".chip")].map(c => c.dataset.note) : [],
    track: !!track,
    sig: slide ? slide.innerText.replace(/\s+/g, " ").slice(0, 160) : "",
    overflow: Math.max(de.scrollWidth - de.clientWidth, document.body.scrollWidth - de.clientWidth, clip),
    anims, clipWhy,
    endTitle: end ? end.textContent : null,
    found,
    hasField: !!document.getElementById("inField"),
    fieldFocused: !!(a && a.id === "inField"),
    sheet: [...document.querySelectorAll(".sheet")].filter(s => !s.hidden).map(s => s.id),
  };
}
const read = (page, wait = true) => page.evaluate(READ, { wait, limit: 8000 });
const describe = st => `phase=${st.phase} node=${st.node} busy=${st.busy} "${st.sig.slice(0, 70)}"`;

/* The walker: plays one route from the title to an ending by keyboard.
   Options: wait (wait for the page to settle before each key; the reduced-motion default),
            checkMotion (no running animation at each stop), checkWidth (no horizontal scroll at each stop),
            onState(st) (a hook for the chip and commentary checks). */
async function walk(page, spec, route, o = {}) {
  const wait = o.wait !== false;
  let si = 0, n = 0, same = 0, last = "", states = 0, busyAt = 0;
  const steps = route.steps;
  let st;
  for (;;) {
    if (++n > 4000) throw new Error("did not reach an ending in 4000 actions: " + describe(st));
    st = await read(page, wait);
    states++;
    if (wait && st.busy) throw new Error("the page stayed busy for 8 s: " + describe(st));
    if (!st.busy) {
      if (o.checkMotion && st.anims.length) fail(spec.id, "motion", `animation running under reduced motion after a step: ${[...new Set(st.anims)].sort().slice(0, 4).join("; ")}`);
      if (o.checkWidth && st.overflow > 0) fail(spec.id, "layout", `content is ${st.overflow}px wider than the ${o.checkWidth}px window at a ${st.node || st.phase}${st.clipWhy ? " (" + st.clipWhy + ")" : ""}`);
      if (o.onState) await o.onState(st);
    }
    if (st.phase === "play" && st.node === "ending" && !st.busy) break;
    const sig = [st.phase, st.node, st.busy, st.sig, si].join("|");
    same = sig === last ? same + 1 : 0; last = sig;
    if (same > (wait ? 3 : 40) && !st.busy) throw new Error("stuck: " + describe(st));
    if (st.busy) { // full motion: a key skips the cue. Every cue must settle on finish(), so the page must stop being busy soon.
      busyAt = busyAt || Date.now();
      if (Date.now() - busyAt > 8000) throw new Error("still busy 8 s after keys that skip the motion (a kit cue that does not settle on finish()?): " + describe(st));
      // The title slide keeps focus on its Begin button while the opening cues play, and Enter on it would begin again
      // (reported: view.js). So with no node on the page yet, wait for the cues to end instead of pressing.
      if (st.node) await page.keyboard.press("Enter");
      await page.waitForTimeout(st.node ? 20 : 50);
      continue;
    }
    busyAt = 0;
    if (st.phase === "title" || st.phase === "card") { await page.keyboard.press("Enter"); continue; }
    if (st.node === "beat") { await page.keyboard.press(st.secretHidden ? "r" : "Enter"); continue; }
    if (st.node === "roll") { await page.keyboard.press("Enter"); continue; }
    if (st.node === "choice") {
      const step = steps[si++];
      if (!step || step.opt == null) throw new Error(`the page asks a choice (${st.keys.map(k => k.key).join(",")}) but the route has ${step ? "an input" : "no step"} here`);
      const key = step.opt.slice(step.opt.indexOf(".") + 1);
      const i = st.keys.findIndex(k => k.key === key);
      if (i < 0) throw new Error(`option "${key}" (${step.opt}) is not on the page; it shows ${st.keys.map(k => k.key).join(",")}`);
      if (st.keys[i].locked) throw new Error(`option ${step.opt} is locked on the page`);
      if (i > 8) throw new Error(`option ${step.opt} is number ${i + 1}; there is no key for it`);
      await page.keyboard.press(String(i + 1));
      continue;
    }
    if (st.node === "input") {
      const step = steps[si++];
      if (!step || step.input == null) throw new Error("the page asks for typed text but the route has " + (step ? "a pick" : "no step") + " here");
      if (!st.fieldFocused) { fail(spec.id, "routes", "the text field does not take focus when the input appears"); await page.focus("#inField"); }
      await page.keyboard.type(String(step.input));
      await page.keyboard.press("Enter");
      continue;
    }
    throw new Error("cannot go on: " + describe(st));
  }
  if (si !== steps.length) throw new Error(`the page reached an ending after ${si} of ${steps.length} steps`);
  return { st, states };
}

/* ---------------------------------------------------------------------------
   Checks that need a live page
   ------------------------------------------------------------------------- */
const css = s => JSON.stringify(s); // for attribute selectors

async function checkChip(page, spec, id, where) {
  const note = spec.pack.notes[id];
  const sel = `#slides .sl:not(.out) .chip[data-note=${css(id)}]`;
  try {
    await page.click(sel, { timeout: 3000 });
    const r = await page.evaluate(id => {
      const sheet = document.getElementById("sheet-notes"), art = document.getElementById("note-" + id);
      const a = document.activeElement;
      return { open: !sheet.hidden, art: !!art, hit: !!(art && art.classList.contains("hit")), term: art ? art.querySelector("h4").textContent : null,
        text: art ? art.querySelector("p").textContent : null, focusIn: !!(a && sheet.contains(a)), inert: document.getElementById("app").inert };
    }, id);
    if (!r.open) fail(spec.id, "chips", `chip "${id}" (${where}) did not open the Notes sheet`);
    else if (!r.art) fail(spec.id, "chips", `chip "${id}" (${where}) opened the Notes sheet with no entry for the note`);
    else {
      if (!r.hit) fail(spec.id, "chips", `chip "${id}" (${where}): its note is not marked as the one asked for`);
      if (r.term !== note.term || r.text !== note.text) fail(spec.id, "chips", `chip "${id}" (${where}) shows the wrong text`);
      if (!r.focusIn) fail(spec.id, "chips", `chip "${id}" (${where}): focus is not inside the Notes sheet`);
    }
    await page.keyboard.press("Escape");
    const after = await page.evaluate(() => ({ open: !document.getElementById("sheet-notes").hidden, inert: document.getElementById("app").inert }));
    if (after.open || after.inert) fail(spec.id, "chips", `chip "${id}" (${where}): Esc did not close the Notes sheet`);
    await letGo(page);
  } catch (e) {
    fail(spec.id, "chips", `chip "${id}" (${where}): ${errText(e)}`);
    await page.keyboard.press("Escape").catch(() => {});
  }
}

// After a sheet closes, focus goes back to the button that opened it, and Enter on that button would open the sheet again.
// A player who wants to go on moves focus away; the test lets go of it.
const letGo = page => page.evaluate(() => { if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); });
async function setSetting(page, name, val) {
  await page.click("#setBtn");
  await page.click(`#sheet-settings [data-set=${css(name)}][data-val=${css(val)}]`);
  await page.keyboard.press("Escape");
  await letGo(page);
}

async function checkCommentary(page, spec) {
  const probe = () => page.evaluate(() => {
    const t = document.querySelector("#slides .sl:not(.out) .track");
    if (!t) return null;
    const r = t.getBoundingClientRect();
    return { display: getComputedStyle(t).display, w: r.width, h: r.height, attr: document.documentElement.dataset.commentary, term: (t.querySelector("b") || {}).textContent || "" };
  });
  try {
    const on = await probe();
    if (!on || on.display === "none" || !on.w || !on.h) { fail(spec.id, "commentary", "the commentary track is not visible when commentary is on"); return; }
    await setSetting(page, "commentary", "off");
    const off = await probe();
    if (!off || off.attr !== "off" || off.display !== "none" || off.w || off.h) fail(spec.id, "commentary", `the toggle did not hide the track (data-commentary=${off && off.attr}, display=${off && off.display})`);
    await setSetting(page, "commentary", "on");
    const back = await probe();
    if (!back || back.display === "none") fail(spec.id, "commentary", "turning commentary back on did not show the track");
    // A note shown in the track also joins the Notes sheet.
    const term = on.term.replace(/\.$/, "");
    await page.keyboard.press("n");
    const terms = await page.evaluate(() => [...document.querySelectorAll("#body-notes article h4")].map(h => h.textContent));
    await page.keyboard.press("Escape");
    await letGo(page);
    if (!terms.includes(term)) fail(spec.id, "commentary", `the track's note "${term}" is not in the Notes sheet`);
  } catch (e) { fail(spec.id, "commentary", errText(e)); await page.keyboard.press("Escape").catch(() => {}); }
}

async function checkVerify(page, spec) {
  const sim = spec.sim, id = spec.id;
  try {
    await page.keyboard.press("v");
    await page.waitForSelector("#body-verify .ec", { timeout: 60000 });
    const got = await page.evaluate(() => {
      const b = document.getElementById("body-verify");
      const tot = b.querySelector("[data-total]");
      return { total: tot ? tot.dataset.total : null, ends: Object.fromEntries([...b.querySelectorAll(".ec")].map(e => [e.dataset.ending, e.dataset.count])), text: b.innerText.replace(/\s+/g, " "), rows: b.querySelectorAll(".route").length };
    });
    if (got.total !== String(sim.paths)) fail(id, "verify", `Verify shows ${got.total} paths; Stage.simulate counts ${sim.paths}`);
    for (const [e, c] of Object.entries(sim.endings)) if (got.ends[e] !== String(c)) fail(id, "verify", `Verify shows ${got.ends[e]} paths to "${e}"; Stage.simulate counts ${c}`);
    for (const e of Object.keys(got.ends)) if (!(e in sim.endings)) fail(id, "verify", `Verify lists an ending "${e}" that Stage.simulate does not`);
    if (!got.text.includes(`${sim.routes.length} routes`)) fail(id, "verify", `Verify does not say "${sim.routes.length} routes"`);
    if (!got.text.includes(`${sim.states} states`)) fail(id, "verify", `Verify does not say "${sim.states} states"`);
    if (got.rows !== Math.min(60, sim.routes.length)) fail(id, "verify", `Verify lists ${got.rows} route rows; expected ${Math.min(60, sim.routes.length)}`);
    // A route replays to its ending; Last pick stops at a choice.
    const i = sim.routes.findIndex((r, k) => k < 60 && r.steps.some(s => s.opt));
    if (i < 0) return;
    await page.click(`#body-verify .route[data-route="${i}"]`);
    await page.waitForFunction(() => document.getElementById("app").dataset.node === "ending");
    const end = await read(page);
    const want = spec.pack.script.endings[sim.routes[i].ending].title;
    if (end.endTitle !== want) fail(id, "verify", `replaying route ${i} landed on "${end.endTitle}", not "${want}"`);
    await page.keyboard.press("v");
    await page.waitForSelector("#body-verify .ec", { timeout: 60000 });
    await page.click(`#body-verify [data-route-last="${i}"]`);
    await page.waitForFunction(() => document.getElementById("app").dataset.node === "choice");
    const mid = await read(page);
    if (mid.phase !== "play" || !mid.keys.length) fail(id, "verify", "Last pick did not stop at a choice with options");
  } catch (e) { fail(id, "verify", errText(e)); }
}

/* Contrast. A token pair is text on a ground. Tokens are read as the shell reads them (--st-*). */
const TEXT_ON = {
  ink: ["bg", "panel", "card"], "ink-soft": ["bg", "panel", "card"], muted: ["bg", "panel", "card"],
  accent: ["bg", "panel"], good: ["bg", "panel"], bad: ["bg", "panel", "card"], lamp: ["bg", "panel"], "on-accent": ["accent"],
};
const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
async function tokensNow(page) {
  return page.evaluate(names => {
    const cs = getComputedStyle(document.documentElement), probe = document.createElement("i");
    document.body.appendChild(probe);
    const out = {};
    for (const n of names) {
      const raw = cs.getPropertyValue("--st-" + n).trim();
      if (!raw) { out[n] = null; continue; }
      probe.style.color = ""; probe.style.color = raw;
      const c = getComputedStyle(probe).color.match(/[\d.]+/g);
      out[n] = c ? c.slice(0, 3).map(Number).concat(c.length > 3 ? [Number(c[3])] : [1]) : null;
    }
    probe.remove();
    return out;
  }, [...new Set(Object.entries(TEXT_ON).flat(2))]);
}
async function checkContrast(spec) {
  const id = spec.id;
  const rows = [];
  const measure = async (label, page) => {
    const t = await tokensNow(page);
    for (const [fg, grounds] of Object.entries(TEXT_ON)) for (const g of grounds) {
      if (!t[fg] || !t[g]) { fail(id, "contrast", `${label}: token ${!t[fg] ? fg : g} is missing or not a colour`); continue; }
      const r = ratio(t[fg], t[g]);
      rows.push([label, fg, g, r]);
      if (r < 4.5) fail(id, "contrast", `${label}: ${fg} on ${g} is ${r.toFixed(2)}:1 (needs 4.5:1)`);
    }
  };
  // By the page's own theme setting, and by the system setting with no data-theme (the media query in the build).
  for (const scheme of ["light", "dark"]) {
    const s = await session(spec, { colorScheme: scheme, tag: "contrast" });
    try {
      await s.page.goto(URL_OF(spec));
      await s.page.evaluate(t => document.documentElement.setAttribute("data-theme", t), scheme);
      await measure(`${scheme} (data-theme)`, s.page);
      const attr = await s.page.evaluate(() => { document.documentElement.removeAttribute("data-theme"); return getComputedStyle(document.documentElement).colorScheme; });
      await measure(`${scheme} (system)`, s.page);
      const a = await tokensNow(s.page);
      await s.page.evaluate(t => document.documentElement.setAttribute("data-theme", t), scheme === "light" ? "dark" : "light");
      const b = await tokensNow(s.page);
      if (JSON.stringify(a) === JSON.stringify(b)) fail(id, "contrast", `the light and dark themes have the same colours (${attr})`);
    } catch (e) { fail(id, "contrast", errText(e)); }
    await s.close();
  }
  return rows;
}

/* Layout: the title and every sheet, at 360 and 1280. */
async function checkSheets(page, spec, width) {
  const id = spec.id;
  try {
    const st = await read(page);
    if (st.overflow > 0) fail(id, "layout", `horizontal scroll (${st.overflow}px) on the title screen at ${width}px`);
    const keys = [["h", "help"], ["n", "notes"], ["c", "card"], ["v", "verify"]];
    for (const [k, name] of keys) {
      await page.keyboard.press(k);
      if (name === "verify") await page.waitForSelector("#body-verify .ec", { timeout: 60000 });
      const r = await page.evaluate(name => {
        const de = document.documentElement, p = document.querySelector(`#sheet-${name} .sheet-panel`), b = document.querySelector(`#sheet-${name} .sheet-body`);
        return { page: de.scrollWidth - de.clientWidth, panel: p.scrollWidth - p.clientWidth, body: b.scrollWidth - b.clientWidth };
      }, name);
      if (r.page > 0 || r.panel > 0 || r.body > 0) fail(id, "layout", `the ${name} sheet scrolls sideways at ${width}px (page ${r.page}, panel ${r.panel}, body ${r.body})`);
      await page.keyboard.press("Escape");
    }
    await page.click("#setBtn");
    const r = await page.evaluate(() => { const de = document.documentElement, p = document.querySelector("#sheet-settings .sheet-panel"); return { page: de.scrollWidth - de.clientWidth, panel: p.scrollWidth - p.clientWidth }; });
    if (r.page > 0 || r.panel > 0) fail(id, "layout", `the settings sheet scrolls sideways at ${width}px (page ${r.page}, panel ${r.panel})`);
    await page.keyboard.press("Escape");
  } catch (e) { fail(id, "layout", `${width}px: ${errText(e)}`); }
}

/* ---------------------------------------------------------------------------
   Route sessions
   ------------------------------------------------------------------------- */
const forceOf = route => route.steps.filter(s => s.opt != null && s.result != null).map(s => s.result);
const queryOf = route => { const f = forceOf(route); return "seed=1" + (f.length ? "&force=" + f.join(",") : ""); };
const stepsOf = route => route.steps.map(s => s.opt != null ? s.opt + (s.result ? "=" + s.result : "") : "(typed)").join(" > ");

async function checkEnding(spec, route, st, label) {
  const want = route.ending;
  const wantTitle = spec.pack.script.endings[want].title;
  if (st.endTitle !== wantTitle) { fail(spec.id, "routes", `${label}: ended on "${st.endTitle}", not "${wantTitle}" (${want})`); return false; }
  if (st.found) {
    if (st.found.length !== 1 || st.found[0] !== want) fail(spec.id, "routes", `${label}: the page records endings ${JSON.stringify(st.found)}, not [${want}]`);
  }
  return true;
}

async function routeTask(spec, route, idx, wide) {
  const s = await session(spec, { width: wide ? 1280 : 360, height: wide ? 800 : 740, tag: `route ${idx}${wide ? " @1280" : ""}` });
  const label = `route ${idx} [${stepsOf(route).slice(0, 90)}]`;
  try {
    await s.page.goto(URL_OF(spec, queryOf(route)));
    const { st } = await walk(s.page, spec, route, {
      checkMotion: true, checkWidth: wide ? 1280 : 360,
      onState: st => hooks(s.page, spec, st),
    });
    await checkEnding(spec, route, st, label);
  } catch (e) { fail(spec.id, "routes", `${label}: ${errText(e)}`); }
  await s.close();
}

// Chip and commentary checks run once per pack (and per kind of place), inside whichever route meets them first.
async function hooks(page, spec, st) {
  const claim = k => { if (spec.claims.has(k)) return false; spec.claims.add(k); return true; };
  if (st.track && spec.pack.commentary && claim("commentary")) await checkCommentary(page, spec);
  for (const id of st.chips) {
    if (!spec.pack.notes[id]) { fail(spec.id, "chips", `a chip names "${id}", which is not in notes.json`); continue; }
    if (claim("chip:" + id + ":" + st.node)) { spec.chipsTested.add(id); await checkChip(page, spec, id, st.node); }
  }
}

/* Variants on the shortest route: storage that throws, storage with garbage, Calm, full motion. */
async function variantTask(spec, kind) {
  const route = spec.shortest;
  const key = spec.pack.storageKey;
  const o = { tag: kind };
  if (kind === "storage-getter") o.init = () => { Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new DOMException("denied", "SecurityError"); } }); };
  if (kind === "storage-methods") o.init = () => { for (const m of ["getItem", "setItem", "removeItem", "clear", "key"]) Storage.prototype[m] = function () { throw new DOMException("full", "QuotaExceededError"); }; };
  if (kind === "storage-garbage") {
    o.init = k => { try { localStorage.setItem(k, "{{not json"); } catch (e) {} };
    o.initArg = key;
  }
  if (kind === "full-motion") { o.reduced = false; o.timeout = 15000; }
  if (kind === "calm") { o.reduced = false; }
  const s = await session(spec, o);
  const label = `${kind}: route [${stepsOf(route).slice(0, 80)}]`;
  try {
    await s.page.goto(URL_OF(spec, queryOf(route)));
    if (kind === "calm") {
      await setSetting(s.page, "motion", "calm");
      const m = await s.page.evaluate(() => document.documentElement.dataset.motion);
      if (m !== "calm") fail(spec.id, "calm", `Settings > Calm left data-motion="${m}"`);
    }
    const { st } = await walk(s.page, spec, route, {
      wait: kind !== "full-motion",
      checkMotion: kind === "calm",
      checkWidth: kind === "full-motion" ? 0 : 360, // a slide still sliding in is wider than the window for a moment
    });
    const ok = await checkEnding(spec, route, { ...st, found: kind.startsWith("storage-") && kind !== "storage-garbage" ? null : st.found }, label);
    const check = kind === "calm" ? "calm" : kind === "full-motion" ? "motion" : "storage";
    if (!ok) fail(spec.id, check, `${label}: did not reach its ending`);
    if (kind === "storage-garbage") {
      // The garbage must be replaced by a good record as play goes on, or at least ignored.
      const rec = await s.page.evaluate(k => localStorage.getItem(k), key);
      if (rec === "{{not json") fail(spec.id, "storage", "the page never replaced a garbage record");
    }
    if (kind === "storage-getter" || kind === "storage-methods") {
      const title = await s.page.evaluate(() => document.querySelector(".brand-sub").textContent);
      if (!/Endings found 1 of/.test(title)) fail(spec.id, "storage", `with storage blocked, the top bar says "${title}" at the end instead of counting the ending found`);
    }
  } catch (e) {
    fail(spec.id, kind === "calm" ? "calm" : kind === "full-motion" ? "motion" : "storage", `${label}: ${errText(e)}`);
  }
  await s.close();
}

/* The page-level task: layout, verify, contrast, shots. */
async function pageTask(spec) {
  for (const width of [360, 1280]) {
    const s = await session(spec, { width, height: width === 360 ? 740 : 800, tag: `title @${width}` });
    try {
      await s.page.goto(URL_OF(spec, "seed=1"));
      await s.page.waitForFunction(() => document.getElementById("app").dataset.phase === "title");
      await checkSheets(s.page, spec, width);
      if (width === 360) {
        await checkVerify(s.page, spec);
        if (SHOTS) { fs.mkdirSync(SHOTS, { recursive: true }); await s.page.keyboard.press("Escape"); await s.page.screenshot({ path: path.join(SHOTS, `${spec.id}-title.png`) }); }
      }
    } catch (e) { fail(spec.id, "layout", `${width}px: ${errText(e)}`); }
    await s.close();
  }
  await checkContrast(spec);
}

/* ---------------------------------------------------------------------------
   Prelude: find the pages, check each against its sources, plan the work
   ------------------------------------------------------------------------- */
if (!fs.existsSync(DIST)) { console.log("FAIL: no dist/ folder beside test.mjs. Build the packs first (node stage/tools/build.mjs stage/packs/<id>)"); process.exit(1); }
const files = fs.readdirSync(DIST).filter(f => f.endsWith(".html")).sort().filter(f => !ONLY.length || ONLY.includes(f.replace(/\.html$/, "")));
if (!files.length) { console.log("FAIL: no built page in dist/"); process.exit(1); }

console.log(`The Stage test: ${files.length} page(s) in ${path.relative(process.cwd(), DIST) || "."}; ${JOBS} at a time${SAMPLE ? `; SAMPLE=${SAMPLE} routes per pack` : ""}`);
console.log(FORBIDDEN.list ? `forbidden names: ${FORBIDDEN.list.length} pattern(s) from ${FORBIDDEN.from.join(" and ")} (Halcyon may be named)` : "forbidden names: SKIPPED (no ../intro/test.mjs beside stage/)");

const specs = [];
for (const f of files) {
  const file = path.join(DIST, f);
  const html = fs.readFileSync(file, "utf8");
  const stem = f.replace(/\.html$/, "");
  const net = networkScan(html);
  // Read the pack the page carries.
  let carried, assets;
  {
    const s = await session({ id: stem }, { tag: "prelude" });
    try {
      await s.page.goto(pathToFileURL(file).href);
      ({ carried, assets } = await s.page.evaluate(() => ({ carried: JSON.parse(JSON.stringify(window.PACK)), assets: window.ASSETS || {} })));
    } catch (e) { fail(stem, "build", `cannot open ${f}: ${errText(e)}`); }
    await s.close();
  }
  if (!carried) continue;
  const id = carried.id;
  for (const u of net) fail(id, "network", `network reference in the HTML: ${u}`);
  const packDir = path.join(PACKS, id);
  if (!fs.existsSync(path.join(packDir, "pack.json"))) { fail(id, "build", `dist/${f} carries pack "${id}" but packs/${id}/ does not exist`); continue; }
  const pack = JSON.parse(JSON.stringify(loadPack(packDir)));
  let stale = false;
  try { assert.deepStrictEqual(carried, pack); } catch (e) { stale = true; fail(id, "build", `dist/${f} is stale: it does not match packs/${id}/. Run node tools/build.mjs packs/${id}`); }
  const src = p => fs.readFileSync(path.join(HERE, p), "utf8");
  for (const p of ["engine/stage.js", "ui/view.js", `ui/kits/${pack.kit}.js`, "ui/style.css"]) {
    if (!fs.existsSync(path.join(HERE, p))) { fail(id, "build", `${p} is missing`); continue; }
    const text = p.endsWith(".css") ? src(p).replace(/<\/style/gi, "<\\/style") : safe(src(p));
    if (!html.includes(text)) { stale = true; fail(id, "build", `dist/${f} is stale: it does not contain the current ${p}. Run node tools/build.mjs packs/${id}`); }
  }
  // Forbidden names, in the pack's text and in its SVG art.
  if (FORBIDDEN.list) {
    const texts = stringsOf(pack);
    for (const [name, uri] of Object.entries(assets)) {
      const m = String(uri).match(/^data:image\/svg\+xml;base64,(.*)$/);
      if (m) texts.push(Buffer.from(m[1], "base64").toString("utf8"));
    }
    for (const { re, mid } of FORBIDDEN.list) {
      for (const t of texts) {
        for (const m of t.matchAll(re)) {
          if (mid && !/[^\s.!?:;"“”‘’'()—-]\s+$/.test(t.slice(0, m.index))) continue; // opens a sentence or a line
          fail(id, "names", `forbidden text "${m[0]}" (${re.source.slice(0, 40)}) in: ${t.replace(/\s+/g, " ").slice(0, 100)}`);
          break;
        }
      }
    }
  }
  if (stale) continue; // the page would play a different story than the one the routes come from
  const sim = Stage.simulate(pack);
  const check = Stage.check(pack);
  if (check.errors && check.errors.length) fail(id, "build", `the pack does not validate: ${check.errors[0]}`);
  const titleToId = {};
  for (const [eid, e] of Object.entries(pack.script.endings)) titleToId[e.title] = titleToId[e.title] ? null : eid;
  // Which routes to play.
  let routes = sim.routes.map((r, i) => ({ ...r, i }));
  if (SAMPLE && routes.length > SAMPLE) {
    const pick = new Map();
    for (const r of routes) if (!pick.has(r.ending) && pick.size < SAMPLE) pick.set(r.ending, r);
    for (let k = 0; pick.size < SAMPLE && k < SAMPLE * 4; k++) { const r = routes[Math.floor((k * routes.length) / SAMPLE) % routes.length]; pick.set("#" + r.i, r); }
    for (let k = 0; pick.size < SAMPLE; k++) pick.set("#" + routes[k].i, routes[k]);
    routes = [...pick.values()];
  }
  const byLen = [...sim.routes].sort((a, b) => a.steps.length - b.steps.length);
  specs.push({ id, file, pack, sim, routes, titleToId, shortest: byLen[0], longest: byLen[byLen.length - 1],
    claims: new Set(), chipsTested: new Set(), done: 0, total: 0, t0: Date.now(), failedBefore: 0 });
  for (const e of Object.keys(sim.endings)) if (!sim.endings[e]) fail(id, "routes", `ending "${e}" is never reached by Stage.simulate`);
}

// Notes that a chip can show: every `notes` array in the script.
function chipNotes(pack) {
  const ids = new Set();
  const take = a => { for (const n of a || []) ids.add(n); };
  const beats = bs => { for (const b of bs || []) take(b.notes); };
  const sc = pack.script || {};
  for (const s of sc.scenes || []) {
    beats(s.beats);
    for (const g of s.choices || []) {
      take(g.notes);
      for (const o of g.options || []) {
        beats(o.then);
        for (const r of Object.values((o.roll && o.roll.results) || {})) beats(r.then);
      }
    }
  }
  for (const e of Object.values(sc.endings || {})) beats(e.beats);
  return ids;
}

/* ---------------------------------------------------------------------------
   The work, run in parallel
   ------------------------------------------------------------------------- */
const queue = [];
const add = (spec, name, fn) => { spec.total++; queue.push({ spec, name, fn }); };
for (const spec of specs) {
  // The first route of each pack runs first, so chip and commentary claims are made early; the long page task is spread out.
  add(spec, "page", () => pageTask(spec));
  const first = spec.longest;
  add(spec, "longest route at 1280", () => routeTask(spec, first, "longest", true));
  for (const kind of ["storage-getter", "storage-methods", "storage-garbage", "calm", "full-motion"]) add(spec, kind, () => variantTask(spec, kind));
  for (const r of spec.routes) add(spec, "route", () => routeTask(spec, r, r.i, false));
}
function doneOne(spec) {
  spec.done++;
  if (spec.done === spec.total) {
    const mine = failures.filter(f => f.pack === spec.id);
    const sec = ((Date.now() - spec.t0) / 1000).toFixed(1);
    console.log(`${mine.length ? "FAIL" : "ok  "} ${spec.id}: ${spec.routes.length} of ${spec.sim.routes.length} routes, ${spec.total - spec.routes.length} page checks${mine.length ? `, ${mine.length} problem(s)` : ""} (${secs()} s elapsed)`);
  }
}
let next = 0;
async function worker() {
  while (next < queue.length) {
    const job = queue[next++];
    try { await job.fn(); } catch (e) { fail(job.spec.id, "routes", `${job.name}: ${errText(e)}`); }
    doneOne(job.spec);
  }
}
await Promise.all(Array.from({ length: Math.min(JOBS, queue.length) }, worker));
await browser.close();

/* Coverage of the chip check, and the verdict. */
for (const spec of specs) {
  const want = chipNotes(spec.pack);
  const unseen = [...want].filter(id => !spec.chipsTested.has(id));
  notes.push(`${spec.id}: chips tested for ${spec.chipsTested.size} of ${want.size} note ids${spec.pack.commentary ? `; commentary ${spec.claims.has("commentary") ? "tested" : "NOT TESTED (no track met)"}` : "; no commentary"}${unseen.length ? `; not met on the routes played: ${unseen.join(", ")}` : ""}`);
  if (spec.pack.commentary && !spec.claims.has("commentary") && !SAMPLE) fail(spec.id, "commentary", "no commentary track appeared on any route, so the toggle was not tested");
  if (unseen.length && !SAMPLE) fail(spec.id, "chips", `chips for these notes were never met on a route: ${unseen.join(", ")}`);
}
console.log("");
for (const n of notes) console.log(n);
if (failures.length) {
  console.log("");
  const by = {};
  for (const f of failures) (by[f.check] = by[f.check] || []).push(f);
  for (const [check, list] of Object.entries(by)) {
    console.log(`${check}: ${list.length} problem(s)`);
    for (const f of list.slice(0, 8)) console.log(`  ${f.pack}: ${f.msg}${f.n > 1 ? `  (x${f.n})` : ""}`);
    if (list.length > 8) console.log(`  ... and ${list.length - 8} more`);
  }
}
console.log(`\n${(Date.now() - T0) / 1000 | 0} s total`);
if (failures.length) {
  const by = {};
  for (const f of failures) by[f.check] = (by[f.check] || 0) + 1;
  console.log("FAIL: " + Object.entries(by).map(([c, n]) => `${c} (${n})`).join(", "));
  process.exit(1);
}
console.log("PASS");
