/* Project preview (level 3): STAR summary, key figures and evidence links.
   Shared by the skill drawer (index), the Projects library and the case-study page.
   - PF.projectCardHTML(p)        compact card used in the skill drawer
   - PF.projectBodyHTML(p, opts)  STAR + figures + contribution + links
   - PF.openProject(id, opener)   opens the preview dialog (?project=<id> deep link)
   - Figures open in a lightbox; Esc closes the top layer and focus returns. */
(function () {
  "use strict";
  const PF = window.PF;
  const { P, icon, esc, projects, projectSkills, params } = PF;
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

  /* ---------------------------------------------------------- helpers */
  const catNames = (p) => (p.categories || []).map((c) => (P.categories.find((x) => x.id === c) || { name: c }).name);
  const metaLine = (p) => [catNames(p)[0], p.year, p.role].filter(Boolean).join(" · ");
  const host = (url) => /drive\.google|docs\.google/.test(url) ? "Google Drive" : /github\.com/.test(url) ? "GitHub" : "External site";
  const figs = (p) => p.figures || [];
  const asList = (v) => (Array.isArray(v) ? v : v ? [v] : []).filter(Boolean);
  PF.projectMeta = metaLine;
  PF.projectOrder = (list) => list.slice().sort((a, b) => (b.featured - a.featured) || String(b.year).localeCompare(String(a.year)));

  function imgTag(f, cls, eager) {
    return `<img class="${cls || ""}" src="${esc(f.src)}" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" ${eager ? "" : 'loading="lazy"'} decoding="async">`;
  }

  /* compact card for the skill drawer: the whole card is one button */
  PF.projectCardHTML = function (p, skillId) {
    const f = figs(p)[0];
    const h = (p.highlights || [])[0];
    const note = skillId && p.skillNotes && p.skillNotes[skillId];
    const thumb = f
      ? `<span class="pj__thumb">${imgTag(Object.assign({}, f, { alt: "" }))}</span>`
      : `<span class="pj__thumb pj__thumb--stat" aria-hidden="true">${h ? `<strong>${esc(h.value)}</strong><span>${esc(h.label)}</span>` : icon("doc", 28)}</span>`;
    return `<button type="button" class="pj" data-project="${esc(p.id)}">
        ${thumb}
        <span class="pj__body">
          <span class="pj__k">${esc(metaLine(p))}</span>
          <span class="pj__t">${esc(p.short || p.title)}</span>
          <span class="pj__d">${esc(p.subtitle || "")}</span>
          ${note ? `<span class="pj__n">${esc(note)}</span>` : h ? `<span class="pj__r"><strong>${esc(h.value)}</strong> ${esc(h.label)}</span>` : ""}
          <span class="pj__go">Explore project ${icon("arrow_r", 14)}</span>
        </span>
      </button>`;
  };

  /* figure with an enlarge button */
  function figureHTML(p, f, i, cls, noCap) {
    return `<figure class="fig ${cls || ""}">
        <button type="button" class="fig__btn" data-fig="${i}" data-pid="${esc(p.id)}" aria-label="Enlarge figure ${i + 1}: ${esc(f.caption)}">
          ${imgTag(f, "", i === 0)}
          <span class="fig__zoom" aria-hidden="true">${icon("search", 16)}</span>
        </button>
        ${noCap ? "" : `<figcaption>${esc(f.caption)}</figcaption>`}
      </figure>`;
  }

  const TOOL = {
    api: ["#A78BFA", "M8 1.5 L13.6 4.75 V11.25 L8 14.5 L2.4 11.25 V4.75 Z M8 5.2 L10.6 6.7 V9.3 L8 10.8 L5.4 9.3 V6.7 Z"],
    drive: ["#6FC3DF", "M1.5 4.5 H6 L7.5 6 H14.5 V13 H1.5 Z"],
    docs: ["#87A7D7", "M3.5 1.5 H10 L12.5 4 V14.5 H3.5 Z M10 1.5 V4 H12.5 M5.5 7.5 H10.5 M5.5 10 H10.5 M5.5 12.2 H9"],
    excel: ["#7FD18B", "M2 2.5 H14 V13.5 H2 Z M2 6.2 H14 M2 9.8 H14 M6 2.5 V13.5 M10 2.5 V13.5"]
  };
  const toolsHTML = (p) => asList(p.tools).length ? `<h4>Tools used</h4><ul class="tools">${p.tools.map((t) => {
    const [c, d] = TOOL[t.key] || ["#B7BDC8", ""];
    return `<li><span class="tools__i" style="--tc:${c}" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 16 16"><path d="${d}"/></svg></span><span><strong>${esc(t.name)}</strong><span>${esc(t.use)}</span></span></li>`;
  }).join("")}</ul>` : "";

  function ctaHTML(p, opts) {
    const links = asList(p.links);
    if (!links.length) {
      const mail = `mailto:${P.profile.email}?subject=${encodeURIComponent("Request: " + (p.short || p.title))}`;
      return `<div class="pv__cta">${opts.caseLink ? `<a class="btn btn--ghost" href="project.html?id=${encodeURIComponent(p.id)}">Full case study ${icon("arrow_r", 14)}</a>` : ""}
          <a class="btn btn--ghost" href="${esc(mail)}">${icon("mail", 14)} ${esc(p.requestLabel || "Request the full report")}</a></div>
        <p class="pv__note">${esc(p.requestNote || "The full report is not published online yet; a copy is available on request.")}</p>`;
    }
    return `<div class="pv__cta">
        <a class="btn btn--primary" href="${esc(links[0].url)}" target="_blank" rel="noopener">View full analysis ${icon("ext", 14)}</a>
        ${links.slice(1).map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon("ext", 14)}</a>`).join("")}
        ${opts.caseLink ? `<a class="btn btn--ghost" href="project.html?id=${encodeURIComponent(p.id)}">Full case study ${icon("arrow_r", 14)}</a>` : ""}
      </div>
      <p class="pv__note">${esc(links[0].label)} · opens on ${host(links[0].url)} in a new tab.</p>`;
  }
  const ul = (items) => items.length ? `<ul class="list">${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "";
  const chipsHTML = (p) => { const sk = projectSkills(p); return sk.length ? `<ul class="chips">${sk.map((s) =>
    `<li><a class="chip chip--sm" href="index.html?skill=${encodeURIComponent(s.id)}#map">${esc(s.name)}</a></li>`).join("")}</ul>` : ""; };

  /* Commercial-strategy layout: finding first, then 01–05 numbered sections,
     figures on the left with their business interpretation on the right. */
  function strategyBodyHTML(p, opts) {
    const F = figs(p), star = p.star || {}, hl = p.highlights || [];
    const step = (n, title, tag, body) => `<li class="step"><span class="step__n" aria-hidden="true">${n}</span><div class="step__b"><h3><span class="sr-only">${n}. </span>${title}</h3>${tag ? `<p class="step__tag">${tag}</p>` : ""}${body}</div></li>`;
    const rigor = p.rigor || [];
    return `
      ${p.roleDetail ? `<div class="role-banner"><p class="kicker">My role · ${esc(p.role || "")}</p><p>${esc(p.roleDetail)}</p></div>` : ""}
      ${p.finding ? `<div class="finding"><p class="kicker">Key strategic finding</p><h3>${esc(p.finding.title)}</h3><p>${esc(p.finding.text)}</p></div>` : ""}
      ${hl.length ? `<ul class="hl" aria-label="Key points">${hl.map((h) => `<li><strong>${esc(h.value)}</strong><span>${esc(h.label)}</span></li>`).join("")}</ul>` : ""}
      <ol class="steps">
        ${step("01", "The business problem", "Situation · Task", `<p>${esc(star.situation || "")}</p><p>${esc(star.task || "")}</p>`)}
        ${step("02", p.tools ? "Workflow &amp; tools" : "Analytical approach", "Action", `<p>${esc(star.action || "")}</p>${toolsHTML(p)}${asList(p.approach).length ? `${p.tools ? "<h4>Stages</h4>" : ""}${ul(asList(p.approach))}` : ""}`)}
        ${F.length ? step("03", p.tools ? "Agent flowchart" : "Key figures", "", F.map((f, i) => `<div class="frow${F.length === 1 ? " frow--wide" : ""}">${figureHTML(p, f, i, i === 0 ? "fig--hero" : "", true)}<div class="frow__txt"><h4>${esc(f.caption)}</h4>${f.insight ? `<p>${esc(f.insight)}</p>` : ""}</div></div>`).join("")) : ""}
        ${step("04", "Recommendations &amp; measurement", "Result", `<p>${esc(star.result || "")}</p>
            ${asList(p.recommendations).length ? `<h4>Recommendations</h4>${ul(asList(p.recommendations))}` : ""}
            ${asList(p.measures).length ? `<h4>How success would be measured</h4>${ul(asList(p.measures))}` : ""}
            ${rigor.length ? `<h4>${p.rigorHead ? "Acceptance tests" : "Analytical rigour: what the data can and cannot prove"}</h4>
              <div class="rigor" role="table" aria-label="${p.rigorHead ? "Test cases and expected behaviour" : "Supported findings and their limitations"}">
                <div class="rigor__row rigor__head" role="row"><span role="columnheader">${esc((p.rigorHead || [])[0] || "Supported finding")}</span><span role="columnheader">${esc((p.rigorHead || [])[1] || "Important limitation")}</span></div>
                ${rigor.map(([a, b]) => `<div class="rigor__row" role="row"><span role="cell">${esc(a)}</span><span role="cell">${esc(b)}</span></div>`).join("")}
              </div>` : ""}
            ${asList(p.limitations).length ? `<h4>Assumptions and limitations</h4>${ul(asList(p.limitations))}` : ""}`)}
        ${step("05", "My contribution &amp; evidence", p.role ? esc(p.role) : "", `${ul(asList(p.contribution))}<h4>Skills applied</h4>${chipsHTML(p)}${ctaHTML(p, opts)}`)}
      </ol>`;
  }

  /* the shared STAR + evidence body */
  PF.projectBodyHTML = function (p, opts) {
    opts = opts || {};
    if (p.layout === "strategy") return strategyBodyHTML(p, opts);
    const F = figs(p);
    const hl = p.highlights || [];
    const star = p.star || {};
    const starItems = [["S", "Situation", star.situation], ["T", "Task", star.task], ["A", "Action", star.action], ["R", "Result", star.result]].filter((x) => x[2]);
    const contrib = asList(p.contribution);
    const links = asList(p.links);
    const sk = projectSkills(p);
    const cta = links.length ? `<div class="pv__cta">
        <a class="btn btn--primary" href="${esc(links[0].url)}" target="_blank" rel="noopener">View full analysis ${icon("ext", 14)}</a>
        ${links.slice(1).map((l) => `<a class="btn btn--ghost" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${icon("ext", 14)}</a>`).join("")}
        ${opts.caseLink ? `<a class="btn btn--ghost" href="project.html?id=${encodeURIComponent(p.id)}">Full case study ${icon("arrow_r", 14)}</a>` : ""}
      </div>
      <p class="pv__note">${esc(links[0].label)} · opens on ${host(links[0].url)} in a new tab.</p>` : "";

    return `
      ${hl.length ? `<ul class="hl" aria-label="Key results">${hl.map((h) => `<li><strong>${esc(h.value)}</strong><span>${esc(h.label)}</span></li>`).join("")}</ul>` : ""}
      ${opts.ctaTop ? cta : ""}
      ${F[0] ? figureHTML(p, F[0], 0, "fig--hero") : ""}
      ${starItems.length ? `<div class="star">${starItems.map(([l, t, v]) =>
        `<section class="star__item"><span class="star__l" aria-hidden="true">${l}</span><div><h3>${t}</h3><p>${esc(v)}</p></div></section>`).join("")}</div>` : ""}
      ${F.length > 1 ? `<div class="figs">${F.slice(1).map((f, j) => figureHTML(p, f, j + 1, "fig--sup")).join("")}</div>` : ""}
      ${p.role || contrib.length ? `<section class="pv__sec"><h3>My contribution</h3>
        ${p.role ? `<p class="pv__role">${esc(p.role)}</p>` : ""}
        ${contrib.filter((c) => c !== p.role && c !== p.role + ".").length ? `<ul class="list">${contrib.filter((c) => c !== p.role && c !== p.role + ".").map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      </section>` : ""}
      ${sk.length ? `<section class="pv__sec"><h3>Skills applied</h3><ul class="chips">${sk.map((s) =>
        `<li><a class="chip chip--sm" href="index.html?skill=${encodeURIComponent(s.id)}#map">${esc(s.name)}</a></li>`).join("")}</ul></section>` : ""}
      ${opts.ctaTop ? "" : cta}`;
  };

  /* ------------------------------------------------------ dialog layers */
  const root = document.createElement("div");
  root.innerHTML = `
    <div class="pv-scrim" id="pv-scrim" hidden></div>
    <div class="pv" id="pv" role="dialog" aria-modal="true" aria-labelledby="pv-title" hidden>
      <div class="pv__inner" id="pv-inner"></div>
    </div>
    <div class="lb" id="lb" role="dialog" aria-modal="true" aria-labelledby="lb-cap" hidden>
      <div class="lb__bar">
        <span class="lb__count" id="lb-count"></span>
        <button type="button" class="icon-btn" data-lb-close aria-label="Close figure">${icon("close", 18)}</button>
      </div>
      <div class="lb__stage">
        <button type="button" class="icon-btn lb__nav" data-lb-step="-1" aria-label="Previous figure">${icon("arrow_l", 18)}</button>
        <img id="lb-img" alt="">
        <button type="button" class="icon-btn lb__nav" data-lb-step="1" aria-label="Next figure">${icon("arrow_r", 18)}</button>
      </div>
      <p class="lb__cap" id="lb-cap"></p>
    </div>`;
  document.body.append(...root.children);
  const $ = (id) => document.getElementById(id);
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const st = { open: null, opener: null, lb: null, lbOpener: null, overflow: "" };

  function setUrl(id) {
    const u = new URL(window.location.href);
    if (id) u.searchParams.set("project", id); else u.searchParams.delete("project");
    history.replaceState(null, "", u.pathname + u.search + u.hash);
  }

  PF.openProject = function (id, opener) {
    const p = byId[id];
    if (!p) return;
    if (!st.open) { st.opener = opener || document.activeElement; st.overflow = document.body.style.overflow; }
    st.open = id;
    $("pv-inner").innerHTML = `
      <div class="pv__head">
        <div>
          <p class="kicker">${esc(metaLine(p))}</p>
          <h2 id="pv-title">${esc(p.title)}</h2>
          ${p.subtitle ? `<p class="pv__sub">${esc(p.subtitle)}</p>` : ""}
        </div>
        <button type="button" class="icon-btn" data-pv-close aria-label="Close project">${icon("close", 18)}</button>
      </div>
      ${PF.projectBodyHTML(p, { caseLink: true })}`;
    const pv = $("pv"), sc = $("pv-scrim");
    pv.hidden = false; sc.hidden = false;
    pv.scrollTop = 0;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => { pv.classList.add("is-on"); sc.classList.add("is-on"); });
    setUrl(id);
    pv.querySelector("[data-pv-close]").focus({ preventScroll: true });
  };

  PF.closeProject = function () {
    if (!st.open) return;
    const pv = $("pv"), sc = $("pv-scrim");
    pv.classList.remove("is-on"); sc.classList.remove("is-on");
    st.open = null;
    setUrl(null);
    document.body.style.overflow = st.overflow;
    setTimeout(() => { if (!st.open) { pv.hidden = true; sc.hidden = true; } }, reduce() ? 0 : 220);
    const back = st.opener;
    st.opener = null;
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  };

  function showFig(pid, i, opener) {
    const F = figs(byId[pid]);
    if (!F.length) return;
    i = (i + F.length) % F.length;
    if (!st.lb) st.lbOpener = opener || document.activeElement;
    st.lb = { pid, i };
    const f = F[i];
    const img = $("lb-img");
    img.src = f.src; img.alt = f.alt; img.width = f.w; img.height = f.h;
    $("lb-cap").textContent = f.caption;
    $("lb-count").textContent = F.length > 1 ? `Figure ${i + 1} of ${F.length}` : "";
    document.querySelectorAll("#lb .lb__nav").forEach((b) => { b.hidden = F.length < 2; });
    const lb = $("lb");
    if (lb.hidden) { lb.hidden = false; requestAnimationFrame(() => lb.classList.add("is-on")); lb.querySelector("[data-lb-close]").focus({ preventScroll: true }); }
  }
  function closeFig() {
    if (!st.lb) return;
    const lb = $("lb");
    lb.classList.remove("is-on"); lb.hidden = true;
    st.lb = null;
    const back = st.lbOpener; st.lbOpener = null;
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  }

  function trap(e, box) {
    const f = [...box.querySelectorAll('a[href], button:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !box.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !box.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  }

  /* capture phase: the top layer handles keys before the drawer does */
  document.addEventListener("keydown", (e) => {
    const top = st.lb ? $("lb") : st.open ? $("pv") : null;
    if (!top) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); st.lb ? closeFig() : PF.closeProject(); }
    else if (e.key === "Tab") { e.stopPropagation(); trap(e, top); }
    else if (st.lb && (e.key === "ArrowRight" || e.key === "ArrowLeft")) { e.preventDefault(); showFig(st.lb.pid, st.lb.i + (e.key === "ArrowRight" ? 1 : -1)); }
  }, true);

  document.addEventListener("click", (e) => {
    const fb = e.target.closest(".fig__btn");
    if (fb) { showFig(fb.dataset.pid, +fb.dataset.fig, fb); return; }
    if (e.target.closest("[data-lb-close]") || e.target === $("lb") || e.target.classList.contains("lb__stage")) { closeFig(); return; }
    const step = e.target.closest("[data-lb-step]");
    if (step && st.lb) { showFig(st.lb.pid, st.lb.i + +step.dataset.lbStep); return; }
    if (e.target.closest("[data-pv-close]") || e.target === $("pv-scrim") || e.target === $("pv")) { PF.closeProject(); return; }
    const card = e.target.closest("[data-project]");
    if (card && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) { e.preventDefault(); PF.openProject(card.dataset.project, card); }
  });

  /* deep link: ?project=<id> (index and projects pages) */
  const deep = params().get("project");
  if (deep && byId[deep] && !document.getElementById("case")) setTimeout(() => PF.openProject(deep, null), 0);
})();
