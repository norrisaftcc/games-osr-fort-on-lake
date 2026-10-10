/*
 * forge.js — the Forge, a seeded dungeon generator for the Fort Country.
 *
 * The lesson ladder is fixed (TEMPLATES below). The content is rolled from
 * tables.js. Same seed, same dungeon, always.
 *
 *   Forge.generate({ template: 'tower' | 'ravine', seed: 42, partyLevel: 1 })  -> data
 *   Forge.toMarkdown(data)                                                     -> string
 *   Forge.toSVG(data)                                                          -> string
 *
 * Pure functions, no DOM. A classic script: in a browser it sets the global
 * `Forge` (load tables.js first); in Node, require('./forge.js').
 *
 * To add a template: write a gen<Name>(seed, level) that returns the same
 * shape of data (rooms with keys, exits, x/y/w/h and a panel id), list its
 * lessons in TEMPLATES, and register it in GENERATORS at the bottom.
 */
var Forge = (function () {
  "use strict";

  function tables() {
    if (typeof ForgeTables !== "undefined") return ForgeTables;
    if (typeof require === "function") return require("./tables.js");
    throw new Error("Load tables.js before forge.js");
  }

  /* ---------------------------------------------------------------- */
  /* The fixed ladders. Content is rolled; this is not.                */
  /* ---------------------------------------------------------------- */
  var TEMPLATES = {
    tower: {
      name: "Tower",
      tiers: [
        { id: "S", name: "Surface", panel: "surface" },
        { id: "C", name: "The Cellars", panel: "cellars" },
        { id: "W", name: "The Water Cave", panel: "cave" }
      ],
      lessons: [
        { slot: "light", label: "Marching order and light; the Plan / Execute gate",
          teaches: "Before anyone steps ashore, the party says who walks first and who holds the light. Looking and asking are free. Acting is a declared choice, and it costs time.",
          note: "Run the Plan / Execute gate here for the first time. In Plan, players look and ask, and you answer honestly: no dice, no time. When the caller says “Execute”, each player states one action. If someone acts early, ask once: “Is that your plan or your action?”" },
        { slot: "search", label: "Searching costs time",
          teaches: "Searching costs time. A 10' square takes one turn. The way down is found by searching, not by luck.",
          note: "Tell the players the price before they pay it: “Searching the rubble is one turn.” Then tick the clock where they can see it." },
        { slot: "doors", label: "Listening and doors",
          teaches: "Listening at a door and forcing it are separate choices, and each one costs something.",
          note: "The door is stuck so the party has to choose: listen first, force it, or go another way. Each forcing roll is noise." },
        { slot: "wander", label: "The clock is a monster: wandering checks",
          teaches: "The clock is a monster. From here on, roll for wanderers every 2 turns, 1-in-6.",
          note: "Roll the first wandering check here, openly, even if nothing comes. The players should hear the die." },
        { slot: "mapping", label: "Mapping: a loop, a dead end, a secret door",
          teaches: "Mapping. This level has a loop, a dead end, and a secret door that cuts the walk to the stair down.",
          note: "Call the space as the party moves, relative to their facing: “The passage runs 30 feet ahead, then turns right.” Let the mapper draw it like a turtle. Let the map be wrong; they will find out by walking it." },
        { slot: "retreat", label: "Retreat, rest and return",
          teaches: "Resources run down. Retreat, rest and return are moves, and the dungeon notices you were gone.",
          note: "Point out this room's door and walls. It is a place to stop. If the party goes home and comes back, roll on the Restock table." },
        { slot: "history", label: "Reading a site's history",
          teaches: "Reading a site's history. What the party reads here changes the last fight.",
          note: "Put the clue in plain sight. The lesson is not finding it. The lesson is using it later." },
        { slot: "parley", label: "The first parley: the reaction roll",
          teaches: "The first parley. Roll 2d6 for reaction before anyone draws a weapon.",
          note: "Roll reaction openly and add the speaker's Charisma modifier. Let the roll set the mood, not decide everything. A bribe, a name or a threat moves it one step." },
        { slot: "hazard", label: "Water and hazard as obstacles",
          teaches: "Water and hazard are obstacles, not damage-dealers. The question is how to cross, not whether you survive.",
          note: "Describe the hazard plainly and give its rule before anyone commits. Rope, poles, sealed bags and patience all work." },
        { slot: "climax", label: "The climax rewards what was learned",
          teaches: "The climax rewards what was learned. What the party read earlier changes this fight.",
          note: "If the party did not read the clue, run the fight straight. If they did, let it work exactly as written. Do not soften it either way." }
      ]
    },
    ravine: {
      name: "Ravine",
      lessons: [
        { slot: "morale", label: "Morale: enemies run",
          teaches: "Morale. Enemies run. A first fight ends early if the party lets it.",
          note: "Check morale at the first death and when half are down. These clans break often. Let them run, and let the party choose whether to chase." },
        { slot: "reaction", label: "The reaction roll and parley",
          teaches: "The reaction roll and parley. Talk first. The hireling can be bought.",
          note: "Roll 2d6 reaction when the party is seen, and again if they offer something. The hireling has its own price and its own loyalty." },
        { slot: "factions", label: "Factions: two clans who hate each other",
          teaches: "Factions. Two clans hate each other. Who you help changes the map.",
          note: "Each clan will pay to see the other hurt. Whoever the party helps takes the contested passage, and the loser's lair changes hands." },
        { slot: "alarm", label: "Alarm and reinforcement",
          teaches: "Alarm and reinforcement. The lair responds as a whole. A rescue against the clock.",
          note: "Once the alarm sounds, count rounds out loud. Reinforcements arrive on the schedule, not when it suits the story." },
        { slot: "deception", label: "Deception: read the table, not the words",
          teaches: "Deception. The hosts are friendly. Read the table, not the words.",
          note: "Describe every tell plainly when the party looks. Never call a roll for “sensing lies”. The lesson is noticing." },
        { slot: "avoidance", label: "Avoidance: not every lair is worth its cost",
          teaches: "Avoidance. Not every lair is worth its cost. Look at what is inside, then decide.",
          note: "Show the cost before the fight: bones, claw marks, the size of the thing. The reward is small on purpose." },
        { slot: "temple", label: "The temple: everything at once",
          teaches: "Everything at once: undead to turn, a trap, a leader who talks, and a choice with no right answer.",
          note: "This is the test. Do not warn the players which lesson each room repeats." }
      ]
    }
  };

  var DUNGEON_CLOCK = [
    ["One turn", "10 minutes of careful exploring"],
    ["A torch", "Burns 6 turns"],
    ["A lantern flask", "Burns 24 turns"],
    ["Wandering checks", "Every 2 turns, 1-in-6"],
    ["Rest", "One turn in six, or –1 to hit and damage"],
    ["Searching", "One turn per 10' square"],
    ["Listening", "1-in-6 (demi-humans 2-in-6)"],
    ["Forcing a stuck door", "1–2 on d6 (Strength adjusts). Noisy."]
  ];

  /* ---------------------------------------------------------------- */
  /* Seeded randomness                                                 */
  /* ---------------------------------------------------------------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hashSeed(seed, salt) {
    var h = (seed >>> 0) ^ 0x811c9dc5;
    var s = String(salt || "");
    for (var i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 0x01000193); }
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    return (h ^ (h >>> 13)) >>> 0;
  }
  function makeRng(seed) {
    var f = mulberry32(seed >>> 0);
    var r = {
      float: f,
      int: function (n) { return Math.floor(f() * n); },
      range: function (a, b) { return a + Math.floor(f() * (b - a + 1)); },
      pick: function (arr) { return arr[Math.floor(f() * arr.length)]; },
      chance: function (p) { return f() < p; },
      shuffle: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(f() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
        return a;
      },
      dice: function (expr) {
        var m = /^(\d+)(?:d(\d+))?([+-]\d+)?$/.exec(String(expr).replace(/\s/g, ""));
        if (!m) return 1;
        if (!m[2]) return parseInt(m[1], 10) + (m[3] ? parseInt(m[3], 10) : 0);
        var n = parseInt(m[1], 10), s = parseInt(m[2], 10), t = 0;
        for (var i = 0; i < n; i++) t += 1 + Math.floor(f() * s);
        return t + (m[3] ? parseInt(m[3], 10) : 0);
      }
    };
    /* A deck draws without repeats until it runs out, then reshuffles. */
    r.deck = function (arr) {
      var pile = [];
      return function () { if (!pile.length) pile = r.shuffle(arr); return pile.pop(); };
    };
    return r;
  }

  /* ---------------------------------------------------------------- */
  /* Small text helpers                                                */
  /* ---------------------------------------------------------------- */
  function firstSentence(s) { var i = s.indexOf(". "); return (i < 0 ? s : s.slice(0, i)).replace(/\.$/, ""); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function lower1(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function an(w) { return /^[aeiou]/i.test(w) ? "an" : "a"; }
  function fill(str, ctx) {
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return (ctx && ctx[k] != null) ? ctx[k] : m; });
  }
  function joinAnd(list) {
    if (list.length < 2) return list.join("");
    return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
  }
  var NUMWORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  function numWord(n) { return n < NUMWORDS.length ? NUMWORDS[n] : String(n); }

  /* ---------------------------------------------------------------- */
  /* Monsters and encounters                                           */
  /* ---------------------------------------------------------------- */
  function rollHp(rng, spec) {
    var t = 0;
    for (var i = 0; i < spec[0]; i++) t += 1 + rng.int(spec[1]);
    return Math.max(1, t + spec[2]);
  }
  function group(rng, id, count, extra) {
    var m = tables().monsters[id];
    if (!m) throw new Error("Unknown monster " + id);
    count = Math.max(1, count);
    var hp = [];
    for (var i = 0; i < count; i++) hp.push(rollHp(rng, m.hp));
    var g = {
      monster: id, name: count === 1 ? m.name : m.plural, singular: m.name, count: count,
      ac: m.ac, hd: m.hd, hp: hp, att: m.att, thac0: m.thac0, mv: m.mv, sv: m.sv, ml: m.ml,
      xpEach: m.xp, xp: m.xp * count, note: m.note || ""
    };
    if (extra) for (var k in extra) g[k] = extra[k];
    return g;
  }
  function oseLine(g) {
    return cap(g.singular) + (g.count > 1 ? " ×" + g.count : "") + ": AC " + g.ac + ", HD " + g.hd + " (hp " + g.hp.join(", ") + "), Att " + g.att +
      ", THAC0 " + g.thac0 + ", MV " + g.mv + ", SV " + g.sv + ", ML " + g.ml + ", XP " + g.xpEach + (g.count > 1 ? " each (" + g.xp + ")" : "");
  }
  function encounter(groups, extra) {
    var e = { groups: groups, xp: 0 };
    groups.forEach(function (g) { e.xp += g.xp; });
    e.line = groups.map(oseLine).join("; ");
    if (extra) for (var k in extra) e[k] = extra[k];
    return e;
  }
  function encounterLabel(e) {
    if (!e) return "None";
    var s = e.groups.map(function (g) { return g.proper ? g.name : g.count + " " + g.name; });
    return cap(joinAnd(s)) + (e.label ? " (" + e.label + ")" : "");
  }

  /* 5e note: the players read 5e, the DM runs OSE (SPINE, "Rules for Writers").
   * Built only from the group's OSE fields, so it cannot disagree with the stat row.
   * HD n -> the standard CR nearest n/2 (n is the number before any +, - or *; ties go up).
   * [x] -> AC x. THAC0 [+b] -> attack +b. Riders that save vs. death or poison
   * (paralysis, poison, disease) -> CON save DC 12; petrification -> DC 13. ML 7 or lower -> flees at half HP. */
  var CRS = [0, 1 / 8, 1 / 4, 1 / 2].concat(Array.apply(null, Array(30)).map(function (x, i) { return i + 1; }));
  function crFor(hd) {
    var m = /^(½|\d+)/.exec(String(hd)), n = m ? (m[1] === "½" ? 0.5 : Number(m[1])) : 0, x = n / 2, best = CRS[0];
    CRS.forEach(function (c) { if (Math.abs(c - x) <= Math.abs(best - x)) best = c; });
    return best === 1 / 8 ? "1/8" : best === 1 / 4 ? "1/4" : best === 1 / 2 ? "1/2" : String(best);
  }
  function ascending(s) { var m = /\[([+-]?\d+)\]/.exec(String(s)); return m ? Number(m[1]) : null; }
  function splitTop(s, sep) {
    var out = [], depth = 0, cur = "";
    for (var i = 0; i < s.length; i++) {
      var ch = s.charAt(i);
      if (ch === "(") depth++; else if (ch === ")") depth--;
      if (depth === 0 && s.substr(i, sep.length) === sep) { out.push(cur); cur = ""; i += sep.length - 1; continue; }
      cur += ch;
    }
    out.push(cur);
    return out;
  }
  var SAVE_DC = { paralysis: 12, poison: 12, disease: 12, petrification: 13 };
  function fiveE(g) {
    var b = ascending(g.thac0), bonus = (b < 0 ? "" : "+") + b, riders = [];
    var atts = splitTop(String(g.att), ", ").map(function (part) {
      return splitTop(part, " or ").map(function (one) {
        var m = /^(?:(\d+) × )?(.+?)\s*\(([^)]*)\)\s*$/.exec(one.trim());
        if (!m) return one.trim() + " " + bonus;
        var n = Number(m[1] || 1), pieces = m[3].split(" + "), dice = pieces.filter(function (p) { return /^\d+d\d+([+-]\d+)?$/.test(p.trim()); });
        pieces.forEach(function (p) { p = p.trim(); if (SAVE_DC[p] && riders.indexOf(p) < 0) riders.push(p); });
        return (n > 1 ? n + " " + m[2] + "s" : m[2]) + " " + bonus + " (" + (dice.length ? dice.join(" + ") : m[3]) + ")";
      }).join(" or ");
    }).join(", ");
    if (/petrif|to stone/i.test(g.note || "") && riders.indexOf("petrification") < 0) riders.push("petrification");
    var parts = ["CR " + crFor(g.hd), "AC " + ascending(g.ac), "hp " + g.hp.join(", "), atts];
    riders.forEach(function (r) { parts.push("CON save DC " + SAVE_DC[r] + " vs. " + r); });
    if (Number(g.ml) <= 7) parts.push("flees at half HP");
    return "*5e: " + parts.join(" · ") + ".*";
  }

  function treasureRoll(rng, L, magicChance) {
    var T = tables();
    var t = rng.pick(T.treasure);
    var gp = t.gp[1] ? (t.gp[0] + rng.int(t.gp[1] - t.gp[0] + 1)) * L : 0;
    var text = fill(t.text, { gp: gp });
    if (magicChance && rng.chance(magicChance)) text += " Also: " + lower1(rng.pick(T.magic));
    return text;
  }

  /* ---------------------------------------------------------------- */
  /* Grids and graphs                                                  */
  /* ---------------------------------------------------------------- */
  var DIRS = [[0, -1, "North"], [1, 0, "East"], [0, 1, "South"], [-1, 0, "West"]];
  function dirName(a, b) {
    var dc = b.c - a.c, dr = b.r - a.r;
    for (var i = 0; i < 4; i++) if (DIRS[i][0] === dc && DIRS[i][1] === dr) return DIRS[i][2];
    return "Through";
  }
  function cellKey(c, r) { return c + "," + r; }

  /* Grow a connected set of n cells from start: a main path first (pathLen cells),
     then branches. Returns {nodes:[{c,r}], edges:[[i,j]], path:[i...]} or null. */
  function growGrid(rng, cols, rows, n, start, pathLen, opts) {
    opts = opts || {};
    var nodes = [{ c: start[0], r: start[1] }], edges = [], path = [0];
    var occ = {}; occ[cellKey(start[0], start[1])] = 0;
    function inside(c, r) { return c >= 0 && r >= 0 && c < cols && r < rows && !(opts.block && opts.block(c, r)); }
    function freeNbrs(i) {
      var out = [];
      for (var k = 0; k < 4; k++) {
        var c = nodes[i].c + DIRS[k][0], r = nodes[i].r + DIRS[k][1];
        if (inside(c, r) && occ[cellKey(c, r)] === undefined) out.push([c, r]);
      }
      return out;
    }
    while (path.length < pathLen) {
      var cur = path[path.length - 1];
      var fr = freeNbrs(cur);
      /* Prefer cells that do not touch earlier path cells: keeps the path long. */
      var good = fr.filter(function (p) {
        for (var k = 0; k < 4; k++) {
          var j = occ[cellKey(p[0] + DIRS[k][0], p[1] + DIRS[k][1])];
          if (j !== undefined && j !== cur) return false;
        }
        return true;
      });
      var choice = good.length ? rng.pick(good) : (fr.length ? rng.pick(fr) : null);
      if (!choice) return null;
      var idx = nodes.length;
      nodes.push({ c: choice[0], r: choice[1] }); occ[cellKey(choice[0], choice[1])] = idx;
      edges.push([cur, idx]); path.push(idx);
    }
    var guard = 0;
    while (nodes.length < n && guard++ < 200) {
      var cands = [];
      for (var i = 0; i < nodes.length; i++) {
        if (opts.noBranch && opts.noBranch(i, path)) continue;
        freeNbrs(i).forEach(function (p) { cands.push([i, p]); });
      }
      if (!cands.length) return null;
      var pc = rng.pick(cands);
      var id2 = nodes.length;
      nodes.push({ c: pc[1][0], r: pc[1][1] }); occ[cellKey(pc[1][0], pc[1][1])] = id2;
      edges.push([pc[0], id2]);
    }
    if (nodes.length < n) return null;
    return { nodes: nodes, edges: edges, path: path, occ: occ };
  }
  function adjacency(n, edges) {
    var adj = []; for (var i = 0; i < n; i++) adj.push([]);
    edges.forEach(function (e) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); });
    return adj;
  }
  function bfs(adj, start) {
    var d = adj.map(function () { return Infinity; }); d[start] = 0;
    var q = [start];
    while (q.length) { var u = q.shift(); adj[u].forEach(function (v) { if (d[v] === Infinity) { d[v] = d[u] + 1; q.push(v); } }); }
    return d;
  }
  function hasEdge(edges, a, b) {
    return edges.some(function (e) { return (e[0] === a && e[1] === b) || (e[0] === b && e[1] === a); });
  }
  function nonEdges(g) {
    var out = [];
    for (var i = 0; i < g.nodes.length; i++) for (var j = i + 1; j < g.nodes.length; j++) {
      var a = g.nodes[i], b = g.nodes[j];
      if (Math.abs(a.c - b.c) + Math.abs(a.r - b.r) === 1 && !hasEdge(g.edges, i, j)) out.push([i, j]);
    }
    return out;
  }

  /* Place a rectangle (feet) inside a grid cell. Sizes are multiples of 10. */
  function placeRect(rng, cell, cellFt, w, h) {
    var jx = [-5, 0, 5][rng.int(3)], jy = [-5, 0, 5][rng.int(3)];
    var x = cell.c * cellFt + (cellFt - w) / 2 + jx, y = cell.r * cellFt + (cellFt - h) / 2 + jy;
    return { x: Math.round(x / 5) * 5, y: Math.round(y / 5) * 5, w: w, h: h };
  }

  /* ---------------------------------------------------------------- */
  /* Rooms and exits                                                   */
  /* ---------------------------------------------------------------- */
  function newRoom(o) {
    var r = {
      key: o.key, name: o.name, tier: o.tier, panel: o.panel, shape: o.shape || "room",
      size: o.w + "' × " + o.h + "'", light: o.light || "Dark", exits: [], readAloud: "", features: [],
      encounter: null, treasure: null, slot: null, lesson: "", designNote: "", obvious: "", clever: "",
      art: "", x: o.x, y: o.y, w: o.w, h: o.h, c: o.c, r: o.r, stairs: []
    };
    return r;
  }
  /* kindAB is the exit kind as seen from a; kindBA from b. */
  function link(a, b, kindAB, kindBA, dirAB, dirBA) {
    a.exits.push({ to: b.key, kind: kindAB, dir: dirAB || dirName(a, b) });
    b.exits.push({ to: a.key, kind: kindBA || kindAB, dir: dirBA || dirName(b, a) });
    if (kindAB === "stair") {
      a.stairs.push({ to: b.key, dir: dirAB });
      b.stairs.push({ to: a.key, dir: dirBA });
    }
  }
  /* Sentences in a read-aloud. The house style wants two to four. */
  function countSentences(s) { return s.trim().split(/(?<=[.!?][”"’)]?)\s+(?=[A-Z“"(])/).filter(Boolean).length; }
  function composeRA(rng, base, dressing, senses, senseChance) {
    var parts = [base], n = countSentences(base);
    if (dressing && n < 4) { parts.push(dressing()); n++; }
    if (senses && n < 4 && rng.chance(senseChance == null ? 0.5 : senseChance)) { parts.push(senses()); n++; }
    return parts.join(" ");
  }

  /* ================================================================ */
  /* TOWER                                                             */
  /* ================================================================ */
  function layoutCellars(rng, n) {
    for (var attempt = 0; attempt < 400; attempt++) {
      var cols = 4, rows = 3;
      var start = [rng.int(cols), rng.int(rows)];
      var g = growGrid(rng, cols, rows, n, start, 6);
      if (!g) continue;
      /* Loop: an extra edge between two cells already a step apart in depth. */
      var d0 = bfs(adjacency(n, g.edges), 0);
      var loopCands = rng.shuffle(nonEdges(g)).filter(function (p) {
        return Math.abs(d0[p[0]] - d0[p[1]]) <= 1 && p[0] !== 0 && p[1] !== 0;
      });
      if (!loopCands.length) continue;
      var loop = loopCands[0];
      var openEdges = g.edges.concat([loop]);
      var adjN = adjacency(n, openEdges);
      var dN = bfs(adjN, 0);
      /* The stair down is at the deepest room. */
      var maxD = Math.max.apply(null, dN);
      if (maxD < 5) continue;
      var deep = [];
      dN.forEach(function (v, i) { if (v === maxD) deep.push(i); });
      var D = rng.pick(deep);
      /* Secret door: a one-way shortcut from x (shallow) to y (deeper). */
      var secretCands = [];
      nonEdges(g).forEach(function (p) {
        if (hasEdge(openEdges, p[0], p[1])) return;
        var x = dN[p[0]] <= dN[p[1]] ? p[0] : p[1], y = x === p[0] ? p[1] : p[0];
        if (x === D || y === 0 || x === 0) return;
        if (dN[x] < 2 || dN[D] - dN[x] < 3) return;
        var adjS = adjacency(n, openEdges.concat([[x, y]]));
        if (bfs(adjS, 0)[D] < dN[D]) secretCands.push([x, y]);
      });
      if (!secretCands.length) continue;
      var sec = rng.pick(secretCands), X = sec[0], Y = sec[1];
      /* Wander room: next to the stair foot on the way in. */
      var wands = adjN[0].filter(function (i) { return dN[i] === 1 && i !== X && i !== D; });
      if (!wands.length) continue;
      var Wr = g.path[1] !== undefined && wands.indexOf(g.path[1]) >= 0 ? g.path[1] : rng.pick(wands);
      var allEdges = openEdges.concat([[X, Y]]);
      var deg = adjacency(n, allEdges).map(function (a) { return a.length; });
      var used = [0, Wr, X, D];
      var Rs = [], Ss = [];
      for (var i = 0; i < n; i++) {
        if (used.indexOf(i) >= 0) continue;
        if (dN[i] > dN[X] && dN[i] < dN[D]) { Rs.push(i); Ss.push(i); }
      }
      var pair = null;
      var shuffledS = rng.shuffle(Ss).sort(function (a, b) { return (deg[a] === 1 ? 0 : 1) - (deg[b] === 1 ? 0 : 1); });
      for (var si = 0; si < shuffledS.length && !pair; si++) {
        var S = shuffledS[si];
        var rr = rng.shuffle(Rs).filter(function (R) { return R !== S && dN[R] < dN[S]; });
        if (rr.length) pair = [rr[0], S];
      }
      if (!pair) continue;
      /* A dead end other than the stair rooms. */
      var deadEnds = [];
      for (var k = 0; k < n; k++) if (k !== 0 && k !== D && deg[k] === 1) deadEnds.push(k);
      if (!deadEnds.length) continue;
      return { g: g, n: n, loop: loop, openEdges: openEdges, secret: [X, Y], dN: dN, roles: { foot: 0, wander: Wr, mapping: X, retreat: pair[0], history: pair[1], parley: D }, deadEnds: deadEnds };
    }
    throw new Error("Could not lay out cellars");
  }

  function layoutCave(rng, n) {
    for (var attempt = 0; attempt < 400; attempt++) {
      var g = growGrid(rng, 4, 3, n, [rng.int(4), 0], 4, {
        noBranch: function (i, path) { return i === path[3]; }
      });
      if (!g) continue;
      var climax = g.path[3];
      var hazard = g.path[1 + rng.int(2)];
      return { g: g, n: n, climax: climax, hazard: hazard, dN: bfs(adjacency(n, g.edges), 0) };
    }
    throw new Error("Could not lay out the water cave");
  }

  /* Order node indices by depth, then by position, so keys run the way the party walks. */
  function keyOrder(nodes, dist) {
    return nodes.map(function (n, i) { return i; }).sort(function (a, b) {
      return (dist[a] - dist[b]) || (nodes[a].r - nodes[b].r) || (nodes[a].c - nodes[b].c);
    });
  }

  var BUILT_SIZES = [[20, 20], [30, 20], [20, 30], [30, 30], [40, 20], [20, 40], [40, 30], [30, 40], [40, 40], [50, 30], [30, 50]];

  function genTower(seed, L) {
    var T = tables(), TT = T.tower, LES = TEMPLATES.tower.lessons;
    var rng = makeRng(hashSeed(seed, "tower"));
    var lesson = {}; LES.forEach(function (l) { lesson[l.slot] = l; });

    var purpose = rng.pick(TT.purposes), number = rng.pick(TT.numbers), local = rng.pick(TT.localNames);
    var place = rng.pick(TT.places), fell = rng.pick(TT.fell);
    var guardian = rng.pick(TT.guardians.filter(function (g) { return (g.minLevel || 1) <= L; }));
    var clue = rng.pick(guardian.clues);
    var npc = rng.pick(TT.npcGroups);
    var clock = rng.pick(TT.clocks);

    var dress = { surface: rng.deck(TT.dressing.surface), inside: rng.deck(TT.dressing.surfaceInside), cellars: rng.deck(TT.dressing.cellars), cave: rng.deck(TT.dressing.cave) };
    var sense = { surface: rng.deck(TT.senses.surface), cellars: rng.deck(TT.senses.cellars), cave: rng.deck(TT.senses.cave) };
    var rooms = [];
    var CELL = 80;

    /* ---- Surface ---- */
    var s1c = { c: 1, r: 1 };
    var ring = rng.shuffle([{ c: 0, r: 1 }, { c: 2, r: 1 }, { c: 1, r: 0 }]);
    var towerCell = ring[0], bldCell = ring[1];
    var s4opts = [{ c: 0, r: 0 }, { c: 2, r: 0 }, ring[2]].filter(function (c) {
      return (Math.abs(c.c - towerCell.c) + Math.abs(c.r - towerCell.r) === 1) || (Math.abs(c.c - bldCell.c) + Math.abs(c.r - bldCell.r) === 1);
    }).filter(function (c) { return !(c.c === 1 && c.r === 1); });
    var s4cell = rng.pick(s4opts);
    var s4parent = (Math.abs(s4cell.c - towerCell.c) + Math.abs(s4cell.r - towerCell.r) === 1) ? "tower" : "bld";
    if ((Math.abs(s4cell.c - towerCell.c) + Math.abs(s4cell.r - towerCell.r) === 1) && (Math.abs(s4cell.c - bldCell.c) + Math.abs(s4cell.r - bldCell.r) === 1)) s4parent = rng.chance(0.5) ? "tower" : "bld";

    var landing = rng.pick(TT.landings);
    var towerE = rng.pick(TT.towers);
    var surfDeck = rng.deck(TT.surface);
    var trapInTower = rng.chance(0.6);
    var bldE = surfDeck(); var guard = 0;
    while (!trapInTower && !bldE.hide && guard++ < 30) bldE = surfDeck();
    if (!bldE.hide) trapInTower = true;
    var s4E = surfDeck(); guard = 0;
    while (s4E === bldE && guard++ < 30) s4E = surfDeck();

    function surfaceRoom(entry, cell, key, shape) {
      var w, h;
      if (shape === "landing") { w = 40; h = 20; }
      else if (shape === "tower") { w = h = rng.pick([30, 40]); }
      else if (shape === "building") { var bs = rng.pick([[30, 20], [40, 30], [30, 30], [40, 20]]); w = bs[0]; h = bs[1]; }
      else { var os = rng.pick([[40, 30], [30, 30], [40, 40], [50, 30]]); w = os[0]; h = os[1]; }
      var p = placeRect(rng, cell, CELL, w, h);
      if (shape === "landing") p.y = cell.r * CELL + CELL + 5;
      var r = newRoom({ key: key, name: entry.name, tier: "Surface", panel: "surface", shape: shape, light: entry.light, x: p.x, y: p.y, w: w, h: h, c: cell.c, r: cell.r });
      var inside = shape === "tower" || shape === "building";
      r.readAloud = composeRA(rng, entry.ra, inside ? dress.inside : dress.surface, sense.surface, 0.35);
      r.features = entry.features.map(function (f) { return f.slice(); });
      r.obvious = entry.obvious; r.clever = entry.clever;
      if (shape === "tower" || shape === "building") r.size = shape === "tower" ? w + "' across, round" : r.size;
      return r;
    }
    var trapCell = trapInTower ? towerCell : bldCell, otherCell = trapInTower ? bldCell : towerCell;
    var S1 = surfaceRoom(landing, s1c, "S1", "landing");
    var S2 = surfaceRoom(trapInTower ? towerE : bldE, trapCell, "S2", trapInTower ? "tower" : (bldE.kind || "building"));
    var S3 = surfaceRoom(trapInTower ? bldE : towerE, otherCell, "S3", trapInTower ? (bldE.kind || "building") : "tower");
    var S4 = surfaceRoom(s4E, s4cell, "S4", s4E.kind || "outdoor");
    rooms.push(S1, S2, S3, S4);
    link(S1, S2, "open"); link(S1, S3, "open");
    var s4p = (s4parent === "tower") === trapInTower ? S2 : S3;
    link(s4p, S4, "open");
    var hideEntry = trapInTower ? towerE : bldE;

    S1.slot = "light"; S1.lesson = lesson.light.teaches; S1.designNote = lesson.light.note;
    S1.features.push(["Marching order", "Ask for it now and write it down: who is first, who is last, who holds the light, who holds the rope. Wanderers strike the front or the back."]);
    S1.features.push(["Light", "Daylight now. Below, a torch burns 6 turns and a lantern flask 24. Start the tally when the first torch is lit."]);
    S2.slot = "search"; S2.lesson = lesson.search.teaches; S2.designNote = lesson.search.note;
    S2.features.push(["The trapdoor", "Hidden " + hideEntry.hide + ". Searching that 10' square takes one turn and finds it. Each wrong square also takes a turn. A stair goes down to C1."]);
    var surfLessons = rng.shuffle(["Not every room holds the way on. What a room tells you is worth the turn it takes.", "The surface tells the story of what is below. Read it before you go down.", "Someone else has been here lately. Signs of other people are clues, and warnings.", "Daylight is free light. Do the slow looking up here, before the torches are lit."]);
    S3.lesson = surfLessons[0]; S4.lesson = surfLessons[1];

    /* ---- Cellars ---- */
    var CL = layoutCellars(rng, rng.range(8, 10));
    var cg = CL.g, cOrder = keyOrder(cg.nodes, CL.dN);
    var cRooms = [];
    var fillerDeck = rng.deck(TT.cellarFiller);
    var roleOf = {};
    Object.keys(CL.roles).forEach(function (k) { roleOf[CL.roles[k]] = k; });
    cOrder.forEach(function (idx, n) {
      var cell = cg.nodes[idx];
      var sz = rng.pick(BUILT_SIZES);
      var p = placeRect(rng, cell, CELL, sz[0], sz[1]);
      var role = roleOf[idx];
      var entry = role === "foot" ? rng.pick(TT.stairFoot) : role === "wander" ? rng.pick(TT.wanderRoom) :
        role === "mapping" ? rng.pick(TT.mappingRoom) : role === "retreat" ? rng.pick(TT.retreatRoom) :
        role === "history" ? rng.pick(TT.study) : role === "parley" ? rng.pick(TT.guardPost) : fillerDeck();
      var r = newRoom({ key: "C" + (n + 1), name: entry.name, tier: "The Cellars", panel: "cellars", shape: "room", light: entry.light, x: p.x, y: p.y, w: sz[0], h: sz[1], c: cell.c, r: cell.r });
      r.readAloud = composeRA(rng, entry.ra, dress.cellars, sense.cellars, 0.4);
      r.features = entry.features.map(function (f) { return f.slice(); });
      r.obvious = entry.obvious; r.clever = entry.clever;
      r._idx = idx; r._role = role || "filler";
      cRooms[idx] = r;
    });
    cOrder.forEach(function (idx) { rooms.push(cRooms[idx]); });
    /* Edges and door kinds. */
    var rd = CL.roles;
    CL.openEdges.forEach(function (e) {
      var a = cRooms[e[0]], b = cRooms[e[1]];
      var kind;
      if ((e[0] === rd.foot && e[1] === rd.wander) || (e[1] === rd.foot && e[0] === rd.wander)) kind = "stuck";
      else { var roll = rng.int(20); kind = roll < 7 ? "open" : roll < 16 ? "door" : roll < 19 ? "stuck" : "locked"; }
      link(a, b, kind);
    });
    var X = cRooms[CL.secret[0]], Y = cRooms[CL.secret[1]];
    link(X, Y, "secret", "door");
    var C1 = cRooms[rd.foot];
    link(S2, C1, "stair", "stair", "Down", "Up");

    /* ---- Water cave ---- */
    var WL = layoutCave(rng, rng.range(5, 7));
    var wg = WL.g, wOrder = keyOrder(wg.nodes, WL.dN);
    var wRooms = [];
    var caveDeck = rng.deck(TT.caveFiller);
    var hazard = rng.pick(TT.hazards);
    wOrder.forEach(function (idx, n) {
      var cell = wg.nodes[idx];
      var big = idx === WL.climax;
      var w = big ? rng.pick([50, 60]) : rng.pick([30, 40, 50]), h = big ? rng.pick([40, 50, 60]) : rng.pick([30, 40]);
      var p = placeRect(rng, cell, CELL, w, h);
      var r;
      if (idx === 0) {
        var ce = rng.pick(TT.caveEntry);
        r = newRoom({ key: "W" + (n + 1), name: ce.name, tier: "The Water Cave", panel: "cave", shape: "cave", light: ce.light, x: p.x, y: p.y, w: w, h: h, c: cell.c, r: cell.r });
        r.readAloud = composeRA(rng, ce.ra, dress.cave, sense.cave, 0.4);
        r.features = ce.features.map(function (f) { return f.slice(); });
        r.obvious = ce.obvious; r.clever = ce.clever;
        r.lesson = "A new level is a new set of rules. Stop at the foot of the stair and look before going on.";
      } else if (idx === WL.hazard) {
        r = newRoom({ key: "W" + (n + 1), name: hazard.name, tier: "The Water Cave", panel: "cave", shape: "cave", light: "Dark", x: p.x, y: p.y, w: w, h: h, c: cell.c, r: cell.r });
        r.water = true;
        r.readAloud = composeRA(rng, hazard.ra, null, sense.cave, 0.6);
        if (countSentences(r.readAloud) < 2) r.readAloud += " " + dress.cave();
        r.features = [["The hazard", hazard.rule]];
        r.obvious = hazard.obvious; r.clever = hazard.clever;
        r.slot = "hazard"; r.lesson = lesson.hazard.teaches; r.designNote = lesson.hazard.note;
      } else if (idx === WL.climax) {
        r = newRoom({ key: "W" + (n + 1), name: guardian.room, tier: "The Water Cave", panel: "cave", shape: "cave", light: guardian.light, x: p.x, y: p.y, w: w, h: h, c: cell.c, r: cell.r });
        r.water = /pool|water|barge|pool/i.test(guardian.ra);
        r.readAloud = guardian.ra;
        r.features = guardian.features.map(function (f) { return f.slice(); });
        r.slot = "climax";
      } else {
        var fe = caveDeck();
        r = newRoom({ key: "W" + (n + 1), name: fe.name, tier: "The Water Cave", panel: "cave", shape: "cave", light: fe.light, x: p.x, y: p.y, w: w, h: h, c: cell.c, r: cell.r });
        r.readAloud = composeRA(rng, fe.ra, dress.cave, sense.cave, 0.4);
        r.features = fe.features.map(function (f) { return f.slice(); });
        r.obvious = fe.obvious; r.clever = fe.clever;
        r._role = "filler";
      }
      r._idx = idx; wRooms[idx] = r;
    });
    wOrder.forEach(function (idx) { rooms.push(wRooms[idx]); });
    wg.edges.forEach(function (e) {
      var a = wRooms[e[0]], b = wRooms[e[1]];
      var kind = (e[0] === WL.hazard || e[1] === WL.hazard) ? "water" : (rng.chance(0.2) ? "water" : "open");
      link(a, b, kind);
    });
    var W1 = wRooms[0], post = cRooms[rd.parley];
    link(post, W1, "stair", "stair", "Down", "Up");

    /* ---- Slot content ---- */
    var wander = cRooms[rd.wander], mapR = cRooms[rd.mapping], retreat = cRooms[rd.retreat], study = cRooms[rd.history];
    var climaxR = wRooms[WL.climax], hazR = wRooms[WL.hazard];

    C1.slot = "doors"; C1.lesson = lesson.doors.teaches; C1.designNote = lesson.doors.note;
    var stuckTo = wander.key;
    var heard = "scratching and squeaks";
    C1.features.push(["Listening", "At the stuck door to " + stuckTo + ": 1-in-6 hears what is beyond (demi-humans 2-in-6). Here: " + heard + "."]);
    C1.features.push(["Forcing", "1–2 on d6 (Strength adjusts). Each try is noise: make a wandering check after the second."]);

    wander.slot = "wander"; wander.lesson = lesson.wander.teaches; wander.designNote = lesson.wander.note;
    wander.features.push(["The clock", "From this room on, roll for wanderers every 2 turns (1-in-6). Roll where the players can see."]);
    var ratGroup = group(rng, "giantRat", rng.dice(["1d4+2", "2d4+2", "3d4+2"][L - 1]));
    wander.encounter = encounter([ratGroup], { tactics: "They scatter at the light and come back hungry. They flee when two are dead." });

    var loopNames = loopRooms(CL, cRooms);
    var deadKeys = CL.deadEnds.map(function (i) { return cRooms[i].key; });
    mapR.slot = "mapping"; mapR.lesson = lesson.mapping.teaches; mapR.designNote = lesson.mapping.note;
    var secDir = dirName(X, Y);
    mapR.features.push(["Secret door", "In the " + secDir.toLowerCase() + " wall, to " + Y.key + ". Found by searching (1-in-6, elves 2-in-6) or by a mapper who notices the gap. From " + Y.key + " it is a plain door, so it can be found from that side too."]);
    mapR.features.push(["The loop", "Rooms " + joinAnd(loopNames) + " form a loop. A party that maps can circle round; a party that does not gets lost."]);
    mapR.features.push(["The dead end", (deadKeys.length > 1 ? "Rooms " + joinAnd(deadKeys) + " each have" : "Room " + deadKeys[0] + " has") + " one way in and no way on."]);

    retreat.slot = "retreat"; retreat.lesson = lesson.retreat.teaches; retreat.designNote = lesson.retreat.note;
    retreat.features.push(["Rest", "Rest one turn in six or take –1 to hit and damage. This room is a good place for it."]);
    retreat.features.push(["Going home", "If the party leaves the dungeon and comes back, roll on the Restock table before they return."]);

    study.slot = "history"; study.lesson = lesson.history.teaches; study.designNote = lesson.history.note;
    study.features.push(["The clue: " + clue.where, clue.text + " This changes the fight in " + climaxR.key + "."]);
    if (rng.chance(0.5)) study.treasure = treasureRoll(rng, L, 0.25);

    post.slot = "parley"; post.lesson = lesson.parley.teaches; post.designNote = lesson.parley.note;
    var npcCount = npc.count[L - 1] + rng.int(2);
    var npcG = group(rng, npc.monster, npcCount, { name: npc.unit, statsAs: T.monsters[npc.monster].name });
    post.readAloud = rng.pick(TT.guardPost.filter(function (x) { return x.name === post.name; })).ra + " " + npc.look;
    post.encounter = encounter([npcG], {
      label: "parley",
      tactics: "Their boss is " + npc.boss + ". They want " + npc.want + ". They know something: " + npc.know + ". They offer " + npc.offer + ".",
      reaction: [["2 or less", npc.reaction[0]], ["3–5", npc.reaction[1]], ["6–8", npc.reaction[2]], ["9–11", npc.reaction[3]], ["12 or more", npc.reaction[4]]]
    });
    post.features.push(["The stair down", "Goes down to " + W1.key + ". Whoever holds this room holds the stair."]);
    post.treasure = "The group's pay: " + (10 * L + rng.int(20 * L)) + " gp, and whatever they are guarding.";

    hazR.features.push(["Getting through", "The way to " + climaxR.key + " lies across this. There is no other route."]);

    var gCount = guardian.count[L - 1];
    var gGroups = [group(rng, guardian.monster, gCount)];
    if (guardian.extra) gGroups.push(group(rng, guardian.extra.monster, guardian.extra.count[L - 1]));
    climaxR.encounter = encounter(gGroups, { label: "climax", tactics: guardian.tactics });
    climaxR.lesson = lesson.climax.teaches; climaxR.designNote = lesson.climax.note;
    climaxR.features.push(["If the party read " + clue.where + " (" + study.key + ")", clue.effect]);
    var otherClue = guardian.clues.filter(function (c) { return c !== clue; })[0];
    if (otherClue) climaxR.features.push(["Without the clue", "A sharp player may still guess: " + lower1(otherClue.effect)]);
    climaxR.obvious = "Fight.";
    climaxR.clever = "Use what " + study.key + " said: " + lower1(firstSentence(clue.effect)) + ".";
    climaxR.treasure = treasureRoll(rng, L, 1);
    climaxR.art = "Otus ink, black on cream: dense hatched rock, clean single lines for water. In frame: " + guardian.overview + ", seen from the cave mouth, the party small in the foreground with one light. Painted exception allowed: the light source alone, in a pale wash.";

    /* ---- Filler stocking ---- */
    rooms.forEach(function (r) {
      if (r._role !== "filler") return;
      var tierKey = r.panel === "cave" ? "cave" : "cellars";
      var roll = rng.int(6);
      if (roll < 2) {
        var dens = TT.denizens[tierKey].filter(function (x) { return (x.minLevel || 1) <= L; });
        var den = rng.pick(dens);
        r.encounter = encounter([group(rng, den.monster, rng.dice(den.count[L - 1]))], { tactics: den.doing });
        if (rng.chance(0.5)) r.treasure = treasureRoll(rng, L, 0.1);
        r.lesson = rng.pick(["Not every fight is worth the turns it takes. Count the cost before the first blow.", "A fight makes noise, and noise brings wanderers.", "Monsters in a room are doing something. What they are doing tells you how to deal with them."]);
      } else if (roll === 2 && r.panel !== "cave") {
        var tr = rng.pick(T.traps);
        r.trap = tr;
        r.features.push(["Trap: " + tr.name, tr.trigger + " " + tr.effect + " Finding it: " + tr.find + " Getting past: " + tr.disarm]);
        if (rng.chance(0.35)) r.treasure = treasureRoll(rng, L, 0.1);
        r.lesson = "A trap has a tell. Look before you walk, and say what you are looking at.";
      } else {
        if (rng.chance(0.15)) r.treasure = treasureRoll(rng, L, 0.05);
        r.lesson = rng.pick(["An empty room is information: what is missing, and who took it.", "Some rooms are only rooms. Spend the turn or move on: that choice is the game.", "Every room tells a little of the story. Read it, then decide how long to stay."]);
      }
    });
    rooms.forEach(function (r) { if (!r.lesson) r.lesson = "Look, then decide. Time spent here is time not spent elsewhere."; });

    /* ---- Wandering, rumors, restock, clock, prize ---- */
    var wandering = ["surface", "cellars", "cave"].map(function (t) {
      var list = rng.shuffle(TT.wandering[t]).slice(0, 6);
      return { tier: t === "surface" ? "Surface" : t === "cellars" ? "The Cellars" : "The Water Cave", die: "d6", entries: list.map(function (w) { return wanderRow(w, L); }) };
    });
    var rumors = rumorTable(rng, TT.rumors, [
      { truth: "True", text: "There is something in the deepest cave: " + guardian.overview + "." },
      { truth: "Partly", text: guardian.rumor + " Nothing gets past it. (It is there. But " + lower1(firstSentence(clue.effect)) + ".)" },
      { truth: "True", text: cap(npc.unit) + " hold the stair down to the water. They want " + npc.want + "." }
    ]);
    var buyers = rng.shuffle(TT.buyers).slice(0, 2);
    var prize = rng.pick(TT.prizes);

    var d = {
      template: "tower", seed: seed, partyLevel: L,
      title: cap(local.name), subtitle: purpose.title + " " + number,
      overview: "The empire called it " + purpose.title + " " + number + ". It " + purpose.did + ". Locals call it " + local.name + " because " + local.why + ". It stands on " + place + ". " + fell +
        " Now the stair to the water cave is held by " + npc.name + ". In the deepest cave: " + guardian.overview + ".",
      place: place,
      tiers: TEMPLATES.tower.tiers.map(function (t) {
        var keys = rooms.filter(function (r) { return r.key.charAt(0) === t.id; }).map(function (r) { return r.key; });
        return { id: t.id, name: t.name, panel: t.panel, rooms: keys };
      }),
      panels: [
        { id: "surface", title: "Surface", kind: "island", cols: 3, rows: 2, cell: CELL, w: 3 * CELL, h: 2 * CELL + 35 },
        { id: "cellars", title: "The Cellars", kind: "built", cols: 4, rows: 3, cell: CELL, w: 4 * CELL, h: 3 * CELL, crop: true },
        { id: "cave", title: "The Water Cave", kind: "cave", cols: 4, rows: 3, cell: CELL, w: 4 * CELL, h: 3 * CELL, crop: true }
      ],
      rooms: rooms, wandering: wandering, rumors: rumors,
      restock: TT.restock.slice(),
      clock: { what: clock.what, steps: clock.steps.slice() },
      prize: { what: prize, buyers: buyers.map(function (b) { return { who: b.who, wants: b.wants, pays: b.pays }; }) },
      fortReacts: rng.shuffle(TT.fortReacts).slice(0, 4).concat(["If the party brings back " + prize + ": " + buyers[0].who + " and " + buyers[1].who + " both want it (see The Prize)."]),
      clue: { room: study.key, where: clue.where, text: clue.text, effect: clue.effect, climax: climaxR.key },
      secretDoor: { from: X.key, to: Y.key, oneWay: true, note: "Secret from " + X.key + "; a plain door from " + Y.key + "." },
      entry: "S1", climax: climaxR.key
    };
    finish(d);
    return d;
  }

  function loopRooms(CL, cRooms) {
    /* Find the cycle made by the loop edge: path in the tree between its ends, plus the edge. */
    var g = CL.g, n = CL.n;
    var adj = adjacency(n, g.edges);
    var a = CL.loop[0], b = CL.loop[1];
    var prev = {}; prev[a] = -1; var q = [a];
    while (q.length) { var u = q.shift(); if (u === b) break; adj[u].forEach(function (v) { if (prev[v] === undefined) { prev[v] = u; q.push(v); } }); }
    var out = []; var cur = b;
    while (cur !== -1 && cur !== undefined) { out.push(cRooms[cur].key); cur = prev[cur]; }
    return out.sort(function (x, y) { return parseInt(x.slice(1), 10) - parseInt(y.slice(1), 10); });
  }

  function wanderRow(w, L) {
    var T = tables();
    if (!w.monster) return { text: w.text };
    var m = T.monsters[w.monster];
    var count = w.count;
    if (L > 1 && /d/.test(count)) count = count + "+" + (L - 1);
    return { monster: w.monster, count: count, text: cap(count) + " " + (count === "1" ? m.name : m.plural) + ", " + w.text + ".", stats: "AC " + m.ac + ", HD " + m.hd + ", Att " + m.att + ", THAC0 " + m.thac0 + ", MV " + m.mv + ", SV " + m.sv + ", ML " + m.ml + ", XP " + m.xp };
  }

  function rumorTable(rng, base, made) {
    var pool = rng.shuffle(base);
    var pick = made.slice();
    var falses = pool.filter(function (r) { return r.truth === "False"; });
    pick.push(falses[0], falses[1]);
    pool.forEach(function (r) { if (pick.length < 8 && pick.indexOf(r) < 0) pick.push(r); });
    return rng.shuffle(pick).map(function (r, i) { return { roll: i + 1, truth: r.truth, text: r.text }; });
  }

  /* Common post-processing: xp total, lesson order, map sizes. */
  function finish(d) {
    var xp = 0;
    d.rooms.forEach(function (r) { if (r.encounter) xp += r.encounter.xp; });
    d.xpTotal = xp;
    var lessons = TEMPLATES[d.template].lessons;
    d.lessonOrder = lessons.map(function (l, i) {
      var keys = d.rooms.filter(function (r) { return r.slot === l.slot; }).map(function (r) { return r.key; });
      return { n: i + 1, slot: l.slot, label: l.label, rooms: keys };
    });
    d.rooms.forEach(function (r) {
      delete r._idx; delete r._role;
      if (!r.encounter) r.encounter = null;
      if (!r.treasure) r.treasure = null;
    });
  }

  /* ================================================================ */
  /* RAVINE                                                            */
  /* ================================================================ */
  var CLANS = {
    kobold: { leader: "koboldChief", count: [8, 10, 13] },
    goblin: { leader: "goblinBoss", count: [6, 8, 10] },
    orc: { leader: "orcLeader", count: [5, 7, 9] },
    hobgoblin: { leader: "hobgoblinChief", count: [4, 6, 8] },
    gnoll: { leader: "gnollLeader", count: [3, 4, 6] },
    bugbear: { leader: "bugbearChief", count: [2, 3, 4] }
  };
  var LAIR_CELL = 70;

  function genRavine(seed, L) {
    var T = tables(), TR = T.ravine, LES = TEMPLATES.ravine.lessons;
    var rng = makeRng(hashSeed(seed, "ravine"));
    var lesson = {}; LES.forEach(function (l) { lesson[l.slot] = l; });
    var rname = rng.pick(TR.names), history = rng.pick(TR.histories), clock = rng.pick(TR.clocks);
    var clanNameDeck = rng.deck(TR.clanNames), quirkDeck = rng.deck(TR.quirks);
    var lairDress = rng.deck(TR.dressing.lair), templeDress = rng.deck(TR.dressing.temple);
    var wantDeck = rng.deck(TR.wants), fearDeck = rng.deck(TR.fears), tradeDeck = rng.deck(TR.trades);

    /* Which clans fill the slots. */
    function pickL(opts) { return rng.pick(opts[L - 1]); }
    var moraleClan = pickL([["kobold"], ["kobold", "goblin"], ["goblin", "kobold"]]);
    var reactionClan = pickL([["goblin", "kobold"], ["goblin", "orc"], ["orc", "goblin"]]);
    var factionPair = pickL([[["goblin", "kobold"], ["orc", "goblin"], ["orc", "orc"]], [["orc", "orc"], ["orc", "hobgoblin"], ["goblin", "hobgoblin"]], [["orc", "hobgoblin"], ["gnoll", "orc"], ["hobgoblin", "gnoll"]]]);
    factionPair = rng.shuffle(factionPair);
    var alarmClan = pickL([["orc", "hobgoblin"], ["hobgoblin", "gnoll"], ["hobgoblin", "gnoll"]]);
    var decept = pickL([[["bugbear", "gnoll"], ["gnoll", "hobgoblin"], ["hobgoblin", "goblin"]], [["bugbear", "gnoll"], ["gnoll", "hobgoblin"]], [["bugbear", "gnoll"]]]);
    var beast = rng.pick(TR.beasts);
    var hireling = rng.pick(TR.hirelings.filter(function (h) { return L > 1 || h.monster !== "bugbear"; }));

    var slots = ["morale", "reaction", "factions", "alarm", "deception", "avoidance"];
    var hasSupply = rng.chance(0.5);
    if (hasSupply) slots.splice(2 + rng.int(4), 0, "supply");
    slots.push("temple");

    var rooms = [], panels = [], lairs = [], clans = [];
    var letterCode = 65;
    var side = rng.chance(0.5) ? "West" : "East";
    function flip(s) { return s === "West" ? "East" : "West"; }

    /* Path nodes. */
    var pathDeck = rng.deck(TR.path.slice(1, TR.path.length - 1));
    var nodeCount = slots.length + 1; /* foot + one per slot (temple at the head) */
    var pathRooms = [];
    for (var i = 0; i < nodeCount; i++) {
      var pe = i === 0 ? TR.path[0] : (i === nodeCount - 1 ? TR.path[TR.path.length - 1] : pathDeck());
      var pr = newRoom({ key: "R" + (i + 1), name: pe.name, tier: "The Ravine Floor", panel: "ravine", shape: "path", light: "Daylight", x: 0, y: 0, w: 20, h: 20, c: 0, r: i });
      pr.size = "The path, 10' to 30' wide";
      pr.readAloud = pe.ra;
      pr.features = [pe.feature.slice()];
      pr.lesson = i === 0 ? "The ravine is one place. Everything done in one mouth is heard in the others." : rng.pick(["The path between lairs is part of the dungeon. The ravine sees you walk it.", "Where you camp and where you rest is a choice the clans will notice.", "Count the mouths and mark them on the map before going into any of them."]);
      pr.obvious = "Walk on up the path."; pr.clever = "Stop and watch the mouths for a turn. Who goes in, who comes out?";
      pathRooms.push(pr); rooms.push(pr);
      if (i > 0) link(pathRooms[i - 1], pr, "open", "open", "Up the path", "Down the path");
    }

    function makeClan(type, letterKey) {
      var cn = clanNameDeck();
      var c = { id: letterKey, type: type, name: cn.name, sign: cn.sign, quirk: quirkDeck(), wants: wantDeck(), fears: fearDeck(), trades: tradeDeck(), hates: null, monster: T.monsters[type] };
      clans.push(c);
      return c;
    }

    /* Build a lair's rooms on a small grid. */
    function buildLair(o) {
      /* o: {letter, panelId, cols, rows, offsetC, n, start:[c,r], need:[c,r]?, block?, tier} */
      for (var a = 0; a < 300; a++) {
        var g = growGrid(rng, o.cols, o.rows, o.n, o.start, Math.min(o.n, o.pathLen || 3), { block: o.block });
        if (!g) continue;
        if (o.need && g.occ[cellKey(o.need[0], o.need[1])] === undefined) continue;
        var dist = bfs(adjacency(o.n, g.edges), 0);
        return { g: g, dist: dist, order: keyOrder(g.nodes, dist) };
      }
      throw new Error("Could not lay out lair " + o.letter);
    }
    function areaRoom(letter, num, entry, cell, panelId, tierName, offC, dressFn) {
      var sz = rng.pick([[30, 20], [20, 30], [30, 30], [40, 30], [30, 40], [40, 40], [20, 20]]);
      var p = placeRect(rng, { c: cell.c + (offC || 0), r: cell.r }, LAIR_CELL, sz[0], sz[1]);
      var r = newRoom({ key: letter + num, name: entry.name, tier: tierName, panel: panelId, shape: panelId === "temple" ? "room" : "cave", light: entry.light || "Dark", x: p.x, y: p.y, w: sz[0], h: sz[1], c: cell.c + (offC || 0), r: cell.r });
      var n = countSentences(entry.ra), parts = [entry.ra];
      var extraRA = dressFn && n < 4 ? dressFn() : "";
      if (extraRA) { parts.push(extraRA); n += countSentences(extraRA); }
      if (n < 2) parts.push(panelId === "temple" ? templeDress() : lairDress());
      r.readAloud = parts.join(" ");
      r.features = (entry.features || []).map(function (f) { return f.slice(); });
      r.obvious = entry.obvious || ""; r.clever = entry.clever || "";
      return r;
    }
    var ROLE_TEACH = {
      mouth: "How you enter decides the first round. Every mouth is watched by something.",
      guard: "Guards see you first unless you plan for them. Silence them, or be heard.",
      common: "Where most of them are is where the fight is hardest. Choose where to fight.",
      chief: "Leaders hold morale. Take the leader and the rest may break, or may fight harder.",
      store: "Loot has weight. Getting it home across the miles is a lesson of its own.",
      shrine: "What a clan holds sacred shows what it will die for.",
      pens: "Animals are a clan's wealth, and a weakness.",
      young: "Not everyone in a lair is a fighter. What you do here, the ravine hears about.",
      hireling: "Every hireling has a price and a loyalty. Ask the price before the clan pays it again.",
      feast: "The words say welcome. The table says something else.",
      prisoners: "A rescue is a race. Every round of alarm counts.",
      well: "Water is power underground. Whoever holds it holds the lair."
    };
    function rolesFor(n, kind) {
      var base = ["mouth"];
      var pool;
      if (kind === "alarm") pool = ["guard", "common", "chief", "prisoners", "store", "pens"];
      else if (kind === "deception") pool = ["feast", "guard", "chief", "store", "pens", "young"];
      else if (kind === "reaction") pool = ["guard", "common", "chief", "hireling", "store", "shrine"];
      else if (kind === "morale") pool = ["guard", "common", "chief", "store", "young"];
      else pool = ["guard", "common", "chief", "store", "shrine", "well", "pens"];
      /* Keep the essential ones first. */
      var essentials = { alarm: ["guard", "common", "prisoners", "chief"], deception: ["feast", "chief", "store"], reaction: ["common", "hireling", "chief"], morale: ["guard", "common", "chief"] }[kind] || ["guard", "common", "chief"];
      var rest = rng.shuffle(pool.filter(function (p) { return essentials.indexOf(p) < 0; }));
      return base.concat(essentials, rest).slice(0, n);
    }
    function pickArea(role, decks) {
      return decks[role] ? decks[role]() : decks.common();
    }
    var areaDecks = {};
    Object.keys(TR.areas).forEach(function (k) { areaDecks[k] = rng.deck(TR.areas[k]); });

    /* Members: spread a clan across its areas. */
    function populate(clan, total, areaRooms, roleList, opts) {
      opts = opts || {};
      var leaderId = CLANS[clan.type].leader;
      var spots = { guard: [], common: [], chief: [], mouth: [], feast: [] };
      roleList.forEach(function (role, i) { if (spots[role]) spots[role].push(areaRooms[i]); });
      var left = total;
      function put(room, n, extra) {
        if (!room || n <= 0) return 0;
        n = Math.min(n, left); if (n <= 0) return 0;
        var g = group(rng, clan.type, n);
        room.encounter = room.encounter ? encounter(room.encounter.groups.concat([g]), { tactics: room.encounter.tactics }) : encounter([g], extra || {});
        left -= n; return n;
      }
      var chiefRoom = spots.chief[0] || spots.common[0] || areaRooms[areaRooms.length - 1];
      var lg = group(rng, leaderId, 1);
      chiefRoom.encounter = encounter([lg], { tactics: "The " + lg.singular + " leads " + clan.name + "." });
      put(chiefRoom, Math.min(2, Math.floor(total / 4)), null);
      if (spots.guard[0]) put(spots.guard[0], Math.max(2, Math.floor(total / 4)));
      else if (!opts.emptyMouth) put(areaRooms[0], Math.max(1, Math.floor(total / 5)));
      var bulk = spots.feast[0] || spots.common[0] || chiefRoom;
      put(bulk, left);
    }

    /* A clan's quirk, said about the clan by name, goes in the first room where the clan is met. */
    function quirkLine(clan) {
      var pl = clan.monster.plural;
      return clan.quirk.replace(/^They /, "The " + pl + " here ").replace(/^Their /, "The " + pl + "' ").replace(/^Every one of them/, "Every one of the " + pl);
    }
    function placeQuirk(clan, ordered) {
      var line = quirkLine(clan);
      for (var i = 0; i < ordered.length; i++) {
        var r = ordered[i];
        if (!r.encounter || !r.encounter.groups.some(function (g) { return g.monster === clan.type; })) continue;
        if (countSentences(r.readAloud) + countSentences(line) > 4) continue;
        r.readAloud += " " + line;
        return;
      }
      ordered[0].features.push(["The clan's way", line]);
    }
    function clanDress() { return null; }

    var lairData = {};
    var slotIndex = 0;
    slots.forEach(function (slot, si) {
      var node = pathRooms[si + 1];
      if (slot === "factions") {
        var letA = String.fromCharCode(letterCode++), letB = String.fromCharCode(letterCode++);
        var names = rng.pick(TR.mouthNames.factions);
        var clanA = makeClan(factionPair[0], letA), clanB = makeClan(factionPair[1], letB);
        clanA.hates = clanB.name; clanB.hates = clanA.name;
        var nA = rng.range(3, 4), nB = rng.range(3, 4);
        var la = buildLair({ letter: letA, cols: 3, rows: 2, n: nA, start: [2, 0], need: [2, 1] });
        var lb = buildLair({ letter: letB, cols: 3, rows: 2, n: nB, start: [0, 0], need: [0, 1] });
        var pid = "lair" + letA + letB;
        panels.push({ id: pid, title: letA + " and " + letB + ": " + cap(names[0]) + " and " + names[1], kind: "cave", cols: 7, rows: 2, cell: LAIR_CELL, w: 7 * LAIR_CELL, h: 2 * LAIR_CELL, entries: [{ col: 2, from: node.key }, { col: 4, from: node.key }] });
        var twinSets = [[la, clanA, letA, 0, names[0], "West"], [lb, clanB, letB, 4, names[1], "East"]];
        var twinRooms = [];
        twinSets.forEach(function (ts) {
          var L2 = ts[0], clan = ts[1], let_ = ts[2], off = ts[3];
          var roles = rolesFor(L2.g.nodes.length, "factions");
          var dressF = clanDress(clan);
          var aRooms = [];
          L2.order.forEach(function (idx, num) {
            var role = roles[num] || "common";
            var entry = pickArea(role, areaDecks);
            var r = areaRoom(let_, num + 1, entry, L2.g.nodes[idx], pid, "Lair " + let_ + ": " + cap(ts[4]), off, num === 0 ? null : dressF);
            r.lesson = idx === 0 ? lesson.factions.teaches : (ROLE_TEACH[role] || ROLE_TEACH.common);
            if (idx === 0) { r.slot = "factions"; r.designNote = lesson.factions.note; }
            r._local = idx; aRooms[idx] = r;
          });
          var ordered = L2.order.map(function (i) { return aRooms[i]; });
          ordered.forEach(function (r) { rooms.push(r); });
          L2.g.edges.forEach(function (e) { link(aRooms[e[0]], aRooms[e[1]], rng.chance(0.25) ? "door" : "open"); });
          link(node, aRooms[0], "open", "open", ts[5] + " wall (cave mouth)", "Out");
          clan.count = CLANS[clan.type].count[L - 1] + rng.int(2);
          clan.morale = "Morale " + T.monsters[clan.type].ml + ". Check at the first death and at half. A beaten band falls back through the contested passage to its rivals' door and begs, or fights.";
          populate(clan, clan.count, L2.order.map(function (i) { return aRooms[i]; }), roles);
          placeQuirk(clan, L2.order.map(function (i) { return aRooms[i]; }));
          twinRooms.push({ rooms: aRooms, g: L2.g, clan: clan, letter: let_, name: ts[4], side: ts[5] });
          lairs.push({ letter: let_, name: cap(ts[4]), prose: ts[4], slot: "factions", clan: clan.id, side: ts[5], node: node.key, rooms: ordered.map(function (r) { return r.key; }), panel: pid });
        });
        /* The contested passage, between them. */
        var ce = rng.pick(TR.contested);
        var cRoomA = twinRooms[0].rooms[twinRooms[0].g.occ[cellKey(2, 1)]];
        var cRoomB = twinRooms[1].rooms[twinRooms[1].g.occ[cellKey(0, 1)]];
        var cp = placeRect(rng, { c: 3, r: 1 }, LAIR_CELL, 30, 20);
        var pass = newRoom({ key: letA + (twinRooms[0].rooms.length + 1), name: ce.name, tier: "Lair " + letA + ": " + cap(names[0]), panel: pid, shape: "cave", x: cp.x, y: cp.y, w: 30, h: 20, c: 3, r: 1 });
        pass.readAloud = ce.ra;
        pass.features = ce.features.map(function (f) { return f.slice(); });
        pass.features.push(["Who holds it", "Neither clan, today. Whoever the party helps takes it within a day, and with it the other clan's water and its back door."]);
        pass.contested = [letA, letB];
        pass.lesson = "Two enemies share a border. Stand on it and both will talk to you.";
        pass.obvious = "Fight whoever is here."; pass.clever = "Offer the passage to one clan as the price of their help.";
        if (rng.chance(0.6)) pass.encounter = encounter([group(rng, clanA.type, 2), group(rng, clanB.type, 2)], { tactics: "A patrol from each side, glaring across the line. Neither will strike first while the party watches." });
        rooms.push(pass);
        link(cRoomA, pass, "open"); link(pass, cRoomB, "open");
        return;
      }
      var letter = String.fromCharCode(letterCode++);
      var pid2 = slot === "temple" ? "temple" : "lair" + letter;
      var mname = slot === "temple" ? rng.pick(TR.temple.names) : rng.pick(TR.mouthNames[slot]);
      var thisSide = slot === "temple" ? "Ahead" : side;
      if (slot !== "temple") side = flip(side);
      var n, cols = 3, rows = 2;
      if (slot === "morale") n = rng.range(3, 5);
      else if (slot === "reaction" || slot === "alarm" || slot === "deception") n = rng.range(4, 6);
      else if (slot === "avoidance") n = rng.range(3, 4);
      else if (slot === "supply") n = 3;
      else { n = rng.range(5, 8); cols = 3; rows = 3; }
      var start = slot === "temple" ? [1, 0] : [rng.int(3), 0];
      var lay = buildLair({ letter: letter, cols: cols, rows: rows, n: n, start: start, pathLen: slot === "temple" ? 5 : 3 });
      panels.push({ id: pid2, title: letter + ": " + cap(mname), kind: slot === "temple" ? "built" : "cave", cols: cols, rows: rows, cell: LAIR_CELL, w: cols * LAIR_CELL, h: rows * LAIR_CELL, entries: [{ col: start[0], from: node.key }] });
      var tierName = (slot === "temple" ? "The Temple " : "Lair ") + letter + ": " + cap(mname);
      var aRooms = [];
      var clan = null;
      if (slot === "morale" || slot === "reaction" || slot === "alarm") clan = makeClan(slot === "morale" ? moraleClan : slot === "reaction" ? reactionClan : alarmClan, letter);
      if (slot === "deception") clan = makeClan(decept[0], letter);
      var roles;
      if (clan) roles = rolesFor(n, slot === "factions" ? "factions" : slot);
      else if (slot === "avoidance") roles = ["mouth", "den"].concat(rng.shuffle(["well", "store", "shrine"])).slice(0, n);
      else if (slot === "supply") roles = ["supply", "well", "store"];
      else roles = ["porch", "undead", "trap", "leader", "sanctum"].concat(rng.shuffle(["dorm", "kitchen", "cells", "map", "eggs", "cistern", "library", "bell"]).slice(0, n - 5));
      var templeEntries = null;
      var TT2 = TR.temple;
      var extraMap = { dorm: 0, kitchen: 1, cells: 2, map: 3, eggs: 4, cistern: 5, library: 6, bell: 7 };
      var relic = slot === "temple" ? rng.pick(TT2.relics) : null;
      var dressF = clan ? clanDress(clan) : null;
      lay.order.forEach(function (idx, num) {
        var role = roles[num];
        var entry, r;
        if (slot === "temple") {
          if (role === "porch") entry = rng.pick(TT2.porch);
          else if (role === "undead") entry = rng.pick(TT2.undead);
          else if (role === "trap") entry = rng.pick(TT2.trap);
          else if (role === "leader") entry = rng.pick(TT2.leader);
          else if (role === "sanctum") entry = { name: rng.pick(["The Sanctum", "The Inner Room", "The Reading Floor", "The Heart Room"]), ra: relic.ra, features: [], obvious: "Grab it or smash it.", clever: "Stop. Look. Talk it over. Then choose." };
          else entry = TT2.extras[extraMap[role]];
        } else if (slot === "avoidance") {
          entry = role === "den" ? { name: beast.name, ra: beast.ra, features: [["The cost", beast.cost], ["The reward", fill(beast.reward, { gp: (10 + rng.int(30)) * L })]], obvious: "Fight it.", clever: "Look, count the bones, and leave." } : pickArea(role, areaDecks);
        } else if (slot === "supply") {
          entry = role === "supply" ? rng.pick(TR.supply) : pickArea(role, areaDecks);
        } else if (role === "hireling") {
          entry = { name: "The Hireling's Corner", ra: hireling.look, features: [["Its price", cap(hireling.price) + "."], ["Its loyalty", hireling.turn]], obvious: "Fight it.", clever: "Outbid the clan." };
        } else if (role === "prisoners") {
          entry = { name: "The Pens", ra: "Cages of lashed poles line a cold cave. People look out of them.", features: [], obvious: "Break the cages.", clever: "Ask the prisoners what they know before anything else." };
        } else if (role === "feast") {
          entry = { name: "The Guest Hall", ra: "A long hall is laid for a feast, with furs on the benches and a fire in a pit. The hosts rise to greet you with smiles.", features: [], obvious: "Sit and eat.", clever: "Look at the table before sitting." };
        } else {
          entry = pickArea(role, areaDecks);
        }
        r = areaRoom(letter, num + 1, entry, lay.g.nodes[idx], pid2, tierName, 0, (num === 0 || !dressF) ? null : dressF);
        if (slot === "temple") r.shape = "room";
        r._role = role;
        r.lesson = (slot !== "temple" && ROLE_TEACH[role]) ? ROLE_TEACH[role] : "";
        aRooms[idx] = r;
      });
      var ordered = lay.order.map(function (i) { return aRooms[i]; });
      ordered.forEach(function (r) { rooms.push(r); });
      lay.g.edges.forEach(function (e) {
        var k = slot === "temple" ? (rng.chance(0.6) ? "door" : "open") : (rng.chance(0.2) ? "door" : "open");
        link(aRooms[e[0]], aRooms[e[1]], k);
      });
      /* Small lairs sometimes get a loop. */
      if (n >= 5 && rng.chance(0.5)) {
        var ne = nonEdges(lay.g);
        if (ne.length) { var le = rng.pick(ne); link(aRooms[le[0]], aRooms[le[1]], "open"); }
      }
      var mouth = aRooms[0];
      link(node, mouth, "open", "open", slot === "temple" ? "Ahead (bronze door)" : thisSide + " wall (cave mouth)", "Out");
      mouth.slot = slot === "supply" ? null : slot;
      if (slot !== "supply") { mouth.lesson = lesson[slot].teaches; mouth.designNote = lesson[slot].note; }
      else { mouth.lesson = "Expedition supply. A safe place to rest, and a place to stash loot, matter as much as any fight."; mouth.designNote = "This mouth is quiet on purpose. Whether the party uses it as a camp, and whether they hide it, is up to them."; }

      var L3 = { letter: letter, name: cap(mname), prose: mname, slot: slot, side: thisSide, node: node.key, rooms: ordered.map(function (r) { return r.key; }), panel: pid2 };
      if (clan) L3.clan = clan.id;
      lairs.push(L3);
      lairData[slot] = { rooms: ordered, clan: clan, letter: letter, name: mname, mouth: mouth };

      /* Lesson-specific content. */
      var total = clan ? CLANS[clan.type].count[L - 1] + rng.int(3) : 0;
      if (slot === "morale") {
        var tr = rng.pick(T.traps);
        mouth.trap = tr;
        mouth.features.push(["Trapped entrance: " + tr.name, tr.trigger + " " + tr.effect + " Finding it: " + tr.find]);
        populate(clan, total, ordered, roles);
        clan.morale = "Morale " + T.monsters[clan.type].ml + " (" + (T.monsters[CLANS[clan.type].leader].ml) + " while the leader lives). Check at the first death and at half. When they break, they run for the back caves, or out and up the ravine to the next clan.";
      } else if (slot === "reaction") {
        populate(clan, total, ordered, roles);
        var hr = ordered[roles.indexOf("hireling")];
        if (hr) {
          var hg = group(rng, hireling.monster, hireling.count || 1);
          hr.encounter = encounter([hg], { label: "hireling", tactics: "Hired by " + clan.name + ". Price: " + hireling.price + ". " + hireling.turn });
        }
        mouth.features.push(["Reaction", "When the party is seen, roll 2d6 on the clan's reaction table (see the lair box). A gift moves the roll one step."]);
        clan.reaction = [["2 or less", "They attack at once, hireling in front."], ["3–5", "Spears up. They demand a toll to leave."], ["6–8", "They shout for the chief and wait."], ["9–11", "The chief comes out to talk. They want " + clan.wants + "."], ["12 or more", "They offer food and ask for help against their enemies."]];
      } else if (slot === "alarm") {
        var alarmDevice = rng.pick(TR.alarms);
        populate(clan, total, ordered, roles);
        mouth.features.push(["The alarm", cap(alarmDevice) + ". If anyone in the lair sees the party and lives a round, it sounds."]);
        var pr2 = ordered[roles.indexOf("prisoners")];
        var prisoners = rng.shuffle(TR.prisoners).slice(0, 2).map(function (p) { return { who: fill(p.who, { folk: rng.pick(T.names.folk) }), knows: p.knows, reward: p.reward }; });
        if (pr2) {
          pr2.features.push(["Prisoners", prisoners.map(function (p) { return cap(p.who) + ". Knows " + p.knows + ". Reward: " + p.reward + "."; }).join(" ")]);
          pr2.features.push(["Under alarm", "On round 4 of the alarm, two guards come to drag the prisoners to the back. On round 8 they are gone up the ravine."]);
          pr2.lesson = "A rescue is a race. Every round of alarm counts.";
        }
        clan.alarm = { device: alarmDevice, schedule: [["Round 1", "The alarm sounds. Guards fall back toward the barracks."], ["Round 3", "Everyone in the common cave arrives, armed."], ["Round 5", "The chief and bodyguard arrive."], ["Round 8", "The prisoners are moved. The mouth is barred from inside; leaving takes a forcing roll."]], prisoners: prisoners };
      } else if (slot === "deception") {
        populate(clan, total, ordered, roles);
        var feast = ordered[roles.indexOf("feast")];
        var hire = group(rng, decept[1], [1, 2, 3][L - 1] + rng.int(2));
        if (feast) {
          feast.encounter = encounter(feast.encounter ? feast.encounter.groups.concat([hire]) : [hire], { label: "hosts", tactics: "They feign hospitality. They strike when the guests are fed, seated and off guard: the hosts get a free round." });
          var tells = rng.shuffle(TR.tells).slice(0, 4);
          feast.features.push(["The tells", tells.join(" ")]);
          feast.lesson = "The words say welcome. The table says something else.";
        }
        clan.tells = true;
      } else if (slot === "avoidance") {
        var den = ordered[roles.indexOf("den")];
        den.encounter = encounter([group(rng, beast.monster, beast.count + (beast.monster === "owlbear" || L < 3 ? 0 : 1))], { label: "beast", tactics: "It fights to the death in its lair. Outside, it does not chase past the mouth." });
        den.lesson = "Count the cost before the fight. Some rewards are not worth it.";
        mouth.features.push(["Signs", "Claw marks above head height. A smell. No clan comes near this mouth."]);
      } else if (slot === "supply") {
        if (rng.chance(0.4)) ordered[1].encounter = encounter([group(rng, rng.pick(["giantRat", "fireBeetle", "giantCentipede"]), rng.range(2, 4) + L)], { tactics: "Vermin. They want the food in your packs." });
      } else if (slot === "temple") {
        var byRole = {}; ordered.forEach(function (r, i) { byRole[roles[i]] = r; });
        var und = byRole.undead;
        var uGroups = L === 1 ? [group(rng, "skeleton", 3 + rng.int(3))] : L === 2 ? [group(rng, rng.pick(["skeleton", "zombie"]), 4 + rng.int(3))] : [group(rng, "zombie", 4 + rng.int(2)), group(rng, "ghoul", 1 + rng.int(2))];
        und.encounter = encounter(uGroups, { label: "undead", tactics: "They do not speak. A cleric can turn them; the Readers' dead turn as normal for their kind." });
        und.lesson = "Turning undead. The cleric's power works here; say so, and let the player roll it.";
        und.features.push(["Turning", "The Minister or Elf Minister can turn these. Use the OSE turning table."]);
        var trapR = byRole.trap;
        var ttrap = rng.pick(T.traps);
        trapR.trap = ttrap;
        trapR.features.push(["Trap: " + ttrap.name, ttrap.trigger + " " + ttrap.effect + " Finding it: " + ttrap.find + " Getting past: " + ttrap.disarm]);
        trapR.lesson = "Traps again, now with something waiting behind them. Search before you hurry.";
        var lead = byRole.leader;
        var leaderName = rng.pick(TT2.titles) + " " + rng.pick(T.names.first) + rng.pick(T.names.last);
        var lgp = [group(rng, TT2.leaderMonster[L - 1], 1, { name: leaderName, proper: true })];
        lgp[0].singular = leaderName + ", " + T.monsters[TT2.leaderMonster[L - 1]].name;
        lgp[0].name = leaderName;
        lgp.push(group(rng, "acolyte", [2, 3, 4][L - 1]));
        lead.encounter = encounter(lgp, { label: "leader", tactics: leaderName + " talks first and fights last. The acolytes stand behind." });
        lead.features.push(["What " + leaderName + " says", rng.pick(TT2.says)]);
        lead.features.push(["What " + leaderName + " offers", cap(rng.pick(TT2.offers)) + "."]);
        lead.lesson = "A leader who talks is worth hearing. Reaction and parley work on cults too.";
        lead.obvious = "Attack."; lead.clever = "Sit, listen, and ask what the relic does.";
        var sanct = byRole.sanctum;
        sanct.relic = relic.name;
        sanct.features.push(["The final choice", "Three choices. None is correct."]);
        relic.options.forEach(function (o) { sanct.features.push([o[0], o[1]]); });
        sanct.lesson = "A final choice with no right answer. The party decides what kind of people they are.";
        sanct.art = "Otus ink, black on cream: hard architectural line, ruled stone, crowded hatching in the corners. In frame: " + relic.name + ", lit from itself, the party's shadows long on the wall behind them. Painted exception allowed: the relic's light only.";
        sanct.treasure = treasureRoll(rng, L, 1);
        ["dorm", "kitchen", "cells", "map", "eggs", "cistern", "library", "bell"].forEach(function (k) {
          var rr = byRole[k]; if (!rr) return;
          rr.features = rr.features.map(function (f) { return [f[0], fill(f[1], { n: numWord(2 + rng.int(4)) })]; });
          rr.lesson = rng.pick(["The temple is a house where people live. Its ordinary rooms tell you what they plan.", "Read the rooms. The Readers write everything down."]);
          if (k === "dorm" && rng.chance(0.5)) rr.encounter = encounter([group(rng, "acolyte", 1 + rng.int(2))], { tactics: "Off duty. They shout for help before they fight." });
        });
        byRole.porch.lesson = lesson.temple.teaches;
        byRole.porch.designNote = lesson.temple.note;
        lairData.temple.leader = leaderName; lairData.temple.relic = relic;
      }
      if (clan) placeQuirk(clan, ordered);
      /* Treasure in chief rooms and stores. */
      ordered.forEach(function (r) {
        if (r._role === "chief" || r._role === "store") r.treasure = treasureRoll(rng, L, r._role === "chief" ? 0.3 : 0.05);
        if (!r.lesson) r.lesson = ROLE_TEACH.common;
      });
      if (clan) {
        clan.count = total;
        clan.morale = clan.morale || ("Morale " + T.monsters[clan.type].ml + ". Check at the first death and at half.");
      }
    });

    /* Hates for clans without a rival. */
    clans.forEach(function (c) {
      if (c.hates) return;
      var others = clans.filter(function (o) { return o !== c; });
      c.hates = rng.chance(0.3) ? "the Readers" : rng.pick(others).name;
    });

    clans.forEach(function (c) { if (c.reaction) c.reaction[4][1] = "They offer food and ask for help against " + c.hates + "."; });
    /* Lay out the ravine strip: nodes bottom to top. */
    var stripH = (nodeCount) * 90 + 40;
    pathRooms.forEach(function (pr, i) {
      pr.x = 70 + (i % 2 ? 12 : -12) + rng.int(10) - 5;
      pr.y = stripH - 50 - i * 90;
      pr.w = 20; pr.h = 20;
    });
    panels.unshift({ id: "ravine", title: "The Ravine Floor", kind: "ravine", w: 180, h: stripH, scaleNote: "Not to scale" });

    /* Ravine reacts, factions, wandering. */
    var react = [];
    var ld = lairData;
    var C1 = clans.filter(function (c) { return c.id === lairs.filter(function (l) { return l.slot === "factions"; })[0].letter; })[0];
    var C2 = clans.filter(function (c) { return c.id === lairs.filter(function (l) { return l.slot === "factions"; })[1].letter; })[0];
    react.push(["The party breaks " + ld.morale.clan.name + " (" + ld.morale.letter + ")", "Survivors run up to " + ld.reaction.clan.name + " (" + ld.reaction.letter + ") and serve them. Add " + numWord(2 + rng.int(3)) + " " + ld.morale.clan.monster.plural + " there."]);
    react.push(["The party buys the hireling at " + ld.reaction.letter, "It guards the party's camp for three days, then goes back to whoever pays more. " + cap(ld.reaction.clan.name) + " want it back."]);
    react.push(["The party helps " + C1.name + " (" + C1.id + ")", cap(C1.name) + " take the contested passage and the " + C2.monster.name + " lair within a day. Survivors of " + C2.name + " come to The Fort, begging or burning."]);
    react.push(["The party helps " + C2.name + " (" + C2.id + ")", cap(C2.name) + " take the contested passage and the " + C1.monster.name + " lair within a day. " + cap(C1.name) + " raid the Weirs for food."]);
    react.push(["The alarm sounds at " + ld.alarm.letter, "For three days every clan doubles its guards. Wandering checks in the ravine are 2-in-6."]);
    react.push(["The hosts at " + ld.deception.letter + " are exposed", "They abandon the lair and lie in wait at " + pathRooms[Math.max(1, slots.indexOf("deception"))].key + " for the party's way home."]);
    react.push(["The beast at " + ld.avoidance.letter + " is roused and not killed", "It hunts the ravine floor at dusk. Each clan loses a fighter a night until someone kills it, and the clans start to talk about asking the party."]);
    react.push(["The party goes home for a week", "Every lair restocks one third of its dead. " + cap(ld.temple.leader) + " sends an envoy with gifts to the strongest clan left."]);
    react.push(["The party frees the prisoners", "The Readers come down to ask why. " + cap(ld.alarm.clan.name) + " are paid less, and hate the party for it."]);

    var wander = rng.shuffle(TR.wandering).slice(0, 8).map(function (w, i) {
      if (w.clan) {
        var c = clans[rng.int(clans.length)];
        var m = c.monster;
        return { clan: c.id, count: w.count, text: cap(w.count) + " " + m.plural + ", " + fill(w.text, { lair: c.name + " (" + c.id + ")" }) + ". If " + c.id + " is broken, roll again.", stats: "AC " + m.ac + ", HD " + m.hd + ", Att " + m.att + ", THAC0 " + m.thac0 + ", MV " + m.mv + ", SV " + m.sv + ", ML " + m.ml + ", XP " + m.xp };
      }
      return wanderRow(w, L);
    });
    var rumors = rumorTable(rng, TR.rumors, [
      { truth: "True", text: cap(C1.name) + " and " + C2.name + " are at war over a passage under the ravine." },
      { truth: "Partly", text: "The " + ld.deception.clan.monster.plural + " at " + ld.deception.name + " feed travellers. (They do. Then they take what the travellers carry.)" },
      { truth: "True", text: "There is a beast in " + ld.avoidance.name + ". Even the clans leave it alone." }
    ]);

    var d = {
      template: "ravine", seed: seed, partyLevel: L,
      title: cap(rname.name), subtitle: "A ravine of clans, rising to " + ld.temple.name,
      overview: "Locals call it " + rname.name + " because " + rname.why + ". " + history + " Now " + numWord(clans.length) + " clans live in its mouths, and the Readers of the Unwritten hold " + ld.temple.name + " at its head. They pay the clans in faceless silver and bully them with their dead.",
      lairs: lairs, panels: panels, rooms: rooms,
      factions: clans.map(function (c) { return { lair: c.id, clan: c.name, type: c.type, plural: c.monster.plural, sign: c.sign, quirk: c.quirk, wants: c.wants, fears: c.fears, hates: c.hates, trades: c.trades, count: c.count, morale: c.morale, reaction: c.reaction || null, alarm: c.alarm || null }; }),
      rivals: [C1.id, C2.id],
      ravineReacts: react, wandering: [{ tier: "The Ravine", die: "d8", entries: wander }], rumors: rumors,
      clock: { what: clock.what, steps: clock.steps.slice() },
      finalChoice: { relic: ld.temple.relic.name, room: lairRelicRoom(rooms), options: ld.temple.relic.options.map(function (o) { return { choice: o[0], result: o[1] }; }) },
      fortReacts: rng.shuffle(TR.fortReacts).slice(0, 4),
      entry: "R1", temple: ld.temple.letter, hasSupply: hasSupply
    };
    finish(d);
    return d;
  }
  function lairRelicRoom(rooms) {
    var r = rooms.filter(function (x) { return x.relic; })[0];
    return r ? r.key : null;
  }

  /* ================================================================ */
  /* MARKDOWN                                                          */
  /* ================================================================ */
  function mdCell(s) { return String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " "); }
  function mdTable(header, rows) {
    var out = ["| " + header.map(mdCell).join(" | ") + " |", "|" + header.map(function () { return "---"; }).join("|") + "|"];
    rows.forEach(function (r) { out.push("| " + r.map(mdCell).join(" | ") + " |"); });
    return out.join("\n");
  }
  var KIND_WORD = { open: "", door: "door", stuck: "stuck door", locked: "locked door", secret: "secret door", stair: "stair", water: "wade or swim" };
  function exitText(e) {
    var k = KIND_WORD[e.kind];
    return e.dir + (k && e.dir.indexOf("(") < 0 ? " (" + k + ")" : "") + " to " + e.to;
  }
  function roomMd(r) {
    var o = [];
    o.push("### " + r.key + ". " + r.name);
    o.push("");
    o.push(mdTable(["", ""], [
      ["**Size**", r.size], ["**Light**", r.light],
      ["**Exits**", r.exits.map(exitText).join(". ") + "."],
      ["**Encounter**", r.encounter ? encounterLabel(r.encounter) + (r.trap ? ". Trap (see Features)" : "") : (r.trap ? "None. Trap (see Features)" : "None")]
    ]));
    o.push("");
    o.push("> **Read aloud:** " + r.readAloud);
    o.push("");
    if (r.features.length) { o.push(mdTable(["Feature", "Detail"], r.features)); o.push(""); }
    if (r.encounter) {
      var e = r.encounter;
      o.push("**Encounter: " + encounterLabel(e) + ".**" + (e.tactics ? " " + e.tactics : ""));
      o.push("");
      var who = function (g) { return g.proper ? g.name : cap(g.name) + (g.count > 1 ? " ×" + g.count : ""); };
      o.push(mdTable(["Creature", "AC", "HD", "hp", "Att", "THAC0", "MV", "SV", "ML", "XP"], e.groups.map(function (g) {
        return [who(g) + (g.statsAs ? " (as " + g.statsAs + ")" : ""), g.ac, g.hd, g.hp.join(", "), g.att, g.thac0, g.mv, g.sv, g.ml, g.count > 1 ? g.xpEach + " each (" + g.xp + ")" : String(g.xp)];
      })));
      o.push("");
      if (e.groups.length === 1) o.push(fiveE(e.groups[0]));
      else e.groups.forEach(function (g) { o.push("- **" + who(g) + ":** " + fiveE(g)); });
      var notes = e.groups.filter(function (g) { return g.note; }).map(function (g) { return cap(g.singular) + ": " + g.note; });
      if (notes.length) { o.push(""); o.push("*" + notes.join(" ") + "*"); }
      if (e.reaction) { o.push(""); o.push("**Reaction (2d6 + Charisma modifier):**"); o.push(""); o.push(mdTable(["2d6", "Result"], e.reaction)); }
      o.push("");
    }
    if (r.treasure) { o.push("**Treasure:** " + r.treasure); o.push(""); }
    if (r.obvious || r.clever) { o.push("**Obvious:** " + r.obvious + " **Clever:** " + r.clever); o.push(""); }
    o.push("> **What This Room Teaches:** " + r.lesson);
    if (r.designNote) { o.push(""); o.push("> **Design Note:** " + r.designNote); }
    if (r.art) { o.push(""); o.push("> **Art reference:** " + r.art); }
    o.push("");
    o.push("---");
    o.push("");
    return o.join("\n");
  }
  function wanderMd(w) {
    var o = ["### " + w.tier + " (" + w.die + ")", "", "Check every 2 turns: 1-in-6." + (w.tier === "The Ravine" ? " In the ravine, check every 2 turns by day and every turn at night." : ""), ""];
    o.push(mdTable([w.die, "Encounter", "Stats"], w.entries.map(function (e, i) { return [i + 1, e.text, e.stats || "—"]; })));
    o.push("");
    return o.join("\n");
  }
  function toMarkdown(d) {
    var o = [];
    var T = TEMPLATES[d.template];
    o.push("# " + d.title);
    o.push("");
    o.push("## *" + d.subtitle + "*");
    o.push("");
    o.push("*A generated dungeon for OSE Advanced Fantasy, made by the Forge. Template: " + d.template + ". Seed " + d.seed + ". Party level " + d.partyLevel + ". The same seed always makes the same dungeon. The lesson ladder is fixed; the content is rolled.*");
    o.push("");
    o.push("## Overview");
    o.push("");
    var structure;
    if (d.template === "tower") {
      structure = d.tiers.map(function (t) { return t.name + " (" + t.rooms[0] + "–" + t.rooms[t.rooms.length - 1] + ")"; }).join(", ");
    } else {
      structure = "The ravine floor (" + d.rooms.filter(function (r) { return r.panel === "ravine"; }).length + " stretches of path), " + (d.lairs.length - 1) + " lairs in its walls (" + d.lairs.filter(function (l) { return l.slot !== "temple"; }).map(function (l) { return l.letter; }).join(", ") + ") and the temple (" + d.temple + ") at the head.";
    }
    o.push(mdTable(["", ""], [
      ["**Where**", d.template === "tower" ? cap(d.place) + ". Half a day from The Fort by boat." : "A cleft in a ridge, half a day on foot from The Fort."],
      ["**Structure**", structure],
      ["**Party**", "4–6 characters of level " + d.partyLevel + ", plus retainers"],
      ["**Monster XP**", d.xpTotal + " (keyed encounters only)"],
      ["**Map**", "The Forge page draws it; download the SVG."]
    ]));
    o.push("");
    o.push(d.overview);
    o.push("");
    o.push("### The Clock: " + d.clock.what);
    o.push("");
    o.push("What happens if the party is slow.");
    o.push("");
    o.push(mdTable(["When", "What happens"], d.clock.steps.map(function (s) { var i = s.indexOf(": "); return [s.slice(0, i), cap(s.slice(i + 2))]; })));
    o.push("");
    o.push("### The Lesson Ladder");
    o.push("");
    o.push(mdTable(["#", "Lesson", "Where"], d.lessonOrder.map(function (l) { return [l.n, l.label, l.rooms.join(", ")]; })));
    o.push("");
    if (d.template === "tower") {
      o.push("### The Dungeon Clock");
      o.push("");
      o.push(mdTable(["Rule", "Value"], DUNGEON_CLOCK));
      o.push("");
      o.push("**Secret door:** " + d.secretDoor.note + " It cuts the walk from S1 to " + d.climax + ".");
      o.push("");
    } else {
      o.push("### The Clans");
      o.push("");
      o.push(mdTable(["Lair", "Clan", "Wants", "Fears", "Hates", "Trades"], d.factions.map(function (f) { return [f.lair, cap(f.clan) + " (" + f.count + " " + f.plural + ")", cap(f.wants), cap(f.fears), cap(f.hates), cap(f.trades)]; })));
      o.push("");
    }
    o.push("## Wandering Monsters");
    o.push("");
    d.wandering.forEach(function (w) { o.push(wanderMd(w)); });
    if (d.template === "tower") {
      d.tiers.forEach(function (t) {
        o.push("## " + t.name);
        o.push("");
        d.rooms.filter(function (r) { return r.key.charAt(0) === t.id; }).forEach(function (r) { o.push(roomMd(r)); });
      });
      o.push("## Restock Between Visits (d12)");
      o.push("");
      o.push(mdTable(["d12", "What changed while the party was away"], d.restock.map(function (s, i) { return [i + 1, s]; })));
      o.push("");
      o.push("## The Prize: Two Buyers");
      o.push("");
      o.push("The party may bring home " + d.prize.what + ". Two people want it. Neither choice is correct.");
      o.push("");
      o.push(mdTable(["Buyer", "Wants it", "Pays"], d.prize.buyers.map(function (b) { return [cap(b.who), cap(b.wants), cap(b.pays)]; })));
      o.push("");
    } else {
      o.push("## The Ravine Floor");
      o.push("");
      d.rooms.filter(function (r) { return r.panel === "ravine"; }).forEach(function (r) { o.push(roomMd(r)); });
      var seenPanel = {};
      d.lairs.forEach(function (l) {
        var f = d.factions.filter(function (x) { return x.lair === l.letter; })[0];
        o.push("## " + (l.slot === "temple" ? "The Temple " + l.letter + ": " + l.name : "Lair " + l.letter + ": " + l.name));
        o.push("");
        var rows = [["**Mouth**", l.slot === "temple" ? "At the head of the ravine, above " + l.node : cap(l.side.toLowerCase()) + " wall, above " + l.node]];
        rows.push(["**Lesson**", TEMPLATES.ravine.lessons.filter(function (x) { return x.slot === l.slot; }).map(function (x) { return x.label; })[0] || "Expedition supply (outside the ladder)"]);
        if (f) {
          rows.push(["**Clan**", cap(f.clan) + ": " + f.count + " " + f.plural + " and a leader"]);
          rows.push(["**Their sign**", cap(f.sign)]);
          rows.push(["**Morale**", f.morale]);
          rows.push(["**Wants / fears**", cap(f.wants) + " / " + f.fears]);
        }
        o.push(mdTable(["", ""], rows));
        o.push("");
        if (f && f.reaction) { o.push("**Reaction (2d6 + Charisma modifier):**"); o.push(""); o.push(mdTable(["2d6", "Result"], f.reaction)); o.push(""); }
        if (f && f.alarm) { o.push("**Alarm schedule** (" + f.alarm.device + "):"); o.push(""); o.push(mdTable(["Round", "What happens"], f.alarm.schedule)); o.push(""); }
        l.rooms.forEach(function (k) { o.push(roomMd(d.rooms.filter(function (r) { return r.key === k; })[0])); });
        if (l.slot === "factions" && !seenPanel[l.panel]) {
          var pass = d.rooms.filter(function (r) { return r.contested && r.panel === l.panel; })[0];
          if (pass && l.letter === pass.contested[0]) { seenPanel[l.panel] = true; o.push(roomMd(pass)); }
        }
      });
      o.push("## The Final Choice");
      o.push("");
      o.push("In " + d.finalChoice.room + ", the party finds " + d.finalChoice.relic + ". Three choices. None is correct.");
      o.push("");
      o.push(mdTable(["Choice", "What follows"], d.finalChoice.options.map(function (x) { return [x.choice, x.result]; })));
      o.push("");
      o.push("## The Ravine Reacts");
      o.push("");
      o.push(mdTable(["If…", "Then…"], d.ravineReacts));
      o.push("");
    }
    o.push("## The Fort Reacts");
    o.push("");
    d.fortReacts.forEach(function (s) { o.push("- " + s); });
    o.push("");
    o.push("## Rumors (d8)");
    o.push("");
    o.push(mdTable(["d8", "Rumor", "Truth"], d.rumors.map(function (r) { return [r.roll, r.text, r.truth]; })));
    o.push("");
    return o.join("\n");
  }

  /* ================================================================ */
  /* SVG MAP                                                           */
  /* ================================================================ */
  var INK = "#1c1915", PAPER = "#f3ebd9";
  var FONT = "'Palatino Linotype', Palatino, 'Book Antiqua', 'Iowan Old Style', Georgia, 'DejaVu Serif', serif";
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function f1(n) { return Math.round(n * 10) / 10; }
  function smallCaps(text, x, y, size, anchor, extra) {
    var out = "<text x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" font-family=\"" + FONT + "\" font-size=\"" + size + "\"" + (anchor ? " text-anchor=\"" + anchor + "\"" : "") + " class=\"fg-if\" fill=\"" + INK + "\"" + (extra || "") + ">";
    var runs = [], cur = null;
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i), big = ch !== ch.toLowerCase() || /[0-9·:—–]/.test(ch);
      if (!cur || cur.big !== big) { cur = { big: big, s: "" }; runs.push(cur); }
      cur.s += ch.toUpperCase();
    }
    runs.forEach(function (r) { out += "<tspan font-size=\"" + (r.big ? size : f1(size * 0.76)) + "\">" + esc(r.s) + "</tspan>"; });
    return out + "</text>";
  }
  function txt(s, x, y, size, opts) {
    opts = opts || {};
    return "<text x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" font-family=\"" + FONT + "\" font-size=\"" + size + "\"" +
      (opts.anchor ? " text-anchor=\"" + opts.anchor + "\"" : "") + (opts.weight ? " font-weight=\"" + opts.weight + "\"" : "") +
      (opts.italic ? " font-style=\"italic\"" : "") + (opts.spacing ? " letter-spacing=\"" + opts.spacing + "\"" : "") +
      (opts.halo ? " stroke=\"" + PAPER + "\" stroke-width=\"3\" paint-order=\"stroke\" stroke-linejoin=\"round\"" : "") +
      " class=\"" + (opts.paper ? "fg-pf" : "fg-if") + (opts.halo ? " fg-ps" : "") + "\" fill=\"" + (opts.paper ? PAPER : INK) + "\">" + esc(s) + "</text>";
  }
  function keyCircle(label, cx, cy, r) {
    r = r || 10;
    var w = label.length > 2 ? r + 4 : r;
    var shape = label.length > 2 ?
      "<rect x=\"" + f1(cx - w) + "\" y=\"" + f1(cy - r) + "\" width=\"" + f1(2 * w) + "\" height=\"" + f1(2 * r) + "\" rx=\"" + r + "\" class=\"fg-if\" fill=\"" + INK + "\"/>" :
      "<circle cx=\"" + f1(cx) + "\" cy=\"" + f1(cy) + "\" r=\"" + r + "\" class=\"fg-if\" fill=\"" + INK + "\"/>";
    return shape + txt(label, cx, cy + r * 0.38, r * 1.0, { anchor: "middle", weight: "bold", paper: true });
  }

  /* Jittered polyline path "M..L.." along a rectangle (hand-feel). */
  function wobbleRect(rng, x, y, w, h, amp) {
    var pts = [];
    function edge(x0, y0, x1, y1) {
      var len = Math.hypot(x1 - x0, y1 - y0), n = Math.max(2, Math.round(len / 18));
      for (var i = 0; i < n; i++) {
        var t = i / n;
        pts.push([x0 + (x1 - x0) * t + (i ? (rng.float() - 0.5) * amp : 0), y0 + (y1 - y0) * t + (i ? (rng.float() - 0.5) * amp : 0)]);
      }
    }
    edge(x, y, x + w, y); edge(x + w, y, x + w, y + h); edge(x + w, y + h, x, y + h); edge(x, y + h, x, y);
    return "M" + pts.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join("L") + "Z";
  }
  /* A cave blob inside a rect: a closed smooth curve. */
  function blobPath(rng, x, y, w, h) {
    var cx = x + w / 2, cy = y + h / 2, n = 14, pts = [];
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2;
      var k = 0.86 + rng.float() * 0.14;
      /* squarish superellipse so the blob fills its rect */
      var ca = Math.cos(a), sa = Math.sin(a);
      var px = cx + (w / 2) * k * Math.sign(ca) * Math.pow(Math.abs(ca), 0.6);
      var py = cy + (h / 2) * k * Math.sign(sa) * Math.pow(Math.abs(sa), 0.6);
      pts.push([px, py]);
    }
    var d = "";
    for (var j = 0; j < n; j++) {
      var p0 = pts[j], p1 = pts[(j + 1) % n];
      var mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
      if (j === 0) { var pl = pts[n - 1]; d += "M" + f1((pl[0] + p0[0]) / 2) + " " + f1((pl[1] + p0[1]) / 2); }
      d += "Q" + f1(p0[0]) + " " + f1(p0[1]) + " " + f1(mx) + " " + f1(my);
    }
    return d + "Z";
  }
  function insideAny(px, py, rects, pad) {
    for (var i = 0; i < rects.length; i++) {
      var r = rects[i];
      if (px > r.x - pad && px < r.x + r.w + pad && py > r.y - pad && py < r.y + r.h + pad) return true;
    }
    return false;
  }
  /* Dense rock hatching in a band around the open spaces: short strokes in clusters. */
  function hatch(rng, open, band, bounds, density) {
    var d = [];
    open.forEach(function (r) {
      var area = (r.w + 2 * band) * (r.h + 2 * band) - r.w * r.h;
      var n = Math.round(area / density);
      for (var i = 0; i < n; i++) {
        var px = r.x - band + rng.float() * (r.w + 2 * band), py = r.y - band + rng.float() * (r.h + 2 * band);
        if (px < bounds.x || py < bounds.y || px > bounds.x + bounds.w || py > bounds.y + bounds.h) continue;
        if (insideAny(px, py, open, 2)) continue;
        var ang = rng.float() * Math.PI, len = 4 + rng.float() * 4, k = 2 + rng.int(2);
        var dx = Math.cos(ang) * len / 2, dy = Math.sin(ang) * len / 2;
        var nx = -Math.sin(ang) * 2.2, ny = Math.cos(ang) * 2.2;
        for (var j = 0; j < k; j++) {
          var ox = px + nx * (j - (k - 1) / 2), oy = py + ny * (j - (k - 1) / 2);
          d.push("M" + f1(ox - dx) + " " + f1(oy - dy) + "L" + f1(ox + dx) + " " + f1(oy + dy));
        }
      }
    });
    return "<path d=\"" + d.join("") + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.8\" fill=\"none\" stroke-linecap=\"round\"/>";
  }
  /* Corridor between two rooms in the same panel (axis-aligned), in px. */
  function corridorGeom(a, b, s, ox, oy) {
    var horiz = a.r === b.r;
    var A = { x: ox + a.x * s, y: oy + a.y * s, w: a.w * s, h: a.h * s }, B = { x: ox + b.x * s, y: oy + b.y * s, w: b.w * s, h: b.h * s };
    var half = 5 * s;
    if (horiz) {
      var L = A.x < B.x ? A : B, R = L === A ? B : A;
      var lo = Math.max(L.y, R.y) + half, hi = Math.min(L.y + L.h, R.y + R.h) - half;
      var y = lo <= hi ? (lo + hi) / 2 : (Math.max(L.y, R.y) + Math.min(L.y + L.h, R.y + R.h)) / 2;
      return { x1: L.x + L.w, y1: y, x2: R.x, y2: y, horiz: true, w: 10 * s };
    }
    var T = A.y < B.y ? A : B, Bo = T === A ? B : A;
    var lo2 = Math.max(T.x, Bo.x) + half, hi2 = Math.min(T.x + T.w, Bo.x + Bo.w) - half;
    var x = lo2 <= hi2 ? (lo2 + hi2) / 2 : (Math.max(T.x, Bo.x) + Math.min(T.x + T.w, Bo.x + Bo.w)) / 2;
    return { x1: x, y1: T.y + T.h, x2: x, y2: Bo.y, horiz: false, w: 10 * s };
  }
  function doorSymbol(kind, cg) {
    var mx = (cg.x1 + cg.x2) / 2, my = (cg.y1 + cg.y2) / 2;
    var len = cg.w + 4, dep = 5;
    var w = cg.horiz ? dep : len, h = cg.horiz ? len : dep;
    var x = mx - w / 2, y = my - h / 2;
    if (kind === "door") return "<rect x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" width=\"" + f1(w) + "\" height=\"" + f1(h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"1.4\"/>";
    if (kind === "locked") return "<rect x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" width=\"" + f1(w) + "\" height=\"" + f1(h) + "\" class=\"fg-if\" fill=\"" + INK + "\"/>";
    if (kind === "stuck") return "<rect x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" width=\"" + f1(w) + "\" height=\"" + f1(h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"1.4\"/>" +
      "<path d=\"M" + f1(x) + " " + f1(y) + "L" + f1(x + w) + " " + f1(y + h) + "M" + f1(x + w) + " " + f1(y) + "L" + f1(x) + " " + f1(y + h) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1\"/>";
    if (kind === "secret") return "<rect x=\"" + f1(mx - 7) + "\" y=\"" + f1(my - 8) + "\" width=\"14\" height=\"16\" class=\"fg-pf\" fill=\"" + PAPER + "\"/>" + txt("S", mx, my + 5.5, 15, { anchor: "middle", weight: "bold" });
    return "";
  }
  function waterLines(rng, x, y, w, h, clipId) {
    var d = [];
    for (var yy = y + 6; yy < y + h - 3; yy += 7) {
      var xx = x + 2 + rng.float() * 8;
      while (xx < x + w - 10) {
        var l = 8 + rng.float() * 10;
        d.push("M" + f1(xx) + " " + f1(yy) + "q" + f1(l / 4) + " -2.2 " + f1(l / 2) + " 0t" + f1(l / 2) + " 0");
        xx += l + 4 + rng.float() * 8;
      }
    }
    return "<path d=\"" + d.join("") + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.8\" fill=\"none\"" + (clipId ? " clip-path=\"url(#" + clipId + ")\"" : "") + "/>";
  }
  function stairIcon(x, y, horiz) {
    var d = "<rect x=\"" + f1(x) + "\" y=\"" + f1(y) + "\" width=\"16\" height=\"12\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"1.2\"/>";
    var p = "";
    for (var i = 1; i < 5; i++) p += "M" + f1(x + i * 3.2) + " " + f1(y) + "L" + f1(x + i * 3.2) + " " + f1(y + 12);
    return d + "<path d=\"" + p + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1\"/>";
  }
  function treeIcon(x, y) {
    return "M" + f1(x) + " " + f1(y - 6) + "L" + f1(x - 4) + " " + f1(y + 1) + "L" + f1(x + 4) + " " + f1(y + 1) + "ZM" + f1(x) + " " + f1(y + 1) + "L" + f1(x) + " " + f1(y + 4);
  }

  /* Draw one panel at (ox, oy) with scale s (px per foot). */
  /* The part of a panel worth drawing, in feet. Cropped panels hug their rooms. */
  function panelView(d, panel) {
    if (!panel.crop) return { x0: 0, y0: 0, w: panel.w, h: panel.h };
    var rs = d.rooms.filter(function (r) { return r.panel === panel.id; });
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    rs.forEach(function (r) { x0 = Math.min(x0, r.x); y0 = Math.min(y0, r.y); x1 = Math.max(x1, r.x + r.w); y1 = Math.max(y1, r.y + r.h); });
    x0 = Math.max(0, x0 - 14); y0 = Math.max(0, y0 - 14); x1 = Math.min(panel.w, x1 + 14); y1 = Math.min(panel.h, y1 + 14);
    return { x0: x0, y0: y0, w: x1 - x0, h: y1 - y0 };
  }
  function drawPanel(rng, d, panel, ox, oy, s) {
    var out = [];
    var rooms = d.rooms.filter(function (r) { return r.panel === panel.id; });
    var byKey = {}; d.rooms.forEach(function (r) { byKey[r.key] = r; });
    var view = panelView(d, panel);
    var W = view.w * s, H = view.h * s;
    var bx = ox - view.x0 * s, by = oy - view.y0 * s;
    var clip = "clip-" + panel.id;
    out.push("<defs><clipPath id=\"" + clip + "\"><rect x=\"" + f1(ox) + "\" y=\"" + f1(oy) + "\" width=\"" + f1(W) + "\" height=\"" + f1(H) + "\"/></clipPath></defs>");
    out.push(smallCaps(panel.title, ox, oy - (panel.scaleNote ? 26 : 12), 17, null));
    if (panel.scaleNote) out.push(txt(panel.scaleNote, ox, oy - 10, 10.5, { italic: true }));
    var px = function (r) { return { x: bx + r.x * s, y: by + r.y * s, w: r.w * s, h: r.h * s }; };
    var corridors = [];
    var seenPair = {};
    rooms.forEach(function (r) {
      r.exits.forEach(function (e) {
        var b = byKey[e.to];
        if (!b || b.panel !== panel.id) return;
        var pk = [r.key, b.key].sort().join("|");
        if (seenPair[pk]) return;
        seenPair[pk] = true;
        var back = b.exits.filter(function (x) { return x.to === r.key; })[0];
        corridors.push({ a: r, b: b, kind: e.kind, back: back ? back.kind : e.kind });
      });
    });

    if (panel.kind === "island") {
      /* Water all round, the island as a blob, trees, paths, areas. */
      out.push(waterLines(rng, ox, oy, W, H, clip));
      var minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity, landTop = Infinity;
      rooms.forEach(function (r) {
        var p = px(r);
        if (r.shape === "landing") { landTop = Math.min(landTop, p.y); minx = Math.min(minx, p.x); maxx = Math.max(maxx, p.x + p.w); return; }
        minx = Math.min(minx, p.x); miny = Math.min(miny, p.y); maxx = Math.max(maxx, p.x + p.w); maxy = Math.max(maxy, p.y + p.h);
      });
      var pad = 30;
      var ib = { x: Math.max(ox + 6, minx - pad), y: Math.max(oy + 6, miny - pad), w: 0, h: 0 };
      ib.w = Math.min(ox + W - 6, maxx + pad) - ib.x;
      ib.h = Math.max(maxy + 16, landTop + 8) - ib.y;
      out.push("<path d=\"" + blobPath(rng, ib.x, ib.y, ib.w, ib.h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"2.2\"/>");
      var occ = rooms.map(px);
      var trees = "";
      for (var t = 0; t < 140; t++) {
        var tx = ib.x + 14 + rng.float() * (ib.w - 28), ty = ib.y + 14 + rng.float() * (ib.h - 28);
        var nx = (tx - (ib.x + ib.w / 2)) / (ib.w / 2), ny = (ty - (ib.y + ib.h / 2)) / (ib.h / 2);
        if (nx * nx + ny * ny > 0.62) continue;
        if (insideAny(tx, ty, occ, 12)) continue;
        if (corridors.some(function (c) { var A = px(c.a), B = px(c.b); return distSeg(tx, ty, A.x + A.w / 2, A.y + A.h / 2, B.x + B.w / 2, B.y + B.h / 2) < 9; })) continue;
        trees += treeIcon(tx, ty);
      }
      out.push("<path d=\"" + trees + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1\" fill=\"none\"/>");
      corridors.forEach(function (c) {
        var A = px(c.a), B = px(c.b);
        out.push("<path d=\"M" + f1(A.x + A.w / 2) + " " + f1(A.y + A.h / 2) + "L" + f1(B.x + B.w / 2) + " " + f1(B.y + B.h / 2) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\" fill=\"none\"/>");
      });
      rooms.forEach(function (r) {
        var p = px(r);
        if (r.shape === "tower") {
          var cx = p.x + p.w / 2, cy = p.y + p.h / 2, rr = p.w / 2;
          out.push("<circle cx=\"" + f1(cx) + "\" cy=\"" + f1(cy) + "\" r=\"" + f1(rr) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"4\"/>");
          out.push("<circle cx=\"" + f1(cx) + "\" cy=\"" + f1(cy) + "\" r=\"" + f1(rr - 6) + "\" class=\"fg-is\" fill=\"none\" stroke=\"" + INK + "\" stroke-width=\"1\"/>");
        } else if (r.shape === "building") {
          out.push("<path d=\"" + wobbleRect(rng, p.x, p.y, p.w, p.h, 1.2) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"3.4\"/>");
        } else if (r.shape === "landing") {
          out.push("<rect x=\"" + f1(p.x) + "\" y=\"" + f1(p.y) + "\" width=\"" + f1(p.w) + "\" height=\"" + f1(p.h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"1.8\"/>");
          var pl = ""; for (var k = 6; k < p.w; k += 6) pl += "M" + f1(p.x + k) + " " + f1(p.y) + "L" + f1(p.x + k) + " " + f1(p.y + p.h);
          out.push("<path d=\"" + pl + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.7\"/>");
        } else {
          out.push("<path d=\"" + blobPath(rng, p.x, p.y, p.w, p.h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/>");
        }
      });
    } else if (panel.kind === "ravine") {
      out.push(drawRavineStrip(rng, d, panel, rooms, ox, oy, W, H));
      return out.join("");
    } else {
      /* Built rooms or caves. */
      var cave = panel.kind === "cave";
      var open = rooms.map(px);
      var cgeoms = corridors.map(function (c) { return corridorGeom(c.a, c.b, s, 0, 0); });
      cgeoms.forEach(function (g, i) {
        var cgx = corridorGeom(corridors[i].a, corridors[i].b, s, bx, by);
        cgeoms[i] = cgx;
        var x0 = Math.min(cgx.x1, cgx.x2), y0 = Math.min(cgx.y1, cgx.y2);
        open.push(cgx.horiz ? { x: x0, y: cgx.y1 - cgx.w / 2, w: Math.abs(cgx.x2 - cgx.x1), h: cgx.w } : { x: cgx.x1 - cgx.w / 2, y: y0, w: cgx.w, h: Math.abs(cgx.y2 - cgx.y1) });
      });
      function mouthAt(col) { return rooms.filter(function (r) { return r.c === col && r.r === 0 && r.exits.some(function (x) { return x.dir === "Out"; }); })[0]; }
      (panel.entries || []).forEach(function (en) {
        var top = mouthAt(en.col);
        if (!top) return;
        var tp = px(top);
        open.push({ x: tp.x + tp.w / 2 - 5 * s, y: oy, w: 10 * s, h: tp.y - oy });
      });
      out.push("<g clip-path=\"url(#" + clip + ")\">" + hatch(rng, open, 9 * s, { x: ox, y: oy, w: W, h: H }, cave ? 21 : 24) + "</g>");
      /* Entry passages from the panel's top edge. */
      (panel.entries || []).forEach(function (en) {
        var top = mouthAt(en.col);
        if (!top) return;
        var tp = px(top), cx = tp.x + tp.w / 2;
        out.push("<path d=\"M" + f1(cx) + " " + f1(oy) + "L" + f1(cx) + " " + f1(tp.y + 2) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"" + f1(10 * s + 4) + "\"/>");
        out.push("<path d=\"M" + f1(cx) + " " + f1(oy - 1) + "L" + f1(cx) + " " + f1(tp.y + 4) + "\" class=\"fg-ps\" stroke=\"" + PAPER + "\" stroke-width=\"" + f1(10 * s) + "\"/>");
        out.push("<path d=\"M" + f1(cx - 5) + " " + f1(oy + 9) + "L" + f1(cx) + " " + f1(oy + 15) + "L" + f1(cx + 5) + " " + f1(oy + 9) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.5\" fill=\"none\"/>");
        out.push(txt("from " + en.from, cx + 10 * s / 2 + 4, oy + 12, 10, { italic: true, halo: true }));
      });
      /* Corridor walls (wide ink), then rooms, then corridor floors. */
      var centreLine = function (i) {
        var A = px(corridors[i].a), B = px(corridors[i].b);
        return "M" + f1(A.x + A.w / 2) + " " + f1(A.y + A.h / 2) + "L" + f1(B.x + B.w / 2) + " " + f1(B.y + B.h / 2);
      };
      cgeoms.forEach(function (g, i) {
        var dash = corridors[i].kind === "secret" ? " stroke-dasharray=\"4 3\"" : "";
        var dd = cave ? centreLine(i) : "M" + f1(g.x1) + " " + f1(g.y1) + "L" + f1(g.x2) + " " + f1(g.y2);
        out.push("<path d=\"" + dd + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"" + f1(g.w + 4) + "\"" + (cave ? " stroke-linecap=\"round\"" : "") + dash + "/>");
      });
      rooms.forEach(function (r) {
        var p = px(r);
        if (cave) out.push("<path d=\"" + blobPath(rng, p.x, p.y, p.w, p.h) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"2.4\"/>");
        else out.push("<path d=\"" + wobbleRect(rng, p.x, p.y, p.w, p.h, 0.9) + "\" class=\"fg-pf fg-is\" fill=\"" + PAPER + "\" stroke=\"" + INK + "\" stroke-width=\"2.4\"/>");
      });
      cgeoms.forEach(function (g, i) {
        var ext = 3;
        var x1 = g.horiz ? g.x1 - ext : g.x1, x2 = g.horiz ? g.x2 + ext : g.x2, y1 = g.horiz ? g.y1 : g.y1 - ext, y2 = g.horiz ? g.y2 : g.y2 + ext;
        var dd = cave ? centreLine(i) : "M" + f1(x1) + " " + f1(y1) + "L" + f1(x2) + " " + f1(y2);
        out.push("<path d=\"" + dd + "\" class=\"fg-ps\" stroke=\"" + PAPER + "\" stroke-width=\"" + f1(g.w) + "\"" + (cave ? " stroke-linecap=\"round\"" : "") + "/>");
      });
      /* Floor grid in built rooms. */
      if (!cave) {
        var gp = "";
        rooms.forEach(function (r) {
          var p = px(r);
          for (var gx = 10; gx < r.w; gx += 10) gp += "M" + f1(p.x + gx * s) + " " + f1(p.y + 2) + "L" + f1(p.x + gx * s) + " " + f1(p.y + p.h - 2);
          for (var gy = 10; gy < r.h; gy += 10) gp += "M" + f1(p.x + 2) + " " + f1(p.y + gy * s) + "L" + f1(p.x + p.w - 2) + " " + f1(p.y + gy * s);
        });
        out.push("<path d=\"" + gp + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.45\" opacity=\"0.55\"/>");
      }
      /* Water. */
      rooms.forEach(function (r) {
        if (!r.water) return;
        var p = px(r);
        var cid = "w-" + r.key;
        out.push("<defs><clipPath id=\"" + cid + "\"><path d=\"" + blobPath(makeRng(hashSeed(d.seed, r.key)), p.x + 4, p.y + 4, p.w - 8, p.h - 8) + "\"/></clipPath></defs>");
        out.push(waterLines(rng, p.x, p.y, p.w, p.h, cid));
      });
      cgeoms.forEach(function (g, i) {
        if (corridors[i].kind !== "water") return;
        var x0 = Math.min(g.x1, g.x2), y0 = Math.min(g.y1, g.y2);
        var wl = "";
        if (g.horiz) { for (var xx = x0 + 3; xx < Math.max(g.x1, g.x2) - 8; xx += 9) wl += "M" + f1(xx) + " " + f1(g.y1) + "q2.2 -2.2 4.4 0t4.4 0"; }
        else { for (var yy = y0 + 4; yy < Math.max(g.y1, g.y2) - 2; yy += 6) wl += "M" + f1(g.x1 - 4.4) + " " + f1(yy) + "q2.2 -2.2 4.4 0t4.4 0"; }
        out.push("<path d=\"" + wl + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.9\" fill=\"none\"/>");
      });
      cgeoms.forEach(function (g, i) {
        var c = corridors[i];
        var k = c.kind === "secret" || c.back === "secret" ? "secret" : c.kind;
        out.push(doorSymbol(k, g));
      });
    }
    /* Stairs and keys. */
    rooms.forEach(function (r) {
      var p = px(r);
      r.stairs.forEach(function (st, i) {
        var sx = p.x + p.w - 22, sy = p.y + p.h - 18 - i * 16;
        out.push(stairIcon(sx, sy));
        out.push(txt((st.dir === "Down" ? "down to " : "up to ") + st.to, sx + 8, sy + 24, 10, { anchor: "middle", italic: true, halo: true }));
      });
      var kcx = p.x + p.w / 2, kcy = p.y + p.h / 2;
      if (r.stairs.length) { kcx = p.x + Math.max(15, p.w * 0.36); kcy = p.y + Math.max(15, p.h * 0.38); }
      out.push(keyCircle(r.key, kcx, kcy));
    });
    return out.join("");
  }
  function distSeg(px, py, x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1, l2 = dx * dx + dy * dy;
    var t = l2 ? Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / l2)) : 0;
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }
  function drawRavineStrip(rng, d, panel, nodes, ox, oy, W, H) {
    var out = [];
    var cx = ox + W / 2;
    /* Walls: two wavering lines; outside is hatched hillside. */
    var left = [], right = [];
    for (var y = oy; y <= oy + H; y += 14) {
      var t = (y - oy) / H;
      var half = 34 + 16 * Math.sin(t * 9 + 1) + rng.float() * 6 + (1 - t) * 10;
      var mid = cx + 10 * Math.sin(t * 5);
      left.push([mid - half, y]); right.push([mid + half, y]);
    }
    var floor = "M" + left.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join("L") + "L" + right.slice().reverse().map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join("L") + "Z";
    /* Hillside hatching: rows of short ^ strokes outside the floor. */
    var hp = "";
    for (var yy = oy + 6; yy < oy + H - 4; yy += 11) {
      for (var xx = ox + 4 + rng.float() * 6; xx < ox + W - 6; xx += 12 + rng.float() * 5) {
        var idx = Math.min(left.length - 1, Math.round((yy - oy) / 14));
        if (xx > left[idx][0] - 6 && xx < right[idx][0] + 6) continue;
        hp += "M" + f1(xx - 3.5) + " " + f1(yy + 2.5) + "L" + f1(xx) + " " + f1(yy - 2.5) + "L" + f1(xx + 3.5) + " " + f1(yy + 2.5);
      }
    }
    out.push("<path d=\"" + hp + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"0.9\" fill=\"none\"/>");
    out.push("<path d=\"" + floor + "\" class=\"fg-pf\" fill=\"" + PAPER + "\"/>");
    out.push("<path d=\"M" + left.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join("L") + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"2.4\" fill=\"none\"/>");
    out.push("<path d=\"M" + right.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join("L") + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"2.4\" fill=\"none\"/>");
    /* Place nodes on the floor. */
    var ky = H / panel.dataH;
    var pos = nodes.map(function (n, i) {
      var y = oy + (n.y + n.h / 2) * ky;
      var idx = Math.max(0, Math.min(left.length - 1, Math.round((y - oy) / 14)));
      var mid = (left[idx][0] + right[idx][0]) / 2 + (n.x + n.w / 2 - 80) * 0.6;
      return { x: mid, y: y, idx: idx };
    });
    out.push("<path d=\"M" + pos.map(function (p) { return f1(p.x) + " " + f1(p.y); }).join("L") + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\" fill=\"none\"/>");
    /* Mouths. */
    d.lairs.forEach(function (l) {
      var ni = nodes.map(function (n) { return n.key; }).indexOf(l.node);
      if (ni < 0) return;
      var p = pos[ni];
      if (l.slot === "temple") {
        var ty = oy + 4;
        out.push("<rect x=\"" + f1(p.x - 26) + "\" y=\"" + f1(ty) + "\" width=\"52\" height=\"18\" class=\"fg-if\" fill=\"" + INK + "\"/>");
        out.push(txt(l.letter, p.x, ty + 13.5, 12, { anchor: "middle", weight: "bold", paper: true }));
        out.push("<path d=\"M" + f1(p.x) + " " + f1(ty + 18) + "L" + f1(p.x) + " " + f1(p.y - 10) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.4\" stroke-dasharray=\"5 4\"/>");
        return;
      }
      var west = l.side === "West";
      var wx = west ? left[p.idx][0] : right[p.idx][0];
      var dy = 0;
      if (l.slot === "factions") dy = 0;
      var mx = wx + (west ? -2 : 2), my = p.y + dy;
      out.push("<path d=\"M" + f1(mx) + " " + f1(my - 9) + "A9 9 0 0 " + (west ? "0" : "1") + " " + f1(mx) + " " + f1(my + 9) + "Z\" class=\"fg-if\" fill=\"" + INK + "\"/>");
      out.push("<path d=\"M" + f1(p.x) + " " + f1(p.y) + "L" + f1(mx) + " " + f1(my) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1\" stroke-dasharray=\"2 3\"/>");
      var lx = west ? mx - 26 : mx + 26;
      out.push("<circle cx=\"" + f1(lx) + "\" cy=\"" + f1(my) + "\" r=\"12\" class=\"fg-pf\" fill=\"" + PAPER + "\"/>");
      out.push(keyCircle(l.letter, lx, my, 10));
    });
    nodes.forEach(function (n, i) { out.push(keyCircle(n.key, pos[i].x, pos[i].y, 9)); });
    return out.join("");
  }

  function legendItems() {
    return [["door", "Door"], ["stuck", "Stuck door"], ["locked", "Locked door"], ["secret", "Secret door (one side only)"], ["stair", "Stair to another level"], ["water", "Water: wade or swim"], ["key", "Keyed area"]];
  }
  function drawLegend(x, y) {
    var out = [];
    legendItems().forEach(function (it, i) {
      var yy = y + i * 20;
      var g = { x1: x, y1: yy, x2: x + 22, y2: yy, horiz: true, w: 10 };
      if (it[0] === "stair") out.push(stairIcon(x + 3, yy - 6));
      else if (it[0] === "water") out.push("<path d=\"M" + (x) + " " + yy + "q2.75 -2.5 5.5 0t5.5 0t5.5 0t5.5 0\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1\" fill=\"none\"/>");
      else if (it[0] === "key") out.push(keyCircle("1", x + 11, yy, 8));
      else {
        out.push("<path d=\"M" + x + " " + (yy - 6) + "L" + (x + 22) + " " + (yy - 6) + "M" + x + " " + (yy + 6) + "L" + (x + 22) + " " + (yy + 6) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.4\"/>");
        out.push(doorSymbol(it[0], g));
      }
      out.push(txt(it[1], x + 32, yy + 4, 12));
    });
    return out.join("");
  }
  function wrapText(s, maxChars) {
    var words = s.split(" "), lines = [], cur = "";
    words.forEach(function (w) { if ((cur + " " + w).trim().length > maxChars) { lines.push(cur.trim()); cur = w; } else cur += " " + w; });
    if (cur.trim()) lines.push(cur.trim());
    return lines;
  }

  function toSVG(d) {
    var rng = makeRng(hashSeed(d.seed, "map:" + d.template));
    var M = 44, HEAD = 104, body = [];
    var Wsheet, Hsheet;
    var keyLines = [];
    if (d.template === "tower") {
      d.rooms.forEach(function (r) {
        var tag = r.slot ? TEMPLATES.tower.lessons.filter(function (l) { return l.slot === r.slot; })[0].label.split(":")[0].split(";")[0] : (r.encounter ? encounterLabel(r.encounter) : (r.trap ? "Trap" : ""));
        keyLines.push({ key: r.key, name: r.name, note: tag });
      });
    } else {
      d.lairs.forEach(function (l) {
        var f = d.factions.filter(function (x) { return x.lair === l.letter; })[0];
        var lab = TEMPLATES.ravine.lessons.filter(function (x) { return x.slot === l.slot; }).map(function (x) { return x.label.split(":")[0]; })[0] || "Supply";
        keyLines.push({ key: l.letter, name: l.name, note: (f ? cap(f.clan) + " (" + f.plural + "). " : "") + lab + "." });
      });
    }
    if (d.template === "tower") {
      var s = 2.2;
      var P = {}; d.panels.forEach(function (p) { P[p.id] = p; });
      var colW = 4 * 80 * s; /* 704 */
      Wsheet = M * 2 + colW * 2 + 56;
      var row1 = HEAD + 26;
      var surfW = P.surface.w * s, surfH = P.surface.h * s;
      body.push(drawPanel(rng, d, P.surface, M + (colW - surfW) / 2, row1, s));
      /* Compass */
      body.push("<path d=\"M" + (M + 8) + " " + (row1 + 60) + "L" + (M + 8) + " " + (row1 + 14) + "M" + (M + 2) + " " + (row1 + 24) + "L" + (M + 8) + " " + (row1 + 14) + "L" + (M + 14) + " " + (row1 + 24) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"1.6\" fill=\"none\"/>" + txt("N", M + 8, row1 + 8, 14, { anchor: "middle", weight: "bold" }));
      body.push(drawLegend(M + 24, row1 + surfH + 34));
      /* Key column */
      var kx = M + colW + 56, ky = row1 - 12;
      body.push(smallCaps("Key", kx, ky + 6, 24));
      body.push("<path d=\"M" + kx + " " + (ky + 16) + "L" + (kx + colW) + " " + (ky + 16) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"2\"/>");
      body.push(txt("Black circles: keyed areas. S: secret door. The lesson each area teaches is named after its key.", kx, ky + 36, 11.5, { italic: true }));
      var lineY = ky + 62;
      keyLines.forEach(function (k) {
        body.push(keyCircle(k.key, kx + 13, lineY - 4, 10));
        body.push("<text x=\"" + (kx + 34) + "\" y=\"" + f1(lineY) + "\" font-family=\"" + FONT + "\" font-size=\"13\" class=\"fg-if\" fill=\"" + INK + "\"><tspan font-weight=\"bold\">" + esc(k.name + ".") + "</tspan> " + esc(k.note ? k.note + "." : "") + "</text>");
        lineY += 23.5;
      });
      var row2 = Math.max(row1 + surfH + 34 + 7 * 20 + 30, lineY + 20);
      var vC = panelView(d, P.cellars), vW = panelView(d, P.cave);
      body.push(drawPanel(rng, d, P.cellars, M + (colW - vC.w * s) / 2, row2 + 20, s));
      body.push(drawPanel(rng, d, P.cave, M + colW + 56 + (colW - vW.w * s) / 2, row2 + 20, s));
      Hsheet = row2 + 20 + Math.max(vC.h, vW.h) * s + 60;
    } else {
      var s2 = 1.5;
      var strip = d.panels[0];
      var stripW = 190;
      var colW2 = 330, gap = 30;
      var areaX = M + stripW + 44;
      var maxW = 3 * colW2 + 2 * gap;
      Wsheet = areaX + maxW + M;
      var items = d.panels.slice(1).map(function (p) { return { panel: p, w: p.w * s2, h: p.h * s2 + 40 }; });
      items.push({ key: true, w: colW2 * 2 + gap, h: 60 + keyLines.length * 23 });
      items.push({ legend: true, w: colW2, h: 7 * 20 + 20 });
      var x = areaX, y = HEAD + 30, rowH = 0;
      items.forEach(function (it) { it.span = Math.ceil((it.w + 1) / (colW2 + gap)); it.wcol = it.span * colW2 + (it.span - 1) * gap; });
      var placed = [], left = items.slice();
      while (left.length) {
        var room = maxW, row = [];
        for (var li = 0; li < left.length; li++) { if (left[li].wcol <= room + 1) { row.push(left[li]); room -= left[li].wcol + gap; } }
        if (!row.length) row.push(left[0]);
        row.forEach(function (it) { left.splice(left.indexOf(it), 1); });
        placed.push(row);
      }
      var flat = [];
      placed.forEach(function (row, ri) { row.forEach(function (it, ci) { it.newRow = ci === 0 && ri > 0; flat.push(it); }); });
      flat.forEach(function (it) {
        var wcol = it.wcol;
        if (it.newRow) { x = areaX; y += rowH + 26; rowH = 0; }
        if (it.panel) body.push(drawPanel(rng, d, it.panel, x + (wcol - it.w) / 2, y + 30, s2));
        else if (it.key) {
          body.push(smallCaps("Key", x, y + 22, 24));
          body.push("<path d=\"M" + x + " " + (y + 32) + "L" + (x + wcol) + " " + (y + 32) + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"2\"/>");
          var ly = y + 58;
          keyLines.forEach(function (k) {
            body.push(keyCircle(k.key, x + 12, ly - 4, 10));
            body.push("<text x=\"" + (x + 32) + "\" y=\"" + f1(ly) + "\" font-family=\"" + FONT + "\" font-size=\"13\" class=\"fg-if\" fill=\"" + INK + "\"><tspan font-weight=\"bold\">" + esc(k.name + ".") + "</tspan> " + esc(k.note) + "</text>");
            ly += 23;
          });
        } else if (it.legend) body.push(drawLegend(x + 4, y + 20));
        x += wcol + gap; rowH = Math.max(rowH, it.h + 30);
      });
      var totalH = y + rowH;
      var stripDraw = { id: strip.id, title: strip.title, kind: strip.kind, scaleNote: strip.scaleNote, w: stripW, h: totalH - HEAD - 60, dataH: strip.h };
      body.unshift(drawPanel(rng, d, stripDraw, M, HEAD + 60, 1));
      Hsheet = totalH + 40;
    }
    var head = [];
    head.push("<rect x=\"0\" y=\"0\" width=\"" + Wsheet + "\" height=\"" + Hsheet + "\" class=\"fg-pf\" fill=\"" + PAPER + "\"/>");
    head.push(smallCaps(d.title, M, 70, 40));
    head.push(txt(d.subtitle, M, 94, 14, { italic: true }));
    var right = Wsheet - M;
    head.push(smallCaps("DM Copy · " + (d.template === "tower" ? "1 square = 10 feet" : "lairs: 1 square = 10 feet"), right, 70, 13, "end", " letter-spacing=\"1.5\""));
    head.push("<path d=\"M" + M + " " + 104 + "L" + right + " " + 104 + "\" class=\"fg-is\" stroke=\"" + INK + "\" stroke-width=\"2.6\"/>");
    var foot = txt("Seed " + d.seed + " · party level " + d.partyLevel + " · made with the Forge. The lesson ladder is fixed; the content is rolled. Art rule: Otus ink.", M, Hsheet - 18, 11, { italic: true });
    return "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 " + Math.round(Wsheet) + " " + Math.round(Hsheet) + "\" width=\"" + Math.round(Wsheet) + "\" height=\"" + Math.round(Hsheet) + "\" role=\"img\" aria-label=\"" + esc(d.title + ", DM map") + "\">" +
      "<title>" + esc(d.title) + "</title>" + head.join("") + body.join("") + foot + "</svg>";
  }

  /* ================================================================ */
  var GENERATORS = { tower: genTower, ravine: genRavine };
  function generate(opts) {
    opts = opts || {};
    var template = GENERATORS[opts.template] ? opts.template : "tower";
    var seed = Math.floor(Math.abs(Number(opts.seed))) % 4294967296;
    if (!isFinite(seed)) seed = 1;
    var L = Math.max(1, Math.min(3, Math.floor(Number(opts.partyLevel) || 1)));
    return GENERATORS[template](seed, L);
  }

  return {
    version: "1.0",
    templates: TEMPLATES,
    generate: generate,
    toMarkdown: toMarkdown,
    toSVG: toSVG,
    rng: makeRng,
    hashSeed: hashSeed
  };
})();

if (typeof module !== "undefined" && module.exports) { module.exports = Forge; }
