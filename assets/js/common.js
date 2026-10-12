/* Shared helpers: icons, the evidence → skill model, header and footer.
   Content lives in data.js — you rarely need to edit this file. */
(function () {
  "use strict";
  const P = window.PORTFOLIO;

  /* --------------------------------------------------------------- icons
     24 × 24 stroke icons. To add one, give it a name and an SVG path. */
  const ICONS = {
    code: "M8 6 L3 12 L8 18 M16 6 L21 12 L16 18 M13.5 4 L10.5 20",
    table: "M3 4 H21 V20 H3 Z M3 9 H21 M9 9 V20 M15 9 V20 M3 14.5 H21",
    db: "M4 6 C4 4.3 7.6 3 12 3 C16.4 3 20 4.3 20 6 C20 7.7 16.4 9 12 9 C7.6 9 4 7.7 4 6 Z M4 6 V18 C4 19.7 7.6 21 12 21 C16.4 21 20 19.7 20 18 V6 M4 12 C4 13.7 7.6 15 12 15 C16.4 15 20 13.7 20 12",
    network: "M5 12 L12 5 L19 12 L12 19 Z M5 12 H19 M12 5 V19",
    fit: "M3 21 L21 3 M5 15 h1 M9 13 h1 M11 8 h1 M15 10 h1 M17 5 h1 M7 19 h1",
    package: "M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z M4 7.5 L12 12 L20 7.5 M12 12 V21",
    dist: "M3 20 H21 M4 19 C7.5 19 8 5 12 5 C16 5 16.5 19 20 19",
    classes: "M4 4 H10 V10 H4 Z M14 14 H20 V20 H14 Z M17 7 h0.5 M7 17 h0.5 M3 21 L21 3",
    gauge: "M4 18 A8 8 0 1 1 20 18 M12 18 L16 10 M3 18 H21",
    eye: "M2 12 C5 7 8.5 5 12 5 C15.5 5 19 7 22 12 C19 17 15.5 19 12 19 C8.5 19 5 17 2 12 Z M12 9 A3 3 0 1 1 11.99 9 Z",
    bars_h: "M4 3 V21 M4 6 H18 M4 11 H12 M4 16 H15",
    magnify: "M10 4 A6 6 0 1 1 9.99 4 Z M14.5 14.5 L20 20",
    target: "M12 3 A9 9 0 1 1 11.99 3 Z M12 8 A4 4 0 1 1 11.99 8 Z M12 11.5 V12.5",
    bars_v: "M6 20 V12 M12 20 V5 M18 20 V14 M3 20 H21",
    dashboard: "M3 4 H10 V11 H3 Z M14 4 H21 V8 H14 Z M14 11 H21 V20 H14 Z M3 14 H10 V20 H3 Z",
    pie: "M12 3 A9 9 0 1 1 11.99 3 Z M12 12 V3 M12 12 L19.8 16.5",
    report: "M4 4 H20 V20 H4 Z M8 16 V12 M12 16 V8 M16 16 V11",
    tag: "M3 12 L12 3 H21 V12 L12 21 Z M16.5 7.5 h0.5",
    cashflow: "M4 8 H18 M15 5 L18 8 L15 11 M20 16 H6 M9 13 L6 16 L9 19",
    branch: "M3 12 H9 M9 12 L15 6 H21 M9 12 H21 M9 12 L15 18 H21",
    cycle: "M19 12 A7 7 0 1 1 16.9 7 M19 3.5 V7.5 H15",
    trend: "M3 3 V21 H21 M6 16 L10 11 L13 13 L17 8 M17 8 L20 5",
    doc: "M6 3 H15 L19 7 V21 H6 Z M15 3 V7 H19 M9 11 H16 M9 14.5 H16 M9 18 H13",
    sheet: "M3 4 H21 V20 H3 Z M3 8.5 H21 M8 8.5 V20 M3 14 H21 M5 6.2 H7",
    coins: "M4 7 C4 5.3 6.7 4 10 4 C13.3 4 16 5.3 16 7 C16 8.7 13.3 10 10 10 C6.7 10 4 8.7 4 7 Z M4 7 V11 C4 12.7 6.7 14 10 14 M4 11 V15 C4 16.7 6.7 18 10 18 M14 13 C14 11.9 16 11 18 11 C20 11 21 11.9 21 13 V19 C21 20.1 19.4 21 17.5 21 C15.6 21 14 20.1 14 19 Z M14 16 C14 17.1 15.6 18 17.5 18 C19.4 18 21 17.1 21 16",
    layers: "M12 3 L21 8 L12 13 L3 8 Z M3 12.5 L12 17.5 L21 12.5 M3 17 L12 22 L21 17",
    shield: "M12 3 L20 6 V12 C20 16.5 16.6 19.8 12 21 C7.4 19.8 4 16.5 4 12 V6 Z M8.5 12 L11 14.5 L15.5 10",
    rlang: "M3 12 C3 7.6 7 4 12 4 C17 4 21 7.6 21 12 C21 16.4 17 20 12 20 C7 20 3 16.4 3 12 Z M9 17 V8 H13.5 C15.4 8 16.5 9.1 16.5 10.7 C16.5 12.3 15.4 13.4 13.5 13.4 H9 M13 13.4 L16.5 17",
    lock: "M7 11 V8 C7 5.2 9.2 3 12 3 C14.8 3 17 5.2 17 8 V11 M5 11 H19 V21 H5 Z M12 15 V17",
    star: "M12 3 L14.6 8.6 L20.6 9.3 L16.1 13.4 L17.3 19.4 L12 16.4 L6.7 19.4 L7.9 13.4 L3.4 9.3 L9.4 8.6 Z",
    candle: "M7 3 V7 M7 15 V21 M5 7 H9 V15 H5 Z M17 3 V9 M17 14 V21 M15 9 H19 V14 H15 Z",
    hierarchy: "M9 3 H15 V8 H9 Z M12 8 V12 M5 12 H19 M5 12 V16 M19 12 V16 M2 16 H8 V21 H2 Z M16 16 H22 V21 H16 Z",
    bubbles: "M3 4 H15 V12 H8 L4 15 V12 H3 Z M17 8 H21 V16 H20 V19 L16 16 H10 V14",
    check: "M4 6 L5.5 7.5 L8 5 M11 6.5 H20 M4 12 L5.5 13.5 L8 11 M11 12.5 H20 M4 18 L5.5 19.5 L8 17 M11 18.5 H20",
    present: "M3 4 H21 V15 H3 Z M12 15 V19 M8 21 L12 19 L16 21 M7 11 L10 8 L13 10 L17 7",
    cat_analytics: "M3 3 V21 H21 M7 14 V17 M11 10 V17 M15 12 V17 M19 7 V17",
    cat_data: "M8 4 C5 4 6 10 3 12 C6 14 5 20 8 20 M16 4 C19 4 18 10 21 12 C18 14 19 20 16 20",
    cat_finance: "M12 2.5 V21.5 M16 7 C16 5.3 14.5 4.5 12 4.5 C9.5 4.5 8 5.8 8 7.5 C8 11 16 9.5 16 13.5 C16 15.6 14.5 16.8 12 16.8 C9.5 16.8 8 15.6 8 14",
    cat_business: "M3 8 H21 V20 H3 Z M8 8 V5 H16 V8 M3 13 H21",
    trophy: "M7 4 H17 V9 C17 11.8 14.8 14 12 14 C9.2 14 7 11.8 7 9 Z M7 6 H4 V7 C4 8.7 5.3 10 7 10 M17 6 H20 V7 C20 8.7 18.7 10 17 10 M12 14 V18 M8 21 H16 M9.5 18 H14.5",
    star: "M12 3 L14.6 8.9 L21 9.6 L16.2 13.9 L17.6 20.3 L12 17 L6.4 20.3 L7.8 13.9 L3 9.6 L9.4 8.9 Z",
    flag: "M5 21 V3 M5 4 H17 L14 8 L17 12 H5",
    cap: "M2 9 L12 4 L22 9 L12 14 Z M6 11 V16 C6 17.5 9 19 12 19 C15 19 18 17.5 18 16 V11 M21 9.5 V15",
    menu: "M4 7 H20 M4 12 H20 M4 17 H20",
    close: "M6 6 L18 18 M18 6 L6 18",
    chev_r: "M9 5 L16 12 L9 19",
    chev_d: "M5 9 L12 16 L19 9",
    arrow_r: "M4 12 H19 M13 6 L19 12 L13 18",
    arrow_l: "M20 12 H5 M11 6 L5 12 L11 18",
    ext: "M14 4 H20 V10 M20 4 L11 13 M18 14 V20 H4 V6 H10",
    search: "M10 4 A6 6 0 1 1 9.99 4 Z M14.5 14.5 L20 20",
    mail: "M3 5 H21 V19 H3 Z M3 6 L12 13 L21 6",
    letter: "M6 3 H15 L19 7 V21 H6 Z M15 3 V7 H19 M9 12 H16 M9 16 H14"
  };

  function icon(name, size, cls) {
    const d = ICONS[name] || ICONS.doc;
    const s = size || 24;
    return `<svg class="icon ${cls || ""}" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* --------------------------------------------------------------- model */
  const WORK = ["project", "role", "competition"];
  const TYPE_LABEL = { project: "Project", role: "Role", competition: "Competition", award: "Award", certification: "Certification", course: "Course" };

  const evById = {};
  P.evidence.forEach((e) => { evById[e.id] = e; });

  const skills = {};
  const cats = {};
  P.tree.forEach((cat) => {
    cats[cat.id] = cat;
    cat.capabilities.forEach((cap) => {
      skills[cap.id] = Object.assign({}, cap, { level: 2, catId: cat.id, parentId: null, children: (cap.skills || []).map((s) => s.id), ev: [] });
      (cap.skills || []).forEach((s) => {
        skills[s.id] = Object.assign({}, s, { level: 3, catId: cat.id, parentId: cap.id, children: [], ev: [] });
      });
    });
  });
  P.evidence.forEach((e) => {
    (e.skills || []).forEach((id) => {
      if (skills[id]) skills[id].ev.push(e.id);
      else console.warn(`[portfolio] Evidence "${e.id}" lists unknown skill id "${id}". Check data.js.`);
    });
  });

  function workCount(skill) { return skill.ev.filter((id) => WORK.includes(evById[id].type)).length; }
  function status(skill) {
    const w = workCount(skill);
    if (skill.proven && w >= 2) return "Proven";
    if (w >= 1) return "Applied";
    return "Learning";
  }
  Object.values(skills).forEach((s) => { s.status = status(s); });

  function catStats(catId) {
    const list = Object.values(skills).filter((s) => s.catId === catId);
    return {
      total: list.length,
      proven: list.filter((s) => s.status === "Proven").length,
      unlocked: list.filter((s) => s.status !== "Learning").length
    };
  }

  const projects = P.evidence.filter((e) => e.type === "project");
  function projectSkills(p) { return (p.skills || []).filter((id) => skills[id]).map((id) => skills[id]); }

  const counts = {
    projects: projects.length,
    featured: projects.filter((p) => p.featured).length,
    skillsWithEvidence: Object.values(skills).filter((s) => s.ev.length).length,
    skills: Object.keys(skills).length,
    proven: Object.values(skills).filter((s) => s.status === "Proven").length,
    unlocked: Object.values(skills).filter((s) => s.status !== "Learning").length,
    certifications: P.evidence.filter((e) => e.type === "certification").length
  };

  /* --------------------------------------------------------- header/footer */
  function renderHeader(active) {
    const el = document.getElementById("site-header");
    if (!el) return;
    const pr = P.profile;
    const links = [
      { id: "skills", label: "Skills", href: "index.html#map" },
      { id: "projects", label: "Projects", href: "projects.html" },
      { id: "milestones", label: "Milestones", href: "index.html#milestones" },
      { id: "about", label: "About", href: "index.html#about" }
    ];
    el.innerHTML = `
      <div class="container header__inner">
        <a class="brand" href="index.html" aria-label="${esc(pr.shortName)}, home">${esc(pr.initials)}.</a>
        <nav class="nav" id="site-nav" aria-label="Main">
          <ul>
            ${links.map((l) => `<li><a href="${l.href}"${l.id === active ? ' aria-current="page"' : ""}>${l.label}</a></li>`).join("")}
          </ul>
          <div class="nav__ext">
            ${pr.cvUrl ? `<a href="${esc(pr.cvUrl)}" target="_blank" rel="noopener">CV ${icon("ext", 14)}</a>` : ""}
            <a href="${esc(pr.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon("ext", 14)}</a>
          </div>
        </nav>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon("menu", 22)}</button>
      </div>`;
    const btn = el.querySelector(".menu-btn");
    const nav = el.querySelector(".nav");
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) { nav.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const pr = P.profile;
    el.innerHTML = `
      <div class="container footer__inner">
        <p class="mono footer__id">${esc(pr.shortName)} · ${esc(pr.tagline)} · ${esc(pr.location)}</p>
        <p class="footer__links">
          <a href="mailto:${esc(pr.email)}">${icon("mail", 16)} ${esc(pr.email)}</a>
          <a href="${esc(pr.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon("ext", 14)}</a>
        </p>
      </div>`;
  }

  function params() { return new URLSearchParams(window.location.search); }

  /* Game-style rank names shown next to the plain status words. */
  const RANK = { Learning: "Locked", Applied: "Unlocked", Proven: "Mastered" };
  const RANK_PIPS = { Learning: 1, Applied: 2, Proven: 3 };
  window.PF = { RANK, RANK_PIPS, P, ICONS, icon, esc, skills, cats, evById, projects, projectSkills, counts, catStats, WORK, TYPE_LABEL, renderHeader, renderFooter, params };
})();
