/* Home page: hero, capability map (tree + mobile accordion), evidence drawer,
   milestones and about. All content comes from data.js. */
(function () {
  "use strict";
  const { P, icon, esc, skills, cats, evById, counts, catStats, WORK, TYPE_LABEL, params, RANK, RANK_PIPS } = window.PF;

  const state = {
    view: "overview",          // "overview" or a category id
    collapsed: new Set(),      // desktop: collapsed category ids
    mobileOpen: new Set(),     // mobile: open accordion ids
    selected: null,            // selected skill id
    lastFocus: null
  };

  const $ = (id) => document.getElementById(id);
  const isMobile = () => window.matchMedia("(max-width: 759px)").matches;
  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ------------------------------------------------------------- hero */
  function renderHero() {
    const pr = P.profile;
    $("hero-name").textContent = pr.name;
    $("hero-tag").textContent = pr.tagline;
    $("hero-intro").textContent = pr.intro;
    $("hero-actions").innerHTML = `
      <a class="btn btn--primary" href="#map">Explore skill map ${icon("chev_d", 16)}</a>
      ${pr.cvUrl ? `<a class="btn btn--ghost" href="${esc(pr.cvUrl)}" target="_blank" rel="noopener">Download CV</a>` : ""}
      <a class="btn btn--ghost" href="${esc(pr.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon("ext", 14)}</a>`;
    $("hero-stats").innerHTML = [
      [counts.projects, counts.projects === 1 ? "Project" : "Projects"],
      [counts.unlocked, "Skills unlocked"],
      [counts.certifications, counts.certifications === 1 ? "Certification" : "Certifications"]
    ].map(([n, l]) => `<li><strong>${n}</strong><span>${l}</span></li>`).join("");
    $("status-card").innerHTML = `
      <h2 class="kicker">Currently</h2>
      <p class="strong">${esc(pr.currently.school)}</p>
      <p class="muted">${esc(pr.currently.program)}</p>
      <p class="muted">${esc(pr.currently.detail)}</p>
      <hr>
      <h2 class="kicker">Seeking</h2>
      <p class="strong">${esc(pr.seeking.roles)}</p>
      <p class="muted">${esc(pr.seeking.detail)}</p>`;
  }

  /* ------------------------------------------------------- view control */
  function renderView() {
    const opts = [{ id: "overview", name: "Overview" }].concat(P.tree.map((c) => ({ id: c.id, name: c.name })));
    $("view-opts").innerHTML = opts.map((o) =>
      `<button type="button" class="seg" data-view="${o.id}" aria-pressed="${state.view === o.id}">${esc(o.name)}</button>`).join("");
  }

  function setView(v) {
    state.view = v;
    if (v === "overview") {
      state.collapsed.clear();
      state.mobileOpen.clear();
    } else {
      state.collapsed = new Set(P.tree.map((c) => c.id).filter((id) => id !== v));
      state.mobileOpen = new Set([v]);
    }
    renderView();
    renderMap();
  }

  /* ---------------------------------------------------------- helpers */
  const stCls = (s) => "st-" + s.status.toLowerCase();
  let revealIdx = 0;

  function pipsHTML(s) {
    const n = RANK_PIPS[s.status];
    return `<span class="pips" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;
  }

  function nodeHTML(s, withBadge) {
    const cls = s.status === "Proven" ? "is-proven" : s.status === "Learning" ? "is-learning" : "is-applied";
    const badge = withBadge && s.ev.length ? `<span class="badge" aria-hidden="true">${s.ev.length}</span>` : "";
    const mark = s.status === "Learning" ? `<span class="node__mark node__mark--lock" aria-hidden="true">${icon("lock", 12)}</span>`
      : s.status === "Proven" ? `<span class="node__mark node__mark--star" aria-hidden="true">${icon("star", 12)}</span>` : "";
    return `<span class="node ${cls}" style="--i:${revealIdx++}">${icon(s.icon, 24)}${badge}${mark}</span>`;
  }

  function rowHTML(s, extra) {
    const n = s.ev.length;
    return `<button type="button" class="row${state.selected === s.id ? " is-selected" : ""}" data-skill="${s.id}" aria-haspopup="dialog">
        ${nodeHTML(s, true)}
        <span class="row__text">
          <span class="row__name">${esc(s.name)}</span>
          <span class="row__meta">${pipsHTML(s)}${s.status}${extra || ""}</span>
          <span class="sr-only">, ${RANK[s.status]}, ${n} evidence item${n === 1 ? "" : "s"}. Open details.</span>
        </span>
      </button>`;
  }

  /* Segmented progress bar: one segment per skill, gold when mastered. */
  function xpHTML(list, label) {
    const order = { Proven: 0, Applied: 1, Learning: 2 };
    const segs = list.slice().sort((a, b) => order[a.status] - order[b.status])
      .map((s) => `<i class="${s.status === "Proven" ? "gold" : s.status === "Applied" ? "on" : ""}"></i>`).join("");
    return `<span class="xp" role="img" aria-label="${esc(label)}">${segs}</span>`;
  }
  const catSkills = (catId) => Object.values(skills).filter((s) => s.catId === catId);

  function pathInfo() {
    const sel = state.selected && skills[state.selected];
    if (!sel) return null;
    return { cat: sel.catId, cap: sel.parentId || sel.id, leaf: sel.level === 3 ? sel.id : null, capSelected: sel.level === 2 ? sel.id : null };
  }

  /* ------------------------------------------------------ desktop tree */
  function renderDesktop() {
    const pr = P.profile;
    revealIdx = 0;
    $("map-root").innerHTML = `<span class="root-node" aria-hidden="true">${esc(pr.initials)}</span>
      <span class="map-root__label"><strong>${esc(pr.name.toUpperCase())}</strong><span>${esc(pr.tagline)}</span>
        <span class="map-root__xp">${counts.unlocked}/${counts.skills} skills unlocked · ${counts.proven} mastered</span></span>`;
    const path = pathInfo();
    $("branches").innerHTML = P.tree.map((cat) => {
      revealIdx = 0;               // each tree unlocks in parallel, top to bottom
      const st = catStats(cat.id);
      const collapsed = state.collapsed.has(cat.id);
      const onPath = path && path.cat === cat.id;
      const capIds = cat.capabilities.map((c) => c.id);
      const capIdx = onPath ? capIds.indexOf(path.cap) : -1;
      const items = cat.capabilities.map((cap, i) => {
        const s = skills[cap.id];
        let cls = "";
        if (onPath && i < capIdx) cls = "path-through";
        if (onPath && i === capIdx) cls = "path-end";
        const kids = (cap.skills || []).map((k, j) => skills[k.id]);
        const leafIdx = onPath && i === capIdx && path.leaf ? kids.findIndex((k) => k.id === path.leaf) : -1;
        const kidHTML = kids.length ? `<ul>${kids.map((k, j) => {
          let kc = "";
          if (leafIdx > -1 && j < leafIdx) kc = "path-through";
          if (leafIdx > -1 && j === leafIdx) kc = "path-end";
          if (path && path.capSelected === cap.id) kc = "rel li-related";
          const nx = kids[j + 1] && kids[j + 1].status === "Learning" ? " nx-locked" : "";
          return `<li class="${kc} ${stCls(k)}${nx}">${rowHTML(k)}</li>`;
        }).join("")}</ul>` : "";
        const nextCap = cat.capabilities[i + 1] && skills[cat.capabilities[i + 1].id];
        const nx = nextCap && nextCap.status === "Learning" ? " nx-locked" : "";
        return `<li class="${cls} ${stCls(s)}${nx}">${rowHTML(s)}${kidHTML}</li>`;
      }).join("");
      return `<section class="branch${collapsed ? " is-collapsed" : ""}${onPath ? " on-path" : ""}" data-cat="${cat.id}" aria-labelledby="cat-${cat.id}">
          <div class="cat-row">
            <span class="cat-node" aria-hidden="true">${icon(cat.icon, 28)}</span>
            <div class="cat-label">
              <h3 id="cat-${cat.id}">${esc(cat.name)}</h3>
              <p>${st.unlocked}/${st.total} unlocked${st.proven ? ` · ${st.proven} mastered` : ""}</p>
              ${xpHTML(catSkills(cat.id), `${st.unlocked} of ${st.total} skills unlocked, ${st.proven} mastered`)}
            </div>
            <button type="button" class="toggle" data-toggle="${cat.id}" aria-expanded="${!collapsed}" aria-controls="tree-${cat.id}"
              aria-label="${collapsed ? "Expand" : "Collapse"} ${esc(cat.name)}"><span aria-hidden="true">${collapsed ? "+" : "−"}</span></button>
          </div>
          <ul class="tree" id="tree-${cat.id}">${items}</ul>
        </section>`;
    }).join("");
    drawTrunk();
  }

  function drawTrunk() {
    const svg = $("map-trunk");
    const wrap = $("map-desktop");
    if (!svg || getComputedStyle(svg).display === "none" || getComputedStyle(wrap).display === "none") return;
    const box = wrap.getBoundingClientRect();
    const root = wrap.querySelector(".root-node").getBoundingClientRect();
    const nodes = [...wrap.querySelectorAll(".branch .cat-node")].map((n) => n.getBoundingClientRect());
    if (!nodes.length) return;
    const rx = root.left + root.width / 2 - box.left;
    const ry = root.bottom - box.top;
    const xs = nodes.map((n) => n.left + n.width / 2 - box.left);
    const top = nodes[0].top - box.top;
    const by = Math.round(ry + (top - ry) / 2);
    let d = `M${rx} ${ry} V${by} M${xs[0]} ${by} H${xs[xs.length - 1]}`;
    xs.forEach((x) => { d += ` M${x} ${by} V${top}`; });
    let sel = "";
    const path = pathInfo();
    if (path) {
      const i = P.tree.findIndex((c) => c.id === path.cat);
      if (i > -1) sel = `<path class="sel" d="M${rx} ${ry} V${by} H${xs[i]} V${top}"/>`;
    }
    svg.innerHTML = `<path d="${d}"/>${sel}`;
  }

  /* ---------------------------------------------------- mobile accordion */
  function renderMobile() {
    $("map-mobile").innerHTML = P.tree.map((cat) => {
      const st = catStats(cat.id);
      const open = state.mobileOpen.has(cat.id);
      const rows = cat.capabilities.map((cap) => {
        const s = skills[cap.id];
        const kids = (cap.skills || []).map((k) => skills[k.id]);
        const r = (x, lvl) => `<li class="${lvl} ${stCls(x)}"><button type="button" class="row" data-skill="${x.id}" aria-haspopup="dialog">
            ${nodeHTML(x, false)}
            <span class="row__text"><span class="row__name">${esc(x.name)}</span>
            <span class="row__meta">${pipsHTML(x)}${x.status} · ${x.ev.length} evidence</span></span>
            ${icon("chev_r", 16, "chev")}
          </button></li>`;
        return r(s, "lvl2") + kids.map((k) => r(k, "lvl3")).join("");
      }).join("");
      return `<div class="acc${open ? " is-open" : ""}" data-cat="${cat.id}">
          <button type="button" class="acc__head" data-acc="${cat.id}" aria-expanded="${open}" aria-controls="acc-${cat.id}">
            <span class="cat-node" aria-hidden="true">${icon(cat.icon, 22)}</span>
            <span class="cat-label"><h3>${esc(cat.name)}</h3><p>${st.unlocked}/${st.total} unlocked${st.proven ? ` · ${st.proven} mastered` : ""}</p>
              ${xpHTML(catSkills(cat.id), `${st.unlocked} of ${st.total} skills unlocked, ${st.proven} mastered`)}</span>
            ${icon("chev_r", 18, "chev")}
          </button>
          <ul class="acc__panel" id="acc-${cat.id}"${open ? "" : " hidden"}>${rows}</ul>
        </div>`;
    }).join("");
  }

  function renderMap() { renderDesktop(); renderMobile(); }

  /* ------------------------------------------------------------ preview */
  let pvTimer = null;
  let pvRow = null;
  function placePreview() {
    if (!pvRow) return;
    const pv = $("preview");
    const r = pvRow.querySelector(".node").getBoundingClientRect();
    let left = r.left + r.width / 2 - 31 + window.scrollX;
    left = Math.max(12, Math.min(left, window.scrollX + document.documentElement.clientWidth - 264 - 12));
    pv.style.left = left + "px";
    pv.style.top = r.bottom + 14 + window.scrollY + "px";
  }
  function showPreview(btn) {
    const s = skills[btn.dataset.skill];
    if (!s) return;
    const pv = $("preview");
    const work = s.ev.filter((id) => WORK.includes(evById[id].type)).map((id) => evById[id]);
    pv.innerHTML = `<h4>${esc(s.name)}</h4><p class="st">${pipsHTML(s)}${s.status} · ${RANK[s.status]}</p>
      <p class="use">${work.length ? `Used in ${work.length} project${work.length === 1 ? "" : "s"} or role${work.length === 1 ? "" : "s"}` : "No project evidence yet"}</p>
      ${work.length ? `<p class="k">Key evidence</p><ul>${work.slice(0, 2).map((e) => `<li>${esc(e.short || e.title)}</li>`).join("")}</ul>` : ""}
      <p class="cta">Select for details →</p>`;
    pvRow = btn;
    placePreview();
    pv.classList.add("is-on");
  }
  function hidePreview() { clearTimeout(pvTimer); pvRow = null; $("preview").classList.remove("is-on"); }

  /* ------------------------------------------------------------- drawer */
  function evItem(e) {
    const meta = [e.subtitle, e.year].filter(Boolean).map(esc).join(" · ");
    if (e.type === "project") {
      return `<a class="ev-card" href="project.html?id=${encodeURIComponent(e.id)}">
          <p class="t">${TYPE_LABEL[e.type]}</p><p class="n">${esc(e.short || e.title)}</p>
          <p class="s"><span>${meta}</span><span class="go">View project ${icon("arrow_r", 14)}</span></p></a>`;
    }
    return `<div class="ev-card"><p class="t">${TYPE_LABEL[e.type]}</p><p class="n">${esc(e.short || e.title)}</p><p class="s"><span>${meta}</span></p></div>`;
  }

  function relatedOf(s) {
    if (s.level === 2 && s.children.length) return s.children.map((id) => skills[id]);
    if (s.level === 3) return [skills[s.parentId]].concat(skills[s.parentId].children.filter((id) => id !== s.id).map((id) => skills[id]));
    return cats[s.catId].capabilities.map((c) => skills[c.id]).filter((x) => x.id !== s.id);
  }

  /* What it takes to reach the next rank, from the real status rules. */
  function questText(s) {
    const w = s.ev.filter((id) => WORK.includes(evById[id].type)).length;
    if (s.status === "Learning") return "To unlock: use it in a project, role or competition.";
    if (s.status === "Proven") return "Mastered: repeated evidence, rebuilt without help.";
    return w >= 2 ? "Next rank: confirm it can be rebuilt without help to master it."
      : "Next rank: one more project, role or competition, rebuilt without help.";
  }

  function drawerHTML(s) {
    const cat = cats[s.catId];
    const ev = s.ev.map((id) => evById[id]);
    const work = ev.filter((e) => WORK.includes(e.type));
    const groups = [["award", "Awards"], ["certification", "Certifications"], ["course", "Coursework"]];
    const nProj = window.PF.projects.filter((p) => (p.skills || []).includes(s.id)).length;
    const pillCls = s.status === "Proven" ? "pill--proven" : s.status === "Learning" ? "pill--learning" : "";
    const rel = relatedOf(s);
    return `
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="drawer__top">
        <p class="kicker">Skill · ${esc(cat.name)}</p>
        <button type="button" class="icon-btn" data-close aria-label="Close details">${icon("close", 18)}</button>
      </div>
      <h2 id="drawer-title">${esc(s.name)}</h2>
      <div class="drawer__status"><span class="pill ${pillCls}">${s.status}</span><span class="rank rank--${s.status.toLowerCase()}">${pipsHTML(s)}${RANK[s.status]}</span><span>${ev.length} evidence item${ev.length === 1 ? "" : "s"}</span></div>
      <p class="quest">${icon(s.status === "Proven" ? "star" : s.status === "Learning" ? "lock" : "flag", 14)}<span>${questText(s)}</span></p>
      ${s.description ? `<p class="drawer__desc">${esc(s.description)}</p>` : ""}
      <hr>
      ${ev.length === 0 ? `<p class="empty">No evidence yet. This skill is on the learning plan.</p>` : ""}
      ${work.length ? `<h3>Featured evidence <small>${work.length}</small></h3>${work.map(evItem).join("")}` : ""}
      ${groups.map(([type, label]) => {
        const list = ev.filter((e) => e.type === type);
        return list.length ? `<h3>${label}</h3><ul class="ev-list">${list.map((e) =>
          `<li><span class="n">${esc(e.title)}</span><span class="s">${[e.subtitle, e.year].filter(Boolean).map(esc).join(" · ")}</span></li>`).join("")}</ul>` : "";
      }).join("")}
      ${rel.length ? `<h3>Related skills</h3><ul class="chips">${rel.map((r) =>
        `<li><button type="button" class="chip chip--sm" data-open="${r.id}">${esc(r.name)}</button></li>`).join("")}</ul>` : ""}
      <div class="note"><p class="kicker">How ranks are set</p>
        <p>Locked · Learning: on the learning plan, no project evidence yet.</p>
        <p>Unlocked · Applied: used in at least one project, role or competition.</p>
        <p>Mastered · Proven: repeated evidence that I can rebuild without help.</p></div>
      ${nProj ? `<a class="btn btn--primary btn--block" href="projects.html?skill=${encodeURIComponent(s.id)}">View ${nProj} project${nProj === 1 ? "" : "s"} using ${esc(s.name)} ${icon("arrow_r", 16)}</a>` : ""}`;
  }

  function setUrlSkill(id) {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set("skill", id); else u.searchParams.delete("skill");
    history.replaceState(null, "", u.pathname + u.search + u.hash);
  }

  function openDrawer(id, opener) {
    const s = skills[id];
    if (!s) return;
    hidePreview();
    if (opener && !state.selected) state.lastFocus = id;
    state.selected = id;
    if (!opener && !state.lastFocus) state.lastFocus = id;
    const dr = $("drawer");
    const sc = $("scrim");
    $("drawer-inner").innerHTML = drawerHTML(s);
    dr.scrollTop = 0;
    const wasHidden = dr.hidden;
    dr.hidden = false;
    sc.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => { dr.classList.add("is-on"); sc.classList.add("is-on"); });
    setUrlSkill(id);
    renderMap();
    if (wasHidden || !dr.contains(document.activeElement)) {
      dr.querySelector("[data-close]").focus({ preventScroll: true });
    } else {
      const title = dr.querySelector("#drawer-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }
  }

  function closeDrawer() {
    const dr = $("drawer");
    const sc = $("scrim");
    if (dr.hidden) return;
    dr.classList.remove("is-on");
    sc.classList.remove("is-on");
    const back = state.lastFocus;
    state.selected = null;
    state.lastFocus = null;
    setUrlSkill(null);
    renderMap();
    document.body.style.overflow = "";
    const done = () => { dr.hidden = true; sc.hidden = true; };
    const ms = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
    setTimeout(done, ms);
    const scope = isMobile() ? $("map-mobile") : $("map-desktop");
    const btn = back && scope.querySelector(`.row[data-skill="${back}"]`);
    if (btn) btn.focus({ preventScroll: false });
  }

  function trapFocus(e) {
    const dr = $("drawer");
    if (dr.hidden || e.key !== "Tab") return;
    const f = [...dr.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !dr.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ------------------------------------------------- milestones + about */
  function renderMilestones() {
    $("timeline").innerHTML = P.milestones.map((m) => `
      <li class="ms ms--${m.kind}">
        <span class="ms__mark" aria-hidden="true">${icon(m.icon, 22)}</span>
        <div class="ms__body">
          <p class="ms__year">${esc(m.year)}${m.kind === "upcoming" ? " · upcoming" : ""}</p>
          <h3>${esc(m.title)}</h3>
          <p>${esc(m.subtitle)}</p>
        </div>
      </li>`).join("");
  }

  function renderAbout() {
    const pr = P.profile;
    $("about-sub").textContent = `Based in ${pr.location}. ${pr.languages}.`;
    const recs = P.recommendations.map((r) => `
      <div class="card"><p class="kicker">Recommendation</p><h3 style="margin-top:8px">${esc(r.name)}</h3><p>${esc(r.role)}</p>
        ${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">Read letter ${icon("ext", 14)}</a>` : ""}</div>`).join("");
    $("about-grid").innerHTML = `
      <div class="card"><p class="kicker">Education</p><h3 style="margin-top:8px">${esc(pr.currently.school)}</h3>
        <p>${esc(pr.currently.program)}</p><p>${esc(pr.currently.detail)}</p></div>
      ${recs}
      <div class="card"><p class="kicker">Contact</p><h3 style="margin-top:8px">${esc(pr.seeking.roles)}</h3><p>${esc(pr.seeking.detail)}</p>
        <a href="mailto:${esc(pr.email)}">${icon("mail", 16)} ${esc(pr.email)}</a></div>`;
  }

  /* ------------------------------------------------------------- events */
  function bind() {
    $("view-opts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-view]");
      if (b) setView(b.dataset.view);
    });

    const onRowClick = (e) => {
      const t = e.target.closest("[data-toggle]");
      if (t) {
        const id = t.dataset.toggle;
        if (state.collapsed.has(id)) state.collapsed.delete(id); else state.collapsed.add(id);
        renderDesktop();
        const again = $("branches").querySelector(`[data-toggle="${id}"]`);
        if (again) again.focus();
        return;
      }
      const a = e.target.closest("[data-acc]");
      if (a) {
        const id = a.dataset.acc;
        if (state.mobileOpen.has(id)) state.mobileOpen.delete(id); else state.mobileOpen.add(id);
        renderMobile();
        const again = $("map-mobile").querySelector(`[data-acc="${id}"]`);
        if (again) again.focus();
        return;
      }
      const r = e.target.closest(".row[data-skill]");
      if (r) { state.lastFocus = r.dataset.skill; openDrawer(r.dataset.skill, r); }
    };
    $("branches").addEventListener("click", onRowClick);
    $("map-mobile").addEventListener("click", onRowClick);

    $("branches").addEventListener("mouseover", (e) => {
      const r = e.target.closest(".row[data-skill]");
      if (!r || !canHover() || state.selected) return;
      clearTimeout(pvTimer);
      pvTimer = setTimeout(() => showPreview(r), 120);
    });
    $("branches").addEventListener("mouseout", (e) => {
      const r = e.target.closest(".row[data-skill]");
      if (r && !r.contains(e.relatedTarget)) hidePreview();
    });
    $("branches").addEventListener("focusin", (e) => {
      const r = e.target.closest(".row[data-skill]");
      if (r && r.matches(":focus-visible") && !state.selected) showPreview(r);
    });
    $("branches").addEventListener("focusout", hidePreview);
    window.addEventListener("scroll", placePreview, { passive: true });

    $("drawer").addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) return closeDrawer();
      const o = e.target.closest("[data-open]");
      if (o) openDrawer(o.dataset.open, null);
    });
    $("scrim").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { if (!$("drawer").hidden) closeDrawer(); else hidePreview(); }
      trapFocus(e);
    });

    let raf = null;
    const redraw = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(drawTrunk); };
    window.addEventListener("resize", redraw);
    if (window.ResizeObserver) new ResizeObserver(redraw).observe($("map-desktop"));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  }

  /* --------------------------------------------------------------- init */
  window.PF.renderHeader("skills");
  window.PF.renderFooter();
  renderHero();
  const q = params();
  const v = q.get("view");
  if (v && cats[v]) { state.view = v; state.collapsed = new Set(P.tree.map((c) => c.id).filter((id) => id !== v)); state.mobileOpen = new Set([v]); }
  renderView();
  renderMap();
  renderMilestones();
  renderAbout();
  bind();
  // One-time "unlock" animation when the map first scrolls into view.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    $("map-desktop").classList.add("will-reveal");
    const io = new IntersectionObserver((ents) => {
      if (!ents.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const m = $("map-desktop");
      m.classList.add("is-revealing");
      setTimeout(() => { m.classList.remove("will-reveal", "is-revealing"); }, 1400);
    }, { threshold: 0.12 });
    io.observe($("map-desktop"));
  }
  const deep = q.get("skill");
  if (deep && skills[deep]) {
    const s = skills[deep];
    state.collapsed.delete(s.catId);
    state.mobileOpen.add(s.catId);
    state.lastFocus = deep;
    openDrawer(deep, null);
  }
})();
