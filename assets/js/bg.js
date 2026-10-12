/* Pixel-world background: a night-time 2D sandbox scene (sky, distant
   mountains, grassy hills with trees, then dirt, stone, caves and ore).
   Original procedural art, drawn once per screen size into small canvases,
   upscaled with crisp pixels and softened with a CSS blur.
   Scrolling the page slowly "digs" from the surface toward the deep layers.
   prefers-reduced-motion: the scene stays still.                         */
(function () {
  "use strict";
  if (!document.createElement("canvas").getContext) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const SEED = 20270117;          // fixed seed: the same world on every visit
  const WORLD_SCREENS = 2.6;      // world height in viewport heights
  const SURFACE_AT = 0.6;         // surface line, as a share of the first screen

  /* Night palette: deliberately darker than the page surface so text keeps
     its contrast; colour shows through hue, not brightness. */
  const C = {
    skyTop: [9, 11, 20], skyBot: [24, 29, 46],
    star: [64, 72, 96], starHi: [92, 100, 126],
    moon: [86, 90, 104], moonShade: [70, 74, 88],
    farA: [20, 25, 40], farB: [23, 29, 45],
    grass: [33, 66, 41], grassHi: [40, 78, 48],
    leaf: [22, 50, 31], leafHi: [28, 60, 37], trunk: [36, 27, 20],
    flower: [74, 60, 30],
    dirt: [40, 29, 22], dirtB: [46, 33, 25], clay: [52, 33, 26],
    stone: [33, 35, 44], stoneB: [38, 40, 50],
    deep: [27, 29, 42], deepB: [31, 33, 48],
    cave: [17, 18, 26], caveEdge: [23, 24, 33],
    gold: [70, 60, 32], copper: [60, 40, 30], crystal: [46, 40, 72],
    torch: [120, 82, 34], ash: [36, 20, 18], ember: [96, 40, 22]
  };

  /* ---- deterministic noise ---- */
  function rng(seed) {
    let s = seed >>> 0;
    return function () { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function hash(x, y) { let h = (x * 374761393 + y * 668265263 + SEED) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  const fade = (t) => t * t * (3 - 2 * t);
  function noise2(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = fade(x - xi), yf = fade(y - yi);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  }
  const fbm = (x, y) => noise2(x, y) * 0.6 + noise2(x * 2.1, y * 2.1) * 0.3 + noise2(x * 4.3, y * 4.3) * 0.1;
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

  /* ---- DOM ---- */
  const root = document.createElement("div");
  root.className = "world-bg";
  root.setAttribute("aria-hidden", "true");
  const sky = document.createElement("canvas"), far = document.createElement("canvas"), land = document.createElement("canvas");
  sky.className = "world-bg__layer world-bg__sky";
  far.className = "world-bg__layer world-bg__far";
  land.className = "world-bg__layer world-bg__land";
  root.append(sky, far, land);
  document.body.prepend(root);

  let vw = 0, vh = 0, block = 6, worldH = 0, farH = 0;

  function paint(canvas, cols, rows, fn) {
    canvas.width = cols; canvas.height = rows;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(cols, rows), px = img.data;
    const put = (x, y, col, a) => { if (x < 0 || y < 0 || x >= cols || y >= rows) return; const i = (y * cols + x) * 4; px[i] = col[0]; px[i + 1] = col[1]; px[i + 2] = col[2]; px[i + 3] = a === undefined ? 255 : a; };
    fn(put, cols, rows);
    ctx.putImageData(img, 0, 0);
  }

  function build() {
    vw = window.innerWidth; vh = window.innerHeight;
    block = vw < 760 ? 5 : 7;
    const cols = Math.ceil(vw / block) + 1;
    const skyRows = Math.ceil(vh / block) + 1;
    worldH = Math.round(vh * WORLD_SCREENS);
    const rows = Math.ceil(worldH / block);
    farH = vh;
    const r = rng(SEED);

    /* sky: gradient, stars, moon */
    paint(sky, cols, skyRows, (put) => {
      for (let y = 0; y < skyRows; y++) { const col = mix(C.skyTop, C.skyBot, y / skyRows); for (let x = 0; x < cols; x++) put(x, y, col); }
      const n = Math.round(cols * skyRows * 0.006);
      for (let i = 0; i < n; i++) { const x = Math.floor(r() * cols), y = Math.floor(r() * skyRows * 0.7); put(x, y, r() < 0.2 ? C.starHi : C.star); }
      const mx = Math.round(cols * 0.8), my = Math.round(skyRows * 0.14), mr = Math.max(4, Math.round(cols * 0.022));
      for (let y = -mr; y <= mr; y++) for (let x = -mr; x <= mr; x++) if (x * x + y * y <= mr * mr) put(mx + x, my + y, (x + mr * 0.35) * (x + mr * 0.35) + (y - mr * 0.2) * (y - mr * 0.2) < mr * mr * 0.25 ? C.moonShade : C.moon);
    });

    /* distant mountains: two silhouettes */
    const farRows = Math.ceil(farH / block);
    paint(far, cols, farRows, (put) => {
      const base = Math.round(farRows * (SURFACE_AT + 0.02));
      [[C.farA, 0.30, 0.018, 3], [C.farB, 0.20, 0.035, 11]].forEach(([col, amp, freq, off]) => {
        for (let x = 0; x < cols; x++) {
          const h = Math.round(base - farRows * amp * (0.35 + 0.65 * fbm(x * freq + off, off)));
          for (let y = Math.max(0, h); y < farRows; y++) put(x, y, col);
        }
      });
    });

    /* land: surface, trees, dirt, stone, caves, ores, deep layer, embers */
    paint(land, cols, rows, (put) => {
      const s0 = Math.round((vh * SURFACE_AT) / block);
      const surf = [], dirtTo = [];
      for (let x = 0; x < cols; x++) {
        surf[x] = Math.round(s0 + 7 * (fbm(x * 0.035, 1.7) - 0.5) * 2 + 2 * Math.sin(x * 0.11));
        dirtTo[x] = surf[x] + 7 + Math.round(5 * fbm(x * 0.08, 5.3));
      }
      const deepAt = s0 + Math.round((rows - s0) * 0.55);
      const ashAt = rows - Math.round(rows * 0.07);

      for (let x = 0; x < cols; x++) {
        for (let y = surf[x]; y < rows; y++) {
          const d = y - surf[x];
          let col;
          if (d === 0) col = hash(x, y) < 0.3 ? C.grassHi : C.grass;
          else if (y < dirtTo[x]) col = hash(x, y) < 0.18 ? C.dirtB : (hash(x + 9, y) < 0.05 ? C.clay : C.dirt);
          else if (y < deepAt + Math.round(4 * Math.sin(x * 0.07))) col = hash(x, y) < 0.2 ? C.stoneB : C.stone;
          else if (y < ashAt + Math.round(3 * Math.sin(x * 0.09))) col = hash(x, y) < 0.2 ? C.deepB : C.deep;
          else col = hash(x, y) < 0.12 ? C.ember : C.ash;

          if (y > dirtTo[x] + 2 && y < ashAt - 2) {
            const cv = fbm(x * 0.07, y * 0.11);
            if (cv > 0.66) col = C.cave;
            else if (cv > 0.63) col = C.caveEdge;
            else {
              const o = noise2(x * 0.45, y * 0.45);
              if (o > 0.9 && hash(x * 7, y) < 0.7) col = y > deepAt ? C.crystal : (hash(x, y * 3) < 0.5 ? C.gold : C.copper);
            }
          }
          put(x, y, col);
        }
      }

      /* torches glowing inside a few caves */
      for (let i = 0; i < Math.round(cols / 18); i++) {
        const x = Math.floor(r() * cols), y = s0 + 14 + Math.floor(r() * (ashAt - s0 - 20));
        if (fbm(x * 0.07, y * 0.11) > 0.67) { put(x, y, C.torch); put(x, y - 1, C.torch); put(x + 1, y, C.ember); }
      }

      /* trees, bushes and flowers on the surface */
      let x = 2 + Math.floor(r() * 4);
      while (x < cols - 2) {
        const top = surf[x] - 1;
        const kind = r();
        if (kind < 0.55) {
          const h = 5 + Math.floor(r() * 6), rad = 2 + Math.floor(r() * 2);
          for (let y = 0; y < h; y++) put(x, top - y, C.trunk);
          const cy = top - h - rad + 1;
          for (let yy = -rad; yy <= rad; yy++) for (let xx = -rad - 1; xx <= rad + 1; xx++)
            if (xx * xx * 0.8 + yy * yy <= rad * rad + 1) put(x + xx, cy + yy, hash(x + xx, cy + yy) < 0.25 ? C.leafHi : C.leaf);
          x += 6 + Math.floor(r() * 9);
        } else if (kind < 0.8) {
          put(x, top, C.leaf); put(x + 1, top, C.leafHi); put(x - 1, top, C.leaf); put(x, top - 1, C.leaf);
          x += 3 + Math.floor(r() * 5);
        } else {
          put(x, top, C.grassHi); put(x, top - 1, C.flower);
          x += 2 + Math.floor(r() * 4);
        }
      }
    });

    sky.style.height = skyRows * block + "px";
    far.style.height = farRows * block + "px";
    land.style.height = rows * block + "px";
    [sky, far, land].forEach((c) => { c.style.width = cols * block + "px"; });
    place();
  }

  /* ---- parallax ---- */
  let ticking = false;
  function place() {
    ticking = false;
    if (reduce.matches) { far.style.transform = land.style.transform = "translate3d(0,0,0)"; return; }
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    land.style.transform = `translate3d(0, ${-p * (worldH - vh)}px, 0)`;
    far.style.transform = `translate3d(0, ${-p * farH * 0.45}px, 0)`;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(place); } }, { passive: true });

  let lastW = 0, lastH = 0, t = null;
  function maybeRebuild() {
    // Mobile URL bars change the height constantly: only rebuild on real resizes.
    if (Math.abs(window.innerWidth - lastW) > 40 || Math.abs(window.innerHeight - lastH) > 160) {
      lastW = window.innerWidth; lastH = window.innerHeight; build();
    } else place();
  }
  window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(maybeRebuild, 180); });
  if (reduce.addEventListener) reduce.addEventListener("change", place);
  lastW = window.innerWidth; lastH = window.innerHeight;
  build();
  // Page height changes once the content renders; re-place after layout settles.
  window.addEventListener("load", place);
})();
