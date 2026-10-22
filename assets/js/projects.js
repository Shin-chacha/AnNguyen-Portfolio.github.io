/* Projects page: search, category and skill filters, featured + archive.
   URL keeps the filters, e.g. projects.html?skill=py&category=finance&q=valuation */
(function () {
  "use strict";
  const { P, icon, esc, skills, projects, projectSkills, params } = window.PF;
  const $ = (id) => document.getElementById(id);

  const q0 = params();
  const state = {
    q: q0.get("q") || "",
    category: q0.get("category") || "",
    skill: q0.get("skill") && skills[q0.get("skill")] ? q0.get("skill") : "",
    view: q0.get("view") && (P.views || []).some((v) => v.id === q0.get("view")) ? q0.get("view") : "",
    showAllSkills: false
  };

  const usedCats = P.categories.filter((c) => projects.some((p) => (p.categories || []).includes(c.id)));
  const skillUse = {};
  projects.forEach((p) => projectSkills(p).forEach((s) => { skillUse[s.id] = (skillUse[s.id] || 0) + 1; }));
  const skillList = Object.keys(skillUse).map((id) => skills[id]).sort((a, b) => skillUse[b.id] - skillUse[a.id] || a.name.localeCompare(b.name));
  const TOP = 10;

  function syncUrl() {
    const u = new URL(window.location.href);
    ["q", "category", "skill", "view"].forEach((k) => { if (state[k]) u.searchParams.set(k, state[k]); else u.searchParams.delete(k); });
    history.replaceState(null, "", u.pathname + u.search);
  }

  const viewOf = () => (P.views || []).find((v) => v.id === state.view);
  function matches(p) {
    if (state.view && !viewOf().projects.includes(p.id)) return false;
    if (state.category && !(p.categories || []).includes(state.category)) return false;
    if (state.skill && !(p.skills || []).includes(state.skill)) return false;
    if (state.q) {
      const hay = [p.title, p.subtitle, p.summary, p.problem, p.data, p.finding && p.finding.title, p.finding && p.finding.text].concat(p.method || [], p.result || [], Object.values(p.star || {}), p.approach || [])
        .concat(projectSkills(p).map((s) => s.name)).join(" ").toLowerCase();
      const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      const reEsc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!words.every((w) => new RegExp("(^|[^a-z0-9])" + reEsc(w)).test(hay))) return false;
    }
    return true;
  }

  function renderChips() {
    $("view-chips").innerHTML = [{ id: "", name: "All roles" }].concat(P.views || []).map((v) =>
      `<li><button type="button" class="chip" data-view="${v.id}" aria-pressed="${state.view === v.id}">${esc(v.name)}</button></li>`).join("");
    $("cat-chips").innerHTML = [{ id: "", name: "All" }].concat(usedCats).map((c) =>
      `<li><button type="button" class="chip" data-cat="${c.id}" aria-pressed="${state.category === c.id}">${esc(c.name)}</button></li>`).join("");
    const list = state.showAllSkills ? skillList : skillList.slice(0, TOP);
    const sel = state.skill && !list.find((s) => s.id === state.skill) ? [skills[state.skill]] : [];
    $("skill-chips").innerHTML = sel.concat(list).map((s) =>
      `<li><button type="button" class="chip" data-skill="${s.id}" aria-pressed="${state.skill === s.id}">${esc(s.name)} <span class="mono" aria-label="${skillUse[s.id]} projects">· ${skillUse[s.id] || 0}</span></button></li>`).join("")
      + (skillList.length > TOP ? `<li><button type="button" class="chip" data-more aria-expanded="${state.showAllSkills}">${state.showAllSkills ? "Fewer" : `+ ${skillList.length - TOP} more`}</button></li>` : "");
  }

  function card(p) {
    const tags = projectSkills(p).slice(0, 4);
    const f = (p.figures || [])[0];
    const h = (p.highlights || [])[0];
    const media = f
      ? `<span class="pcard__media"><img src="${esc(f.src)}" alt="" width="${f.w}" height="${f.h}" loading="lazy" decoding="async"></span>`
      : `<span class="pcard__media pcard__media--stat" aria-hidden="true">${h ? `<strong>${esc(h.value)}</strong><span>${esc(h.label)}</span>` : ""}</span>`;
    return `<a class="pcard" href="project.html?id=${encodeURIComponent(p.id)}" data-project="${esc(p.id)}">
        ${media}
        <span class="pcard__body">
          <span class="pcard__k">${esc(window.PF.projectMeta(p))}</span>
          <h3>${esc(p.title)}</h3>
          <span class="sum">${esc(p.summary || "")}</span>
          ${h ? `<span class="pcard__r"><strong>${esc(h.value)}</strong> ${esc(h.label)}</span>` : ""}
          <ul class="chips" aria-label="Skills">${tags.map((s) => `<li><span class="chip chip--sm">${esc(s.name)}</span></li>`).join("")}</ul>
          <span class="foot"><span class="go">Explore project ${icon("arrow_r", 14)}</span></span>
        </span>
      </a>`;
  }

  function render() {
    const vw = viewOf();
    const list = vw ? projects.filter(matches).sort((a, b) => vw.projects.indexOf(a.id) - vw.projects.indexOf(b.id)) : window.PF.projectOrder(projects.filter(matches));
    const feat = list.filter((p) => p.featured);
    const arch = list.filter((p) => !p.featured);
    $("featured").innerHTML = feat.map(card).join("");
    $("featured-wrap").hidden = !feat.length;
    $("archive").innerHTML = arch.map((p) => `<li><a href="project.html?id=${encodeURIComponent(p.id)}" data-project="${esc(p.id)}">
        <span><strong>${esc(p.title)}</strong><span class="s">${esc([p.subtitle, p.year].filter(Boolean).join(" · "))}</span></span>${icon("chev_r", 16)}</a></li>`).join("");
    $("archive-wrap").hidden = !arch.length;
    const filtered = state.q || state.category || state.skill || state.view;
    const bits = [];
    if (state.skill) bits.push(`using ${skills[state.skill].name}`);
    if (state.category) bits.push(`in ${P.categories.find((c) => c.id === state.category).name}`);
    if (state.q) bits.push(`matching “${state.q}”`);
    if (vw) bits.unshift(`for ${vw.name} roles (${vw.why.charAt(0).toLowerCase() + vw.why.slice(1)})`);
    $("result-count").textContent = filtered ? `Showing ${list.length} of ${projects.length} projects ${bits.join(", ")}.` : `Showing all ${projects.length} projects.`;
    $("clear").hidden = !filtered;
    $("empty").hidden = list.length > 0;
    renderChips();
    syncUrl();
  }

  function clear() { state.q = ""; state.category = ""; state.skill = ""; state.view = ""; $("q").value = ""; render(); $("q").focus(); }

  window.PF.renderHeader("projects");
  window.PF.renderFooter();
  const cats = new Set(projects.flatMap((p) => p.categories || []));
  $("proj-sub").textContent = `${projects.length} project${projects.length === 1 ? "" : "s"} across ${[...cats].map((id) => (P.categories.find((c) => c.id === id) || { name: id }).name.toLowerCase()).join(", ")}.`;
  $("q").value = state.q;

  let t = null;
  $("q").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 150); });
  $("view-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-view]");
    if (b) { state.view = b.dataset.view; render(); const again = $("view-chips").querySelector(`[data-view="${b.dataset.view}"]`); if (again) again.focus(); }
  });
  $("cat-chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (b) { state.category = b.dataset.cat; render(); const again = $("cat-chips").querySelector(`[data-cat="${b.dataset.cat}"]`); if (again) again.focus(); }
  });
  $("skill-chips").addEventListener("click", (e) => {
    if (e.target.closest("[data-more]")) { state.showAllSkills = !state.showAllSkills; renderChips(); $("skill-chips").querySelector("[data-more]").focus(); return; }
    const b = e.target.closest("[data-skill]");
    if (b) { const id = b.dataset.skill; state.skill = state.skill === id ? "" : id; render(); const again = $("skill-chips").querySelector(`[data-skill="${id}"]`); if (again) again.focus(); }
  });
  $("clear").addEventListener("click", clear);
  $("clear2").addEventListener("click", clear);
  render();
})();
